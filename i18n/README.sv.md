> Den här filen har automatiskt översatts med **ChatGPT**.  
> Den ursprungliga dokumentationen är skriven på **engelska och portugisiska**.  
> Om du hittar fel i översättningen och har god kunskap i svenska,  
> tveka inte att granska och skicka in en **Pull Request (PR)**.  
> Hela communityn kommer att vara mycket tacksam för ditt bidrag! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Bygga skalbara och modulära applikationer med kontrakt.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM-version" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Paketlicens" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentation</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Rapportera problem</a>
</p>

## Beskrivning (Description)

CMMV (Contract Model View) är en revolution inom webbutveckling, bryter paradigmer och omdefinierar hur vi skapar, underhåller och skalar digitala projekt. Inspirerad av bästa praxis och innovativa koncept integrerar CMMV kraften i kontrakt för att automatiskt generera robusta och säkra strukturer, vilket eliminerar komplexiteten i manuell kodning och ger en oöverträffad utvecklingsupplevelse.

Föreställ dig en plattform där definitionen av kontrakt i TypeScript blir hjärtat i din applikation, automatiskt genererar API:er, controllers, ORM-entiteter och till och med binär RPC-kommunikation – allt med optimerad prestanda och sömlös integration med de modernaste teknologierna. Med CMMV accelererar du inte bara utvecklingen utan säkerställer också kodkvalitet och konsekvens, vilket drastiskt minskar fel och omarbetning.

Dessutom erbjuder CMMV ett reaktivt och lätt gränssnitt, baserat på Vue 3, men med stöd för andra ramverk som React och Angular, alltid med fokus på prestanda och SEO. Med CMMV är frontend inte bara ett presentationslager, utan en integrerad och dynamisk del av din applikation, synkroniserad i realtid med backend.

Oavsett om du är en erfaren utvecklare eller nybörjare inom programmering, ger CMMV alla möjlighet att bygga kraftfulla, moderna och skalbara system genom att eliminera tekniska hinder och sätta kreativitet och innovation i centrum för din utvecklingsresa. Det är mer än ett ramverk – det är ett nytt sätt att tänka och bygga framtidens webbtillämpningar.

## Filosofi (Philosophy)

CMMV syftar till att förenkla utvecklingsprocessen genom att utnyttja TypeScripts kraftfulla typer och dekorationer. Det eliminerar behovet av tunga frontend-ramverk genom att fokusera på direkt kontroll över databindning och interaktioner, samtidigt som det behåller flexibiliteten genom modulär design.

## Funktioner (Features)

- **Kontraktsdriven utveckling:** Använd TypeScript-kontrakt för att definiera modeller, controllers och mer.
- **Modulär arkitektur:** Bygg din applikation med moduler, vilket gör det enkelt att hantera och skala.
- **RPC & REST-stöd:** Integrerat stöd för både binär RPC via WebSocket och traditionella REST-API:er.
- **Express-integration:** Sömlös integration med Express för en robust och välbekant HTTP-servermiljö.
- **Utbyggbart:** Mycket anpassningsbart och enkelt att utöka med egna moduler och komponenter.

## Installation med CLI (Setup with CLI)

CMMV tillhandahåller nu ett CLI (Command Line Interface) för att effektivisera installationsprocessen och snabbt konfigurera ditt projekt med önskade inställningar.

För att initiera ett nytt projekt, använd följande kommando:

```bash
$ pnpm dlx @cmmv/cli@latest create <projekt-namn>
```

Detta kommando guidar dig genom en installationsprocess där du kan välja preferenser såsom aktivering av Vite, RPC, cache, lagringstyp och vyinställningar (t.ex. Vue 3 eller Reactivity). Det kommer automatiskt att skapa de nödvändiga filerna och mapparna, ställa in beroenden och konfigurera projektet.

## Manuell installation (Legacy Setup)

Om du föredrar att manuellt konfigurera projektet kan du fortfarande installera de nödvändiga modulerna individuellt:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Snabbstart (Quick Start)

Nedan finns ett enkelt exempel på hur du skapar en ny CMMV-applikation:

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

# Funktioner (Features)

