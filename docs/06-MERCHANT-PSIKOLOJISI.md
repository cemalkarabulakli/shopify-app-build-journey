# Merchant Psikolojisi — Kim, Ne Zaman, Ne Kadar Öder?

> App satacağın insanı tanımadan fiyat da koyamazsın, özellik de seçemezsin.
> Bu dosya: merchant segmentleri, hangi seviyede neye para verdikleri, neden kurup neden
> sildikleri ve **gerçekte hangi araçları kullandıkları**.
>
> Doğrulama: **Ağustos 2026**. Etiketler: 🟢 birincil/ölçüm · 🟡 üçüncü taraf tarama ·
> 🟠 analist blogu · 🔴 satıcı pazarlaması (dikkat)

---

## 0. Her şeyden önce şu tek gerçek

Shopify merchant tabanı **bir işletmeler pazarı değil.** Üstünde ince bir gerçek şirket
tabakası olan, uzun bir yarı-ölü mağaza kuyruğu.

| Ölçüm | Bulgu |
|---|---|
| App'e **aylık 100 $+** harcayan mağaza | **%1,82** (65.441 / 3,59 mn) 🟡 |
| 500–999 $/ay | %0,18 (6.364) 🟡 |
| **1.000 $+/ay** | **%0,04** (1.602) 🟡 |
| Hiç tespit edilebilir app'i olmayan mağaza | %14–18 🟡 |
| **0–2 app** çalıştıran mağaza | **%76,4** 🟡 |
| Medyan app sayısı | **2** (P90 = 6, P99 = 14) 🟡 |

> ### 🚨 **App'e para veren pazar ≈ 65.000 mağaza. 3 milyon değil.**
> Herhangi bir app iş planını bu cümle yeniden çerçeveler.

❌ **"Ortalama merchant ayda 120 $ harcıyor, 6 app kullanıyor"** — bu, aşırı çarpık bir dağılımın
**ortalaması**. Medyan mağaza pratikte **0 $** harcıyor. Bu ortalamanın üstüne kurulan fiyat modeli,
var olmayan bir mağazanın üstüne kuruludur.

---

## 1. Shopify'ın kendi planları (2026)

| Plan | Aylık | Yıllık (aylık karşılığı) |
|---|---|---|
| Starter | 5 $ (sadece ödeme linki) | — |
| **Agentic** *(yeni, 2 Nis 2026)* | **0 $** + %2,9 + 0,30 $/satış | — |
| Basic | **27–39 $** ⚠️ | 19–29 $ |
| Grow *(eski adı "Shopify")* | **72–105 $** ⚠️ | 54–79 $ |
| Advanced | 399 $ | 299 $ |
| **Plus** | **2.300 $** (3 yıl) / **2.500 $** (1 yıl) | — |

⚠️ Basic ve Grow'da kaynaklar çelişiyor: `shopify.com/pricing` canlı sayfası 27/72 $ gösteriyor,
Mart 2026 kaynakları 39/105 $. Advanced ve Plus **her kaynakta aynı**. Mart–Mayıs 2026 arası bir
indirim olmuş olabilir ama duyuru bulunamadı.

**Önemli kapılar:**

| Özellik | Basic | Grow | Advanced | Plus |
|---|---|---|---|---|
| Ek personel hesabı | **0** | 5 | 15 | Sınırsız |
| Headless vitrin | 1 | 1 | 1 | **25** |
| B2B katalog | 3'e kadar | 3'e kadar | 3'e kadar | **Sınırsız** |
| Checkout özelleştirme | Sınırlı | Sınırlı | Sınırlı | **Tam** |
| **API hız limiti** (GraphQL) | **100 puan/sn** | 100 | **200** | **1.000** |

⚠️ Birçok 2026 blogu hâlâ 50/100/500 puan/sn yazıyor — **iki kat bayat**. Resmî sayfa yukarıdaki.
Plus'ın avantajı **10 kat**.

**Artık Plus'a özel olmayanlar:** B2B (tüm planlarda 3 kataloğa kadar), Shopify Functions,
temel checkout extensibility. **Hâlâ Plus'a özel:** tam checkout extensibility + Checkout
Branding API, Launchpad, Audiences, sınırsız personel, per-market checkout blokları.

---

