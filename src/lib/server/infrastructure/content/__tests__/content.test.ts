import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FileSystemPathRepository } from '../FileSystemPathRepository';

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
