export const en = {
	locale: 'en-GB',
	nav: { map: 'Map', journal: 'Journal', library: 'Library', about: 'Traveller', vip: 'VIP', rss: 'RSS' },
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
	vip: {
		eyebrow: 'Inner circle',
		title: 'Join the expedition as a VIP',
		lede: 'Get the app before anyone else, sit in on the live build sessions, and shape what gets built. One subscription funds the journey and buys you a seat at the table.',
		emailLabel: 'Email (for your invites)',
		cta: 'Become a VIP →',
		loading: 'Loading checkout…',
		unavailable: 'Checkout opens soon',
		secure: 'Payments and invoices handled by Paddle, our merchant of record. VAT included where applicable.',
		cycle: { monthly: 'Monthly', yearly: 'Yearly' },
		per: { monthly: 'mo', yearly: 'yr' },
		yearlySave: '2 months free',
		popular: 'Most popular',
		trial: (days: number) => `${days}-day free trial`,
		localPricing: 'Local pricing in GBP, EUR and AUD applied at checkout.',
		tiers: {
			starter: { icon: '🥾', name: 'Starter', tagline: 'A seat at the campfire.', perks: ['Early access to the app on your store', 'Weekly live build sessions + recordings', 'Private channel with the builder and other VIPs', 'Founding-member price locked forever'] },
			pro: { icon: '🧭', name: 'Pro', tagline: 'A vote on where we go next.', perks: ['Everything in Starter', 'Vote on the roadmap and interview targets', 'Unfiltered numbers: MRR, churn, installs, interview notes', 'One 30-min 1:1 call per month'] },
			advanced: { icon: '🐉', name: 'Advanced', tagline: 'Bring your own store; we build around it.', perks: ['Everything in Pro', 'A recorded teardown of your Shopify store', 'Priority feature requests — your problem gets built first', 'Name in the app credits'] }
		},
		faqTitle: 'Questions',
		faq: [
			{ q: 'What happens after the trial?', a: 'Nothing surprising: the plan you picked starts billing on day 8. Cancel before that and you pay nothing.' },
			{ q: 'When do the live sessions happen?', a: 'Weekly, announced in the private channel a few days ahead; recordings are shared for anyone who misses one.' },
			{ q: 'Do I need a Shopify store?', a: 'No. Early access is most useful if you have one, but the sessions, votes and numbers are for anyone building or curious.' },
			{ q: 'How do I cancel?', a: 'From the link in any Paddle receipt email, in one click. Access stays until the end of the paid period.' },
			{ q: 'Is this a course?', a: 'No. It is a seat next to someone doing the thing, in real time, with real numbers.' }
		],
		successTitle: "You're in. Welcome, VIP.",
		successText: 'Your receipt is on its way from Paddle. Within a day you will get the private-channel invite and the next live-session date at the email you used at checkout.'
	},
	levels: ['Novice Wanderer', 'Explorer', 'Scout', 'Cartographer', 'Captain', 'Legend'],
	xpToast: (xp: number) => `+${xp} XP`
};
export type Messages = typeof en;
