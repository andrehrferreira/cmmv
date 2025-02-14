> Acest fișier a fost tradus automat prin **ChatGPT**.  
> Documentația originală a fost scrisă în **engleză și portugheză**.  
> Dacă găsiți erori în traducere și aveți cunoștințe bune de limba română,  
> vă rugăm să o revizuiți și să trimiteți un **Pull Request (PR)**.  
> Întreaga comunitate vă va aprecia contribuția! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Construirea de aplicații scalabile și modulare folosind contracte.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versiune NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licență Pachet" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentație</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Raportează o problemă</a>
</p>

## Descriere (Description)

CMMV (Contract Model View) este o revoluție în dezvoltarea aplicațiilor web, care sparge paradigmele vechi și redefinește modul în care creăm, menținem și scalăm proiectele digitale. Inspirat de cele mai bune practici și concepte inovative, CMMV integrează puterea contractelor pentru a genera automat structuri robuste și sigure. Elimini complexitatea codului manual și obții o experiență de dezvoltare fără precedent.

Imaginează-ți o platformă în care definirea contractelor în TypeScript devine inima aplicației tale, generând automat API-uri, controlere, entități ORM și chiar comunicare prin RPC binar, toate având performanță optimizată și integrare perfectă cu cele mai moderne tehnologii. Cu CMMV, nu doar că accelerezi dezvoltarea, dar și asiguri calitatea și consistența codului tău, reducând drastic erorile și rework-ul.

În plus, CMMV oferă o interfață reactivă și ușoară, bazată pe Vue 3, dar cu capacitatea de a suporta și alte framework-uri, cum ar fi React și Angular, întotdeauna cu un focus pe performanță și SEO. Cu CMMV, frontend-ul nu este doar o strat de prezentare, ci o parte integrantă și dinamică a aplicației tale, sincronizată în timp real cu backend-ul.

Indiferent dacă ești un dezvoltator experimentat sau un începător, CMMV îți permite să construiești sisteme puternice, moderne și scalabile eliminând barierele tehnice și lăsând creativitatea și inovația în centrul dezvoltării tale. Este mai mult decât un framework; este o nouă modalitate de a gândi și de a construi viitorul aplicațiilor web.

## Filosofie (Philosophy)

CMMV are ca scop simplificarea procesului de dezvoltare prin utilizarea puternicului sistem de tipuri și decoratori ai TypeScript. El elimină necesitatea unor framework-uri front-end grele, concentrându-se pe controlul direct al legăturii de date și interacțiunilor, menținând în același timp flexibilitatea printr-un design modular.

## Funcționalități (Features)

- **Dezvoltare bazată pe contracte:** Folosește contracte TypeScript pentru a defini modele, controlere și altele.
- **Arhitectură modulară:** Creează aplicația folosind module, ușurând gestionarea și scalabilitatea.
- **Suport pentru RPC și REST:** Suport integrat atât pentru RPC binar prin WebSocket, cât și pentru API-uri REST tradiționale.
- **Integrare Express:** Integrare perfectă cu Express pentru un mediu familiar și robust de server HTTP.
- **Extensibil:** Foarte personalizabil și ușor de extins cu propriile module și componente.

## Configurare cu CLI (Setup with CLI)

CMMV oferă acum un CLI (Command Line Interface) pentru a simplifica procesul de instalare și pentru a configura rapid proiectul tău cu configurările dorite.

Pentru a iniția un nou proiect, poți folosi următoarea comandă:

```bash
$ pnpm dlx @cmmv/cli@latest create <numele-proiectului>
```

Această comandă te va ghida printr-un proces de configurare, întrebându-te despre preferințele tale, precum activarea Vite, RPC, caching, tipul repository-ului și configurarea viziunii (de exemplu, Vue 3 sau Reactivity). Va crea automat fișierele și directoarele necesare, va configura dependențele și va configura proiectul.

## Configurare manuală (Legacy Setup)

Dacă preferi să configurezi proiectul manual, poți instala în continuare modulele necesare separat:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Start rapid (Quick Start)

Mai jos este un exemplu simplu despre cum să creezi o aplicație CMMV nouă:

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

# Funcționalități (Features)

