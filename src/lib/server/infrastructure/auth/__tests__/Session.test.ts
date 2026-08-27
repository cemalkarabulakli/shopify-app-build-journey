import { describe, expect, it } from 'vitest';
import { SessionCodec } from '../Session';

describe('SessionCodec', () => {
	const codec = new SessionCodec('x'.repeat(40));
	it('round-trips and rejects tampering/expiry/foreign secrets', () => {
		const cookie = codec.encode({ email: 'a@b.c' });
		expect(codec.decode(cookie)?.email).toBe('a@b.c');
		expect(codec.decode(cookie + 'x')).toBeNull();
		expect(codec.decode(cookie, Date.now() + 31 * 24 * 3600 * 1000)).toBeNull();
		expect(new SessionCodec('y'.repeat(40)).decode(cookie)).toBeNull();
		expect(codec.decode(undefined)).toBeNull();
	});
	it('refuses a weak secret', () => {
		expect(() => new SessionCodec('short')).toThrow();
	});
});
