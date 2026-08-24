import { describe, expect, it } from 'vitest';
import { FrontmatterParser } from '../FrontmatterParser';

describe('FrontmatterParser', () => {
	const parser = new FrontmatterParser();

	it('parses scalars, quoted strings and lists', () => {
		const { data, body } = parser.parse(`---
title: "Hello: world"
date: 2026-08-24
tags: [a, "b", 'c']
draft: true
---
# Body`);
		expect(data).toEqual({ title: 'Hello: world', date: '2026-08-24', tags: ['a', 'b', 'c'], draft: 'true' });
		expect(body).toBe('# Body');
	});

	it('returns the whole input as body when there is no frontmatter', () => {
		expect(parser.parse('plain')).toEqual({ data: {}, body: 'plain' });
	});
});
