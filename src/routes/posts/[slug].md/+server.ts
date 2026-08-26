import { error } from '@sveltejs/kit';
import { PostNotFoundError } from '$lib/domain/post';
import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

/** Markdown twin of the HTML page — what `<link rel="alternate" type="text/markdown">` points at. */
export const GET: RequestHandler = async ({ params }) => {
	const c = container();
	try {
		const d = await c.exportPosts.one(params.slug);
		const body = `# ${d.title}\n\n> Source: ${c.site.url}/posts/${d.slug}\n\n${d.markdown.trim()}\n`;
		return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
	} catch (e) {
		if (e instanceof PostNotFoundError) error(404, 'Not found');
		throw e;
	}
};
