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
