> Šis fails tika automātiski tulkots, izmantojot **ChatGPT**.  
> Oriģinālā dokumentācija tika rakstīta **angļu un portugāļu** valodās.  
> Ja pamanāt kļūdas tulkojumā un labi pārzināt latviešu valodu,  
> lūdzu, pārskatiet un iesniedziet **Pull Request (PR)**.  
> Visa kopiena būs pateicīga par jūsu ieguldījumu! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Mērogojamu un modulāru lietotņu izstrāde, izmantojot līgumus.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM versija" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Pakotnes licence" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentācija</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Ziņot par problēmu</a>
</p>

## Apraksts (Description)

CMMV (Contract Model View) ir revolūcija tīmekļa lietotņu izstrādē, mainot paradigmu un pārdefinējot to, kā mēs veidojam, uzturam un paplašinām digitālos projektus. Iedvesmojoties no labākās prakses un inovatīviem konceptiem, CMMV integrē līgumu spēku, lai automātiski ģenerētu stabilas un drošas struktūras. Tas novērš manuālā koda sarežģītību un nodrošina nepieredzētu izstrādes pieredzi.

Iedomājieties platformu, kur TypeScript līgumu definīcija kļūst par jūsu lietotnes sirdi, automātiski ģenerējot API, kontrolierus (controllers), ORM entītijas un pat bināro RPC komunikāciju, nodrošinot optimālu veiktspēju un vienkāršu integrāciju ar mūsdienīgām tehnoloģijām. Ar CMMV jūs ne tikai paātrināt izstrādi, bet arī garantējat sava koda kvalitāti un konsekvenci, būtiski samazinot kļūdas un atkārtotu darbu.

Turklāt CMMV piedāvā reaktīvu un vieglu saskarni, kuras pamatā ir Vue 3, bet tā atbalsta arī citus ietvarus, piemēram, React un Angular, vienmēr koncentrējoties uz veiktspēju un SEO optimizāciju. Izmantojot CMMV, frontends nav tikai prezentācijas slānis, bet gan integrāla un dinamiska jūsu lietotnes daļa, kas tiek sinhronizēta reāllaikā ar backend.

Neatkarīgi no tā, vai esat pieredzējis izstrādātājs vai tikai iesācējs, CMMV ļauj ikvienam veidot spēcīgas, modernas un mērogojamas sistēmas, novēršot tehniskos šķēršļus un ļaujot radošumam un inovācijām būt jūsu izstrādes centra daļai. Tas ir kas vairāk nekā ietvars – tas ir jauns veids, kā domāt un veidot tīmekļa lietotņu nākotni.

## Filozofija (Philosophy)

CMMV mērķis ir vienkāršot izstrādes procesu, izmantojot TypeScript spēcīgo tipizācijas sistēmu un dekoratorus. Tas novērš smagu frontend ietvaru nepieciešamību, koncentrējoties uz tiešu kontroli pār datu sasaisti un mijiedarbību, vienlaikus saglabājot elastību, izmantojot modulāru dizainu.

## Funkcijas (Features)

- **Līgumu vadīta izstrāde:** Izmantojiet TypeScript līgumus, lai definētu modeļus, kontrolierus un citus elementus.
- **Modulāra arhitektūra:** Veidojiet savu lietotni, izmantojot moduļus, padarot to viegli pārvaldāmu un paplašināmu.
- **RPC un REST atbalsts:** Integrēts atbalsts gan bināram RPC, izmantojot WebSocket, gan tradicionālām REST API.
- **Express integrācija:** Vienkārša integrācija ar Express, nodrošinot pazīstamu un stabilu HTTP servera vidi.
- **Paplašināmība:** Augsti pielāgojama un viegli paplašināma ar saviem moduļiem un komponentēm.

## Iestatīšana ar CLI (Setup with CLI)

CMMV tagad nodrošina CLI (komandrindas saskarni), kas vienkāršo instalācijas procesu un ļauj ātri konfigurēt projektu ar vēlamajiem iestatījumiem.

Lai inicializētu jaunu projektu, izmantojiet šo komandu:

```bash
$ pnpm dlx @cmmv/cli@latest create <projekta-nosaukums>
```

Šī komanda sāks vadītu iestatīšanas procesu, kurā varēsiet izvēlēties vēlamās konfigurācijas, piemēram, Vite, RPC, kešošanu, repozitorija tipu un skatu iestatījumus (piemēram, Vue 3 vai Reactivity). Tā automātiski izveidos nepieciešamos failus un mapes, konfigurēs atkarības un sagatavos projektu.

## Manuālā iestatīšana (Legacy Setup)

Ja vēlaties konfigurēt projektu manuāli, joprojām varat instalēt nepieciešamos moduļus individuāli:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Ātrā startēšana (Quick Start)

Zemāk ir sniegts vienkāršs piemērs, kā izveidot jaunu CMMV lietotni:

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

# Funkcijas (Features)

