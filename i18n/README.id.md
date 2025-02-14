> File ini diterjemahkan secara otomatis oleh **ChatGPT**.  
> Dokumentasi asli ditulis dalam **Bahasa Inggris dan Portugis**.  
> Jika Anda menemukan kesalahan dalam terjemahan dan memiliki pemahaman yang baik tentang bahasa Indonesia,  
> silakan tinjau dan kirimkan perbaikan Anda melalui **Pull Request (PR)**.  
> Komunitas akan sangat menghargai kontribusi Anda! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Membangun aplikasi yang skalabel dan modular menggunakan kontrak.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versi NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Lisensi Paket" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentasi</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Laporkan Masalah</a>
</p>

## Deskripsi (Description)

CMMV (Contract Model View) merevolusi pengembangan aplikasi web dengan mendobrak paradigma dan mendefinisikan kembali cara kita membuat, memelihara, dan meningkatkan proyek digital. Terinspirasi oleh praktik terbaik dan konsep inovatif, CMMV mengintegrasikan kekuatan kontrak untuk secara otomatis menghasilkan struktur yang kuat dan aman. Ini menghilangkan kompleksitas kode manual dan memberikan pengalaman pengembangan yang belum pernah ada sebelumnya.

Bayangkan platform di mana definisi kontrak dalam TypeScript menjadi inti aplikasi Anda, secara otomatis menghasilkan API, pengendali (controller), entitas ORM, dan bahkan komunikasi RPC biner dengan performa yang optimal serta integrasi yang mulus dengan teknologi modern. Dengan CMMV, Anda tidak hanya mempercepat pengembangan, tetapi juga memastikan kualitas dan konsistensi kode Anda, secara drastis mengurangi kesalahan dan pengerjaan ulang.

Selain itu, CMMV menawarkan antarmuka yang reaktif dan ringan, berbasis Vue 3, tetapi juga dapat mendukung framework lain seperti React dan Angular, dengan fokus utama pada performa dan SEO. Dengan CMMV, frontend bukan hanya lapisan presentasi, tetapi bagian integral dan dinamis dari aplikasi Anda, yang disinkronkan secara real-time dengan backend.

Baik Anda seorang pengembang berpengalaman atau pemula dalam pemrograman, CMMV memungkinkan siapa pun untuk membangun sistem modern yang kuat dan skalabel dengan menghilangkan hambatan teknis serta menempatkan kreativitas dan inovasi di pusat perjalanan pengembangan Anda. Ini lebih dari sekadar framework; ini adalah cara baru untuk berpikir dan membangun masa depan aplikasi web.

## Filosofi (Philosophy)

CMMV bertujuan untuk menyederhanakan proses pengembangan dengan memanfaatkan sistem tipe TypeScript yang kuat dan dekorator. Ini menghilangkan kebutuhan akan framework frontend yang berat dengan memberikan kontrol langsung atas data binding dan interaksi, sambil tetap mempertahankan fleksibilitas melalui desain modular.

## Fitur (Features)

- **Pengembangan Berbasis Kontrak:** Gunakan kontrak TypeScript untuk mendefinisikan model, controller, dan lainnya.
- **Arsitektur Modular:** Susun aplikasi Anda menggunakan modul, sehingga lebih mudah dikelola dan diperluas.
- **Dukungan RPC & REST:** Mendukung komunikasi RPC biner melalui WebSocket dan API REST tradisional.
- **Integrasi Express:** Integrasi mulus dengan Express untuk lingkungan server HTTP yang kuat dan familiar.
- **Dapat Diperluas:** Sangat dapat disesuaikan dan mudah diperluas dengan modul dan komponen Anda sendiri.

## Pengaturan dengan CLI (Setup with CLI)

CMMV sekarang menyediakan CLI (Command Line Interface) untuk menyederhanakan proses instalasi dan dengan cepat mengatur proyek Anda dengan konfigurasi yang diinginkan.

Untuk menginisialisasi proyek baru, gunakan perintah berikut:

```bash
$ pnpm dlx @cmmv/cli@latest create <nama-proyek>
```

Perintah ini akan membawa Anda melalui proses pengaturan yang dipandu, menanyakan preferensi seperti penggunaan Vite, RPC, caching, jenis repositori, dan pengaturan tampilan (misalnya, Vue 3 atau Reactivity). Ini akan secara otomatis membuat file dan folder yang diperlukan, mengatur dependensi, dan mengkonfigurasi proyek.

## Pengaturan Manual (Legacy Setup)

Jika Anda lebih suka mengatur proyek secara manual, Anda masih dapat menginstal modul yang diperlukan secara individual:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Memulai Cepat (Quick Start)

Di bawah ini adalah contoh sederhana tentang cara membuat aplikasi CMMV baru:

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

