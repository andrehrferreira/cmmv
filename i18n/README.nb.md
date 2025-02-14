> Denne filen ble automatisk oversatt ved hjelp av **ChatGPT**.  
> Den opprinnelige dokumentasjonen ble skrevet på **engelsk og portugisisk**.  
> Hvis du finner feil i oversettelsen og har god kunnskap i norsk (bokmål),  
> vennligst gjennomgå den og send inn en **Pull Request (PR)**.  
> Hele fellesskapet vil sette stor pris på ditt bidrag! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Bygging av skalerbare og modulære applikasjoner ved hjelp av kontrakter.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM-versjon" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Pakke-lisens" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentasjon</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Rapporter et problem</a>
</p>

## Beskrivelse (Description)

CMMV (Contract Model View) er en revolusjon innen utvikling av webapplikasjoner, som bryter gamle paradigmer og redefinerer hvordan vi oppretter, vedlikeholder og skalerer digitale prosjekter. Inspirert av beste praksis og innovative konsepter, integrerer CMMV kraften i kontrakter for automatisk å generere robuste og sikre strukturer. Det eliminerer kompleksiteten ved manuell koding og gir en enestående utviklingsopplevelse.

Tenk deg en plattform der definisjonen av kontrakter i TypeScript blir hjertet i applikasjonen din, og automatisk genererer API-er, kontrollere, ORM-enheter og til og med binær RPC-kommunikasjon, alt med optimal ytelse og sømløs integrasjon med moderne teknologier. Med CMMV akselererer du ikke bare utviklingen, men sikrer også kvaliteten og konsistensen i koden din, samtidig som du reduserer feil og ekstra arbeid.

I tillegg tilbyr CMMV et reaktivt og lett brukergrensesnitt, basert på Vue 3, men med støtte for andre rammeverk som React og Angular, alltid med fokus på ytelse og SEO. Med CMMV er frontend ikke bare et presentasjonslag, men en integrert og dynamisk del av applikasjonen din, synkronisert i sanntid med backend.

Enten du er en erfaren utvikler eller nybegynner, gir CMMV alle muligheten til å bygge kraftige, moderne og skalerbare systemer ved å eliminere tekniske barrierer og la kreativitet og innovasjon stå i sentrum. Det er mer enn et rammeverk – det er en ny måte å tenke og bygge fremtidens webapplikasjoner på.

## Filosofi (Philosophy)

CMMV har som mål å forenkle utviklingsprosessen ved å utnytte TypeScripts kraftige typesystem og dekoratorer. Det eliminerer behovet for tunge frontend-rammeverk ved å fokusere på direkte kontroll over datahåndtering og interaksjoner, samtidig som det opprettholder fleksibilitet gjennom modulært design.

## Funksjoner (Features)

- **Kontraktdrevet utvikling:** Bruk TypeScript-kontrakter til å definere modeller, kontrollere og mer.
- **Modulær arkitektur:** Bygg applikasjonen din med moduler, noe som gjør det enkelt å administrere og skalere.
- **Støtte for RPC og REST:** Innebygd støtte for både binær RPC via WebSocket og tradisjonelle REST-API-er.
- **Express-integrasjon:** Sømløs integrasjon med Express for et kjent og robust HTTP-servermiljø.
- **Utvidbarhet:** Høyt tilpassbar og enkel å utvide med egne moduler og komponenter.

## Oppsett med CLI (Setup with CLI)

CMMV tilbyr nå en CLI (Command Line Interface) for å forenkle installasjonsprosessen og raskt konfigurere prosjektet ditt med ønskede innstillinger.

For å starte et nytt prosjekt, bruk følgende kommando:

```bash
$ pnpm dlx @cmmv/cli@latest create <prosjekt-navn>
```

Denne kommandoen vil veilede deg gjennom en konfigurert oppsettprosess, der du kan velge preferanser som Vite, RPC, caching, lagringstype og visningsalternativer (for eksempel Vue 3 eller Reactivity). Den vil automatisk generere nødvendige filer og mapper, sette opp avhengigheter og konfigurere prosjektet.

