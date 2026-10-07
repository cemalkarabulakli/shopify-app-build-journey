import type { FeatureRequest, FeatureRequestWithVotes } from './FeatureRequest';

/** Port: how the app stores and reads the feature board. */
export interface FeatureBoardRepository {
	findById(id: string): Promise<FeatureRequest | null>;
	save(request: FeatureRequest): Promise<void>;
	/**
	 * The whole board with tallies, unordered — ListRoadmap groups and ranks it.
	 * @param viewerEmail whose votes to flag as `votedByViewer`; null for anonymous visitors.
	 */
	list(viewerEmail: string | null): Promise<FeatureRequestWithVotes[]>;
	/** How many requests this author still has open — the flood guard. */
	countOpenByAuthor(email: string): Promise<number>;
	/** Idempotent: casting the same vote twice is not an error, it just stays one vote. */
	addVote(requestId: string, voterEmail: string, weight: number, now: Date): Promise<void>;
	removeVote(requestId: string, voterEmail: string): Promise<void>;
	hasVoted(requestId: string, voterEmail: string): Promise<boolean>;
}