# Fitur (Features)

## 🟢 Inti (Core)
- [x] Kontrol aplikasi, pemuatan kontrak, model, dan pembuatan model
- [x] Basis untuk pembuatan transpiler
- [x] Abstraksi inti untuk HTTP, WS, kontrak, dan layanan
- [x] Implementasi dasar untuk kelas Singleton
- [x] Dekorator untuk kontrak, hook, metadata, dan layanan
- [x] Validasi konfigurasi dan kontrol akses di semua modul
- [x] Sistem Hooks
- [x] Telemetri dan pencatatan log
- [x] Basis untuk membuat registri

## 🔐 Otentikasi (Auth)
- [x] Kontrol akses aplikasi secara umum
- [x] Pendaftaran dan login pengguna lokal
- [ ] Login melalui penyedia (Google, Facebook, dll.)
- [x] reCAPTCHA
- [x] Token pembaruan untuk memperbarui sesi
- [x] Dukungan penuh 2FA dengan pembuatan dan validasi kode QR
- [x] Kontrol sesi berdasarkan sidik jari, IP, dan user agent

## 🚀 Cache
- [x] Respons sistem yang dioptimalkan menggunakan cache dalam memori yang kompatibel dengan Redis, Memcached, MongoDB, atau file biner
- [x] Dekorator integrasi sederhana untuk controller dan gateway
- [x] Integrasi otomatis dengan kontrak
- [x] API untuk mengambil, memperbarui, atau menghapus data cache

## 🌐 HTTP
- [x] Ketersediaan API melalui `@cmmv/server` atau adapter lain seperti Express
- [x] Pembuatan otomatis controller dan layanan
- [x] Integrasi dengan `@cmmv/cache` dan `@cmmv/auth`
- [x] Adapter Express
- [ ] Adapter Fastify

## 📡 Protobuf
- [x] Pembuatan file `.proto` untuk komunikasi RPC berdasarkan kontrak
- [x] Pembuatan antarmuka dan definisi tipe untuk TypeScript
- [x] Pembuatan kontrak JSON untuk penggunaan di frontend
- [x] Interlinking antar-kontrak

## 🗄 Repositori (Repository)
- [x] Integrasi dengan SQLite, MySQL, PostgreSQL, SQL Server, Oracle, dan MongoDB
- [x] Pembuatan entitas otomatis untuk TypeORM
- [x] Pembuatan indeks otomatis
- [x] Pembuatan hubungan otomatis
- [x] Validasi data
- [x] Operasi CRUD untuk RPC dan REST
- [x] Filter pencarian (pengurutan, penyaringan berdasarkan ID, paginasi)
- [x] Override layanan untuk integrasi repositori langsung
- [x] Integrasi dengan `@cmmv/cache`, `@cmmv/auth`

## ⏳ Penjadwalan (Scheduling)
- [x] Dekorator untuk pembuatan tugas terjadwal (cron)
- [x] Manajemen tugas terjadwal

## 🎨 Tampilan (View)
- [x] SSR untuk optimasi SEO
- [x] Template dinamis mirip dengan EJS
- [x] Mesin tampilan yang kompatibel dengan Express
- [x] Dukungan internasionalisasi (i18n)
- [x] Penyertaan sub-view langsung di HTML
- [x] Penanganan metadata dinamis (skrip, tautan, meta, header, judul)
- [x] Kompilasi CSS dan JavaScript terbundel
- [x] Integrasi RPC yang transparan

## 🔄 WebSocket (WS)
- [x] Pembuatan otomatis gateway komunikasi RPC
- [x] Abstraksi pengemasan data
- [x] Implementasi komunikasi WebSocket untuk klien dan server

## 🧩 Modul (Modules)
- [x] **Swagger:** Menyediakan dokumentasi API dengan integrasi Swagger.
- [x] **Testing:** Sekarang mencakup pengujian unit, pengujian S2S, dan mocks.
- [x] **Elastic:** Integrasi Elasticsearch untuk manajemen indeks dan dokumen.
- [x] **Email:** Modul penanganan email menggunakan SMTP atau AWS SES.
- [x] **Encryptor:** Enkripsi berbasis ECC, AES-256-GCM
- [x] **Events:** Arsitektur berbasis peristiwa untuk komunikasi yang mulus
- [x] **Inspector:** Alat debugging dan pemantauan
- [x] **Keyv:** Integrasi penyimpanan key-value menggunakan Keyv
- [x] **Normalizer:** Modul transformasi data untuk parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Mengelola antrean pekerjaan (Kafka, RabbitMQ, Redis)
- [x] **UI:** Komponen UI untuk membangun aplikasi dinamis
- [x] **Vue:** Memungkinkan integrasi dengan Vue.js