## Manuell oppsett (Legacy Setup)

Hvis du foretrekker å sette opp prosjektet manuelt, kan du fortsatt installere nødvendige moduler individuelt:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Rask start (Quick Start)

Nedenfor er et enkelt eksempel på hvordan du kan opprette en ny CMMV-applikasjon:

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
- [x] Dekoratorer for kontrakter, hooks, metadata og tjenester
- [x] Konfigurasjonsvalidering og tilgangskontroll på tvers av alle moduler
- [x] Hooks-system
- [x] Telemetri og logging
- [x] Grunnlag for registreringshåndtering

## 🔐 Autentisering (Auth)
- [x] Generell tilgangskontroll for applikasjonen
- [x] Registrering og innlogging av lokale brukere
- [ ] Innlogging via leverandører (Google, Facebook, osv.)
- [x] reCAPTCHA
- [x] Oppfriskningstoken for sesjonfornyelse
- [x] Full 2FA-støtte med QR-kodegenerering og validering
- [x] Sesjonskontroll basert på fingeravtrykk, IP og brukeragent

## 🚀 Cache
- [x] Optimaliserte systemresponser ved bruk av minnebasert cache kompatibel med Redis, Memcached, MongoDB eller binærfiler
- [x] Enkle integrasjonsdekoratorer for kontrollere og gateways
- [x] Automatisk integrasjon med kontrakter
- [x] API for henting, oppdatering eller fjerning av bufrede data

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

## 🗄 Lagring (Repository)
- [x] Integrasjon med SQL, MySQL, PostgreSQL, SQL Server, Oracle og MongoDB
- [x] Automatisk generering av enheter for TypeORM
- [x] Automatisk generering av indekser
- [x] Automatisk generering av relasjoner
- [x] Datavalidering
- [x] CRUD-operasjoner for RPC og REST
- [x] Søkefiltre (sortering, ID-filtrering, paginering)
- [x] Overstyring av tjenester for direkte integrasjon med lagring
- [x] Integrasjon med `@cmmv/cache`, `@cmmv/auth`

## ⏳ Planlegging (Scheduling)
- [x] Dekoratorer for å opprette planlagte oppgaver (cron)
- [x] Håndtering av planlagte oppgaver

## 🎨 Visning (View)
- [x] SSR for SEO-optimalisering
- [x] Dynamiske maler lik EJS
- [x] Visningsmotor kompatibel med Express
- [x] Støtte for internasjonalisering (i18n)
- [x] Direkte inkludering av under-visninger i HTML
- [x] Dynamisk håndtering av metadata (skript, lenker, meta, header, tittel)
- [x] Kompilering av sammenføyde CSS- og JavaScript-filer
- [x] Gjennomsiktig RPC-integrasjon

## 🔄 WebSocket (WS)
- [x] Automatisk generering av RPC-kommunikasjonsgateways
- [x] Abstraksjon for datapakking
- [x] Implementering av WebSocket-kommunikasjon for både klient og server

## 🧩 Moduler (Modules)
- [x] **Swagger:** Gir API-dokumentasjon med Swagger-integrasjon
- [x] **Testing:** Inkluderer enhetstesting, S2S-testing og mocks
- [x] **Elastic:** Elasticsearch-integrasjon for håndtering av indekser og dokumenter
- [x] **Email:** Modul for håndtering av e-post ved bruk av SMTP eller AWS SES
- [x] **Encryptor:** Kryptering basert på ECC, AES-256-GCM
- [x] **Events:** Hendelsesdrevet arkitektur for sømløs kommunikasjon
- [x] **Inspector:** Feilsøkings- og overvåkingsverktøy
- [x] **Keyv:** Nøkkel-verdi-lagring ved bruk av Keyv
- [x] **Normalizer:** Datatransformasjonsmodul for parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Håndtering av arbeidskøer (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI-komponenter for å bygge dynamiske applikasjoner
- [x] **Vue:** Muliggjør integrasjon med Vue.js