<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Creació d'aplicacions escalables i modulars mitjançant contractes.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versió NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Llicència del paquet" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentació</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Informar d'un problema</a>
</p>

> **Avís de responsabilitat**  
> Aquest fitxer ha estat traduït automàticament per **ChatGPT**.  
> La documentació original està escrita en **anglès i portuguès**.  
> Si detectes algun error en la traducció i domines el català,  
> no dubtis a revisar-lo i enviar un **Pull Request (PR)** per corregir-lo.  
> Tota la comunitat t'estarà molt agraïda! 🙌  

## Descripció

CMMV (Contract Model View) és una revolució en el desenvolupament d'aplicacions web, trencant paradigmes i redefinint la manera com creem, mantenim i escalem projectes digitals. Inspirat en les millors pràctiques i conceptes innovadors, CMMV integra la potència dels contractes per generar automàticament estructures robustes i segures, eliminant la complexitat del codi manual i proporcionant una experiència de desenvolupament sense precedents.

Imagina una plataforma on la definició de contractes en TypeScript es converteix en el cor de la teva aplicació, generant automàticament APIs, controladors, entitats ORM i fins i tot comunicació RPC binària, tot amb un rendiment optimitzat i una integració perfecta amb les tecnologies més modernes. Amb CMMV, no només accelera el desenvolupament, sinó que també garanteix la qualitat i la coherència del teu codi, reduint dràsticament errors i repeticions de treball.

A més, CMMV ofereix una interfície reactiva i lleugera basada en Vue 3, però amb la capacitat de suportar altres frameworks com React i Angular, sempre amb un enfocament en el rendiment i el SEO. Amb CMMV, el frontend no és només una capa de presentació, sinó una part integral i dinàmica de la teva aplicació, sincronitzada en temps real amb el backend.

Tant si ets un desenvolupador experimentat com si ets nou en la programació, CMMV et permet construir sistemes potents, escalables i moderns, eliminant barreres tècniques i permetent que la creativitat i la innovació siguin el centre del teu desenvolupament. No és només un framework; és una nova manera de pensar i construir el futur de les aplicacions web.

## Filosofia

CMMV busca simplificar el procés de desenvolupament aprofitant el potent sistema de tipus i decoradors de TypeScript. Elimina la necessitat de frameworks frontend pesats en centrar-se en el control directe de l'enllaç de dades i les interaccions, mantenint la flexibilitat mitjançant un disseny modular.

## Característiques

- **Desenvolupament basat en contractes:** Utilitza contractes TypeScript per definir models, controladors i més.
- **Arquitectura modular:** Crea la teva aplicació mitjançant mòduls, facilitant la gestió i l'escalabilitat.
- **Suport per RPC i REST:** Compatible amb RPC binari via WebSocket i API REST tradicionals.
- **Integració amb Express:** Integració perfecta amb Express per a un entorn de servidor HTTP robust.
- **Extensible:** Altament personalitzable i fàcil d’ampliar amb els teus propis mòduls i components.

## Configuració amb CLI

CMMV ara proporciona una interfície de línia de comandes (CLI) per agilitzar el procés d'instal·lació i configurar ràpidament el teu projecte amb les configuracions desitjades.

Per inicialitzar un nou projecte, pots utilitzar la següent comanda:

```bash
$ pnpm dlx @cmmv/cli@latest create <nom-projecte>
```

Aquesta comanda et guiarà per un procés de configuració interactiu, preguntant sobre les opcions preferides, com ara l'activació de Vite, RPC, memòria cau, tipus de repositori i configuració de la vista (com Vue 3 o Reactivity).

## Configuració manual

Si prefereixes configurar el projecte manualment, encara pots instal·lar els mòduls necessaris individualment:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Inici ràpid

A continuació es mostra un exemple senzill de com crear una aplicació CMMV:

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

# Característiques

## 🟢 Nucli (Core)
- [x] Control de l'aplicació, càrrega de contractes, models i generació de models
- [x] Base per a la creació de transpiladors
- [x] Abstracció bàsica per a HTTP, WS, contractes i serveis
- [x] Implementació base per a classes Singleton
- [x] Decoradors per a contractes, hooks, metadades i serveis
- [x] Validació i control d'accés a la configuració de tots els mòduls
- [x] Sistema de hooks
- [x] Telemetria i registre de logs
- [x] Base per a la creació de registres

