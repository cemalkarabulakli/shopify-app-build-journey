import { describe, expect, it } from 'vitest';
import { HandleBillingEvent, type BillingEvent } from '$lib/application';
import { Customer, Subscription, Transaction, type CustomerRepository, type ProcessedEventLog, type SubscriptionProps, type SubscriptionRepository, type TransactionRepository } from '$lib/domain/vip';

function memory() {
	const customers = new Map<string, Customer>(), subs = new Map<string, Subscription>(), txs = new Map<string, Transaction>(), seen = new Set<string>();
	const c: CustomerRepository = { findById: async (id) => customers.get(id) ?? null, findByEmail: async (e) => [...customers.values()].find((x) => x.email === e) ?? null, save: async (x) => void customers.set(x.customerId, x) };
	const s: SubscriptionRepository = { findById: async (id) => subs.get(id) ?? null, findByCustomer: async (id) => [...subs.values()].filter((x) => x.customerId === id), save: async (x) => void subs.set(x.subscriptionId, x) };
	const t: TransactionRepository = { findById: async (id) => txs.get(id) ?? null, save: async (x) => void txs.set(x.transactionId, x) };
	const log: ProcessedEventLog = { recordIfNew: async (id) => (seen.has(id) ? false : (seen.add(id), true)) };
	return { uc: new HandleBillingEvent(c, s, t, log), customers, subs };
}
const subEvent = (eventId: string, status: 'active' | 'canceled', at: string, extra: Partial<SubscriptionProps> = {}): BillingEvent => ({
	eventId, eventType: `subscription.${status === 'active' ? 'updated' : 'canceled'}`, occurredAt: new Date(at), kind: 'subscription',
	data: { subscriptionId: 'sub_1', customerId: 'ctm_1', status, priceId: 'pri_a', productId: 'pro_a', scheduledChange: null, currentPeriodEnd: null, updatedAt: new Date(at), ...extra }
});

describe('HandleBillingEvent', () => {
	it('applies, dedupes by event id, and keeps the newest state under out-of-order delivery', async () => {
		const { uc, subs } = memory();
		expect((await uc.execute(subEvent('evt_1', 'active', '2026-08-27T10:00:00Z'))).outcome).toBe('applied');
		expect((await uc.execute(subEvent('evt_1', 'active', '2026-08-27T10:00:00Z'))).outcome).toBe('duplicate');
		expect((await uc.execute(subEvent('evt_3', 'canceled', '2026-08-27T12:00:00Z'))).outcome).toBe('applied');
		expect((await uc.execute(subEvent('evt_2', 'active', '2026-08-27T11:00:00Z'))).outcome).toBe('stale');
		expect(subs.get('sub_1')?.status).toBe('canceled');
	});
	it('creates a customer stub when the subscription arrives before customer.created, then fills it in', async () => {
		const { uc, customers } = memory();
		await uc.execute(subEvent('evt_1', 'active', '2026-08-27T10:00:00Z'));
		expect(customers.get('ctm_1')?.email).toContain('pending+');
		const r = await uc.execute({ eventId: 'evt_0', eventType: 'customer.created', occurredAt: new Date('2026-08-27T09:59:00Z'), kind: 'customer', data: { customerId: 'ctm_1', email: 'Real@Example.com', name: 'R', updatedAt: new Date('2026-08-27T09:59:00Z') } });
		expect(r.outcome).toBe('applied');
		expect(customers.get('ctm_1')?.email).toBe('real@example.com');
	});
	it('ignores unrelated event types without touching the log', async () => {
		const { uc } = memory();
		expect((await uc.execute({ eventId: 'evt_x', eventType: 'product.updated', occurredAt: new Date(), kind: 'ignored' })).outcome).toBe('ignored');
	});
});
