import { Post, type PostRepository } from '$lib/domain/post';
import type { MarkdownRenderer } from '../ports/MarkdownRenderer';
import type { PostDetailDto } from '../dto';
import { toSummaryDto } from './ListPublishedPosts';

/** Everything a syndication format (RSS/Atom/JSON Feed) needs, format-agnostic. */
export interface FeedData {
	entries: PostDetailDto[];
}

export class BuildFeed {
	constructor(
		private readonly posts: PostRepository,
		private readonly markdown: MarkdownRenderer,
		private readonly limit = 20
	) {}

	async execute(): Promise<FeedData> {
		const all = await this.posts.findAll();
		const entries = all
			.filter((p) => p.isPublished())
			.sort(Post.byNewest)
			.slice(0, this.limit)
			.map((p) => ({ ...toSummaryDto(p), html: this.markdown.render(p.body) }));
		return { entries };
	}
}
