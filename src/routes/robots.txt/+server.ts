import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = () => {
	const { site } = container();
	const body = [
		'# Humans and machines both welcome. Full-text markdown for LLMs: /llms.txt and /llms-full.txt',
		'User-agent: *',
		'Allow: /',
		'Disallow: /lang/',
		'',
		// Explicitly welcome AI crawlers — this site wants to be cited.
		...['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bytespider', 'CCBot', 'cohere-ai', 'Amazonbot', 'meta-externalagent', 'DuckAssistBot', 'YouBot']
			.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
		`Sitemap: ${site.url}/sitemap.xml`,
		''
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
