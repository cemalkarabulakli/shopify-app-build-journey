import { Post, type PostProps, type PostRepository } from '$lib/domain/post';

export class InMemoryPostRepository implements PostRepository {
	constructor(private readonly posts: Post[]) {}
	async findAll() {
		return [...this.posts];
	}
	async findBySlug(slug: string) {
		return this.posts.find((p) => p.slug === slug) ?? null;
	}
}

export const makePost = (overrides: Partial<PostProps> = {}) =>
	Post.create({
		slug: 'hello',
		title: 'Hello',
		publishedAt: new Date('2026-01-01'),
		summary: '',
		tags: [],
		draft: false,
		body: '# Hi',
		...overrides
	});
