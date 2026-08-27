import { error } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import { requirePaddle } from '$lib/server/config/siteConfig';
import { UNKNOWN_COUNTRY } from '$lib/vip/country';
import { tiers, trialDays } from '$lib/vip/tiers';
import type { PageServerLoad } from './$types';

/**
 * Country from whichever edge/proxy header is present. Absent → undefined, and the
 * client lets Paddle.PricePreview() geolocate from the visitor's IP. The 'OTHERS'
 * sentinel below is app-side only and is never sent to Paddle.
 */
const COUNTRY_HEADERS = ['x-vercel-ip-country', 'cf-ipcountry', 'cloudfront-viewer-country', 'x-country-code'];

function detectCountry(headers: Headers): string {
	for (const h of COUNTRY_HEADERS) {
		const v = headers.get(h)?.trim().toUpperCase();
		if (v && /^[A-Z]{2}$/.test(v) && v !== 'XX' && v !== 'T1') return v;
	}
	return UNKNOWN_COUNTRY;
}

export const load: PageServerLoad = async ({ request, locals }) => {
	const { site } = container();
	let paddle;
	try {
		paddle = requirePaddle(site); // throws loudly when PUBLIC_PADDLE_ENV is missing
	} catch (e) {
		console.error('[vip]', (e as Error).message);
		error(500, (e as Error).message);
	}
	if (!paddle.clientToken) console.warn('[vip] PUBLIC_PADDLE_CLIENT_TOKEN is not set — checkout disabled');

	return {
		paddle: { token: paddle.clientToken, environment: paddle.environment, successUrl: `${site.url}/welcome` },
		country: detectCountry(request.headers),
		// Prefilled from the session (set by the magic-link sign-in in hooks.server.ts).
		signedInEmail: locals.user?.email ?? '',
		tiers,
		trialDays
	};
};
