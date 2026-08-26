/** Pure scoring rules — no state, easy to test. */
export const XP_PER_DOC = 100;
export const XP_PER_PHASE = 500;

export const LEVELS = [
	{ min: 0, title: 'Meraklı', icon: '🌱' },
	{ min: 300, title: 'Çırak', icon: '🔧' },
	{ min: 900, title: 'Kalfa', icon: '⚙️' },
	{ min: 1800, title: 'Usta', icon: '🛠️' },
	{ min: 3000, title: 'App Builder', icon: '🚀' },
	{ min: 4500, title: 'Merchant Whisperer', icon: '👑' }
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
		title: cur.title,
		icon: cur.icon,
		next: next?.title ?? null,
		toNext: next ? next.min - xp : 0,
		pct: next ? Math.round(((xp - cur.min) / span) * 100) : 100
	};
}
