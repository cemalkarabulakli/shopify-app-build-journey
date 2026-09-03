#!/usr/bin/env node
/**
 * Creates the Zero-Churn Switch founding deposit (one-time, USD 500) in a Paddle
 * account and writes the id mapping to content/switch-catalog.json.
 *
 *   PADDLE_API_KEY=pdl_sdbx_... PUBLIC_PADDLE_ENV=sandbox node scripts/paddle-deposit.mjs
 *
 * Idempotent-ish: if content/switch-catalog.json already has a productId, it exits.
 * Amounts are strings in the lowest denomination ("50000" = USD 500.00), per Paddle's API.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { Environment, Paddle } from '@paddle/paddle-node-sdk';

const OUT = new URL('../content/switch-catalog.json', import.meta.url);
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

const DEPOSIT_USD = '50000'; // USD 500.00 — the refundable founding deposit

let existing = {};
try {
	existing = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
	/* first run */
}
if (existing.productId) {
	console.log(`↷ deposit already in catalog (${existing.productId}), nothing to do`);
	process.exit(0);
}

const product = await paddle.products.create({
	name: 'Zero-Churn Switch — Founding Deposit',
	description: 'Refundable deposit reserving one of five founding-merchant slots.',
	taxCategory: 'standard',
	customData: { offer: 'zero-churn-switch' }
});
const price = await paddle.prices.create({
	productId: product.id,
	name: 'Founding deposit',
	description: 'One-time, fully refundable until migration starts; otherwise credited to the first invoice.',
	unitPrice: { amount: DEPOSIT_USD, currencyCode: 'USD' },
	taxMode: 'account_setting',
	customData: { offer: 'zero-churn-switch' }
});

await writeFile(OUT, JSON.stringify({ environment: envName, productId: product.id, depositPriceId: price.id, USD: DEPOSIT_USD }, null, 2) + '\n');
console.log(`✓ deposit: ${product.id} · price ${price.id}\nWrote ${OUT.pathname}`);
