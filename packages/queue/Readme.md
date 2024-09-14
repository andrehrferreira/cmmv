<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/andrehrferreira/cmmv/main/public/assets/logo.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> A minimalistic framework for building scalable and modular applications using TypeScript contracts.</p>
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

## Installation

CMMV is available as a collection of npm packages. To install the core package, use npm:

```bash
$ npm install @cmmv/core @cmmv/http @cmmv/protobuf @cmmv/ws @cmmv/view @cmmv/repository
```

## Quick Start

Below is a simple example of how to create a new CMMV application:

```typescript
import { Application } from "@cmmv/core";
import { ExpressAdapter, ExpressModule } from "@cmmv/http";
import { ProtobufModule } from "@cmmv/protobuf";
import { WSModule, WSAdapter } from "@cmmv/ws";
import { ViewModule } from "@cmmv/view";
import { RepositoryModule, Repository } from "@cmmv/repository";
import { ApplicationModule } from "./app.module";

Application.create({
    httpAdapter: ExpressAdapter,    
    wsAdapter: WSAdapter,
    modules: [
        ExpressModule,
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
