import { browser } from '$app/environment';

const KEY = 'docs:read';

/** Which docs this reader has marked as read — per browser, via localStorage. */
export function createReadingProgress() {
	let read = $state<string[]>(load());

	function load(): string[] {
		if (!browser) return [];
		try {
			return JSON.parse(localStorage.getItem(KEY) ?? '[]');
		} catch {
			return [];
		}
	}

	function save() {
		try {
			localStorage.setItem(KEY, JSON.stringify(read));
		} catch {
			/* private mode etc. — progress just won't persist */
		}
	}

	return {
		get read() {
			return read;
		},
		has: (slug: string) => read.includes(slug),
		toggle(slug: string) {
			read = read.includes(slug) ? read.filter((s) => s !== slug) : [...read, slug];
			save();
		}
	};
}
