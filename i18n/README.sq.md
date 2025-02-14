> Ky skedar është përkthyer automatikisht duke përdorur **ChatGPT**.  
> Dokumentacioni origjinal është shkruar në **anglisht dhe portugalisht**.  
> Nëse gjeni ndonjë gabim në përkthim dhe keni njohuri të mira të gjuhës shqipe,  
> ju lutemi rishikoni atë dhe dërgoni një **Pull Request (PR)**.  
> E gjithë komuniteti do t'ju jetë mirënjohës për kontributin tuaj! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Krijimi i aplikacioneve të shkallëzueshme dhe modulare duke përdorur kontrata.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versioni NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licenca e Paketës" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentacioni</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Raporto një problem</a>
</p>

## Përshkrimi (Description)

CMMV (Contract Model View) është një revolucion në zhvillimin e aplikacioneve në ueb, duke thyer paradigmën dhe duke përcaktuar se si krijojmë, mbajmë dhe shkallëzojmë projektet digjitale. I frymëzuar nga praktikat më të mira dhe konceptet inovative, CMMV integron fuqinë e kontratave për të gjeneruar automatikisht struktura të forta dhe të sigurta. Kjo eleminon kompleksitetin e kodit manual dhe ofron një përvojë zhvillimi të paimagjinueshme.

Imagjinoni një platformë ku definimi i kontratave në TypeScript bëhet zemra e aplikacionit tuaj, duke gjeneruar automatikisht API, kontrollues, entitete ORM dhe madje edhe komunikim përmes RPC binar, të gjitha me performancë të optimizuar dhe integrim të qetë me teknologjitë më moderne. Me CMMV, ju nuk po vetëm shpejtoni zhvillimin, por gjithashtu siguroheni që cilësia dhe konsistenca e kodit tuaj janë të siguruara, duke reduktuar ndjeshëm gabimet dhe rishkrimin.

Për më tepër, CMMV ofron një ndërfaqe reaktive dhe të lehtë, të bazuar në Vue 3, por me mundësinë për të mbështetur edhe framework të tjerë si React dhe Angular, gjithmonë duke u fokusuar në performancën dhe SEO. Me CMMV, frontend nuk është vetëm një shtresë prezantimi, por një pjesë integrale dhe dinamike e aplikacionit tuaj, e sinkronizuar në kohë reale me backend.

Pavarësisht nëse jeni një zhvillues i përvojë ose një fillestar në programim, CMMV u mundëson të gjithëve të ndërtojnë sisteme të fuqishme, moderne dhe të shkallëzueshme duke eliminuar pengesat teknike dhe duke lejuar që krijimtaria dhe inovacioni të jenë në qendër të udhëtimit tuaj të zhvillimit. Është më shumë sesa një framework; është një mënyrë e re për të menduar dhe ndërtuar të ardhmen e aplikacioneve në ueb.

## Filozofia (Philosophy)

CMMV ka për qëllim të thjeshtojë procesin e zhvillimit duke përdorur sistemin e fortë të tipeve dhe dekoratorëve të TypeScript. Kjo eliminon nevojën për framework të rëndë frontend duke u fokusuar në kontrollin direkt të lidhjes së të dhënave dhe ndërveprimeve, duke mbajtur fleksibilitetin përmes dizajnit modular.

## Karakteristikat (Features)

- **Zhvillimi i bazuar në kontrata:** Përdorni kontratat TypeScript për të definuar modele, kontrollues dhe më shumë.
- **Arkitektura modulare:** Krijoni aplikacionin tuaj duke përdorur modulet, duke e bërë atë të lehtë për t'u menaxhuar dhe shkallëzuar.
- **Përkrahje për RPC dhe REST:** Mbështetje e integruar për RPC binar përmes WebSocket dhe API REST tradicionale.
- **Integrimi me Express:** Integrim pa probleme me Express për një mjedis serveri HTTP të njohur dhe të fortë.
- **I zgjerueshëm (Extensible):** Përshtatshmëri e lartë dhe lehtë për t'u zgjeruar me modulet dhe komponentët tuaj.

## Konfigurimi me CLI (Setup with CLI)

CMMV tani ofron një CLI (Command Line Interface) për të lehtësuar procesin e instalimit dhe për të konfiguruar shpejt projektin tuaj me parametrat e dëshiruar.

Për të filluar një projekt të ri, mund të përdorni këtë komandë:

```bash
$ pnpm dlx @cmmv/cli@latest create <emri-i-projektit>
```

Kjo komandë do t'ju kalojë përmes një procesi konfigurimi të udhëzuar, ku do të pyeteni për opsionet e preferuara, si aktivizimi i Vite, RPC, caching, tipi i repositorit dhe konfigurimi i pamjes (p.sh., Vue 3 ose Reactivity). Kjo do të gjenerojë automatikisht skedarët dhe dosjet e nevojshme, do të vendosë varësitë dhe do të konfigurojë projektin.

## Konfigurimi manual (Legacy Setup)

Nëse preferoni të konfiguroni projektin manualisht, mund të instaloni modulet e nevojshme ndaras:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Fillimi i shpejtë (Quick Start)

Këtu është një shembull i thjeshtë se si mund të krijoni një aplikacion të ri CMMV:

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

