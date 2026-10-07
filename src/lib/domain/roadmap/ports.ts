import type { FeatureRequest, FeatureRequestWithVotes, FeatureStatus } from './FeatureRequest';

/** Port: how the app stores and reads the feature board. */
export interface FeatureBoardRepository {
	findById(id: string): Promise<FeatureRequest | null>;
	save(request: FeatureRequest): Promise<void>;
	/**
	 * The whole board with tallies, newest-decided first inside each status.
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

export interface StatusChange {
	id: string;
	status: FeatureStatus;
	note: string | null;
}
