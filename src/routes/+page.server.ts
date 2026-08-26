import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

/** Home = the ordered path. Docs and journal entries are attached to the step they belong to. */
export const load: PageServerLoad = async ({ parent }) => {
	const { locale } = await parent();
	const c = container();
	const [path, docs, posts] = await Promise.all([
		c.path.load(locale),
		c.listDocs.execute(),
		c.listPublishedPosts.execute()
	]);
	const bySlug = new Map(docs.map((d) => [d.slug, d]));
	return {
		intro: path.intro,
		rule: path.rule,
		steps: path.steps.map((s) => ({
			...s,
			docs: s.docs.map((slug) => bySlug.get(slug)).filter((d) => d !== undefined),
			posts: posts.filter((p) => p.tags.includes(`faz-${s.n}`))
		}))
	};
};
