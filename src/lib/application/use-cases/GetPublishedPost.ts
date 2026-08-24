import { PostNotFoundError, type PostRepository } from '$lib/domain/post';
import type { MarkdownRenderer } from '../ports/MarkdownRenderer';
import type { PostDetailDto } from '../dto';
import { toSummaryDto } from './ListPublishedPosts';

export class GetPublishedPost {
	constructor(
		private readonly posts: PostRepository,
		private readonly markdown: MarkdownRenderer
	) {}

	async execute(slug: string): Promise<PostDetailDto> {
		const post = await this.posts.findBySlug(slug);
		if (!post || !post.isPublished()) throw new PostNotFoundError(slug);
		return { ...toSummaryDto(post), html: this.markdown.render(post.body) };
	}
}
