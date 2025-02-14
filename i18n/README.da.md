<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Oprettelse af skalerbare og modulære applikationer ved hjælp af kontrakter.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM-version" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Pakkelicens" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentation</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Rapportér problem</a>
</p>

> Denne fil er automatisk oversat ved hjælp af **ChatGPT**.  
> Den oprindelige dokumentation blev skrevet på **engelsk og portugisisk**.  
> Hvis du finder en fejl i oversættelsen og har kendskab til dansk,  
> er du velkommen til at rette den og indsende en **Pull Request (PR)** for at forbedre den.  
> Hele fællesskabet vil være meget taknemmeligt! 🙌 

## Beskrivelse

CMMV (Contract Model View) er en revolution inden for webapplikationsudvikling, der bryder paradigmer og omdefinerer, hvordan vi bygger, vedligeholder og skalerer digitale projekter. CMMV bruger kontrakter til automatisk at generere robuste og sikre strukturer, hvilket eliminerer kompleksiteten ved manuel kode og giver en enestående udviklingsoplevelse.

Forestil dig en platform, hvor definitionen af kontrakter i TypeScript bliver hjertet i din applikation, automatisk genererer API'er, controllere, ORM-entiteter og endda binær RPC-kommunikation – alt sammen med optimeret ydeevne og problemfri integration med moderne teknologier. Med CMMV fremskynder du ikke kun udviklingen, men sikrer også kvaliteten og konsistensen af din kode, hvilket drastisk reducerer fejl og genarbejde.

CMMV tilbyder også en reaktiv og let brugergrænseflade, baseret på Vue 3, men med mulighed for at understøtte andre frameworks som React og Angular, altid med fokus på ydeevne og SEO. Med CMMV er frontend ikke bare et præsentationslag, men en integreret og dynamisk del af din applikation, synkroniseret i realtid med backend.

Uanset om du er en erfaren udvikler eller en nybegynder, giver CMMV dig mulighed for at opbygge kraftfulde, skalerbare og moderne systemer, eliminere tekniske barrierer og lade kreativitet og innovation være i centrum for din udviklingsrejse. Det er mere end blot et framework; det er en ny måde at tænke på og bygge fremtidens webapplikationer.

## Filosofi

CMMV sigter mod at forenkle udviklingsprocessen ved at udnytte TypeScripts kraftfulde typesystem og dekoratorer. Det fjerner behovet for tunge frontend-frameworks og fokuserer på direkte kontrol over databinding og interaktioner, samtidig med at det opretholder fleksibilitet gennem modulært design.

## Funktioner

- **Kontraktbaseret udvikling:** Brug TypeScript-kontrakter til at definere modeller, controllere og meget mere.
- **Modulær arkitektur:** Sammensæt din applikation ved hjælp af moduler, hvilket gør administration og skalering lettere.
- **Understøttelse af RPC og REST:** Indbygget understøttelse af binær RPC via WebSocket og traditionelle REST API'er.
- **Express-integration:** Problemfri integration med Express for et velkendt og robust HTTP-servermiljø.
- **Udvidelighed:** Meget tilpasseligt og let at udvide med dine egne moduler og komponenter.

## Opsætning med CLI

CMMV tilbyder nu et kommandolinjeværktøj (CLI) for at forenkle installationsprocessen og hurtigt konfigurere dit projekt med de ønskede indstillinger.

For at initialisere et nyt projekt skal du bruge:

```bash
$ pnpm dlx @cmmv/cli@latest create <projekt-navn>
```

Denne kommando guider dig gennem en interaktiv opsætningsproces, hvor du kan vælge muligheder som Vite, RPC, cache, repository-type og visningskonfiguration (Vue 3 eller Reactivity).

## Manuel opsætning

Hvis du foretrækker at konfigurere projektet manuelt, kan du stadig installere de nødvendige moduler individuelt:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Hurtig start

Her er et simpelt eksempel på, hvordan du opretter en ny CMMV-applikation:

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

# Funktioner