## 2. Beş segment

| | **Hobici** | **Dropshipper** | **Büyüyen DTC** | **Yerleşik marka** | **Plus / kurumsal** |
|---|---|---|---|---|---|
| **Aylık ciro** | 0–2 bin $ (çoğu 0) | 0–20 bin $, çok oynak | 80–400 bin $ | 400 bin–1,7 mn $ | 1,7 mn $+ |
| **Plan** | Basic (genelde deneme/1 $ promosyonu) | Basic | Basic → Grow | Grow / Advanced | Plus |
| **App sayısı** | 0–2 | 3–6, ağırlıklı ücretsiz | 6–9 | 10–12 | 12–25+ |
| **Aylık app bütçesi** | **0–15 $** | 0–60 $ | **1.000–3.500 $** 🟠 | 5.000–15.000 $ | 20.000–80.000 $ |
| **Kim karar veriyor** | Sahibi, tek başına, anlık | Sahibi + YouTube/TikTok gurusu + Facebook grubu | Kurucu, bazen ilk pazarlamacı | E-ticaret müdürü öneriyor, kurucu onaylıyor | E-ticaret direktörü + **ajans tavsiyesi**; üstte satın alma/güvenlik incelemesi |
| **Neyi umursuyor** | Ücretsiz olsun. "Shopify bunu zaten yapmıyor mu?" | İlk satışa hız, dönüşüm hilesi, ROAS | **Kanıtlanabilir gelir artışı**, kurulum süresi, temayı bozmasın | Güvenilirlik, destek hızı, raporlama, checkout'u bozmasın | Entegrasyonlar (ERP/PIM/OMS/3PL), yetkiler, sözleşme, yol haritası |
| **Satın alma tetiği** | Asla — bir şey bozulana kadar | Bir guru söyledi | **Sayıyla ifade edilmiş bir darboğaz** | Bir ekip üyesinin zamanı boşa gidiyor | Ajans ya da tanıdık bir operatör markayı söyledi |

**Bağlam** 🟢: Shopify'ın kendi Gallup çalışması (46.993 ABD'li yetişkin, May 2024) girişimcilerin
**%35'inin işini 9-5 mesaisinin yanında** yürüttüğünü, **%18'inin yan iş olarak başladığını**
buldu.

**App sayısı hırsla değil trafikle ölçekleniyor** 🟡:

| Aylık trafik | Ort. app | Medyan |
|---|---|---|
| 50 bin altı | 1,8 | 1 |
| 50–200 bin | 5,5 | 4 |
| 200 bin–1 mn | 7,1 | 6 |
| 1 mn+ | 7,4 | 7 |

⚠️ Üstte ~7'de platoya oturuyor çünkü tarayıcılar **admin-only app'leri göremiyor** — büyük
markaların asıl kullandığı da tam olarak onlar.

---

## 3. Fiyat merdiveni — ne onaylanır, ne takılır

| Fiyat | Merchant'ın tepkisi |
|---|---|
| **0 $** | Varsayılan beklenti. App'lerin **%45–46'sı** ücretsiz plan/deneme sunuyor; merchant "ücretsizi vardır" diye eğitilmiş |
| **5–15 $** | **Düşünmeden onaylanır.** Merchant'ın kendi cümlesi: *"Shopify'ın zaten sunması gereken bir özellik için ayda 5–10 $ savunulabilir."* |
| **19–30 $** | Hacim tatlı noktası. **Medyan giriş fiyatı 9,99 $** |
| **50–99 $** | Beyan edilmiş bir ROI gerekçesi ister. Deneme süresi ve vaka çalışmaları burada önem kazanır |
| **100–300 $** | Bütçede **adı konmuş bir kalem** ister. Toplam app harcamasında ancak mağazaların %1,8'i burada |
| **300 $+** | Bir kadroyu ya da sözleşmeyi ikame etmiyorsa **açıkça öfke** uyandırıyor |
| **Ciro payı (%)** | **Her fiyattan daha nefret edilen model.** *"Adam bir app yazmış, benim satışımla ne ilgisi var? Ortağım mı?"* |

