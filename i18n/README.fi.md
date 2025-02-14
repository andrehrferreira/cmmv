> Tämä tiedosto on käännetty automaattisesti **ChatGPT**:n avulla.  
> Alkuperäinen dokumentaatio on kirjoitettu **englanniksi ja portugaliksi**.  
> Jos huomaat käännösvirheitä ja hallitset sujuvasti suomen kielen,  
> olet tervetullut tarkistamaan sen ja lähettämään **Pull Request (PR)**:n korjauksia varten.  
> Koko yhteisö arvostaa panostasi! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Skaalautuvien ja modulaaristen sovellusten rakentaminen sopimuksia käyttäen.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Versio" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Paketin Lisenssi" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Dokumentaatio</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Ilmoita ongelmasta</a>
</p>
 
## Kuvaus

CMMV (Contract Model View) on mullistus verkkosovelluskehityksessä, joka rikkoo perinteisiä paradigmoja ja määrittelee uudelleen, miten luomme, ylläpidämme ja skaalautuvia digitaalisia projekteja. Se pohjautuu parhaisiin käytäntöihin ja innovatiivisiin käsitteisiin yhdistäen sopimusten voiman, jotta se voi automaattisesti luoda vankkoja ja turvallisia rakenteita. Tämä eliminoi manuaalisen koodin monimutkaisuuden ja tarjoaa ennennäkemättömän kehityskokemuksen.

Kuvittele alusta, jossa TypeScript-sopimukset ovat sovelluksesi ydin, ja joka generoi automaattisesti API:t, kontrollerit, ORM-entiteetit ja jopa binäärisen RPC-viestinnän – kaikki optimoidulla suorituskyvyllä ja täydellisellä integraatiolla moderneimpiin teknologioihin. CMMV:n avulla et vain nopeuta kehitystä, vaan varmistat myös koodin laadun ja johdonmukaisuuden, mikä vähentää virheitä ja uudelleenkirjoittamista merkittävästi.

Lisäksi CMMV tarjoaa reaktiivisen ja kevyen käyttöliittymän, joka perustuu Vue 3:een, mutta tukee myös muita kehyksiä, kuten React ja Angular, keskittyen aina suorituskykyyn ja SEO-optimalointiin. CMMV:n avulla frontend ei ole vain esityskerros, vaan olennainen ja dynaaminen osa sovellustasi, joka on reaaliaikaisesti synkronoitu backendin kanssa.

Olitpa sitten kokenut kehittäjä tai vasta-alkaja, CMMV antaa kaikille mahdollisuuden rakentaa tehokkaita, skaalautuvia ja moderneja järjestelmiä poistamalla tekniset esteet ja asettamalla luovuuden ja innovaation kehitysprosessin keskiöön. Se on enemmän kuin kehys – se on uusi tapa ajatella ja rakentaa verkkosovellusten tulevaisuutta.

## Filosofia

CMMV pyrkii yksinkertaistamaan kehitysprosessia hyödyntämällä TypeScriptin tehokasta tyyppijärjestelmää ja dekorattoreita. Se poistaa raskaiden frontend-kehysten tarpeen keskittymällä suoraan tietojen sidontaan ja vuorovaikutuksiin, samalla säilyttäen joustavuuden modulaarisen suunnittelun avulla.

## Ominaisuudet

- **Sopimuslähtöinen kehitys:** Käytä TypeScript-sopimuksia määrittämään mallit, kontrollerit ja paljon muuta.
- **Modulaarinen arkkitehtuuri:** Rakenna sovelluksesi moduulien avulla helpottaaksesi hallintaa ja skaalaamista.
- **RPC- ja REST-tuki:** Sisäänrakennettu tuki binääriselle RPC-viestinnälle WebSocketin kautta sekä perinteisille REST API -rajapinnoille.
- **Express-integraatio:** Saumaton integrointi Expressin kanssa, tarjoten tutun ja vankan HTTP-palvelinympäristön.
- **Laajennettavuus:** Helposti räätälöitävissä ja laajennettavissa omilla moduuleilla ja komponenteilla.

## CLI-asennus

CMMV tarjoaa nyt CLI-työkalun (Command Line Interface), joka nopeuttaa asennusprosessia ja auttaa sinua määrittämään projektisi nopeasti haluamillasi asetuksilla.

Uuden projektin alustamiseen voit käyttää seuraavaa komentoa:

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

Tämä komento opastaa sinut vaiheittaisen määrityksen läpi, kysyen haluamistasi asetuksista, kuten Viten, RPC:n, välimuistin, tietokantatyypin ja näkymäasetusten (esim. Vue 3 tai Reactivity) käyttöönotosta. Se luo automaattisesti tarvittavat tiedostot ja kansiot, asentaa riippuvuudet ja määrittää projektin.

## Manuaalinen asennus

Jos haluat määrittää projektin manuaalisesti, voit asentaa tarvittavat moduulit yksittäin:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Nopea aloitus

Alla on yksinkertainen esimerkki uuden CMMV-sovelluksen luomisesta:

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

# Ominaisuudet

