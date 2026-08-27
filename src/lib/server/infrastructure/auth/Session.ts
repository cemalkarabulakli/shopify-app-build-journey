import { createHmac, timingSafeEqual } from 'node:crypto';
import type { SessionUser } from '$lib/domain/auth';

/** Stateless signed session cookie: base64url(json).hmac. Rotating SESSION_SECRET logs everyone out. */
export class SessionCodec {
	constructor(private readonly secret: string) {
		if (!secret || secret.length < 32) throw new Error('SESSION_SECRET must be at least 32 characters');
	}
	encode(user: SessionUser, ttlMs = 30 * 24 * 3600 * 1000): string {
		const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + ttlMs })).toString('base64url');
		return `${payload}.${this.sign(payload)}`;
	}
	decode(cookie: string | undefined, now = Date.now()): SessionUser | null {
		if (!cookie) return null;
		const [payload, sig] = cookie.split('.');
		if (!payload || !sig) return null;
		const expected = this.sign(payload);
		if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
		try {
			const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
			if (typeof data.email !== 'string' || typeof data.exp !== 'number' || data.exp < now) return null;
			return { email: data.email };
		} catch {
			return null;
		}
	}
	private sign(payload: string) {
		return createHmac('sha256', this.secret).update(payload).digest('base64url');
	}
}
