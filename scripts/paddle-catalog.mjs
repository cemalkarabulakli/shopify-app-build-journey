#!/usr/bin/env node
/**
 * Creates the VIP catalog in a Paddle account and writes the id mapping to content/vip-catalog.json.
 *
 *   PADDLE_API_KEY=pdl_sdbx_... PUBLIC_PADDLE_ENV=sandbox node scripts/paddle-catalog.mjs
 *
 * Idempotent-ish: if content/vip-catalog.json already has ids for a tier, that tier is skipped.
 * Amounts are strings in the lowest denomination ("1000" = USD 10.00), per Paddle's API.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { Environment, Paddle } from '@paddle/paddle-node-sdk';

const OUT = new URL('../content/vip-catalog.json', import.meta.url);
const apiKey = process.env.PADDLE_API_KEY;
if (!apiKey) {
	console.error('PADDLE_API_KEY is required (sandbox key starts with pdl_sdbx_).');
	process.exit(1);
}
const envName = process.env.PUBLIC_PADDLE_ENV ?? process.env.PADDLE_ENV;
if (envName !== 'sandbox' && envName !== 'production') {
	console.error('PUBLIC_PADDLE_ENV must be "sandbox" or "production" — refusing to guess.');
	process.exit(1);
}
const environment = envName === 'production' ? Environment.production : Environment.sandbox;
const paddle = new Paddle(apiKey, { environment });

/** Local prices, adjusted for purchasing power — starting points, tune in the Paddle dashboard. */
const TIERS = [
	{
		key: 'starter',
		name: 'VIP Starter',
		description: 'Early access to the app, live build sessions, private channel.',
		monthly: { USD: '1000', GBP: '800', EUR: '900', AUD: '1500' },
		yearly: { USD: '10000', GBP: '8000', EUR: '9000', AUD: '15000' }
	},
	{
		key: 'pro',
		name: 'VIP Pro',
		description: 'Everything in Starter plus roadmap votes, raw numbers and a monthly 1:1.',
		monthly: { USD: '4000', GBP: '3200', EUR: '3700', AUD: '6000' },
		yearly: { USD: '40000', GBP: '32000', EUR: '37000', AUD: '60000' }
	},
	{
		key: 'advanced',
		name: 'VIP Advanced',
		description: 'Everything in Pro plus a store teardown, priority feature requests and founding credit.',
		monthly: { USD: '12000', GBP: '9500', EUR: '11000', AUD: '18000' },
		yearly: { USD: '120000', GBP: '95000', EUR: '110000', AUD: '180000' }
	}
];
const OVERRIDES = [
	{ countryCodes: ['GB'], currencyCode: 'GBP' },
	{ countryCodes: ['IE'], currencyCode: 'EUR' },
	{ countryCodes: ['AU'], currencyCode: 'AUD' }
];
const TRIAL = { interval: 'day', frequency: 7 };

async function createPrice(productId, tier, cycle) {
	const amounts = tier[cycle];
	return paddle.prices.create({
		productId,
		name: `${tier.name} — ${cycle}`,
		description: `${tier.name}, billed ${cycle}`,
		unitPrice: { amount: amounts.USD, currencyCode: 'USD' },
		billingCycle: { interval: cycle === 'monthly' ? 'month' : 'year', frequency: 1 },
		trialPeriod: TRIAL,
		taxMode: 'account_setting',
		unitPriceOverrides: OVERRIDES.map((o) => ({
			countryCodes: o.countryCodes,
			unitPrice: { amount: amounts[o.currencyCode], currencyCode: o.currencyCode }
		})),
		customData: { tier: tier.key, cycle }
	});
}

let existing = {};
try {
	existing = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
	/* first run */
}
const catalog = { environment: environment === Environment.production ? 'production' : 'sandbox', trialDays: 7, tiers: existing.tiers ?? {} };

for (const tier of TIERS) {
	if (catalog.tiers[tier.key]?.productId) {
		console.log(`↷ ${tier.name}: already in catalog (${catalog.tiers[tier.key].productId}), skipping`);
		continue;
	}
	const product = await paddle.products.create({
		name: tier.name,
		description: tier.description,
		taxCategory: 'standard',
		customData: { tier: tier.key }
	});
	const monthly = await createPrice(product.id, tier, 'monthly');
	const yearly = await createPrice(product.id, tier, 'yearly');
	catalog.tiers[tier.key] = {
		productId: product.id,
		monthly: { priceId: monthly.id, USD: tier.monthly.USD, overrides: tier.monthly },
		yearly: { priceId: yearly.id, USD: tier.yearly.USD, overrides: tier.yearly }
	};
	console.log(`✓ ${tier.name}: ${product.id} · monthly ${monthly.id} · yearly ${yearly.id}`);
}

await writeFile(OUT, JSON.stringify(catalog, null, 2) + '\n');
console.log(`\nWrote ${OUT.pathname}\n`);
console.log('| Tier | Product | Monthly price id | Yearly price id |\n|---|---|---|---|');
for (const [key, t] of Object.entries(catalog.tiers)) console.log(`| ${key} | ${t.productId} | ${t.monthly.priceId} | ${t.yearly.priceId} |`);
