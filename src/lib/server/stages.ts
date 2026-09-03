import { container } from './container';
import type { Stage } from '$lib/client/gamification';

export interface MapStage extends Stage {
	n: number;
	title: string;
}

/** The map's phases as sealing stages: id = phase number, docs in reading order. */
export async function loadStages(locale: string): Promise<MapStage[]> {
	const path = await container().path.load(locale);
	return path.steps.map((s) => ({ id: String(s.n), n: s.n, title: s.title, docs: s.docs }));
}
