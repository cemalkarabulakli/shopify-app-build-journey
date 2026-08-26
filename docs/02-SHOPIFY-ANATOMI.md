# Shopify'ı Tanıyalım — Çarklar Nasıl Dönüyor

> [101](00-SHOPIFY-101.md) "ne olduğunu" anlatır. Bu dosya **derinlik**: neden Shopify, dünyada
> nerede duruyor, kimler kullanıyor, ekosistem ne durumda ve **yazılım olarak arkada ne dönüyor**.
> Bir app geliştiricisi olarak vereceğin teknik kararların çoğu buradaki gerçeklerden çıkar.
>
> ⚠️ **Sayılar eskir.** Hepsi kaynaklı ve tarihli; kritik bir karar vereceksen kaynağa git.
> Doğrulama tarihi: **Ağustos 2026**.

---

## 1. Neden Shopify? (Yazılımcı gözüyle)

E-ticaret yazmanın üç yolu var:

| Yol | Örnek | Artı | Eksi |
|---|---|---|---|
| **Sıfırdan yaz** | Kendi Next.js + Stripe | Tam kontrol | Ödeme, vergi, kargo, fraud, envanter… yıllar |
| **Self-hosted** | WooCommerce, Magento | Ucuz, açık kaynak | Bakım, güvenlik, ölçek merchant'ın derdi |
| **SaaS** | **Shopify**, BigCommerce | Hazır altyapı + dağıtım kanalı | Platforma bağımlılık, kurallarına uyma |

Shopify'ı geliştirici için özel yapan **App Store**: yazdığın yazılımın önüne milyonlarca
ödeme yapan işletme koyan hazır bir dağıtım kanalı. WooCommerce'te eklenti satmak = kendi
pazarlamanı sıfırdan kurmak. Shopify'da = arama sonuçlarında görünmek.

Bir de şu var: **müşterin zaten para ödüyor.** Shopify'a aylık ödeyen bir işletme, sana da
ödemeye alışkındır. B2C uygulamalardaki "bedava bekleyen kullanıcı" problemi yok.

**Bedeli:** Shopify'ın kuralları senin ürün yol haritan. Platform bir özelliği kendi çekirdeğine
alırsa ("Shopify bunu artık kendi yapıyor") o kategoriyi bir gecede silebilir. Buna
*platform riski* denir ve gerçektir.

## 2. Dünyada nerede duruyor?

