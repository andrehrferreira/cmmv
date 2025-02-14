> Fail ini telah diterjemahkan secara automatik menggunakan **ChatGPT**.  
> Dokumentasi asal ditulis dalam **Bahasa Inggeris dan Portugis**.  
> Jika anda menemui sebarang kesilapan dalam terjemahan dan mahir dalam Bahasa Melayu,  
> sila semak dan hantarkan **Pull Request (PR)**.  
> Seluruh komuniti akan berterima kasih atas sumbangan anda! 🙌 

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Membina aplikasi berskala dan modular menggunakan kontrak.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versi NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Lesen Pakej" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentasi</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Laporkan Isu</a>
</p>

## Penerangan (Description)

CMMV (Contract Model View) adalah revolusi dalam pembangunan aplikasi web, mengubah paradigma dan mentakrifkan semula bagaimana kita mencipta, mengekalkan, dan meningkatkan projek digital. Diilhamkan oleh amalan terbaik dan konsep inovatif, CMMV mengintegrasikan kuasa kontrak untuk menjana struktur yang kukuh dan selamat secara automatik. Ia menghapuskan kerumitan pengekodan manual dan memberikan pengalaman pembangunan yang luar biasa.

Bayangkan satu platform di mana definisi kontrak dalam TypeScript menjadi teras aplikasi anda, secara automatik menjana API, pengawal (controllers), entiti ORM, dan juga komunikasi RPC binari, semuanya dengan prestasi yang dioptimumkan dan integrasi lancar dengan teknologi moden. Dengan CMMV, anda bukan sahaja mempercepatkan pembangunan tetapi juga memastikan kualiti dan konsistensi kod anda, dengan ketara mengurangkan kesilapan dan kerja berulang.

Selain itu, CMMV menawarkan antara muka reaktif dan ringan yang berasaskan Vue 3 tetapi juga menyokong kerangka kerja lain seperti React dan Angular, dengan fokus pada prestasi dan SEO. Dengan CMMV, bahagian hadapan (frontend) bukan sekadar lapisan paparan tetapi merupakan bahagian integral dan dinamik aplikasi anda, disegerakkan dalam masa nyata dengan bahagian belakang (backend).

Sama ada anda seorang pembangun berpengalaman atau pemula dalam pengekodan, CMMV membolehkan sesiapa sahaja membina sistem yang berkuasa, moden, dan berskala dengan menghapuskan halangan teknikal dan meletakkan kreativiti serta inovasi di pusat pengalaman pembangunan anda. Ia lebih daripada sekadar kerangka kerja – ia adalah cara baru untuk berfikir dan membina masa depan aplikasi web.

## Falsafah (Philosophy)

CMMV bertujuan untuk memudahkan proses pembangunan dengan memanfaatkan sistem jenis yang kuat dalam TypeScript dan penggunaan dekorator. Ia menghapuskan keperluan untuk kerangka kerja hadapan yang berat dengan menumpukan kawalan langsung ke atas pengikatan data dan interaksi, sambil mengekalkan fleksibiliti melalui reka bentuk modular.

## Ciri-Ciri (Features)

- **Pembangunan Berasaskan Kontrak:** Gunakan kontrak TypeScript untuk mentakrifkan model, pengawal, dan banyak lagi.
- **Seni Bina Modular:** Susun aplikasi anda menggunakan modul untuk memudahkan pengurusan dan peningkatan skala.
- **Sokongan RPC & REST:** Sokongan terbina dalam untuk RPC binari melalui WebSocket dan API REST tradisional.
- **Integrasi Express:** Integrasi mudah dengan Express untuk menyediakan persekitaran pelayan HTTP yang kukuh dan biasa.
- **Boleh Dikembangkan:** Mudah untuk disesuaikan dan diperluaskan dengan modul dan komponen tersuai.

## Persediaan dengan CLI (Setup with CLI)

CMMV kini menyediakan CLI (Command Line Interface) untuk memudahkan proses pemasangan dan menyediakan projek anda dengan tetapan yang dikehendaki dengan pantas.

Untuk memulakan projek baru, gunakan arahan berikut:

```bash
$ pnpm dlx @cmmv/cli@latest create <nama-projek>
```

Arahan ini akan membimbing anda melalui proses persediaan berpandukan, membolehkan anda memilih tetapan seperti Vite, RPC, caching, jenis repositori, dan tetapan paparan (seperti Vue 3 atau Reactivity). Ia akan menjana fail dan folder yang diperlukan secara automatik, menetapkan kebergantungan, dan mengkonfigurasi projek anda.

## Persediaan Manual (Legacy Setup)

Jika anda lebih suka menyediakan projek secara manual, anda masih boleh memasang modul yang diperlukan secara individu:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Permulaan Pantas (Quick Start)

Di bawah ini adalah contoh ringkas bagaimana untuk mencipta aplikasi CMMV baru:

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

# Ciri-Ciri (Features)

