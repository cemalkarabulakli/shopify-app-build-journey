import { EventName, Paddle, Environment, type EventEntity } from '@paddle/paddle-node-sdk';
import type { SubscriptionEvent } from '$lib/application';
import type { VipStatus } from '$lib/domain/vip';

/**
 * Anti-corruption layer around Paddle: verifies signatures and translates
 * Paddle's event zoo into our one SubscriptionEvent shape.
 */
export class PaddleWebhookAdapter {
	private readonly paddle: Paddle;

	constructor(
		apiKey: string,
		private readonly webhookSecret: string,
		environment: 'sandbox' | 'production'
	) {
		this.paddle = new Paddle(apiKey || 'unused-for-webhooks', {
			environment: environment === 'production' ? Environment.production : Environment.sandbox
		});
	}

	get configured(): boolean {
		return this.webhookSecret.length > 0;
	}

	/** Throws if the signature is invalid. Returns null for events we don't care about. */
	async parse(rawBody: string, signature: string): Promise<{ type: string; event: SubscriptionEvent | null }> {
		const entity = await this.paddle.webhooks.unmarshal(rawBody, this.webhookSecret, signature);
		return { type: entity.eventType, event: this.toSubscriptionEvent(entity) };
	}

	private toSubscriptionEvent(entity: EventEntity): SubscriptionEvent | null {
		switch (entity.eventType) {
			case EventName.SubscriptionCreated:
			case EventName.SubscriptionActivated:
			case EventName.SubscriptionUpdated:
			case EventName.SubscriptionTrialing:
			case EventName.SubscriptionPastDue:
			case EventName.SubscriptionPaused:
			case EventName.SubscriptionResumed:
			case EventName.SubscriptionCanceled: {
				const s = entity.data;
				const custom = (s.customData ?? {}) as Record<string, unknown>;
				return {
					subscriptionId: s.id,
					customerId: s.customerId,
					// Paddle's subscription payload has no email; we pass it through customData at checkout.
					email: typeof custom.email === 'string' ? custom.email : '',
					status: mapStatus(s.status),
					occurredAt: new Date(entity.occurredAt)
				};
			}
			default:
				return null;
		}
	}
}

function mapStatus(status: string): VipStatus {
	switch (status) {
		case 'active': return 'active';
		case 'trialing': return 'trialing';
		case 'past_due': return 'past_due';
		case 'paused': return 'paused';
		default: return 'canceled';
	}
}
