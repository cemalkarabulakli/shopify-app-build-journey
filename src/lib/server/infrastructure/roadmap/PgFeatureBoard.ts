import type pg from 'pg';
import { createPool } from '../pg/createPool';
import { FeatureRequest, OPEN_STATUSES, VOTE_WEIGHT, type FeatureBoardRepository, type FeatureRequestWithVotes, type FeatureStatus } from '$lib/domain/roadmap';

/**
 * Postgres adapter for the feature board. Schema: see README "Database".
 *
 * The tally is computed in SQL in the same round trip as the rows, so rendering the
 * board is one query regardless of how many requests or votes exist.
 */
export class PgFeatureBoard implements FeatureBoardRepository {
	private readonly pool: pg.Pool;
	constructor(connectionString: string) {
		this.pool = createPool(connectionString, 3, 'roadmap');
	}

	async findById(id: string): Promise<FeatureRequest | null> {
		const r = await this.pool.query('SELECT * FROM feature_requests WHERE id = $1', [id]);
		return r.rows[0] ? toRequest(r.rows[0]) : null;
	}

	async save(request: FeatureRequest): Promise<void> {
		const p = request.toJSON();
		await this.pool.query(
			`INSERT INTO feature_requests (id, title, body, status, author_email, author_tier, note, created_at, updated_at, shipped_at)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
			 ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, body = EXCLUDED.body, status = EXCLUDED.status,
			   author_tier = EXCLUDED.author_tier, note = EXCLUDED.note, updated_at = EXCLUDED.updated_at, shipped_at = EXCLUDED.shipped_at`,
			[p.id, p.title, p.body, p.status, p.authorEmail, p.authorTier, p.note, p.createdAt, p.updatedAt, p.shippedAt]
		);
	}

	async list(viewerEmail: string | null): Promise<FeatureRequestWithVotes[]> {
		const r = await this.pool.query(
			`SELECT r.*,
			        COALESCE(SUM(v.weight), 0)::int                                        AS score,
			        COUNT(v.voter_email)::int                                              AS voters,
			        COUNT(v.voter_email) FILTER (WHERE v.weight >= $2)::int                AS member_voters,
			        COALESCE(BOOL_OR(lower(v.voter_email) = lower($1)), false)             AS voted_by_viewer
			   FROM feature_requests r
			   LEFT JOIN feature_votes v ON v.request_id = r.id
			  GROUP BY r.id`,
			[viewerEmail, VOTE_WEIGHT.member]
		);
		return r.rows.map((row) => ({
			request: toRequest(row),
			score: row.score as number,
			voters: row.voters as number,
			memberVoters: row.member_voters as number,
			votedByViewer: row.voted_by_viewer as boolean
		}));
	}

	async countOpenByAuthor(email: string): Promise<number> {
		const r = await this.pool.query(
			`SELECT COUNT(*)::int AS n FROM feature_requests WHERE lower(author_email) = lower($1) AND status = ANY($2)`,
			[email, OPEN_STATUSES as unknown as string[]]
		);
		return (r.rows[0]?.n as number) ?? 0;
	}

	/** Idempotent by primary key: a double click never becomes two votes. */
	async addVote(requestId: string, voterEmail: string, weight: number, now: Date): Promise<void> {
		await this.pool.query(
			`INSERT INTO feature_votes (request_id, voter_email, weight, created_at) VALUES ($1, lower($2), $3, $4)
			 ON CONFLICT (request_id, voter_email) DO UPDATE SET weight = EXCLUDED.weight`,
			[requestId, voterEmail, weight, now]
		);
	}

	async removeVote(requestId: string, voterEmail: string): Promise<void> {
		await this.pool.query('DELETE FROM feature_votes WHERE request_id = $1 AND voter_email = lower($2)', [requestId, voterEmail]);
	}

	async hasVoted(requestId: string, voterEmail: string): Promise<boolean> {
		const r = await this.pool.query('SELECT 1 FROM feature_votes WHERE request_id = $1 AND voter_email = lower($2)', [requestId, voterEmail]);
		return (r.rowCount ?? 0) > 0;
	}
}

type Row = Record<string, unknown>;
const d = (v: unknown) => (v ? new Date(v as string) : null);
const toRequest = (r: Row) =>
	FeatureRequest.create({
		id: r.id as string,
		title: r.title as string,
		body: r.body as string,
		status: r.status as FeatureStatus,
		authorEmail: r.author_email as string,
		authorTier: (r.author_tier as string) ?? null,
		note: (r.note as string) ?? null,
		createdAt: d(r.created_at)!,
		updatedAt: d(r.updated_at)!,
		shippedAt: d(r.shipped_at)
	});
