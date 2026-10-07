/** Text every reader sees, in both site languages (R9). */
export interface LocalizedText {
	en: string;
	tr: string;
}

export interface MerchantProps {
	id: string;
	name: string;
	sells: LocalizedText;
	/** One notable fact with a figure, exactly as the source states it. */
	fact: LocalizedText;
	/** Public page that states the figure. No source, no merchant. */
	sourceUrl: string;
	storeUrl: string;
	/** The merchant's own public contact page, when there is one. */
	contactPage: string | null;
	/** Only an address the merchant publishes for business or press — never guessed (BR-13). */
	email: string | null;
	/** The page on the merchant's site where `email` is published; required with an email. */
	emailSourceUrl: string | null;
	/** Scrolls that tell this merchant's story. */
	storySlugs: string[];
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

function https(url: string, what: string, id: string): string {
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		throw new Error(`Merchant "${id}": ${what} must be an https URL`);
	}
	if (parsed.protocol !== 'https:') throw new Error(`Merchant "${id}": ${what} must be an https URL`);
	return url;
}

function localized(text: LocalizedText, what: string, id: string): LocalizedText {
	for (const lang of ['en', 'tr'] as const) {
		if (!text?.[lang]?.trim()) throw new Error(`Merchant "${id}": ${what} needs ${lang} text`);
	}
	return { en: text.en.trim(), tr: text.tr.trim() };
}

/**
 * A successful merchant on the Merchants page. Valid from construction: a card can never show a
 * figure without its source, or a reach-out action that leads nowhere.
 */
export class Merchant {
	private constructor(private readonly p: MerchantProps) {}

	static create(p: MerchantProps): Merchant {
		if (!SLUG.test(p.id)) throw new Error(`Invalid merchant id "${p.id}" — lowercase letters, digits and dashes.`);
		if (!p.name.trim()) throw new Error(`Merchant "${p.id}" has no name`);
		if (!p.sourceUrl) throw new Error(`Merchant "${p.id}" has no source link for its figure`);
		https(p.sourceUrl, 'source link', p.id);
		https(p.storeUrl, 'store link', p.id);
		if (p.contactPage) https(p.contactPage, 'contact page', p.id);
		if (!p.contactPage && !p.email) throw new Error(`Merchant "${p.id}" needs a contact page or a published email`);
		let email: string | null = null;
		if (p.email) {
			email = p.email.trim().toLowerCase();
			if (!EMAIL.test(email)) throw new Error(`Merchant "${p.id}" has a malformed email`);
			if (!p.emailSourceUrl) throw new Error(`Merchant "${p.id}": an email needs the page where it is published`);
			https(p.emailSourceUrl, 'email source page', p.id);
		}
		for (const slug of p.storySlugs) {
			if (!SLUG.test(slug)) throw new Error(`Merchant "${p.id}" has an invalid story slug "${slug}"`);
		}
		return new Merchant({
			...p,
			name: p.name.trim(),
			sells: localized(p.sells, 'sells', p.id),
			fact: localized(p.fact, 'fact', p.id),
			email,
			emailSourceUrl: email ? p.emailSourceUrl : null,
			storySlugs: [...p.storySlugs]
		});
	}

	get id() { return this.p.id; }
	get name() { return this.p.name; }
	get sells() { return this.p.sells; }
	get fact() { return this.p.fact; }
	get sourceUrl() { return this.p.sourceUrl; }
	get storeUrl() { return this.p.storeUrl; }
	get contactPage() { return this.p.contactPage; }
	get email() { return this.p.email; }
	get storySlugs() { return this.p.storySlugs; }

	canEmail(): boolean {
		return this.p.email !== null;
	}

	toJSON(): MerchantProps {
		return { ...this.p, storySlugs: [...this.p.storySlugs] };
	}
}

/** The curated list. Order is editorial and kept as written; ids are unique. */
export const MerchantCatalog = {
	create(list: MerchantProps[]): Merchant[] {
		const merchants = list.map((p) => Merchant.create(p));
		const seen = new Set<string>();
		for (const m of merchants) {
			if (seen.has(m.id)) throw new Error(`Merchant catalog has a duplicate id "${m.id}"`);
			seen.add(m.id);
		}
		return merchants;
	}
};
