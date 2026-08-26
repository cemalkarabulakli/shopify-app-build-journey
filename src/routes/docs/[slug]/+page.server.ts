import { error } from '@sveltejs/kit';
import { PostNotFoundError } from '$lib/domain/post';
import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const c = container();
	try {
		const doc = await c.getDoc.execute(params.slug);
		const list = (await c.listDocs.execute()).filter((d) => d.slug !== 'readme');
		const i = list.findIndex((d) => d.slug === doc.slug);
		return { doc, prev: list[i - 1] ?? null, next: list[i + 1] ?? null };
	} catch (e) {
		if (e instanceof PostNotFoundError) error(404, 'Doc not found');
		throw e;
	}
};
