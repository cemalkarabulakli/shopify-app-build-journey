import { container } from '$lib/server/container';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	const { site } = container();
	return { site: { name: site.name, url: site.url, author: site.author, description: site.description } };
};
