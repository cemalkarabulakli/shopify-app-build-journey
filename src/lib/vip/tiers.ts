import catalog from '../../../content/vip-catalog.json';

/**
 * Edit this file to change the plans. Price ids come from content/vip-catalog.json,
 * which `npm run paddle:catalog` writes; prices themselves live in Paddle and are
 * fetched at runtime with Paddle.PricePreview() — never hard-code amounts here.
 */
export type TierName = 'Starter' | 'Pro' | 'Advanced';
export type BillingCycle = 'month' | 'year';

export interface Tier {
	name: TierName;
	/** Key into the i18n dictionary (description/features are translated). */
	key: 'starter' | 'pro' | 'advanced';
	icon: string;
	featured?: boolean;
	priceId: { month: string; year: string };
}

const ids = (key: Tier['key']) => ({
	month: catalog.tiers[key].monthly.priceId ?? '',
	year: catalog.tiers[key].yearly.priceId ?? ''
});

export const tiers: Tier[] = [
	{ name: 'Starter', key: 'starter', icon: '🥾', priceId: ids('starter') },
	{ name: 'Pro', key: 'pro', icon: '🧭', featured: true, priceId: ids('pro') },
	{ name: 'Advanced', key: 'advanced', icon: '🐉', priceId: ids('advanced') }
];

export const trialDays: number = catalog.trialDays;
