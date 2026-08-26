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
