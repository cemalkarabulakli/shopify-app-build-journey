import pg from 'pg';
import {
	Customer,
	Subscription,
	Transaction,
	type CustomerRepository,
	type ProcessedEventLog,
	type SubscriptionRepository,
	type SubscriptionStatus,
	type TransactionRepository
} from '$lib/domain/vip';
import type { LoginTokenRepository } from '$lib/domain/auth';

/**
 * One adapter, several ports, one connection pool. Schema: see README "Database".
 * Every write is an upsert keyed on the Paddle id — never a blind insert.
 */
export class PgBillingStore implements CustomerRepository, ProcessedEventLog, LoginTokenRepository {
	private readonly pool: pg.Pool;
	constructor(connectionString: string) {
		this.pool = new pg.Pool({ connectionString, max: 5 });
	}

	// ── customers ──
	async findById(id: string): Promise<Customer | null> {
		const r = await this.pool.query('SELECT * FROM customers WHERE customer_id = $1', [id]);
		return r.rows[0] ? toCustomer(r.rows[0]) : null;
	}
	async findByEmail(email: string): Promise<Customer | null> {
		const r = await this.pool.query('SELECT * FROM customers WHERE lower(email) = lower($1) ORDER BY updated_at DESC LIMIT 1', [email]);
		return r.rows[0] ? toCustomer(r.rows[0]) : null;
	}
	async save(entity: Customer | Subscription | Transaction): Promise<void> {
		if (entity instanceof Customer) return this.saveCustomer(entity);
		if (entity instanceof Subscription) return this.saveSubscription(entity);
		return this.saveTransaction(entity);
	}
	private async saveCustomer(c: Customer) {
		await this.pool.query(
			`INSERT INTO customers (customer_id, email, name, updated_at) VALUES ($1, $2, $3, $4)
			 ON CONFLICT (customer_id) DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name, updated_at = EXCLUDED.updated_at`,
			[c.customerId, c.email, c.name, c.updatedAt]
		);
	}

	// ── subscriptions ──
	async findByCustomer(customerId: string): Promise<Subscription[]> {
		const r = await this.pool.query('SELECT * FROM subscriptions WHERE customer_id = $1', [customerId]);
		return r.rows.map(toSubscription);
	}
	async findSubscription(id: string): Promise<Subscription | null> {
		const r = await this.pool.query('SELECT * FROM subscriptions WHERE subscription_id = $1', [id]);
		return r.rows[0] ? toSubscription(r.rows[0]) : null;
	}
	private async saveSubscription(s: Subscription) {
		await this.pool.query(
			`INSERT INTO subscriptions (subscription_id, customer_id, status, price_id, product_id, scheduled_change_action, scheduled_change_at, current_period_end, event_occurred_at, updated_at)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
			 ON CONFLICT (subscription_id) DO UPDATE SET customer_id = EXCLUDED.customer_id, status = EXCLUDED.status, price_id = EXCLUDED.price_id, product_id = EXCLUDED.product_id,
			   scheduled_change_action = EXCLUDED.scheduled_change_action, scheduled_change_at = EXCLUDED.scheduled_change_at, current_period_end = EXCLUDED.current_period_end,
			   event_occurred_at = EXCLUDED.event_occurred_at, updated_at = NOW()`,
			[s.subscriptionId, s.customerId, s.status, s.priceId, s.productId, s.scheduledChange?.action ?? null, s.scheduledChange?.effectiveAt ?? null, s.currentPeriodEnd, s.updatedAt]
		);
	}

	// ── transactions ──
	async findTransaction(id: string): Promise<Transaction | null> {
		const r = await this.pool.query('SELECT * FROM transactions WHERE transaction_id = $1', [id]);
		return r.rows[0] ? toTransaction(r.rows[0]) : null;
	}
	private async saveTransaction(t: Transaction) {
		const p = t.toJSON();
		await this.pool.query(
			`INSERT INTO transactions (transaction_id, customer_id, subscription_id, status, total, currency_code, billed_at, event_occurred_at, updated_at)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
			 ON CONFLICT (transaction_id) DO UPDATE SET customer_id = EXCLUDED.customer_id, subscription_id = EXCLUDED.subscription_id, status = EXCLUDED.status, total = EXCLUDED.total,
			   currency_code = EXCLUDED.currency_code, billed_at = EXCLUDED.billed_at, event_occurred_at = EXCLUDED.event_occurred_at, updated_at = NOW()`,
			[p.transactionId, p.customerId, p.subscriptionId, p.status, p.total, p.currencyCode, p.billedAt, p.updatedAt]
		);
	}

	// ── processed events ──
	async recordIfNew(eventId: string, eventType: string, occurredAt: Date): Promise<boolean> {
		const r = await this.pool.query('INSERT INTO webhook_events (event_id, event_type, occurred_at) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [eventId, eventType, occurredAt]);
		return (r.rowCount ?? 0) > 0;
	}

	// ── login tokens ──
	async create(tokenHash: string, email: string, expiresAt: Date): Promise<void> {
		await this.pool.query('INSERT INTO login_tokens (token_hash, email, expires_at) VALUES ($1, $2, $3)', [tokenHash, email, expiresAt]);
	}
	async consume(tokenHash: string, now: Date): Promise<string | null> {
		const r = await this.pool.query('UPDATE login_tokens SET used_at = $2 WHERE token_hash = $1 AND used_at IS NULL AND expires_at > $2 RETURNING email', [tokenHash, now]);
		return r.rows[0]?.email ?? null;
	}
}

/** Port-shaped views so use cases get exactly one interface each (findById is overloaded above). */
export const subscriptionRepo = (s: PgBillingStore): SubscriptionRepository => ({ findById: (id) => s.findSubscription(id), findByCustomer: (c) => s.findByCustomer(c), save: (x) => s.save(x) });
export const transactionRepo = (s: PgBillingStore): TransactionRepository => ({ findById: (id) => s.findTransaction(id), save: (x) => s.save(x) });

type Row = Record<string, unknown>;
const d = (v: unknown) => (v ? new Date(v as string) : null);
const toCustomer = (r: Row) => Customer.create({ customerId: r.customer_id as string, email: r.email as string, name: (r.name as string) ?? null, updatedAt: d(r.updated_at)! });
const toSubscription = (r: Row) =>
	Subscription.create({
		subscriptionId: r.subscription_id as string,
		customerId: r.customer_id as string,
		status: r.status as SubscriptionStatus,
		priceId: r.price_id as string,
		productId: r.product_id as string,
		scheduledChange: r.scheduled_change_action ? { action: r.scheduled_change_action as 'cancel', effectiveAt: d(r.scheduled_change_at)! } : null,
		currentPeriodEnd: d(r.current_period_end),
		updatedAt: d(r.event_occurred_at)!
	});
const toTransaction = (r: Row) =>
	Transaction.create({
		transactionId: r.transaction_id as string,
		customerId: (r.customer_id as string) ?? null,
		subscriptionId: (r.subscription_id as string) ?? null,
		status: r.status as string,
		total: (r.total as string) ?? null,
		currencyCode: (r.currency_code as string) ?? null,
		billedAt: d(r.billed_at),
		updatedAt: d(r.event_occurred_at)!
	});
