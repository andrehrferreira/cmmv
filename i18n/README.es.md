> Este archivo ha sido traducido automáticamente por **ChatGPT**.  
> La documentación original fue escrita en **inglés y portugués**.  
> Si encuentras algún error en la traducción y dominas el idioma español,  
> siéntete libre de revisarlo y enviar un **Pull Request (PR)** para corregirlo.  
> ¡Toda la comunidad te agradecerá por tu colaboración! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Creación de aplicaciones escalables y modulares utilizando contratos.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versión de NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licencia del paquete" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentación</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Reportar problema</a>
</p>
 
## Descripción

El CMMV (Contract Model View) es una revolución en el desarrollo de aplicaciones web, rompiendo paradigmas y redefiniendo la forma en que creamos, mantenemos y escalamos proyectos digitales. Inspirado en las mejores prácticas y conceptos innovadores, el CMMV integra el poder de los contratos para generar automáticamente estructuras robustas y seguras, eliminando la complejidad del código manual y proporcionando una experiencia de desarrollo sin precedentes.

Imagina una plataforma donde la definición de contratos en TypeScript se convierte en el núcleo de tu aplicación, generando automáticamente APIs, controladores, entidades ORM e incluso comunicación vía RPC binario, todo con un rendimiento optimizado y una integración perfecta con las tecnologías más modernas. Con CMMV, no solo aceleras el desarrollo, sino que también garantizas la calidad y consistencia de tu código, reduciendo drásticamente errores y retrabajos.

Además, el CMMV ofrece una interfaz reactiva y liviana, basada en Vue 3, pero con capacidad para soportar otros frameworks como React y Angular, siempre con un enfoque en rendimiento y SEO. Con CMMV, el frontend no es solo una capa de presentación, sino una parte integral y dinámica de tu aplicación, sincronizada en tiempo real con el backend.

Ya seas un desarrollador experimentado o un principiante, el CMMV te capacita para construir sistemas potentes, escalables y modernos, eliminando barreras técnicas y permitiendo que la creatividad y la innovación sean el centro de tu desarrollo. Es más que un framework; es una nueva forma de pensar y construir el futuro de las aplicaciones web.

## Filosofía

El CMMV busca simplificar el proceso de desarrollo aprovechando el potente sistema de tipos y decoradores de TypeScript. Elimina la necesidad de frameworks frontend pesados, enfocándose en el control directo sobre la vinculación de datos y las interacciones, manteniendo la flexibilidad mediante un diseño modular.

## Características

- **Desarrollo basado en contratos:** Usa contratos TypeScript para definir modelos, controladores y más.
- **Arquitectura modular:** Construye tu aplicación utilizando módulos para una gestión y escalabilidad más sencilla.
- **Soporte para RPC y REST:** Soporte integrado para comunicación RPC binaria a través de WebSocket y APIs REST tradicionales.
- **Integración con Express:** Integración fluida con Express para un entorno de servidor HTTP robusto y familiar.
- **Extensible:** Altamente personalizable y fácil de ampliar con tus propios módulos y componentes.

## Instalación mediante CLI

El CMMV ahora proporciona una CLI (Command Line Interface) para acelerar el proceso de instalación y configurar rápidamente tu proyecto con las configuraciones deseadas.

Para iniciar un nuevo proyecto, puedes usar el siguiente comando:

```bash
$ pnpm dlx @cmmv/cli@latest create <nombre-del-proyecto>
```

Este comando te guiará a través de un proceso de configuración interactivo, solicitando tus preferencias, como habilitar Vite, RPC, caché, tipo de repositorio y configuración de la vista (por ejemplo, Vue 3 o Reactivity). Creará automáticamente los archivos y carpetas necesarios, configurará dependencias y preparará el proyecto.

## Configuración manual

Si prefieres configurar el proyecto manualmente, aún puedes instalar los módulos necesarios de forma individual:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Inicio rápido

A continuación, se muestra un ejemplo simple de cómo crear una nueva aplicación CMMV:

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

## Características

