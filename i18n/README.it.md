> Questo file è stato tradotto automaticamente da **ChatGPT**.  
> La documentazione originale è stata scritta in **inglese e portoghese**.  
> Se trovi errori nella traduzione e conosci bene l'italiano,  
> sentiti libero di rivederla e inviare una **Pull Request (PR)**.  
> L'intera comunità ti ringrazierà per il tuo contributo! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Creazione di applicazioni scalabili e modulari utilizzando contratti.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versione NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licenza del Pacchetto" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentazione</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Segnala un Problema</a>
</p>

## Descrizione (Description)

CMMV (Contract Model View) è una rivoluzione nello sviluppo di applicazioni web, ridefinendo il modo in cui creiamo, gestiamo ed espandiamo i progetti digitali. Ispirato alle migliori pratiche e ai concetti innovativi, CMMV integra la potenza dei contratti per generare automaticamente strutture robuste e sicure. Questo elimina la complessità della scrittura manuale del codice e fornisce un'esperienza di sviluppo senza precedenti.

Immagina una piattaforma in cui la definizione dei contratti in TypeScript diventa il cuore della tua applicazione, generando automaticamente API, controller, entità ORM e persino comunicazioni RPC binarie, il tutto con prestazioni ottimizzate e un'integrazione perfetta con le tecnologie più moderne. Con CMMV, non solo velocizzi lo sviluppo, ma garantisci anche la qualità e la coerenza del tuo codice, riducendo drasticamente errori e rilavorazioni.

Inoltre, CMMV offre un'interfaccia reattiva e leggera, basata su Vue 3, ma in grado di supportare anche framework come React e Angular, mantenendo il focus sulle prestazioni e sull'ottimizzazione SEO. Con CMMV, il frontend non è solo un livello di presentazione, ma una parte integrante e dinamica della tua applicazione, sincronizzata in tempo reale con il backend.

Che tu sia un programmatore esperto o un principiante, CMMV consente a tutti di costruire sistemi potenti, moderni e scalabili, eliminando le barriere tecniche e mettendo la creatività e l'innovazione al centro del processo di sviluppo. Non è solo un framework, ma un nuovo modo di pensare e costruire il futuro delle applicazioni web.

## Filosofia (Philosophy)

CMMV mira a semplificare il processo di sviluppo sfruttando il potente sistema di tipi e i decoratori di TypeScript. Elimina la necessità di framework frontend pesanti, offrendo un controllo diretto sul data binding e sulle interazioni, pur mantenendo la flessibilità attraverso un'architettura modulare.

## Caratteristiche (Features)

- **Sviluppo Basato su Contratti:** Utilizza contratti TypeScript per definire modelli, controller e altro.
- **Architettura Modulare:** Componi la tua applicazione utilizzando moduli, semplificando la gestione e l'espansione.
- **Supporto RPC & REST:** Supporto integrato per RPC binario tramite WebSocket e API REST tradizionali.
- **Integrazione con Express:** Integrazione fluida con Express per un ambiente server HTTP familiare e robusto.
- **Estensibile:** Altamente personalizzabile e facile da estendere con moduli e componenti personalizzati.

## Configurazione con CLI (Setup with CLI)

CMMV fornisce ora una CLI (Command Line Interface) per semplificare il processo di installazione e configurare rapidamente il progetto con le impostazioni desiderate.

Per inizializzare un nuovo progetto, usa il seguente comando:

```bash
$ pnpm dlx @cmmv/cli@latest create <nome-progetto>
```

Questo comando ti guiderà attraverso un processo di configurazione interattivo, chiedendo preferenze come l'uso di Vite, RPC, caching, tipo di repository e configurazione della visualizzazione (es. Vue 3 o Reactivity). Creerà automaticamente i file e le cartelle necessarie, configurerà le dipendenze e imposterà il progetto.

## Configurazione Manuale (Legacy Setup)

Se preferisci configurare manualmente il progetto, puoi comunque installare i moduli necessari individualmente:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Avvio Rapido (Quick Start)

Ecco un semplice esempio di come creare una nuova applicazione CMMV:

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

# Caratteristiche (Features)

