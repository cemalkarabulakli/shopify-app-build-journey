import { describe, expect, it } from 'vitest';
import { container } from '../container';

/**
 * BR-11 end to end through the real wiring and the real docs/ folder: the unit tests prove the
 * filter works, this one proves the site actually uses it — dropping the filter from the
 * container would otherwise leave scripts/check green and publish the engineering docs.
 */
describe('container docs (BR-11)', () => {
	const ENGINEERING = ['architecture', 'conventions', 'domain', 'git', 'security', 'testing'];

	it('lists learning notes and never the engineering docs', async () => {
		const slugs = (await container().listDocs.execute()).map((d) => d.slug);
		expect(slugs).toContain('00-shopify-101');
		expect(slugs).toContain('readme');
		for (const slug of ENGINEERING) expect(slugs).not.toContain(slug);
	});

	it('does not export an engineering doc as markdown', async () => {
		await expect(container().exportDocs.one('architecture')).rejects.toThrow();
		await expect(container().exportDocs.one('00-shopify-101')).resolves.toBeTruthy();
	});
});
