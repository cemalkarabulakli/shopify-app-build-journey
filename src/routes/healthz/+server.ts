import type { RequestHandler } from './$types';

export const GET: RequestHandler = () =>
	new Response('ok', { headers: { 'Content-Type': 'text/plain' } });
