# Ekosistem Verileri — App Store'un Ekonomisi

> [02-Anatomi](02-SHOPIFY-ANATOMI.md) platformun *nasıl çalıştığını* anlatır. Bu dosya
> **pazarın ekonomisi**: kaç app var, ne kadar kazanıyorlar, merchant ne kadar ödüyor,
> insanlar app'i neden siliyor, boşluk nerede.
>
> Amaç: fikir seçerken içgüdüyle değil **sayıyla** karar vermek.
> Doğrulama: **Ağustos 2026**. Kaynaklar sonda.

> ### ⚠️ Düzeltme notu (Ağustos 2026 derin araştırması sonrası)
> Bu dosya ilk yazıldığında daha yüzeysel kaynaklara dayanıyordu. Sonraki derin araştırma
> birkaç sayıyı düzeltti — çelişki görürsen **aşağıdaki düzeltmeler geçerlidir**:
> - **App sayısı:** "13.800–22.200" değil → **canlı listelenen ~17.900–25.500**, *"yayınlanmış"*
>   (kümülatif) **28.162**. Shopify'ın kendi ifadesi "16.000+".
> - **Mağaza başına app:** "ortalama 6" ≠ gerçek. **Medyan 2**, mağazaların **%76'sı 0–2 app**
>   kullanıyor. "Ortalama 120 $/ay harcama" rakamını **kullanma** — çarpık dağılımın ortalaması.
> - **Gelir paylaşımı:** %0/%15'e ek olarak **%2,9 işlem ücreti** var; yılda 20 mn $+ kazanan
>   geliştiriciler **tüm gelirde %15** ödüyor.
> - **"Kurulumların %60'ı aramadan":** kaynaklar %60 ve %70 diyor, **ikisi de first-party değil**.
> - **"Geliştirici ortalama 93.000 $ kazanıyor":** ❌ yanlış — izi **ZipRecruiter'ın çalışan maaşı**
>   sayfasına çıkıyor, app geliriyle ilgisi yok.
> - Detaylı merchant/ödeme verisi: [06-MERCHANT-PSIKOLOJISI.md](06-MERCHANT-PSIKOLOJISI.md)

## 0. Bu sayılar nasıl okunur

App Store'un içini Shopify açmıyor; buradaki verilerin çoğu **3. taraf tarayıcılardan**
(Storeleads, GapQuery, StoreCensus, appstoreresearch vb.) geliyor. Sayım yöntemleri farklı,
bu yüzden aynı metrik kaynaktan kaynağa değişiyor — app sayısı için 13.786 de görürsün,
22.186 da. **Büyüklük mertebesi doğru, ondalık hane değil.** Öyle kullan.

---

## 1. Pazarın büyüklüğü

| Metrik | Değer | Kaynak/dönem |
|---|---|---|
| App Store'daki app | **~13.800 – 22.200** | GapQuery 13.786 · normalize tarama 22.186 (Ağu 2026) |
| Kategori sayısı | **1.789** | Ağu 2026 |
| Aylık eklenen yeni app | **~550** | 2026 |
| İki yıllık büyüme | **+%71** (2024 başı → 2026 Q1) | ~7.000 yeni app |
| Ortalama mağaza kaç app kullanıyor | **~5,9 – 6** | StoreCensus |
| Toplam tespit edilen kurulum | **13,4 mn+** | StoreCensus (2,28 mn mağaza taraması) |
| Ekosistem geliştirici geliri | **~890 mn $/yıl** | 3. taraf tahmini |

**Okuma:** Pazar büyüyor ama arz da hızlı büyüyor. Ayda 550 yeni app = her ay 550 yeni rakip.
"Fikir bulundu, hemen yazayım" refleksi burada ölüyor; ayırt edici olan fikir değil **konumlandırma**.

## 2. Gelir dağılımı — acımasız power law

| Dilim | Yıllık/aylık gelir |
|---|---|
| En üst **%1** | **1 mn $+ ARR** |
| En üst **%10** | **100 bin $+ ARR** |
| Yorum sayısına göre 20–50. sıra | ~50 bin – 500 bin $ **MRR** |
| 100–500. sıra | ~5 bin – 50 bin $ MRR |
| **Medyan app** | **< 1.000 $/ay** — ve azımsanmayacak kısmı **sıfır** kazanıyor |
| Gerçekçi solo başarı | 12–18 ay çalışma sonrası **3.000 – 15.000 $/ay** (üst çeyrek) |
| Solo geliştirici medyanı | **< 1.000 $/ay** |

