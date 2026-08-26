import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, isLocale } from '$lib/i18n';

/** Stamp <html lang> from the locale cookie so screen readers and search engines get the right language. */
export const handle: Handle = ({ event, resolve }) => {
	const cookie = event.cookies.get('lang');
	const lang = isLocale(cookie) ? cookie : DEFAULT_LOCALE;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};
