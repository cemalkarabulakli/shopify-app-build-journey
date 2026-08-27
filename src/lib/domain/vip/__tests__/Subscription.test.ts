import { describe, expect, it } from 'vitest';
import { Subscription } from '$lib/domain/vip';

const sub = (status: Parameters<typeof Subscription.create>[0]['status'], scheduled = false) =>
	Subscription.create({ subscriptionId: 'sub_1', customerId: 'ctm_1', status, priceId: 'pri', productId: 'pro', scheduledChange: scheduled ? { action: 'cancel', effectiveAt: new Date('2026-09-27') } : null, currentPeriodEnd: null, updatedAt: new Date() });

describe('Subscription.grantsAccess', () => {
	it('grants for active, trialing and past_due', () => {
		expect(sub('active').grantsAccess()).toBe(true);
		expect(sub('trialing').grantsAccess()).toBe(true);
		expect(sub('past_due').grantsAccess()).toBe(true);
	});
	it('denies for paused and canceled', () => {
		expect(sub('paused').grantsAccess()).toBe(false);
		expect(sub('canceled').grantsAccess()).toBe(false);
	});
	it('a scheduled cancellation does not revoke access early', () => {
		expect(sub('active', true).grantsAccess()).toBe(true);
	});
});
