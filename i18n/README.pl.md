> Ten plik został automatycznie przetłumaczony za pomocą **ChatGPT**.  
> Oryginalna dokumentacja została napisana w językach **angielskim i portugalskim**.  
> Jeśli zauważysz błędy w tłumaczeniu i dobrze znasz język polski,  
> przejrzyj je i prześlij **Pull Request (PR)**.  
> Cała społeczność będzie wdzięczna za Twój wkład! 🙌 

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Tworzenie skalowalnych i modułowych aplikacji za pomocą kontraktów.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Wersja NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licencja pakietu" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentacja</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Zgłoś problem</a>
</p>

## Opis (Description)

CMMV (Contract Model View) to rewolucja w tworzeniu aplikacji internetowych, łamiąca schematy i redefiniująca sposób, w jaki tworzymy, utrzymujemy i skalujemy projekty cyfrowe. Inspirowany najlepszymi praktykami i innowacyjnymi koncepcjami, CMMV wykorzystuje kontrakty do automatycznego generowania solidnych i bezpiecznych struktur, eliminując złożoność ręcznego kodowania i oferując niezrównane doświadczenie w programowaniu.

Wyobraź sobie platformę, na której definicja kontraktów w TypeScript staje się sercem Twojej aplikacji, automatycznie generując API, kontrolery, encje ORM, a nawet binarną komunikację RPC – wszystko z optymalną wydajnością i płynną integracją z nowoczesnymi technologiami. Dzięki CMMV nie tylko przyspieszasz rozwój aplikacji, ale również zapewniasz jakość i spójność kodu, drastycznie redukując liczbę błędów i konieczność poprawek.

Ponadto CMMV oferuje lekkie i reaktywne środowisko interfejsu użytkownika, oparte na Vue 3, ale kompatybilne również z innymi frameworkami, takimi jak React i Angular, zawsze skupiając się na wydajności i SEO. Z CMMV frontend nie jest tylko warstwą prezentacyjną – staje się integralną i dynamiczną częścią Twojej aplikacji, zsynchronizowaną w czasie rzeczywistym z backendem.

Niezależnie od tego, czy jesteś doświadczonym programistą, czy dopiero zaczynasz, CMMV pozwala każdemu tworzyć nowoczesne, wydajne i skalowalne systemy, eliminując bariery techniczne i pozwalając skupić się na kreatywności i innowacji. To coś więcej niż framework – to nowy sposób myślenia i budowania przyszłości aplikacji internetowych.

## Filozofia (Philosophy)

CMMV upraszcza proces programowania, wykorzystując potężny system typów i dekoratory TypeScript. Eliminuje konieczność używania ciężkich frameworków frontendowych, koncentrując się na bezpośredniej kontroli nad wiązaniem danych i interakcjami, jednocześnie zapewniając elastyczność dzięki modułowej architekturze.

## Funkcje (Features)

- **Rozwój oparty na kontraktach:** Definiowanie modeli, kontrolerów i innych elementów za pomocą kontraktów w TypeScript.
- **Modularna architektura:** Strukturyzacja aplikacji w moduły, ułatwiająca zarządzanie i skalowanie.
- **Obsługa RPC i REST:** Wbudowane wsparcie dla binarnego RPC za pomocą WebSocket oraz tradycyjnych API REST.
- **Integracja z Express:** Płynna integracja z Express, zapewniająca znane i stabilne środowisko serwera HTTP.
- **Rozszerzalność:** Łatwość dostosowywania i rozszerzania poprzez własne moduły i komponenty.

## Konfiguracja za pomocą CLI (Setup with CLI)

CMMV dostarcza teraz interfejs CLI (Command Line Interface), który upraszcza proces instalacji i pozwala szybko skonfigurować projekt zgodnie z preferencjami.

Aby rozpocząć nowy projekt, użyj poniższego polecenia:

```bash
$ pnpm dlx @cmmv/cli@latest create <nazwa-projektu>
```

Polecenie to przeprowadzi Cię przez proces konfiguracji, umożliwiając wybór preferowanych opcji, takich jak Vite, RPC, cache, typ repozytorium oraz konfiguracja widoków (Vue 3 lub Reactivity). System automatycznie wygeneruje niezbędne pliki i foldery, skonfiguruje zależności i przygotuje projekt do pracy.

## Ręczna konfiguracja (Legacy Setup)

Jeśli wolisz ręczną konfigurację projektu, nadal możesz zainstalować wymagane moduły osobno:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Szybki start (Quick Start)

Poniżej znajduje się prosty przykład, jak utworzyć nową aplikację CMMV:

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

# Funkcje (Features)

