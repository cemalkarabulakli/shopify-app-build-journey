import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FileSystemPostRepository } from '../FileSystemPostRepository';
import { FrontmatterParser } from '../FrontmatterParser';
import { isLearningNote } from '../learningNotes';
import { rewriteRelativeMarkdownLinks } from '../rewriteRelativeMarkdownLinks';

describe('rewriteRelativeMarkdownLinks', () => {
	it('points relative .md links at the docs route, keeps anchors, ignores absolute URLs', () => {
		const md = 'see [x](03-ECOSYSTEM-DATA.md#churn), [y](https://a.b/c.md), [z](/posts/q), [w](LEARNING.md)';
		expect(rewriteRelativeMarkdownLinks(md, '/docs')).toBe(
			'see [x](/docs/03-ecosystem-data#churn), [y](https://a.b/c.md), [z](/posts/q), [w](/docs/learning)'
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

describe('isLearningNote (BR-11: what docs/ publishes)', () => {
	it.each([
		['00-x.md', true],
		['13-x.md', true],
		['README.md', true],
		['LEARNING.md', true],
		['architecture.md', false],
		['notes.md', false],
		['5-x.md', false],
		['100-x.md', false],
		['ab-x.md', false],
		['readme.md', false],
		['00-x.txt', false]
	])('%s → %s', (file, published) => {
		expect(isLearningNote(file)).toBe(published);
	});
});

describe('FileSystemPostRepository with an include filter', () => {
	async function docsDir(): Promise<string> {
		const dir = await mkdtemp(join(tmpdir(), 'docs-'));
		const files = ['00-SHOPIFY-101.md', 'README.md', 'LEARNING.md', 'architecture.md', 'security.md', 'notes.md'];
		await Promise.all(files.map((f) => writeFile(join(dir, f), `# ${f}\n\nBody of ${f}.\n`)));
		return dir;
	}

	it('lists only the files the filter publishes', async () => {
		const repo = new FileSystemPostRepository(await docsDir(), new FrontmatterParser(), isLearningNote);
		const slugs = (await repo.findAll()).map((d) => d.slug).sort();
		expect(slugs).toEqual(['00-shopify-101', 'learning', 'readme']);
	});

	it('does not find an unpublished file by slug, so its route answers 404', async () => {
		const repo = new FileSystemPostRepository(await docsDir(), new FrontmatterParser(), isLearningNote);
		expect(await repo.findBySlug('architecture')).toBeNull();
		expect(await repo.findBySlug('security')).toBeNull();
		expect(await repo.findBySlug('00-shopify-101')).not.toBeNull();
	});

	it('loads every markdown file when no filter is given, as journal entries need', async () => {
		const slugs = (await new FileSystemPostRepository(await docsDir()).findAll()).map((d) => d.slug);
		expect(slugs).toHaveLength(6);
	});
});
