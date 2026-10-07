import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FileSystemMerchantRepository } from '../FileSystemMerchantRepository';
import { FileSystemPathRepository } from '../FileSystemPathRepository';
import { FileSystemPostRepository } from '../FileSystemPostRepository';
import { FrontmatterParser } from '../FrontmatterParser';
import { isLearningNote } from '../learningNotes';

/** Validates the real content files, so a bad edit fails scripts/check instead of the live map. */
describe('learning path content (spec 0002)', () => {
	const repo = new FileSystemPathRepository(resolve('content'));

	it.each(['en', 'tr'])('%s: every phase has 1–3 quests with unique ids and a title (AC-2)', async (locale) => {
		const path = await repo.load(locale);
		expect(path.steps).toHaveLength(10);
		const ids = path.steps.flatMap((s) => s.quests.map((q) => q.id));
		expect(new Set(ids).size).toBe(ids.length);
		for (const step of path.steps) {
			expect(step.quests.length, `phase ${step.n}`).toBeGreaterThanOrEqual(1);
			expect(step.quests.length, `phase ${step.n}`).toBeLessThanOrEqual(3);
			for (const q of step.quests) expect(q.title.trim(), q.id).not.toBe('');
		}
	});

	it('uses the same quests in both languages, with different wording', async () => {
		const [en, tr] = await Promise.all([repo.load('en'), repo.load('tr')]);
		const ids = (p: typeof en) => p.steps.map((s) => s.quests.map((q) => q.id));
		expect(ids(tr)).toEqual(ids(en));
		expect(tr.steps[0].quests[0].title).not.toBe(en.steps[0].quests[0].title);
	});

	it.each(['en', 'tr'])('%s: exactly one outreach quest, on phase 5, targeting 3 merchants (R6)', async (locale) => {
		const path = await repo.load(locale);
		const outreach = path.steps.flatMap((s) => s.quests.filter((q) => q.kind === 'outreach').map((q) => ({ n: s.n, q })));
		expect(outreach).toHaveLength(1);
		expect(outreach[0].n).toBe(5);
		expect(outreach[0].q.target).toBe(3);
	});

	it.each(['en', 'tr'])('%s: four chapters cover phases 0–9 once each, in order (AC-1)', async (locale) => {
		const path = await repo.load(locale);
		expect(path.chapters.map((c) => c.phases)).toEqual([[0], [1, 2, 3, 4], [5], [6, 7, 8, 9]]);
		for (const c of path.chapters) expect(c.title.trim()).not.toBe('');
	});
});

describe('merchants content (spec 0002)', () => {
	const merchants = () => new FileSystemMerchantRepository(resolve('content/merchants.json')).findAll();

	it('passes every catalog invariant: source, contact, unique ids, en + tr text (AC-14)', async () => {
		await expect(merchants()).resolves.toBeTruthy();
	});

	it('lists at least 8 merchants (AC-6)', async () => {
		expect((await merchants()).length).toBeGreaterThanOrEqual(8);
	});

	it('points story links only at learning notes that exist (AC-6)', async () => {
		const docs = new FileSystemPostRepository(resolve('docs'), new FrontmatterParser(), isLearningNote);
		const slugs = new Set((await docs.findAll()).map((d) => d.slug));
		for (const m of await merchants()) for (const s of m.storySlugs) expect(slugs.has(s), `${m.id} → ${s}`).toBe(true);
	});

	it('cites a figure in every fact, in both languages (R4)', async () => {
		for (const m of await merchants()) {
			expect(m.fact.en, m.id).toMatch(/\d/);
			expect(m.fact.tr, m.id).toMatch(/\d/);
		}
	});
});
