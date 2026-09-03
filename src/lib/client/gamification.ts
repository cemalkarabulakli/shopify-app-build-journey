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

/** A stage on the map: its ordered scrolls plus one "done when" task the reader ticks off. */
export interface Stage {
	id: string;
	docs: string[];
}

/** A stage is complete when every scroll is read and its task is ticked. */
export function stageComplete(stage: Stage, readDoc: (slug: string) => boolean, taskDone: (id: string) => boolean): boolean {
	return stage.docs.every(readDoc) && taskDone(stage.id);
}

/**
 * Everything starts sealed. Stage 0 is open; each later stage opens when the one before it is complete.
 * Inside an open stage, scrolls open one at a time: a scroll opens when the one before it is read.
 */
export function unlocked(stages: Stage[], readDoc: (slug: string) => boolean, taskDone: (id: string) => boolean) {
	const openStages = new Set<string>();
	const openDocs = new Set<string>();
	for (let i = 0; i < stages.length; i++) {
		const stage = stages[i];
		if (i > 0 && !stageComplete(stages[i - 1], readDoc, taskDone)) break;
		openStages.add(stage.id);
		for (let j = 0; j < stage.docs.length; j++) {
			if (j > 0 && !readDoc(stage.docs[j - 1])) break;
			openDocs.add(stage.docs[j]);
		}
	}
	return {
		stage: (id: string) => openStages.has(id),
		/** Scrolls that are on no stage are never sealed. */
		doc: (slug: string) => openDocs.has(slug) || !stages.some((s) => s.docs.includes(slug))
	};
}

/** The map's reading order, flattened; scrolls on no stage come last, by slug. */
export function scrollOrder(stages: Stage[], slugs: string[]): string[] {
	const onMap = stages.flatMap((s) => s.docs).filter((s) => slugs.includes(s));
	return [...onMap, ...slugs.filter((s) => !onMap.includes(s)).sort()];
}
