<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Ndërtimi i aplikacioneve të shkallëzueshme dhe modulare duke përdorur kontrata.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Version" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Package License" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentacioni</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Raporto një problem</a>
</p>

> ⚠ **Mohim përgjegjësie**  
> Ky përkthim është gjeneruar automatikisht nga ChatGPT. Dokumentacioni origjinal është shkruar në **anglisht dhe portugalisht**.  
> Nëse gjeni ndonjë informacion të pasaktë dhe keni njohuri të gjuhës përkatëse, ndjehuni të lirë të rishikoni dhe të dërgoni një **Pull Request (PR)** për korrigjim.  
> E gjithë komuniteti ju falënderon për kontributin tuaj! 🙌 

## Përshkrimi

CMMV (Contract Model View) është një revolucion në zhvillimin e aplikacioneve në ueb, duke thyer paradigmat dhe ridizajnuar mënyrën se si krijojmë, mirëmbajmë dhe shkallëzojmë projektet dixhitale. I frymëzuar nga praktikat më të mira dhe konceptet inovative, CMMV integron fuqinë e kontratave për të gjeneruar automatikisht struktura të fuqishme dhe të sigurta, duke eliminuar kompleksitetin e kodimit manual dhe duke ofruar një përvojë zhvillimi të paprecedentë.

Imagjinoni një platformë ku përcaktimi i kontratave në TypeScript bëhet zemra e aplikacionit tuaj, duke gjeneruar automatikisht API, kontrollues, entitete ORM dhe madje edhe komunikim përmes RPC binar, gjithçka me performancë të optimizuar dhe integrim të përsosur me teknologjitë më moderne. Me CMMV, jo vetëm që përshpejtoni zhvillimin, por gjithashtu siguroni cilësinë dhe konsistencën e kodit tuaj, duke reduktuar ndjeshëm gabimet dhe punën e tepërt.

Për më tepër, CMMV ofron një ndërfaqe reaktive dhe të lehtë, e bazuar në Vue 3, por me aftësinë për të mbështetur korniza të tjera si React dhe Angular, gjithmonë duke u fokusuar në performancë dhe SEO. Me CMMV, frontend-i nuk është thjesht një shtresë prezantimi, por një pjesë integrale dhe dinamike e aplikacionit tuaj, e sinkronizuar në kohë reale me backend-in.

Pavarësisht nëse jeni një zhvillues me përvojë apo një fillestar në programim, CMMV fuqizon të gjithë për të ndërtuar sisteme të fuqishme, të shkallëzueshme dhe moderne, duke eliminuar barrierat teknike dhe duke lejuar që kreativiteti dhe inovacioni të jenë në qendër të rrugëtimit tuaj të zhvillimit. Nuk është vetëm një framework; është një mënyrë e re për të menduar dhe ndërtuar të ardhmen e aplikacioneve në ueb.

## Filozofia

CMMV synon të thjeshtojë procesin e zhvillimit duke përdorur fuqinë e sistemit të tipave dhe dekoratorëve të TypeScript. Ai eliminon nevojën për korniza të rënda frontend duke u përqendruar në kontrollin e drejtpërdrejtë mbi lidhjen e të dhënave dhe ndërveprimet, duke ruajtur fleksibilitetin përmes dizajnit modular.

## Karakteristikat

- **Zhvillim i bazuar në kontrata:** Përdorni kontrata TypeScript për të përcaktuar modele, kontrollues dhe më shumë.
- **Arkitekturë modulare:** Përbëni aplikacionin tuaj duke përdorur module, duke e bërë të lehtë menaxhimin dhe shkallëzimin.
- **Mbështetje për RPC dhe REST:** Mbështetje e integruar për RPC binar përmes WebSocket dhe API tradicionale REST.
- **Integrim me Express:** Integrim i përsosur me Express për një mjedis serveri HTTP të njohur dhe të fuqishëm.
- **E zgjerueshme:** E personalizueshme dhe e lehtë për t'u zgjeruar me modulet dhe komponentët tuaj.

## Konfigurimi me CLI

CMMV tani ofron një CLI (Command Line Interface) për të përshpejtuar procesin e instalimit dhe për të konfiguruar shpejt projektin tuaj me cilësimet e dëshiruara.

Për të inicializuar një projekt të ri, mund të përdorni komandën e mëposhtme:

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

Kjo komandë do t'ju udhëzojë përmes një procesi të drejtuar të konfigurimit, duke ju pyetur për cilësimet tuaja të preferuara, si aktivizimi i Vite, RPC, caching, lloji i depozitës dhe konfigurimi i shikimit (p.sh., Vue 3 ose Reactivity). Ai do të krijojë automatikisht skedarët dhe dosjet e nevojshme, do të konfigurojë varësitë dhe do të përgatisë projektin.

## Konfigurimi manual (Legacy)

Nëse preferoni të konfiguroni projektin manualisht, mund të instaloni ende modulet e nevojshme individualisht:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Fillimi i shpejtë

Më poshtë është një shembull i thjeshtë se si të krijoni një aplikacion të ri CMMV:

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

# Karakteristikat

