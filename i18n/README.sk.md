> Tento súbor bol automaticky preložený pomocou **ChatGPT**.  
> Pôvodná dokumentácia bola napísaná v **angličtine a portugalčine**.  
> Ak nájdete chyby v preklade a dobre ovládate slovenský jazyk,  
> neváhajte ich skontrolovať a odoslať **Pull Request (PR)**.  
> Celá komunita vám bude veľmi vďačná za váš príspevok! 🙌 

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Budovanie škálovateľných a modulárnych aplikácií pomocou kontraktov.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Verzia NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licencia balíka" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentácia</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Nahlásiť problém</a>
</p>

## Popis (Description)

CMMV (Contract Model View) je revolúciou vo vývoji webových aplikácií, prekonáva paradigmy a nanovo definuje spôsob, akým vytvárame, udržiavame a škálujeme digitálne projekty. Inšpirovaný osvedčenými postupmi a inovatívnymi konceptmi, CMMV integruje silu kontraktov na automatické generovanie robustných a bezpečných štruktúr, čím eliminuje zložitosť manuálneho kódovania a poskytuje bezprecedentný vývojový zážitok.

Predstavte si platformu, kde sa definovanie kontraktov v TypeScripte stáva srdcom vašej aplikácie, automaticky generuje API, kontroléry, ORM entity a dokonca aj komunikáciu cez binárny RPC, to všetko s optimalizovaným výkonom a bezproblémovou integráciou s najmodernejšími technológiami. S CMMV nielenže zrýchlite vývoj, ale tiež zabezpečíte kvalitu a konzistentnosť svojho kódu, čím výrazne znížite počet chýb a potrebu prepracovania.

Okrem toho CMMV ponúka reaktívne a ľahké rozhranie, založené na Vue 3, ale s možnosťou podpory ďalších frameworkov ako React a Angular, vždy s dôrazom na výkon a SEO. S CMMV frontend nie je len prezentačná vrstva, ale integrálna a dynamická súčasť vašej aplikácie, synchronizovaná v reálnom čase s backendom.

Či už ste skúsený vývojár alebo začiatočník v programovaní, CMMV umožňuje každému vytvárať výkonné, moderné a škálovateľné systémy, pričom eliminuje technické bariéry a kladie kreativitu a inovácie do centra vývojového procesu. Nie je to len framework; je to nový spôsob myslenia a budovania budúcnosti webových aplikácií.

## Filozofia (Philosophy)

CMMV sa snaží zjednodušiť vývojový proces využitím silného typového systému a dekorátorov TypeScriptu. Odstraňuje potrebu ťažkopádnych frontendových frameworkov tým, že sa sústreďuje na priamu kontrolu nad prepojením údajov a interakciami, pričom si zachováva flexibilitu vďaka modulárnemu dizajnu.

## Funkcie (Features)

- **Vývoj riadený kontraktmi:** Použite TypeScript kontrakty na definovanie modelov, kontrolérov a ďalších komponentov.
- **Modulárna architektúra:** Organizujte svoju aplikáciu pomocou modulov, čím uľahčíte jej správu a škálovanie.
- **Podpora RPC a REST:** Integrovaná podpora pre binárny RPC cez WebSocket aj tradičné REST API.
- **Integrácia s Express:** Bezproblémová integrácia s Express pre známe a robustné prostredie HTTP servera.
- **Rozšíriteľnosť:** Vysoko prispôsobiteľné a ľahko rozšíriteľné pomocou vlastných modulov a komponentov.

## Nastavenie pomocou CLI (Setup with CLI)

CMMV teraz poskytuje CLI (Command Line Interface), ktorý zjednodušuje proces inštalácie a umožňuje rýchle nastavenie vášho projektu s požadovanými konfiguráciami.

Ak chcete inicializovať nový projekt, použite nasledujúci príkaz:

```bash
$ pnpm dlx @cmmv/cli@latest create <názov-projektu>
```

Tento príkaz vás prevedie procesom nastavenia, kde sa vás opýta na vaše preferencie, ako je povolenie Vite, RPC, caching, typ úložiska a konfigurácia pohľadov (napr. Vue 3 alebo Reactivity). Automaticky vytvorí potrebné súbory a adresáre, nastaví závislosti a nakonfiguruje projekt.

## Manuálne nastavenie (Legacy Setup)

Ak uprednostňujete manuálne nastavenie projektu, stále môžete nainštalovať potrebné moduly samostatne:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Rýchly štart (Quick Start)

Nižšie je jednoduchý príklad, ako vytvoriť novú aplikáciu CMMV:

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

# Funkcie (Features)

