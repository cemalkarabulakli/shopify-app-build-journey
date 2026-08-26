import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export type StepStatus = 'done' | 'next' | 'todo';
export interface PathStep {
	n: number;
	title: string;
	icon: string;
	time: string;
	learn: string;
	done: string;
	docs: string[];
	status: StepStatus;
}
export interface LearningPath {
	intro: string;
	rule: string;
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
			steps: (raw.steps ?? []).map((s: Partial<PathStep>) => ({
				n: Number(s.n),
				title: s.title ?? '',
				icon: s.icon ?? '📍',
				time: s.time ?? '',
				learn: s.learn ?? '',
				done: s.done ?? '',
				docs: s.docs ?? [],
				status: s.status ?? 'todo'
			}))
		};
	}

	private read(locale: string) {
		return readFile(join(this.dir, `path.${locale}.json`), 'utf8');
	}
}
