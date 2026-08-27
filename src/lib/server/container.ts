import { resolve } from 'node:path';
import { BuildFeed, ExportMarkdown, GetAccessForEmail, GetPublishedPost, HandleBillingEvent, ListPublishedPosts, MagicLinkLogin } from '$lib/application';
import { loadSiteConfig, requirePaddle } from './config/siteConfig';
import { CachedPostRepository } from './infrastructure/content/CachedPostRepository';
import { FileSystemPostRepository } from './infrastructure/content/FileSystemPostRepository';
import { MarkedMarkdownRenderer } from './infrastructure/content/MarkedMarkdownRenderer';
import { RssFeedSerializer } from './presentation/RssFeedSerializer';
import { rewriteRelativeMarkdownLinks } from './infrastructure/content/rewriteRelativeMarkdownLinks';
import { Post } from '$lib/domain/post';
import { FileSystemPathRepository } from './infrastructure/content/FileSystemPathRepository';
import { PaddleWebhookAdapter } from './infrastructure/vip/PaddleWebhookAdapter';
import { PaddlePortal } from './infrastructure/vip/PaddlePortal';
import { PgBillingStore, subscriptionRepo, transactionRepo } from './infrastructure/vip/PgBillingStore';
import { SessionCodec } from './infrastructure/auth/Session';
import { ConsoleEmailSender, ResendEmailSender } from './infrastructure/auth/EmailSenders';

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

	// Billing/auth: everything below is lazy so the public site runs with no DATABASE_URL/Paddle env,
	// and a misconfiguration fails the one request that needs it — loudly — not the whole site.
	let store: PgBillingStore | undefined;
	const billing = () => {
		if (!site.databaseUrl) throw new Error('DATABASE_URL is not set — billing, webhooks and accounts need Postgres');
		return (store ??= new PgBillingStore(site.databaseUrl));
	};
	const email = () => (site.email.resendApiKey ? new ResendEmailSender(site.email.resendApiKey, site.email.from) : new ConsoleEmailSender());

	return {
		site,
		get paddleWebhooks() {
			return new PaddleWebhookAdapter(site.paddle.webhookSecret, requirePaddle(site).environment);
		},
		get paddlePortal() {
			return new PaddlePortal(site.paddle.apiKey, requirePaddle(site).environment);
		},
		get handleBillingEvent() {
			const s = billing();
			return new HandleBillingEvent(s, subscriptionRepo(s), transactionRepo(s), s);
		},
		get getAccessForEmail() {
			const s = billing();
			return new GetAccessForEmail(s, subscriptionRepo(s));
		},
		get magicLinkLogin() {
			return new MagicLinkLogin(billing(), email(), site.url);
		},
		get sessions() {
			return new SessionCodec(site.sessionSecret);
		},
		path: new FileSystemPathRepository(resolve(site.pathDir)),
		listDocs: new ListPublishedPosts(docs, Post.bySlug),
		exportDocs: new ExportMarkdown(docs, (md) => rewriteRelativeMarkdownLinks(md, `${site.url}/docs`), Post.bySlug),
		exportPosts: new ExportMarkdown(posts),
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