**100 $+'ı ne haklı çıkarır** (operatör mutabakatı):
1. Bir işe alımı ikame eder ya da engeller (helpdesk, abonelik operasyonu, iade)
2. **Para yolunun üstünde** durur ve artış atfedilebilir (e-posta/SMS, abonelik, upsell)
3. İşin onsuz yürüyemediği bir iş akışını taşır → **bunlar aynı zamanda en düşük churn'lü app'ler**
4. Dolaşımdaki operatör kuralları: **en az 3× ROI** ve **toplam app yığını ciro'nun %1–3'ünü aşmasın**

## 4. Huni ve dönüşüm 🟠

Shopify **resmî benchmark yayınlamıyor.** En iyi analist rakamları:

| Aşama | Değer |
|---|---|
| Listeyi gören → kuran | **%3–8** iyi konumlanmışta · **%1–2** (<25 yorum) · **%5–8** (200+ yorum) |
| Kuran → **ödeyen** | **%8–18** güçlü onboarding'le; zayıf UX'te **%2–5**. Tüm app'lerde aralık: %3–55 |
| Listeyi gören → ödeyen (uçtan uca) | Medyan app **%1'in altı**; en iyiler **%5+** |
| Aylık churn | **%5–12** tipik. Alt uç: abonelik/fulfillment. Üst uç: popup, görsel optimize edici, genel SEO |

⚠️ Dolaşımdaki **"%48,8 opt-out vs %18,2 opt-in trial dönüşümü"** rakamı Shopify verisi değil,
**genel SaaS/mobil** istatistiği.

## 5. Neden kuruyorlar? — keşif ve güven

**Keşif:** Kurulumların **%60–70'i App Store aramasıyla** başlıyor (⚠️ iki rakam da first-party
değil ve birbiriyle çelişiyor). Merchant problemi yazıyor, ilk sonuçları tarıyor ve çoğunlukla
**ilk ekranda** karar veriyor. İlk ekran görüntüsü, alt başlık ve ilk cümle bütün işi yapıyor.

**Güven sinyalleri, kanıt gücüne göre sıralı:**

1. **Built for Shopify rozeti** — en güçlü belgelenmiş kaldıraç: rozeti alan app'lerde
   **14 gün içinde ortalama %49 yeni kurulum artışı** 🟢. Ayrıca aramada öncelik, ana sayfa
   yerleşimi ve "Senin için seçtiklerimiz"de öncelik. Şartı açık: mağaza hızında
   **10 puandan fazla düşüş yok**.
