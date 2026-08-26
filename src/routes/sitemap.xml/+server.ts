import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: RequestHandler = async () => {
	const c = container();
	const [posts, docs] = await Promise.all([c.listPublishedPosts.execute(), c.listDocs.execute()]);
	const today = new Date().toISOString().slice(0, 10);
	const urls: { loc: string; lastmod?: string; priority: string; changefreq: string }[] = [
		{ loc: '/', lastmod: today, priority: '1.0', changefreq: 'daily' },
		{ loc: '/journal', lastmod: posts[0]?.publishedAt.slice(0, 10), priority: '0.9', changefreq: 'weekly' },
		{ loc: '/docs', lastmod: today, priority: '0.9', changefreq: 'weekly' },
		{ loc: '/about', priority: '0.5', changefreq: 'monthly' },
		{ loc: '/vip', priority: '0.7', changefreq: 'monthly' },
		{ loc: '/llms.txt', lastmod: today, priority: '0.6', changefreq: 'weekly' },
		{ loc: '/llms-full.txt', lastmod: today, priority: '0.6', changefreq: 'weekly' },
		...posts.map((p) => ({ loc: `/posts/${p.slug}`, lastmod: p.publishedAt.slice(0, 10), priority: '0.8', changefreq: 'monthly' })),
		...docs.filter((d) => d.slug !== 'readme').map((d) => ({ loc: `/docs/${d.slug}`, lastmod: today, priority: '0.8', changefreq: 'monthly' }))
	];
	const xml =
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		urls
			.map(
				(u) =>
					`  <url><loc>${esc(c.site.url + u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
			)
			.join('\n') +
		`\n</urlset>\n`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
