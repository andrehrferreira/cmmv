> Šis failas buvo automatiškai išverstas naudojant **ChatGPT**.  
> Originali dokumentacija buvo parašyta **anglų ir portugalų** kalbomis.  
> Jei pastebėjote vertimo klaidų ir gerai mokate lietuvių kalbą,  
> prašome jas peržiūrėti ir pateikti **Pull Request (PR)**.  
> Visa bendruomenė bus dėkinga už jūsų indėlį! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Kuriant keičiamo dydžio ir modulinės struktūros programas naudojant sutartis.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM versija" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Paketo licencija" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentacija</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Pranešti apie problemą</a>
</p>

## Aprašymas (Description)

CMMV (Contract Model View) yra revoliucija internetinių programų kūrime, keičianti požiūrį į skaitmeninių projektų kūrimą, valdymą ir plėtrą. Įkvėptas geriausių praktikų ir inovatyvių koncepcijų, CMMV integruoja sutarčių galią automatiniam tvirtų ir saugių struktūrų generavimui. Tai pašalina rankinio kodo rašymo sudėtingumą ir suteikia naują vystymo patirtį.

Įsivaizduokite platformą, kurioje TypeScript sutartys tampa jūsų programos pagrindu, automatiškai generuojant API, valdiklius (controllers), ORM objektus ir net dvejetainį RPC ryšį, visa tai užtikrinant optimalų našumą ir vientisą integraciją su naujausiomis technologijomis. Naudodami CMMV ne tik paspartinate vystymą, bet ir užtikrinate kodo kokybę bei nuoseklumą, žymiai sumažindami klaidas ir pakartotinį darbą.

Be to, CMMV siūlo reaguojančią ir lengvą sąsają, pagrįstą Vue 3, tačiau suderinamą su kitais karkasais, tokiais kaip React ir Angular, sutelkiant dėmesį į našumą ir SEO optimizavimą. Naudodami CMMV, jūsų frontendas tampa ne tik pateikimo sluoksniu, bet ir neatsiejama programos dalimi, sinchronizuojama su backend sistema realiu laiku.

Nesvarbu, ar esate patyręs programuotojas, ar naujokas, CMMV leidžia kiekvienam kurti modernias, galingas ir keičiamo dydžio sistemas, pašalinant techninius barjerus ir suteikiant prioritetą kūrybiškumui bei inovacijoms. Tai daugiau nei karkasas – tai naujas būdas mąstyti ir kurti internetinių programų ateitį.

## Filosofija (Philosophy)

CMMV siekia supaprastinti vystymo procesą, pasinaudodamas TypeScript stipria tipų sistema ir dekoratoriais. Jis pašalina sunkių frontend karkasų poreikį, suteikdamas tiesioginę duomenų valdymo ir sąveikos kontrolę, išlaikydamas lankstumą dėl modulinio dizaino.

## Funkcijos (Features)

- **Sutarčių pagrindu sukurtas vystymas:** Naudokite TypeScript sutartis modeliams, valdikliams ir kitiems komponentams apibrėžti.
- **Modulinė architektūra:** Kurkite savo programą naudodami modulius, kad būtų lengviau valdyti ir plėsti.
- **RPC ir REST palaikymas:** Integruotas palaikymas dvejetainiam RPC per WebSocket ir tradicinėms REST API.
- **Express integracija:** Sklandi integracija su Express, suteikiant pažįstamą ir patikimą HTTP serverio aplinką.
- **Plečiamumas:** Lengvai pritaikoma ir išplečiama naudojant pasirinktinius modulius ir komponentus.

## Sąranka naudojant CLI (Setup with CLI)

CMMV dabar pateikia CLI (komandinės eilutės sąsają), kad supaprastintų diegimo procesą ir greitai sukonfigūruotų jūsų projektą pagal pageidaujamas parinktis.

Norėdami inicializuoti naują projektą, naudokite šią komandą:

```bash
$ pnpm dlx @cmmv/cli@latest create <projekto-pavadinimas>
```

Ši komanda pradės vedlio sąrankos procesą, kuriame galėsite pasirinkti nustatymus, tokius kaip Vite, RPC, talpyklos valdymas, saugyklos tipas ir peržiūros parinktys (pvz., Vue 3 arba Reactivity). Ji automatiškai sukurs reikalingus failus ir aplankus, nustatys priklausomybes ir sukonfigūruos projektą.

## Rankinė sąranka (Legacy Setup)

Jei pageidaujate projektą nustatyti rankiniu būdu, galite įdiegti reikiamus modulius atskirai:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Greitas pradžios vadovas (Quick Start)

Žemiau pateikiamas paprastas pavyzdys, kaip sukurti naują CMMV programą:

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

# Funkcijos (Features)

