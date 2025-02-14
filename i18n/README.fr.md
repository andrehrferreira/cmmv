> Ce fichier a été **traduit automatiquement** par **ChatGPT**.  
> La documentation originale a été rédigée en **anglais et portugais**.  
> Si vous trouvez des erreurs dans la traduction et que vous maîtrisez le français,  
> n'hésitez pas à les corriger et à soumettre une **Pull Request (PR)**.  
> Toute la communauté vous sera reconnaissante pour votre contribution ! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Construire des applications évolutives et modulaires à l'aide de contrats.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Version NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licence du paquet" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Signaler un problème</a>
</p>

## Description

CMMV (Contract Model View) est une révolution dans le développement d'applications web, brisant les paradigmes et redéfinissant la manière dont nous créons, maintenons et évoluons les projets numériques. Inspiré des meilleures pratiques et concepts innovants, CMMV intègre la puissance des contrats pour générer automatiquement des structures robustes et sécurisées, éliminant ainsi la complexité du code manuel et offrant une expérience de développement sans précédent.

Imaginez une plateforme où la définition des contrats en TypeScript devient le cœur de votre application, générant automatiquement des API, des contrôleurs, des entités ORM et même une communication via RPC binaire, le tout avec des performances optimisées et une intégration transparente avec les technologies les plus modernes. Avec CMMV, non seulement vous accélérez le développement, mais vous garantissez également la qualité et la cohérence de votre code, réduisant drastiquement les erreurs et les tâches répétitives.

De plus, CMMV propose une interface réactive et légère, basée sur Vue 3, mais capable de prendre en charge d'autres frameworks tels que React et Angular, en mettant toujours l'accent sur la performance et le SEO. Avec CMMV, le frontend n'est pas seulement une couche de présentation, mais une partie intégrante et dynamique de votre application, synchronisée en temps réel avec le backend.

Que vous soyez un développeur expérimenté ou un débutant en programmation, CMMV permet à tous de construire des systèmes puissants, évolutifs et modernes, en éliminant les barrières techniques et en plaçant la créativité et l'innovation au cœur de votre processus de développement. C'est plus qu'un framework, c'est une nouvelle façon de penser et de construire l'avenir des applications web.

## Philosophie

CMMV vise à simplifier le processus de développement en exploitant le puissant système de typage et les décorateurs de TypeScript. Il élimine le besoin de frameworks frontend lourds en mettant l'accent sur le contrôle direct de la liaison des données et des interactions, tout en conservant une flexibilité grâce à une conception modulaire.

## Fonctionnalités

- **Développement basé sur les contrats :** Utilisez les contrats TypeScript pour définir les modèles, contrôleurs et bien plus encore.
- **Architecture modulaire :** Composez votre application à l'aide de modules, ce qui facilite la gestion et l'évolution.
- **Support RPC et REST :** Prise en charge intégrée du RPC binaire via WebSocket et des API REST traditionnelles.
- **Intégration avec Express :** Intégration fluide avec Express pour un environnement serveur HTTP familier et robuste.
- **Extensible :** Hautement personnalisable et facile à étendre avec vos propres modules et composants.

## Installation avec CLI

CMMV fournit désormais une CLI (Interface en Ligne de Commande) pour simplifier le processus d'installation et configurer rapidement votre projet avec les paramètres souhaités.

Pour initialiser un nouveau projet, utilisez la commande suivante :

```bash
$ pnpm dlx @cmmv/cli@latest create <nom-du-projet>
```

Cette commande vous guidera à travers un processus de configuration interactif, vous demandant vos préférences telles que l'activation de Vite, RPC, le cache, le type de référentiel et la configuration de la vue (par exemple, Vue 3 ou Reactivity). Il créera automatiquement les fichiers et dossiers nécessaires, configurera les dépendances et mettra en place le projet.

## Installation manuelle

Si vous préférez configurer le projet manuellement, vous pouvez toujours installer les modules nécessaires individuellement :

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Démarrage rapide

Voici un exemple simple de création d'une nouvelle application CMMV :

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

# Fonctionnalités

