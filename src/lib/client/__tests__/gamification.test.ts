import { describe, expect, it } from 'vitest';
import { levelFor, xpFor } from '../gamification';

describe('gamification', () => {
	it('scores docs and phases', () => {
		expect(xpFor(3, 1)).toBe(800);
	});
	it('maps xp to levels with progress to the next one', () => {
		expect(levelFor(0)).toMatchObject({ index: 0, hasNext: true, toNext: 300, pct: 0 });
		expect(levelFor(600)).toMatchObject({ index: 1, pct: 50 });
		expect(levelFor(99_999)).toMatchObject({ index: 5, hasNext: false, pct: 100 });
	});
});

import { scrollOrder, stageComplete, unlocked } from '../gamification';

describe('sealing', () => {
	const stages = [
		{ id: '0', docs: ['a', 'b'] },
		{ id: '1', docs: [] },
		{ id: '2', docs: ['c'] }
	];
	const has = (set: string[]) => (x: string) => set.includes(x);

	it('opens only the first scroll of the first stage at the start', () => {
		const u = unlocked(stages, has([]), has([]));
		expect([u.doc('a'), u.doc('b'), u.doc('c')]).toEqual([true, false, false]);
		expect([u.stage('0'), u.stage('1'), u.stage('2')]).toEqual([true, false, false]);
	});
	it('opens the next scroll when the previous one is read, and the next stage when scrolls + task are done', () => {
		expect(unlocked(stages, has(['a']), has([])).doc('b')).toBe(true);
		expect(unlocked(stages, has(['a', 'b']), has([])).stage('1')).toBe(false);
		const u = unlocked(stages, has(['a', 'b']), has(['0']));
		expect(u.stage('1')).toBe(true);
		expect(u.stage('2')).toBe(false); // stage 1 has no scrolls but its task is not ticked
		expect(unlocked(stages, has(['a', 'b']), has(['0', '1'])).doc('c')).toBe(true);
	});
	it('never seals a scroll that is on no stage', () => {
		expect(unlocked(stages, has([]), has([])).doc('zzz')).toBe(true);
		expect(stageComplete(stages[1], has([]), has(['1']))).toBe(true);
	});
	it('orders scrolls by the map, extras last', () => {
		expect(scrollOrder(stages, ['zzz', 'c', 'a', 'b'])).toEqual(['a', 'b', 'c', 'zzz']);
	});
});

import { QUEST_XP, questDone, questProgress } from '../gamification';

describe('quests (spec 0002)', () => {
	const has = (set: string[]) => (x: string) => set.includes(x);
	const quests = [{ id: 'q0-a' }, { id: 'q0-b' }, { id: 'q5-outreach', kind: 'outreach' as const, target: 3 }];

	it('a quest is worth 150 XP on top of the existing score (AC-3, AC-5)', () => {
		expect(QUEST_XP).toBe(150);
		expect(xpFor(3, 1, 2) - xpFor(3, 1, 1)).toBe(150);
		expect(xpFor(3, 1, 2)).toBe(3 * 100 + 1 * 500 + 2 * 150);
	});
	it('leaves an existing reader with exactly the XP they had (AC-12)', () => {
		expect(xpFor(3, 1)).toBe(800);
		expect(xpFor(3, 1, 0)).toBe(800);
	});
	it('counts each ticked quest once, however often it was toggled (AC-3)', () => {
		expect(questProgress(quests, has(['q0-a', 'q0-a']), 0)).toEqual({ done: 1, total: 3 });
	});
	it('completes the outreach quest at 3 reached merchants and reopens below (AC-10)', () => {
		const outreach = quests[2];
		expect(questDone(outreach, has([]), 2)).toBe(false);
		expect(questDone(outreach, has([]), 3)).toBe(true);
		expect(questDone(outreach, has([]), 4)).toBe(true);
		expect(questDone(outreach, has(['q5-outreach']), 2)).toBe(false); // only merchants count, not a tick
	});
	it('never changes sealing: every quest ticked, nothing read → only phase 0 and its first scroll (AC-4)', () => {
		const stages = [
			{ id: '0', docs: ['a', 'b'] },
			{ id: '1', docs: ['c'] }
		];
		const u = unlocked(stages, has([]), has(['q0-a', 'q0-b', 'q5-outreach']));
		expect([u.stage('0'), u.stage('1')]).toEqual([true, false]);
		expect([u.doc('a'), u.doc('b'), u.doc('c')]).toEqual([true, false, false]);
	});
});
