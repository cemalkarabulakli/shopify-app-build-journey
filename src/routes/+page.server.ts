import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

/** Home = the ordered path. Docs and journal entries are attached to the step they belong to. */
export const load: PageServerLoad = async ({ parent }) => {
	const { locale } = await parent();
	const c = container();
	const [path, docs, posts, merchantIds] = await Promise.all([
		c.path.load(locale),
		c.listDocs.execute(),
		c.listPublishedPosts.execute(),
		// The outreach quest counts only merchants still in the catalog; a broken list must not take the map down.
		c.listMerchants.execute(locale).then(
			(ms) => ms.map((m) => m.id),
			(e) => {
				console.error('[map] merchant list unavailable:', (e as Error).message);
				return [] as string[];
			}
		)
	]);
	const bySlug = new Map(docs.map((d) => [d.slug, d]));
	return {
		intro: path.intro,
		rule: path.rule,
		chapters: path.chapters,
		merchantIds,
		steps: path.steps.map((s) => ({
			...s,
			docs: s.docs.map((slug) => bySlug.get(slug)).filter((d) => d !== undefined),
			posts: posts.filter((p) => p.tags.includes(`faz-${s.n}`))
		}))
	};
};
