import { Marked } from 'marked';
import type { MarkdownRenderer } from '$lib/application';

/** Adapter over `marked`. The rest of the app only sees MarkdownRenderer. */
export class MarkedMarkdownRenderer implements MarkdownRenderer {
	private readonly marked = new Marked({ gfm: true, breaks: false });

	render(markdown: string): string {
		return this.marked.parse(markdown, { async: false }) as string;
	}
}
