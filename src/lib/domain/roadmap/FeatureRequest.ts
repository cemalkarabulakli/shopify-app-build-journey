/**
 * Where a request sits. The board shows the first three as the roadmap and
 * `shipped` as the changelog; `declined` is kept visible on purpose — a public
 * "no, and here's why" is worth more than a silently vanished request.
 */
export type FeatureStatus = 'considering' | 'planned' | 'building' | 'shipped' | 'declined';

export const OPEN_STATUSES: readonly FeatureStatus[] = ['considering', 'planned', 'building'];
export const ROADMAP_ORDER: readonly FeatureStatus[] = ['building', 'planned', 'considering', 'shipped', 'declined'];

/** Votes from paying members steer the roadmap harder — that is what the VIP tier sells. */
export const VOTE_WEIGHT = { member: 3, public: 1 } as const;

/** One person may hold this many requests that are still open, so nobody floods the board. */
export const MAX_OPEN_PER_AUTHOR = 5;

export const TITLE_MAX = 120;
export const BODY_MAX = 2000;
export const NOTE_MAX = 500;

export interface FeatureRequestProps {
	id: string;
	title: string;
	/** The problem in the requester's own words. Rendered as plain text, never as HTML. */
	body: string;
	status: FeatureStatus;
	authorEmail: string;
	/** Tier name at submission time, kept for the record even if the subscription later lapses. */
	authorTier: string | null;
	/** The builder's public answer: why it was planned, declined, or what shipped. */
	note: string | null;
	createdAt: Date;
	updatedAt: Date;
	shippedAt: Date | null;
}

/**
 * A feature request on the public board. Invariants and the status machine live here
 * so a route can never write a half-valid row.
 */
export class FeatureRequest {
	private constructor(private readonly p: FeatureRequestProps) {}

	static create(p: FeatureRequestProps): FeatureRequest {
		const title = p.title.trim();
		const body = p.body.trim();
		if (!p.id) throw new Error('FeatureRequest needs an id');
		if (title.length < 4) throw new Error('short-title');
		if (title.length > TITLE_MAX) throw new Error('long-title');
		if (body.length < 10) throw new Error('short-body');
		if (body.length > BODY_MAX) throw new Error('long-body');
		if (!p.authorEmail) throw new Error('FeatureRequest needs an authorEmail');
		if (p.note && p.note.length > NOTE_MAX) throw new Error('long-note');
		if (p.status === 'shipped' && !p.shippedAt) throw new Error('a shipped request needs shippedAt');
		return new FeatureRequest({ ...p, title, body, note: p.note?.trim() || null });
	}

	get id() { return this.p.id; }
	get title() { return this.p.title; }
	get body() { return this.p.body; }
	get status() { return this.p.status; }
	get authorEmail() { return this.p.authorEmail; }
	get authorTier() { return this.p.authorTier; }
	get note() { return this.p.note; }
	get createdAt() { return this.p.createdAt; }
	get updatedAt() { return this.p.updatedAt; }
	get shippedAt() { return this.p.shippedAt; }

	isOpen(): boolean { return OPEN_STATUSES.includes(this.p.status); }
	/** Closed requests stop collecting votes — a vote can only influence something not yet decided. */
	acceptsVotes(): boolean { return this.isOpen(); }

	/** @returns a new instance; the entity is never mutated in place. */
	withStatus(status: FeatureStatus, note: string | null, now: Date): FeatureRequest {
		return FeatureRequest.create({
			...this.p,
			status,
			note: note ?? this.p.note,
			updatedAt: now,
			// Entering `shipped` stamps the changelog date; leaving it clears the stamp.
			shippedAt: status === 'shipped' ? (this.p.shippedAt ?? now) : null
		});
	}

	toJSON(): FeatureRequestProps { return { ...this.p }; }
}

/** One vote, already weighted at the moment it was cast. */
export interface Vote {
	requestId: string;
	voterEmail: string;
	weight: number;
	createdAt: Date;
}

/** A request plus its tally, which is what the board actually renders. */
export interface FeatureRequestWithVotes {
	request: FeatureRequest;
	/** Sum of vote weights — the ranking key. */
	score: number;
	/** How many distinct people voted, shown next to the score so weighting stays honest. */
	voters: number;
	/** How many of those were paying members. */
	memberVoters: number;
	/** Whether the person looking at the page has already voted. */
	votedByViewer: boolean;
}