| Metrik | Değer | Kaynak / dönem |
|---|---|---|
| Yıllık gelir (Shopify'ın kendi cirosu) | **11,56 milyar $** | 2025 |
| GMV (platform üzerinden geçen toplam satış) | **378 milyar $** (+%29,3 YoY) | 2025 |
| Q4 2025 tek çeyrek GMV | **123,8 milyar $** | tarihte ilk kez çeyrekte 100 mia $ aşıldı |
| Küresel e-ticaret cirosundaki payı | **~%6,2** | 2025 |
| ABD e-ticaretindeki payı | **%14+** | 2025 |
| Aktif mağaza | **~5,6 milyon** (ABD ~2,67 mn) | 3. taraf tahminleri, 2025 |
| Ülke | **175+** | — |

Okuma biçimi: **GMV ≠ Shopify'ın geliri.** GMV mağazaların sattığı toplam; Shopify bundan
abonelik + ödeme komisyonu alır. Senin app'inin pazarı ise merchant sayısıyla ilgilidir, GMV'yle değil.

Bir de dürüst bakış: 5,6 milyon mağazanın büyük kısmı **hobi/ölü mağaza**. Ciddi ciro yapan,
app'e ayda 30 $ verecek mağaza sayısı çok daha küçük. "Milyonlarca merchant var" cümlesiyle
iş planı yapma; hedef kitleni "ayda ≥10 bin $ satan, şu kategoride, şu ülkede" diye daralt.

## 3. Kimler, hangi sektörde kullanıyor?

Mağaza dağılımı (3. taraf taramaları, 2026):

| Sektör | Pay |
|---|---|
| Giyim / moda | **~%27** — açık ara birinci |
| Ev & bahçe | ~%12 |
| Güzellik & fitness | ~%11 |
| Yiyecek & içecek | üst sıralarda |

Kurumsal tarafta (**Shopify Plus**): perakende %18,2, hazır giyim %12 → ikisi birlikte
Plus müşterilerinin %30'undan fazlası. Üretim, wellness, gıda takip ediyor.
Nike, Delta, Mattel gibi isimler de Plus'ta; ama kurumsal segment sayıca çok küçük (~%1).

**Kullanım amaçları** (her biri farklı app ihtiyacı doğurur):
- **DTC markası** — kendi ürününü satan marka (Gymshark, Allbirds tipi). En kalabalık grup.
- **Dropshipping / POD** — stoksuz satış, baskıya göre üretim. Ucuz app'ler, yüksek churn.
- **Perakendeci + POS** — fiziksel mağazası olan, Shopify POS ile stoğu birleştiren.
- **B2B / toptan** — bayi fiyat listeleri, ödeme vadesi. Shopify'ın B2B özellikleri buraya bakar.
- **Abonelik kutuları** — kahve, vitamin. Tekrarlayan sipariş mantığı.
- **Headless** — vitrini kendi yazan (Hydrogen ya da başka framework), Shopify'ı sadece
  commerce motoru olarak kullanan büyük markalar.

👉 App fikri ararken önce **hangi grup** sorusunu cevapla. "Shopify merchant'ları" diye
homojen bir kitle yok; dropshipper ile Plus markasının dertleri taban tabana zıt.

## 4. Ekosistem ve topluluk

> 📊 Bu bölüm özet. Gelir dağılımı, fiyat bantları, churn, keşif ve boşluk analizi
> için: **[03-EKOSISTEM-VERILERI.md](03-EKOSISTEM-VERILERI.md)**

| Metrik | Değer | Not |
|---|---|---|
| App Store'daki app sayısı | **~13.000 – 22.000** | Kaynaklar çok ayrışıyor; sayım yöntemi farklı |
| Yıllık ekosistem geliştirici geliri | **~890 milyon $** | 3. taraf tahmini |
| Aylık eklenen yeni app | **~550** | — |
| Ortalama merchant'ın kullandığı app | **~6** | — |
| Geliştirici/satıcı sayısı | **12.000+** | — |

Bu tablodan çıkan iki gerçek:

1. **Kalabalık.** Her popüler kategoride onlarca rakip var. "Yorum uygulaması yapayım" fikri
   50. sıradan başlar. Boşluk, geniş kategorilerde değil **dar niş + iyi yapılmamış iş**te.
2. **Para var.** ~890 mn $/yıl geliştiriciye akıyor ve ortalama merchant 6 app kullanıyor.
   Yani merchant app kurmaya alışkın — ikna edilmesi gereken şey "app kurayım mı" değil,
   "**hangi** app".

**Topluluk nerede yaşıyor:**
- `shopify.dev` — resmî doküman; tek doğru kaynak. Blog/YouTube içerikleri hızla eskiyor.
- **Shopify Community** forumları — merchant ve geliştirici soruları. Gerçek acıları görmek için iyi.
- **Partner programı** — ücretsiz; dev store, App Store erişimi, gelir paylaşımı buradan.
- **Shopify Editions** — yılda birkaç kez toplu özellik duyurusu. Yol haritasını buradan okursun;
  **senin app kategorini öldürecek özellik de burada duyurulur.** Takip et.
- **Changelog + API sürüm notları** — çeyreklik. Bakım yükünün takvimi budur.
- Ajanslar ve freelancer ekosistemi (Shopify Experts) — ilk müşterilerini bulacağın yer olabilir.

## 5. Shopify'ın kendi mimarisi — çarklar

Bu bölüm app yazmak için "gerekli" değil, ama **neden bazı şeylerin öyle olduğunu** açıklar
(rate limit neden puanla ölçülüyor, webhook neden iki kez gelebiliyor, veri neden bazen geç geliyor).

**Çekirdek: dev bir Rails modüler monolit.**

| Katman | Ne kullanılıyor |
|---|---|
| Uygulama | **Ruby on Rails** — 2,8 mn+ satır, 500 bin+ commit. "Shopify Core". |
| Modülerlik | **Rails Engines** ile bileşenlere ayrılmış modüler monolit (mikroservis değil) |
| Veritabanı | **MySQL**, `shop_id` ile yatay sharding; bazı sistemlerde **Vitess** |
| İzolasyon | **Pod mimarisi** — mağazalar gruplara bölünür, her grup kendi DB kümesinde |
| Önbellek | Memcached, Redis |
| Olay akışı | Kafka |
| Arama | Elasticsearch |
| Çalışma ortamı | Kubernetes ile otomatik ölçekleme; stateless katman trafiğe göre büyür |

**Pod mimarisi neden önemli:** Tüm mağazalar tek bir dev veritabanında değil. Her pod
tamamen izole — bir pod'da olay çıkarsa etkilenen mağaza sayısı sınırlı kalır. Sadece
veritabanları podlanmıştır çünkü ölçeklemesi en zor katman odur; gerisi stateless.

Bunun sana yansıması:
- Mağazalar **multi-tenant** ama izole. Senin app'in de mağaza başına düşünmeli:
  her mağaza = ayrı access token, ayrı veri, ayrı rate limit kovası.
- **Eventual consistency** normaldir. Yazdığın veriyi hemen okuyunca eski hali gelebilir.
- Yoğunluk (BFCM gibi) gerçek bir olaydır. Kodun geri basınç (backoff) bilmeli.

## 6. Merchant tarafındaki anatomi — dört yüzey

```
┌──────────────┬───────────────┬──────────────┬────────────┐
│  STOREFRONT  │     ADMIN     │   CHECKOUT   │    POS     │
│  (vitrin)    │   (panel)     │   (ödeme)    │ (mağaza)   │
├──────────────┼───────────────┼──────────────┼────────────┤
│ Theme+Liquid │ Senin app'in  │ Shopify'ın   │ Fiziksel   │
│ OS 2.0       │ iframe'de     │ kendi akışı  │ satış      │
│ sections     │ Polaris ile   │ Extension    │ POS ext.   │
│ metafields   │ App Bridge    │ + Functions  │            │
│ Hydrogen*    │               │ (Plus sınırı)│            │
└──────────────┴───────────────┴──────────────┴────────────┘
     *Hydrogen = headless vitrin (React), Oxygen'da barınır
```

- **Storefront** — müşterinin gördüğü site. **Liquid** şablon diliyle yazılmış tema.
  *Online Store 2.0* ile sayfalar **section**'lara bölündü; app'ler vitrine
  **theme app extension** ile blok ekler. Ekstra veri **metafield/metaobject** ile taşınır.
- **Admin** — merchant'ın paneli. Senin app'in burada iframe'de yaşar, **Polaris** tasarım
  sistemiyle Shopify'a benzer görünür, **App Bridge** ile dış çerçeveyle konuşur.
- **Checkout** — Shopify'ın en korumalı alanı. Eskiden `checkout.liquid` ile kurcalanırdı,
  artık **checkout extensibility**: sandbox'ta çalışan UI extension'lar (gerçek DOM erişimi yok)
  + iş mantığı için **Shopify Functions**. Önemli kısıt: checkout özelleştirmesinin çoğu **Plus**'a bağlı.
- **POS** — fiziksel mağaza; stok ve müşteri aynı veri modelinde birleşir.

**Çekirdek veri modeli** (app yazarken sürekli göreceğin nesneler):

```
Shop
 ├── Product ──── Variant ──── InventoryItem ── InventoryLevel ── Location
 │      └── Collection (manuel / otomatik kural)
 ├── Customer ─── Address
 ├── Order ────── LineItem ── Fulfillment ── Transaction ── Refund
 │      └── DraftOrder
 ├── Discount / PriceRule
 └── Metafield / Metaobject  (her nesneye özel veri iliştirme)
```

En kritik ayrım: **Product ≠ Variant.** Stok, fiyat ve barkod **variant** düzeyindedir.
Yeni başlayanların en sık hatası ürün seviyesinde fiyat/stok aramaktır.

## 7. Geliştirici yüzeyi — API'ler ve kuralları

| API | Ne için | Kim çağırır |
|---|---|---|
| **Admin GraphQL API** | Mağaza verisini oku/yaz | Senin sunucun (access token ile) |
| **Storefront API** | Vitrin verisi, sepet | Tarayıcı / headless vitrin |
| **Customer Account API** | Müşteri girişi, sipariş geçmişi | Vitrin |
| **Partner API** | Kendi app'inin verisi (kurulum, gelir) | Senin araçların |
| **Webhooks** | Olay bildirimi | Shopify → sen |
| **Functions** | Shopify'ın içinde çalışan mantık | Shopify çalıştırır (WASM) |

**Sürümleme:** Her çeyreğin ilk günü yeni sürüm çıkar — `2026-01`, `2026-04`… Her sürüm
**en az 12 ay** desteklenir. Yani API'ye bağlı kod **yılda en az bir kez bakım ister**.
Bunu baştan takvimine yaz; app'lerin sessizce ölme sebeplerinden biri budur.

**Rate limit (Admin GraphQL):** İstek sayısı değil, **hesaplanmış sorgu maliyeti** üzerinden.
*Leaky bucket*: kova ~1000 puan, saniyede ~50 puan dolar (Plus'ta katları). Tek bir sorgu
1000 puanı aşamaz. Sorgu çalışmadan önce **tahmini maliyet** düşülür, bitince gerçek maliyetle
fark iade edilir.

Pratik sonuç: `first: 250` ile her alanı çekmek yerine **ihtiyacın olan alanı** iste.
GraphQL'de "fazladan alan bedava" değildir — burada tam anlamıyla parayla ölçülür.
Toplu iş için **Bulk Operations** (asenkron, sonuç JSONL dosyası) kullanılır.

**Webhooks:** HTTP POST. Üç kuralı ezberle:
1. **En az bir kez** teslim → aynı olay iki kez gelebilir. İşleyicin **idempotent** olmalı.
2. **Sıra garantisi yok** → "güncellendi" olayı "oluşturuldu"dan önce gelebilir.
3. **HMAC doğrulaması zorunlu** → gövdeyi imzayla doğrulamadan işleme alma.
Ayrıca hızlı 200 dön, işi kuyruğa at; Shopify yavaş endpoint'i devre dışı bırakır.
GDPR/veri talebi webhook'ları App Store için **zorunludur**.

## 8. Bir isteğin hayatı

**A) Merchant app'ini açtığında:**

```
merchant admin'de app'e tıklar
   │
   ▼
Shopify iframe'i açar, adres: senin app URL'in + shop parametresi
   │
   ▼
App Bridge kısa ömürlü SESSION TOKEN (JWT) üretir
   │
   ▼
senin sunucun JWT'yi doğrular  ──►  geçerliyse o mağazanın ACCESS TOKEN'ı
   │
   ▼
Admin GraphQL API'ye sorgu (access token + API sürümü)
   │
   ▼
HTML/JSON döner, iframe içinde render olur
```

Neden cookie yok: iframe içinde üçüncü taraf çerezleri güvenilmez. Bu yüzden her istekte
kısa ömürlü **session token** taşınır.

**B) Mağazada bir olay olduğunda:**

