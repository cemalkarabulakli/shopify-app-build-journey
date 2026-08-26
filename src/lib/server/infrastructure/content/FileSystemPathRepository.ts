import { readFile } from 'node:fs/promises';

export type StepStatus = 'done' | 'next' | 'todo';
export interface PathStep {
	n: number;
	title: string;
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

/** Reads the ordered learning path from a JSON file (no YAML dependency needed). */
export class FileSystemPathRepository {
	constructor(private readonly file: string) {}

	async load(): Promise<LearningPath> {
		const raw = JSON.parse(await readFile(this.file, 'utf8'));
		return {
			intro: raw.intro ?? '',
			rule: raw.rule ?? '',
			steps: (raw.steps ?? []).map((s: Partial<PathStep>) => ({
				n: Number(s.n),
				title: s.title ?? '',
				time: s.time ?? '',
				learn: s.learn ?? '',
				done: s.done ?? '',
				docs: s.docs ?? [],
				status: s.status ?? 'todo'
			}))
		};
	}
}