## 🔐 Autenticació (Auth)
- [x] Control general d'accés de l'aplicació
- [x] Registre i inici de sessió local
- [ ] Inici de sessió amb proveïdors externs (Google, Facebook, etc.)
- [x] reCAPTCHA
- [x] Token de refresc per a la renovació de la sessió
- [x] Suport complet per a 2FA amb generació i validació de codi QR
- [x] Control de sessió basat en empremta digital, IP i agent d'usuari

## 🚀 Caché
- [x] Optimització de respostes del sistema utilitzant memòria cau compatible amb Redis, Memcached, MongoDB o fitxers binaris
- [x] Decoradors per a una integració senzilla en controladors i passarel·les
- [x] Integració automàtica amb contractes
- [x] API per a la recuperació, actualització o eliminació de memòria cau

## 🌐 HTTP
- [x] Disponibilització de l'API a través de `@cmmv/server` o altres adaptadors com Express
- [x] Generació automàtica de controladors i serveis
- [x] Integració amb `@cmmv/cache` i `@cmmv/auth`
- [x] Adaptador per a Express
- [ ] Adaptador per a Fastify

## 📡 Protobuf
- [x] Generació de fitxers `.proto` per a la comunicació RPC basada en contractes
- [x] Generació d'interfícies i definicions de tipus per a TypeScript
- [x] Generació de contractes JSON per a ús en el frontend
- [x] Interconnexió entre contractes

## 🗄 Repositori (Repository)
- [x] Integració amb SQL, MySQL, PostgreSQL, SQL Server, Oracle i MongoDB
- [x] Creació automàtica d'entitats per a TypeORM
- [x] Creació automàtica d'índexs
- [x] Creació automàtica de relacions
- [x] Validació de dades
- [x] Operacions CRUD per a RPC i REST
- [x] Filtres de cerca (ordenació, filtratge per ID, paginació)
- [x] Sobreescriptura de serveis per a integració directa amb el repositori
- [x] Integració amb `@cmmv/cache`, `@cmmv/auth`

## ⏳ Programació (Scheduling)
- [x] Decoradors per a la creació de tasques programades (cron)
- [x] Gestió de tasques programades

## 🎨 Vista (View)
- [x] SSR per a l'optimització SEO
- [x] Plantilles dinàmiques similars a EJS
- [x] Motor de vistes compatible amb Express
- [x] Suport per a internacionalització
- [x] Inclusió de sub-vistes directament a l'HTML
- [x] Gestió de metadades dinàmiques (scripts, enllaços, meta, header, title)
- [x] Compilació de paquets de CSS i JavaScript optimitzats
- [x] Integració transparent amb RPC

## 🔄 WS (WebSocket)
- [x] Generació automàtica de passarel·les de comunicació RPC
- [x] Abstracció per a l'empaquetament de dades
- [x] Implementació de comunicació WebSocket tant per a client com per a servidor

## 🧩 Mòduls (Modules)
- [x] **Swagger**: Proporciona documentació de l'API amb integració de Swagger.  
- [x] **Testing**: Inclou proves unitàries, proves S2S i mocks.  
- [x] **Elastic**: Integració amb Elasticsearch per a la gestió d'índexs i documents.  
- [x] **Email**: Mòdul per a l'enviament de correus electrònics mitjançant SMTP o AWS SES.  
- [x] **Encryptor**: Xifratge basat en ECC, AES-256-GCM.  
- [x] **Events**: Arquitectura basada en esdeveniments per a una comunicació fluida.  
- [x] **Inspector**: Eines de depuració i monitorització.  
- [x] **Keyv**: Integració d'emmagatzematge clau-valor mitjançant Keyv.  
- [x] **Normalizer**: Mòdul per a la transformació de dades i parsing (JSON, XML, YAML, CSV).  
- [x] **Queue**: Gestió de cues de treball (Kafka, RabbitMQ, Redis).  
- [x] **UI**: Components d'interfície d'usuari per a aplicacions dinàmiques.  
- [x] **Vue**: Permet la integració amb Vue.js.  
