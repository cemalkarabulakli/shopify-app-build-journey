/**
 * End-to-end sandbox checkout: /vip → prices from PricePreview → Pro Subscribe → Paddle overlay
 * → test card 4242… → /welcome. Needs a running server with the sandbox .env and Chrome installed.
 *
 *   npm run e2e:checkout            (BASE=http://localhost:3999 by default)
 *   CARD=4000000000000002 npm run e2e:checkout   → exercises the declined-card path
 */
const { chromium } = require('playwright');
const { mkdirSync } = require('node:fs');
const BASE = process.env.BASE || 'http://localhost:3999';
const CARD = process.env.CARD || '4242424242424242';
const OUT = require('node:path').resolve(__dirname, '../.e2e');
mkdirSync(OUT, { recursive: true });

(async () => {
	const browser = await chromium.launch({ channel: 'chrome', headless: true });
	const ctx = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
	// Country header only for our own origin (never leaks into Paddle/fonts CORS requests)
	await ctx.route(`${BASE}/**`, (route) => route.continue({ headers: { ...route.request().headers(), 'cf-ipcountry': 'GB' } }));
	const page = await ctx.newPage();
	page.on('console', (m) => m.type() === 'error' && console.log('[console]', m.text().slice(0, 200)));

	await page.goto(`${BASE}/vip`, { waitUntil: 'networkidle' });
	// 1. Prices come from Paddle (formattedTotals), toggle works
	await page.waitForFunction(() => /[£$€A]\s?\d/.test(document.body.innerText), null, { timeout: 30000 });
	const monthly = await page.$$eval('article p.font-display', (els) => els.map((e) => e.textContent.trim()));
	await page.getByRole('tab', { name: /Yearly/ }).click();
	await page.waitForTimeout(300);
	const yearly = await page.$$eval('article p.font-display', (els) => els.map((e) => e.textContent.trim()));
	console.log('monthly:', monthly);
	console.log('yearly :', yearly);
	await page.screenshot({ path: `${OUT}/01-prices-gb.png` });
	await page.getByRole('tab', { name: /Monthly/ }).click();

	// 2. Prefill email, open checkout for Pro
	await page.fill('input[type=email]', 'vip-e2e@example.com');
	const buttons = page.getByRole('button', { name: /Become a VIP/ });
	await buttons.nth(1).click();
	const frame = await page.waitForSelector('iframe[name^="paddle_frame"], iframe[src*="paddle"]', { timeout: 30000 });
	console.log('checkout iframe opened');
	await page.waitForTimeout(6000);
	await page.screenshot({ path: `${OUT}/02-checkout-open.png` });

	// 3. Complete with a Paddle test card. Fields live directly in the paddle_frame.
	const f = page.frame({ name: 'paddle_frame' }) ?? (await frame.contentFrame());
	const dump = async (tag) => {
		const txt = await f.evaluate(() => document.body.innerText).catch(() => '');
		console.log(`[${tag}]`, txt.replace(/\s+/g, ' ').slice(0, 300));
	};
	await f.waitForSelector('input[name="cardNumber"]', { timeout: 30000 });
	await dump('checkout');
	const emailField = await f.$('input[type="email"], input[name="email"]');
	if (emailField) await emailField.fill('vip-e2e@example.com');
	// Country first — changing it re-prices and re-renders the payment panel.
	await f.selectOption('select[name="countryCode"]', 'GB').catch(() => {});
	await page.waitForTimeout(1500);
	const postcode = await f.$('input[name="postcode"], input[name="postalCode"]');
	if (postcode) await postcode.fill('SW1A 1AA');
	await f.click('#panel-card-CARD').catch(() => {});
	await f.waitForSelector('input[name="cardNumber"]', { timeout: 15000 });
	await f.fill('input[name="cardHolder"]', 'VIP E2E');
	await f.fill('input[name="cardNumber"]', CARD);
	await f.fill('input[name="expiry"]', '12/30');
	await f.fill('input[name="cvv"]', '100');
	await page.screenshot({ path: `${OUT}/03-card-filled.png` });
	// Paddle's one-page checkout submits reliably from a keypress in the last field; a click on the
	// button sometimes lands during a re-render and is swallowed. Enter first, click as fallback.
	let declined = '';
	page.on('response', async (r) => {
		if (r.status() >= 400 && /paddle\.com/.test(r.url())) {
			const t = await r.text().catch(() => '');
			if (/payment-error|declined/i.test(t)) declined = t.slice(0, 160);
			else console.log('  [http', r.status() + ']', r.url().slice(0, 100), t.slice(0, 160));
		}
	});
	await f.press('input[name="cvv"]', 'Enter');
	console.log('submitted checkout with card', CARD);
	await page.waitForTimeout(6000);
	const still = /Subscribe now|Start your free trial/.test(await f.evaluate(() => document.body.innerText).catch(() => ''));
	if (still && !declined) { console.log('fallback: clicking submit'); await f.locator('button[type="submit"]').filter({ hasText: /Subscribe|Start your free trial|Pay/ }).last().click(); await page.waitForTimeout(6000); }
	await page.screenshot({ path: `${OUT}/04-after-submit.png` });

	if (CARD !== '4242424242424242') {
		// Declined-card run: success means Paddle refused it and we stayed on the checkout.
		if (declined && page.url().includes('/vip')) { console.log('DECLINED AS EXPECTED:', declined); await browser.close(); return; }
		console.log('DECLINE TEST FAILED — no decline seen; url =', page.url()); await browser.close(); process.exit(1);
	}

	// 4. Redirect to /welcome
	try {
		await page.waitForURL(/\/welcome/, { timeout: 60000 });
		console.log('REDIRECTED TO', page.url());
		await page.screenshot({ path: `${OUT}/05-welcome.png` });
	} catch {
		console.log('NO REDIRECT; url =', page.url());
		await dump('final');
		await page.screenshot({ path: `${OUT}/05-stuck.png` });
		await browser.close();
		process.exit(1);
	}
	await browser.close();
})().catch((e) => { console.error('E2E FAILED:', e.message); process.exit(1); });