## 🟢 Teras (Core)
- [x] Kawalan aplikasi, pemuatan kontrak, model, dan penjanaan model
- [x] Asas untuk mencipta transpiler
- [x] Abstraksi teras untuk HTTP, WS, kontrak, dan perkhidmatan
- [x] Implementasi asas kelas Singleton
- [x] Dekorator untuk kontrak, hook, metadata, dan perkhidmatan
- [x] Pengesahan konfigurasi dan kawalan akses merentasi semua modul
- [x] Sistem Hook
- [x] Telemetri dan pencatatan log
- [x] Asas untuk penciptaan pendaftaran

## 🔐 Pengesahan (Auth)
- [x] Kawalan akses aplikasi secara umum
- [x] Pendaftaran dan log masuk pengguna tempatan
- [ ] Log masuk melalui penyedia (Google, Facebook, dll.)
- [x] reCAPTCHA
- [x] Token pembaharuan untuk memperbaharui sesi
- [x] Sokongan penuh 2FA dengan penjanaan dan pengesahan QR-Code
- [x] Kawalan sesi berdasarkan cap jari, IP, dan agen pengguna

## 🚀 Cache
- [x] Respons sistem yang dioptimumkan menggunakan cache dalam memori yang serasi dengan Redis, Memcached, MongoDB, atau fail binari
- [x] Dekorator integrasi mudah untuk pengawal dan gateway
- [x] Integrasi automatik dengan kontrak
- [x] API untuk mendapatkan, mengemas kini, atau menghapuskan data yang di-cache

## 🌐 HTTP
- [x] Ketersediaan API melalui `@cmmv/server` atau adapter lain seperti Express
- [x] Penjanaan pengawal dan perkhidmatan secara automatik
- [x] Integrasi dengan `@cmmv/cache` dan `@cmmv/auth`
- [x] Adapter Express
- [ ] Adapter Fastify

## 📡 Protobuf
- [x] Penjanaan fail `.proto` untuk komunikasi RPC berdasarkan kontrak
- [x] Penjanaan antara muka dan definisi jenis untuk TypeScript
- [x] Penjanaan kontrak JSON untuk kegunaan frontend
- [x] Pautan silang antara kontrak

## 🗄 Repositori (Repository)
- [x] Integrasi dengan SQL, MySQL, PostgreSQL, SQL Server, Oracle, dan MongoDB
- [x] Penjanaan entiti secara automatik untuk TypeORM
- [x] Penjanaan indeks secara automatik
- [x] Penjanaan hubungan secara automatik
- [x] Pengesahan data
- [x] Operasi CRUD untuk RPC dan REST
- [x] Penapis carian (penyusunan, penapisan ID, penomboran halaman)
- [x] Penggantian perkhidmatan untuk integrasi langsung dengan repositori
- [x] Integrasi dengan `@cmmv/cache`, `@cmmv/auth`

## ⏳ Penjadualan (Scheduling)
- [x] Dekorator untuk penciptaan tugas berjadual (cron)
- [x] Pengurusan tugas berjadual

## 🎨 Paparan (View)
- [x] SSR untuk pengoptimuman SEO
- [x] Templat dinamik yang serupa dengan EJS
- [x] Enjin paparan yang serasi dengan Express
- [x] Sokongan untuk pengantarabangsaan (i18n)
- [x] Kemasukan sub-paparan secara langsung dalam HTML
- [x] Pengurusan metadata dinamik (skrip, pautan, meta, tajuk, header)
- [x] Penyusunan CSS dan JavaScript yang dibundel
- [x] Integrasi RPC secara telus

## 🔄 WebSocket (WS)
- [x] Penjanaan gerbang komunikasi RPC secara automatik
- [x] Abstraksi pembungkusan data
- [x] Pelaksanaan komunikasi WebSocket untuk kedua-dua klien dan pelayan

## 🧩 Modul (Modules)
- [x] **Swagger:** Menyediakan dokumentasi API dengan integrasi Swagger
- [x] **Testing:** Kini termasuk ujian unit, ujian S2S, dan mocks
- [x] **Elastic:** Integrasi Elasticsearch untuk menguruskan indeks dan dokumen
- [x] **Email:** Modul pengendalian e-mel menggunakan SMTP atau AWS SES
- [x] **Encryptor:** Penyulitan berasaskan ECC, AES-256-GCM
- [x] **Events:** Seni bina berasaskan acara untuk komunikasi yang lancar
- [x] **Inspector:** Alat untuk debugging dan pemantauan
- [x] **Keyv:** Integrasi penyimpanan kunci-nilai menggunakan Keyv
- [x] **Normalizer:** Modul transformasi data untuk parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Pengurusan barisan kerja (Kafka, RabbitMQ, Redis)
- [x] **UI:** Komponen UI untuk membina aplikasi dinamik
- [x] **Vue:** Membolehkan integrasi dengan Vue.js