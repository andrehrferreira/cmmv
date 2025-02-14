> Ta datoteka je bila samodejno prevedena s pomočjo **ChatGPT**.  
> Izvirna dokumentacija je bila napisana v **angleščini in portugalščini**.  
> Če opazite napake v prevodu in dobro poznate slovenski jezik,  
> vas vabimo, da jih pregledate in pošljete **Pull Request (PR)**.  
> Celotna skupnost vam bo zelo hvaležna za vaš prispevek! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Gradnja skalabilnih in modularnih aplikacij s pomočjo pogodb.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM različica" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licenca paketa" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentacija</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Poročaj o težavi</a>
</p>

## Opis (Description)

CMMV (Contract Model View) predstavlja revolucijo v razvoju spletnih aplikacij, saj ruši paradigme in na novo definira način, kako ustvarjamo, vzdržujemo in širimo digitalne projekte. Navdihnjen z najboljšimi praksami in inovativnimi koncepti, CMMV združuje moč pogodb za samodejno ustvarjanje robustnih in varnih struktur, s čimer odpravlja kompleksnost ročnega kodiranja in zagotavlja brezprimerno razvojno izkušnjo.

Predstavljajte si platformo, kjer definicija pogodb v TypeScriptu postane srce vaše aplikacije, ki samodejno generira API-je, kontrolerje, ORM entitete in celo komunikacijo prek binarnega RPC-ja – vse to z optimizirano zmogljivostjo in brezhibno integracijo z najsodobnejšimi tehnologijami. S CMMV ne samo da pospešite razvoj, ampak tudi zagotovite kakovost in doslednost kode ter drastično zmanjšate število napak in potrebo po ponovnem delu.

Poleg tega CMMV ponuja reaktivni in lahek vmesnik, temelječ na Vue 3, z možnostjo podpore drugim ogrodjem, kot sta React in Angular, s poudarkom na zmogljivosti in SEO. S CMMV frontend ni le predstavitvena plast, ampak sestavni in dinamičen del vaše aplikacije, ki je v realnem času sinhroniziran z backendom.

Ne glede na to, ali ste izkušen razvijalec ali začetnik v programiranju, CMMV omogoča vsem, da gradijo zmogljive, sodobne in razširljive sisteme, pri čemer odpravlja tehnične ovire in postavlja ustvarjalnost ter inovacije v središče razvojne poti. To ni le ogrodje; je nov način razmišljanja in gradnje prihodnosti spletnih aplikacij.

## Filozofija (Philosophy)

CMMV si prizadeva poenostaviti razvojni proces z izkoriščanjem TypeScriptovega močnega sistema tipov in dekoratorjev. Odpravlja potrebo po težkih frontend ogrodjih, saj se osredotoča na neposreden nadzor nad povezovanjem podatkov in interakcijami, hkrati pa ohranja prilagodljivost z modularno zasnovo.

## Funkcionalnosti (Features)

- **Razvoj na podlagi pogodb:** Uporabite pogodbe TypeScript za definiranje modelov, kontrolerjev in drugih komponent.
- **Modularna arhitektura:** Organizirajte svojo aplikacijo z moduli, kar olajša upravljanje in širjenje.
- **Podpora za RPC in REST:** Vgrajena podpora za binarni RPC prek WebSocketa in tradicionalne REST API-je.
- **Integracija z Express:** Brezhibna integracija z Express za znano in robustno okolje HTTP strežnika.
- **Razširljivost:** Visoko prilagodljivo in enostavno razširljivo z lastnimi moduli in komponentami.

## Nastavitev s CLI (Setup with CLI)

CMMV zdaj ponuja CLI (Command Line Interface), ki poenostavi postopek namestitve in hitro nastavi vaš projekt z želenimi konfiguracijami.

Za inicializacijo novega projekta uporabite naslednji ukaz:

```bash
$ pnpm dlx @cmmv/cli@latest create <ime-projekta>
```

Ta ukaz vas bo vodil skozi postopek nastavitve, kjer boste lahko izbrali svoje preference, kot so omogočanje Vite, RPC, predpomnjenje, tip repozitorija in nastavitev pogleda (npr. Vue 3 ali Reactivity). Samodejno bo ustvaril potrebne datoteke in mape, nastavil odvisnosti in konfiguriral projekt.

## Ročna nastavitev (Legacy Setup)

Če želite projekt nastaviti ročno, lahko še vedno namestite potrebne module posamično:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Hitri začetek (Quick Start)

Spodaj je preprost primer, kako ustvariti novo CMMV aplikacijo:

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

# Funkcionalnosti (Features)