Referans zirve: Judge.me ~36.000 yorum, giriş paketi 15 $ → tahmini **1–3 mn $ MRR**.
Loox 100.000+ aktif mağaza. Bunlar 8–10 yıllık, ekipli işler; kıyas noktası değil, kutup yıldızı.

**Çıkarım:** Hedefin "App Store'u domine etmek" değil, **3–15 bin $/ay bandına dar bir nişten
girmek** olmalı. O band gerçek, ulaşılabilir ve tek kişilik bir işletmeyi geçindirir.

## 3. Fiyatlandırma gerçekleri

| Metrik | Değer |
|---|---|
| **Medyan giriş fiyatı** | **9,99 $/ay** — 1.400'den fazla app tam bu rakamla başlıyor |
| Ortalama giriş fiyatı (olgun kategoriler) | ~86 $ |
| Ortalama app fiyatı (tüm paketler) | ~92 $ |
| Kalıcı ücretsiz katmanı olan app | **~%45** |
| Kurulumdan önce para isteyen app | **~%5** |

**Kategoriye göre ortalama giriş fiyatı:**

| Pahalı kategoriler | $/ay | Ucuz kategoriler | $/ay |
|---|---|---|---|
| Envanter & tedarik zinciri | **193** | Sipariş yönetimi | 70 |
| Analitik & raporlama | 147 | Kargo & lojistik | 73 |
| İletişim & iş birliği | 109 | Genel e-ticaret | 76 |
| Öngörücü analitik | 100 | | |
| BT & güvenlik | 95 | | |

**Çıkarım:** 9,99 $ bir *varsayılan*, bir *tavan* değil. Envanter/analitik gibi
"para ve operasyon" kategorileri 10–20 katı fiyatlanabiliyor çünkü merchant oradaki hatanın
maliyetini biliyor. **Acının parası olan yeri seç.** Aynı emek, 10 kat fiyat.

## 4. Merchant'ın app bütçesi — en kritik tablo

| Merchant ciro bandı | Aylık app harcaması |
|---|---|
| < 1 mn $/yıl | ~175 $/ay |
| > 20 mn $/yıl | 50.000 $/ay+ |

Ama dağılıma bak (Storeleads, 3,59 mn aktif mağaza, May 2026):

| App'e aylık harcama | Mağaza sayısı | Pay |
|---|---|---|
| > 100 $ | 65.441 | **%1,82** |
| > 500 $ | 7.966 | **%0,22** |
| > 1.000 $ | 1.602 | **%0,04** |

**Bu tablo iş planının tamamıdır.** "5,6 milyon merchant" diye bir pazar yok; app'e ciddi para
veren **~65 bin mağaza** var. 30 $/ay × 50 merchant hedefin, o 65 binlik havuzun **%0,08'i**.
Ulaşılabilir — ama ancak o havuzu hedeflersen. Ücretsiz plandaki dropshipper'ı kovalarsan değil.

## 5. Churn — bu işin en acı sayısı

| Metrik | Değer |
|---|---|
| İlk **30 günde** kaybedilen müşteri | **~%40** |
| İlk **24 saatte** silen merchant | **%14** |
| Aylık churn, < 25 $/ay app'ler | **%6,1** |
| Aylık churn, > 1.000 $/ay app'ler | **%1,8** |
| Abonelik e-ticarette ortalama aylık churn | ~%5 |
| İlk destek temasında çözülse önlenebilir churn | **%67** |

Deneme süresi: çoğu kategoride **7 günlük trial, 14 günlükten iyi performans veriyor** —
kararlı merchant'ı hızlı taahhüde zorluyor, "zombi denemeci" havuzunu küçültüyor.

**Hesabı yapalım.** Aylık %6,1 churn → ortalama ömür `1 ÷ 0,061 ≈ 16 ay`.
9,99 $ app için LTV ≈ **164 $**. Aylık %1,8 churn (pahalı app) → ömür ~55 ay;
99 $ app için LTV ≈ **5.500 $**. Aynı emek, **33 katı** değer.

Bu iki satır, "ucuz app çok satar" sezgisini tek başına çürütüyor.

