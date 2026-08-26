import type { Messages } from './en';

export const tr: Messages = {
	locale: 'tr-TR',
	nav: { map: 'Harita', journal: 'Günlük', library: 'Kütüphane', about: 'Gezgin', rss: 'RSS' },
	footer: 'Açık havada inşa ediliyor. Harita her gün güncellenir.',
	home: {
		eyebrow: "Görev haritası · sıfırdan App Store'a",
		card: 'Macera kartı',
		level: 'Seviye',
		phases: 'faz',
		scrolls: 'parşömen',
		toNext: 'XP →',
		maxed: 'Zirveye ulaştın 🐉',
		badges: 'Rozet çantası',
		badgeOf: 'rozeti',
		phase: 'Faz',
		doneWhen: 'Bitti sayılır:',
		read: 'Oku',
		status: { done: 'Fethedildi', next: 'Buradasın', todo: 'Sisli' },
		badgeEarned: (title) => `🏅 ${title} rozeti!`
	},
	journal: { eyebrow: 'Seyir defteri', title: 'Günlük', empty: 'Henüz kayıt yok.', back: '← Seyir defteri' },
	library: {
		eyebrow: 'Parşömen kütüphanesi',
		title: 'Kütüphane',
		lede: 'Her parşömen bir adımda okunur; nerede olduğunu şuradan takip et:',
		ledeLink: 'Harita',
		read: 'okundu',
		back: '← Kütüphane',
		markRead: (xp) => `Okudum → +${xp} XP`,
		marked: '✓ Parşömen okundu',
		readLabel: 'Okundu',
		trNotice: ''
	},
	about: { eyebrow: 'Gezgin', title: (name) => `Ben ${name}`, p1: 'Tek kişilik bir kurucuyum; bir Shopify app’i inşa ediyorum ve her şeyi burada — kazanımları, yanlış dönüşleri ve sayıları — kaydediyorum.', p2: 'App’i erkenden denemek isteyen bir Shopify merchant’ıysan ya da notları karşılaştırmak isteyen bir başka gezginsen, selam ver.' },
	error: { lost: 'Haritanın dışına çıktın.', back: 'Haritaya dön' },
	levels: ['Acemi Gezgin', 'Kaşif', 'İzci', 'Haritacı', 'Kaptan', 'Efsane'],
	xpToast: (xp) => `+${xp} XP`
};
