/**
 * DTOs cross the boundary from use cases to the presentation layer.
 * They are plain, serialisable objects — SvelteKit can pass them to the client.
 */
export interface PostSummaryDto {
	slug: string;
	title: string;
	publishedAt: string; // ISO date
	summary: string;
	tags: string[];
}

export interface PostDetailDto extends PostSummaryDto {
	html: string;
}

/** A merchant card, already in the reader's language (spec 0002). */
export interface MerchantCardDto {
	id: string;
	name: string;
	sells: string;
	fact: string;
	/** The fact in English, for the English reach-out template. */
	factEn: string;
	sourceUrl: string;
	storeUrl: string;
	contactPage: string | null;
	email: string | null;
	/** Only scrolls that are actually published. */
	stories: { slug: string; title: string }[];
}
