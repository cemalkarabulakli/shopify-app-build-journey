import { createHash, randomBytes } from 'node:crypto';
import type { EmailSender, LoginTokenRepository } from '$lib/domain/auth';

const hash = (token: string) => createHash('sha256').update(token).digest('hex');

/** Passwordless sign-in: email a one-time link, exchange it for a session. */
export class MagicLinkLogin {
	constructor(
		private readonly tokens: LoginTokenRepository,
		private readonly email: EmailSender,
		private readonly siteUrl: string,
		private readonly ttlMs = 15 * 60 * 1000
	) {}

	async requestLink(rawEmail: string, now = new Date()): Promise<void> {
		const to = rawEmail.trim().toLowerCase();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error('Invalid email');
		const token = randomBytes(32).toString('base64url');
		await this.tokens.create(hash(token), to, new Date(now.getTime() + this.ttlMs));
		const link = `${this.siteUrl}/account/verify?token=${token}`;
		await this.email.send(to, 'Your sign-in link', `Click to sign in (valid 15 minutes):\n\n${link}\n\nIf you didn't ask for this, ignore it.`);
	}

	/** @returns the email for a valid token, or null. */
	async verify(token: string, now = new Date()): Promise<string | null> {
		if (!token) return null;
		return this.tokens.consume(hash(token), now);
	}
}
