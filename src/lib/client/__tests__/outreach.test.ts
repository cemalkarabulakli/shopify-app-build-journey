import { describe, expect, it } from 'vitest';
import { reachOutLink } from '../outreach';

const base = { name: 'Grüns', fact: 'Startup to 7,000+ retail locations', email: null, contactPage: 'https://gruns.co/pages/contact' };

describe('reachOutLink (AC-8)', () => {
	it('opens the reader’s own mail app, addressed to the published email, with subject and template', () => {
		const link = reachOutLink({ ...base, email: 'press@gruns.co' });
		expect(link.newTab).toBe(false);
		expect(link.href.startsWith('mailto:press@gruns.co?subject=')).toBe(true);
		const params = new URLSearchParams(link.href.slice(link.href.indexOf('?') + 1));
		expect(params.get('subject')).toBe('Learning from Grüns’s story');
		const body = params.get('body') ?? '';
		expect(body).toContain('Hi Grüns team,');
		expect(body).toContain('Startup to 7,000+ retail locations');
		expect(body).toContain('[your name]');
		expect(body).toContain('[one specific question]');
	});

	it('encodes the subject and body so the mail app receives them intact', () => {
		const link = reachOutLink({ ...base, name: 'A&B ?Co', email: 'hi@ab.co' });
		expect(link.href).not.toMatch(/\s/);
		expect(link.href).toContain('A%26B%20%3FCo');
		expect(link.href).toContain('%0D%0A'); // line breaks as CRLF (RFC 6068)
	});

	it('falls back to the merchant’s public contact page in a new tab when no email is published', () => {
		expect(reachOutLink(base)).toEqual({ href: 'https://gruns.co/pages/contact', newTab: true });
	});

	it('prefers the published email over the contact page', () => {
		expect(reachOutLink({ ...base, email: 'press@gruns.co' }).href.startsWith('mailto:')).toBe(true);
	});

	it('only ever produces mailto: or https: links', () => {
		expect(() => reachOutLink({ ...base, contactPage: 'javascript:alert(1)' })).toThrow();
		expect(() => reachOutLink({ ...base, contactPage: null })).toThrow();
	});
});

import { reachedCount } from '../outreach';

describe('reachedCount (AC-10, review finding 1)', () => {
	const catalog = ['gruns', 'pulsetto', 'labellov', 'scuffers'];
	const has = (set: string[]) => (id: string) => set.includes(id);

	it('counts only merchants that are still in the catalog', () => {
		expect(reachedCount(catalog, has(['gruns', 'removed-merchant', 'junk']))).toBe(1);
	});
	it('crosses the outreach boundary 2 → 3 → 2 the same way on every page', () => {
		expect(reachedCount(catalog, has(['gruns', 'pulsetto']))).toBe(2);
		expect(reachedCount(catalog, has(['gruns', 'pulsetto', 'labellov']))).toBe(3);
		expect(reachedCount(catalog, has(['gruns', 'labellov', 'old-id']))).toBe(2);
	});
});
