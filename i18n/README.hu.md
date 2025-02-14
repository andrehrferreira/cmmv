> Ez a fájl automatikusan lett lefordítva a **ChatGPT** segítségével.  
> Az eredeti dokumentáció **angol és portugál** nyelven íródott.  
> Ha hibát talál a fordításban, és jól beszéli a magyar nyelvet,  
> bátran küldje el javításait **Pull Request (PR)** formájában.  
> A közösség hálás lesz a hozzájárulásáért! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Méretezhető és moduláris alkalmazások létrehozása szerződések használatával.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Verzió" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Csomag Licenc" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentáció</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Hibajelentés</a>
</p>

## Leírás (Description)

A CMMV (Contract Model View) forradalmat hoz a webalkalmazás-fejlesztésben, újradefiniálva a digitális projektek létrehozásának, karbantartásának és méretezésének módját. A legjobb gyakorlatok és innovatív koncepciók által inspirálva a CMMV integrálja a szerződések erejét, automatikusan létrehozva robusztus és biztonságos struktúrákat. Ez kiküszöböli a manuális kódolás bonyolultságát és egyedülálló fejlesztési élményt biztosít.

Képzeld el, hogy az alkalmazásod TypeScript szerződések meghatározásán alapul, amelyek automatikusan generálnak API-kat, vezérlőket (controllers), ORM entitásokat és akár bináris RPC kommunikációt is, optimalizált teljesítménnyel és a legmodernebb technológiákkal való zökkenőmentes integrációval. A CMMV segítségével nemcsak a fejlesztést gyorsíthatod fel, hanem garantálhatod a kód minőségét és konzisztenciáját is, jelentősen csökkentve a hibákat és az újrafeldolgozást.

Ezenkívül a CMMV egy reaktív és könnyű felületet biztosít, amely a Vue 3-ra épül, de támogatja más keretrendszereket, például a React és az Angular megoldásokat is, miközben a teljesítményre és a keresőoptimalizálásra (SEO) összpontosít. A CMMV-ben a frontend nem csupán egy megjelenítési réteg, hanem az alkalmazás szerves és dinamikus része, amely valós időben szinkronizálódik a backenddel.

Legyen szó tapasztalt fejlesztőről vagy kezdő programozóról, a CMMV mindenkit felhatalmaz arra, hogy modern, erőteljes és skálázható rendszereket építsen, eltávolítva a technikai akadályokat és előtérbe helyezve a kreativitást és az innovációt. Ez nem csupán egy keretrendszer, hanem egy új szemlélet és egy új módja a webalkalmazások jövőjének felépítésének.

## Filozófia (Philosophy)

A CMMV célja a fejlesztési folyamat egyszerűsítése a TypeScript erőteljes típuskezelő rendszerének és dekorátorainak kihasználásával. Kiküszöböli a nehézkes frontend keretrendszerek szükségességét azáltal, hogy közvetlen ellenőrzést biztosít az adatkötések és interakciók felett, miközben megőrzi a rugalmasságot a moduláris kialakítással.

## Funkciók (Features)

- **Szerződésvezérelt fejlesztés:** Használj TypeScript szerződéseket modellek, vezérlők és egyéb elemek meghatározásához.
- **Moduláris architektúra:** Modulok segítségével építsd fel az alkalmazásodat, így könnyebbé téve a kezelést és a skálázást.
- **RPC és REST támogatás:** Beépített támogatás bináris RPC-hez WebSocketen keresztül és hagyományos REST API-khoz.
- **Express integráció:** Zökkenőmentes integráció az Express-szel egy ismerős és robusztus HTTP szerver környezethez.
- **Bővíthető:** Nagyon testreszabható és könnyen kiterjeszthető saját modulokkal és komponensekkel.

## Telepítés CLI-vel (Setup with CLI)

A CMMV most egy CLI-t (Command Line Interface) biztosít, amely leegyszerűsíti a telepítési folyamatot és lehetővé teszi a projekt gyors beállítását a kívánt konfigurációkkal.

Egy új projekt inicializálásához használd az alábbi parancsot:

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

Ez a parancs egy irányított beállítási folyamaton vezet végig, amelyben megkérdezi az előnyben részesített beállításokat, például a Vite, RPC, gyorsítótárazás, adattár típusa és nézetbeállítások (pl. Vue 3 vagy Reactivity) engedélyezését. Automatikusan létrehozza a szükséges fájlokat és mappákat, beállítja a függőségeket és konfigurálja a projektet.

## Manuális telepítés (Legacy Setup)

Ha manuálisan szeretnéd beállítani a projektet, akkor az alábbi csomagokat külön is telepítheted:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Gyorsindítás (Quick Start)

Az alábbi példa bemutatja, hogyan hozhatsz létre egy új CMMV alkalmazást:

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

# Funkciók (Features)