## 6. Merchant app'i nasıl buluyor?

- Kurulumların **~%60'ı arama ile başlıyor**: merchant problemi yazıyor, ilk ekranı tarıyor,
  çoğu kararını **ilk ekranda** veriyor.
- Sıralama iki gruba ayrılıyor:
  - **İlgi sinyalleri** (görünüyor musun): app adı, alt başlık, açıklamadaki kelimeler
  - **Kalite sinyalleri** (ne kadar yukarıda): **dönüşüm oranı** (listeyi görenin kurma oranı),
    **yorum sayısı/puanı/tazeliği**, **retention** (hızlı silinme her şeyi aşağı çeker)
- **Built for Shopify** rozeti: performans, güvenlik, veri işleme ve tema entegrasyonu
  şartlarını geçen app'lere veriliyor. Getirisi: aramada üst sıra, App Store ana sayfa/kategori
  koleksiyonlarına aday olma, admin içindeki "Picked for you" önerilerinde görünme.
- Shopify'ın AI asistanı (Sidekick) dahil tüm öneri yüzeyleri **senin listeleme metninden**
  besleniyor. Yani App Store listen bir pazarlama sayfası değil, **arama indeksinin girdisi**.

**Çıkarım:** Listeleme metni "sonra yazarım" işi değil; dağıtımın kendisi. Ve retention
doğrudan sıralamayı etkilediği için **churn = görünmezlik**. İkisi aynı problem.

## 7. Rekabet yoğunluğu ve boşluklar

**Doymuş taraf:**
- SEO kategorisinde **2.830 app** var, ama yorumların **%89,8'i sadece 83 app'e** gidiyor.
  Yani kategori "kalabalık" değil, **kilitli**. Buraya girmek görünmez olmaktır.

**Ekosistem ortalamaları (kıyas çizgisi):**
- Ortalama puan **4,49** — bunun altındaki kategoriler "memnuniyetsiz" demektir → fırsat
- App başına ortalama **92 yorum**

**Talebin arzı aştığı yerler:**
| Alan | Veri |
|---|---|
| Print on demand | Sadece **24 app**, app başına **581 yorum** (ortalamanın **6,3 katı**) |
| Altı kategori | App başına **250+ yorum** (ortalama 92) → merchant arıyor, bulamıyor |
| Muhasebe entegrasyonları | QuickBooks için sadece **58 app**, çoğu vasat puanlı ve pahalı |
| Airtable / Monday / ClickUp / HubSpot | Shopify tarafında entegrasyon sayısı çok az ya da sıfır |

**Kullanım boşlukları (mağazaların yüzde kaçında o tür app YOK):**

| Kategori | App'i olmayan mağaza |
|---|---|
| Destek | **%98,5** |
| Abonelik | %98,3 |
| Özel analitik | %98,2 |
| Yorum/değerlendirme | %95,3 |
| E-posta | %70,7 |

Dikkat — bu boşluklar iki şeyden biri olabilir: **ihtiyaç var ama ürün yok** *ya da*
**o mağazaların o şeye ihtiyacı yok** (küçük/ölü mağazalar). Ayrımı ancak konuşarak anlarsın.
Bu tablo fikir *üretir*, fikir *doğrulamaz*.

## 7b. Para nereye gidiyor, boşluk nerede? (Ağustos 2026 araştırması)

**Merchant bütçesinin dağılımı** — harcamayı (kurulumu değil) kıran tek kaynak Eightx:

| Merchant bandı | App harcaması/ay | Bütçeyi ne yiyor |
|---|---|---|
| < 1 mn $ | 50–300 $ | E-posta (ücretsiz katman), destek, yorum — 3–5 app |
| 1–5 mn $ | 1.000–3.500 $ | **E-posta + SMS ≈ faturanın %40'ı** (Klaviyo + Postscript/Attentive); abonelik ~300 $, yorum 150–300 $ |
| 5–20 mn $ | 5–15 bin $ | Destek (ticket hacmine göre fiyat) ve SMS en hızlı büyüyen kalemler; search, loyalty, BI eklenir |
| 20 mn $+ | 20–80 bin $+ | "Diğer" (search, loyalty, fraud, BI, özel entegrasyon) DTC çekirdeğini geçer |

