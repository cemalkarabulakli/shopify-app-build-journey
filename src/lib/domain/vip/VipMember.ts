/**
 * VipMember — someone with an active (or lapsed) VIP subscription.
 * Pure TypeScript; the payment provider is an infrastructure detail.
 */
export type VipStatus = 'active' | 'trialing' | 'past_due' | 'paused' | 'canceled';

export interface VipMemberProps {
	/** Provider-side subscription id — the natural key. */
	subscriptionId: string;
	customerId: string;
	email: string;
	status: VipStatus;
	/** When the current status was observed (provider event time). */
	updatedAt: Date;
}

export class VipMember {
	private constructor(private readonly props: VipMemberProps) {}

	static create(props: VipMemberProps): VipMember {
		if (!props.subscriptionId) throw new Error('VipMember needs a subscriptionId');
		return new VipMember({ ...props });
	}

	get subscriptionId() { return this.props.subscriptionId; }
	get customerId() { return this.props.customerId; }
	get email() { return this.props.email; }
	get status() { return this.props.status; }
	get updatedAt() { return this.props.updatedAt; }

	/** Only these statuses unlock VIP privileges. */
	hasAccess(): boolean {
		return this.props.status === 'active' || this.props.status === 'trialing';
	}

	/** Ignore stale events that arrive out of order. */
	isNewerThan(other: VipMember | null): boolean {
		return !other || this.updatedAt.getTime() >= other.updatedAt.getTime();
	}

	toJSON(): VipMemberProps {
		return { ...this.props };
	}
}
