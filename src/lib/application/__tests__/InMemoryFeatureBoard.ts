import { OPEN_STATUSES, type FeatureBoardRepository, type FeatureRequest, type FeatureRequestWithVotes, type Vote } from '$lib/domain/roadmap';

/** Test double for the board — same contract as PgFeatureBoard, no database. */
export class InMemoryFeatureBoard implements FeatureBoardRepository {
	requests = new Map<string, FeatureRequest>();
	votes: Vote[] = [];

	async findById(id: string) {
		return this.requests.get(id) ?? null;
	}
	async save(request: FeatureRequest) {
		this.requests.set(request.id, request);
	}
	async list(viewerEmail: string | null): Promise<FeatureRequestWithVotes[]> {
		return [...this.requests.values()].map((request) => {
			const mine = this.votes.filter((v) => v.requestId === request.id);
			return {
				request,
				score: mine.reduce((n, v) => n + v.weight, 0),
				voters: mine.length,
				memberVoters: mine.filter((v) => v.weight > 1).length,
				votedByViewer: !!viewerEmail && mine.some((v) => v.voterEmail.toLowerCase() === viewerEmail.toLowerCase())
			};
		});
	}
	async countOpenByAuthor(email: string) {
		return [...this.requests.values()].filter(
			(r) => r.authorEmail.toLowerCase() === email.toLowerCase() && OPEN_STATUSES.includes(r.status)
		).length;
	}
	async addVote(requestId: string, voterEmail: string, weight: number, createdAt: Date) {
		await this.removeVote(requestId, voterEmail);
		this.votes.push({ requestId, voterEmail: voterEmail.toLowerCase(), weight, createdAt });
	}
	async removeVote(requestId: string, voterEmail: string) {
		this.votes = this.votes.filter((v) => !(v.requestId === requestId && v.voterEmail === voterEmail.toLowerCase()));
	}
	async hasVoted(requestId: string, voterEmail: string) {
		return this.votes.some((v) => v.requestId === requestId && v.voterEmail === voterEmail.toLowerCase());
	}
}

export const membershipOf = (members: Record<string, string>) => ({
	async isMember(email: string) {
		const tier = members[email.toLowerCase()];
		return tier ? { member: true, tier } : { member: false, tier: null };
	}
});