## 🟢 Kärna (Core)
- [x] Applikationskontroll, kontraktsladdning, modeller och modellgenerering
- [x] Grundläggande stöd för att skapa transpilers
- [x] Kärnabstraktion för HTTP, WS, kontrakt och tjänster
- [x] Grundläggande implementering av Singleton-klass
- [x] Dekoratorer för kontrakt, hooks, metadata och tjänster
- [x] Validering av konfiguration och åtkomstkontroll i alla moduler
- [x] Hook-system
- [x] Telemetri och loggning
- [x] Grundläggande system för register

## 🔐 Autentisering (Auth)
- [x] Generell åtkomstkontroll för applikationen
- [x] Lokal användarregistrering och inloggning
- [ ] Inloggning via leverantör (Google, Facebook, etc.)
- [x] reCAPTCHA
- [x] Uppdateringstoken för att förnya sessioner
- [x] Fullständigt stöd för 2FA med QR-kodgenerering och verifiering
- [x] Sessionskontroll baserad på fingeravtryck, IP och användaragent

## 🚀 Cache
- [x] Optimerade systemresponser med in-memory cache kompatibel med Redis, Memcached, MongoDB eller binära filer
- [x] Enkla integrationsdekorer för controllers och gateways
- [x] Automatisk integration med kontrakt
- [x] API för att hämta, uppdatera eller ta bort cachelagrade data

## 🌐 HTTP
- [x] API-tillgänglighet via `@cmmv/server` eller andra adaptrar som Express
- [x] Automatisk generering av controllers och tjänster
- [x] Integration med `@cmmv/cache` och `@cmmv/auth`
- [x] Express-adapter
- [ ] Fastify-adapter

## 📡 Protobuf
- [x] Generering av `.proto`-filer för RPC-kommunikation baserat på kontrakt
- [x] Generering av gränssnitt och typdefinitioner för TypeScript
- [x] JSON-kontraktsgenerering för frontend-användning
- [x] Länkning av kontrakt

## 🗄 Databas (Repository)
- [x] Integration med SQLite, MySQL, PostgreSQL, SQL Server, Oracle och MongoDB
- [x] Automatisk entitetsgenerering för TypeORM
- [x] Automatisk indexgenerering
- [x] Automatisk generering av relationer
- [x] Datavalidering
- [x] CRUD-operationer för RPC och REST
- [x] Sökningsfilter (sortering, ID-filter, paginering)
- [x] Överskridande av tjänster för direkt databasintegration
- [x] Integration med `@cmmv/cache`, `@cmmv/auth`

## ⏳ Schemaläggning (Scheduling)
- [x] Dekoratorer för schemalagda uppgifter (cron)
- [x] Hantering av schemalagda uppgifter

## 🎨 Vy (View)
- [x] SSR för SEO-optimering
- [x] Dynamiska mallar liknande EJS
- [x] Vy-motor kompatibel med Express
- [x] Stöd för internationalisering (i18n)
- [x] Direkt inkludering av underordnade vyer i HTML
- [x] Dynamisk metadatahantering (skript, länkar, meta, header, titel)
- [x] Bundling av CSS och JavaScript
- [x] Transparent RPC-integration

## 🔄 WebSocket (WS)
- [x] Automatisk generering av RPC-gateways för kommunikation
- [x] Abstraktion för datapaketering
- [x] WebSocket-kommunikationsimplementering för både klient och server

## 🧩 Moduler (Modules)
- [x] **Swagger:** API-dokumentation med Swagger-integration
- [x] **Testing:** Inkluderar enhetstester, S2S-tester och mocks
- [x] **Elastic:** Elasticsearch-integration för hantering av index och dokument
- [x] **Email:** Modul för e-posthantering via SMTP eller AWS SES
- [x] **Encryptor:** ECC-baserad kryptering, AES-256-GCM
- [x] **Events:** Händelsedriven arkitektur för smidig kommunikation
- [x] **Inspector:** Verktyg för felsökning och övervakning
- [x] **Keyv:** Key-value store-integration med Keyv
- [x] **Normalizer:** Modul för datatransformation och parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Hantering av jobbköer (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI-komponenter för att bygga dynamiska applikationer
- [x] **Vue:** Möjliggör integration med Vue.js