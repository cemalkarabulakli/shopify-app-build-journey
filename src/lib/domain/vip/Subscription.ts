export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'paused' | 'canceled';
export type ScheduledAction = 'cancel' | 'pause' | 'resume';

export interface ScheduledChange {
	action: ScheduledAction;
	effectiveAt: Date;
}

export interface SubscriptionProps {
	subscriptionId: string;
	customerId: string;
	status: SubscriptionStatus;
	priceId: string;
	productId: string;
	scheduledChange: ScheduledChange | null;
	currentPeriodEnd: Date | null;
	/** Provider event time of the state we hold — ordering key for out-of-order deliveries. */
	updatedAt: Date;
}

/**
 * Mirror of a provider subscription. Access rules live here, nowhere else:
 *  - active, trialing  → access
 *  - past_due          → access (provider is retrying payment; don't punish a card hiccup)
 *  - paused, canceled  → no access
 *  - a *scheduled* cancel/pause never revokes anything until it actually takes effect.
 */
export class Subscription {
	private constructor(private readonly p: SubscriptionProps) {}
	static create(p: SubscriptionProps): Subscription {
		if (!p.subscriptionId) throw new Error('Subscription needs a subscriptionId');
		if (!p.customerId) throw new Error(`Subscription ${p.subscriptionId} needs a customerId`);
		return new Subscription({ ...p });
	}
	get subscriptionId() { return this.p.subscriptionId; }
	get customerId() { return this.p.customerId; }
	get status() { return this.p.status; }
	get priceId() { return this.p.priceId; }
	get productId() { return this.p.productId; }
	get scheduledChange() { return this.p.scheduledChange; }
	get currentPeriodEnd() { return this.p.currentPeriodEnd; }
	get updatedAt() { return this.p.updatedAt; }

	grantsAccess(): boolean {
		return this.p.status === 'active' || this.p.status === 'trialing' || this.p.status === 'past_due';
	}
	isNewerThan(other: Subscription | null): boolean {
		return !other || this.updatedAt.getTime() >= other.updatedAt.getTime();
	}
	toJSON(): SubscriptionProps { return { ...this.p }; }
}
