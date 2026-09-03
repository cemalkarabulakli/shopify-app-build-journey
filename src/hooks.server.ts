import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, isLocale } from '$lib/i18n';
import { container } from '$lib/server/container';
import { redirect } from '@sveltejs/kit';

/** Scrolls were renamed from Turkish to English filenames (Sep 2026); old links still resolve. */
const RENAMED_DOCS: Record<string, string> = {
	'01-eticaret-terimleri': '01-ecommerce-glossary',
	'02-shopify-anatomi': '02-shopify-anatomy',
	'03-ekosistem-verileri': '03-ecosystem-data',
	'04-kaynaklar-ve-erken-uyari': '04-sources-and-early-warning',
	'05-kisiler-ve-vizyon': '05-people-and-vision',
	'06-merchant-psikolojisi': '06-merchant-psychology',
	'07-shopify-etkinlikleri': '07-shopify-events',
	'08-eticaret-etkinlikleri': '08-ecommerce-events',
	'09-podcastler': '09-podcasts'
};

export const SESSION_COOKIE = 'session';

/** Stamp <html lang> from the locale cookie so screen readers and search engines get the right language. */
export const handle: Handle = ({ event, resolve }) => {
	const m = event.url.pathname.match(/^\/docs\/([^/]+?)(\.md)?$/);
	if (m && RENAMED_DOCS[m[1]]) redirect(301, `/docs/${RENAMED_DOCS[m[1]]}${m[2] ?? ''}`);
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