## 🟢 Core
- [x] Contrôle de l'application, chargement des contrats, modèles et génération de modèles
- [x] Base pour la création de transpileurs
- [x] Abstraction principale pour HTTP, WS, contrats et services
- [x] Implémentation de base pour les classes Singleton
- [x] Décorateurs pour les contrats, hooks, métadonnées et services
- [x] Validation et contrôle d'accès aux configurations dans tous les modules
- [x] Système de hooks
- [x] Télémétrie et journalisation (logging)
- [x] Base pour la création de registres

## 🔐 Auth
- [x] Contrôle général d'accès à l'application
- [x] Inscription et connexion locale des utilisateurs
- [ ] Connexion via fournisseur (Google, Facebook, etc.)
- [x] reCAPTCHA
- [x] Token de rafraîchissement pour renouvellement de session
- [x] Support complet du 2FA avec génération de QR-Code et validation
- [x] Contrôle de session basé sur l'empreinte digitale, l'IP et l'agent utilisateur

## 🚀 Cache
- [x] Optimisation des réponses système avec un cache en mémoire compatible avec Redis, Memcached, MongoDB ou fichiers binaires
- [x] Décorateurs d'intégration simple pour les contrôleurs et les passerelles
- [x] Intégration automatique avec les contrats
- [x] API pour récupérer, mettre à jour ou supprimer des données mises en cache

## 🌐 HTTP
- [x] API disponible via `@cmmv/server` ou d'autres adaptateurs comme Express
- [x] Génération automatique des contrôleurs et des services
- [x] Intégration avec `@cmmv/cache` et `@cmmv/auth`
- [x] Adaptateur Express
- [ ] Adaptateur Fastify

## 📡 Protobuf
- [x] Génération de fichiers `.proto` pour la communication RPC basée sur les contrats
- [x] Génération d'interfaces et de définitions de types pour TypeScript
- [x] Génération de contrats JSON pour une utilisation frontend
- [x] Interconnexion entre contrats

## 🗄 Repository
- [x] Intégration SQLite, MySQL, PostgreSQL, SQL Server, Oracle et MongoDB
- [x] Création automatique d'entités pour TypeORM
- [x] Auto-génération des index
- [x] Auto-génération des relations
- [x] Validation des données
- [x] CRUD pour RPC et REST
- [x] Filtres de recherche (tri, filtrage par ID, pagination)
- [x] Surcharge des services pour une intégration directe avec le repository
- [x] Intégration avec `@cmmv/cache`, `@cmmv/auth`

## ⏳ Scheduling
- [x] Décorateurs pour la création de tâches planifiées (cron)
- [x] Gestion des tâches planifiées

## 🎨 View
- [x] Rendu côté serveur (SSR) pour l'optimisation SEO
- [x] Templates dynamiques similaires à EJS
- [x] Moteur de rendu de vue compatible avec Express
- [x] Support de l'internationalisation
- [x] Inclusion directe de sous-vues dans le HTML
- [x] Gestion dynamique des métadonnées (scripts, liens, meta, header, title)
- [x] Compilation de bundles CSS et JavaScript
- [x] Intégration transparente avec RPC

## 🔄 WS (WebSocket)
- [x] Génération automatique des passerelles de communication RPC
- [x] Abstraction de l'encapsulation des données
- [x] Implémentation de la communication WebSocket pour client et serveur

## 🧩 Modules
- [x] **Swagger** : Fournit une documentation API avec intégration Swagger.
- [x] **Testing** : Comprend maintenant les tests unitaires, tests S2S et mocks.
- [x] **Elastic** : Intégration Elasticsearch pour la gestion des index et documents.
- [x] **Email** : Module de gestion des e-mails via SMTP ou AWS SES.
- [x] **Encryptor** : Cryptographie basée sur ECC, AES-256-GCM.
- [x] **Events** : Architecture orientée événements pour une communication fluide.
- [x] **Inspector** : Outils de débogage et de surveillance.
- [x] **Keyv** : Intégration avec Keyv pour un stockage clé-valeur.
- [x] **Normalizer** : Module de transformation des données et parsing (JSON, XML, YAML, CSV).
- [x] **Queue** : Gestion des files d'attente pour les jobs (Kafka, RabbitMQ, Redis).
- [x] **UI** : Composants UI pour construire des applications dynamiques.
- [x] **Vue** : Permet l'intégration avec Vue.js.