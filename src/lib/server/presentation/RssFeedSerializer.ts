import type { FeedData } from '$lib/application';
import type { SiteConfig } from '../config/siteConfig';

const escapeXml = (s: string) =>
	s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!);

/** Turns format-agnostic FeedData into RSS 2.0. An AtomFeedSerializer could sit beside it. */
export class RssFeedSerializer {
	constructor(private readonly site: SiteConfig) {}

	serialize(feed: FeedData): string {
		const items = feed.entries
			.map((e) => {
				const link = `${this.site.url}/posts/${e.slug}`;
				return `<item>
<title>${escapeXml(e.title)}</title>
<link>${link}</link>
<guid isPermaLink="true">${link}</guid>
<pubDate>${new Date(e.publishedAt).toUTCString()}</pubDate>
<description>${escapeXml(e.summary || e.title)}</description>
<content:encoded><![CDATA[${e.html}]]></content:encoded>
</item>`;
			})
			.join('\n');

		return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(this.site.name)}</title>
<link>${this.site.url}</link>
<atom:link href="${this.site.url}/feed.xml" rel="self" type="application/rss+xml"/>
<description>${escapeXml(this.site.description)}</description>
<language>en</language>
${items}
</channel>
</rss>`;
	}
}
