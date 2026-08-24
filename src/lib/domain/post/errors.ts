export class PostNotFoundError extends Error {
	constructor(readonly slug: string) {
		super(`Post "${slug}" not found`);
		this.name = 'PostNotFoundError';
	}
}
