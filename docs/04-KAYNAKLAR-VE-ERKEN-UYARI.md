# Ekosistem Nereden Besleniyor — Kaynaklar, Beta'lar ve Erken Uyarı Sistemi

> Shopify'da app geliştirmenin en sinsi riski: **kodun bir gün, senin hatan olmadan çalışmaz olması.**
> Bu dosya iki soruyu cevaplıyor: (1) yeni ve beta özellikleri nereden, ne zaman öğreniyorum?
> (2) Shopify'ın benim kategorimi yutacağını **önceden** nasıl anlarım?
>
> Doğrulama: **Ağustos 2026**. Kaynaklar linkli.

## 0. Tek paragraflık cevap

Shopify'ın **iki ritmi** var. Pazarlama tarafı **yılda iki kez** *Editions* ile patlıyor. Ama
geliştiricinin gerçek sinyali **sürekli akan** üç kanalda: `shopify.dev/changelog` RSS'i,
**çeyreklik API sürüm döngüsü** ve **`unstable` API sürümü** — burada özellikler duyurulmadan
*aylar önce* şemaya düşüyor. Beta'lar artık büyük ölçüde **self-servis**: dev store açarken bir
"feature preview" seçiyorsun ya da app'ini `unstable`/release-candidate sürümüne çeviriyorsun.
Kapıda bekçi yok.

⚠️ **2025–2026'nın kritik değişimi:** Shopify **Partner Slack'i kapattı** (Aralık 2025) ve
partnerships ekibinin büyük kısmını işten çıkardı. Yani **insan üzerinden arka kanal kalmadı**.
Aşağıdaki public kanallar artık "ek kaynak" değil, **kanalın tamamı**.

---

## 1. Resmî kanallar

| Kanal | URL | Sıklık | Sinyal |
|---|---|---|---|
| **Geliştirici changelog** ⭐ | `shopify.dev/changelog` · RSS: `/changelog/feed.xml` | Haftada birkaç | **Yüksek** |
| **Merchant changelog** ⭐ | `changelog.shopify.com` · RSS: `/feed.xml` | Neredeyse günlük | **Yüksek** |
| `unstable` GraphQL şeması ⭐ | `shopify.dev/docs/api/usage/versioning` | Sürekli | **Yüksek** |
| Editions (yılda ~2) | `shopify.com/editions` | ~2/yıl | **Yüksek** |
| Geliştirici forumları | `community.shopify.dev` + `/c/announcements` | Günlük | **Yüksek** |
| Shopify public GitHub | `github.com/orgs/Shopify/repositories` | Günlük commit | **Yüksek** |
| Mühendislik blogu | `shopify.engineering` · RSS `/blog.atom` | Ayda 1–4 | **Yüksek** |
| Yatırımcı sunumları | `shopify.com/investors` | Çeyreklik | **Yüksek** |
| Partners blog | `shopify.com/partners/blog` · `.atom` | Ayda 1–3 | Orta |
| Partner aylık e-postası | Dashboard ayarlarından | Aylık | Orta (geç kalır) |
| **DotDev** konferansı | `dotdev.shopify.com` | Yıllık | Yüksek (kayıtlar YouTube'da **ücretsiz**) |

**Changelog filtreleri** — asıl numara burada:
```
shopify.dev/changelog?filter=feature_preview
shopify.dev/changelog?filter=developer_preview
shopify.dev/changelog?filter=early_access
```

**Merchant changelog neden ayrı önemli:** "Shopify artık X'i yerleşik destekliyor" cümlesi
**önce burada** çıkıyor, geliştirici changelog'unda değil. Platform riskinin radarı bu.

**Konferans tarihçesi:** Unite (≤2022) → Editions.dev (2025) → **DotDev** (2026).
`editions.dev` artık `dotdev.shopify.com`'a yönleniyor. DotDev 2026: Toronto, 21–22 Temmuz 2026,
499 $, tükendi. **Kayıtlar YouTube'da ücretsiz** — asıl erişim yolu bu.

## 2. Beta'lar nasıl çalışıyor?

Shopify üç etiket kullanıyor (ve tutarlı kullanmıyor):

| Etiket | Ne demek | Nasıl girilir |
|---|---|---|
| **Feature preview** | Merchant'a dönük özellik + API'leri | Yeni dev store aç → "Test a feature preview" |
| **Developer preview** | Geliştirici aracı/API, genelde `unstable`'da | Doğrudan kullan |
| **Early access** | Release candidate sürümdeki API | App'i RC sürüm string'ine çevir |

**Feature preview kuralları:** dev store başına **tek preview**. O store Advanced plan
özelliklerini alır ama **devredilemez ve ücretli plana çevrilemez**. Yani her preview için
ayrı dev store gerekiyor.

**Şu an açık olan beta'lardan bazıları (Ağu 2026):**

| Özellik | Tip | Not |
|---|---|---|
| Hydrogen'in yeni sürümü (React Router'dan çıktı, framework-agnostik) | Developer preview | GitHub'da açık |
| Physical inventory (bin, sayım, satın alma siparişi) | Feature preview | ⚠️ Envanter app'leri için uyarı ateşi |
| Market-driven shipping | Feature preview | Eski delivery profile API'leri deprecate |
| Next Generation Events (alan bazlı webhook filtresi) | Developer preview | `unstable`'da |
| Customer account yenilemesi | Feature preview | Extension'ların dar alanda render olacak — **şimdi test et** |
| SubscriptionContractCalculation API | Early access | 2026-10 RC'de; 12+ mutation → 1 |
| WebMCP (tarayıcıdaki AI ajanları katalog arayıp sepet yönetebiliyor) | **Canlı** | Kurulum gerekmiyor, her Liquid vitrininde aktif |

