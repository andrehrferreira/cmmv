> Bu dosya **ChatGPT** tarafından otomatik olarak çevrilmiştir.  
> Orijinal dokümantasyon **İngilizce ve Portekizce** olarak yazılmıştır.  
> Eğer çeviride hata bulursanız ve Türkçeye iyi derecede hakimseniz,  
> lütfen gözden geçirip **Pull Request (PR)** göndererek katkıda bulunun.  
> Topluluk, desteğiniz için size minnettar olacaktır! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Sözleşmeler kullanarak ölçeklenebilir ve modüler uygulamalar oluşturma.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Sürümü" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Lisans" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokümantasyon</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Sorun Bildir</a>
</p>

## Açıklama (Description)

CMMV (Contract Model View), web uygulama geliştirmede devrim yaratıyor; paradigmayı değiştirerek dijital projelerin nasıl oluşturulması, yönetilmesi ve ölçeklendirilmesi gerektiğini yeniden tanımlıyor. En iyi uygulamalardan ve yenilikçi yaklaşımlardan ilham alan CMMV, sözleşme sistemini entegre ederek güçlü ve güvenli yapıların otomatik olarak oluşturulmasını sağlıyor. Bu sayede manuel kod yazma karmaşıklığını ortadan kaldırarak eşsiz bir geliştirme deneyimi sunuyor.

TypeScript sözleşmelerinin uygulamanızın temelini oluşturduğunu hayal edin. CMMV, API'leri, denetleyicileri (controllers), ORM varlıklarını ve hatta ikili RPC iletişimini otomatik olarak oluşturur. Üstelik tüm bunlar optimize edilmiş performans ve modern teknolojilerle sorunsuz bir şekilde entegre edilir. CMMV sayesinde yalnızca geliştirme sürecini hızlandırmakla kalmaz, aynı zamanda kod kalitesini ve tutarlılığını da garanti altına alarak hata oranını ve yeniden iş yükünü önemli ölçüde azaltabilirsiniz.

Ayrıca, CMMV Vue 3 tabanlı, ancak React ve Angular gibi diğer frameworkleri de destekleyen reaktif ve hafif bir arayüz sunar. Performans ve SEO odaklı yapısıyla CMMV, ön yüzü (frontend) yalnızca bir sunum katmanı olmaktan çıkarıp, gerçek zamanlı olarak arka uç (backend) ile senkronize çalışan dinamik bir bileşen haline getirir.

İster deneyimli bir geliştirici olun ister yeni başlayan bir programcı, CMMV teknik engelleri ortadan kaldırarak güçlü, ölçeklenebilir ve modern sistemler oluşturmanıza olanak tanır. Bu yalnızca bir framework değil, web uygulamalarını inşa etmenin yeni bir yoludur.

## Felsefe (Philosophy)

CMMV, TypeScript'in güçlü tür sistemi ve dekoratörlerini (decorators) kullanarak geliştirme sürecini basitleştirmeyi hedefler. Ağır frontend frameworklerine ihtiyaç duymadan, veri bağlama (data binding) ve etkileşimler üzerinde doğrudan kontrol sağlarken modüler tasarım sayesinde esneklik sunar.

## Özellikler (Features)

- **Sözleşme Tabanlı Geliştirme:** TypeScript sözleşmeleri kullanarak modeller, denetleyiciler ve diğer bileşenleri tanımlayın.
- **Modüler Mimari:** Uygulamanızı modüller ile oluşturun, yönetimi ve ölçeklendirmeyi kolaylaştırın.
- **RPC & REST Desteği:** WebSocket üzerinden ikili RPC ve geleneksel REST API entegrasyonu.
- **Express Entegrasyonu:** Express ile kolayca entegre edilebilir, güçlü ve tanıdık bir HTTP sunucu ortamı sağlar.
- **Genişletilebilirlik:** Kendi modüllerinizi ve bileşenlerinizi ekleyerek sistemi kolayca özelleştirin.

## CLI ile Kurulum (Setup with CLI)

CMMV artık kurulumu kolaylaştırmak ve projeyi hızlı bir şekilde yapılandırmak için bir CLI (Komut Satırı Arayüzü) sunmaktadır.

Yeni bir proje başlatmak için aşağıdaki komutu kullanabilirsiniz:

```bash
$ pnpm dlx @cmmv/cli@latest create <proje-adı>
```

Bu komut, Vite, RPC, önbellekleme, veritabanı türü ve görünüm ayarları (Vue 3 veya Reaktivite gibi) dahil olmak üzere tercihlerinizi seçmenizi sağlayan bir kurulum sihirbazı başlatacaktır. Gerekli dosya ve klasörleri otomatik olarak oluşturur, bağımlılıkları ayarlar ve projeyi yapılandırır.

## Manuel Kurulum (Legacy Setup)

Projeyi manuel olarak kurmayı tercih ederseniz, gerekli modülleri tek tek yükleyebilirsiniz:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Hızlı Başlangıç (Quick Start)

Aşağıda yeni bir CMMV uygulamasının nasıl oluşturulacağına dair basit bir örnek bulunmaktadır:

