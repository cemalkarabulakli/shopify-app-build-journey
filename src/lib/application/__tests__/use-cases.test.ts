import { describe, expect, it } from 'vitest';
import { PostNotFoundError } from '$lib/domain/post';
import { BuildFeed, GetPublishedPost, ListPublishedPosts, type MarkdownRenderer } from '$lib/application';
import { InMemoryPostRepository, makePost } from './InMemoryPostRepository';

const upperRenderer: MarkdownRenderer = { render: (md) => `<p>${md.toUpperCase()}</p>` };

describe('ListPublishedPosts', () => {
	it('hides drafts and sorts newest first', async () => {
		const repo = new InMemoryPostRepository([
			makePost({ slug: 'old', publishedAt: new Date('2026-01-01') }),
			makePost({ slug: 'draft', draft: true }),
			makePost({ slug: 'new', publishedAt: new Date('2026-03-01') })
		]);
		const result = await new ListPublishedPosts(repo).execute();
		expect(result.map((p) => p.slug)).toEqual(['new', 'old']);
	});
});

describe('GetPublishedPost', () => {
	it('renders markdown through the injected renderer', async () => {
		const repo = new InMemoryPostRepository([makePost({ body: 'hi' })]);
		const dto = await new GetPublishedPost(repo, upperRenderer).execute('hello');
		expect(dto.html).toBe('<p>HI</p>');
	});

	it('treats drafts and unknown slugs as not found', async () => {
		const repo = new InMemoryPostRepository([makePost({ slug: 'secret', draft: true })]);
		const useCase = new GetPublishedPost(repo, upperRenderer);
		await expect(useCase.execute('secret')).rejects.toBeInstanceOf(PostNotFoundError);
		await expect(useCase.execute('nope')).rejects.toBeInstanceOf(PostNotFoundError);
	});
});

describe('BuildFeed', () => {
	it('limits entries', async () => {
		const repo = new InMemoryPostRepository([
			makePost({ slug: 'a' }),
			makePost({ slug: 'b' }),
			makePost({ slug: 'c' })
		]);
		const feed = await new BuildFeed(repo, upperRenderer, 2).execute();
		expect(feed.entries).toHaveLength(2);
	});
});