## 🟢 Core
- [x] Alkalmazásvezérlés, szerződésbetöltés, modellek és modellgenerálás
- [x] Alap a transzpilerek létrehozásához
- [x] Magabstrakció HTTP, WS, szerződések és szolgáltatások számára
- [x] Singleton osztály alapimplementációja
- [x] Szerződés, hook, metadat és szolgáltatás dekorátorok
- [x] Konfiguráció ellenőrzése és hozzáférés-vezérlés az összes modulon keresztül
- [x] Hook rendszer
- [x] Telemetria és naplózás
- [x] Regisztrációs rendszerek alapja

## 🔐 Hitelesítés (Auth)
- [x] Általános alkalmazáshozzáférés-vezérlés
- [x] Helyi felhasználói regisztráció és bejelentkezés
- [ ] Bejelentkezés szolgáltatón keresztül (Google, Facebook, stb.)
- [x] reCAPTCHA
- [x] Frissítő token a munkamenet megújításához
- [x] Teljes 2FA támogatás QR-kód generálással és érvényesítéssel
- [x] Munkamenet-vezérlés ujjlenyomat, IP és felhasználói ügynök alapján

## 🚀 Gyorsítótár (Cache)
- [x] Optimalizált rendszerreakciók memória-alapú gyorsítótár használatával, amely kompatibilis Redis, Memcached, MongoDB vagy bináris fájlokkal
- [x] Egyszerű integrációs dekorátorok vezérlők és átjárók számára
- [x] Automatikus integráció szerződésekkel
- [x] API a gyorsítótárazott adatok lekéréséhez, frissítéséhez vagy eltávolításához

## 🌐 HTTP
- [x] API elérhetőség az `@cmmv/server` vagy más adapterek, például Express segítségével
- [x] Automatikus vezérlő és szolgáltatásgenerálás
- [x] Integráció `@cmmv/cache` és `@cmmv/auth` modulokkal
- [x] Express adapter
- [ ] Fastify adapter

## 📡 Protobuf
- [x] `.proto` fájl generálása RPC kommunikációhoz szerződések alapján
- [x] Interfészek és TypeScript típusdefiníciók generálása
- [x] JSON szerződésgenerálás frontend használatra
- [x] Szerződések közötti kapcsolat létrehozása

## 🗄 Adatbázis-kezelő (Repository)
- [x] SQLite, MySQL, PostgreSQL, SQL Server, Oracle és MongoDB integráció
- [x] Automatikus entitásgenerálás TypeORM számára
- [x] Indexek automatikus generálása
- [x] Kapcsolatok automatikus generálása
- [x] Adatérvényesítés
- [x] CRUD műveletek RPC és REST számára
- [x] Keresési szűrők (rendezés, ID szűrés, lapozás)
- [x] Szolgáltatások felülírása közvetlen adatbázis integrációhoz
- [x] Integráció `@cmmv/cache`, `@cmmv/auth` modulokkal

## ⏳ Ütemezés (Scheduling)
- [x] Dekorátorok ütemezett feladatok létrehozásához (cron)
- [x] Ütemezett feladatok kezelése

## 🎨 Nézet (View)
- [x] SSR a SEO optimalizálás érdekében
- [x] Dinamikus sablonok, hasonlóan az EJS-hez
- [x] Express kompatibilis nézetmotor
- [x] Többnyelvűség támogatása (i18n)
- [x] Közvetlen alnézet-beillesztés HTML-ben
- [x] Dinamikus metadatkezelés (szkriptek, linkek, meta, fejléc, cím)
- [x] Csomagolt CSS és JavaScript fordítás
- [x] Átlátható RPC integráció

## 🔄 WebSocket (WS)
- [x] RPC kommunikációs átjárók automatikus generálása
- [x] Adatcsomagolás absztrakciója
- [x] WebSocket kommunikáció megvalósítása kliens és szerver között

## 🧩 Modulok (Modules)
- [x] **Swagger:** API dokumentáció biztosítása Swagger integrációval.
- [x] **Testing:** Egységtesztelés (unit testing), S2S tesztelés és mock támogatás.
- [x] **Elastic:** Elasticsearch integráció indexek és dokumentumok kezeléséhez.
- [x] **Email:** E-mail kezelő modul SMTP vagy AWS SES használatával.
- [x] **Encryptor:** ECC-alapú titkosítás, AES-256-GCM.
- [x] **Events:** Eseményvezérelt architektúra zökkenőmentes kommunikációhoz.
- [x] **Inspector:** Hibakeresési és monitorozási eszközök.
- [x] **Keyv:** Kulcs-érték alapú adattárolás Keyv használatával.
- [x] **Normalizer:** Adatformázási modul JSON, XML, YAML, CSV feldolgozásához.
- [x] **Queue:** Feladatkezelő sorok (Kafka, RabbitMQ, Redis) kezelése.
- [x] **UI:** UI komponensek dinamikus alkalmazások létrehozásához.
- [x] **Vue:** Vue.js integráció lehetősége.