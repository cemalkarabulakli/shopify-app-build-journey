# E-ticaret Terimleri Sözlüğü

> Merchant'larla konuşurken, App Store açıklaması yazarken ve app'in hangi metriği iyileştirdiğini
> anlatırken bu kelimeler geçer. Yazılımcı için: bunlar merchant'ın **KPI**'ları. App'ini bir
> metriğe bağlayamıyorsan satmak zordur.
>
> Kural: her terim = **ne demek + formül + örnek sayı**. Formülsüz terim ezber olur.

---

## 1. Para ve satış metrikleri

| Kısaltma | Açılım | Ne demek | Formül |
|---|---|---|---|
| **GMV** | Gross Merchandise Value | Toplam satış hacmi (iadeler düşülmemiş ciro) | Σ sipariş tutarı |
| **AOV** | Average Order Value | Ortalama sepet tutarı | Ciro ÷ Sipariş sayısı |
| **LTV / CLV** | (Customer) Lifetime Value | Bir müşterinin ömrü boyunca bıraktığı toplam kâr | AOV × Yıllık sipariş sayısı × Müşteri ömrü (yıl) × Brüt marj |
| **COGS** | Cost of Goods Sold | Satılan malın maliyeti | Ürün + paketleme + kargo |
| **Gross Margin** | Brüt marj | Satıştan ürün maliyeti çıkınca kalan | (Ciro − COGS) ÷ Ciro |
| **MRR** | Monthly Recurring Revenue | Aylık tekrarlayan gelir (abonelik işlerinde) | Σ aktif abonelik bedeli |
| **ARR** | Annual Recurring Revenue | Yıllık tekrarlayan gelir | MRR × 12 |
| **ARPU** | Average Revenue Per User | Kullanıcı başına ortalama gelir | Gelir ÷ Kullanıcı sayısı |

**Örnek:** Sepet 60 €, müşteri yılda 3 kez alıyor, 2 yıl kalıyor, brüt marj %40.
`LTV = 60 × 3 × 2 × 0,40 = 144 €`. Bu müşteriyi kazanmak için 144 €'dan az harcamalısın.

## 2. Reklam ve müşteri kazanımı

| Kısaltma | Açılım | Ne demek | Formül |
|---|---|---|---|
| **CAC** | Customer Acquisition Cost | Bir müşteri kazanmanın maliyeti | Pazarlama harcaması ÷ Kazanılan müşteri |
| **CPA** | Cost Per Acquisition | Bir hedef eylem (satın alma/kayıt) maliyeti | Harcama ÷ Dönüşüm |
| **CPC** | Cost Per Click | Tıklama başı maliyet | Harcama ÷ Tıklama |
| **CPM** | Cost Per Mille | 1.000 gösterim maliyeti | (Harcama ÷ Gösterim) × 1000 |
| **CTR** | Click-Through Rate | Tıklama oranı | Tıklama ÷ Gösterim |
| **ROAS** | Return On Ad Spend | Reklamın kaç katı ciro getirdiği | Reklamdan gelen ciro ÷ Reklam harcaması |
| **ROI** | Return On Investment | Yatırımın kâr getirisi | (Kazanç − Maliyet) ÷ Maliyet |
| **LTV:CAC** | — | İşin sağlık göstergesi | LTV ÷ CAC |

**Sağlıklı eşikler (genel kabul, sektöre göre oynar):**
- `LTV:CAC ≥ 3` → sağlıklı. `< 1` → her müşteride zarar ediyorsun.
- `ROAS 4` → 1 € reklama 4 € ciro. Marj %25 ise başa baştasın; ROAS tek başına kâr demek değil.
- **CAC payback** → CAC'ı kaç ayda geri alıyorsun. 12 aydan uzunsa nakit sıkışır.

**Örnek:** 1.000 € Meta reklamı → 25 müşteri. `CAC = 40 €`. LTV 144 € ise `LTV:CAC = 3,6` → sağlıklı.

## 3. Huni (funnel) ve dönüşüm

| Terim | Ne demek |
|---|---|
| **Traffic / Sessions** | Ziyaret sayısı (oturum). Aynı kişi 2 kez gelirse 2 oturum. |
| **CR / CVR** (Conversion Rate) | Ziyaretin satışa dönme oranı = Sipariş ÷ Oturum. E-ticarette tipik **%1–3**. |
| **Bounce rate** | Tek sayfa görüp çıkanların oranı. |
| **Add-to-cart rate** | Sepete ekleyenlerin oranı. |
| **Checkout abandonment** | Ödeme adımına girip bitirmeyenlerin oranı. Tipik **%60–80** — devasa bir fırsat alanı. |
| **Cart abandonment** | Sepete ekleyip almayanlar. |
| **Upsell** | Daha pahalı/üst modeli satmak. |
| **Cross-sell** | Yanında tamamlayıcı ürün satmak ("bunu da al"). |
| **Bundle** | Ürünleri paket halinde indirimli satmak. |
| **Order bump** | Ödeme sırasında sunulan küçük ek ürün. |

