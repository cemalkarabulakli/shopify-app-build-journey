# Öğrenme Günlüğü — Sıfırdan Shopify App

> **Başlangıç noktası:** Bilgisayarda hiçbir şey kurulu değil. Partner hesabı yok. Shopify
> hakkında bilgi yok. Elimizde sadece: kod yazabilme ve biraz pazarlama sezgisi.
> Bu dosya o noktadan başlayıp, App Store'da para kazanan bir app'e kadar giden yolun kaydı.
>
> Önce oku: [Shopify 101](00-SHOPIFY-101.md) · Terimler: [E-ticaret Sözlüğü](01-ETICARET-TERIMLERI.md)
> Derinlik: [Shopify Anatomisi](02-SHOPIFY-ANATOMI.md) · Pazar verisi: [Ekosistem Verileri](03-EKOSISTEM-VERILERI.md)
> Yayın: https://shopifyjourney.cemalbuilds.com

---

## Kurallar

1. **Önce çalıştır, sonra anla.** Dokümanı baştan sona okumak yok; tıkanınca bak.
2. **Oturum = 60–90 dk, tek hedef.** Hedef "çalışan bir şey" olmalı, "X'i öğrenmek" değil.
3. **Yazılmayan oturum olmamış sayılır.** Her oturumun sonunda 5 satır bu dosyaya.
4. **Her fazın somut çıktısı var.** Çıktı yoksa faz bitmemiştir.
5. **Teknik faz kısa, merchant fazı uzun.** Platformu öğrenip kimsenin istemediği şeyi
   yayınlamak bu işin bir numaralı ölüm sebebi.

## Yol haritası

| Faz | Süre | Ne öğreniyorum | Bitti sayılması için |
|---|---|---|---|
| **0** Kavramlar | 2 gün | Shopify ekosistemi, app nedir, para nasıl akıyor, arkadaki mimari | [101](00-SHOPIFY-101.md) + [Anatomi](02-SHOPIFY-ANATOMI.md) okundu; §8'deki 5 cümleyi ve "webhook neden iki kez gelir"i kendi kelimelerimle anlatabiliyorum | ⬜ |
| **1** İlk çalışan app | 1 gün | Partner hesabı, dev store, CLI, `app dev` | Uygulama dev store admin'inde açılıyor | ⬜ |
| **2** Anatomi | 2 gün | OAuth, session token, embedded, App Bridge | Template'e kendi sayfamı ekledim, isteğin yolunu çizebiliyorum | ⬜ |
| **3** Veri | 3 gün | Admin GraphQL API, scopes | Ürünleri listeleyen + birini güncelleyen sayfa | ⬜ |
| **4** Olaylar | 2 gün | Webhooks, app uninstall temizliği | `orders/create` yakalanıp DB'ye yazılıyor | ⬜ |
| **5** **Problem** | 2 hafta | Merchant görüşmesi, talep testi ([veri](03-EKOSISTEM-VERILERI.md)) | 10 merchant konuşması + 1 cümlelik problem + 1 sayı | ⬜ |
| **6** MVP | 3 hafta | Kendi app'im | 3 merchant elle kurulmuş, kullanıyor | ⬜ |
| **7** Para | 3 gün | Billing API, trial, plan | İlk ödeme geldi | ⬜ |
| **8** Yayın | 1 hafta | App Store listeleme, inceleme | Review'a gönderildi | ⬜ |

Faz 0–4 platformu öğrenmek için, **atılabilir kod**. Gerçek ürün Faz 5'te başlıyor.
Faz 5'e gelmeden kalıcı bir şey inşa etme.

---

## Oturumlar

### Oturum 0 — 2026-08-25 · Altyapı: günlük sitesi canlıda

**Hedef:** Öğrendiklerimi yayınlayacağım yer hazır olsun.
**Yaptım:** SvelteKit + adapter-node, markdown tabanlı günlük, Coolify/Nixpacks ile deploy.
**Öğrendim:**
- Nixpacks + `.npmrc engine-strict=true` + gevşek `engines` = sessiz `npm ci` hatası.
  Node'u üç yerde sabitle: `engines`, `.nvmrc`, `NIXPACKS_NODE_VERSION`.
- Coolify health check container *içinde* curl/wget arar; Nixpacks Node imajında yoktur.
- Traefik "no available server" = arkada sağlıklı container yok. Build ayarlarına değil,
  **deploy loguna** bak.
**Takıldım:** 503'ü teşhis ederken Coolify UI ayarlarına odaklandım, logu geç okudum.
**Sonraki adım:** Faz 0 — Shopify'ın ne olduğunu anla.

### Oturum 1 — ____ · Faz 0: Kafada resim

**Hedef:** Tek satır kod yazmadan, ne inşa edeceğimi anlatabilmek.

**Yapılacak (yaklaşık 45 dk):**
1. [00-SHOPIFY-101.md](00-SHOPIFY-101.md) dosyasını oku, ardından [02-SHOPIFY-ANATOMI.md](02-SHOPIFY-ANATOMI.md).
2. https://apps.shopify.com adresine git. Bir kategori seç (ör. "Store design" ya da "Marketing").
   **5 app** incele ve şunları not al: ne yapıyor, fiyatı kaç, kaç yorum almış, en çok şikayet ne?
   → Şikayetler (1–2 yıldızlı yorumlar) altın değerinde; boşluk oradadır.
