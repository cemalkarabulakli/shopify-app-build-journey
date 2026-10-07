import { ROADMAP_ORDER, type FeatureRequestWithVotes, type FeatureBoardRepository, type FeatureStatus } from '$lib/domain/roadmap';

export interface RoadmapColumn {
	status: FeatureStatus;
	items: FeatureRequestWithVotes[];
}

/**
 * The board, grouped by status and ranked by score inside each group.
 * Read-only and safe for anonymous visitors — `viewerEmail` only decides which
 * rows come back flagged as already voted.
 */
export class ListRoadmap {
	constructor(private readonly board: FeatureBoardRepository) {}

	async execute(viewerEmail: string | null): Promise<RoadmapColumn[]> {
		const all = await this.board.list(viewerEmail);
		return ROADMAP_ORDER.map((status) => ({
			status,
			items: all
				.filter((i) => i.request.status === status)
				.sort((a, b) => {
					// Shipped reads as a changelog: newest first. Everything else is a ranking.
					if (status === 'shipped') {
						return (b.request.shippedAt?.getTime() ?? 0) - (a.request.shippedAt?.getTime() ?? 0);
					}
					return b.score - a.score || b.request.createdAt.getTime() - a.request.createdAt.getTime();
				})
		}));
	}
}
