import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const c = container();
	const all = await c.listDocs.execute();
	// README is the index text; everything else is the reading list.
	const intro = all.some((d) => d.slug === 'readme') ? await c.getDoc.execute('readme') : null;
	return { intro, docs: all.filter((d) => d.slug !== 'readme') };
};
