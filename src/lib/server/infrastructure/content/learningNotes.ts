/**
 * BR-11: docs/ holds both the public learning notes and the project's engineering rules
 * (architecture.md, security.md, …). Only `NN-<name>.md`, README.md (the /docs intro) and
 * LEARNING.md are published; everything else in the folder stays off the site.
 */
const PUBLISHED = /^(\d{2}-.+|README|LEARNING)\.md$/;

export function isLearningNote(fileName: string): boolean {
	return PUBLISHED.test(fileName);
}
