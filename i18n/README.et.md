> See fail on automaatselt tõlgitud **ChatGPT** abil.  
> Algne dokumentatsioon kirjutati **inglise ja portugali keeles**.  
> Kui märkate tõlkes vigu ja valdate eesti keelt,  
> olete teretulnud seda üle vaatama ja esitama **Pull Request (PR)** parandamiseks.  
> Kogu kogukond on teie panuse eest tänulik! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Skaalautuvate ja modulaarsete rakenduste loomine lepingute abil.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM versioon" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Paketi litsents" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentatsioon</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Teata probleemist</a>
</p>

## Kirjeldus

CMMV (Contract Model View) on revolutsioon veebi rakenduste arenduses, murdes seniseid paradigmasid ja muutes viisi, kuidas loome, hooldame ja skaleerime digiprojekte. Parimate tavade ja uuenduslike kontseptsioonide põhjal loodud CMMV integreerib lepingute jõu, et automaatselt genereerida tugevaid ja turvalisi struktuure, kõrvaldades käsitsi kodeerimise keerukuse ning pakkudes enneolematut arenduskogemust.

Kujutage ette platvormi, kus TypeScripti lepingute määratlemine muutub teie rakenduse keskpunktiks, luues automaatselt API-sid, kontrollerid, ORM-üksusi ja isegi binaarse RPC suhtluse – kõik optimeeritud jõudlusega ja sujuvalt integreerituna kaasaegsete tehnoloogiatega. CMMV-ga mitte ainult ei kiirenda arendust, vaid tagab ka koodi kvaliteedi ja järjepidevuse, vähendades oluliselt vigu ja uuesti tegemist.

Lisaks pakub CMMV reaktiivset ja kerget liidest, mis põhineb Vue 3-l, kuid toetab ka muid raamistikke nagu React ja Angular, keskendudes alati jõudlusele ja SEO-le. CMMV puhul ei ole frontend pelgalt esitluskiht, vaid teie rakenduse lahutamatu ja dünaamiline osa, mis on reaalajas sünkroonitud back-endiga.

Olenemata sellest, kas olete kogenud arendaja või algaja, annab CMMV kõigile võimaluse luua võimsaid, skaleeritavaid ja kaasaegseid süsteeme, kõrvaldades tehnilised takistused ning võimaldades loovusel ja innovatsioonil olla teie arendusprotsessi keskmes. See ei ole lihtsalt raamistik, vaid uus viis veebirakenduste tuleviku kujundamiseks.

## Filosoofia

CMMV eesmärk on lihtsustada arendusprotsessi, kasutades ära TypeScripti võimsat tüübisüsteemi ja dekoraatoreid. See kõrvaldab vajaduse raskete frontend-raamistike järele, keskendudes andmesidumise ja interaktsioonide otsesele juhtimisele, säilitades samas paindlikkuse moodulipõhise disaini kaudu.

## Omadused

- **Lepingu-põhine arendus:** Kasutage TypeScripti lepinguid mudelite, kontrollerite ja muu määratlemiseks.
- **Modulaarne arhitektuur:** Koostage oma rakendus moodulitena, muutes selle haldamise ja laiendamise lihtsaks.
- **Toetus RPC ja REST jaoks:** Sisseehitatud tugi binaarsele RPC suhtlusele WebSocketi kaudu ning traditsioonilistele REST API-dele.
- **Expressi integratsioon:** Sujuv integreerimine Expressiga, pakkudes tuttavat ja võimekat HTTP-serveri keskkonda.
- **Laiendatav:** Väga kohandatav ja lihtne laiendada oma moodulite ja komponentidega.

## CLI-ga seadistamine

CMMV pakub nüüd käsurealiidest (CLI), et kiirendada installiprotsessi ja konfigureerida projekt kiiresti vastavalt soovitud seadetele.

Uue projekti alustamiseks saate kasutada järgmist käsku:

```bash
$ pnpm dlx @cmmv/cli@latest create <projekti-nimi>
```

See käsk juhendab teid läbi seadistuse, küsides eelistatud konfiguratsioonide kohta, nagu Vite, RPC, vahemälu, andmebaasi tüüp ja vaatesüsteem (nt Vue 3 või Reactivity). See loob automaatselt vajalikud failid ja kaustad, seadistab sõltuvused ning konfigureerib projekti.

## Käsitsi seadistamine

Kui eelistate projekti käsitsi seadistada, saate siiski installida vajalikud moodulid eraldi:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Kiirstart

Allpool on lihtne näide, kuidas luua uus CMMV rakendus:

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

# Omadused