## 🟢 Core
- [x] Controlul aplicației, încărcarea contractelor, modele și generarea de modele
- [x] Baza pentru crearea transpilerelor
- [x] Abstracție de bază pentru HTTP, WS, contracte și servicii
- [x] Implementare de bază pentru clasa Singleton
- [x] Decoratori pentru contracte, hook-uri, metadate și servicii
- [x] Validarea configurațiilor și controlul accesului în toate modulele
- [x] Sistem de hook-uri
- [x] Telemetrie și logging
- [x] Baza pentru crearea de registre

## 🔐 Autentificare (Auth)
- [x] Controlul general al accesului aplicației
- [x] Înregistrare și autentificare locală a utilizatorilor
- [ ] Autentificare prin furnizor (Google, Facebook, etc.)
- [x] reCAPTCHA
- [x] Token de actualizare pentru reînnoirea sesiunii
- [x] Suport complet pentru 2FA cu generare și validare QR Code
- [x] Controlul sesiunii pe baza amprentei, IP-ului și agentului utilizatorului

## 🚀 Cache
- [x] Răspunsuri optimizate ale sistemului utilizând cache în memorie compatibil cu Redis, Memcached, MongoDB sau fișiere binare
- [x] Decoratori de integrare simpli pentru controlere și gateway-uri
- [x] Integrare automată cu contractele
- [x] API pentru a prelua, actualiza sau elimina date cache-uite

## 🌐 HTTP
- [x] Disponibilitatea API-ului prin `@cmmv/server` sau alte adaptoare ca Express
- [x] Generarea automată a controlerelor și serviciilor
- [x] Integrare cu `@cmmv/cache` și `@cmmv/auth`
- [x] Adaptor Express
- [ ] Adaptor Fastify

## 📡 Protobuf
- [x] Generare fișiere `.proto` pentru comunicarea RPC pe baza contractelor
- [x] Generarea de interfețe și definiții de tipuri pentru TypeScript
- [x] Generarea de contracte JSON pentru utilizare pe frontend
- [x] Interlinking între contracte

## 🗄 Repository
- [x] Integrare cu SQLite, MySQL, PostgreSQL, SQL Server, Oracle și MongoDB
- [x] Generarea automată a entităților pentru TypeORM
- [x] Generarea automată a indicilor
- [x] Generarea automată a relațiilor
- [x] Validarea datelor
- [x] Operații CRUD pentru RPC și REST
- [x] Filtre de căutare (sortare, filtrare ID, paginare)
- [x] Suprascriere de servicii pentru integrarea directă cu repository-ul
- [x] Integrare cu `@cmmv/cache`, `@cmmv/auth`

## ⏳ Scheduling
- [x] Decoratori pentru crearea de task-uri programate (cron)
- [x] Managementul task-urilor programate

## 🎨 View
- [x] SSR pentru optimizarea SEO
- [x] Șabloane dinamice similare cu EJS
- [x] Motor de vizualizare compatibil cu Express
- [x] Suport pentru internaționalizare (i18n)
- [x] Inclusiune directă a sub-vizualizărilor în HTML
- [x] Management dinamic al metadatelor (scripturi, link-uri, meta, titlu, header)
- [x] Compilare CSS și JavaScript împreună
- [x] Integrare transparentă a RPC

## 🔄 WebSocket (WS)
- [x] Generare automată de gateway-uri pentru comunicarea RPC
- [x] Abstracție pentru ambalarea datelor
- [x] Implementare de comunicare WebSocket pentru client și server

## 🧩 Module
- [x] **Swagger:** Documentație API cu integrare Swagger
- [x] **Testing:** Include acum testare unitară, testare S2S și mock-uri
- [x] **Elastic:** Integrare Elasticsearch pentru gestionarea indicilor și documentelor
- [x] **Email:** Modul de procesare a email-urilor folosind SMTP sau AWS SES
- [x] **Encryptor:** Criptare bazată pe ECC, AES-256-GCM
- [x] **Events:** Arhitectură bazată pe evenimente pentru comunicare fluidă
- [x] **Inspector:** Unelte de depanare și monitorizare
- [x] **Keyv:** Integrare cu Keyv pentru stocarea de tip key-value
- [x] **Normalizer:** Modul de transformare a datelor pentru parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Gestionarea cozilor de joburi (Kafka, RabbitMQ, Redis)
- [x] **UI:** Componente UI pentru crearea de aplicații dinamice
- [x] **Vue:** Permite integrarea cu Vue.js