## 🟢 Branduolys (Core)
- [x] Programos valdymas, sutarčių įkėlimas, modeliai ir modelių generavimas
- [x] Bazė transpliatorių kūrimui
- [x] Pagrindinė abstrakcija HTTP, WS, sutarčių ir paslaugų valdymui
- [x] Singleton klasės pagrindinė implementacija
- [x] Dekoratoriai sutarčių, hook'ų, metaduomenų ir paslaugų apdorojimui
- [x] Konfigūracijos patikra ir prieigos kontrolė visiems moduliams
- [x] Hook sistema
- [x] Telemetrija ir žurnalizavimas
- [x] Registrų kūrimo pagrindas

## 🔐 Autentifikacija (Auth)
- [x] Bendroji programos prieigos kontrolė
- [x] Vietinio naudotojo registracija ir prisijungimas
- [ ] Prisijungimas per tiekėjus (Google, Facebook ir kt.)
- [x] reCAPTCHA
- [x] Atnaujinimo raktas sesijos atnaujinimui
- [x] Pilnas dviejų veiksnių autentifikavimo (2FA) palaikymas su QR kodo generavimu ir patvirtinimu
- [x] Sesijos valdymas pagal pirštų atspaudus, IP ir naudotojo agentą

## 🚀 Talpykla (Cache)
- [x] Optimizuotos sistemos reakcijos naudojant atmintyje laikomą talpyklą, suderinamą su Redis, Memcached, MongoDB ar dvejetainiais failais
- [x] Paprasti integracijos dekoratoriai valdikliams ir vartams
- [x] Automatinė integracija su sutartimis
- [x] API talpykloje esančių duomenų gavimui, atnaujinimui ar pašalinimui

## 🌐 HTTP
- [x] API prieinamumas per `@cmmv/server` ar kitus adapterius, pvz., Express
- [x] Automatinis valdiklių ir paslaugų generavimas
- [x] Integracija su `@cmmv/cache` ir `@cmmv/auth`
- [x] Express adapteris
- [ ] Fastify adapteris

## 📡 Protobuf
- [x] `.proto` failų generavimas RPC ryšiui pagal sutartis
- [x] Sąsajų ir tipų apibrėžimų generavimas TypeScript
- [x] JSON sutarčių generavimas naudojimui front-end
- [x] Sutarčių tarpusavio susiejimas

## 🗄 Saugykla (Repository)
- [x] SQL, MySQL, PostgreSQL, SQL Server, Oracle ir MongoDB integracija
- [x] Automatinis TypeORM subjektų kūrimas
- [x] Automatinis indeksų generavimas
- [x] Automatinis ryšių generavimas
- [x] Duomenų validacija
- [x] CRUD operacijos RPC ir REST
- [x] Paieškos filtrai (rūšiavimas, ID filtravimas, puslapiavimas)
- [x] Paslaugų perrašymas tiesioginei integracijai su saugykla
- [x] Integracija su `@cmmv/cache`, `@cmmv/auth`

## ⏳ Tvarkaraščiai (Scheduling)
- [x] Dekoratoriai suplanuotų užduočių kūrimui (cron)
- [x] Suplanuotų užduočių valdymas

## 🎨 Vaizdas (View)
- [x] SEO optimizacijai skirtas SSR (serverio pusės atvaizdavimas)
- [x] Dinaminiai šablonai, panašūs į EJS
- [x] Vaizdo variklis, suderinamas su Express
- [x] Tarptautizacijos palaikymas (i18n)
- [x] Tiesioginis antrinių vaizdų įtraukimas į HTML
- [x] Dinaminis metaduomenų valdymas (script'ai, nuorodos, meta, antraštės, pavadinimai)
- [x] Sujungtų CSS ir JavaScript failų kompiliavimas
- [x] Skaidri RPC integracija

## 🔄 WebSocket (WS)
- [x] Automatinis RPC ryšio vartų generavimas
- [x] Duomenų pakavimo abstrakcija
- [x] WebSocket ryšio įgyvendinimas tiek kliento, tiek serverio pusėje

## 🧩 Moduliai (Modules)
- [x] **Swagger:** API dokumentacija su Swagger integracija
- [x] **Testing:** Apima vienetinius testus, S2S testavimą ir imitacijas
- [x] **Elastic:** Elasticsearch integracija indeksų ir dokumentų valdymui
- [x] **Email:** Pašto siuntimo modulis naudojant SMTP arba AWS SES
- [x] **Encryptor:** ECC pagrįstas šifravimas, AES-256-GCM
- [x] **Events:** Įvykių pagrindu sukurta architektūra sklandžiam ryšiui
- [x] **Inspector:** Derinimo ir stebėjimo įrankiai
- [x] **Keyv:** Keyv pagrindu veikianti raktų-reikšmių duomenų bazė
- [x] **Normalizer:** Duomenų transformavimo modulis JSON, XML, YAML, CSV analizavimui
- [x] **Queue:** Užduočių eilių valdymas (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI komponentai dinaminėms programoms kurti
- [x] **Vue:** Vue.js integracija
