import { fail, redirect } from '@sveltejs/kit';
import { container } from '$lib/server/container';
import { tiers } from '$lib/vip/tiers';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const c = container();
	const sent = url.searchParams.get('sent') === '1';
	const error = url.searchParams.get('error');
	if (!locals.user) return { user: null, sent, error, access: null, tierName: null };

	let access;
	try {
		access = await c.getAccessForEmail.execute(locals.user.email);
	} catch (e) {
		console.error('[account]', (e as Error).message);
		return { user: locals.user, sent, error: 'db', access: null, tierName: null };
	}
	const tierName = access.active ? (tiers.find((t) => t.priceId.month === access.active!.priceId || t.priceId.year === access.active!.priceId)?.name ?? null) : null;
	return {
		user: locals.user,
		sent,
		error,
		tierName,
		access: {
			hasAccess: access.hasAccess,
			customerId: access.customer?.customerId ?? null,
			subscriptions: access.subscriptions.map((s) => ({
				id: s.subscriptionId,
				status: s.status,
				scheduledChange: s.scheduledChange ? { action: s.scheduledChange.action, at: s.scheduledChange.effectiveAt.toISOString() } : null,
				currentPeriodEnd: s.currentPeriodEnd?.toISOString() ?? null
			}))
		}
	};
};

export const actions: Actions = {
	/** Step 1 of sign-in: email a one-time link. Always responds the same way (no account enumeration). */
	login: async ({ request }) => {
		const email = String((await request.formData()).get('email') ?? '');
		try {
			await container().magicLinkLogin.requestLink(email);
		} catch (e) {
			const msg = (e as Error).message;
			if (msg === 'Invalid email') return fail(400, { error: 'email' });
			console.error('[account] login failed:', msg);
			return fail(500, { error: 'send' });
		}
		redirect(303, '/account?sent=1');
	}
};