**Neden bizim için önemli:** app'ler tam da bu adımlarda satılır. "Checkout abandonment'ı %5
düşürüyorum" cümlesi, "güzel bir arayüz sunuyorum"dan kat kat iyi satar.

**Örnek:** 10.000 oturum, CR %2 → 200 sipariş, AOV 60 € → 12.000 € ciro.
CR'ı %2 → %2,4'e çıkaran bir app ayda **+2.400 €** getirir. 49 €/ay fiyat kolay savunulur.

## 4. Elde tutma (retention)

| Terim | Ne demek | Formül |
|---|---|---|
| **Retention rate** | Kalan müşteri oranı | Dönem sonu kalan ÷ Dönem başı |
| **Churn rate** | Kaybedilen müşteri/abone oranı | Ayrılan ÷ Dönem başı |
| **Repeat purchase rate** | Tekrar alan müşteri oranı | ≥2 sipariş veren ÷ Toplam müşteri |
| **Cohort** | Aynı dönemde kazanılan müşteri grubu; zaman içindeki davranışı izlemek için |
| **RFM** | Recency-Frequency-Monetary — müşteri segmentasyonu klasiği |
| **Subscription** | Düzenli tekrarlayan sipariş (kahve, vitamin) |

**App geliştirici için kritik:** Shopify app'lerinde churn yüksektir. Aylık %5 churn =
ortalama müşteri ömrü `1 ÷ 0,05 = 20 ay`. Aylık %10 churn = 10 ay. Bu sayı doğrudan LTV'ni yarıya böler.

## 5. Operasyon ve lojistik

| Terim | Ne demek |
|---|---|
| **SKU** | Stock Keeping Unit — her ürün varyantının tekil kodu (Kırmızı-M ayrı SKU) |
| **Variant** | Ürünün beden/renk gibi seçenek kombinasyonu (Shopify'da birinci sınıf kavram) |
| **Inventory** | Stok |
| **Fulfillment** | Siparişin toplanıp paketlenip gönderilmesi |
| **3PL** | Third-Party Logistics — depolama/kargoyu dışarıya vermek |
| **Dropshipping** | Stok tutmadan, tedarikçiden doğrudan müşteriye gönderim |
| **POD** | Print on Demand — sipariş gelince basılan ürün (tişört, poster) |
| **RMA / Returns** | İade süreci |
| **Chargeback** | Müşterinin bankadan ödemeyi geri çağırması |
| **COD** | Cash on Delivery — kapıda ödeme (TR'de çok yaygın) |

## 6. Kanallar ve pazarlama

| Terim | Ne demek |
|---|---|
| **SEO** | Organik aramadan trafik |
| **SEM / PPC** | Ücretli arama reklamı |
| **Paid social** | Meta/TikTok reklamları |
| **Organic** | Ödeme yapılmadan gelen trafik |
| **Email/SMS marketing** | Sahip olunan kanal — en yüksek ROI'li olanı |
| **Abandoned cart flow** | Sepeti terk edene otomatik hatırlatma serisi |
| **Affiliate** | Satış başına komisyonla çalışan ortak |
| **Influencer / UGC** | Yaratıcı içerikle satış (User Generated Content) |
| **Attribution** | Satışın hangi kanaldan geldiğini atfetme — herkesin yalan söylediği yer |
| **Retargeting** | Siteyi gezip almayana tekrar reklam gösterme |
| **A/B test** | İki varyantı karşılaştırma; sonuç ancak yeterli örneklemle anlamlı |
| **Social proof** | Yorum, puan, "12 kişi bakıyor" gibi güven unsurları |

## 7. SaaS tarafı (bizim işimiz)

| Terim | Ne demek |
|---|---|
| **Trial** | Ücretsiz deneme süresi (Shopify app'lerde 7–14 gün standart) |
| **Freemium** | Ücretsiz katman + ücretli üst paket |
| **Activation** | Kullanıcının ilk değeri gördüğü an ("aha moment") |
| **TTV** (Time to Value) | Kurulumdan ilk değere geçen süre — kısaldıkça churn düşer |
| **Onboarding** | Kurulum sonrası ilk deneyim |
| **Expansion revenue** | Mevcut müşteriden gelen ek gelir (üst pakete geçiş) |
| **NRR** | Net Revenue Retention — churn + expansion birlikte; >%100 ise iş kendi kendine büyür |
| **Uninstall rate** | App'i kaldıranların oranı — Shopify app'lerinin en acı metriği |

---

## Cebinde dursun: 3 formül

```
LTV       = AOV × Yıllık sipariş × Yıl × Brüt marj
LTV:CAC   ≥ 3 olmalı
App değeri = (Yeni CR − Eski CR) × Oturum × AOV   → aylık € cinsinden getiri
```

Son formül, app fiyatını savunmanın en dürüst yolu: merchant'a ayda ne kazandırdığını
€ olarak söyleyebiliyorsan, fiyat tartışması biter.

---

*Yeni terim duyunca buraya ekle — formülüyle ve bir örnek sayıyla. Formülsüz ekleme.*
