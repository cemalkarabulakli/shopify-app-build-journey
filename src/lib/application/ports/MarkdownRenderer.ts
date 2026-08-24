/** Port: turns markdown into HTML. Implemented in infrastructure. */
export interface MarkdownRenderer {
	render(markdown: string): string;
}
