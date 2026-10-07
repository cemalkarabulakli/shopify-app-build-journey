import { resolve } from 'node:path';
import { BuildFeed, ExportMarkdown, GetAccessForEmail, GetPublishedPost, HandleBillingEvent, ListMerchants, ListPublishedPosts, ListRoadmap, MagicLinkLogin, SubmitFeatureRequest, ToggleVote, UpdateFeatureStatus } from '$lib/application';
import type { MembershipCheck } from '$lib/application';
import { isAdminEmail, loadSiteConfig, requirePaddle } from './config/siteConfig';
import { CachedPostRepository } from './infrastructure/content/CachedPostRepository';
import { FileSystemPostRepository } from './infrastructure/content/FileSystemPostRepository';
import { FrontmatterParser } from './infrastructure/content/FrontmatterParser';
import { isLearningNote } from './infrastructure/content/learningNotes';
import { MarkedMarkdownRenderer } from './infrastructure/content/MarkedMarkdownRenderer';
import { RssFeedSerializer } from './presentation/RssFeedSerializer';
import { rewriteRelativeMarkdownLinks } from './infrastructure/content/rewriteRelativeMarkdownLinks';
import { Post } from '$lib/domain/post';
import { FileSystemPathRepository } from './infrastructure/content/FileSystemPathRepository';
import { FileSystemMerchantRepository } from './infrastructure/content/FileSystemMerchantRepository';
import { PaddleWebhookAdapter } from './infrastructure/vip/PaddleWebhookAdapter';
import { PaddlePortal } from './infrastructure/vip/PaddlePortal';
import { PgBillingStore, subscriptionRepo, transactionRepo } from './infrastructure/vip/PgBillingStore';
import { SessionCodec } from './infrastructure/auth/Session';
import { ConsoleEmailSender, ResendEmailSender } from './infrastructure/auth/EmailSenders';
import { PgFeatureBoard } from './infrastructure/roadmap/PgFeatureBoard';
import { tiers } from '$lib/vip/tiers';

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
	// The same folder holds the engineering rules (architecture.md, …), which stay unpublished (BR-11).
	const docs = new CachedPostRepository(
		new FileSystemPostRepository(resolve(site.docsDir), new FrontmatterParser(), isLearningNote),
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

	// Roadmap board: its own adapter and pool, so the public board is one query and is
	// independent of the billing tables it never writes to.
	let featureBoard: PgFeatureBoard | undefined;
	const board = () => {
		if (!site.databaseUrl) throw new Error('DATABASE_URL is not set — the roadmap board needs Postgres');
		return (featureBoard ??= new PgFeatureBoard(site.databaseUrl));
	};
	/** Resolves "is this a paying member" through the billing mirror, plus the tier's display name. */
	const membership = (): MembershipCheck => ({
		isMember: async (addr: string) => {
			const s = billing();
			const access = await new GetAccessForEmail(s, subscriptionRepo(s)).execute(addr);
			if (!access.hasAccess || !access.active) return { member: false, tier: null };
			const priceId = access.active.priceId;
			const tier = tiers.find((t) => t.priceId.month === priceId || t.priceId.year === priceId);
			return { member: true, tier: tier?.name ?? 'VIP' };
		}
	});

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
		get listRoadmap() {
			return new ListRoadmap(board());
		},
		get membership(): MembershipCheck {
			return membership();
		},
		get submitFeatureRequest() {
			return new SubmitFeatureRequest(board(), membership());
		},
		get toggleVote() {
			return new ToggleVote(board(), membership());
		},
		get updateFeatureStatus() {
			return new UpdateFeatureStatus(board(), (addr) => isAdminEmail(site, addr));
		},
		isAdmin: (addr: string | null | undefined) => isAdminEmail(site, addr),
		path: new FileSystemPathRepository(resolve(site.pathDir)),
		// The curated merchants sit next to the path files (spec 0002); story links resolve against docs.
		listMerchants: new ListMerchants(new FileSystemMerchantRepository(resolve(site.pathDir, 'merchants.json')), docs),
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
