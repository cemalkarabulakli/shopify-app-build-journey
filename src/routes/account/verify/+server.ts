import { redirect } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import { SESSION_COOKIE } from '../../../hooks.server';
import type { RequestHandler } from './$types';

/** Step 2 of sign-in: exchange the emailed token for a session cookie. */
export const GET: RequestHandler = async ({ url, cookies }) => {
	const c = container();
	const email = await c.magicLinkLogin.verify(url.searchParams.get('token') ?? '');
	if (!email) redirect(303, '/account?error=link');
	cookies.set(SESSION_COOKIE, c.sessions.encode({ email }), { path: '/', httpOnly: true, sameSite: 'lax', secure: url.protocol === 'https:', maxAge: 30 * 24 * 3600 });
	redirect(303, '/account');
};
