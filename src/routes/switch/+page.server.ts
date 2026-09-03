import { error } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import { requirePaddle } from '$lib/server/config/siteConfig';
import catalog from '../../../content/switch-catalog.json';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { site } = container();
	let paddle;
	try {
		paddle = requirePaddle(site); // throws loudly when PUBLIC_PADDLE_ENV is missing
	} catch (e) {
		console.error('[switch]', (e as Error).message);
		error(500, (e as Error).message);
	}
	if (!paddle.clientToken) console.warn('[switch] PUBLIC_PADDLE_CLIENT_TOKEN is not set — checkout disabled');
	if (catalog.environment !== paddle.environment)
		console.warn(`[switch] switch-catalog.json is for "${catalog.environment}" but Paddle runs "${paddle.environment}" — run scripts/paddle-deposit.mjs against this account`);

	return {
		paddle: { token: paddle.clientToken, environment: paddle.environment, successUrl: `${site.url}/switch/thanks` },
		depositPriceId: catalog.environment === paddle.environment ? catalog.depositPriceId : '',
		signedInEmail: locals.user?.email ?? ''
	};
};