## 🟢 Bërthama
- [x] Kontrolli i aplikacionit, ngarkimi i kontratave, modelet dhe gjenerimi i modeleve
- [x] Bazë për krijimin e transpiluesve
- [x] Abstraktimi bazë për HTTP, WS, kontratat dhe shërbimet
- [x] Implementimi bazë për klasën Singleton
- [x] Dekoratorë për kontrata, hook-e, metadata dhe shërbime
- [x] Kontrolli dhe validimi i konfigurimeve të arritshme në të gjitha modulet
- [x] Sistemi i hook-eve
- [x] Telemetri dhe regjistrimi i ngjarjeve
- [x] Bazë për krijimin e regjistrave

## 🔐 Autentifikimi
- [x] Kontrolli i përgjithshëm i aksesit të aplikacionit
- [x] Regjistrimi dhe hyrja lokale e përdoruesit
- [ ] Hyrja përmes ofruesve (Google, Facebook, etj.)
- [x] reCAPTCHA
- [x] Token i rifreskimit për rinovimin e sesioneve
- [x] Mbështetje e plotë për 2FA me gjenerimin dhe verifikimin e QR-Code
- [x] Kontrolli i sesionit bazuar në gjurmët e gishtave, IP dhe user agent

## 🚀 Cache
- [x] Përgjigje të optimizuara të sistemit duke përdorur cache në kujtesë, të përputhshme me Redis, Memcached, MongoDB ose skedarë binarë
- [x] Dekoratorë për integrim të thjeshtë në kontrollues dhe gateways
- [x] Integrim automatik me kontratat
- [x] API për rikuperimin, përditësimin ose fshirjen e të dhënave të cache-it

## 🌐 HTTP
- [x] Ofrimi i API-ve përmes `@cmmv/server` ose adaptuesve si Express
- [x] Gjenerimi automatik i kontrolluesve dhe shërbimeve
- [x] Integrimi me `@cmmv/cache` dhe `@cmmv/auth`
- [x] Adaptuesi për Express
- [ ] Adaptuesi për Fastify

## 📡 Protobuf
- [x] Gjenerimi i skedarëve `.proto` për komunikimin RPC bazuar në kontrata
- [x] Gjenerimi i ndërfaqeve dhe përkufizimeve të tipeve për TypeScript
- [x] Gjenerimi i kontratave JSON për përdorim në frontend
- [x] Lidhja e ndërsjellë midis kontratave

## 🗄 Repository
- [x] Integrimi me SQL, MySQL, PostgreSQL, SQL Server, Oracle dhe MongoDB
- [x] Krijimi automatik i entiteteve për TypeORM
- [x] Gjenerimi automatik i indekseve
- [x] Krijimi automatik i marrëdhënieve midis tabelave
- [x] Validimi i të dhënave
- [x] Operacione CRUD për RPC dhe REST
- [x] Filtrimi i kërkimeve (renditja, filtrimi sipas ID-së, paginimi)
- [x] Mbitëdhënia e shërbimeve për integrim të drejtpërdrejtë me repository
- [x] Integrimi me `@cmmv/cache`, `@cmmv/auth`

## ⏳ Planifikimi i detyrave
- [x] Dekoratorë për krijimin e detyrave të planifikuara (cron)
- [x] Menaxhimi i detyrave të planifikuara

## 🎨 Shfaqja (View)
- [x] SSR për optimizim SEO
- [x] Template dinamike të ngjashme me EJS
- [x] Motor shfaqjeje i përputhshëm me Express
- [x] Mbështetje për ndërkombëtarizimin
- [x] Përfshirje e drejtpërdrejtë e nën-shfaqjeve në HTML
- [x] Menaxhimi dinamik i metadata-ve (skriptet, lidhjet, meta, header, title)
- [x] Paketimi i përbërësve CSS dhe JavaScript
- [x] Integrim transparent për RPC

## 🔄 WS (WebSocket)
- [x] Gjenerimi automatik i gateways për komunikim RPC
- [x] Abstraktimi i paketimit të të dhënave
- [x] Implementimi i komunikimit WebSocket si për klientin ashtu edhe për serverin

## 🧩 Modulet
- [x] **Swagger**: Siguron dokumentimin e API-ve me integrim të Swagger.  
- [x] **Testing**: Përfshin testime njësie, testime S2S dhe mocks.  
- [x] **Elastic**: Integrim me Elasticsearch për menaxhimin e indekseve dhe dokumenteve.  
- [x] **Email**: Modul për dërgimin e e-maileve duke përdorur SMTP ose AWS SES.  
- [x] **Encryptor**: Kriptim bazuar në ECC, AES-256-GCM.  
- [x] **Events**: Arkitekturë e drejtuar nga ngjarjet për komunikim efikas.  
- [x] **Inspector**: Mjete për debugging dhe monitorim.  
- [x] **Keyv**: Integrim me depozitim të çelësave dhe vlerave duke përdorur Keyv.  
- [x] **Normalizer**: Modul për transformimin e të dhënave dhe parsing (JSON, XML, YAML, CSV).  
- [x] **Queue**: Menaxhon radhët e punëve (Kafka, RabbitMQ, Redis).  
- [x] **UI**: Komponentë UI për ndërtimin e aplikacioneve dinamike.  
- [x] **Vue**: Mundëson integrimin me Vue.js.  
