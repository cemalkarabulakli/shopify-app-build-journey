import { Environment, EventName, Paddle, type EventEntity } from '@paddle/paddle-node-sdk';
import type { BillingEvent } from '$lib/application';
import type { ScheduledAction, SubscriptionStatus } from '$lib/domain/vip';

/**
 * Anti-corruption layer around Paddle webhooks: verifies the signature on the RAW body
 * (never JSON.parse first — that breaks verification) and maps Paddle's event zoo to BillingEvent.
 */
export class PaddleWebhookAdapter {
	private readonly paddle: Paddle;

	constructor(
		private readonly webhookSecret: string,
		environment: 'sandbox' | 'production'
	) {
		// Verification is purely local (HMAC); no API key is needed for it.
		this.paddle = new Paddle('unused-for-webhooks', { environment: environment === 'production' ? Environment.production : Environment.sandbox });
	}

	get configured(): boolean {
		return this.webhookSecret.length > 0;
	}

	/** Throws when the signature is invalid. */
	async parse(rawBody: string, signature: string): Promise<BillingEvent> {
		const e = await this.paddle.webhooks.unmarshal(rawBody, this.webhookSecret, signature);
		return this.map(e);
	}

	private map(e: EventEntity): BillingEvent {
		const base = { eventId: e.eventId, eventType: e.eventType, occurredAt: new Date(e.occurredAt) };
		switch (e.eventType) {
			case EventName.CustomerCreated:
			case EventName.CustomerUpdated:
				return { ...base, kind: 'customer', data: { customerId: e.data.id, email: e.data.email, name: e.data.name ?? null, updatedAt: base.occurredAt } };

			case EventName.SubscriptionCreated:
			case EventName.SubscriptionUpdated:
			case EventName.SubscriptionActivated:
			case EventName.SubscriptionTrialing:
			case EventName.SubscriptionPastDue:
			case EventName.SubscriptionPaused:
			case EventName.SubscriptionResumed:
			case EventName.SubscriptionCanceled: {
				const s = e.data;
				const item = s.items[0];
				return {
					...base,
					kind: 'subscription',
					data: {
						subscriptionId: s.id,
						customerId: s.customerId,
						status: mapStatus(s.status),
						priceId: item?.price?.id ?? '',
						productId: item?.product?.id ?? item?.price?.productId ?? '',
						scheduledChange: s.scheduledChange ? { action: s.scheduledChange.action as ScheduledAction, effectiveAt: new Date(s.scheduledChange.effectiveAt) } : null,
						currentPeriodEnd: s.currentBillingPeriod ? new Date(s.currentBillingPeriod.endsAt) : null,
						updatedAt: base.occurredAt
					}
				};
			}

			case EventName.TransactionCompleted:
			case EventName.TransactionPaymentFailed: {
				const t = e.data;
				return {
					...base,
					kind: 'transaction',
					data: {
						transactionId: t.id,
						customerId: t.customerId ?? null,
						subscriptionId: t.subscriptionId ?? null,
						status: t.status,
						total: t.details?.totals?.grandTotal ?? null,
						currencyCode: t.currencyCode ?? null,
						billedAt: t.billedAt ? new Date(t.billedAt) : null,
						updatedAt: base.occurredAt
					}
				};
			}
			default:
				return { ...base, kind: 'ignored' };
		}
	}
}

function mapStatus(status: string): SubscriptionStatus {
	switch (status) {
		case 'active': return 'active';
		case 'trialing': return 'trialing';
		case 'past_due': return 'past_due';
		case 'paused': return 'paused';
		default: return 'canceled';
	}
}