```typescript
import { Application } from "@cmmv/core";
import { DefaultAdapter, DefaultHTTPModule } from "@cmmv/http";
import { ViewModule } from "@cmmv/view";
import { ApplicationModule } from "./app.module";

Application.create({
    httpAdapter: DefaultAdapter,    
    modules: [
        DefaultHTTPModule,                
        ViewModule,        
        ApplicationModule
    ],
    services: [Repository],
    contracts: [...]
});
```

# Özellikler (Features)

## 🟢 Çekirdek (Core)
- [x] Uygulama kontrolü, sözleşme yükleme, modeller ve model oluşturma
- [x] Transpiler oluşturma için temel yapı
- [x] HTTP, WS, sözleşmeler ve hizmetler için çekirdek soyutlama
- [x] Singleton sınıfı için temel uygulama
- [x] Sözleşme, hook, meta veriler ve hizmet dekoratörleri
- [x] Tüm modüllerde yapılandırma doğrulama ve erişim kontrolü
- [x] Hook sistemi
- [x] Telemetri ve günlük kaydı (Logging)
- [x] Kayıt oluşturma altyapısı

## 🔐 Kimlik Doğrulama (Auth)
- [x] Genel uygulama erişim kontrolü
- [x] Yerel kullanıcı kaydı ve oturum açma
- [ ] Sağlayıcı (Google, Facebook vb.) ile giriş desteği
- [x] reCAPTCHA desteği
- [x] Oturum yenileme için yenileme belirteci (refresh token)
- [x] QR kod oluşturma ve doğrulama ile tam 2FA desteği
- [x] Parmak izi, IP ve user-agent tabanlı oturum yönetimi

## 🚀 Önbellekleme (Cache)
- [x] Redis, Memcached, MongoDB veya ikili dosyalar ile bellek içi önbellekleme
- [x] Kontrolörler ve ağ geçitleri için basit entegrasyon dekoratörleri
- [x] Sözleşmelerle otomatik entegrasyon
- [x] Önbelleğe alınan verileri almak, güncellemek veya kaldırmak için API

## 🌐 HTTP
- [x] `@cmmv/server` veya Express gibi diğer adaptörler üzerinden API erişimi
- [x] Otomatik kontrolör ve hizmet oluşturma
- [x] `@cmmv/cache` ve `@cmmv/auth` ile entegrasyon
- [x] Express adaptörü
- [ ] Fastify adaptörü

## 📡 Protobuf
- [x] Sözleşmelere dayalı RPC iletişimi için `.proto` dosya oluşturma
- [x] TypeScript için arayüz ve tür tanımlamaları oluşturma
- [x] Ön uç kullanımına yönelik JSON sözleşme oluşturma
- [x] Sözleşmeler arası bağlantı

## 🗄 Depo (Repository)
- [x] SQL, MySQL, PostgreSQL, SQL Server, Oracle ve MongoDB desteği
- [x] TypeORM için otomatik varlık (entity) oluşturma
- [x] Otomatik indeks oluşturma
- [x] Otomatik ilişki oluşturma
- [x] Veri doğrulama
- [x] RPC ve REST için CRUD işlemleri
- [x] Arama filtreleri (sıralama, ID filtreleme, sayfalama)
- [x] Doğrudan veritabanı entegrasyonu için hizmet geçersiz kılma
- [x] `@cmmv/cache`, `@cmmv/auth` ile entegrasyon

## ⏳ Zamanlama (Scheduling)
- [x] Zamanlanmış görevler (cron) oluşturmak için dekoratörler
- [x] Zamanlanmış görev yönetimi

## 🎨 Görünüm (View)
- [x] SEO optimizasyonu için SSR desteği
- [x] EJS benzeri dinamik şablonlar
- [x] Express ile uyumlu görünüm motoru
- [x] Uluslararasılaştırma (i18n) desteği
- [x] HTML içinde alt görünümleri doğrudan ekleme
- [x] Dinamik meta veri yönetimi (script, bağlantılar, meta, başlık, başlık etiketi)
- [x] CSS ve JavaScript paketleme
- [x] Şeffaf RPC entegrasyonu

## 🔄 WebSocket (WS)
- [x] RPC iletişim ağ geçitlerini otomatik oluşturma
- [x] Veri paketleme soyutlaması
- [x] Hem istemci hem de sunucu için WebSocket iletişimi uygulaması

## 🧩 Modüller (Modules)
- [x] **Swagger:** Swagger entegrasyonu ile API dokümantasyonu
- [x] **Testing:** Birim testleri, S2S testleri ve sahte (mock) testler
- [x] **Elastic:** Elasticsearch entegrasyonu, dizin ve belge yönetimi
- [x] **Email:** SMTP veya AWS SES kullanarak e-posta yönetimi
- [x] **Encryptor:** ECC tabanlı şifreleme, AES-256-GCM
- [x] **Events:** Olay (event-driven) tabanlı mimari
- [x] **Inspector:** Hata ayıklama ve izleme araçları
- [x] **Keyv:** Key-value veri deposu entegrasyonu
- [x] **Normalizer:** JSON, XML, YAML, CSV için veri dönüştürme modülü
- [x] **Queue:** İş kuyruğu yönetimi (Kafka, RabbitMQ, Redis)
- [x] **UI:** Dinamik uygulamalar için UI bileşenleri
- [x] **Vue:** Vue.js entegrasyon desteği