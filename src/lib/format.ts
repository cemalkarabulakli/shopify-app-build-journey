/** Shared presentation helpers (safe on client and server). */
export const formatDate = (iso: string, locale = 'en-GB') =>
	new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