## 3. Solo geliştirici için erken görüş playbook'u

Sinyal/emek oranına göre sıralı:

1. **İki RSS'i okuyucuna ekle** — `shopify.dev/changelog/feed.xml` + `changelog.shopify.com/feed.xml`.
   Maliyet sıfır, değerin %70'i burada.
2. **`unstable` GraphQL şemasını ayda bir diff'le.** Introspection çalıştır, kaydet, geçen ayla
   karşılaştır. Yeni tip ve mutation'lar **duyurudan önce** burada belirir. Var olan en erken
   sinyal bu ve kimse yarışmıyor.
3. **Bir test app'ini release candidate sürümüne bağla** — her çeyreğin 1'inde bir sonraki
   çeyreğin stable API'sini görürsün. **Bedava 3 aylık öngörü.**
4. **Shopify'ın GitHub org'unu izle** — cli, hydrogen, ui-extensions, shopify-app-js, polaris.
   Kod, changelog'dan haftalar önce iniyor.
5. **2–3 dev store tut**, her birinde farklı bir feature preview açık.
6. **`community.shopify.dev/c/announcements`'i haftalık oku** — changelog'a hiç düşmeyen şeyler
   (Partner Program değişiklikleri, kimlik doğrulama zorunluluğu, town hall'lar) buraya düşüyor.
7. **DotDev kayıtlarını izle** — önümüzdeki 6–12 ayı telgraflıyor.
8. **Mühendislik blogunu oku** — altyapı yazısı, ürünün ~2 çeyrek önünde gidiyor.
   *(Kanıt: "Building the Universal Commerce Protocol" Oca 2026 → UCP GA Haz 2026.)*

## 4. Resmî olmayan ama yüksek sinyalli kaynaklar

| Kaynak | Ne | Neden |
|---|---|---|
| **The Unofficial Shopify Podcast** (Kurt Elster) | 2014'ten beri, 500+ bölüm, haftalık | Shopify VP'lerini kayda alıyor; merchant/CRO açısı |
| **Liquid Weekly** (Karl Meisterheim & Taylor Page) | Bülten + podcast, 225. sayı | **Geliştirici tarafının yayını**; ilk Shopify Developer Survey'i yaptılar |
| **The Shopify App Show** (Martin Cox) | ~25 dk, indie app kurucularıyla | Solo app geliştiricileri için en yakın akran ağı |
| **Taylor Sicard blogu** | Partner Program ekonomisi | Shopify'a eleştirel bakabilen en net bağımsız yazı |
| **Common Thread Collective** — "Every Shopify Update in 2026" | Haftalık güncellenen takip listesi | Merchant-operatör çerçevesi |
| **Shopify Devs Discord** (~26.500 üye) | Resmî Discord | "Bende mi bozuk, herkeste mi" |

**Veri sağlayıcıları:**

| Sağlayıcı | Ne | Değerlendirme |
|---|---|---|
| **Store Leads** | 13,7 mn mağaza, kurulu app teknografiği, haftalık | **Sektör standardı.** 75–950 $/ay |
| **AppStorePulse** | App Store istihbaratı, **aylık ücretsiz raporlar** | Ücretsiz yayınlanan en iyi araştırma |
| **App Store Research** | **Doğrulanmış merchant'larla 1-1 görüşme ayarlıyor** | Nicel değil nitel — talep doğrulaması için scraped veriden iyi |
| StoreCensus / GapQuery / StoreInspect / AppJubilee | App & mağaza verisi | Kullanılır ama **çapraz kontrol şart** (bkz. §6) |

**⚠️ SEO çöplüğü işaretleri** (bu nişte bol): başlıkta yıl + "Complete Guide" + sayı;
hâlâ **Partner Slack'i öneriyor** (Aralık 2025'te kapandı — mükemmel bir bayatlık testi);
Shopify'ın kendi rakamıyla çelişen sayılar; yazarın ekosistemde geçmişi yok.

