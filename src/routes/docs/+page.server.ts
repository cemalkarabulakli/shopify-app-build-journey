import { container } from '$lib/server/container';
import { loadStages } from '$lib/server/stages';
import { scrollOrder } from '$lib/client/gamification';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { locale } = await parent();
	const c = container();
	const [all, stages] = await Promise.all([c.listDocs.execute(), loadStages(locale)]);
	// README is the index text; everything else is the reading list, in map order.
	const intro = all.some((d) => d.slug === 'readme') ? await c.getDoc.execute('readme') : null;
	const docs = all.filter((d) => d.slug !== 'readme');
	const bySlug = new Map(docs.map((d) => [d.slug, d]));
	const ordered = scrollOrder(stages, docs.map((d) => d.slug)).map((s) => bySlug.get(s)!);
	return { intro, stages, docs: ordered.map((d) => ({ slug: d.slug, title: d.title, summary: d.summary })) };
};
