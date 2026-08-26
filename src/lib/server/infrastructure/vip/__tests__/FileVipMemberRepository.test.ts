import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { VipMember } from '$lib/domain/vip';
import { FileVipMemberRepository } from '../FileVipMemberRepository';

const member = (id: string, status: 'active' | 'canceled' = 'active') =>
	VipMember.create({ subscriptionId: id, customerId: 'ctm', email: `${id}@x.y`, status, updatedAt: new Date('2026-08-27T00:00:00Z') });

describe('FileVipMemberRepository', () => {
	it('round-trips members through the JSON file and survives concurrent saves', async () => {
		const dir = await mkdtemp(join(tmpdir(), 'vip-'));
		const repo = new FileVipMemberRepository(join(dir, 'nested', 'vip-members.json'));
		await Promise.all([repo.save(member('sub_a')), repo.save(member('sub_b')), repo.save(member('sub_c', 'canceled'))]);
		const fresh = new FileVipMemberRepository(join(dir, 'nested', 'vip-members.json'));
		expect((await fresh.findAll()).map((m) => m.subscriptionId).sort()).toEqual(['sub_a', 'sub_b', 'sub_c']);
		expect((await fresh.findBySubscriptionId('sub_c'))?.hasAccess()).toBe(false);
		expect((await fresh.findBySubscriptionId('sub_a'))?.updatedAt.toISOString()).toBe('2026-08-27T00:00:00.000Z');
		expect(await fresh.findBySubscriptionId('nope')).toBeNull();
	});
});
