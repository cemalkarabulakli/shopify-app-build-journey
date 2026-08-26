import { env } from '$env/dynamic/private';

export interface SiteConfig {
	name: string;
	url: string;
	author: string;
	description: string;
	contentDir: string;
	pathFile: string;
	docsDir: string;
	cacheTtlMs: number;
}

/** Single place that knows about environment variables. */
export function loadSiteConfig(): SiteConfig {
	const port = env.PORT || '3000';
	return {
		name: env.SITE_NAME || 'Shopify App Build Journey',
		url: (env.SITE_URL || `http://localhost:${port}`).replace(/\/$/, ''),
		author: env.AUTHOR || 'Cemal',
		description:
			env.SITE_DESCRIPTION ||
			'Building a Shopify app in public: what shipped, what broke, what merchants said, and the numbers.',
		contentDir: env.CONTENT_DIR || 'content/posts',
		pathFile: env.PATH_FILE || 'content/path.json',
		docsDir: env.DOCS_DIR || 'docs',
		cacheTtlMs: Number(env.CACHE_TTL_MS ?? (env.NODE_ENV === 'production' ? 60_000 : 0))
	};
}
