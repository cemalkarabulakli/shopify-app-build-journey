import { redirect } from '@sveltejs/kit';
import { isLocale } from '$lib/i18n';
import type { RequestHandler } from './$types';

/** GET /lang/tr?to=/docs → sets the locale cookie and bounces back. */
export const GET: RequestHandler = ({ params, url, cookies }) => {
	if (isLocale(params.code)) {
		cookies.set('lang', params.code, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
	}
	const to = url.searchParams.get('to') ?? '/';
	redirect(303, to.startsWith('/') ? to : '/');
};
