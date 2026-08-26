import { describe, expect, it } from 'vitest';
import { SyncVipMembership } from '$lib/application';
import { VipMember, type VipMemberRepository } from '$lib/domain/vip';

class InMemory implements VipMemberRepository {
	store = new Map<string, VipMember>();
	async findBySubscriptionId(id: string) { return this.store.get(id) ?? null; }
	async save(m: VipMember) { this.store.set(m.subscriptionId, m); }
	async findAll() { return [...this.store.values()]; }
}
const ev = (status: 'active' | 'canceled', at: string) => ({ subscriptionId: 'sub_1', customerId: 'ctm_1', email: 'a@b.c', status, occurredAt: new Date(at) });

describe('SyncVipMembership', () => {
	it('records a new active member', async () => {
		const repo = new InMemory();
		const { applied, member } = await new SyncVipMembership(repo).execute(ev('active', '2026-08-27T10:00:00Z'));
		expect(applied).toBe(true);
		expect(member.hasAccess()).toBe(true);
	});
	it('ignores an older event that arrives after a newer one', async () => {
		const repo = new InMemory();
		const uc = new SyncVipMembership(repo);
		await uc.execute(ev('canceled', '2026-08-27T12:00:00Z'));
		const { applied, member } = await uc.execute(ev('active', '2026-08-27T10:00:00Z'));
		expect(applied).toBe(false);
		expect(member.status).toBe('canceled');
		expect(member.hasAccess()).toBe(false);
	});
});
