import { json } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

/**
 * Paddle → us. Verify the signature on the *raw* body, translate, apply.
 * Always 200 once verified (Paddle retries anything else); 401 on bad signature.
 */
export const POST: RequestHandler = async ({ request }) => {
	const c = container();
	if (!c.paddleWebhooks.configured) return json({ error: 'PADDLE_WEBHOOK_SECRET not set' }, { status: 503 });

	const signature = request.headers.get('paddle-signature') ?? '';
	const raw = await request.text();
	let parsed;
	try {
		parsed = await c.paddleWebhooks.parse(raw, signature);
	} catch (e) {
		console.warn('[paddle] rejected webhook:', (e as Error).message);
		return json({ error: 'invalid signature' }, { status: 401 });
	}

	if (!parsed.event) return json({ ok: true, ignored: parsed.type });
	const { applied, member } = await c.syncVipMembership.execute(parsed.event);
	console.log(`[paddle] ${parsed.type} → ${member.subscriptionId} ${member.status}${applied ? '' : ' (stale, ignored)'}`);
	return json({ ok: true, applied, status: member.status });
};
