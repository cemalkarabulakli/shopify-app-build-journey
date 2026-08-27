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

	// 3. Try to complete with Paddle's test card inside the iframe
	const f = await frame.contentFrame();
	const fill = async (sel, val) => {
		const el = await f.waitForSelector(sel, { timeout: 20000 }).catch(() => null);
		if (el) { await el.fill(val); return true; }
		return false;
	};
	const dump = async (tag) => {
		const txt = await f.evaluate(() => document.body.innerText).catch(() => '');
		console.log(`[${tag}]`, txt.replace(/\s+/g, ' ').slice(0, 400));
	};
	await dump('checkout page 1');
	// One-page checkout: email/country/postcode + card fields (card fields are in nested iframes)
	await fill('input[name="email"], input[type="email"]', 'vip-e2e@example.com');
	await fill('input[name="postcode"], input[name="postalCode"], input[autocomplete="postal-code"]', 'SW1A 1AA');
	const cont = await f.$('button:has-text("Continue"), button[type=submit]:not([disabled])');
	if (cont) { await cont.click().catch(() => {}); await page.waitForTimeout(3000); }
	await dump('after continue');
	await page.screenshot({ path: `${OUT}/03-checkout-form.png` });

	// card fields live in nested iframes
	const cardFrames = f.childFrames();
	console.log('nested frames:', cardFrames.length);
	for (const cf of cardFrames) {
		await cf.fill('input[name="cardnumber"], input[autocomplete="cc-number"], input[name="cardNumber"]', CARD).catch(() => {});
		await cf.fill('input[name="exp-date"], input[autocomplete="cc-exp"], input[name="expiry"]', '12/30').catch(() => {});
		await cf.fill('input[name="cvc"], input[autocomplete="cc-csc"]', '100').catch(() => {});
		await cf.fill('input[name="ccname"], input[autocomplete="cc-name"]', 'VIP E2E').catch(() => {});
	}
	await f.fill('input[autocomplete="cc-number"]', CARD).catch(() => {});
	await f.fill('input[autocomplete="cc-exp"]', '12/30').catch(() => {});
	await f.fill('input[autocomplete="cc-csc"]', '100').catch(() => {});
	await f.fill('input[autocomplete="cc-name"]', 'VIP E2E').catch(() => {});
	await page.waitForTimeout(1000);
	await page.screenshot({ path: `${OUT}/04-card-filled.png` });
	const pay = await f.$('button:has-text("Subscribe"), button:has-text("Start trial"), button:has-text("Pay"), button[type=submit]');
	if (pay) { await pay.click().catch(() => {}); console.log('clicked pay'); }
	await dump('after pay');

	// 4. Redirect to /welcome
	try {
		await page.waitForURL(/\/welcome/, { timeout: 60000 });
		console.log('REDIRECTED TO', page.url());
		await page.screenshot({ path: `${OUT}/05-welcome.png` });
	} catch {
		console.log('NO REDIRECT; url =', page.url());
		await dump('final');
		await page.screenshot({ path: `${OUT}/05-stuck.png` });
	}
	await browser.close();
})().catch((e) => { console.error('E2E FAILED:', e.message); process.exit(1); });
