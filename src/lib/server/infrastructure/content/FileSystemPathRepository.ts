import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export type StepStatus = 'done' | 'next' | 'todo';
/** A real-world task on a phase (spec 0002); `outreach` completes from merchants reached out to. */
export interface PathQuest {
	id: string;
	title: string;
	kind?: 'outreach';
	target?: number;
}
export interface PathStep {
	n: number;
	title: string;
	icon: string;
	time: string;
	learn: string;
	done: string;
	docs: string[];
	status: StepStatus;
	quests: PathQuest[];
}
/** The journey's four parts, each a run of phases. */
export interface PathChapter {
	title: string;
	phases: number[];
}
export interface LearningPath {
	intro: string;
	rule: string;
	chapters: PathChapter[];
	steps: PathStep[];
}

/** Reads the ordered learning path from `path.<locale>.json` (falls back to `path.en.json`). */
export class FileSystemPathRepository {
	constructor(private readonly dir: string) {}

	async load(locale: string): Promise<LearningPath> {
		const raw = JSON.parse(await this.read(locale).catch(() => this.read('en')));
		return {
			intro: raw.intro ?? '',
			rule: raw.rule ?? '',
			chapters: (raw.chapters ?? []).map((c: Partial<PathChapter>) => ({
				title: c.title ?? '',
				phases: (c.phases ?? []).map(Number)
			})),
			steps: (raw.steps ?? []).map((s: Partial<PathStep>) => ({
				n: Number(s.n),
				title: s.title ?? '',
				icon: s.icon ?? '📍',
				time: s.time ?? '',
				learn: s.learn ?? '',
				done: s.done ?? '',
				docs: s.docs ?? [],
				status: s.status ?? 'todo',
				quests: (s.quests ?? []).map((q) => ({
					id: q.id,
					title: q.title ?? '',
					...(q.kind === 'outreach' ? { kind: 'outreach' as const, target: Number(q.target ?? 3) } : {})
				}))
			}))
		};
	}

	private read(locale: string) {
		return readFile(join(this.dir, `path.${locale}.json`), 'utf8');
	}
}
