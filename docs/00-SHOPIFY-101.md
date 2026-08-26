# Shopify 101 — Hiç Bilmeyen Yazılımcı İçin

> Bu dosyayı okuyan kişi: **kod yazmayı biliyor**, pazarlamadan biraz anlıyor, Shopify hakkında
> **sıfır** bilgisi var. Amaç: 30 dakika okuduktan sonra "Shopify app nedir, ben ne yapacağım,
> para nereden geliyor" sorularına cevap verebilmek. Kurulum yok, sadece kafada net resim.

---

## 1. Shopify tam olarak ne?

Bir e-ticaret **SaaS**'ı. İşletme aylık ücret öder, karşılığında hazır bir online mağaza alır:
ürün yönetimi, sepet, ödeme, kargo, vergi, admin paneli. Kod yazmadan mağaza açarsın.

Ekosistemde üç taraf var:

| Taraf | Kim | Ne ister |
|---|---|---|
| **Merchant** (satıcı) | Mağaza sahibi. Bizim müşterimiz. | Daha çok satış, daha az manuel iş |
| **Shopify** | Platform | Ekosistemin büyümesi, komisyon |
| **Partner / Developer** | **Biz** | Merchant'a araç satıp para kazanmak |

Kritik nokta: **bizim müşterimiz Shopify değil, merchant.** Shopify sadece dağıtım kanalı —
App Store'u işleten, faturayı kesen, parayı toplayan aracı.

## 2. Shopify app nedir?

Shopify'ın kendi başına yapmadığı bir işi yapan, merchant'ın mağazasına **kurduğu** yazılım.

Örnekler (gerçek App Store kategorileri):
- Otomatik ürün yorumu toplama ve gösterme
- Terk edilen sepete WhatsApp/SMS hatırlatma
- Stok azaldığında tedarikçiye otomatik sipariş
- Kargo etiketi basma, iade yönetimi
- Ürün sayfasına "bunu da al" önerisi

Teknik olarak app **Shopify'ın sunucusunda çalışmaz.** Kendi sunucunda (bizim durumda Coolify'da)
duran normal bir web uygulamasıdır. Shopify sadece:
1. Merchant'ı sana OAuth ile yollar,
2. Senin uygulamanı admin panelinin içinde **iframe** ile gösterir,
3. Sana mağazanın verisine erişecek bir **access token** verir.

Yani bildiğin web app. Yenisi: kimlik doğrulama akışı, API'ler ve faturalandırma Shopify'a bağlı.

## 3. Zihinsel model — parçalar

```
                 ┌────────────────────────────────────────────┐
                 │  Shopify Admin (merchant'ın gördüğü panel) │
                 │  ┌──────────────────────────────────────┐  │
   merchant ───► │  │  <iframe> SENİN UYGULAMAN            │  │
                 │  │  (senin sunucunda çalışıyor)         │  │
                 │  └──────────────────────────────────────┘  │
                 └────────────────────────────────────────────┘
                            │  Admin GraphQL API (sen → Shopify: veri oku/yaz)
                            ▼
                 ┌────────────────────────────────────────────┐
                 │  Shopify: ürünler, siparişler, müşteriler  │
                 └────────────────────────────────────────────┘
                            │  Webhook (Shopify → sen: "sipariş geldi")
                            ▼
                     senin sunucun / veritabanın
```

Üç yön var, karıştırma:
- **iframe** → merchant senin arayüzünü admin içinde görür (buna *embedded app* denir).
- **API çağrısı** → sen Shopify'dan veri istersin. GraphQL. (REST API artık eski, yenisini yazma.)
- **Webhook** → Shopify sana olay bildirir. Sipariş oluştu, ürün silindi, app kaldırıldı.

## 4. Sözlük — bunları bilmeden ilerlenmez

| Terim | Ne demek |
|---|---|
| **Merchant** | Mağaza sahibi. Müşterin. |
| **Store / shop** | Bir mağaza. `filanca.myshopify.com` gibi kalıcı bir adı vardır. |
| **Partner hesabı** | Geliştirici hesabın. Ücretsiz. App'ler ve test mağazaları burada. |
| **Development store** | Ücretsiz, sahte veriyle dolu test mağazası. Gerçek satış yapamaz. Burada geliştirirsin. |
| **Embedded app** | Admin içinde iframe'de açılan app. Standart budur. |
| **App Bridge** | iframe içindeki senin JS'inin, dıştaki admin ile konuşmasını sağlayan Shopify kütüphanesi (modal aç, yönlendir, toast göster). |
| **Session token** | Embedded app'te kimlik. iframe olduğu için cookie güvenilmez; her istekte kısa ömürlü bir JWT gelir. |
| **Access token** | Merchant app'i kurunca aldığın, o mağazanın API'sine erişim anahtarı. Mağaza başına bir tane. |
| **Scopes** | İzinler. `read_products`, `write_orders` gibi. İstediğin her izin kurulum ekranında merchant'a gösterilir — fazlası kurulumu düşürür. |
| **Admin GraphQL API** | Mağaza verisini okuduğun/yazdığın ana API. |
| **Webhook** | Shopify'ın sana attığı olay bildirimi (HTTP POST). |
| **Extension** | App'inin, admin dışında bir yere kod enjekte eden parçası (aşağıda). |
| **Theme** | Mağazanın vitrini (storefront) — Liquid şablonlarıyla yazılmış tema. App'ten ayrı bir dünya. |
| **Liquid** | Shopify'ın tema şablon dili. App yazarken az, tema işine girersen çok görürsün. |
| **App Store** | apps.shopify.com — app'lerin listelendiği pazar yeri. Buraya girmek **inceleme (review)** gerektirir. |
| **Custom app** | Tek bir mağaza için yazılan, App Store'a girmeyen app. İnceleme yok. |
| **Shopify Functions** | Shopify'ın kendi altyapısında çalışan WASM kodu (indirim mantığı, kargo kuralı). Nadir ama güçlü. |

