<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Vytváření škálovatelných a modulárních aplikací pomocí kontraktů.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Verze NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licence balíčku" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentace</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Nahlásit problém</a>
</p>

> **Zřeknutí se odpovědnosti**  
> Tento soubor byl automaticky přeložen pomocí **ChatGPT**.  
> Původní dokumentace byla napsána v **angličtině a portugalštině**.  
> Pokud najdete jakoukoli chybu v překladu a ovládáte češtinu,  
> neváhejte ji opravit a odeslat **Pull Request (PR)** pro její nápravu.  
> Celá komunita vám bude velmi vděčná! 🙌  

## Popis

CMMV (Contract Model View) je revoluce ve vývoji webových aplikací, která mění paradigmy a předefinuje způsob, jakým vytváříme, spravujeme a škálujeme digitální projekty. CMMV využívá sílu kontraktů k automatickému generování robustních a bezpečných struktur, eliminuje složitost ručního kódu a poskytuje bezprecedentní vývojovou zkušenost.

Představte si platformu, kde definování kontraktů v TypeScriptu se stává srdcem vaší aplikace, automaticky generující API, kontrolery, ORM entity a dokonce i binární RPC komunikaci, to vše s optimalizovaným výkonem a bezproblémovou integrací s moderními technologiemi. S CMMV nejen urychlíte vývoj, ale také zajistíte kvalitu a konzistenci svého kódu, čímž drasticky snížíte chyby a zbytečné přepracování.

CMMV také poskytuje reaktivní a lehké rozhraní založené na Vue 3, ale s možností podpory dalších frameworků, jako jsou React a Angular, s důrazem na výkon a SEO. S CMMV frontend není jen prezentační vrstvou, ale nedílnou a dynamickou součástí vaší aplikace, synchronizovanou v reálném čase s backendem.

Ať už jste zkušený vývojář nebo nováček v programování, CMMV vám umožní vytvářet výkonné, škálovatelné a moderní systémy, eliminovat technické překážky a dát vaší kreativitě a inovacím volný průchod. Není to jen framework; je to nový způsob, jak přemýšlet a budovat budoucnost webových aplikací.

## Filozofie

CMMV si klade za cíl zjednodušit vývojový proces využitím silného typového systému a dekorátorů TypeScriptu. Odstraňuje potřebu těžkých frontendových frameworků a zaměřuje se na přímou kontrolu nad datovým propojením a interakcemi, přičemž si zachovává flexibilitu díky modulárnímu designu.

## Funkce

- **Vývoj řízený kontrakty:** Používejte TypeScript kontrakty k definování modelů, kontrolerů a dalších komponent.
- **Modulární architektura:** Skládejte svou aplikaci pomocí modulů, což usnadňuje správu a škálování.
- **Podpora RPC a REST:** Nativní podpora pro binární RPC přes WebSocket i tradiční REST API.
- **Integrace s Express:** Bezproblémová integrace s Express pro robustní HTTP serverové prostředí.
- **Rozšiřitelnost:** Vysoce přizpůsobitelné a snadno rozšiřitelné vlastními moduly a komponentami.

## Nastavení pomocí CLI

CMMV nyní poskytuje příkazovou řádku (CLI) pro zjednodušení procesu instalace a rychlé nastavení projektu podle požadovaných konfigurací.

Pro inicializaci nového projektu použijte:

```bash
$ pnpm dlx @cmmv/cli@latest create <název-projektu>
```

Tento příkaz vás provede interaktivním procesem nastavení, ve kterém si můžete vybrat například Vite, RPC, cache, typ repozitáře a konfiguraci pohledu (Vue 3 nebo Reactivity).

## Manuální nastavení

Pokud dáváte přednost manuálnímu nastavení projektu, můžete stále nainstalovat potřebné moduly jednotlivě:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Rychlý start

Níže je jednoduchý příklad, jak vytvořit novou aplikaci CMMV:

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

# Funkce

## 🟢 Jádro (Core)
- [x] Řízení aplikace, načítání kontraktů, modelů a generování modelů
- [x] Základ pro vytváření transpilerů
- [x] Základní abstrakce pro HTTP, WS, kontrakty a služby
- [x] Implementace základní třídy Singleton
- [x] Dekorátory pro kontrakty, hooky, metadata a služby
- [x] Ověřování a řízení přístupu ke konfiguraci ve všech modulech
- [x] Systém hooků
- [x] Telemetrie a logování
- [x] Základ pro vytváření registrů