2. **Yorum sayısı ve tazeliği.** Shopify'ın puanı **ağırlıklı ortalama**: yararlılık oyları,
   yorumun ayrıntısı, **tazelik** ve kullanım süresi hesaba giriyor 🟢. Pratikte
   listeyi görenin kurma oranı, <25 yorumdan 200+ yoruma geçerken **~4 katına** çıkıyor.
   > 🚨 **Temmuz 2026 — Shopify yorum ekonomisini sertleştirdi.** 6 Tem 2026 changelog'u:
   > *"Bir app'in yorum teşvik ettiği tespit edildiğinde, **yorumlarının önemli bir kısmını
   > kaldıracağız.** Bu uygulamayı yapan app'leri zaten tespit ettik."* Ayrıca sahte yorum
   > tespiti **geriye dönük** işletiliyor — mevcut yorumların *"anlamlı bir kısmı"* yayından
   > kaldırılacak. Politika Shopify'ın kendi tespitinden değil, **topluluk baskısından** doğdu
   > (bir geliştirici, teşvik bannerını kaldırıp yorum büyümesinin durduğunu, sonra bannerı
   > dev store'lardan gizleyerek geri koyduğunu belgeledi).
   > **Bizim için:** "yorum karşılığı ömür boyu ücretsiz" tipi kısayolların fiyatı artık
   > geriye dönük yorum kaybı. Yorumları **ürün kalitesiyle** kazan. Shopify'ın sıradaki
   > hedefi olarak **app adlandırma ve kopya app'ler** duyuruldu.

3. **Puan tabanı.** Ekosistem ortalaması **4,49**. App'lerin %17'si 4,0'ın altında —
   4,0 altı pratikte **ölü liste**.
4. **"Merchant'lar ne düşünüyor" AI özetleri** artık listelerde çıkıyor 🟢 → yıldız ortalamasından
   çok **yorumlardaki temalar** önem kazandı.
5. **Akran ve ajans tavsiyesi** — App Store'da gezinmeye kıyasla **yükseliyor** 🟠.
   ~5 mn $ üstünde **ajans çoğu zaman gerçek karar verici**.

## 6. Neden siliyorlar? — en aksiyon alınabilir bulgu

**Shopify'ın resmî kaldırma sebebi seçenekleri** (Partner Dashboard, 29 Nis 2026 güncellemesi) 🟢:
birden çok app deniyorum · mağaza kapanıyor/duraklatılıyor · şu an kullanmıyorum ·
özelliklerden memnun değilim · **destekten** memnun değilim · **çok pahalı** ·
mağazamla düzgün çalışmıyor · diğer.

Dikkat: sekiz seçenekten **ikisi ürün başarısızlığı bile değil** (deneme, mağaza kapanışı) —
ölü mağaza taban oranıyla birebir tutarlı.

**1–2 yıldızlı yorumların içeriğinden çıkarılan asıl sebepler** 🟢:

| Şikâyet | 1–2 yıldızlı yorumlardaki payı |
|---|---|
| **Faturalandırma sorunu** (kaldırdıktan sonra ücret, sürpriz ücret) | **%19,2** |
| Bug / kalite beklentisinin karşılanmaması | %13,9 |
| Onboarding zorluğu | %4,4 |

> ### 🚨 Faturalandırma öfkesi, onboarding sürtünmesinin **4 katı**.
> Merchant beceriksiz bir kurulumu affediyor; **sürpriz ücreti affetmiyor.**
> Şeffaf, sabit, sürprizsiz faturalandırma + temiz uninstall davranışı, **herhangi bir
> özellikten daha büyük bir rekabet hendeği**.

Yapısal tuzak: Shopify'ın kendi yardım sayfası merchant'ı uyarıyor — **mağazayı duraklatsan bile
app ücretleri, app'i kaldırmadıkça devam ediyor** 🟢. O %19,2'nin önemli kısmı buradan geliyor.

**Churn zamanlaması** (03'ten): ilk 30 günde **%40** kayıp, **%14 ilk 24 saatte** siliyor,
churn'ün **%67'si ilk destek temasında çözülse önlenebilir**.

## 7. "App'ler mağazamı yavaşlatır" korkusu

Gerçek bir itiraz ama **veri halk inancının aksini söylüyor**:
- Kurumsallaşmış hâli: BFS rozeti **≤10 puan** hız etkisi şartı koyuyor 🟢.
- ⚠️ Karşı kanıt 🟡: app sayısı, StoreInspect'in kalite skoruyla **pozitif** korele
  (0 app → 43; 11–15 app → 100) ve "şişkin" mağazaların **%94'ü Shopify Plus**.
  **App'ler mağazayı büyütmüyor; büyük mağazalar app satın alıyor.**
- Yani "app şişkinliği seni öldürüyor" satan herkes bir **karıştırıcı değişken** satıyor.

**Geliştirici için sonucu:** performans korkusu, kurulum niyetinin tavanı değil, **listede
önceden karşılanacak bir itiraz** (BFS rozeti, "vitrine 0 script", theme app block mimarisi).

## 8. Merchant gerçekte ne kullanıyor?

⚠️ Tüm penetrasyon rakamları **taban değeridir**: tarayıcılar app'i sadece vitrin imzasından
görüyor; admin-only araçlar (Flow, ERP, 3PL, muhasebe, çoğu checkout app'i) **görünmez**.
ShipStation örneği: 724 tespit vs iddia edilen 1,3 mn müşteri — **~1.000 kat** fark.

### En çok kurulu app'ler (Storeleads, 3.027.755 mağaza, 21 Ağu 2026) 🟡

| App | Mağaza | Pay |
|---|---|---|
| Judge.me (yorum) | 619.657 | **%20,5** |
| Klaviyo (e-posta/SMS) | 422.827 | **%14,0** |
| Shopify Inbox | 359.554 | %11,9 |
| Klarna On-Site Messaging | 347.293 | %11,5 |
| Instafeed | 241.724 | %8,0 |
| Shopify Forms | 207.211 | %6,8 |
| PageFly | 193.079 | %6,4 |
| Mailchimp | 144.312 | %4,8 |
| Printful | 140.388 | %4,6 |

### Plus mağazalarda (n≈74.777) 🟡
Shop Pay %62,7 · PayPal %60,2 · **Klaviyo %50,3** · Klarna %19,0 · **Gorgias %13,4** ·
**Triple Whale %11,4** · Yotpo %9,3 · Okendo %6,1 · Attentive %5,8 · Loop Returns %3,7

> ### 🔑 En temiz olgunluk göstergesi: **Klaviyo, tüm Shopify'da %14 — Plus'ta %50,3.**
> Checkout ve Klaviyo'yu geçtikten sonra **her şey uçurumdan düşüyor**: Plus'ta bile 3. araç
> %50'de, 6. araç %13'te. "Standart DTC yığını" büyük ölçüde bir efsane.

### Kategori penetrasyonu 🟡

| Kategori | Mağazaların yüzdesi |
|---|---|
| E-posta pazarlama | **%35–38** |
| Ürün yorumları | **%23–25** |
| Destek / canlı sohbet | %10,6 |
| Sadakat | %6,8 |
| Sayfa oluşturucu | %5,8 |
| Upsell / cross-sell | %5,6 |
| SEO | %3,8 |
| Abonelik | %2,6 |
| Özel analitik | %1,9 |

**Sadece iki kategoride kitlesel yaygınlık var: e-posta ve yorum.** Gerisi niş — ve yeni bir
app o nişe girerken **eklenmiyor, yerini almak zorunda kalıyor.**

**Penetrasyon mağaza büyüklüğüyle dikey artıyor** (aylık trafiğe göre):
e-posta %24,8 (<50 bin) → **%74,7** (200 bin–1 mn) · destek %4,6 → **%44,0** ·
analitik %1,0 → **%24,6**. Plus/standart çarpanları: upsell **29×**, analitik **15,9×**,
destek **8,8×**, sadakat **6,9×**.

### Aşamaya göre tipik yığın ve harcama 🟠

| Ciro | Aylık app harcaması | Yığın |
|---|---|---|
| **<1 mn $** | 50–300 $ | Klaviyo ücretsiz · Shopify Inbox · Judge.me ücretsiz · PageFly |
| **1–5 mn $** | 1.000–3.500 $ | Klaviyo ücretli · Gorgias Basic · Recharge · Postscript · Yotpo/Okendo · **atıflama yok** |
| **5–20 mn $** | 5.000–15.000 $ | Klaviyo advanced · Gorgias Pro · Smile · arama · Triple Whale/Polar · Loop |
| **20–100 mn $** | 20.000–80.000 $ | Kurumsal katmanlar · **Attentive, Postscript'in yerini alır** · NetSuite · CDP · Signifyd |

**Shopify dışı araçlar (her aşamada):** Meta Ads, Google Ads, TikTok, GA4, Microsoft Clarity,
Slack, Notion/Airtable, bir 3PL portalı.

### Fiyat modeli örnekleri — asıl ders
- **Klaviyo:** 500 profilde 20 $ → 10 binde 150 $ → 50 binde 720 $ → 250 binde ~2.300 $.
  **Gönderilen mesaja değil, saklanan profile göre** faturalıyor — fatura şoku mekanizması bu.
- **Recharge:** 99 $/ay + %1,49 + 0,19 $/işlem. 5 mn $ abonelik GMV'sinde **yıllık 78.063 $ =
  GMV'nin %1,56'sı.** Skio/Loop/Smartrr tam da bu yüzden var — ve hiçbiri onu deviremedi.
  **Hendek ürün değil, canlı aboneliklerin taşınma maliyeti.**
- **Okendo:** listede 19 $, hacimde gerçek maliyet **349–1.200 $**. Listelenen giriş fiyatıyla
  gerçek orta-pazar maliyeti arasındaki 5–20 katlık fark, kategorinin iş modelinin kendisi.
- **AI destek** ~**0,90–1,00 $ / çözülen konuşma** olarak standartlaştı (Gorgias, Intercom Fin).

### Trendler — "nereye inşa etmeli"nin en alakalı sinyali 🟡
- **Büzülen:** AfterShip tracking **−%6,7** · Route **−%6,0** · ShipBob **−%10,8** ·
  Easyship **−%30,9** (yıllık)
- **Büyüyen:** Loop Returns **+%16,5** · AfterShip Returns **+%9,6** · Narvar **+%11,6** ·
  Rebuy **+%28,3** · Richpanel **+%23,6** · Klaviyo **+%18,7** (platformun +%11'ini geçiyor)
- **Reklam kanalları:** Google %35,8 · Meta %23,2 (doygun) · **TikTok +%37,2** ·
  **Pinterest +%47,5** (büyüme rakiplerde)

**Satın alma sonrası araçlar küçülürken sadece iadeler büyüyor.** Bir kategori seçiyorsan
bu ıraksama, verideki en karar-alakalı sayı.

### ⚠️ Agentic commerce gerçeklik kontrolü
OpenAI'ın **Instant Checkout**'u Eylül 2025'te *"1 milyondan fazla Shopify merchant'ı yakında"*
vaadiyle duyuruldu; **30'dan az merchant canlıya çıktı** ve **Mart 2026'da kapatıldı**
(*⚠️ CNBC kaynaklı, birincil doğrulama gerekiyor*). Buna karşılık merchant'ların **%89'u
"agentic commerce'e hazırlanıyor"** ama işlemlerin sadece **%3'ü** bir AI ajanı içeriyor.

**Ders:** AI **keşfi** için inşa et (Shopify'ın modeli — checkout merchant'ta kalıyor),
AI **checkout'u** için değil.

## 9. Merchant'lar nerede tavsiye soruyor?

| Yer | Kim var |
|---|---|
| **community.shopify.com** | Ağırlıklı yeni başlayanlar. ⚠️ **Plus panosu çok küçük (3.118 konu)** — ciddi operatörler burada değil. Ama app fiyatı öfke başlıkları burada ve talep sinyali olarak değerli |
| **eCommerceFuel** | **Ücretli ve elenmiş**: 7 haneli katman **1 mn $+ ciro / 199 $/ay**, 8 haneli **10 mn $+ / 299 $/ay**. Üyelerin toplam GMV'si ~13 mia $ iddia ediliyor. **Gerçek operatörlere ulaşmak istiyorsan, giriş şartı denetlenen tek yer burası** |
| r/shopify, r/ecommerce, r/dropship | ⚠️ Üye sayıları doğrulanamadı. Ağırlıklı başlangıç ve dropshipping. **İtiraz kaynağı olarak değerli, satın alma gücü olarak değil** |
| Ajans kanalları | ~5 mn $ üstünde ajans çoğu zaman gerçek karar verici |
| **Shopify Sidekick** | 🟢 Artık **resmî bir keşif yüzeyi** — merchant ihtiyacını tarif ediyor, app önerisi alıyor |

### Facebook grupları — büyük görünüp küçük olan yer

⚠️ Facebook üye sayılarını doğrudan doğrulamak mümkün olmadı (giriş duvarı); aşağıdakiler
ikincil kaynak tahminleri, kaynaklar arasında **3 kata varan** fark var.

| Grup | Üye (tahmini) | Kim var |
|---|---|---|
| Dropify, Shopify Newbies, Ecom Empires, eCommerce Elites | 90 bin – 152 bin | **Başlangıç/dropshipper baskın.** Devasa kitle, sıfıra yakın ödeme gücü |
| Shopify Entrepreneurs | ~110 bin | Modere edilen, gönderiler onaydan geçen; app/tema geliştiricileri açıkça davetli. Karışık ama işe yarar |
| **Shopify Plus Community** | **~9,3 bin** | **Shopify'ın kendi yönettiği, sadece Plus merchant'ları.** Ayda 236 gönderi — üye başına en yüksek aktivite |
| **Million Dollar Sellers** | **752** | Ciroyu doğrulatan 7–9 haneli kurucular, ~7.500 $/ay aidat. Kendi içinde Shopify alt grubu var |
| Unofficial Shopify Podcast Insiders | ~4 bin | Mağaza sahibi olma şartı |

**Üç yapısal gerçek:**
1. **Gerçek operatörler toplamda 15 binin altında** — bu raporlardaki ham üye sayısının ~%1'i,
   ama harcamanın büyük kısmı onlarda.
2. **Her ciddi grubun 1 numaralı kuralı, bir satıcının yapmak istediği şeyi yasaklıyor.**
   Belgelenmiş tek meşru kanal: Shopify Plus Community'de **Perşembe günleri `#partnerthursdays`**
   etiketiyle paylaşım, ve "X için ne kullanmalıyım" sorularına **katılımcı olarak** cevap vermek.
   Soğuk DM, topluluğun kendi rehberlerinde **dolandırıcılık işareti** sayılıyor.
3. **Bu alandaki yerleşikler gruplara pazarlama yapmadı — grupları kendileri kurdu.**
   Trackify (50 bin), Helium 10 (48 bin), EcomHunt (84 bin), Spocket, Viral Launch hep vendor'a ait.

Shopify'ın kendi resmî tavsiyesi de aynı yönde: *"App'ini tanıtırken dikkatli ol, spam sayılabilir…
merchant'lar app'inden memnunsa zaten başkalarına önerirler."*

---

## 10. Bir app inşacısı için beş sonuç

1. **Alıcı, merchant tabanı değil** — ayda 100 $+ ödeyen **~%1,8** (65.441 mağaza) ve genel
   olarak herhangi bir şey ödeyen ~%7. Gerisi ücretsiz katman turizmi.
   **65 bin mağazaya göre fiyatla ve konumlan, 3 milyona göre değil.**
2. **Faturalandırma öfkesi, onboarding sürtünmesinin 4 katı** (%19,2 vs %4,4). Şeffaf fiyat +
   temiz uninstall, herhangi bir özellikten büyük bir hendek. **Ciro payı modelinden uzak dur** —
   matematiği ne olursa olsun nefret ediliyor.
3. **Yorumlar bileşik faiz gibi çalışıyor**: <25 yorumda %1–2 kurulum oranı, 200+ yorumda %5–8.
   App'lerin %35'inin hiç yorumu yok. **BFS rozeti + ilk 200 yorum**, erken büyümenin tamamı —
   ama ⚠️ Temmuz 2026'dan beri **teşvikli yorum, geriye dönük yorum silme sebebi**.
4. **Sadece e-posta (%35–38) ve yorum (%23–25) kitlesel.** Gerisinde eklemiyorsun, **yerini
   alıyorsun** — ve o iki kategori zaten kapalı (Klaviyo, Judge.me).
5. **5–15 $ bandı merchant'ın düşünmeyi bıraktığı yer** ama churn'ü de orada.
   99 $ bandı bütçe kalemi ister ama **ömür 3 katına çıkar**.
   [Ekosistem verilerindeki](03-EKOSISTEM-VERILERI.md) LTV hesabı burada devreye giriyor.

---

*Kaynaklar: [Eightx — app spend by revenue band](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) · [Eightx — app bloat report](https://eightx.co/blog/shopify-app-bloat-report-2026) · [StoreInspect — app bloat](https://storeinspect.com/blog/shopify-app-bloat) · [StoreInspect — market share](https://storeinspect.com/blog/shopify-app-market-share) · [Storeleads — State of Shopify](https://storeleads.app/reports/shopify) · [Taylor Sicard — pricing benchmarks](https://taylorsicard.com/blog/shopify-app-pricing-benchmarks-2026) · [Week One Labs — revenue benchmarks](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026/) · [Convert2x — funnel benchmarks](https://convert2x.com/learn/fix-shopify-app-conversion-funnel) · [Shopify — Built for Shopify güncellemeleri](https://www.shopify.com/partners/blog/built-for-shopify-updates) · [shopify.dev — uninstall sebepleri](https://shopify.dev/changelog/update-to-app-uninstall-reasons) · [shopify.dev — yorum yönetimi](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews) · [shopify.com/pricing](https://www.shopify.com/pricing) · [shopify.dev — API limitleri](https://shopify.dev/docs/api/usage/limits) · [Klaviyo Q2 FY2026 transkript](https://www.fool.com/earnings/call-transcripts/2026/08/12/klaviyo-kvyo-q2-2026-earnings-call-transcript/) · [Shopify Community — app fiyatları tartışması](https://community.shopify.com/t/the-price-of-apps-is-completely-out-of-control/419098) · [eCommerceFuel](https://www.ecommercefuel.com/)*