## 🟢 Pamatfunkcionalitāte (Core)
- [x] Lietotnes kontrole, līgumu ielāde, modeļi un modeļu ģenerēšana
- [x] Bāze transpilatoru izveidei
- [x] Pamatabstrakcija HTTP, WS, līgumu un pakalpojumu pārvaldībai
- [x] Singleton klases pamatīstenošana
- [x] Līgumu, āķu (hooks), metadatu un pakalpojumu dekoratori
- [x] Konfigurācijas pārbaude un piekļuves kontrole visiem moduļiem
- [x] Āķu sistēma
- [x] Telemetrija un žurnālfailu ierakstīšana
- [x] Bāze reģistru izveidei

## 🔐 Autentifikācija (Auth)
- [x] Vispārīga lietotnes piekļuves kontrole
- [x] Vietējā lietotāja reģistrācija un pieslēgšanās
- [ ] Pieslēgšanās, izmantojot pakalpojumu sniedzējus (Google, Facebook u.c.)
- [x] reCAPTCHA
- [x] Atjaunošanas marķieris sesijas atjaunošanai
- [x] Pilnīgs divu faktoru autentifikācijas (2FA) atbalsts ar QR koda ģenerēšanu un validāciju
- [x] Sesijas pārvaldība, pamatojoties uz pirkstu nospiedumiem, IP un lietotāja aģentu

## 🚀 Kešatmiņa (Cache)
- [x] Optimizētas sistēmas atbildes, izmantojot kešatmiņu atmiņā, kas saderīga ar Redis, Memcached, MongoDB vai binārajiem failiem
- [x] Vienkārši integrācijas dekoratori kontrolieriem un vārteju moduļiem
- [x] Automātiska integrācija ar līgumiem
- [x] API kešatmiņā saglabātu datu iegūšanai, atjaunināšanai vai noņemšanai

## 🌐 HTTP
- [x] API pieejamība, izmantojot `@cmmv/server` vai citus adapterus, piemēram, Express
- [x] Automātiska kontrolieru un pakalpojumu ģenerēšana
- [x] Integrācija ar `@cmmv/cache` un `@cmmv/auth`
- [x] Express adapteris
- [ ] Fastify adapteris

## 📡 Protobuf
- [x] `.proto` failu ģenerēšana RPC saziņai, pamatojoties uz līgumiem
- [x] Interfeisu un tipu definīciju ģenerēšana TypeScript
- [x] JSON līgumu ģenerēšana frontend lietojumam
- [x] Līgumu savstarpēja sasaistīšana

## 🗄 Datu glabātuve (Repository)
- [x] SQL, MySQL, PostgreSQL, SQL Server, Oracle un MongoDB integrācija
- [x] Automātiska TypeORM entītiju izveide
- [x] Automātiska indeksu ģenerēšana
- [x] Automātiska attiecību ģenerēšana
- [x] Datu validācija
- [x] CRUD operācijas RPC un REST
- [x] Meklēšanas filtri (kārtošana, ID filtrēšana, lapošana)
- [x] Pakalpojumu pārrakstīšana tiešai integrācijai ar datu glabātuvi
- [x] Integrācija ar `@cmmv/cache`, `@cmmv/auth`

## ⏳ Uzdevumu plānošana (Scheduling)
- [x] Dekoratori ieplānotu uzdevumu izveidei (cron)
- [x] Ieplānoto uzdevumu pārvaldība

## 🎨 Skats (View)
- [x] SSR SEO optimizācijai (servera puses renderēšana)
- [x] Dinamiski veidnes līdzīgi EJS
- [x] Skata dzinējs, kas saderīgs ar Express
- [x] Internacionalizācijas (i18n) atbalsts
- [x] Tieša apakšskatu iekļaušana HTML
- [x] Dinamiska metadatu pārvaldība (skripti, saites, meta, galvenes, nosaukumi)
- [x] Apvienota CSS un JavaScript kompilācija
- [x] Caurspīdīga RPC integrācija

## 🔄 WebSocket (WS)
- [x] Automātiska RPC saziņas vārtu ģenerēšana
- [x] Datu pakešu abstrakcija
- [x] WebSocket saziņas ieviešana klienta un servera pusē

## 🧩 Moduļi (Modules)
- [x] **Swagger:** API dokumentācija ar Swagger integrāciju
- [x] **Testing:** Ietver vienību testēšanu, S2S testēšanu un imitācijas (mocks)
- [x] **Elastic:** Elasticsearch integrācija indeksu un dokumentu pārvaldībai
- [x] **Email:** E-pasta pārvaldības modulis, izmantojot SMTP vai AWS SES
- [x] **Encryptor:** ECC balstīta šifrēšana, AES-256-GCM
- [x] **Events:** Notikumu vadīta arhitektūra nevainojamai saziņai
- [x] **Inspector:** Diagnostikas un monitoringa rīki
- [x] **Keyv:** Atslēgu-vērtību glabātuve, izmantojot Keyv
- [x] **Normalizer:** Datu pārveides modulis JSON, XML, YAML, CSV parsēšanai
- [x] **Queue:** Darbu rindas pārvaldība (Kafka, RabbitMQ, Redis)
- [x] **UI:** UI komponenti dinamisku lietotņu veidošanai
- [x] **Vue:** Vue.js integrācijas iespējas