## 5. App çeşitleri — ne yapacağına karar vermek

**Public app** — App Store'da listelenir, herkes kurar. Ölçeklenir, ama inceleme sürecinden geçer.
👉 *Hedefimiz bu.*

**Custom app** — Tek merchant için. İnceleme yok, hızlı. Danışmanlık işi gibi; ölçeklenmez ama
ilk parayı hızlı getirir ve gerçek problemi öğretir.

**Extension'lar** — App'inin admin dışına uzanan parçaları:
- *Theme app extension* → vitrine blok ekler (ör. ürün sayfasında yorum kutusu)
- *Checkout UI extension* → ödeme sayfasına alan ekler (Plus planı gerektiren kısımlar var)
- *Admin UI extension* → admin'in kendi sayfalarına buton/panel ekler
- *Shopify Functions* → indirim/kargo mantığını Shopify'ın içinde çalıştırır

Başlangıçta sadece **embedded admin app** yeter. Extension'lar sonra.

## 6. Para nasıl kazanılıyor?

Merchant'tan **abonelik** alırsın (tipik: 9–99 $/ay, bazıları kullanım başına). Parayı sen
tahsil etmezsin: **Billing API** ile Shopify merchant'ın mevcut faturasına ekler, keser, sana öder.
Kredi kartı entegrasyonu yok — bu büyük kolaylık.

Shopify bir gelir payı alır. Şu anki genel çerçeve: yıllık belirli bir eşiğe kadar %0, üstü için
pay alınıyor. **Oranlar değişiyor — başvuru anında Partner dokümanından teyit et**, buradaki
sayıya güvenme.

Gerçekçi büyüklük duygusu: 30 $/ay × 50 merchant = 1.500 $/ay. Bu, App Store'da orta-küçük ama
gerçek bir app demek. Hedefi buradan kur, "milyonlarca merchant var" diye değil.

## 7. Neden bu iş yazılımcı için cazip — ve nerede tuzak var

**Cazip:**
- Ödeme altyapısı, kimlik doğrulama, dağıtım kanalı hazır geliyor.
- Müşterin zaten para ödeyen bir işletme; B2C'deki "bedava bekleyen kullanıcı" problemi yok.
- Merchant bulmak kolay: ne satacaklarını, cirolarını, sorunlarını açıkça konuşuyorlar.

**Tuzak:**
- App Store rekabeti sert; her popüler kategoride 50+ app var.
- Merchant'lar app'i sepetteki eşya gibi kurar, bir ay sonra siler. **Churn yüksektir.**
- "Güzel app" satmıyor; **ölçülebilir sonuç** satıyor (dönüşüm arttı, şu kadar saat kazandı).
- En büyük hata: platformu öğrenip 3 ay kod yazıp, kimsenin istemediği bir şeyi yayınlamak.

Bu yüzden yol haritasında teknik ısınma **kasıtlı olarak kısa**, sonra merchant konuşmaları geliyor.

## 8. Kafada net olması gereken 5 cümle

1. Shopify app = kendi sunucumda çalışan, admin'de iframe ile görünen normal bir web uygulaması.
2. Merchant kurar → OAuth → bana o mağaza için bir access token düşer.
3. Veriyi Admin GraphQL API ile okurum, olayları webhook ile duyarım.
4. Parayı Billing API ile Shopify tahsil eder, bana öder.
5. Zor kısım kod değil; **hangi merchant'ın hangi acısını çözdüğüm.**

## 9. Sırada ne var

Hiçbir şey kurmadan buraya kadar geldik. Kurulum ve ilk çalışan uygulama:
👉 [LEARNING.md](LEARNING.md) — Oturum 1.

---

*Kaynaklar: shopify.dev (resmi doküman), partners.shopify.com. Bu dosya öğrendikçe düzeltilir —
yanlış bir şey görürsen değiştir, tarih at.*