## 🔐 Autentizace (Auth)
- [x] Obecné řízení přístupu aplikace
- [x] Lokální registrace a přihlášení uživatelů
- [ ] Přihlášení přes poskytovatele (Google, Facebook atd.)
- [x] reCAPTCHA
- [x] Refresh token pro obnovení relace
- [x] Plná podpora 2FA s generováním a ověřováním QR kódu
- [x] Řízení relace na základě otisku prstu, IP adresy a uživatelského agenta

## 🚀 Cache
- [x] Optimalizace odpovědí systému pomocí mezipaměti kompatibilní s Redis, Memcached, MongoDB nebo binárními soubory
- [x] Jednoduché integrace dekorátorů pro kontrolery a brány
- [x] Automatická integrace s kontrakty
- [x] API pro načítání, aktualizaci nebo odstranění dat z cache

## 🌐 HTTP
- [x] Dostupnost API prostřednictvím `@cmmv/server` nebo jiných adaptérů jako Express
- [x] Automatická generace kontrolerů a služeb
- [x] Integrace s `@cmmv/cache` a `@cmmv/auth`
- [x] Adaptér pro Express
- [ ] Adaptér pro Fastify

## 📡 Protobuf
- [x] Generování souborů `.proto` pro komunikaci RPC na základě kontraktů
- [x] Generování rozhraní a definic typů pro TypeScript
- [x] Generování JSON kontraktů pro použití ve frontendu
- [x] Propojení mezi kontrakty

## 🗄 Repozitář (Repository)
- [x] Integrace se SQL, MySQL, PostgreSQL, SQL Server, Oracle a MongoDB
- [x] Automatické vytváření entit pro TypeORM
- [x] Automatické vytváření indexů
- [x] Automatické vytváření vztahů
- [x] Ověřování dat
- [x] CRUD operace pro RPC a REST
- [x] Vyhledávací filtry (řazení, filtrování podle ID, stránkování)
- [x] Přepis služeb pro přímou integraci s repozitářem
- [x] Integrace s `@cmmv/cache`, `@cmmv/auth`

## ⏳ Plánování (Scheduling)
- [x] Dekorátory pro vytváření plánovaných úloh (cron)
- [x] Správa plánovaných úloh

## 🎨 Zobrazení (View)
- [x] SSR pro optimalizaci SEO
- [x] Dynamické šablony podobné EJS
- [x] Zobrazovací engine kompatibilní s Express
- [x] Podpora pro internacionalizaci
- [x] Přímé vkládání sub-view do HTML
- [x] Dynamická správa metadat (skripty, odkazy, meta, header, title)
- [x] Kompilace a optimalizace balíčků CSS a JavaScriptu
- [x] Transparentní integrace pro RPC

## 🔄 WS (WebSocket)
- [x] Automatické generování brán pro komunikaci RPC
- [x] Abstrakce pro balení dat
- [x] Implementace komunikace WebSocket pro klienta i server

## 🧩 Moduly (Modules)
- [x] **Swagger**: Poskytuje dokumentaci API s integrací Swagger.  
- [x] **Testing**: Nyní zahrnuje jednotkové testy, S2S testy a mocky.  
- [x] **Elastic**: Integrace s Elasticsearch pro správu indexů a dokumentů.  
- [x] **Email**: Modul pro odesílání e-mailů pomocí SMTP nebo AWS SES.  
- [x] **Encryptor**: Šifrování založené na ECC, AES-256-GCM.  
- [x] **Events**: Architektura založená na událostech pro efektivní komunikaci.  
- [x] **Inspector**: Nástroje pro ladění a monitorování.  
- [x] **Keyv**: Integrace úložiště klíč-hodnota pomocí Keyv.  
- [x] **Normalizer**: Modul pro transformaci dat a parsing (JSON, XML, YAML, CSV).  
- [x] **Queue**: Správa pracovních front (Kafka, RabbitMQ, Redis).  
- [x] **UI**: UI komponenty pro tvorbu dynamických aplikací.  
- [x] **Vue**: Umožňuje integraci s Vue.js.  