```
müşteri sipariş verir
   │
   ▼
Shopify Core kaydeder → olay yayınlanır (Kafka)
   │
   ▼
webhook POST ──► senin endpoint'in
   │            (HMAC doğrula → 200 dön → işi kuyruğa at)
   ▼
işçi süreç: işle, veritabanına yaz, gerekirse API'den detay çek
```

**C) İlk kurulum (OAuth), tek seferlik:**
merchant "Install" → izin (scopes) ekranı → onay → sana o mağaza için **access token** düşer →
mağaza kaydını veritabanına yaz. App silinince `app/uninstalled` webhook'u gelir: **token'ı ve
veriyi temizle**, faturalandırmayı durdur.

## 9. Bütün bunlar app geliştiricisi için ne demek?

1. **Mağaza = tenant.** Her şeyi `shop` bazında sakla ve izole et.
2. **Webhook'a tek başına güvenme.** Kaçan olaylar için periyodik *reconciliation* (API'den
   tarayıp karşılaştırma) yaz.
3. **İdempotency zorunlu.** Aynı webhook iki kez gelirse iki kayıt oluşmasın.
4. **Sorgu maliyetini düşün.** Sayfalama cursor ile, alanlar minimum, toplu iş Bulk Operation.
5. **En az izin iste.** Her ekstra scope kurulum ekranında bir kayıp sebebi.
6. **Yılda bir API bakımı** takvimde yer alsın (sürüm + deprecation).
7. **Eventual consistency'ye hazır ol.** Yazdığını hemen okuma varsayımı kurma.
8. **Uninstall'ı ciddiye al.** Temizlik + faturalandırma durdurma + veri saklama politikası.
9. **Plus sınırlarını bil.** Checkout'a dokunan fikirlerin pazarı, tüm merchant'lar değil.
10. **Platform riskini fiyatla.** Shopify'ın çekirdeğe alması muhtemel bir özelliğin üstüne
    şirket kurma; Editions duyurularını takip et.

