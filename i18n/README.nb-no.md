> Denne filen ble automatisk oversatt ved hjelp av **ChatGPT**.  
> Den opprinnelige dokumentasjonen ble skrevet på **engelsk og portugisisk**.  
> Hvis du finner feil i oversettelsen og har god kunnskap i norsk bokmål,  
> vennligst gjennomgå den og send inn en **Pull Request (PR)**.  
> Hele fellesskapet vil sette stor pris på ditt bidrag! 🙌 

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Bygging av skalerbare og modulære applikasjoner ved hjelp av kontrakter.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Versjon" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Pakke Lisens" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentasjon</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Rapporter problem</a>
</p>

## Beskrivelse (Description)

CMMV (Contract Model View) er en revolusjon innen webapplikasjonsutvikling, som bryter gamle paradigmer og redefinerer hvordan vi lager, vedlikeholder og skalerer digitale prosjekter. Inspirert av beste praksis og innovative konsepter, integrerer CMMV kraften i kontrakter for å generere robuste og sikre strukturer automatisk. Det eliminerer kompleksiteten i manuell koding og gir en enestående utviklingsopplevelse.

Tenk deg en plattform der definisjonen av kontrakter i TypeScript er hjertet i applikasjonen din, som automatisk genererer API-er, kontrollere, ORM-enheter og til og med kommunikasjon via binær RPC, alt med optimalisert ytelse og sømløs integrasjon med moderne teknologier. Med CMMV akselererer du ikke bare utviklingen, men sikrer også kvaliteten og konsistensen i koden din, samtidig som du reduserer feil og omarbeiding.

I tillegg tilbyr CMMV et reaktivt og lettvint grensesnitt, basert på Vue 3, men også med støtte for andre rammeverk som React og Angular, alltid med fokus på ytelse og SEO. Med CMMV er frontend ikke bare et presentasjonslag, men en integrert og dynamisk del av applikasjonen din, synkronisert i sanntid med backend.

Enten du er en erfaren utvikler eller en nybegynner, gir CMMV alle muligheten til å bygge kraftige, moderne og skalerbare systemer ved å eliminere tekniske barrierer og lar kreativitet og innovasjon være i sentrum. Det er mer enn bare et rammeverk; det er en ny måte å tenke og bygge fremtidens webapplikasjoner på.

## Filosofi (Philosophy)

CMMV har som mål å forenkle utviklingsprosessen ved å utnytte TypeScripts kraftige typesystem og dekoratører. Det eliminerer behovet for tunge frontend-rammeverk ved å fokusere på direkte kontroll over datalagring og interaksjoner, samtidig som det opprettholder fleksibilitet gjennom modulær design.

## Funksjoner (Features)

- **Kontrakt-drevet utvikling:** Bruk TypeScript-kontrakter for å definere modeller, kontrollere og mer.
- **Modulær arkitektur:** Bygg applikasjonen ved hjelp av moduler, som gjør det lettere å administrere og skalere.
- **RPC og REST-støtte:** Innebygd støtte for både binær RPC via WebSocket og tradisjonelle REST API-er.
- **Express-integrasjon:** Sømløs integrasjon med Express for et kjent og robust HTTP-servermiljø.
- **Utvidbar:** Høyt tilpassbar og lett å utvide med egne moduler og komponenter.

## Setup med CLI (Setup with CLI)

CMMV tilbyr nå et CLI (Command Line Interface) for å strømlinjeforme installasjonsprosessen og raskt sette opp prosjektet ditt med ønskede konfigurasjoner.

For å starte et nytt prosjekt, kan du bruke følgende kommando:

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

Denne kommandoen vil lede deg gjennom en guidet oppsettprosess, hvor du vil bli spurt om preferansene dine, for eksempel Vite, RPC, caching, repository-type og visningsoppsett (f.eks. Vue 3 eller Reactivity). Det vil automatisk opprette nødvendige filer og mapper, sette opp avhengigheter og konfigurere prosjektet.

## Manuell oppsett (Legacy Setup)

Hvis du foretrekker å sette opp prosjektet manuelt, kan du fortsatt installere nødvendige moduler individuelt:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Rask Start (Quick Start)

Her er et enkelt eksempel på hvordan du kan lage en ny CMMV-applikasjon:

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

# Funksjoner (Features)

