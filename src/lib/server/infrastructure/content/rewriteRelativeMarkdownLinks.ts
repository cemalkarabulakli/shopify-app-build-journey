/**
 * Turns `[text](OTHER-FILE.md#anchor)` into `[text](/docs/other-file#anchor)` so links written
 * for GitHub keep working on the site. Absolute URLs and non-.md targets are untouched.
 */
export function rewriteRelativeMarkdownLinks(markdown: string, base: string): string {
	return markdown.replace(
		/\]\((?!(?:[a-z]+:)?\/\/|\/|#)([^)\s]+?)\.md(#[^)\s]*)?\)/gi,
		(_m, file: string, anchor = '') => `](${base}/${file.split('/').pop()!.toLowerCase()}${anchor})`
	);
}
