import { VipMember, type VipMemberRepository, type VipStatus } from '$lib/domain/vip';

export interface SubscriptionEvent {
	subscriptionId: string;
	customerId: string;
	email: string;
	status: VipStatus;
	occurredAt: Date;
}

/**
 * Applies a provider subscription event to our membership record.
 * Idempotent and order-safe: older events never overwrite newer state.
 */
export class SyncVipMembership {
	constructor(private readonly members: VipMemberRepository) {}

	async execute(event: SubscriptionEvent): Promise<{ applied: boolean; member: VipMember }> {
		const incoming = VipMember.create({
			subscriptionId: event.subscriptionId,
			customerId: event.customerId,
			email: event.email,
			status: event.status,
			updatedAt: event.occurredAt
		});
		const current = await this.members.findBySubscriptionId(event.subscriptionId);
		if (!incoming.isNewerThan(current)) return { applied: false, member: current! };
		await this.members.save(incoming);
		return { applied: true, member: incoming };
	}
}