## 10. Sınırlar ve zayıf noktalar (dürüst bölüm)

- **Rekabet yoğun**, fiyat baskısı yüksek; birçok kategoride 9,99 $ tavan gibi davranıyor.
- **Churn yüksek.** Merchant app'i dener, bir ay sonra siler. TTV'yi (ilk değere kadar geçen
  süre) kısaltmak en yüksek getirili iş.
- **Ödeme ve checkout Shopify'ın kalesi.** Oraya dokunan fikirler kısıtlı ve Plus'a bağlı.
- **Doküman hızlı değişir**, blog içerikleri eskir. `shopify.dev` dışına güvenme.
- **App Store incelemesi** gerçek bir engel; kalite, performans ve GDPR gereksinimleri var.
- **Bağımlılık.** Kuralları Shopify koyar, bir gecede değişebilir.

## 11. Kaynaklar

- Shopify 2025 finansalları ve GMV: [Chargeflow istatistikleri](https://www.chargeflow.io/blog/shopify-statistics) · [ECDB](https://ecdb.com/blog/shopify-s-influence-on-global-e-commerce-is-growing/5181) · [SEC 10-Q dosyaları](https://www.sec.gov/Archives/edgar/data/1594805/000159480525000073/shop-20250630.htm)
- Mimari: [Inside Shopify's Modular Monolith](https://newsletter.techworld-with-milan.com/p/inside-shopifys-modular-monolith) · [Shopify Engineering — Vitess ile yatay ölçekleme](https://shopify.engineering/horizontally-scaling-the-rails-backend-of-shop-app-with-vitess) · [Kovyrin röportajı](https://kovyrin.net/2024/06/16/interview-inside-shopify-monolith/)
- Ekosistem/app sayıları: [Meetanshi App Store istatistikleri](https://meetanshi.com/blog/shopify-app-store-statistics/) · [GapQuery](https://www.gapquery.com/shopify-app-store-statistics)
- Sektör dağılımı: [Storeleads — State of Shopify](https://storeleads.app/reports/shopify) · [Storeleads Plus raporu](https://storeleads.app/reports/shopify/list-of-shopify-plus-stores)
- API limitleri ve sürümleme: [shopify.dev/docs/api/usage/limits](https://shopify.dev/docs/api/usage/limits)
- Checkout/Functions/Hydrogen: [Hydrogen resmî site](https://hydrogen.shopify.dev/)

---

*Bu dosyadaki her sayı bir gün yanlış olacak. Yanlış gördüğün yeri düzelt ve tarihi güncelle.*
