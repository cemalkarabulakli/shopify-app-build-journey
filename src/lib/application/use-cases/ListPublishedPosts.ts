import { Post, type PostRepository } from '$lib/domain/post';
import type { PostSummaryDto } from '../dto';

export class ListPublishedPosts {
	constructor(
		private readonly posts: PostRepository,
		private readonly order: (a: Post, b: Post) => number = Post.byNewest
	) {}

	async execute(): Promise<PostSummaryDto[]> {
		const all = await this.posts.findAll();
		return all
			.filter((p) => p.isPublished())
			.sort(this.order)
			.map(toSummaryDto);
	}
}

export function toSummaryDto(post: Post): PostSummaryDto {
	return {
		slug: post.slug,
		title: post.title,
		publishedAt: post.publishedAt.toISOString(),
		summary: post.summary,
		tags: [...post.tags]
	};
}