## 🟢 Core
- [x] Rakenduse juhtimine, lepingute laadimine, mudelid ja mudelite genereerimine
- [x] Alus transpilerite loomiseks
- [x] Põhiabstraktsioon HTTP, WS, lepingute ja teenuste jaoks
- [x] Alus Singleton-klassi rakendamiseks
- [x] Lepingute, hookide, metaandmete ja teenuste dekoraatorid
- [x] Konfiguratsiooni valideerimine ja juurdepääsukontroll kõigis moodulites
- [x] Hookide süsteem
- [x] Telemeetria ja logimine
- [x] Registrite loomise alus

## 🔐 Auth
- [x] Üldine juurdepääsu kontroll rakendusele
- [x] Kohalik kasutajate registreerimine ja sisselogimine
- [ ] Autentimine teenusepakkuja kaudu (Google, Facebook jne)
- [x] reCAPTCHA
- [x] Juurdepääsu uuendamine värskendustokeniga
- [x] Täielik 2FA tugi koos QR-koodi genereerimise ja valideerimisega
- [x] Sessioonikontroll sõrmejälje, IP ja kasutajaagendi põhjal

## 🚀 Vahemälu
- [x] Optimeeritud süsteemivastused, kasutades mälus hoidmist, ühilduv Redis, Memcached, MongoDB või binaarfailid
- [x] Lihtsad integreerimise dekoraatorid kontrolleritele ja väravatele
- [x] Automaatne integratsioon lepingutega
- [x] API vahemälust andmete hankimiseks, värskendamiseks või eemaldamiseks

## 🌐 HTTP
- [x] API kättesaadavus `@cmmv/server` või teiste adapterite kaudu nagu Express
- [x] Automaatne kontrollerite ja teenuste genereerimine
- [x] Integratsioon `@cmmv/cache` ja `@cmmv/auth`-iga
- [x] Express Adapter
- [ ] Fastify Adapter

## 📡 Protobuf
- [x] `.proto` failide genereerimine RPC suhtluseks lepingute põhjal
- [x] TypeScripti liideste ja tüüpide genereerimine
- [x] JSON-lepingute genereerimine esikülje jaoks
- [x] Lepingute sidumine

## 🗄 Andmebaas
- [x] SQLite, MySQL, PostgreSQL, SQL Server, Oracle ja MongoDB integratsioon
- [x] Automaatne TypeORM üksuste loomine
- [x] Indeksite automaatne genereerimine
- [x] Suhete automaatne loomine
- [x] Andmete valideerimine
- [x] CRUD operatsioonid RPC ja REST jaoks
- [x] Otsingufiltrid (sorteerimine, ID-filtreerimine, leheküljestamine)
- [x] Teenuste ülekirjutamine otse andmebaasiga integreerimiseks
- [x] Integratsioon `@cmmv/cache` ja `@cmmv/auth`-iga

## ⏳ Ajastamine
- [x] Dekoraatorid etteplaneeritud ülesannete loomiseks (cron)
- [x] Planeeritud ülesannete haldamine

## 🎨 Vaade
- [x] SSR SEO optimeerimiseks
- [x] Dünaamilised mallid, sarnased EJS-iga
- [x] Vaadete mootor, mis ühildub Expressiga
- [x] Rahvusvahelistamine
- [x] Alatemplaatide otsene lisamine HTML-i
- [x] Dünaamiline metaandmete haldamine (skriptid, lingid, meta, päis, pealkiri)
- [x] CSS-i ja JavaScripti kimpude loomine
- [x] Läbipaistev RPC integratsioon

## 🔄 WS (WebSocket)
- [x] RPC suhtlusväravate automaatne genereerimine
- [x] Andmete pakkimise abstraktsioon
- [x] WebSocket suhtluse rakendamine nii kliendi kui ka serveri jaoks

## 🧩 Moodulid
- [x] **Swagger**: Pakub API dokumentatsiooni koos Swaggeri integreerimisega.
- [x] **Testing**: Sisaldab nüüd üksusteste, S2S teste ja moke.
- [x] **Elastic**: Elasticsearchi integratsioon indeksite ja dokumentide haldamiseks.
- [x] **Email**: E-posti haldamise moodul SMTP või AWS SES kaudu.
- [x] **Encryptor**: ECC-põhine krüptimine, AES-256-GCM.
- [x] **Events**: Sündmustepõhine arhitektuur sujuvaks suhtluseks.
- [x] **Inspector**: Silumis- ja monitooringutööriistad.
- [x] **Keyv**: Võtme-väärtuse salvestuse integreerimine Keyv abil.
- [x] **Normalizer**: Andmete teisendamise moodul, mis toetab JSON, XML, YAML, CSV.
- [x] **Queue**: Tööde järjekorra haldus (Kafka, RabbitMQ, Redis).
- [x] **UI**: UI komponendid dünaamiliste rakenduste loomiseks.
- [x] **Vue**: Lubab integreerimise Vue.js-iga.