## 🟢 Core
- [x] Applikationskontrol, indlæsning af kontrakter, modeller og modelgenerering
- [x] Base for oprettelse af transpilere
- [x] Grundlæggende abstraktion for HTTP, WS, kontrakter og services
- [x] Implementering af Singleton-klasser
- [x] Dekoratorer til kontrakter, hooks, metadata og services
- [x] Validering af konfiguration og adgangskontrol på tværs af alle moduler
- [x] Hooks-system
- [x] Telemetri og logning
- [x] Base til oprettelse af registre

## 🔐 Auth (Autentifikation)
- [x] Generel adgangskontrol til applikationen
- [x] Lokal brugerregistrering og login
- [ ] Login via udbydere (Google, Facebook osv.)
- [x] reCAPTCHA
- [x] Refresh-token til fornyelse af sessioner
- [x] Fuldt understøttet 2FA med QR-kodegenerering og validering
- [x] Sessionskontrol baseret på fingerprint, IP og user-agent

## 🚀 Cache
- [x] Optimerede systemresponser med caching i hukommelsen, kompatibel med Redis, Memcached, MongoDB eller binære filer
- [x] Enkle dekoratorer til integration i controllere og gateways
- [x] Automatisk integration i kontrakter
- [x] API til hentning, opdatering eller fjernelse af cachedata

## 🌐 HTTP
- [x] API-eksponering via `@cmmv/server` eller andre adaptere som Express
- [x] Automatisk generering af controllere og services
- [x] Integration med `@cmmv/cache` og `@cmmv/auth`
- [x] Express-adapter
- [ ] Fastify-adapter

## 📡 Protobuf
- [x] Generering af `.proto` filer til RPC-kommunikation baseret på kontrakter
- [x] Generering af interfaces og typede definitioner til TypeScript
- [x] Generering af JSON-kontrakter til brug i frontend
- [x] Sammenkobling mellem kontrakter

## 🗄 Repository
- [x] Integration med SQL, MySQL, PostgreSQL, SQL Server, Oracle og MongoDB
- [x] Automatisk oprettelse af entiteter til TypeORM
- [x] Automatisk generering af indeks
- [x] Automatisk generering af relationer
- [x] Datavalidering
- [x] CRUD-operationer til RPC og REST
- [x] Søgefiltre (sortering, ID-filtrering, pagination)
- [x] Overskrivning af services til direkte integration med repository
- [x] Integration med `@cmmv/cache`, `@cmmv/auth`

## ⏳ Scheduling (Planlægning)
- [x] Dekoratorer til oprettelse af planlagte opgaver (cron)
- [x] Styring af planlagte opgaver

## 🎨 View (Visning)
- [x] SSR til optimering af SEO
- [x] Dynamiske skabeloner svarende til EJS
- [x] Visningsmotor kompatibel med Express
- [x] Internationaliseringsstøtte
- [x] Direkte inkludering af under-visninger i HTML
- [x] Dynamisk metadatahåndtering (scripts, links, meta, header, title)
- [x] Bundling af CSS og JavaScript
- [x] Transparent RPC-integration

## 🔄 WS (WebSocket)
- [x] Automatisk generering af RPC-kommunikationsgateways
- [x] Abstraktion af datapakning
- [x] WebSocket-kommunikation for både klient og server

## 🧩 Moduler
- [x] **Swagger**: Tilbyder API-dokumentation med Swagger-integration.  
- [x] **Testing**: Inkluderer nu enhedstest, S2S-test og mocks.  
- [x] **Elastic**: Elasticsearch-integration til håndtering af indekser og dokumenter.  
- [x] **Email**: Modul til håndtering af e-mails ved hjælp af SMTP eller AWS SES.  
- [x] **Encryptor**: ECC-baseret kryptering, AES-256-GCM.  
- [x] **Events**: Begivenhedsdrevet arkitektur til problemfri kommunikation.  
- [x] **Inspector**: Debugging- og overvågningsværktøjer.  
- [x] **Keyv**: Integration med key-value storage ved hjælp af Keyv.  
- [x] **Normalizer**: Datatransformationsmodul til parsing (JSON, XML, YAML, CSV).  
- [x] **Queue**: Håndtering af jobkøer (Kafka, RabbitMQ, Redis).  
- [x] **UI**: UI-komponenter til opbygning af dynamiske applikationer.  
- [x] **Vue**: Muliggør integration med Vue.js.  