3. Aynı şeyi bir kez de **ücretsiz app'lerde** yap: neden ücretsizler, nasıl para kazanıyorlar?
4. [01-ETICARET-TERIMLERI.md](01-ETICARET-TERIMLERI.md)'deki "3 formül" bölümünü ezberle.
5. [03-EKOSISTEM-VERILERI.md](03-EKOSISTEM-VERILERI.md) §4 (merchant app bütçesi) ve §5 (churn)
   tablolarına bak. İncelediğin 5 app'i bu sayılarla yeniden değerlendir:
   fiyatı kaç, hangi ciro bandındaki merchant'a satıyor, kaç yorumu var?

**Kontrol sorusu (cevaplayamıyorsan faz bitmemiştir):**
> "Shopify app nedir, benim sunucumla Shopify arasında kaç yönlü trafik var, para kimden kime akıyor?"
> "Rate limit neden istek sayısıyla değil puanla ölçülüyor? Webhook neden iki kez gelebilir?"

**Yaptım:**
**Öğrendim:**
**Takıldım:**
**Sonraki adım:**

### Oturum 2 — ____ · Faz 1: İlk uygulama dev store'da açılıyor

**Hedef:** `shopify app dev` çalışsın, uygulama admin panelinde embedded görünsün.
Kod anlamak yok — sadece **çalışan bir şey görmek**.

**Adımlar, sırayla:**

1. **Partner hesabı** (ücretsiz): https://partners.shopify.com → Sign up.
   Ülke/işletme bilgisi ister; şahıs olarak da açılıyor.
2. **Development store** oluştur: Partners paneli → *Stores* → *Add store* →
   **Development store** → "Start with test data" seç (sahte ürün/sipariş gelsin).
   Adresi not al: `xxx.myshopify.com`.
3. **CLI kur** (macOS):
   ```bash
   brew tap shopify/shopify && brew install shopify-cli
   shopify version
   ```
   (Alternatif: `npm install -g @shopify/cli`)
4. **Uygulamayı oluştur** — Shopify'ın resmi başlangıç şablonu:
   ```bash
   cd ~/development/Projects
   shopify app init --name journey-app --template reactRouter --flavor typescript
   cd journey-app
   ```
   İlk çalıştırmada tarayıcıda Partner hesabına giriş isteyecek.
5. **Çalıştır:**
   ```bash
   shopify app dev
   ```
   Dev store'u seçtir. Terminalde çıkan **Preview URL**'e tıkla → *Install app* →
   uygulama admin'in içinde açılmalı. **İşte bu an Faz 1'in bitişi.**
6. Dosya yapısını 10 dk gez — **anlamaya çalışma**, sadece nerede ne var:
   `shopify.app.toml` (app config, scopes) · `app/routes/` (sayfalar) ·
   `app/shopify.server.ts` (kimlik doğrulama) · `prisma/` (session saklama).

**Muhtemel takılmalar:**
- Tünel/HTTPS uyarısı → CLI kendi tünelini açar, olduğu gibi bırak.
- "App already installed" → `shopify app dev --reset`
- Node sürümü hatası → Node 20+ kurulu olsun (`node -v`).

**Yaptım:**
**Öğrendim:**
**Takıldım:**
**Sonraki adım:**

### Oturum 3 — ____ · Faz 2: İstek nereden geliyor?

**Hedef:** Bir isteğin admin'den benim koduma nasıl ulaştığını çizebilmek.
**Yapılacak:** `app/shopify.server.ts` içindeki `authenticate.admin(request)` çağrısını takip et.
`app/routes/app._index.tsx`'e mağaza adını yazan bir satır ekle. Sayfayı yenile, değişikliği gör.
**Kontrol sorusu:** "Cookie yerine neden session token var?"

**Yaptım:**
**Öğrendim:**
**Takıldım:**
**Sonraki adım:**

---

## Kavram sözlüğü (kendi cümlelerimle)

Bir kavramı **kendi kelimelerinle** yazamıyorsan öğrenmemişsindir.
Resmî tanımlar [101](00-SHOPIFY-101.md)'de; buraya senin versiyonun gelir.

| Kavram | Benim cümlem |
|---|---|
| Embedded app | |
| Session token | |
| Scopes | |
| Webhook | |

## Açık sorular (cevap bulunca tarih at)

- [ ] Şablon neden React Router? SvelteKit ile Shopify app olur mu, zahmete değer mi?
- [ ] Template'te Prisma + SQLite var; prod'da session'ı nerede saklamalı?
- [ ] En az hangi scope'larla iş görülür? Fazla izin kurulum oranını ne kadar düşürüyor?
- [ ] App Store inceleme süreci ne kadar sürüyor, en sık ret sebepleri ne?
- [ ] Ortalama uninstall (churn) oranı ne? Hangi kategori daha yapışkan?
