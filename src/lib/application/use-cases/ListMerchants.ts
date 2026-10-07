import type { LocalizedText, Merchant, MerchantRepository } from '$lib/domain/merchant';
import type { PostRepository } from '$lib/domain/post';
import type { MerchantCardDto } from '../dto';

/** The Merchants page: curated order, the reader's language, story links only to published scrolls. */
export class ListMerchants {
	constructor(
		private readonly merchants: MerchantRepository,
		private readonly docs: PostRepository
	) {}

	async execute(lang: keyof LocalizedText): Promise<MerchantCardDto[]> {
		const [merchants, docs] = await Promise.all([this.merchants.findAll(), this.docs.findAll()]);
		const published = new Map(docs.filter((d) => d.isPublished()).map((d) => [d.slug, d.title]));
		return merchants.map((m) => toCard(m, lang, published));
	}
}

function toCard(m: Merchant, lang: keyof LocalizedText, published: Map<string, string>): MerchantCardDto {
	return {
		id: m.id,
		name: m.name,
		sells: m.sells[lang],
		fact: m.fact[lang],
		factEn: m.fact.en,
		sourceUrl: m.sourceUrl,
		storeUrl: m.storeUrl,
		contactPage: m.contactPage,
		email: m.email,
		stories: m.storySlugs.filter((s) => published.has(s)).map((slug) => ({ slug, title: published.get(slug)! }))
	};
}
