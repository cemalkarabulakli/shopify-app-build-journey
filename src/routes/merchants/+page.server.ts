import { error } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

/** The merchant hall (spec 0002): curated cards plus the outreach quest's target from the path. */
export const load: PageServerLoad = async ({ parent }) => {
	const { locale } = await parent();
	const c = container();
	try {
		const [merchants, path] = await Promise.all([c.listMerchants.execute(locale), c.path.load(locale)]);
		const outreach = path.steps.flatMap((s) => s.quests).find((q) => q.kind === 'outreach');
		return { merchants, target: outreach?.target ?? 3 };
	} catch (e) {
		console.error('[merchants] could not load the merchant list:', (e as Error).message);
		error(500, 'Merchants are unavailable right now.');
	}
};