# Karakteristikat (Features)

## 🟢 Bërthama (Core)
- [x] Kontrolli i aplikacionit, ngarkimi i kontratave, modelet dhe gjenerimi i modeleve
- [x] Baza për krijimin e transpilerëve
- [x] Abstraksioni i bërthamës për HTTP, WS, kontratat dhe shërbimet
- [x] Implementimi bazë për klasën Singleton
- [x] Dekoratorët për kontratat, hooks, metadatat dhe shërbimet
- [x] Validimi i konfigurimeve dhe kontrolli i aksesit për të gjitha modulet
- [x] Sistemi i Hooks
- [x] Telemetria dhe regjistrimi i logjeve
- [x] Baza për krijimin e regjistrave

## 🔐 Autentikimi (Auth)
- [x] Kontrolli i aksesit të përgjithshëm të aplikacionit
- [x] Regjistrimi dhe kyçja e përdoruesve lokalë
- [ ] Kyçja përmes ofruesve (Google, Facebook, etj.)
- [x] reCAPTCHA
- [x] Token rifreskimi për rinovimin e seancës
- [x] Mbështetje e plotë për 2FA me gjenerimin dhe verifikimin e QR-kodit
- [x] Kontrolli i seancës bazuar në gishta, IP dhe agjentin e përdoruesit

## 🚀 Cache
- [x] Përgjigje të optimizuara të sistemit duke përdorur cache-në në memorie të përputhshme me Redis, Memcached, MongoDB ose skedarët binarë
- [x] Dekoratorë të thjeshtë integrimi për kontrolluesit dhe gateway-t
- [x] Integrim automatik me kontratat
- [x] API për të marrë, përditësuar ose fshirë të dhënat e cache-uara

## 🌐 HTTP
- [x] Disponueshmëria e API-së përmes `@cmmv/server` ose adapterëve të tjerë si Express
- [x] Gjenerimi automatik i kontrolluesve dhe shërbimeve
- [x] Integrimi me `@cmmv/cache` dhe `@cmmv/auth`
- [x] Adapter Express
- [ ] Adapter Fastify

## 📡 Protobuf
- [x] Gjenerimi i skedarëve `.proto` për komunikim RPC bazuar në kontrata
- [x] Gjenerimi i ndërfaqeve dhe definicioneve të tipeve për TypeScript
- [x] Gjenerimi i kontratave JSON për përdorim në frontend
- [x] Lidhja ndër-kontraktuale

## 🗄 Repository
- [x] Integrimi me SQL, MySQL, PostgreSQL, SQL Server, Oracle dhe MongoDB
- [x] Gjenerimi automatik i entiteteve për TypeORM
- [x] Gjenerimi automatik i indekseve
- [x] Gjenerimi automatik i lidhjeve
- [x] Validimi i të dhënave
- [x] Operacione CRUD për RPC dhe REST
- [x] Filtra kërkimi (renditja, filtrimi i ID-ve, faqosja)
- [x] Zëvendësimi i shërbimeve për integrim direkt me repository
- [x] Integrimi me `@cmmv/cache`, `@cmmv/auth`

## ⏳ Planifikimi i detyrave (Scheduling)
- [x] Dekoratorë për krijimin e detyrave të planifikuara (cron)
- [x] Menaxhimi i detyrave të planifikuara

## 🎨 Pamja (View)
- [x] SSR për optimizimin e SEO
- [x] Shabllone dinamike të ngjashme me EJS
- [x] Motor shfaqjeje i përputhshëm me Express
- [x] Mbështetje për internacionalizimin (i18n)
- [x] Inkludimi direkt i nën-shfaqjeve në HTML
- [x] Menaxhimi dinamik i metadates (skripte, lidhje, meta, tituj, headers)
- [x] Kompilimi i CSS dhe JavaScript i bashkuar
- [x] Integrimi i qartë i RPC

## 🔄 WebSocket (WS)
- [x] Gjenerimi automatik i portave të komunikimit RPC
- [x] Abstraksioni i paketimit të të dhënave
- [x] Implementimi i komunikimit WebSocket për klientët dhe serverët

## 🧩 Modulet (Modules)
- [x] **Swagger:** Dokumentimi i API-së me integrimin Swagger
- [x] **Testing:** Përfshin testimin e njësive, testimin S2S dhe mocks
- [x] **Elastic:** Integrimi me Elasticsearch për menaxhimin e indekseve dhe dokumenteve
- [x] **Email:** Moduli për menaxhimin e e-mailëve duke përdorur SMTP ose AWS SES
- [x] **Encryptor:** Shifrim bazuar në ECC, AES-256-GCM
- [x] **Events:** Arkitektura e bazuar në ngjarje për komunikim të qetë
- [x] **Inspector:** Mjete për debug dhe monitorim
- [x] **Keyv:** Integrimi i ruajtjes së çelësit-vlerë duke përdorur Keyv
- [x] **Normalizer:** Moduli i transformimit të të dhënave për parsimin (JSON, XML, YAML, CSV)
- [x] **Queue:** Menaxhimi i radhëve të punës (Kafka, RabbitMQ, Redis)
- [x] **UI:** Komponentët UI për ndërtimin e aplikacioneve dinamike
- [x] **Vue:** Mundëson integrimin me Vue.js