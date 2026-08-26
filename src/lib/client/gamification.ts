/** Pure scoring rules — no state, easy to test. */
export const XP_PER_DOC = 100;
export const XP_PER_PHASE = 500;

export const LEVELS = [
	{ min: 0, icon: '🥾' },
	{ min: 300, icon: '🧭' },
	{ min: 900, icon: '🔦' },
	{ min: 1800, icon: '🗺️' },
	{ min: 3000, icon: '⚓' },
	{ min: 4500, icon: '🐉' }
] as const;

export function xpFor(docsRead: number, phasesDone: number): number {
	return docsRead * XP_PER_DOC + phasesDone * XP_PER_PHASE;
}

export function levelFor(xp: number) {
	let i = 0;
	while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1].min) i++;
	const cur = LEVELS[i];
	const next = LEVELS[i + 1];
	const span = next ? next.min - cur.min : 1;
	return {
		index: i,
		icon: cur.icon,
		hasNext: !!next,
		toNext: next ? next.min - xp : 0,
		pct: next ? Math.round(((xp - cur.min) / span) * 100) : 100
	};
}
