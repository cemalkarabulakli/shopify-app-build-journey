import type { Messages } from './en';

export const tr: Messages = {
	locale: 'tr-TR',
	nav: { map: 'Harita', journal: 'Günlük', library: 'Kütüphane', about: 'Gezgin', vip: 'VIP', rss: 'RSS' },
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
	vip: {
		eyebrow: 'İç halka',
		title: 'Sefere VIP olarak katıl',
		lede: 'App’i herkesten önce al, canlı geliştirme oturumlarına katıl ve neyin inşa edileceğine yön ver. Tek abonelik yolculuğu finanse eder, sana masada bir sandalye verir.',
		emailLabel: 'E-posta (davetlerin için)',
		cta: 'VIP ol →',
		loading: 'Ödeme yükleniyor…',
		unavailable: 'Ödeme yakında açılıyor',
		secure: 'Ödeme ve faturalar merchant of record olan Paddle tarafından işlenir. KDV dahildir.',
		cycle: { monthly: 'Aylık', yearly: 'Yıllık' },
		per: { monthly: 'ay', yearly: 'yıl' },
		yearlySave: '2 ay bedava',
		popular: 'En popüler',
		trial: (days) => `${days} gün ücretsiz deneme`,
		localPricing: 'GBP, EUR ve AUD için yerel fiyat ödemede uygulanır.',
		tiers: {
			starter: { icon: '🥾', name: 'Starter', tagline: 'Kamp ateşinde bir yer.', perks: ['App’e mağazanda erken erişim', 'Haftalık canlı geliştirme oturumları + kayıtlar', 'Kurucu ve diğer VIP’lerle özel kanal', 'Kurucu üye fiyatı ömür boyu sabit'] },
			pro: { icon: '🧭', name: 'Pro', tagline: 'Nereye gideceğimizde oy hakkı.', perks: ['Starter’daki her şey', 'Yol haritası ve görüşme hedeflerinde oy', 'Filtresiz sayılar: MRR, churn, kurulum, görüşme notları', 'Ayda bir 30 dk birebir görüşme'] },
			advanced: { icon: '🐉', name: 'Advanced', tagline: 'Mağazanı getir; etrafında inşa edelim.', perks: ['Pro’daki her şey', 'Shopify mağazanın kayıtlı teardown’u', 'Öncelikli özellik talebi — önce senin problemin', 'App jeneriğinde adın'] }
		},
		faqTitle: 'Sorular',
		faq: [
			{ q: 'Denemeden sonra ne olur?', a: 'Sürpriz yok: seçtiğin plan 8. günde faturalanmaya başlar. Öncesinde iptal edersen hiçbir şey ödemezsin.' },
			{ q: 'Canlı oturumlar ne zaman?', a: 'Haftalık; özel kanalda birkaç gün önceden duyurulur, kaçıranlar için kayıt paylaşılır.' },
			{ q: 'Shopify mağazam olmalı mı?', a: 'Hayır. Erken erişim mağazan varsa daha işe yarar ama oturumlar, oylar ve sayılar inşa eden ya da merak eden herkes için.' },
			{ q: 'Nasıl iptal ederim?', a: 'Herhangi bir Paddle makbuz e-postasındaki bağlantıdan tek tıkla. Erişim ödenen dönemin sonuna kadar sürer.' },
			{ q: 'Bu bir kurs mu?', a: 'Hayır. Gerçek zamanlı, gerçek sayılarla işi yapan birinin yanında bir sandalye.' }
		],
		successTitle: 'İçerdesin. Hoş geldin, VIP.',
		successText: 'Makbuzun Paddle’dan yolda. Bir gün içinde özel kanal daveti ve bir sonraki canlı oturum tarihi ödemede kullandığın e-postaya gelecek.'
	},
	levels: ['Acemi Gezgin', 'Kaşif', 'İzci', 'Haritacı', 'Kaptan', 'Efsane'],
	xpToast: (xp) => `+${xp} XP`
};
