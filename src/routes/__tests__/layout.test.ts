import { createRawSnippet } from 'svelte';
import { render } from 'svelte/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('$app/state', () => ({ page: { url: new URL('https://example.com/') } }));

/**
 * BUG-001 reproduction: docs/security.md requires JSON-LD inside {@html} to escape `<`, as Seo.svelte
 * does. The layout's WebSite JSON-LD did not, so a `</script>` in the site config closed the tag early.
 */
describe('layout JSON-LD (BUG-001)', () => {
	it('cannot be broken out of by a </script> in the site configuration', async () => {
		const { default: Layout } = await import('../+layout.svelte');
		const evil = 'Shopify notes</script><script>alert(1)</script>';
		const { head } = render(Layout, {
			props: {
				data: { locale: 'en', site: { name: evil, url: 'https://example.com', author: evil, description: evil } },
				children: createRawSnippet(() => ({ render: () => '<p>child</p>' }))
			}
		});
		const ld = head.slice(head.indexOf('<script type="application/ld+json">'));
		expect(ld.startsWith('<script type="application/ld+json">')).toBe(true);
		expect(head).not.toContain('<script>alert(1)</script>');
		// The data survives intact for crawlers once the escape is decoded.
		const json = ld.slice(ld.indexOf('>') + 1, ld.indexOf('</script>'));
		expect(JSON.parse(json).description).toBe(evil);
	});
});
