import { describe, expect, it, vi } from 'vitest';
import { isAdminEmail, type SiteConfig } from '../siteConfig';

const site = (adminEmails: string[]) => ({ adminEmails }) as SiteConfig;

describe('isAdminEmail (spec 0003 AC-10, BR-9)', () => {
	it('makes nobody an admin when ADMIN_EMAILS is empty', () => {
		expect(isAdminEmail(site([]), 'builder@example.com')).toBe(false);
	});
	it('recognises a listed email regardless of case and spacing', () => {
		expect(isAdminEmail(site(['builder@example.com']), '  Builder@Example.com ')).toBe(true);
	});
	it('refuses an unlisted email and a missing one', () => {
		expect(isAdminEmail(site(['builder@example.com']), 'member@example.com')).toBe(false);
		expect(isAdminEmail(site(['builder@example.com']), null)).toBe(false);
		expect(isAdminEmail(site(['builder@example.com']), undefined)).toBe(false);
	});
});

vi.mock('$env/dynamic/private', () => ({ env: { ADMIN_EMAILS: ' Builder@Example.com, ,x@y.z ' } }));
vi.mock('$env/dynamic/public', () => ({ env: {} }));

describe('loadSiteConfig ADMIN_EMAILS (review 0003 m-5)', () => {
	it('splits on commas, trims, lowercases and drops empty entries', async () => {
		const { loadSiteConfig } = await import('../siteConfig');
		expect(loadSiteConfig().adminEmails).toEqual(['builder@example.com', 'x@y.z']);
	});
});
