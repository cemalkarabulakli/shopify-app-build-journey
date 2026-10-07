import { fail, redirect } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import { SubmitRefused, VoteRefused, StatusRefused } from '$lib/application';
import { MAX_OPEN_PER_AUTHOR, type FeatureStatus, ROADMAP_ORDER } from '$lib/domain/roadmap';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const c = container();
	const email = locals.user?.email ?? null;
	const admin = c.isAdmin(email);

	let columns;
	try {
		columns = await c.listRoadmap.execute(email);
	} catch (e) {
		// No DATABASE_URL, or Postgres is unreachable: show the page, not a stack trace.
		console.error('[roadmap]', (e as Error).message);
		return { columns: [], user: locals.user, isMember: false, admin, unavailable: true, maxOpen: MAX_OPEN_PER_AUTHOR };
	}

	// Only ask about membership when someone is signed in; anonymous visitors still read the whole board.
	let isMember = false;
	if (email) {
		try {
			isMember = (await c.membership.isMember(email)).member;
		} catch (e) {
			console.error('[roadmap] membership lookup failed:', (e as Error).message);
		}
	}

	return {
		columns: columns.map((col) => ({
			status: col.status,
			items: col.items.map((i) => ({
				id: i.request.id,
				title: i.request.title,
				body: i.request.body,
				status: i.request.status,
				authorTier: i.request.authorTier,
				note: i.request.note,
				createdAt: i.request.createdAt.toISOString(),
				shippedAt: i.request.shippedAt?.toISOString() ?? null,
				score: i.score,
				voters: i.voters,
				memberVoters: i.memberVoters,
				voted: i.votedByViewer
			}))
		})),
		user: locals.user,
		isMember,
		admin,
		unavailable: false,
		maxOpen: MAX_OPEN_PER_AUTHOR
	};
};

const isStatus = (v: string): v is FeatureStatus => (ROADMAP_ORDER as readonly string[]).includes(v);

export const actions: Actions = {
	/** Any signed-in visitor may vote; clicking again takes the vote back. */
	vote: async ({ request, locals }) => {
		if (!locals.user) redirect(303, '/account?next=/roadmap');
		const id = String((await request.formData()).get('id') ?? '');
		try {
			await container().toggleVote.execute(id, locals.user.email);
		} catch (e) {
			if (e instanceof VoteRefused) return fail(400, { voteError: e.code });
			console.error('[roadmap] vote failed:', (e as Error).message);
			return fail(500, { voteError: 'db' });
		}
		return { voted: true };
	},

	/** Paying members only — that is the tier's promise and the spam defence. */
	submit: async ({ request, locals }) => {
		if (!locals.user) redirect(303, '/account?next=/roadmap');
		const data = await request.formData();
		const title = String(data.get('title') ?? '');
		const body = String(data.get('body') ?? '');
		try {
			await container().submitFeatureRequest.execute({ email: locals.user.email, title, body });
		} catch (e) {
			if (e instanceof SubmitRefused) return fail(400, { submitError: e.code, title, body });
			console.error('[roadmap] submit failed:', (e as Error).message);
			return fail(500, { submitError: 'db', title, body });
		}
		return { submitted: true };
	},

	/** Admin only: move a request and write the public note that goes with it. */
	status: async ({ request, locals }) => {
		if (!locals.user) redirect(303, '/account?next=/roadmap');
		const data = await request.formData();
		const id = String(data.get('id') ?? '');
		const status = String(data.get('status') ?? '');
		const note = String(data.get('note') ?? '').trim() || null;
		if (!isStatus(status)) return fail(400, { statusError: 'not-found' });
		try {
			await container().updateFeatureStatus.execute({ actorEmail: locals.user.email, id, status, note });
		} catch (e) {
			if (e instanceof StatusRefused) return fail(403, { statusError: e.code });
			console.error('[roadmap] status failed:', (e as Error).message);
			return fail(500, { statusError: 'db' });
		}
		return { statusChanged: true };
	}
};
