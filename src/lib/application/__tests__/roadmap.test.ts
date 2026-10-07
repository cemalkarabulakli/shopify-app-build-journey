import { beforeEach, describe, expect, it } from 'vitest';
import { FeatureRequest, MAX_OPEN_PER_AUTHOR, VOTE_WEIGHT } from '$lib/domain/roadmap';
import { InMemoryFeatureBoard, membershipOf } from './InMemoryFeatureBoard';
import { ListRoadmap } from '../use-cases/ListRoadmap';
import { SubmitFeatureRequest, SubmitRefused } from '../use-cases/SubmitFeatureRequest';
import { ToggleVote, VoteRefused } from '../use-cases/ToggleVote';
import { StatusRefused, UpdateFeatureStatus } from '../use-cases/UpdateFeatureStatus';

const MEMBER = 'member@example.com';
const VISITOR = 'visitor@example.com';
const ADMIN = 'builder@example.com';

let board: InMemoryFeatureBoard;
const members = membershipOf({ [MEMBER]: 'Pro' });
let ids = 0;
const submit = () => new SubmitFeatureRequest(board, members, () => `r${++ids}`);

const seed = (over: Partial<Parameters<typeof FeatureRequest.create>[0]> = {}) => {
	const r = FeatureRequest.create({
		id: over.id ?? `s${++ids}`,
		title: 'Subscribers cannot pause a delivery',
		body: 'Twenty emails a week, ten minutes each.',
		status: 'considering',
		authorEmail: MEMBER,
		authorTier: 'Pro',
		note: null,
		createdAt: new Date('2026-09-01'),
		updatedAt: new Date('2026-09-01'),
		shippedAt: null,
		...over
	});
	board.requests.set(r.id, r);
	return r;
};

beforeEach(() => {
	board = new InMemoryFeatureBoard();
	ids = 0;
});

describe('SubmitFeatureRequest', () => {
	const input = { email: MEMBER, title: 'Let subscribers pause', body: 'Twenty emails a week about this.' };

	it('lets a paying member post, records the tier, and counts their own vote', async () => {
		const r = await submit().execute(input);
		expect(r.status).toBe('considering');
		expect(r.authorTier).toBe('Pro');
		const [row] = await board.list(MEMBER);
		expect(row.score).toBe(VOTE_WEIGHT.member);
		expect(row.votedByViewer).toBe(true);
	});

	it('refuses a visitor who is not paying', async () => {
		await expect(submit().execute({ ...input, email: VISITOR })).rejects.toThrow(SubmitRefused);
		await expect(submit().execute({ ...input, email: VISITOR })).rejects.toMatchObject({ code: 'not-member' });
		expect(board.requests.size).toBe(0);
	});

	it('caps how many open requests one author may hold', async () => {
		for (let i = 0; i < MAX_OPEN_PER_AUTHOR; i++) await submit().execute(input);
		await expect(submit().execute(input)).rejects.toMatchObject({ code: 'too-many-open' });
		// Shipping one frees a slot, because the cap counts open requests only.
		const first = [...board.requests.values()][0];
		await board.save(first.withStatus('shipped', null, new Date()));
		await expect(submit().execute(input)).resolves.toBeDefined();
	});

	it('surfaces the entity validation as a refusal code', async () => {
		await expect(submit().execute({ ...input, title: 'ab' })).rejects.toMatchObject({ code: 'short-title' });
	});

	it('refuses each invalid field with its own code and stores nothing (review 0003 m-5)', async () => {
		const cases = [
			[{ title: 't'.repeat(121) }, 'long-title'],
			[{ body: 'b'.repeat(9) }, 'short-body'],
			[{ body: 'b'.repeat(2001) }, 'long-body']
		] as const;
		for (const [over, code] of cases) await expect(submit().execute({ ...input, ...over })).rejects.toMatchObject({ code });
		expect(board.requests.size).toBe(0);
	});
});