## 4b. Medya katmanı — merchant app'i nerede duyuyor?

App Store dışında, merchant'ların araç kararını şekillendiren bir yayın ekonomisi var.
Ulaşılabilir ve **doğrulanmış** kitleye göre sıralı:

| Yayın | Sahibi | Kitle | Fiyat |
|---|---|---|---|
| **DTC Newsletter** (directtoconsumer.co) | **Eric Dyck** | **100 bin+ abone**; %80+ kurucu/üst yönetici; **%55'i 1 mn $+ ciro** yapan markalarda; NPS 86 | Yayınlanmıyor (satışla görüşme). Mevcut reklamverenler: **Meta, Klaviyo, Tapcart** |
| **Operators** (9operators.com) | Sean Frank (Ridge), Mike Beckham, Matt Bertulli, Jason Panzer | 28,8 bin bülten · 175 bin podcast abonesi · 5,13 mn indirme | Yayınlanmıyor. **Sponsor listesi = tavsiye listesi** (aşağıya bak) |
| **2PM** (2pml.com) | Web Smith | 28–30 bin üst düzey karar verici; açılma oranı %42,1 | **10.500 $ / 3 gönderi** — bu ekosistemdeki tek açık fiyat. ~120 $ CPM, genel pazarlama bültenlerinin ~3 katı |
| **Chew on This** | Ron Shah & Ash Melwani (Obvi) | 30 bin+ abone · yılda **40+ etkinlik** · sitede ayrı **"FOR SAAS"** sekmesi | Yayınlanmıyor. *"Etkinlikler kurucular için hep ücretsiz, tech partner'lar sponsor oluyor"* |
| **eCommerce Tech / 1800DTC** | bağımsız dizinler | 9 bin okur / 2.485 marka, 18.017 araç indeksli | Küçük ama **kitle zaten araç seçmek için orada** — gösterim başına en yüksek niyet |
| Marketing Brew / Retail Brew | Morning Brew | 345 bin / 180 bin sektör profesyoneli | Yayınlanmıyor |
| **LinkedIn grupları** | — | En büyüğü **~4.400 üye** | ⚠️ **Atla.** r/shopify 370 bin, Shopify forumu 900 bin. Bireysel LinkedIn akışlarında paylaş, grupta değil |

