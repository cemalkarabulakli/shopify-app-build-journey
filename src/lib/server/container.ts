import { resolve } from 'node:path';
import { BuildFeed, GetPublishedPost, ListPublishedPosts } from '$lib/application';
import { loadSiteConfig } from './config/siteConfig';
import { CachedPostRepository } from './infrastructure/content/CachedPostRepository';
import { FileSystemPostRepository } from './infrastructure/content/FileSystemPostRepository';
import { MarkedMarkdownRenderer } from './infrastructure/content/MarkedMarkdownRenderer';
import { RssFeedSerializer } from './presentation/RssFeedSerializer';
import { rewriteRelativeMarkdownLinks } from './infrastructure/content/rewriteRelativeMarkdownLinks';
import { Post } from '$lib/domain/post';
import { FileSystemPathRepository } from './infrastructure/content/FileSystemPathRepository';

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

	// Learning docs live in /docs at the repo root; same shape again, ordered by
	// filename (00-, 01-, …) and with `[x](FILE.md)` links pointed at /docs/file.
	const docs = new CachedPostRepository(
		new FileSystemPostRepository(resolve(site.docsDir)),
		site.cacheTtlMs
	);

	return {
		site,
		path: new FileSystemPathRepository(resolve(site.pathFile)),
		listDocs: new ListPublishedPosts(docs, Post.bySlug),
		getDoc: new GetPublishedPost(docs, markdown, (md) => rewriteRelativeMarkdownLinks(md, '/docs')),
		listPublishedPosts: new ListPublishedPosts(posts),
		getPublishedPost: new GetPublishedPost(posts, markdown),
		buildFeed: new BuildFeed(posts, markdown),
		rssSerializer: new RssFeedSerializer(site)
	};
}

export type Container = ReturnType<typeof buildContainer>;

let instance: Container | undefined;
export function container(): Container {
	return (instance ??= buildContainer());
}
