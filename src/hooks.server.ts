import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, isLocale } from '$lib/i18n';
import { container } from '$lib/server/container';

export const SESSION_COOKIE = 'session';

/** Stamp <html lang> from the locale cookie so screen readers and search engines get the right language. */
export const handle: Handle = ({ event, resolve }) => {
	// Who is signed in (null when SESSION_SECRET is unset — accounts simply don't exist then).
	event.locals.user = null;
	const session = event.cookies.get(SESSION_COOKIE);
	if (session) {
		try {
			event.locals.user = container().sessions.decode(session);
		} catch {
			event.locals.user = null;
		}
	}
	const cookie = event.cookies.get('lang');
	const lang = isLocale(cookie) ? cookie : DEFAULT_LOCALE;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};
