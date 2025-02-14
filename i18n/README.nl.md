> Dit bestand is automatisch vertaald door **ChatGPT**.  
> De originele documentatie is geschreven in **Engels en Portugees**.  
> Als je fouten vindt in de vertaling en je goed Nederlands beheerst,  
> controleer het dan en dien een **Pull Request (PR)** in.  
> De hele gemeenschap zal je bijdrage zeer waarderen! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Het bouwen van schaalbare en modulaire applicaties met behulp van contracten.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Versie" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Pakketlicentie" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentatie</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Meld een probleem</a>
</p>

## Beschrijving (Description)

CMMV (Contract Model View) is een revolutie in webapplicatieontwikkeling, die oude paradigma's doorbreekt en herdefinieert hoe we digitale projecten creëren, onderhouden en schalen. Geïnspireerd door best practices en innovatieve concepten, integreert CMMV de kracht van contracten om automatisch robuuste en veilige structuren te genereren. Het elimineert de complexiteit van handmatig coderen en biedt een ongeëvenaarde ontwikkelervaring.

Stel je een platform voor waarin de definitie van contracten in TypeScript het hart van je applicatie vormt, die automatisch API's, controllers, ORM-entiteiten en zelfs communicatie via binaire RPC genereert, alles met geoptimaliseerde prestaties en naadloze integratie met de modernste technologieën. Met CMMV versnel je niet alleen de ontwikkeling, maar zorg je ook voor de kwaliteit en consistentie van je code, waardoor fouten en herwerk drastisch worden verminderd.

Daarnaast biedt CMMV een reactieve en lichte interface, gebaseerd op Vue 3, maar ondersteunt ook andere frameworks zoals React en Angular, met altijd de focus op prestaties en SEO. Met CMMV is de frontend niet alleen een presentatie-laag, maar een integraal en dynamisch onderdeel van je applicatie, gesynchroniseerd in real-time met de backend.

Of je nu een ervaren ontwikkelaar bent of een beginner in programmeren, CMMV stelt iedereen in staat om krachtige, moderne en schaalbare systemen te bouwen door technische barrières te elimineren en creativiteit en innovatie centraal te stellen. Het is meer dan een framework; het is een nieuwe manier van denken en het bouwen van de toekomst van webapplicaties.

## Filosofie (Philosophy)

CMMV is ontworpen om het ontwikkelingsproces te vereenvoudigen door gebruik te maken van het krachtige typesysteem en decorateurs van TypeScript. Het elimineert de behoefte aan zware frontend-frameworks door de focus te leggen op directe controle over datalbinding en interacties, terwijl het flexibiliteit behoudt via een modulair ontwerp.

## Functies (Features)

- **Contract-gedreven ontwikkeling:** Gebruik TypeScript-contracten om modellen, controllers en meer te definiëren.
- **Modulaire architectuur:** Organiseer je applicatie met behulp van modules, wat het beheer en de schaalbaarheid vergemakkelijkt.
- **RPC en REST-ondersteuning:** Geïntegreerde ondersteuning voor zowel binaire RPC via WebSocket als traditionele REST API's.
- **Express-integratie:** Naadloze integratie met Express voor een bekend en robuust HTTP-serveromgeving.
- **Uitbreidbaar:** Zeer aanpasbaar en gemakkelijk uit te breiden met eigen modules en componenten.

## Setup met CLI (Setup with CLI)

CMMV biedt nu een CLI (Command Line Interface) om het installatieproces te stroomlijnen en je project snel op te zetten met de gewenste configuraties.

Om een nieuw project te initialiseren, kun je de volgende opdracht gebruiken:

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

Deze opdracht leidt je door een begeleid configuratieproces, waarin je voorkeuren zoals Vite, RPC, caching, repositorytype en weergaveconfiguratie (bijv. Vue 3 of Reactivity) kunt opgeven. Het zal automatisch de benodigde bestanden en mappen aanmaken, afhankelijkheden instellen en je project configureren.

## Legacy Setup (Handmatige configuratie)

Als je het project handmatig wilt opzetten, kun je de benodigde modules nog steeds afzonderlijk installeren:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Snelle start (Quick Start)

Hier is een eenvoudig voorbeeld van hoe je een nieuwe CMMV-applicatie kunt maken:

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

# Functies (Features)

