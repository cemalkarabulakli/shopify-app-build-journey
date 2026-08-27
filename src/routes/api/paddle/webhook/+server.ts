import { json } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

/**
 * Paddle → us.
 *  1. read the RAW body (text, never JSON.parse) and verify with the notification signing secret
 *  2. non-2xx on any verification failure so Paddle keeps retrying instead of marking it delivered
 *  3. route to HandleBillingEvent, which is idempotent (event id) and order-safe (occurred_at)
 */
export const POST: RequestHandler = async ({ request }) => {
	const c = container();
	let hooks;
	try {
		hooks = c.paddleWebhooks;
	} catch (e) {
		console.error('[paddle] misconfigured:', (e as Error).message);
		return json({ error: (e as Error).message }, { status: 503 });
	}
	if (!hooks.configured) return json({ error: 'PADDLE_WEBHOOK_SECRET not set' }, { status: 503 });

	const signature = request.headers.get('paddle-signature') ?? '';
	const raw = await request.text();
	let event;
	try {
		event = await hooks.parse(raw, signature);
	} catch (e) {
		const msg = (e as Error).message ?? '';
		// The SDK verifies first, then builds the typed entity. Only the former is the sender's fault.
		if (/signature/i.test(msg)) {
			console.warn('[paddle] rejected webhook: bad signature');
			return json({ error: 'invalid signature' }, { status: 401 });
		}
		console.error('[paddle] could not parse verified event:', msg);
		return json({ error: 'could not parse event' }, { status: 500 });
	}

	try {
		const result = await c.handleBillingEvent.execute(event);
		console.log(`[paddle] ${event.eventType} ${event.eventId} → ${result.outcome}: ${result.detail}`);
		return json({ ok: true, ...result });
	} catch (e) {
		// Our fault (DB down, bug): 500 so Paddle retries later.
		console.error('[paddle] failed to apply', event.eventType, event.eventId, e);
		return json({ error: 'failed to apply event' }, { status: 500 });
	}
};