## 🟢 Rdzeń (Core)
- [x] Kontrola aplikacji, ładowanie kontraktów, modele i generowanie modeli
- [x] Podstawa do tworzenia transpilerów
- [x] Abstrakcja rdzenia dla HTTP, WS, kontraktów i usług
- [x] Implementacja klasy Singleton
- [x] Dekoratory dla kontraktów, hooków, metadanych i usług
- [x] Walidacja konfiguracji i kontrola dostępu we wszystkich modułach
- [x] System hooków
- [x] Telemetria i logowanie
- [x] Podstawa do zarządzania rejestrami

## 🔐 Autoryzacja (Auth)
- [x] Ogólna kontrola dostępu do aplikacji
- [x] Rejestracja i logowanie użytkowników lokalnych
- [ ] Logowanie przez dostawców (Google, Facebook itp.)
- [x] reCAPTCHA
- [x] Token odświeżania dla odnawiania sesji
- [x] Pełne wsparcie dla 2FA z generowaniem i walidacją kodów QR
- [x] Kontrola sesji na podstawie odcisku palca, IP i agenta użytkownika

## 🚀 Cache
- [x] Optymalizacja odpowiedzi systemu poprzez pamięć podręczną kompatybilną z Redis, Memcached, MongoDB lub plikami binarnymi
- [x] Proste dekoratory integracyjne dla kontrolerów i bram
- [x] Automatyczna integracja z kontraktami
- [x] API do pobierania, aktualizowania lub usuwania danych z pamięci podręcznej

## 🌐 HTTP
- [x] Dostępność API poprzez `@cmmv/server` lub inne adaptery, takie jak Express
- [x] Automatyczne generowanie kontrolerów i usług
- [x] Integracja z `@cmmv/cache` i `@cmmv/auth`
- [x] Adapter Express
- [ ] Adapter Fastify

## 📡 Protobuf
- [x] Generowanie plików `.proto` dla komunikacji RPC na podstawie kontraktów
- [x] Generowanie interfejsów i definicji typów dla TypeScript
- [x] Generowanie kontraktów JSON do wykorzystania w frontendzie
- [x] Powiązania między kontraktami

## 🗄 Repozytorium (Repository)
- [x] Integracja z SQL, MySQL, PostgreSQL, SQL Server, Oracle i MongoDB
- [x] Automatyczne tworzenie encji dla TypeORM
- [x] Automatyczne generowanie indeksów
- [x] Automatyczne generowanie relacji
- [x] Walidacja danych
- [x] Operacje CRUD dla RPC i REST
- [x] Filtry wyszukiwania (sortowanie, filtrowanie ID, paginacja)
- [x] Nadpisywanie usług dla bezpośredniej integracji z repozytorium
- [x] Integracja z `@cmmv/cache`, `@cmmv/auth`

## ⏳ Planowanie zadań (Scheduling)
- [x] Dekoratory do tworzenia zaplanowanych zadań (cron)
- [x] Zarządzanie zaplanowanymi zadaniami

## 🎨 Widok (View)
- [x] SSR dla optymalizacji SEO
- [x] Dynamiczne szablony podobne do EJS
- [x] Silnik widoków kompatybilny z Express
- [x] Obsługa internacjonalizacji (i18n)
- [x] Bezpośrednie osadzanie pod-widoków w HTML
- [x] Dynamiczne zarządzanie metadanymi (skrypty, linki, meta, nagłówki, tytuły)
- [x] Kompilacja połączonych plików CSS i JavaScript
- [x] Przejrzysta integracja RPC

## 🔄 WebSocket (WS)
- [x] Automatyczne generowanie bramek komunikacyjnych RPC
- [x] Abstrakcja pakowania danych
- [x] Implementacja komunikacji WebSocket dla klienta i serwera

## 🧩 Moduły (Modules)
- [x] **Swagger:** Dokumentacja API z integracją Swagger
- [x] **Testing:** Obsługa testów jednostkowych, S2S i mocków
- [x] **Elastic:** Integracja z Elasticsearch do zarządzania indeksami i dokumentami
- [x] **Email:** Moduł obsługi wiadomości e-mail przy użyciu SMTP lub AWS SES
- [x] **Encryptor:** Szyfrowanie oparte na ECC, AES-256-GCM
- [x] **Events:** Architektura oparta na zdarzeniach do płynnej komunikacji
- [x] **Inspector:** Narzędzia do debugowania i monitorowania
- [x] **Keyv:** Integracja przechowywania klucz-wartość z Keyv
- [x] **Normalizer:** Moduł transformacji danych dla parsowania (JSON, XML, YAML, CSV)
- [x] **Queue:** Zarządzanie kolejkami zadań (Kafka, RabbitMQ, Redis)
- [x] **UI:** Komponenty UI do budowy dynamicznych aplikacji
- [x] **Vue:** Możliwość integracji z Vue.js