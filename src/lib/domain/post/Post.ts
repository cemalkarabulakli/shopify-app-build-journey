/**
 * Post — the core entity of the journal.
 * Pure TypeScript: no framework, filesystem or markdown library imports.
 */
export interface PostProps {
	slug: string;
	title: string;
	publishedAt: Date;
	summary: string;
	tags: readonly string[];
	draft: boolean;
	/** Raw markdown body. Rendering is an application concern, not a domain one. */
	body: string;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class Post {
	readonly slug: string;
	readonly title: string;
	readonly publishedAt: Date;
	readonly summary: string;
	readonly tags: readonly string[];
	readonly draft: boolean;
	readonly body: string;

	private constructor(props: PostProps) {
		this.slug = props.slug;
		this.title = props.title;
		this.publishedAt = props.publishedAt;
		this.summary = props.summary;
		this.tags = Object.freeze([...props.tags]);
		this.draft = props.draft;
		this.body = props.body;
	}

	static create(props: PostProps): Post {
		if (!SLUG_PATTERN.test(props.slug)) {
			throw new InvalidPostError(`Invalid slug "${props.slug}" — use lowercase letters, digits and dashes.`);
		}
		if (!props.title.trim()) {
			throw new InvalidPostError(`Post "${props.slug}" has no title.`);
		}
		if (Number.isNaN(props.publishedAt.getTime())) {
			throw new InvalidPostError(`Post "${props.slug}" has an invalid date.`);
		}
		return new Post(props);
	}

	isPublished(): boolean {
		return !this.draft;
	}

	/** Newest first. */
	static byNewest(a: Post, b: Post): number {
		return b.publishedAt.getTime() - a.publishedAt.getTime();
	}
}

export class InvalidPostError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidPostError';
	}
}
