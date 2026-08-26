export const en = {
	locale: 'en-GB',
	nav: { map: 'Map', journal: 'Journal', library: 'Library', about: 'Traveller', rss: 'RSS' },
	footer: 'Built in the open. The map is updated as I go.',
	home: {
		eyebrow: 'Quest map · from zero to the App Store',
		card: 'Adventure card',
		level: 'Level',
		phases: 'phases',
		scrolls: 'scrolls',
		toNext: 'XP →',
		maxed: "You've reached the summit 🐉",
		badges: 'Badge bag',
		badgeOf: 'badge',
		phase: 'Phase',
		doneWhen: 'Done when:',
		read: 'Read',
		status: { done: 'Conquered', next: 'You are here', todo: 'In the fog' },
		badgeEarned: (title: string) => `🏅 ${title} badge!`
	},
	journal: { eyebrow: "Captain's log", title: 'Journal', empty: 'No entries yet.', back: '← Back to the log' },
	library: {
		eyebrow: 'Scroll library',
		title: 'Library',
		lede: 'Each scroll belongs to a step; follow where you are on the',
		ledeLink: 'Map',
		read: 'read',
		back: '← Library',
		markRead: (xp: number) => `Mark as read → +${xp} XP`,
		marked: '✓ Scroll read',
		readLabel: 'Read',
		trNotice: 'This scroll is currently in Turkish; an English version is coming.'
	},
	about: { eyebrow: 'Traveller', title: (name: string) => `I'm ${name}`, p1: "A solo founder building a Shopify app and logging everything here — the wins, the wrong turns, and the numbers.", p2: "If you're a Shopify merchant who wants to try the app early, or another traveller comparing notes, say hi." },
	error: { lost: 'You walked off the map.', back: 'Back to the map' },
	levels: ['Novice Wanderer', 'Explorer', 'Scout', 'Cartographer', 'Captain', 'Legend'],
	xpToast: (xp: number) => `+${xp} XP`
};
export type Messages = typeof en;
