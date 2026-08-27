/** Who is signed in. Only the email is trusted; provider ids are resolved server-side from it. */
export interface SessionUser {
	email: string;
}

/** Port: one-time login links. Tokens are stored hashed; the plain token only ever lives in the email. */
export interface LoginTokenRepository {
	create(tokenHash: string, email: string, expiresAt: Date): Promise<void>;
	/** Consumes the token. Returns the email if it was valid, unexpired and unused. */
	consume(tokenHash: string, now: Date): Promise<string | null>;
}

/** Port: how a login link reaches the person. */
export interface EmailSender {
	send(to: string, subject: string, text: string): Promise<void>;
}