## 🟢 Núcleo (Core)
- [x] Control de la aplicación, carga de contratos, modelos y generación de modelos.
- [x] Base para la creación de transpiladores.
- [x] Abstracción para HTTP, WS, contratos y servicios.
- [x] Base para la implementación de clases Singleton.
- [x] Decoradores para contratos, hooks, metadatos y servicios.
- [x] Validación de configuración accesible en todos los módulos.
- [x] Hooks.
- [x] Telemetría y logging.
- [x] Base para la creación de registradores.

## 🔐 Autenticación
- [x] Control avanzado de acceso a la aplicación.
- [x] Registro y acceso local.
- [ ] Autenticación mediante proveedor (Google, Facebook, etc.).
- [x] reCAPTCHA.
- [x] Tokens de actualización para renovación de acceso.
- [x] Autenticación de dos factores (2FA) con generación de código QR y validación.
- [x] Control de sesión mediante fingerprint, IP y user-agent.

## 🚀 Caché
- [x] Optimización de respuestas mediante caché en memoria compatible con Redis, Memcached, MongoDB o archivos binarios.
- [x] Decoradores de fácil integración en controladores y gateways.
- [x] Integración automática con contratos.
- [x] API para recuperación, actualización o eliminación de caché.

## 🌐 HTTP
- [x] Disponibilidad de API mediante `@cmmv/server` u otros adaptadores como Express.
- [x] Generación automática de controladores y servicios.
- [x] Integración con `@cmmv/cache` y `@cmmv/auth`.
- [x] Adaptador para Express.
- [ ] Adaptador para Fastify.

## 📡 Protobuf
- [x] Generación de archivos `.proto` para comunicación RPC basada en contratos.
- [x] Generación de interfaces y definiciones de tipos para TypeScript.
- [x] Generación de contratos en JSON para uso en frontend.
- [x] Interconexión entre contratos.

## 🗄 Repositorio
- [x] Integración con SQLite, MySQL, PostgreSQL, SQL Server, Oracle y MongoDB.
- [x] Creación automática de entidades para TypeORM.
- [x] Creación automática de índices.
- [x] Creación automática de relaciones.
- [x] Validación de datos.
- [x] CRUD para RPC y REST.
- [x] Filtros de búsqueda (ordenación, filtrado por ID, paginación).
- [x] Sobrescritura de servicios para integración directa con repositorios.
- [x] Integración con `@cmmv/cache`, `@cmmv/auth`.

## ⏳ Programación de tareas (Scheduling)
- [x] Decoradores para la creación de tareas programadas (cron).
- [x] Gestión de tareas preprogramadas.

## 🎨 Vista (View)
- [x] Renderizado del lado del servidor (SSR) para SEO.
- [x] Plantillas dinámicas similares a EJS.
- [x] Motor de vistas compatible con Express.
- [x] Internacionalización.
- [x] Inclusión de sub-vistas directamente en HTML.
- [x] Metadatos dinámicos como scripts, enlaces, meta tags, headers y títulos.
- [x] Creación de bundles optimizados de CSS y JavaScript.
- [x] Integración transparente para RPC.

## 🔄 WebSocket (WS)
- [x] Generación de gateways de comunicación RPC.
- [x] Abstracción del empaquetado de datos.
- [x] Implementación de WebSocket tanto para cliente como para servidor.

## 🧩 Módulos adicionales  
- [x] **Swagger**: Proporciona documentación de API con integración Swagger.  
- [x] **Testing**: Incluye pruebas unitarias, pruebas S2S y mocks.  
- [x] **Elastic**: Integración con Elasticsearch para la gestión de índices y documentos.  
- [x] **Email**: Módulo para envío de correos electrónicos mediante SMTP o AWS SES.  
- [x] **Encryptor**: Cifrado basado en ECC y AES-256-GCM.  
- [x] **Events**: Arquitectura basada en eventos para comunicación eficiente.  
- [x] **Inspector**: Herramientas de depuración y monitoreo.  
- [x] **Keyv**: Integración con almacenamiento de clave-valor.  
- [x] **Normalizer**: Módulo para transformación de datos y parsing (JSON, XML, YAML, CSV).  
- [x] **Queue**: Gestión de colas de trabajos (Kafka, RabbitMQ, Redis).  
- [x] **UI**: Componentes de interfaz de usuario para la construcción de aplicaciones dinámicas.  
- [x] **Vue**: Habilita la integración con Vue.js.  