**1 mn $+ ARR app'lerin yaşadığı yerler:** kargo/fulfillment, abonelik (Recharge), iade (Loop),
yorum (Yotpo, Judge.me), bundle/upsell. 100 bin $+ ARR app'ler aynı alanların dar dilimlerinde:
dikey abonelik, taşıyıcıya özel kargo kuralı, B2B toptan, iade otomasyonu, AI öneri.

**Kurulum hacmi (para ≠ hacim):** cart customization 1,12 mn · yorum 1,12 mn · e-posta 735 bin.
İlk 100 app kurulumların sadece %34'ü — uzun kuyruk gerçek.

**İki farklı "boşluk" — karıştırma:**
1. *Kullanım boşluğu* (§7'deki tablo: destek %98,6, abonelik %98,3…) → bu **tavan**, talep değil;
   o mağazaların çoğu küçük/ölü.
2. *Talebin arzı aştığı yer* (app başına yorum ≫ 92): print on demand (581/app), muhasebe
   entegrasyonları (QuickBooks 58 app, vasat), Airtable/Monday/ClickUp/HubSpot ↔ Shopify ≈ sıfır.
3. *Birden fazla kaynağın "az yapılmış" dediği:* B2B toptan, çoklu para birimi / uluslararası vergi,
   headless araçları, **mevcut helpdesk'in içinde** çalışan ticaret odaklı AI destek (yeni bir
   chat widget değil), Shopify'a özel analitik, Plus operasyon araçları, dikey abonelik yönetimi
   (başarısız ödeme, self-servis).

**Kilitli (girme):** SEO, upsell/cross-sell (1 mn yorum, 1.003 app), page builder, görsel
optimizasyon, back-in-stock, terk edilen sepet.

**Karar:** Yüksek bütçe payı + yüksek fiyat toleransı + ince arz üçünün kesiştiği yer
**1–20 mn $ merchant'ın operasyonu**: abonelik uç durumları, iade, muhasebe/ops entegrasyonu,
analitik. En çok para e-posta/SMS'e gidiyor ama o Klaviyo'nun — orada yarışılmaz, entegre olunur.

**Ucuz kanıt:** Storeleads'ten 1–5 mn $ bandında 20 merchant'a tek cümlelik problem DM'i.
5'i acıyı doğrularsa, app o.

