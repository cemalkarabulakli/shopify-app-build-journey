import { describe, expect, it, vi } from 'vitest';
import { CachedPostRepository } from '../CachedPostRepository';
import { InMemoryPostRepository, makePost } from '$lib/application/__tests__/InMemoryPostRepository';

describe('CachedPostRepository', () => {
	it('serves from cache until the TTL expires', async () => {
		const inner = new InMemoryPostRepository([makePost()]);
		const spy = vi.spyOn(inner, 'findAll');
		let now = 0;
		const cached = new CachedPostRepository(inner, 1000, () => now);

		await cached.findAll();
		await cached.findBySlug('hello');
		expect(spy).toHaveBeenCalledTimes(1);

		now = 1001;
		await cached.findAll();
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
