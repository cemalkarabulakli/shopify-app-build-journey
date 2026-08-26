import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { env } from '$env/dynamic/public';
import { container } from '$lib/server/container';
import type { PageServerLoad } from './$types';

export type Cycle = 'monthly' | 'yearly';
interface CatalogPrice { priceId: string | null; USD: string }
interface Catalog { trialDays: number; tiers: Record<string, { productId: string | null; monthly: CatalogPrice; yearly: CatalogPrice }> }

/** Product/price ids written by `npm run paddle:catalog`; not secrets. */
async function loadCatalog(): Promise<Catalog> {
	return JSON.parse(await readFile(resolve('content/vip-catalog.json'), 'utf8'));
}

export const load: PageServerLoad = async () => {
	const { site } = container();
	const catalog = await loadCatalog();
	return {
		paddle: { token: env.PUBLIC_PADDLE_CLIENT_TOKEN || '', environment: site.paddle.environment, successUrl: `${site.url}/vip/success` },
		trialDays: catalog.trialDays,
		tiers: Object.entries(catalog.tiers).map(([key, t]) => ({
			key,
			monthly: { priceId: t.monthly.priceId, usd: Number(t.monthly.USD) / 100 },
			yearly: { priceId: t.yearly.priceId, usd: Number(t.yearly.USD) / 100 }
		}))
	};
};
