import type { Post, PostRepository } from '$lib/domain/post';

/**
 * Decorator (Open/Closed): adds a TTL cache in front of any PostRepository
 * without modifying it. Set ttlMs = 0 to disable (handy in dev).
 */
export class CachedPostRepository implements PostRepository {
	private cache: { posts: Post[]; expires: number } | null = null;

	constructor(
		private readonly inner: PostRepository,
		private readonly ttlMs: number,
		private readonly now: () => number = Date.now
	) {}

	async findAll(): Promise<Post[]> {
		if (this.ttlMs <= 0) return this.inner.findAll();
		if (this.cache && this.cache.expires > this.now()) return this.cache.posts;
		const posts = await this.inner.findAll();
		this.cache = { posts, expires: this.now() + this.ttlMs };
		return posts;
	}

	async findBySlug(slug: string): Promise<Post | null> {
		return (await this.findAll()).find((p) => p.slug === slug) ?? null;
	}
}
