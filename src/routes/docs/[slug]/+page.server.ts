import { error } from '@sveltejs/kit';
import { PostNotFoundError } from '$lib/domain/post';
import { container } from '$lib/server/container';
import { loadStages } from '$lib/server/stages';
import { scrollOrder } from '$lib/client/gamification';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { locale } = await parent();
	const c = container();
	try {
		const [doc, all, stages] = await Promise.all([c.getDoc.execute(params.slug), c.listDocs.execute(), loadStages(locale)]);
		const list = all.filter((d) => d.slug !== 'readme');
		const bySlug = new Map(list.map((d) => [d.slug, { slug: d.slug, title: d.title }]));
		const order = scrollOrder(stages, list.map((d) => d.slug));
		const i = order.indexOf(doc.slug);
		const stage = stages.find((s) => s.docs.includes(doc.slug)) ?? null;
		return { doc, stages, stage, prev: bySlug.get(order[i - 1]) ?? null, next: bySlug.get(order[i + 1]) ?? null };
	} catch (e) {
		if (e instanceof PostNotFoundError) error(404, 'Doc not found');
		throw e;
	}
};
