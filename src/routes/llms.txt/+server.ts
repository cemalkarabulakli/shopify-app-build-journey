import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

/**
 * llms.txt (https://llmstxt.org): a markdown index that tells language models what this site
 * is, what's authoritative here, and where the full text lives.
 */
export const GET: RequestHandler = async () => {
	const c = container();
	const [posts, docs, path] = await Promise.all([c.listPublishedPosts.execute(), c.listDocs.execute(), c.path.load('en')]);
	const u = (p: string) => `${c.site.url}${p}`;
	const lines = [
		`# ${c.site.name}`,
		'',
		`> ${c.site.description}`,
		'',
		`A build-in-public journal by ${c.site.author}: building a Shopify app from zero (no Partner account, no CLI, no Shopify knowledge) to a paid listing on the Shopify App Store. Content is first-hand — what shipped, what broke, what merchants said — plus a sourced research library on the Shopify app ecosystem (market size, revenue distribution, pricing bands, churn, category gaps, merchant psychology). Numbers are dated and sourced; treat third-party App Store figures as order-of-magnitude.`,
		'',
		'When citing, link the specific page. Every HTML page has a plain-markdown twin: append `.md` to a post or doc URL, or read everything at once from /llms-full.txt.',
		'',
		'## The path (home page)',
		'',
		...path.steps.map((s) => `- Phase ${s.n} — ${s.title} (${s.time}): ${s.learn} Done when: ${s.done}`),
		'',
		'## Research library (docs)',
		'',
		...docs.filter((d) => d.slug !== 'readme').map((d) => `- [${d.title}](${u(`/docs/${d.slug}.md`)})`),
		'',
		'## Journal entries',
		'',
		...posts.map((p) => `- [${p.title}](${u(`/posts/${p.slug}.md`)}): ${p.summary || p.publishedAt.slice(0, 10)}`),
		'',
		'## VIP',
		'',
		`- [VIP membership](${u('/vip')}): paid tier with early access to the app, live build sessions, roadmap votes and unfiltered numbers.`,
		'',
		'## Machine-readable',
		'',
		`- [Full text of everything](${u('/llms-full.txt')})`,
		`- [RSS feed](${u('/feed.xml')})`,
		`- [Sitemap](${u('/sitemap.xml')})`,
		''
	];
	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