## 🟢 Jedro (Core)
- [x] Nadzor aplikacije, nalaganje pogodb, modelov in generiranje modelov
- [x] Osnova za ustvarjanje transpilerjev
- [x] Jedrna abstrakcija za HTTP, WS, pogodbe in storitve
- [x] Osnovna implementacija za razred Singleton
- [x] Dekoratorji za pogodbe, hooke, metapodatke in storitve
- [x] Validacija konfiguracije in nadzor dostopa v vseh modulih
- [x] Hook sistem
- [x] Telemetrija in beleženje (logging)
- [x] Osnova za ustvarjanje registrov

## 🔐 Avtentikacija (Auth)
- [x] Splošni nadzor dostopa aplikacije
- [x] Lokalna registracija in prijava uporabnikov
- [ ] Prijava prek ponudnikov (Google, Facebook itd.)
- [x] reCAPTCHA
- [x] Osvežitveni žeton za obnovitev seje
- [x] Popolna podpora za 2FA z ustvarjanjem in preverjanjem QR-kode
- [x] Nadzor sej na podlagi prstnega odtisa, IP-ja in uporabniškega agenta

## 🚀 Predpomnjenje (Cache)
- [x] Optimizirani sistemski odzivi z uporabo pomnilniškega predpomnilnika, združljivega z Redis, Memcached, MongoDB ali binarnimi datotekami
- [x] Enostavni integracijski dekoratorji za kontrolerje in prehode (gateways)
- [x] Samodejna integracija s pogodbami
- [x] API za pridobivanje, posodabljanje ali odstranjevanje predpomnjenih podatkov

## 🌐 HTTP
- [x] Razpoložljivost API-ja prek `@cmmv/server` ali drugih adapterjev, kot je Express
- [x] Samodejno generiranje kontrolerjev in storitev
- [x] Integracija z `@cmmv/cache` in `@cmmv/auth`
- [x] Express adapter
- [ ] Fastify adapter

## 📡 Protobuf
- [x] Generiranje `.proto` datotek za RPC komunikacijo na podlagi pogodb
- [x] Generiranje vmesnikov in definicij tipov za TypeScript
- [x] Generiranje JSON pogodb za uporabo na frontendu
- [x] Povezovanje pogodb

## 🗄 Repozitorij (Repository)
- [x] Integracija s SQL, MySQL, PostgreSQL, SQL Server, Oracle in MongoDB
- [x] Samodejno ustvarjanje entitet za TypeORM
- [x] Samodejno generiranje indeksov
- [x] Samodejno generiranje relacij
- [x] Validacija podatkov
- [x] CRUD operacije za RPC in REST
- [x] Iskalni filtri (razvrščanje, filtriranje po ID-ju, paginacija)
- [x] Preglasitev storitev za neposredno povezavo z repozitorijem
- [x] Integracija z `@cmmv/cache`, `@cmmv/auth`

## ⏳ Načrtovanje opravil (Scheduling)
- [x] Dekoratorji za ustvarjanje načrtovanih opravil (cron)
- [x] Upravljanje načrtovanih opravil

## 🎨 Pogled (View)
- [x] SSR za optimizacijo SEO
- [x] Dinamične predloge podobne EJS
- [x] Pogonski motor pogleda združljiv z Express
- [x] Podpora za internacionalizacijo (i18n)
- [x] Neposredno vključevanje podpogledov v HTML
- [x] Dinamično upravljanje metapodatkov (skripti, povezave, meta, glava, naslov)
- [x] Združevanje (bundling) CSS in JavaScript
- [x] Transparentna integracija z RPC

## 🔄 WebSocket (WS)
- [x] Samodejno generiranje prehodov za RPC komunikacijo
- [x] Abstrakcija za pakiranje podatkov
- [x] Implementacija WebSocket komunikacije za odjemalca in strežnik

## 🧩 Moduli (Modules)
- [x] **Swagger:** Zagotavlja API dokumentacijo z integracijo Swagger
- [x] **Testing:** Vključuje enotsko testiranje, S2S testiranje in mocke
- [x] **Elastic:** Integracija z Elasticsearch za upravljanje indeksov in dokumentov
- [x] **Email:** Modul za obravnavo e-pošte prek SMTP ali AWS SES
- [x] **Encryptor:** Šifriranje na osnovi ECC, AES-256-GCM
- [x] **Events:** Arhitektura na podlagi dogodkov za nemoteno komunikacijo
- [x] **Inspector:** Orodja za razhroščevanje in nadzor
- [x] **Keyv:** Integracija shrambe ključ-vrednost z uporabo Keyv
- [x] **Normalizer:** Modul za preoblikovanje podatkov za razčlenjevanje (JSON, XML, YAML, CSV)
- [x] **Queue:** Upravljanje čakalnih vrst opravil (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI komponenti za gradnjo dinamičnih aplikacij
- [x] **Vue:** Omogoča integracijo z Vue.js