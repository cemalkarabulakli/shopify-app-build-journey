import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const c = container();
	const xml = c.rssSerializer.serialize(await c.buildFeed.execute());
	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=300'
		}
	});
};