### ⚠️ Bu ekosistemde "tavsiye" ile "reklam" aynı nesne

Operators'ın sponsor sayfasından, kelimesi kelimesine:
> Northbeam: *"Grubun sırlarından biri: **operatörlerin çoğu Northbeam kullanıyor**."*
> Richpanel: *"**Bizim tercihimiz** Richpanel."* · Fulfil: *"**Sean ve Jason ikisi de kullanıyor**."*

Postscript, AfterSell ve Richpanel **Shopify app'i**. Bu sayfayı okuyan merchant, akran
tavsiyesinin nerede bitip medya alımının nerede başladığını **göremez, çünkü arada çizgi yok.**

**Sonuç:** "En iyi operatörler hangi app'i öneriyor" analizi aslında **"hangi app o slotu satın
aldı"** analizidir. Ayrıca Shopify app affiliate programları **tekrarlayan** komisyon ödüyor
(tek seferlik değil) — "En iyi Shopify app'leri 2026" listelerinin ekonomisi budur; o listelerin
birçoğunu zaten **app/tema satıcılarının kendisi** yayınlıyor (PageFly, BSS Commerce, Ablestar…).

**Takipçi sayısı burada iki kez yanıltıcı:** DTC Newsletter'ı yöneten Eric Dyck 100.000 alıcıya
ulaşıyor ve **X'te 144 takipçisi var** (LinkedIn-yerlisi). En yüksek takipçili hesaplar
(Nik Sharma 187,5 bin, Chase Dimond 168,7 bin) ise merchant P&L'ine en uzak, medya fiyat listesine
en yakın olanlar.

## 5. Platform riski — kategori nasıl ölür?

Shopify App Store'da **kendi ~40 app'ini** yayınlıyor (`apps.shopify.com/partners/shopify`).
**Bu liste, yutulmuş kategorilerin haritasıdır** — çeyrekte bir bak.

Şu an Shopify'ın doğrudan içinde olduğu kategoriler: e-posta/SMS (Shopify Messaging), popup
(Forms), otomasyon (Flow), canlı destek (Inbox), çeviri, abonelik, bundle, site içi arama
(Search & Discovery), influencer (Collabs), checkout özelleştirme (Checkout Blocks), envanter
(Stocky), dinamik fiyatlama (Smart Pricing), AI SSS (Knowledge Base), tema A/B testi (SimGym)…

**🔍 Kritik gözlem:** Shopify'ın kendi app'lerinin çoğu **vasat puanlı** — Bundles 2,8 ·
Search & Discovery 2,7 · Retail Barcode Labels 2,3 · Fraud Control 2,2. Yani Shopify'ın native
çözümleri genelde **merchant'ların alt %60'ına yetiyor, üstüne yetmiyor.** Hayatta kalan üçüncü
taraf app'ler tam o boşlukta yaşıyor.

### Kategori öldüren dört mekanizma

