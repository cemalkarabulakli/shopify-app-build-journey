import { resolve } from 'node:path';
import { BuildFeed, GetPublishedPost, ListPublishedPosts } from '$lib/application';
import { loadSiteConfig } from './config/siteConfig';
import { CachedPostRepository } from './infrastructure/content/CachedPostRepository';
import { FileSystemPostRepository } from './infrastructure/content/FileSystemPostRepository';
import { MarkedMarkdownRenderer } from './infrastructure/content/MarkedMarkdownRenderer';
import { RssFeedSerializer } from './presentation/RssFeedSerializer';

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

	return {
		site,
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
