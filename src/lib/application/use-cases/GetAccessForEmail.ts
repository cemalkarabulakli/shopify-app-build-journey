import type { Customer, CustomerRepository, Subscription, SubscriptionRepository } from '$lib/domain/vip';

export interface AccessSummary {
	customer: Customer | null;
	subscriptions: Subscription[];
	/** The subscription that currently unlocks paid features, if any (newest first). */
	active: Subscription | null;
	hasAccess: boolean;
}

/** Answers "what does this signed-in person get?" from the mirrored tables only — no provider calls. */
export class GetAccessForEmail {
	constructor(
		private readonly customers: CustomerRepository,
		private readonly subscriptions: SubscriptionRepository
	) {}

	async execute(email: string): Promise<AccessSummary> {
		const customer = await this.customers.findByEmail(email);
		if (!customer) return { customer: null, subscriptions: [], active: null, hasAccess: false };
		const subs = (await this.subscriptions.findByCustomer(customer.customerId)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
		const active = subs.find((s) => s.grantsAccess()) ?? null;
		return { customer, subscriptions: subs, active, hasAccess: !!active };
	}
}
