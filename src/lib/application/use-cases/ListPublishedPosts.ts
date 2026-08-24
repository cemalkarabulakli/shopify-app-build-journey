import { Post, type PostRepository } from '$lib/domain/post';
import type { PostSummaryDto } from '../dto';

export class ListPublishedPosts {
	constructor(private readonly posts: PostRepository) {}

	async execute(): Promise<PostSummaryDto[]> {
		const all = await this.posts.findAll();
		return all
			.filter((p) => p.isPublished())
			.sort(Post.byNewest)
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
