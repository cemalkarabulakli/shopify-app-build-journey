export interface ParsedDocument {
	data: Record<string, string | string[]>;
	body: string;
}

/**
 * Minimal YAML-ish frontmatter parser: `key: value` lines and `[a, b]` lists.
 * Deliberately small — swap for a real YAML lib behind the same interface if needed.
 */
export class FrontmatterParser {
	private static readonly BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

	parse(raw: string): ParsedDocument {
		const match = raw.match(FrontmatterParser.BLOCK);
		if (!match) return { data: {}, body: raw };

		const data: ParsedDocument['data'] = {};
		for (const line of match[1].split(/\r?\n/)) {
			const idx = line.indexOf(':');
			if (idx === -1) continue;
			const key = line.slice(0, idx).trim();
			const value = line.slice(idx + 1).trim();
			data[key] = this.parseValue(value);
		}
		return { data, body: match[2] };
	}

	private parseValue(value: string): string | string[] {
		if (/^\[.*\]$/.test(value)) {
			return value
				.slice(1, -1)
				.split(',')
				.map((s) => this.unquote(s.trim()))
				.filter(Boolean);
		}
		return this.unquote(value);
	}

	private unquote(s: string): string {
		return s.replace(/^["'](.*)["']$/, '$1');
	}
}
