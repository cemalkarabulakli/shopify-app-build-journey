import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FileSystemPostRepository } from '../FileSystemPostRepository';
import { rewriteRelativeMarkdownLinks } from '../rewriteRelativeMarkdownLinks';

describe('rewriteRelativeMarkdownLinks', () => {
	it('points relative .md links at the docs route, keeps anchors, ignores absolute URLs', () => {
		const md = 'see [x](03-EKOSISTEM-VERILERI.md#churn), [y](https://a.b/c.md), [z](/posts/q), [w](LEARNING.md)';
		expect(rewriteRelativeMarkdownLinks(md, '/docs')).toBe(
			'see [x](/docs/03-ekosistem-verileri#churn), [y](https://a.b/c.md), [z](/posts/q), [w](/docs/learning)'
		);
	});
});

describe('FileSystemPostRepository with frontmatter-less docs', () => {
	it('lowercases the slug, takes the title from the first H1 and strips it from the body', async () => {
		const dir = await mkdtemp(join(tmpdir(), 'docs-'));
		await writeFile(join(dir, '00-SHOPIFY-101.md'), '# Shopify 101 — Giriş\n\n> intro\n\n## 1. Bölüm\n');
		const [doc] = await new FileSystemPostRepository(dir).findAll();
		expect(doc.slug).toBe('00-shopify-101');
		expect(doc.title).toBe('Shopify 101 — Giriş');
		expect(doc.body.startsWith('> intro')).toBe(true);
		expect(doc.isPublished()).toBe(true);
	});
});
