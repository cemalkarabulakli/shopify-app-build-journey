/** Shared presentation helpers (safe on client and server). */
export const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