**1. Ücretsiz native app çıkarmak.** (Search & Discovery, Forms, Bundles, Flow'un ücretsizleşmesi)
→ Ücretsiz katman ve pazarın alt ucu bir gecede buharlaşır. "X'in basit hâli, 9 $" app'leri ölür.
Gerçek derinliği olanlar yukarı kaçarak yaşar.

**2. Bağlı olduğun uzantı noktasını kaldırmak.** ⚠️ **En ölümcülü.**
- `checkout.liquid` → Checkout Extensibility geçişi
- **Shopify Scripts:** yürütme **30 Haziran 2026**'da bitiyor → Functions'a taşı
- **Script tag'ler: 1 Mart 2027'de çalışmayı durduruyor** (duyuru 24 Ağu 2026)
- Legacy customer accounts deprecate (Şub 2026)
→ Rakibe kaybetmezsin; **Shopify'ın seçtiği bir tarihte çalışmayı bırakırsın.**

**3. Lideri satın alıp ücretsiz/native yapmak.** Codisto → Marketplace Connect;
Dovetale → Collabs. Kategori lideri bir anda "ücretsiz ve önceden kurulu" hâle gelir.

**4. Ürünü değil dağıtımı değiştirmek.** *2025–2026'nın yeni mekanizması.*
Built for Shopify'a öncelikli görünürlük (30 Eki 2025), Sidekick'in app önerilerinde BFS'e
öncelik vermesi → **App'in kusursuz çalışmaya devam eder ama kurulumlar sıfırlanır**, çünkü
merchant'ın baktığı yüzeylerden kaybolmuşsundur. Belgelenmiş vaka: API sürümlerinde geri kalan
bir app'in günlük kurulumları **kademeli değil, aniden** durdu.

### Karşı örnek
Shopify **kendi Product Reviews app'ini kapattı** ve merchant'ları üçüncü taraf yorum app'lerine
yönlendirdi. Yani Shopify bazen bir kategoriden **çıkıyor** da. Her şeyi yutması doğa kanunu değil.
*(⚠️ Tarih/detay teyide muhtaç.)*

### Erken uyarı sinyalleri — en öngörücüden başlayarak

**Tier 1 — hemen harekete geç:**
1. **Senin alanınla ilgili yeni obje/mutation `unstable` şemasında belirdi.** Shopify API'siz
   native özellik gönderemez; **şema önce hareket eder.**
2. **Kullandığın uzantı noktasına deprecation bildirimi geldi.** Pazarlık yok, tarihi belli.
3. **Senin app'inin işini tarif eden bir feature preview çıktı.** (Örn. "physical inventory
   preview" → envanter app'lerine doğrudan uyarı ateşi.)

**Tier 2 — planlamaya başla:**
4. Shopify senin kategorinde bir şirket satın aldı → tarihsel olarak 12–18 ayda native+ücretsiz.
5. Mühendislik blogunda altyapı yazısı → ~5 ay sonra ürün.
6. Merchant changelog'da "Shopify artık X'i yerleşik destekliyor" → bu noktada zaten geciktin.
7. Earnings call'da stratejik niyet beyanı → 2–4 çeyrek sonra ürün.

**Tier 3 — izle:**
8. **Senin kategorine özel Built for Shopify şart değişikliği.** (Örn. iade/abonelik app'leri için
   1 Ara 2026'da yürürlüğe girecek yeni şartlar.) Shopify bir kategoride çıtayı yükseltiyorsa,
   o kategoriyle **yakından ilgileniyor** demektir.
9. Editions'ta senin kategorinin adını taşıyan bir bölüm açıldı → stratejik öncelik.
10. **Kategorinde düşük puanlı bir first-party app çıktı** → sezgiye aykırı ama bu bir *mühlet*:
    Shopify bayrak dikti ama kalite boşluğunu açık bıraktı. Rekabet alanın orası.

### Şu an riskli görünen kategoriler *(bu bizim okumamız, Shopify'ın beyanı değil)*
E-posta/SMS pazarlama · envanter/stok yönetimi · kargo tarifesi yapılandırması · ürün feed'i
· site içi arama ve sohbet (WebMCP her vitrinde kurulumsuz canlı) · dinamik fiyatlama · abonelik.

**Daha savunulabilir görünenler:** ağır dış entegrasyon gerektirenler (ERP, 3PL, muhasebe),
tescilli veri ağı gerektirenler, Shopify'ın deneyip düşük puan aldığı yerler (arama derinliği,
bundle karmaşıklığı, fraud), ve **Plus/kurumsal** ihtiyaçları — "herkese yetecek kadar iyi"
native app'in taşıyamayacağı gereksinimler.

---

## 6. ⚠️ Kaynakların çeliştiği yerler

Bu araştırma sırasında aynı metriğin kaynaktan kaynağa **3,5 kata kadar** değiştiğini gördük:

- **Judge.me kurulumu:** Storeleads 619.657 · StoreCensus 402.384 · StoreInspect 179.295
- **Toplam app sayısı:** "16.000+" (Shopify'ın kendi ifadesi) · 17.891 aktif (AppJubilee) ·
  25.468 (AppNavigator) · **28.162 "yayınlanmış"** (Storeleads, kümülatif)
- **Mağaza başına app:** medyan **2** (StoreInspect) vs ortalama **6,1** (StoreCensus)

**Sebep metodolojik:** tüm tarayıcılar app'i **sadece vitrin imzasından** tespit ediyor.
Admin-only app'ler (Flow, ERP, 3PL, muhasebe, çoğu checkout app'i) **yapısal olarak görünmez**.
Storeleads bunu kendi de söylüyor. Yani **her penetrasyon rakamı bir taban değeridir**, gerçek oran değil.

**Kullanmaman gereken sayılar:**
- ❌ **"Ortalama merchant ayda 120 $ app'e harcıyor"** — çarpık dağılımın ortalaması; Storeleads'in
  kendi yüzdelikleriyle (>100 $ harcayan %1,8) uyuşmuyor.
- ❌ **"Shopify app geliştiricisi ortalama 93.000 $ kazanıyor"** — izi **ZipRecruiter'ın
  "Shopify Developer" maaş sayfasına** çıkıyor. App geliriyle ilgisi yok, **çalışan maaşı**.
- ❌ "Kurulumların %70'i aramadan" / "%60'ı" — ikisi de first-party değil, birbiriyle çelişiyor.
- ❌ "%48,8 opt-out trial dönüşümü" — Shopify değil, **genel mobil uygulama** istatistiği.

---

## 7. Sadece beş şey yapacaksan

1. İki RSS'i bugün ekle (`shopify.dev/changelog/feed.xml` + `changelog.shopify.com/feed.xml`).
2. **Aylık `unstable` şema diff** işi yaz. Var olan en erken yasal sinyal, kimse kullanmıyor.
3. Her çeyreğin 1'inde bir test app'ini **release candidate**'e bağla.
4. Çeyrekte bir **`apps.shopify.com/partners/shopify`**'a bak — Shopify'ın rekabet niyeti,
   canlı puanlarıyla birlikte, herkese açık.
5. **`community.shopify.dev/c/announcements`**'i haftalık oku. Partner Slack kapandı,
   partner manager'lar gitti; işini etkileyen şeyler artık **sadece** burada duyuruluyor.

---

*Kaynaklar: [shopify.dev changelog](https://shopify.dev/changelog) · [platform changelog](https://changelog.shopify.com/) · [API versioning](https://shopify.dev/docs/api/usage/versioning) · [feature previews](https://shopify.dev/docs/api/feature-previews) · [community.shopify.dev](https://community.shopify.dev/) · [Editions](https://www.shopify.com/editions) · [Spring '26 dev](https://www.shopify.com/news/spring-26-edition-dev) · [DotDev](https://dotdev.shopify.com/) · [Shopify Engineering](https://shopify.engineering/) · [Apps by Shopify](https://apps.shopify.com/partners/shopify) · [Built for Shopify](https://shopify.dev/docs/apps/launch/built-for-shopify) · [Store Leads](https://storeleads.app/) · [AppStorePulse](https://www.appstorepulse.com/reports) · [App Store Research](https://appstoreresearch.com/) · [Taylor Sicard](https://taylorsicard.com/blog/shopify-partner-program-2026) · [Liquid Weekly](https://liquidweekly.com/blogs/podcast) · [Kurt Elster](https://kurtelster.com/) · [The Logic — partnerships layoffs](https://thelogic.co/news/shopify-partnerships-division-layoffs-future/) · [TSD platform dependency vakası](https://blog.tsd.digital/platform-dependency-why-our-shopify-app-went-from-daily-installs-to-zero-overnight/)*