## 🟢 Kern (Core)
- [x] Applicatiecontrole, contractladen, modellen en modelgeneratie
- [x] Basis voor het maken van transpilers
- [x] Basisabstractie voor HTTP, WS, contracten en services
- [x] Basisimplementatie voor de Singleton-klasse
- [x] Decorators voor contracten, hooks, metadata en services
- [x] Configuratievalidatie en toegangscontrole voor alle modules
- [x] Hooks-systeem
- [x] Telemetrie en logging
- [x] Basis voor het maken van registers

## 🔐 Authenticatie (Auth)
- [x] Algemene toegang tot de applicatie
- [x] Lokale gebruikersregistratie en login
- [ ] Inloggen via providers (Google, Facebook, etc.)
- [x] reCAPTCHA
- [x] Vernieuwingstoken voor sessievernieuwing
- [x] Volledige ondersteuning voor 2FA met QR-codegeneratie en validatie
- [x] Sessiebeheer op basis van vingerafdrukken, IP en gebruikersagent

## 🚀 Cache
- [x] Geoptimaliseerde systeemresponsen met behulp van in-memory cache, compatibel met Redis, Memcached, MongoDB of binaire bestanden
- [x] Eenvoudige integratiedecorators voor controllers en gateways
- [x] Automatische integratie met contracten
- [x] API voor het ophalen, bijwerken of verwijderen van gecachte gegevens

## 🌐 HTTP
- [x] API-beschikbaarheid via `@cmmv/server` of andere adapters zoals Express
- [x] Automatische generatie van controllers en services
- [x] Integratie met `@cmmv/cache` en `@cmmv/auth`
- [x] Express-adapter
- [ ] Fastify-adapter

## 📡 Protobuf
- [x] `.proto`-bestandgeneratie voor RPC-communicatie op basis van contracten
- [x] Generatie van interfaces en type-definities voor TypeScript
- [x] Generatie van JSON-contracten voor frontend-gebruik
- [x] Cross-linking van contracten

## 🗄 Repository
- [x] Integratie met SQL, MySQL, PostgreSQL, SQL Server, Oracle en MongoDB
- [x] Automatische entiteitsgeneratie voor TypeORM
- [x] Automatische generatie van indexen
- [x] Automatische generatie van relaties
- [x] Gegevensvalidatie
- [x] CRUD-operaties voor RPC en REST
- [x] Zoekfilters (sorteren, ID-filteren, pagineren)
- [x] Service-overrides voor directe repository-integratie
- [x] Integratie met `@cmmv/cache`, `@cmmv/auth`

## ⏳ Scheduling
- [x] Decorators voor het maken van geplande taken (cron)
- [x] Beheer van geplande taken

## 🎨 Weergave (View)
- [x] SSR voor SEO-optimalisatie
- [x] Dynamische sjablonen zoals EJS
- [x] Weergave-engine compatibel met Express
- [x] Internationalisatieondersteuning
- [x] Directe subweergave-inclusie in HTML
- [x] Dynamisch metadata-beheer (scripts, links, meta, kop, titel)
- [x] Gecombineerde CSS en JavaScript-compilatie
- [x] Transparante RPC-integratie

## 🔄 WebSocket (WS)
- [x] Automatische generatie van RPC-communicatie-gateways
- [x] Data-pakketabstractie
- [x] WebSocket-communicatie-implementatie voor zowel client als server

## 🧩 Modulen (Modules)
- [x] **Swagger:** API-documentatie met Swagger-integratie
- [x] **Testing:** Nu inclusief eenheidstests, S2S-tests en mocks
- [x] **Elastic:** Elasticsearch-integratie voor het beheren van indexen en documenten
- [x] **Email:** E-mailverwerkingsmodule met behulp van SMTP of AWS SES
- [x] **Encryptor:** ECC-gebaseerde encryptie, AES-256-GCM
- [x] **Events:** Evenementgedreven architectuur voor naadloze communicatie
- [x] **Inspector:** Foutopsporings- en monitoringtools
- [x] **Keyv:** Integratie van key-value store met Keyv
- [x] **Normalizer:** Gegevensomzettingsmodule voor parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Beheert taakwachtrijen (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI-componenten voor het bouwen van dynamische applicaties
- [x] **Vue:** Maakt integratie met Vue.js mogelijk