## 🟢 Core
- [x] Controllo dell'applicazione, caricamento dei contratti, modelli e generazione dei modelli
- [x] Base per la creazione di transpiler
- [x] Astrazione centrale per HTTP, WS, contratti e servizi
- [x] Implementazione base per la classe Singleton
- [x] Decoratori per contratti, hook, metadati e servizi
- [x] Validazione della configurazione e controllo degli accessi in tutti i moduli
- [x] Sistema di hook
- [x] Telemetria e logging
- [x] Base per la creazione di registri

## 🔐 Autenticazione (Auth)
- [x] Controllo generale degli accessi dell'applicazione
- [x] Registrazione e login utente locale
- [ ] Login tramite provider (Google, Facebook, ecc.)
- [x] reCAPTCHA
- [x] Token di aggiornamento per il rinnovo della sessione
- [x] Supporto completo per 2FA con generazione e validazione di QR-Code
- [x] Controllo della sessione basato su impronta digitale, IP e user agent

## 🚀 Cache
- [x] Risposte del sistema ottimizzate utilizzando cache in memoria compatibile con Redis, Memcached, MongoDB o file binari
- [x] Decoratori di integrazione semplici per controller e gateway
- [x] Integrazione automatica con i contratti
- [x] API per il recupero, l'aggiornamento o la rimozione dei dati in cache

## 🌐 HTTP
- [x] Disponibilità API tramite `@cmmv/server` o altri adattatori come Express
- [x] Generazione automatica di controller e servizi
- [x] Integrazione con `@cmmv/cache` e `@cmmv/auth`
- [x] Adattatore Express
- [ ] Adattatore Fastify

## 📡 Protobuf
- [x] Generazione di file `.proto` per la comunicazione RPC basata su contratti
- [x] Generazione di interfacce e definizioni di tipo per TypeScript
- [x] Generazione di contratti JSON per l'uso frontend
- [x] Collegamento tra contratti

## 🗄 Repository
- [x] Integrazione con SQL, MySQL, PostgreSQL, SQL Server, Oracle e MongoDB
- [x] Creazione automatica di entità per TypeORM
- [x] Generazione automatica degli indici
- [x] Generazione automatica delle relazioni
- [x] Validazione dei dati
- [x] Operazioni CRUD per RPC e REST
- [x] Filtri di ricerca (ordinamento, filtro ID, paginazione)
- [x] Override dei servizi per l'integrazione diretta con il repository
- [x] Integrazione con `@cmmv/cache`, `@cmmv/auth`

## ⏳ Pianificazione (Scheduling)
- [x] Decoratori per la creazione di attività pianificate (cron)
- [x] Gestione delle attività pianificate

## 🎨 Vista (View)
- [x] SSR per l'ottimizzazione SEO
- [x] Template dinamici simili a EJS
- [x] Motore di rendering compatibile con Express
- [x] Supporto per l'internazionalizzazione (i18n)
- [x] Inclusione diretta di sotto-vista in HTML
- [x] Gestione dinamica dei metadati (script, link, meta, header, title)
- [x] Compilazione di CSS e JavaScript in bundle
- [x] Integrazione RPC trasparente

## 🔄 WebSocket (WS)
- [x] Generazione automatica di gateway di comunicazione RPC
- [x] Astrazione del pacchettamento dei dati
- [x] Implementazione della comunicazione WebSocket per client e server

## 🧩 Moduli (Modules)
- [x] **Swagger:** Fornisce documentazione API con integrazione Swagger.
- [x] **Testing:** Ora include test unitari, test S2S e mock.
- [x] **Elastic:** Integrazione con Elasticsearch per la gestione di indici e documenti.
- [x] **Email:** Modulo per la gestione delle email utilizzando SMTP o AWS SES.
- [x] **Encryptor:** Crittografia basata su ECC, AES-256-GCM.
- [x] **Events:** Architettura basata su eventi per una comunicazione fluida.
- [x] **Inspector:** Strumenti di debug e monitoraggio.
- [x] **Keyv:** Integrazione con archiviazione key-value utilizzando Keyv.
- [x] **Normalizer:** Modulo di trasformazione dati per il parsing (JSON, XML, YAML, CSV).
- [x] **Queue:** Gestione delle code di lavoro (Kafka, RabbitMQ, Redis).
- [x] **UI:** Componenti UI per la creazione di applicazioni dinamiche.
- [x] **Vue:** Abilita l'integrazione con Vue.js.