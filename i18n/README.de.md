<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Erstellung skalierbarer und modularer Anwendungen mit Verträgen.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM-Version" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Paketlizenz" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentation</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Problem melden</a>
</p>

## Beschreibung

CMMV (Contract Model View) ist eine Revolution in der Entwicklung von Webanwendungen, die Paradigmen bricht und definiert, wie wir digitale Projekte erstellen, warten und skalieren. CMMV nutzt Verträge zur automatischen Generierung robuster und sicherer Strukturen, wodurch die Komplexität manuellen Codes eliminiert wird und eine beispiellose Entwicklungserfahrung ermöglicht wird.

Stellen Sie sich eine Plattform vor, bei der die Definition von Verträgen in TypeScript zum Herzstück Ihrer Anwendung wird und automatisch APIs, Controller, ORM-Entitäten und sogar binäre RPC-Kommunikation generiert – alles mit optimierter Leistung und nahtloser Integration moderner Technologien. Mit CMMV beschleunigen Sie nicht nur die Entwicklung, sondern gewährleisten auch die Qualität und Konsistenz Ihres Codes, wodurch Fehler und Nacharbeiten drastisch reduziert werden.

CMMV bietet außerdem eine reaktive und leichte Benutzeroberfläche, die auf Vue 3 basiert, aber auch andere Frameworks wie React und Angular unterstützt – immer mit Fokus auf Leistung und SEO. Mit CMMV ist das Frontend nicht nur eine Präsentationsschicht, sondern ein integraler, dynamischer Teil Ihrer Anwendung, der in Echtzeit mit dem Backend synchronisiert ist.

Egal, ob Sie ein erfahrener Entwickler oder ein Anfänger sind – CMMV ermöglicht es Ihnen, leistungsstarke, skalierbare und moderne Systeme zu erstellen, technische Barrieren zu beseitigen und Kreativität und Innovation in den Mittelpunkt Ihrer Entwicklungsreise zu stellen. Es ist mehr als nur ein Framework – es ist eine neue Denkweise zur Entwicklung der Webanwendungen der Zukunft.

## Philosophie

CMMV zielt darauf ab, den Entwicklungsprozess zu vereinfachen, indem es das leistungsstarke Typsystem und die Dekoratoren von TypeScript nutzt. Es eliminiert die Notwendigkeit schwerer Frontend-Frameworks, indem es sich auf direkte Kontrolle über Datenbindung und Interaktionen konzentriert und dabei durch modulares Design flexibel bleibt.

## Funktionen

- **Vertragsbasierte Entwicklung:** Verwenden Sie TypeScript-Verträge zur Definition von Modellen, Controllern und mehr.
- **Modulare Architektur:** Erstellen Sie Ihre Anwendung mit Modulen für einfache Verwaltung und Skalierung.
- **Unterstützung für RPC und REST:** Integrierte Unterstützung für binäre RPC-Kommunikation über WebSockets sowie traditionelle REST-APIs.
- **Express-Integration:** Nahtlose Integration mit Express für eine vertraute und robuste HTTP-Serverumgebung.
- **Erweiterbarkeit:** Hochgradig anpassbar und leicht erweiterbar mit eigenen Modulen und Komponenten.

## Einrichtung mit CLI

CMMV bietet nun ein CLI-Tool (Command Line Interface), um den Installationsprozess zu vereinfachen und Ihr Projekt schnell mit den gewünschten Konfigurationen einzurichten.

Um ein neues Projekt zu initialisieren, verwenden Sie:

```bash
$ pnpm dlx @cmmv/cli@latest create <projektname>
```

Dieser Befehl führt Sie durch einen interaktiven Einrichtungsprozess, in dem Sie Optionen wie Vite, RPC, Cache, Repository-Typ und View-Setup (Vue 3 oder Reactivity) auswählen können.

## Manuelle Einrichtung

Wenn Sie Ihr Projekt lieber manuell einrichten möchten, können Sie die erforderlichen Module weiterhin einzeln installieren:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Schnellstart

Hier ein einfaches Beispiel für die Erstellung einer neuen CMMV-Anwendung:

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

# Funktionen

## 🟢 Core
- [x] Anwendungssteuerung, Laden von Verträgen, Modellen und Modellerstellung
- [x] Basis für die Erstellung von Transpilern
- [x] Kernabstraktion für HTTP, WS, Verträge und Services
- [x] Basisimplementierung für Singleton-Klassen
- [x] Dekoratoren für Verträge, Hooks, Metadaten und Services
- [x] Validierung der Konfiguration und Zugriffskontrolle über alle Module hinweg
- [x] Hook-System
- [x] Telemetrie und Logging
- [x] Basis für die Erstellung von Registern

