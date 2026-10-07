import { randomUUID } from 'node:crypto';
import { FeatureRequest, MAX_OPEN_PER_AUTHOR, VOTE_WEIGHT, type FeatureBoardRepository } from '$lib/domain/roadmap';
import type { MembershipCheck } from '../ports/Membership';

/** Thrown for every refusal, so the route can map one code to one message. */
export class SubmitRefused extends Error {
	constructor(readonly code: 'not-member' | 'too-many-open' | 'short-title' | 'long-title' | 'short-body' | 'long-body') {
		super(code);
		this.name = 'SubmitRefused';
	}
}

/**
 * Only paying members may put something on the board — that is the tier's promise, and it is
 * also the whole spam defence. The public side of the board is voting, not posting.
 */
export class SubmitFeatureRequest {
	constructor(
		private readonly board: FeatureBoardRepository,
		private readonly membership: MembershipCheck,
		private readonly newId: () => string = randomUUID
	) {}

	async execute(input: { email: string; title: string; body: string }, now = new Date()): Promise<FeatureRequest> {
		const { member, tier } = await this.membership.isMember(input.email);
		if (!member) throw new SubmitRefused('not-member');

		if ((await this.board.countOpenByAuthor(input.email)) >= MAX_OPEN_PER_AUTHOR) {
			throw new SubmitRefused('too-many-open');
		}

		let request: FeatureRequest;
		try {
			request = FeatureRequest.create({
				id: this.newId(),
				title: input.title,
				body: input.body,
				status: 'considering',
				authorEmail: input.email,
				authorTier: tier,
				note: null,
				createdAt: now,
				updatedAt: now,
				shippedAt: null
			});
		} catch (e) {
			// The entity's own validation messages are the refusal codes.
			throw new SubmitRefused((e as Error).message as 'short-title');
		}

		await this.board.save(request);
		// The author's own request starts with their vote — they obviously want it.
		await this.board.addVote(request.id, input.email, VOTE_WEIGHT.member, now);
		return request;
	}
}
