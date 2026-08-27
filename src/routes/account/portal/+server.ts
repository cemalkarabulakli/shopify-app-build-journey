import { error, redirect } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import type { RequestHandler } from './$types';

/**
 * Opens the Paddle-hosted customer portal.
 * Auth first; the Paddle customer id is resolved from the session email via our mirrored
 * tables — never from anything the client sends.
 */
export const POST: RequestHandler = async ({ locals }) => {
	if (!locals.user) redirect(303, '/account');
	const c = container();
	const access = await c.getAccessForEmail.execute(locals.user.email);
	if (!access.customer) error(404, 'No billing account for this email yet');
	let url: string;
	try {
		url = await c.paddlePortal.sessionUrl(access.customer.customerId, access.subscriptions.map((s) => s.subscriptionId));
	} catch (e) {
		console.error('[portal]', (e as Error).message);
		error(502, 'Could not open the billing portal');
	}
	redirect(303, url);
};
