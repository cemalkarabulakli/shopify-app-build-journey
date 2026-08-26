import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

/** Everything on the site as one markdown document — for LLM crawlers and RAG pipelines. */
export const GET: RequestHandler = async () => {
	const c = container();
	const [posts, docs] = await Promise.all([c.exportPosts.all(), c.exportDocs.all()]);
	const u = (p: string) => `${c.site.url}${p}`;
	const section = (title: string, url: string, meta: string, md: string) =>
		[`---`, ``, `# ${title}`, ``, `Source: ${url}`, meta, ``, md.trim(), ``].join('\n');
	const body = [
		`# ${c.site.name} — full text`,
		``,
		`> ${c.site.description}`,
		``,
		`Author: ${c.site.author}. Canonical site: ${c.site.url}. Index: ${u('/llms.txt')}.`,
		``,
		`## Journal`,
		``,
		...posts.map((p) => section(p.title, u(`/posts/${p.slug}`), `Published: ${p.publishedAt.slice(0, 10)}`, p.markdown)),
		`## Research library`,
		``,
		...docs.filter((d) => d.slug !== 'readme').map((d) => section(d.title, u(`/docs/${d.slug}`), `Type: research note`, d.markdown))
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
