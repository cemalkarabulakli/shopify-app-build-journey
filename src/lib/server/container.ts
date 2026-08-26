import { resolve } from 'node:path';
import { BuildFeed, GetPublishedPost, ListPublishedPosts } from '$lib/application';
import { loadSiteConfig } from './config/siteConfig';
import { CachedPostRepository } from './infrastructure/content/CachedPostRepository';
import { FileSystemPostRepository } from './infrastructure/content/FileSystemPostRepository';
import { MarkedMarkdownRenderer } from './infrastructure/content/MarkedMarkdownRenderer';
import { RssFeedSerializer } from './presentation/RssFeedSerializer';
import { rewriteRelativeMarkdownLinks } from './infrastructure/content/rewriteRelativeMarkdownLinks';
import { Post } from '$lib/domain/post';

/**
 * Composition root — the only place where concrete classes are wired together.
 * Routes ask the container for use cases; they never `new` an adapter themselves.
 */
function buildContainer() {
	const site = loadSiteConfig();
	const markdown = new MarkedMarkdownRenderer();
	const posts = new CachedPostRepository(
		new FileSystemPostRepository(resolve(site.contentDir)),
		site.cacheTtlMs
	);
	// Standalone pages (roadmap, etc.) are the same shape as posts, so the same
	// repository and use case serve them — a second instance, not a new abstraction.
	const pages = new CachedPostRepository(
		new FileSystemPostRepository(resolve(site.pagesDir)),
		site.cacheTtlMs
	);

	// Learning docs live in /docs at the repo root; same shape again, ordered by
	// filename (00-, 01-, …) and with `[x](FILE.md)` links pointed at /docs/file.
	const docs = new CachedPostRepository(
		new FileSystemPostRepository(resolve(site.docsDir)),
		site.cacheTtlMs
	);

	return {
		site,
		listDocs: new ListPublishedPosts(docs, Post.bySlug),
		getDoc: new GetPublishedPost(docs, markdown, (md) => rewriteRelativeMarkdownLinks(md, '/docs')),
		listPublishedPosts: new ListPublishedPosts(posts),
		getPublishedPost: new GetPublishedPost(posts, markdown),
		getPage: new GetPublishedPost(pages, markdown),
		buildFeed: new BuildFeed(posts, markdown),
		rssSerializer: new RssFeedSerializer(site)
	};
}

export type Container = ReturnType<typeof buildContainer>;

let instance: Container | undefined;
export function container(): Container {
	return (instance ??= buildContainer());
}
