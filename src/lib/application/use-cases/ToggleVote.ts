import { VOTE_WEIGHT, type FeatureBoardRepository } from '$lib/domain/roadmap';
import type { MembershipCheck } from '../ports/Membership';

export class VoteRefused extends Error {
	constructor(readonly code: 'not-found' | 'closed') {
		super(code);
		this.name = 'VoteRefused';
	}
}

/**
 * Voting is open to anyone signed in — that is the point of a public board. Sign-in is the
 * only ballot-box control we have: one row per (request, email), so a second click removes
 * the vote instead of adding another.
 *
 * A member's vote weighs more than a visitor's, because "vote on the roadmap" is a paid perk
 * and it would be worthless if it counted the same. Both numbers are shown on the board so
 * the weighting is visible rather than hidden.
 */
export class ToggleVote {
	constructor(
		private readonly board: FeatureBoardRepository,
		private readonly membership: MembershipCheck
	) {}

	/** @returns whether the viewer now has a vote on this request. */
	async execute(requestId: string, email: string, now = new Date()): Promise<boolean> {
		const request = await this.board.findById(requestId);
		if (!request) throw new VoteRefused('not-found');
		if (!request.acceptsVotes()) throw new VoteRefused('closed');

		if (await this.board.hasVoted(requestId, email)) {
			await this.board.removeVote(requestId, email);
			return false;
		}
		const { member } = await this.membership.isMember(email);
		await this.board.addVote(requestId, email, member ? VOTE_WEIGHT.member : VOTE_WEIGHT.public, now);
		return true;
	}
}