## 🟢 Ydin
- [x] Sovelluksen hallinta, sopimusten lataaminen, mallit ja mallien generointi
- [x] Perusta transpilerien luomiselle
- [x] Ydinabstraktio HTTP-, WS-, sopimus- ja palvelutasolle
- [x] Perustoteutus Singleton-luokille
- [x] Sopimus-, hook-, metadata- ja palveludekoraattorit
- [x] Määritysten validointi ja pääsynhallinta kaikissa moduuleissa
- [x] Hooks-järjestelmä
- [x] Telemetria ja lokitus
- [x] Perusta rekisterien luomiselle

## 🔐 Autentikointi
- [x] Yleinen sovelluksen pääsynhallinta
- [x] Paikallinen käyttäjärekisteröinti ja sisäänkirjautuminen
- [ ] Sisäänkirjautuminen palveluntarjoajien kautta (Google, Facebook, jne.)
- [x] reCAPTCHA
- [x] Päivitystunnus (refresh token) käyttöoikeuden uusimiseen
- [x] Täysi 2FA-tuki QR-koodin generoinnilla ja validoinnilla
- [x] Istunnon hallinta sormenjäljen, IP-osoitteen ja käyttäjäagentin perusteella

## 🚀 Välimuisti
- [x] Optimoidut järjestelmän vastaukset käyttäen muistin sisäistä välimuistia, joka on yhteensopiva Redisin, Memcachedin, MongoDB:n tai binaaritiedostojen kanssa
- [x] Yksinkertaiset integrointidekoraattorit ohjaimille ja yhdyskäytäville
- [x] Automaattinen integrointi sopimusten kanssa
- [x] API tietojen hakemiseen, päivittämiseen tai poistamiseen välimuistista

## 🌐 HTTP
- [x] API:n tarjoaminen `@cmmv/server` kautta tai muiden adapterien, kuten Expressin, avulla
- [x] Automaattinen ohjainten ja palveluiden generointi
- [x] Integrointi `@cmmv/cache` ja `@cmmv/auth` kanssa
- [x] Express Adapter
- [ ] Fastify Adapter

## 📡 Protobuf
- [x] `.proto`-tiedostojen generointi RPC-viestintään sopimusten perusteella
- [x] Rajapintojen ja tyyppimäärittelyjen generointi TypeScriptille
- [x] JSON-sopimusten generointi frontend-käyttöön
- [x] Sopimusten yhdistäminen

## 🗄 Tietovarasto
- [x] SQL, MySQL, PostgreSQL, SQL Server, Oracle ja MongoDB -integraatio
- [x] Automaattinen entiteettien luonti TypeORM:lle
- [x] Indeksien automaattinen generointi
- [x] Suhdekaavioiden automaattinen generointi
- [x] Tietojen validointi
- [x] CRUD-toiminnot RPC- ja REST-käyttöön
- [x] Hakusuodattimet (järjestäminen, ID-suodatus, sivutus)
- [x] Palveluiden ylikirjoitus suoraan tietovarastointegraatiota varten
- [x] Integrointi `@cmmv/cache` ja `@cmmv/auth` kanssa

## ⏳ Ajastettu suoritus (Scheduling)
- [x] Dekoraattorit ajastettujen tehtävien luomiseen (cron)
- [x] Ajastettujen tehtävien hallinta

## 🎨 Näkymä (View)
- [x] SSR (Server-Side Rendering) SEO-optimointia varten
- [x] Dynaamiset mallipohjat (esim. EJS)
- [x] Express-yhteensopiva näkymämoottori
- [x] Kansainvälistämistuki
- [x] Alinäkymien sisällyttäminen suoraan HTML:ään
- [x] Dynaaminen metadata (skriptit, linkit, meta, otsikko)
- [x] CSS- ja JavaScript-tiedostojen niputus
- [x] Läpinäkyvä RPC-integraatio

## 🔄 WS (WebSocket)
- [x] RPC-viestinnän yhdyskäytävien automaattinen generointi
- [x] Datan pakkausabstraktio
- [x] WebSocket-viestinnän toteutus sekä asiakas- että palvelinpuolella

## 🧩 Moduulit
- [x] **Swagger**: Tarjoaa API-dokumentaation Swagger-integraation avulla.
- [x] **Testing**: Sisältää yksikkötestauksen, S2S-testauksen ja mockauksen.
- [x] **Elastic**: Elasticsearch-integraatio hakemistojen ja dokumenttien hallintaan.
- [x] **Email**: Sähköpostien käsittelymoduuli SMTP- tai AWS SES -tuen avulla.
- [x] **Encryptor**: ECC-pohjainen salaus, AES-256-GCM
- [x] **Events**: Tapahtumapohjainen arkkitehtuuri saumattomaan viestintään
- [x] **Inspector**: Virheenkorjaus- ja valvontatyökalut
- [x] **Keyv**: Avain-arvopohjainen tietovarastointi Keyv-kirjastolla
- [x] **Normalizer**: Tiedonmuunnosmoduuli (JSON, XML, YAML, CSV)
- [x] **Queue**: Työjonojen hallinta (Kafka, RabbitMQ, Redis)
- [x] **UI**: Käyttöliittymäkomponentit dynaamisten sovellusten rakentamiseen
- [x] **Vue**: Mahdollistaa integraation Vue.js:n kanssa