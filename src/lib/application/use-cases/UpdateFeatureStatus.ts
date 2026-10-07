import type { FeatureBoardRepository, FeatureStatus } from '$lib/domain/roadmap';

export class StatusRefused extends Error {
	constructor(readonly code: 'not-found' | 'not-admin' | 'long-note') {
		super(code);
		this.name = 'StatusRefused';
	}
}

/**
 * Moving a request along the board, and writing the public note that goes with it.
 * Admin-only: the whole board's credibility rests on nobody else being able to mark
 * something shipped.
 */
export class UpdateFeatureStatus {
	constructor(
		private readonly board: FeatureBoardRepository,
		private readonly isAdmin: (email: string) => boolean
	) {}

	async execute(input: { actorEmail: string; id: string; status: FeatureStatus; note: string | null }, now = new Date()) {
		if (!this.isAdmin(input.actorEmail)) throw new StatusRefused('not-admin');
		const request = await this.board.findById(input.id);
		if (!request) throw new StatusRefused('not-found');
		try {
			const next = request.withStatus(input.status, input.note, now);
			await this.board.save(next);
			return next;
		} catch (e) {
			throw new StatusRefused((e as Error).message === 'long-note' ? 'long-note' : 'not-found');
		}
	}
}
