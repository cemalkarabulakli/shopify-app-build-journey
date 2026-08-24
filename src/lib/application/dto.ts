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