## 🔐 Auth (Authentifizierung)
- [x] Allgemeine Zugriffskontrolle für die Anwendung
- [x] Lokale Benutzerregistrierung und Anmeldung
- [ ] Anmeldung über Anbieter (Google, Facebook usw.)
- [x] reCAPTCHA
- [x] Refresh-Token zur Sitzungsverlängerung
- [x] Vollständige 2FA-Unterstützung mit QR-Code-Generierung und Validierung
- [x] Sitzungssteuerung basierend auf Fingerabdruck, IP und Benutzeragent

## 🚀 Cache
- [x] Optimierte Systemantworten mit speicherinternem Cache, kompatibel mit Redis, Memcached, MongoDB oder Binärdateien
- [x] Einfache Integrations-Dekoratoren für Controller und Gateways
- [x] Automatische Integration in Verträge
- [x] API zum Abrufen, Aktualisieren oder Entfernen von Cache-Daten

## 🌐 HTTP
- [x] API-Bereitstellung über `@cmmv/server` oder andere Adapter wie Express
- [x] Automatische Generierung von Controllern und Services
- [x] Integration mit `@cmmv/cache` und `@cmmv/auth`
- [x] Express-Adapter
- [ ] Fastify-Adapter

## 📡 Protobuf
- [x] Generierung von `.proto`-Dateien für RPC-Kommunikation auf Basis von Verträgen
- [x] Generierung von Schnittstellen und Typdefinitionen für TypeScript
- [x] Generierung von JSON-Verträgen für die Nutzung im Frontend
- [x] Verknüpfung zwischen Verträgen

## 🗄 Repository
- [x] Integration mit SQL, MySQL, PostgreSQL, SQL Server, Oracle und MongoDB
- [x] Automatische Erstellung von Entitäten für TypeORM
- [x] Automatische Generierung von Indizes
- [x] Automatische Generierung von Beziehungen
- [x] Datenvalidierung
- [x] CRUD-Operationen für RPC und REST
- [x] Suchfilter (Sortierung, ID-Filterung, Paginierung)
- [x] Überschreiben von Services zur direkten Repository-Integration
- [x] Integration mit `@cmmv/cache`, `@cmmv/auth`

## ⏳ Scheduling (Zeitplanung)
- [x] Dekoratoren für die Erstellung geplanter Aufgaben (Cron)
- [x] Verwaltung geplanter Aufgaben

## 🎨 View (Ansicht)
- [x] SSR zur Optimierung der SEO
- [x] Dynamische Templates ähnlich wie EJS
- [x] View-Engine kompatibel mit Express
- [x] Unterstützung für Internationalisierung
- [x] Direkte Einbindung von Unteransichten in HTML
- [x] Dynamische Metadatenverwaltung (Skripte, Links, Meta, Header, Titel)
- [x] Kompiliertes Bundle aus CSS und JavaScript
- [x] Transparente RPC-Integration

## 🔄 WS (WebSocket)
- [x] Automatische Generierung von RPC-Kommunikations-Gateways
- [x] Datenpaketierungsabstraktion
- [x] WebSocket-Kommunikationsimplementierung für Client und Server

## 🧩 Module
- [x] **Swagger**: Bietet API-Dokumentation mit Swagger-Integration.  
- [x] **Testing**: Enthält nun Unit-Tests, S2S-Tests und Mocks.  
- [x] **Elastic**: Elasticsearch-Integration zur Verwaltung von Indizes und Dokumenten.  
- [x] **Email**: Modul für das Versenden von E-Mails über SMTP oder AWS SES.  
- [x] **Encryptor**: ECC-basierte Verschlüsselung, AES-256-GCM.  
- [x] **Events**: Ereignisgesteuerte Architektur für nahtlose Kommunikation.  
- [x] **Inspector**: Debugging- und Überwachungstools.  
- [x] **Keyv**: Integration mit Key-Value-Speicher über Keyv.  
- [x] **Normalizer**: Modul zur Datenumwandlung und Parsing (JSON, XML, YAML, CSV).  
- [x] **Queue**: Verwaltung von Job-Warteschlangen (Kafka, RabbitMQ, Redis).  
- [x] **UI**: UI-Komponenten für den Aufbau dynamischer Anwendungen.  
- [x] **Vue**: Ermöglicht die Integration mit Vue.js.  
