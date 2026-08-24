import { error } from '@sveltejs/kit';
import { PostNotFoundError } from '$lib/domain/post';
import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		return { post: await container().getPublishedPost.execute(params.slug) };
	} catch (e) {
		if (e instanceof PostNotFoundError) error(404, 'Entry not found');
		throw e;
	}
};
