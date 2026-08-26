import { readdir, readFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { Post, type PostRepository } from '$lib/domain/post';
import { FrontmatterParser } from './FrontmatterParser';

/**
 * Adapter: reads `*.md` files from a directory and maps them to Post entities.
 * Knows about files and frontmatter; knows nothing about HTTP or rendering.
 */
export class FileSystemPostRepository implements PostRepository {
	constructor(
		private readonly directory: string,
		private readonly frontmatter: FrontmatterParser = new FrontmatterParser()
	) {}

	async findAll(): Promise<Post[]> {
		const files = (await readdir(this.directory)).filter((f) => extname(f) === '.md');
		return Promise.all(files.map((f) => this.load(f)));
	}

	async findBySlug(slug: string): Promise<Post | null> {
		const all = await this.findAll();
		return all.find((p) => p.slug === slug) ?? null;
	}

	private async load(file: string): Promise<Post> {
		const raw = await readFile(join(this.directory, file), 'utf8');
		const parsed = this.frontmatter.parse(raw);
		// Docs use UPPER-CASE filenames and no frontmatter; normalise so one
		// repository serves posts, pages and docs alike.
		const slug = basename(file, '.md').toLowerCase();
		const { title, body } = titleFromHeading(str(parsed.data.title), parsed.body, slug);
		const data = parsed.data;
		const tags = data.tags;
		return Post.create({
			slug,
			title,
			publishedAt: new Date(str(data.date) || 0),
			summary: str(data.summary),
			tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
			draft: str(data.draft) === 'true',
			body
		});
	}
}

function str(v: string | string[] | undefined): string {
	return Array.isArray(v) ? v.join(', ') : (v ?? '');
}

/** Without a frontmatter title, promote the first `# Heading` to the title and drop it from the body. */
function titleFromHeading(title: string, body: string, slug: string): { title: string; body: string } {
	if (title) return { title, body };
	const match = body.match(/^\s*# (.+?)\s*$/m);
	if (!match) return { title: slug, body };
	return { title: match[1].trim(), body: body.replace(match[0], '').trimStart() };
}