## 🟢 Kjerne (Core)
- [x] Applikasjonskontroll, lasting av kontrakter, modeller og modellgenerering
- [x] Grunnlag for å lage transpilerere
- [x] Kjerneabstraksjon for HTTP, WS, kontrakter og tjenester
- [x] Grunnleggende implementering av Singleton-klasse
- [x] Dekoratorer for kontrakter, hooks, metadatat og tjenester
- [x] Konfigurasjonsvalidering og tilgangskontroll på tvers av alle moduler
- [x] Hooks-system
- [x] Telemetri og logging
- [x] Grunnlag for registreringshåndtering

## 🔐 Autentisering (Auth)
- [x] Generell tilgangskontroll for applikasjonen
- [x] Lokalt brukerregistrering og pålogging
- [ ] Pålogging via leverandør (Google, Facebook, osv.)
- [x] reCAPTCHA
- [x] Oppfriskningstoken for sesjonsfornyelse
- [x] Full 2FA-støtte med QR-kodegenerering og validering
- [x] Sesjonskontroll basert på fingeravtrykk, IP og brukeragent

## 🚀 Cache
- [x] Optimaliserte systemresponser ved hjelp av minnebasert cache kompatibel med Redis, Memcached, MongoDB eller binærfiler
- [x] Enkle integrasjonsdekoratorer for kontrollere og gateways
- [x] Automatisk integrasjon med kontrakter
- [x] API for å hente, oppdatere eller fjerne bufrede data

## 🌐 HTTP
- [x] API tilgjengelighet via `@cmmv/server` eller andre adaptere som Express
- [x] Automatisk generering av kontrollere og tjenester
- [x] Integrasjon med `@cmmv/cache` og `@cmmv/auth`
- [x] Express-adapter
- [ ] Fastify-adapter

## 📡 Protobuf
- [x] Generering av `.proto`-filer for RPC-kommunikasjon basert på kontrakter
- [x] Generering av grensesnitt og typedefinisjoner for TypeScript
- [x] Generering av JSON-kontrakter for frontend-bruk
- [x] Krysskobling mellom kontrakter

## 🗄 Repository
- [x] Integrasjon med SQL, MySQL, PostgreSQL, SQL Server, Oracle og MongoDB
- [x] Automatisk generering av enheter for TypeORM
- [x] Automatisk generering av indekser
- [x] Automatisk generering av relasjoner
- [x] Datavalidering
- [x] CRUD-operasjoner for RPC og REST
- [x] Søkefiltre (sortering, ID-filtrering, paginering)
- [x] Tjeneste-overstyringer for direkte integrasjon med repository
- [x] Integrasjon med `@cmmv/cache`, `@cmmv/auth`

## ⏳ Planlegging (Scheduling)
- [x] Dekoratorer for å opprette planlagte oppgaver (cron)
- [x] Håndtering av planlagte oppgaver

## 🎨 Visning (View)
- [x] SSR for SEO-optimalisering
- [x] Dynamiske maler som EJS
- [x] Visningsmotor kompatibel med Express
- [x] Støtte for internasjonalisering (i18n)
- [x] Direkte inkludering av under-visninger i HTML
- [x] Dynamisk håndtering av metadata (skripter, lenker, meta, titler, header)
- [x] Kompilering av CSS og JavaScript
- [x] Transparent RPC-integrasjon

## 🔄 WebSocket (WS)
- [x] Automatisk generering av RPC-kommunikasjonsportaler
- [x] Abstraksjon for datapakking
- [x] Implementering av WebSocket-kommunikasjon for både klient og server

## 🧩 Moduler (Modules)
- [x] **Swagger:** API-dokumentasjon med integrasjon av Swagger
- [x] **Testing:** Inkluderer enhetstesting, S2S-testing og mocks
- [x] **Elastic:** Elasticsearch-integrasjon for indeksering og dokumenthåndtering
- [x] **Email:** E-posthåndteringsmodul ved hjelp av SMTP eller AWS SES
- [x] **Encryptor:** ECC-basert kryptering, AES-256-GCM
- [x] **Events:** Hendelsesdrevet arkitektur for sømløs kommunikasjon
- [x] **Inspector:** Feilsøkings- og overvåkingsverktøy
- [x] **Keyv:** Key-value store integrasjon ved hjelp av Keyv
- [x] **Normalizer:** Datatransformasjonsmodul for parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Håndterer jobbkøer (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI-komponenter for å bygge dynamiske applikasjoner
- [x] **Vue:** Aktivere integrering med Vue.js