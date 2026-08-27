import { Environment, Paddle } from '@paddle/paddle-node-sdk';

/** Mints Paddle-hosted customer portal sessions. Server-side only — needs the API key. */
export class PaddlePortal {
	private readonly paddle: Paddle;
	constructor(apiKey: string, environment: 'sandbox' | 'production') {
		if (!apiKey) throw new Error('PADDLE_API_KEY is required to open the customer portal');
		this.paddle = new Paddle(apiKey, { environment: environment === 'production' ? Environment.production : Environment.sandbox });
	}
	/** @returns the portal overview URL; the session also carries per-subscription deep links. */
	async sessionUrl(customerId: string, subscriptionIds: string[]): Promise<string> {
		const s = await this.paddle.customerPortalSessions.create(customerId, subscriptionIds);
		return s.urls.general.overview;
	}
}
