import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

export interface SiteConfig {
	name: string;
	url: string;
	author: string;
	description: string;
	contentDir: string;
	pathDir: string;
	docsDir: string;
	cacheTtlMs: number;
	paddle: {
		/** undefined when PUBLIC_PADDLE_ENV is unset — callers must fail loudly, never assume. */
		environment: 'sandbox' | 'production' | undefined;
		clientToken: string;
		apiKey: string;
		webhookSecret: string;
	};
	databaseUrl: string;
	sessionSecret: string;
	email: { resendApiKey: string; from: string };
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
		pathDir: env.PATH_DIR || 'content',
		docsDir: env.DOCS_DIR || 'docs',
		cacheTtlMs: Number(env.CACHE_TTL_MS ?? (env.NODE_ENV === 'production' ? 60_000 : 0)),
		paddle: {
			environment: parsePaddleEnv(publicEnv.PUBLIC_PADDLE_ENV),
			clientToken: publicEnv.PUBLIC_PADDLE_CLIENT_TOKEN || '',
			apiKey: env.PADDLE_API_KEY || '',
			webhookSecret: env.PADDLE_WEBHOOK_SECRET || ''
		},
		databaseUrl: env.DATABASE_URL || '',
		sessionSecret: env.SESSION_SECRET || '',
		email: { resendApiKey: env.RESEND_API_KEY || '', from: env.EMAIL_FROM || `${env.SITE_NAME || 'Shopify App Build Journey'} <noreply@example.com>` }
	};
}

function parsePaddleEnv(v: string | undefined): 'sandbox' | 'production' | undefined {
	if (v === 'sandbox' || v === 'production') return v;
	if (v) console.error(`[paddle] PUBLIC_PADDLE_ENV must be "sandbox" or "production", got "${v}"`);
	return undefined;
}

/** Use wherever Paddle is touched: refuses to run against an unknown account. */
export function requirePaddle(site: SiteConfig): { environment: 'sandbox' | 'production'; clientToken: string } {
	if (!site.paddle.environment) {
		throw new Error('PUBLIC_PADDLE_ENV is not set. Set it to "sandbox" or "production" — refusing to guess which Paddle account to use.');
	}
	if (site.paddle.environment === 'sandbox' && site.paddle.clientToken && !site.paddle.clientToken.startsWith('test_')) {
		throw new Error('PUBLIC_PADDLE_ENV is "sandbox" but PUBLIC_PADDLE_CLIENT_TOKEN is not a sandbox token (must start with "test_").');
	}
	if (site.paddle.environment === 'production' && site.paddle.clientToken.startsWith('test_')) {
		throw new Error('PUBLIC_PADDLE_ENV is "production" but PUBLIC_PADDLE_CLIENT_TOKEN is a sandbox token.');
	}
	return { environment: site.paddle.environment, clientToken: site.paddle.clientToken };
}
