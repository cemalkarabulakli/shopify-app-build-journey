import { container } from '$lib/server/container';
import { DEFAULT_LOCALE, isLocale } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const { site } = container();
	const cookie = cookies.get('lang');
	return {
		locale: isLocale(cookie) ? cookie : DEFAULT_LOCALE,
		site: { name: site.name, url: site.url, author: site.author, description: site.description }
	};
};
