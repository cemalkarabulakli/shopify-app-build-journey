import { describe, expect, it } from 'vitest';
import { Merchant, MerchantCatalog, type MerchantProps } from '$lib/domain/merchant';

const props = (over: Partial<MerchantProps> = {}): MerchantProps => ({
	id: 'gruns',
	name: 'Grüns',
	sells: { en: 'Greens gummies', tr: 'Yeşil gummy' },
	fact: { en: 'Startup to 7,000+ retail locations', tr: 'Girişimden 7.000+ mağazaya' },
	sourceUrl: 'https://www.shopify.com/case-studies/gruns',
	storeUrl: 'https://gruns.co',
	contactPage: 'https://gruns.co/pages/contact',
	email: null,
	emailSourceUrl: null,
	storySlugs: ['10-case-studies'],
	...over
});

describe('Merchant.create (AC-14)', () => {
	it('accepts a complete merchant', () => {
		expect(Merchant.create(props()).name).toBe('Grüns');
	});
	it('rejects a merchant without a source link', () => {
		expect(() => Merchant.create(props({ sourceUrl: '' }))).toThrow(/source/);
	});
	it('rejects a merchant with neither an email nor a contact page', () => {
		expect(() => Merchant.create(props({ contactPage: null, email: null }))).toThrow(/contact/);
	});
	it('accepts an email alone when the page that publishes it is recorded', () => {
		const m = Merchant.create(props({ contactPage: null, email: 'Press@Gruns.co', emailSourceUrl: 'https://gruns.co/pages/press' }));
		expect(m.email).toBe('press@gruns.co');
	});
	it('rejects an email whose publishing page is not recorded', () => {
		expect(() => Merchant.create(props({ email: 'press@gruns.co', emailSourceUrl: null }))).toThrow(/published/);
	});
	it('rejects a malformed email', () => {
		expect(() => Merchant.create(props({ email: 'not-an-email', emailSourceUrl: 'https://gruns.co/p' }))).toThrow(/email/);
	});
	it('rejects links that are not https', () => {
		expect(() => Merchant.create(props({ storeUrl: 'http://gruns.co' }))).toThrow(/https/);
		expect(() => Merchant.create(props({ contactPage: 'javascript:alert(1)' }))).toThrow(/https/);
	});
	it('rejects missing English or Turkish text', () => {
		expect(() => Merchant.create(props({ sells: { en: 'Gummies', tr: '' } }))).toThrow(/tr/);
		expect(() => Merchant.create(props({ fact: { en: ' ', tr: 'x' } }))).toThrow(/en/);
	});
	it('rejects an id that is not a slug', () => {
		expect(() => Merchant.create(props({ id: 'Grüns!' }))).toThrow(/id/);
	});
	it('knows whether it can be emailed', () => {
		expect(Merchant.create(props()).canEmail()).toBe(false);
		expect(Merchant.create(props({ email: 'hi@gruns.co', emailSourceUrl: 'https://gruns.co/c' })).canEmail()).toBe(true);
	});
});

describe('MerchantCatalog.create (AC-14)', () => {
	it('keeps the curated order', () => {
		const list = MerchantCatalog.create([props({ id: 'b' }), props({ id: 'a' })]);
		expect(list.map((m) => m.id)).toEqual(['b', 'a']);
	});
	it('rejects duplicate ids', () => {
		expect(() => MerchantCatalog.create([props(), props()])).toThrow(/duplicate/);
	});
});
