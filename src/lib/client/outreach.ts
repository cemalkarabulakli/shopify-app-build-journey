/** What the reach-out action needs to know about a merchant. */
export interface ReachOutTarget {
	name: string;
	/** The notable fact shown on the card — the reader's opener. */
	fact: string;
	/** Only an address the merchant publishes itself (BR-13). */
	email: string | null;
	contactPage: string | null;
}

/**
 * BR-13: the site never sends mail. With a published email, the reader's own mail app opens with
 * an editable template; otherwise the merchant's public contact page opens in a new tab.
 * The template is English on purpose: merchants are addressed in English (R9).
 */
export function reachOutLink(m: ReachOutTarget): { href: string; newTab: boolean } {
	if (m.email) {
		const subject = `Learning from ${m.name}’s story`;
		const body = [
			`Hi ${m.name} team,`,
			'',
			"I'm [your name], and I'm building a Shopify app by studying merchants who got it right.",
			`I read that ${m.name}: ${m.fact}. What I took from it: [what you learned].`,
			'',
			'One question, if you have a minute: [one specific question]',
			'',
			'Thank you,',
			'[your name]'
		].join('\r\n');
		return { href: `mailto:${m.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, newTab: false };
	}
	if (m.contactPage && new URL(m.contactPage).protocol === 'https:') return { href: m.contactPage, newTab: true };
	throw new Error(`${m.name} has no published email or https contact page`);
}
