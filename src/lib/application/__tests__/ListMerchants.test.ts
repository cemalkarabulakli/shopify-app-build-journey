import { describe, expect, it } from 'vitest';
import { Merchant, type MerchantProps, type MerchantRepository } from '$lib/domain/merchant';
import { ListMerchants } from '../use-cases/ListMerchants';
import { InMemoryPostRepository, makePost } from './InMemoryPostRepository';

const merchant = (over: Partial<MerchantProps> = {}) =>
	Merchant.create({
		id: 'gruns',
		name: 'Grüns',
		sells: { en: 'Greens gummies', tr: 'Yeşil gummy' },
		fact: { en: '7,000+ retail locations', tr: '7.000+ mağaza' },
		sourceUrl: 'https://www.shopify.com/case-studies/gruns',
		storeUrl: 'https://gruns.co',
		contactPage: 'https://gruns.co/contact',
		email: null,
		emailSourceUrl: null,
		storySlugs: ['10-case-studies', 'missing-scroll', 'draft-scroll'],
		...over
	});
const repo = (list: Merchant[]): MerchantRepository => ({ findAll: async () => list });
const docs = new InMemoryPostRepository([
	makePost({ slug: '10-case-studies', title: 'Case Studies' }),
	makePost({ slug: 'draft-scroll', title: 'Draft', draft: true })
]);

describe('ListMerchants (AC-6, R9)', () => {
	it('keeps the curated order', async () => {
		const cards = await new ListMerchants(repo([merchant({ id: 'b' }), merchant({ id: 'a' })]), docs).execute('en');
		expect(cards.map((c) => c.id)).toEqual(['b', 'a']);
	});
	it('links only stories that are published scrolls', async () => {
		const [card] = await new ListMerchants(repo([merchant()]), docs).execute('en');
		expect(card.stories).toEqual([{ slug: '10-case-studies', title: 'Case Studies' }]);
	});
	it('shows no story link when the merchant is in no published scroll', async () => {
		const [card] = await new ListMerchants(repo([merchant({ storySlugs: [] })]), docs).execute('en');
		expect(card.stories).toEqual([]);
	});
	it('speaks the reader’s language but keeps the English fact for the template', async () => {
		const [card] = await new ListMerchants(repo([merchant()]), docs).execute('tr');
		expect(card.sells).toBe('Yeşil gummy');
		expect(card.fact).toBe('7.000+ mağaza');
		expect(card.factEn).toBe('7,000+ retail locations');
	});
});
