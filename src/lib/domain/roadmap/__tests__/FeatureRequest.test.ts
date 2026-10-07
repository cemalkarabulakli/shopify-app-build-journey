import { describe, expect, it } from 'vitest';
import { FeatureRequest } from '../FeatureRequest';

const base = {
	id: 'r1',
	title: 'Subscribers cannot pause a delivery',
	body: 'Twenty emails a week, ten minutes each.',
	status: 'considering' as const,
	authorEmail: 'a@b.com',
	authorTier: 'Pro',
	note: null,
	createdAt: new Date('2026-09-01'),
	updatedAt: new Date('2026-09-01'),
	shippedAt: null
};

describe('FeatureRequest', () => {
	it('trims and rejects a title or body that is too short or too long', () => {
		expect(FeatureRequest.create({ ...base, title: '  Pause a delivery  ' }).title).toBe('Pause a delivery');
		expect(() => FeatureRequest.create({ ...base, title: 'ab' })).toThrow('short-title');
		expect(() => FeatureRequest.create({ ...base, title: 'x'.repeat(121) })).toThrow('long-title');
		expect(() => FeatureRequest.create({ ...base, body: 'too short' })).toThrow('short-body');
		expect(() => FeatureRequest.create({ ...base, body: 'x'.repeat(2001) })).toThrow('long-body');
	});

	it('only accepts votes while it is still open', () => {
		for (const status of ['considering', 'planned', 'building'] as const) {
			expect(FeatureRequest.create({ ...base, status }).acceptsVotes()).toBe(true);
		}
		expect(FeatureRequest.create({ ...base, status: 'declined' }).acceptsVotes()).toBe(false);
		expect(FeatureRequest.create({ ...base, status: 'shipped', shippedAt: new Date() }).acceptsVotes()).toBe(false);
	});

	it('stamps shippedAt on the way in, keeps it, and clears it on the way out', () => {
		const now = new Date('2026-09-20');
		const shipped = FeatureRequest.create(base).withStatus('shipped', 'Shipped in v2.', now);
		expect(shipped.shippedAt).toEqual(now);
		expect(shipped.note).toBe('Shipped in v2.');
		// Re-shipping keeps the original date rather than moving it.
		expect(shipped.withStatus('shipped', null, new Date('2026-10-01')).shippedAt).toEqual(now);
		// Moving back out of shipped clears the changelog date.
		expect(shipped.withStatus('building', null, now).shippedAt).toBeNull();
	});

	it('never mutates in place', () => {
		const original = FeatureRequest.create(base);
		original.withStatus('planned', 'later', new Date());
		expect(original.status).toBe('considering');
		expect(original.note).toBeNull();
	});

	it('refuses a shipped request with no date', () => {
		expect(() => FeatureRequest.create({ ...base, status: 'shipped' })).toThrow('shippedAt');
	});
});