## 🟢 Jadro (Core)
- [x] Riadenie aplikácie, načítanie kontraktov, modelov a generovanie modelov
- [x] Základ pre vytváranie transpilerov
- [x] Abstrakcia jadra pre HTTP, WS, kontrakty a služby
- [x] Základná implementácia pre triedu Singleton
- [x] Dekorátory pre kontrakty, hooky, metadáta a služby
- [x] Overovanie konfigurácie a kontrola prístupu vo všetkých moduloch
- [x] Hook systém
- [x] Telemetria a logovanie
- [x] Základ pre vytváranie registrov

## 🔐 Autentifikácia (Auth)
- [x] Všeobecná kontrola prístupu k aplikácii
- [x] Registrácia a prihlásenie používateľov lokálne
- [ ] Prihlásenie cez poskytovateľov (Google, Facebook, atď.)
- [x] reCAPTCHA
- [x] Obnovovací token pre predĺženie relácie
- [x] Plná podpora 2FA s generovaním a overovaním QR-kódu
- [x] Kontrola relácie na základe odtlačku prsta, IP a user agenta

## 🚀 Cache
- [x] Optimalizované odpovede systému pomocou cache v pamäti kompatibilnej s Redis, Memcached, MongoDB alebo binárnymi súbormi
- [x] Jednoduché integračné dekorátory pre kontroléry a brány
- [x] Automatická integrácia s kontraktmi
- [x] API na načítanie, aktualizáciu alebo odstránenie cacheovaných údajov

## 🌐 HTTP
- [x] API dostupnosť cez `@cmmv/server` alebo iné adaptéry, ako napríklad Express
- [x] Automatická generácia kontrolérov a služieb
- [x] Integrácia s `@cmmv/cache` a `@cmmv/auth`
- [x] Express adaptér
- [ ] Fastify adaptér

## 📡 Protobuf
- [x] Generovanie `.proto` súborov pre RPC komunikáciu na základe kontraktov
- [x] Generovanie rozhraní a definícií typov pre TypeScript
- [x] Generovanie JSON kontraktov na použitie vo frontende
- [x] Prepájanie kontraktov

## 🗄 Úložisko (Repository)
- [x] Integrácia so SQLite, MySQL, PostgreSQL, SQL Server, Oracle a MongoDB
- [x] Automatické vytváranie entít pre TypeORM
- [x] Automatická generácia indexov
- [x] Automatická generácia vzťahov
- [x] Overovanie údajov
- [x] CRUD operácie pre RPC a REST
- [x] Vyhľadávacie filtre (triedenie, filtrovanie podľa ID, stránkovanie)
- [x] Prepísanie služieb pre priame prepojenie s úložiskom
- [x] Integrácia s `@cmmv/cache`, `@cmmv/auth`

## ⏳ Plánovanie úloh (Scheduling)
- [x] Dekorátory pre vytváranie naplánovaných úloh (cron)
- [x] Správa naplánovaných úloh

## 🎨 Pohľad (View)
- [x] SSR pre optimalizáciu SEO
- [x] Dynamické šablóny podobné EJS
- [x] Engine pre zobrazenie kompatibilný s Express
- [x] Podpora internacionalizácie (i18n)
- [x] Priame vkladanie sub-view do HTML
- [x] Dynamická správa metadát (skripty, odkazy, meta, hlavička, názov)
- [x] Bundlovanie CSS a JavaScriptu
- [x] Transparentná integrácia s RPC

## 🔄 WebSocket (WS)
- [x] Automatická generácia RPC komunikačných brán
- [x] Abstrakcia pre balenie dát
- [x] Implementácia WebSocket komunikácie pre klienta aj server

## 🧩 Moduly (Modules)
- [x] **Swagger:** Poskytuje API dokumentáciu s integráciou Swagger
- [x] **Testing:** Obsahuje jednotkové testy, S2S testy a mocky
- [x] **Elastic:** Integrácia s Elasticsearch pre správu indexov a dokumentov
- [x] **Email:** Modul na správu e-mailov cez SMTP alebo AWS SES
- [x] **Encryptor:** Šifrovanie založené na ECC, AES-256-GCM
- [x] **Events:** Architektúra založená na udalostiach pre plynulú komunikáciu
- [x] **Inspector:** Nástroje na ladenie a monitorovanie
- [x] **Keyv:** Integrácia úložiska kľúč-hodnota pomocou Keyv
- [x] **Normalizer:** Modul na transformáciu údajov na parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Správa frontov úloh (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI komponenty na vytváranie dynamických aplikácií
- [x] **Vue:** Umožňuje integráciu s Vue.js