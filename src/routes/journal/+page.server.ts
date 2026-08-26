import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	posts: await container().listPublishedPosts.execute()
});
