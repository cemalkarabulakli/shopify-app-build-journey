import { Post, PostNotFoundError, type PostRepository } from '$lib/domain/post';

export interface MarkdownExport {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	markdown: string;
}

/** Raw markdown for machines (LLM crawlers, `.md` alternates) — same publish rules as HTML. */
export class ExportMarkdown {
	constructor(
		private readonly posts: PostRepository,
		private readonly preprocess: (markdown: string) => string = (md) => md,
		private readonly order: (a: Post, b: Post) => number = Post.byNewest
	) {}

	async one(slug: string): Promise<MarkdownExport> {
		const post = await this.posts.findBySlug(slug);
		if (!post || !post.isPublished()) throw new PostNotFoundError(slug);
		return this.toExport(post);
	}

	async all(): Promise<MarkdownExport[]> {
		const all = await this.posts.findAll();
		return all.filter((p) => p.isPublished()).sort(this.order).map((p) => this.toExport(p));
	}

	private toExport(post: Post): MarkdownExport {
		return {
			slug: post.slug,
			title: post.title,
			summary: post.summary,
			publishedAt: post.publishedAt.toISOString(),
			markdown: this.preprocess(post.body)
		};
	}
}