*Kaynaklar:* [Eightx](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) ·
[Week One Labs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026/) ·
[StoreInspect](https://storeinspect.com/report/state-of-shopify) · [StoreCensus](https://www.storecensus.com/stats) ·
[Craftberry](https://craftberry.co/articles/shopify-app-store-statistics) · [AppOpportunity](https://appopportunity.com/blog/underserved-app-niches-2026)

## 8. Paranın kuralları (Shopify ile aranda)

| Konu | Kural |
|---|---|
| Kayıt ücreti | **19 $** tek seferlik (Partner hesabı başına) |
| Gelir paylaşımı | İlk **1 mn $ ömür boyu kazançta %0**, üstünde **%15** |
| Önemli değişiklik | 1 Oca 2025'ten itibaren eşik **yıllık sıfırlanan** değil **ömür boyu**; 2025 öncesi kazançlar sayılmıyor |
| Büyük geliştirici istisnası | Yılda 20 mn $+ App Store geliri ya da 100 mn $+ şirket cirosu → tüm gelirde %15 |
| Ödeme | Zorunlu olarak **Billing API** — Stripe/PayPal/harici form **yasak** |

Pratikte: ilk 1 milyon dolara kadar Shopify'a **sıfır** komisyon veriyorsun. Solo geliştirici
için bu, gerçekten cömert bir aralık.

## 9. İnceleme (review) — neden reddediliyorlar

| Ret sebebi | Not |
|---|---|
| **GDPR webhook'ları eksik/yanlış** | Reddedilenlerin **%60'ından fazlası** en azından kısmen bundan |
| Güvenlik başlıkları yok (clickjacking koruması) | Embedded app zorunluluğu |
| Session için 3. taraf çerezi kullanmak | Session token kullanılmalı |
| Uninstall'da temizlik yapmamak | Temaya enjekte edilen kod geride kalmamalı |
| Bozuk işlevsellik, 404/500 sayfalar | Basit ama sık |
| Aşırı izin (scope) istemek | Gerekçesiz her scope risk |
| Yanıltıcı listeleme | Ekran görüntüsü/vaat uyumsuzluğu |
| Billing API dışında ödeme almak | Doğrudan ret |

**Çıkarım:** Reddedilme sebeplerinin çoğu **ürün kalitesi değil, uyum (compliance)**.
Yani bir kontrol listesiyle önlenebilir. GDPR webhook'larını ilk günden yaz — sonda değil.

---

## 10. Bütün bu verilerden çıkan 8 karar

1. **Kategori seçimi = merchant cirosu seçimi.** App'e >100 $ veren ~65 bin mağaza var; hedef onlar.
2. **9,99 $ tuzağından kaç.** Envanter/analitik/operasyon kategorileri 100–190 $ bandında fiyatlanıyor.
3. **Fiyat ↑ → churn ↓.** %6,1 vs %1,8 aylık churn, LTV'de ~33 kat fark demek.
4. **İlk 24 saat kaderi belirliyor** (%14 aynı gün siliyor). TTV'yi kısaltmak 1 numaralı iş.
5. **Destek bir maliyet değil, retention kanalı.** Churn'ün %67'si ilk temasta çözülse önlenebilir.
6. **Listeleme metni = dağıtım.** Kurulumların %60'ı aramadan; sıralama dönüşüm + yorum + retention'a bakıyor.
7. **Kilitli kategorilere girme.** SEO'da 2.830 app'in yorumlarının %89,8'i 83 app'te. Dar niş seç.
8. **Compliance'ı ilk günden yaz.** GDPR webhook'ları, güvenlik başlıkları, uninstall temizliği.

### Hedef hesabı (bu verilerle)

```
Hedef: 3.000 $/ay MRR
Fiyat 49 $/ay (ortalamanın altı, 9,99 tuzağının çok üstü)
→ 61 ödeyen merchant gerekiyor
Aylık churn %5 varsayımı → her ay ~3 kayıp, yerine koymak gerekiyor
Kurulum→ödeme dönüşümü %20 varsayımı → ayda ~15 kurulum yeterli
```
Ayda 15 kurulum, ~65 bin mağazalık hedef havuzda ulaşılabilir bir sayı.
**Kilit varsayımlar** (churn %5, dönüşüm %20) doğrulanana kadar tahmindir — Faz 5–7'de ölç.

---

## 11. Kaynaklar

- Gelir dağılımı ve solo benchmark'lar: [Week One Labs](https://weekonelabs.com/blog/shopify-app-revenue-benchmarks-2026/) · [GapQuery — How much do Shopify apps make](https://www.gapquery.com/blog/how-much-do-shopify-apps-make)
- Fiyatlandırma: [Taylor Sicard — App Pricing Benchmarks 2026](https://taylorsicard.com/blog/shopify-app-pricing-benchmarks-2026) · [ShopifyPricing](https://shopifypricing.com/app-costs)
- Merchant app harcaması: [Eightx — App spend by revenue band](https://eightx.co/blog/average-ecommerce-shopify-app-spend-by-revenue-band-2026) · [Storeleads](https://storeleads.app/reports/shopify)
- Churn: [appstoreresearch — Subscription churn](https://appstoreresearch.com/blog/shopify-subscription-churn) · [Oxify — Retention playbook](https://oxify.app/blog/shopify-app-retention-playbook)
- Keşif ve sıralama: [Prys — App Store ranking factors](https://prys.io/learn/shopify-app-store-ranking-factors) · [Built for Shopify (resmî)](https://shopify.dev/docs/apps/launch/built-for-shopify)
- Boşluk analizi: [GapQuery — High demand low supply](https://www.gapquery.com/blog/shopify-high-demand-low-supply) · [GapQuery — 13.786 app analizi](https://www.gapquery.com/guides/shopify-app-ideas) · [StoreInspect](https://storeinspect.com/report/state-of-shopify)
- Gelir paylaşımı (resmî): [shopify.dev — Revenue share](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
- İnceleme süreci: [shopify.dev — App Store review](https://shopify.dev/docs/apps/launch/app-store-review/index) · [Gadget — Pass the review first time](https://gadget.dev/blog/how-to-pass-the-shopify-app-store-review-the-first-time-part-1-the-technical-bit)

*3. taraf verilerinin çoğu tahmindir. Karar öncesi kaynağa git; tarihi güncelle.*