describe('ToggleVote', () => {
	it('gives a member a heavier vote than a visitor, and shows both counts', async () => {
		const r = seed();
		const vote = new ToggleVote(board, members);
		await vote.execute(r.id, MEMBER);
		await vote.execute(r.id, VISITOR);
		const [row] = await board.list(null);
		expect(row.score).toBe(VOTE_WEIGHT.member + VOTE_WEIGHT.public);
		expect(row.voters).toBe(2);
		expect(row.memberVoters).toBe(1);
	});

	it('is a toggle: clicking twice removes the vote instead of doubling it', async () => {
		const r = seed();
		const vote = new ToggleVote(board, members);
		expect(await vote.execute(r.id, VISITOR)).toBe(true);
		expect(await vote.execute(r.id, VISITOR)).toBe(false);
		expect((await board.list(null))[0].score).toBe(0);
	});

	it('treats the same email case-insensitively, so one person can never hold two votes', async () => {
		const r = seed();
		const vote = new ToggleVote(board, members);
		await vote.execute(r.id, VISITOR);
		expect(await board.hasVoted(r.id, VISITOR.toUpperCase())).toBe(true);
		// A different casing is the same person, so the second click removes the vote
		// instead of adding a second one — the count goes to 0, never to 2.
		expect(await vote.execute(r.id, VISITOR.toUpperCase())).toBe(false);
		expect((await board.list(null))[0].voters).toBe(0);
	});

	it('refuses votes on a decided request, and on one that does not exist', async () => {
		const shipped = seed({ status: 'shipped', shippedAt: new Date('2026-09-10') });
		const vote = new ToggleVote(board, members);
		await expect(vote.execute(shipped.id, VISITOR)).rejects.toMatchObject({ code: 'closed' });
		await expect(vote.execute('nope', VISITOR)).rejects.toThrow(VoteRefused);
		await expect(vote.execute('nope', VISITOR)).rejects.toMatchObject({ code: 'not-found' });
	});

	it('changes nothing when a vote is refused (spec 0003 AC-5)', async () => {
		const declined = seed({ status: 'declined', note: 'Out of scope.' });
		const vote = new ToggleVote(board, members);
		const before = (await board.list(null)).find((i) => i.request.id === declined.id)!;
		await expect(vote.execute(declined.id, MEMBER)).rejects.toMatchObject({ code: 'closed' });
		const after = (await board.list(null)).find((i) => i.request.id === declined.id)!;
		expect([after.score, after.voters, after.memberVoters]).toEqual([before.score, before.voters, before.memberVoters]);
	});
});

describe('UpdateFeatureStatus', () => {
	const isAdmin = (e: string) => e === ADMIN;

	it('lets the builder move a request and write a public note', async () => {
		const r = seed();
		const next = await new UpdateFeatureStatus(board, isAdmin).execute({ actorEmail: ADMIN, id: r.id, status: 'building', note: 'Started today.' });
		expect(next.status).toBe('building');
		expect(next.note).toBe('Started today.');
	});

	it('refuses everyone else, including the member who requested it', async () => {
		const r = seed();
		await expect(new UpdateFeatureStatus(board, isAdmin).execute({ actorEmail: MEMBER, id: r.id, status: 'shipped', note: null }))
			.rejects.toMatchObject({ code: 'not-admin' });
		await expect(new UpdateFeatureStatus(board, isAdmin).execute({ actorEmail: VISITOR, id: r.id, status: 'shipped', note: null }))
			.rejects.toThrow(StatusRefused);
		expect((await board.findById(r.id))!.status).toBe('considering');
	});

	it('refuses a request that does not exist (not-found) and a note over 500 characters (long-note)', async () => {
		const r = seed();
		const update = new UpdateFeatureStatus(board, isAdmin);
		await expect(update.execute({ actorEmail: ADMIN, id: 'nope', status: 'planned', note: null })).rejects.toMatchObject({ code: 'not-found' });
		await expect(update.execute({ actorEmail: ADMIN, id: r.id, status: 'planned', note: 'n'.repeat(501) })).rejects.toMatchObject({ code: 'long-note' });
		expect((await board.findById(r.id))!.status).toBe('considering');
	});

	it('lets a storage failure surface as itself, not as a refusal (review 0003 m-1)', async () => {
		const r = seed();
		const broken = Object.assign(Object.create(board), { save: async () => { throw new Error('connection terminated'); } });
		const attempt = new UpdateFeatureStatus(broken, isAdmin).execute({ actorEmail: ADMIN, id: r.id, status: 'planned', note: null });
		await expect(attempt).rejects.toThrow('connection terminated');
		await expect(attempt).rejects.not.toBeInstanceOf(StatusRefused);
	});
});

describe('ListRoadmap', () => {
	it('ranks open requests by score and lists shipped ones newest first', async () => {
		const low = seed({ id: 'low' });
		const high = seed({ id: 'high' });
		const older = seed({ id: 'older', status: 'shipped', shippedAt: new Date('2026-08-01') });
		const newer = seed({ id: 'newer', status: 'shipped', shippedAt: new Date('2026-09-01') });
		const vote = new ToggleVote(board, members);
		await vote.execute(high.id, MEMBER);
		await vote.execute(low.id, VISITOR);

		const columns = await new ListRoadmap(board).execute(null);
		const byStatus = Object.fromEntries(columns.map((c) => [c.status, c.items.map((i) => i.request.id)]));
		expect(byStatus.considering).toEqual([high.id, low.id]);
		expect(byStatus.shipped).toEqual([newer.id, older.id]);
		expect(byStatus.building).toEqual([]);
	});

	it('breaks a score tie by showing the newer request first (spec 0003 AC-2)', async () => {
		const older = seed({ id: 'tie-older', createdAt: new Date('2026-08-01'), updatedAt: new Date('2026-08-01') });
		const newer = seed({ id: 'tie-newer', createdAt: new Date('2026-09-01'), updatedAt: new Date('2026-09-01') });
		const columns = await new ListRoadmap(board).execute(null);
		const considering = columns.find((c) => c.status === 'considering')!.items.map((i) => i.request.id);
		expect(considering.indexOf(newer.id)).toBeLessThan(considering.indexOf(older.id));
	});
});
