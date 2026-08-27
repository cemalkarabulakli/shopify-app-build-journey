import {
	Customer,
	Subscription,
	Transaction,
	type CustomerProps,
	type CustomerRepository,
	type ProcessedEventLog,
	type SubscriptionProps,
	type SubscriptionRepository,
	type TransactionProps,
	type TransactionRepository
} from '$lib/domain/vip';

/** Provider-agnostic event, produced by an infrastructure adapter after signature verification. */
export type BillingEvent = { eventId: string; eventType: string; occurredAt: Date } & (
	| { kind: 'customer'; data: CustomerProps }
	| { kind: 'subscription'; data: SubscriptionProps }
	| { kind: 'transaction'; data: TransactionProps }
	| { kind: 'ignored' }
);

export type BillingEventResult = { outcome: 'applied' | 'stale' | 'duplicate' | 'ignored'; detail: string };

/**
 * Mirrors provider state. Safe under at-least-once, out-of-order delivery:
 *  - duplicate event ids are skipped (ProcessedEventLog)
 *  - each entity is upserted by provider id, and an older event never overwrites newer state
 */
export class HandleBillingEvent {
	constructor(
		private readonly customers: CustomerRepository,
		private readonly subscriptions: SubscriptionRepository,
		private readonly transactions: TransactionRepository,
		private readonly processed: ProcessedEventLog
	) {}

	async execute(event: BillingEvent): Promise<BillingEventResult> {
		if (event.kind === 'ignored') return { outcome: 'ignored', detail: event.eventType };
		if (!(await this.processed.recordIfNew(event.eventId, event.eventType, event.occurredAt))) {
			return { outcome: 'duplicate', detail: event.eventId };
		}
		switch (event.kind) {
			case 'customer': {
				const incoming = Customer.create(event.data);
				const current = await this.customers.findById(incoming.customerId);
				if (!incoming.isNewerThan(current)) return { outcome: 'stale', detail: incoming.customerId };
				await this.customers.save(incoming);
				return { outcome: 'applied', detail: `${incoming.customerId} ${incoming.email}` };
			}
			case 'subscription': {
				const incoming = Subscription.create(event.data);
				await this.ensureCustomerStub(incoming.customerId, event.occurredAt);
				const current = await this.subscriptions.findById(incoming.subscriptionId);
				if (!incoming.isNewerThan(current)) return { outcome: 'stale', detail: incoming.subscriptionId };
				await this.subscriptions.save(incoming);
				return { outcome: 'applied', detail: `${incoming.subscriptionId} ${incoming.status} ${incoming.productId}` };
			}
			case 'transaction': {
				const incoming = Transaction.create(event.data);
				if (incoming.customerId) await this.ensureCustomerStub(incoming.customerId, event.occurredAt);
				const current = await this.transactions.findById(incoming.transactionId);
				if (!incoming.isNewerThan(current)) return { outcome: 'stale', detail: incoming.transactionId };
				await this.transactions.save(incoming);
				return { outcome: 'applied', detail: `${incoming.transactionId} ${incoming.status}` };
			}
		}
	}

	/**
	 * subscription.* can arrive before customer.created. Insert a placeholder so the FK holds;
	 * the real customer.created/updated (newer or equal timestamp) fills in the email.
	 */
	private async ensureCustomerStub(customerId: string, at: Date) {
		if (await this.customers.findById(customerId)) return;
		await this.customers.save(Customer.create({ customerId, email: `pending+${customerId}@unknown.invalid`, name: null, updatedAt: new Date(0) }));
		void at;
	}
}
