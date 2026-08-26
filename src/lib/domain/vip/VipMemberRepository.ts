import type { VipMember } from './VipMember';

/** Port: where VIP membership state lives. */
export interface VipMemberRepository {
	findBySubscriptionId(id: string): Promise<VipMember | null>;
	save(member: VipMember): Promise<void>;
	findAll(): Promise<VipMember[]>;
}
