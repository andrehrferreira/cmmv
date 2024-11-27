<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/andrehrferreira/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Building scalable and modular applications using contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Version" /></a>
    <a href="https://github.com/andrehrferreira/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Package License" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/andrehrferreira/cmmv/issues">Report Issue</a>
</p>

## Description

CMMV (Contract-Model-Model-View) is a minimalistic and modular framework for building scalable applications in TypeScript. Inspired by modern design patterns, CMMV uses contracts to define the entire application, from ORM entities to REST controllers and WebSocket endpoints, allowing for a highly structured and maintainable codebase.

## Philosophy

CMMV aims to simplify the development process by leveraging TypeScript's powerful type system and decorators. It eliminates the need for heavy frontend frameworks by focusing on direct control over data binding and interactions, while maintaining flexibility through modular design.

## Features

- **Contract-Driven Development:** Use TypeScript contracts to define models, controllers, and more.
- **Modular Architecture:** Compose your application using modules, making it easy to manage and scale.
- **RPC & REST Support:** Integrated support for both binary RPC via WebSocket and traditional REST APIs.
- **Express Integration:** Seamless integration with Express for a familiar and robust HTTP server environment.
- **Extensible:** Highly customizable and easy to extend with your own modules and components.

## Setup with CLI

CMMV now provides a CLI (Command Line Interface) to streamline the installation process and quickly set up your project with the desired configurations.

To initialize a new project, you can use the following command:

```bash
$ pnpm dlx @cmmv/cli@latest init <project-name>
```

This command will walk you through a guided setup process, asking about your preferred configurations, such as enabling Vite, RPC, caching, repository type, and view setup (e.g., Vue 3 or Reactivity). It will automatically create the necessary files and folders, set up dependencies, and configure the project.

## Legacy Setup (Manual)

If you prefer to set up the project manually, you can still install the necessary modules individually:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view rxjs reflect-metadata class-validator class-transformer fast-json-stringify
```

## Quick Start

Below is a simple example of how to create a new CMMV application:

```typescript
import { Application } from "@cmmv/core";
import { DefaultAdapter, DefaultHTTPModule } from "@cmmv/http";
import { ProtobufModule } from "@cmmv/protobuf";
import { WSModule, WSAdapter } from "@cmmv/ws";
import { ViewModule } from "@cmmv/view";
import { RepositoryModule, Repository } from "@cmmv/repository";
import { ApplicationModule } from "./app.module";

Application.create({
    httpAdapter: DefaultAdapter,    
    wsAdapter: WSAdapter,
    modules: [
        DefaultHTTPModule,
        ProtobufModule,
        WSModule,
        ViewModule,
        RepositoryModule,
        ApplicationModule
    ],
    services: [Repository],
    contracts: [...]
});
```

## Documentation

The complete documentation is available [here](https://cmmv.io).

## Support

CMMV is an open-source project, and we are always looking for contributors to help improve it. If you encounter a bug or have a feature request, please open an issue on [GitHub](https://github.com/andrehrferreira/cmmv/issues).

## Stay in Touch

- Author - [André Ferreira](https://github.com/andrehrferreira)
- Twitter - [@andrehrferreira](https://twitter.com/andrehrferreira)
- Linkdin - [@andrehrf](https://www.linkedin.com/in/andrehrf)
- Youtube - [@Andrehrferreira](https://www.youtube.com/@Andrehrferreira)

## License

CMMV is [MIT licensed](LICENSE).
