<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Criação de aplicações escaláveis ​​e modulares usando contratos.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Version" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Package License" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentação</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Relatar problema</a>
</p>

## Descrição

O CMMV (Contract Model View) é uma revolução no desenvolvimento de aplicações web, quebrando paradigmas e redefinindo como criamos, mantemos e escalamos projetos digitais. Inspirado em melhores práticas e conceitos inovadores, o CMMV integra o poder dos contratos para gerar automaticamente estruturas robustas e seguras, eliminando a complexidade do código manual e proporcionando uma experiência de desenvolvimento sem precedentes.

Imagine uma plataforma onde a definição de contratos em TypeScript se torna o coração da sua aplicação, gerando automaticamente APIs, controladores, entidades ORM e até comunicação via RPC binário, tudo com performance otimizada e integração perfeita com as mais modernas tecnologias. Com o CMMV, você não só acelera o desenvolvimento, mas também garante a qualidade e consistência do seu código, reduzindo drasticamente erros e retrabalhos.

Além disso, o CMMV oferece uma interface reativa e leve, baseada no Vue 3, mas com capacidade de suportar outros frameworks como React e Angular, sempre com foco em performance e SEO. Com o CMMV, o frontend não é apenas uma camada de apresentação, mas uma parte integral e dinâmica da sua aplicação, sincronizada em tempo real com o backend.

Seja você um desenvolvedor experiente ou um novato em programação, o CMMV capacita todos a construir sistemas poderosos, escaláveis ​​e modernos, eliminando barreiras técnicas e permitindo que a criatividade e a inovação estejam no centro da sua jornada de desenvolvimento. É mais do que uma estrutura; é uma nova maneira de pensar e construir o futuro dos aplicativos da web.

## Filosofia

O CMMV visa simplificar o processo de desenvolvimento alavancando o poderoso sistema de tipos e decoradores do TypeScript. Ele elimina a necessidade de frameworks frontend pesados ​​ao focar no controle direto sobre vinculação de dados e interações, mantendo a flexibilidade por meio do design modular.

## Características

- **Desenvolvimento orientado a contratos:** Use contratos TypeScript para definir modelos, controladores e muito mais.
- **Arquitetura modular:** Componha seu aplicativo usando módulos, facilitando o gerenciamento e a escala.
- **Suporte a RPC e REST:** Suporte integrado para RPC binário via WebSocket e APIs REST tradicionais.
- **Integração Express:** Integração perfeita com Express para um ambiente de servidor HTTP familiar e robusto.
- **Extensível:** Altamente personalizável e fácil de estender com seus próprios módulos e componentes.

## Configuração com CLI

O CMMV agora fornece uma CLI (Command Line Interface) para agilizar o processo de instalação e configurar rapidamente seu projeto com as configurações desejadas.

Para inicializar um novo projeto, você pode usar o seguinte comando:

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

Este comando o guiará por um processo de configuração guiado, perguntando sobre suas configurações preferidas, como habilitar Vite, RPC, cache, tipo de repositório e configuração de visualização (por exemplo, Vue 3 ou Reactivity). Ele criará automaticamente os arquivos e pastas necessários, configurará dependências e configurará o projeto.

## Configuração legada (manual)

Se preferir configurar o projeto manualmente, você ainda pode instalar os módulos necessários individualmente:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Início rápido

Below is a simple example of how to create a new CMMV application:

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

# Característicos

## 🟢 Core
- [x] Controle da aplicação, carregamento dos contratos, models, geração de models
- [x] Base para criação de transpiladores
- [x] Abstração base para HTTP, WS, contratos e serviços
- [x] Base para implementação de Singleton class
- [x] Decoradores de contratos, hooks, metadata e services
- [x] Controle e validação de configurações acessíveis em todos os módulos
- [x] Hooks
- [x] Telemetria e logger
- [x] Base para criação de registradores

## 🔐 Auth
- [x] Controle geral de acesso da aplicação
- [x] Registro e Login local
- [ ] Login via provider (Google, Facebook, etc)
- [x] reCAPTCHA
- [x] Refresh token para atualização de acesso
- [x] 2FA completo com geração de QR-Code e validação
- [x] Controle de sessão por fingerprint, IP e agent

## 🚀 Cache
- [x] Otimização de respostas do sistema usando cache em memória compatível com Redis, Memcached, MongoDB ou arquivos binários
- [x] Decoradores de simples integração nos controllers e gateways
- [x] Integração automática nos contratos
- [x] API para recuperação, atualização ou remoção de cache

## 🌐 HTTP
- [x] Disponibilização de API por meio do `@cmmv/server` ou outros adaptadores como Express
- [x] Gerador automático de controllers e services
- [x] Integração com `@cmmv/cache` e `@cmmv/auth`
- [x] Express Adapter
- [ ] Fastify Adapter

## 📡 Protobuf
- [x] Geração de arquivos `.proto` para comunicação RPC com base nos contratos
- [x] Geração de interfaces e definições de tipos para TypeScript
- [x] Geração de contratos em JSON para uso em frontend
- [x] Interligação entre contratos

## 🗄 Repository
- [x] Integração SQL, MySQL, PostgreSQL, SQL Server, Oracle e MongoDB
- [x] Criação automática de entidades para TypeORM
- [x] Auto criação de index
- [x] Auto criação de relacionamento
- [x] Validação de dados
- [x] CRUD para RPC e Rest
- [x] Filtros de pesquisa (ordenação, filtro por ID, paginação)
- [x] Sobrescrita dos services para integração direta com repository
- [x] Integração com `@cmmv/cache`, `@cmmv/auth`

## ⏳ Scheduling
- [x] Decoradores para criação de tarefas pré-agendadas (cron)
- [x] Gerenciamento de tarefas pré-agendadas

## 🎨 View
- [x] SSR de informações para SEO
- [x] Templates dinâmicos similar ao EJS
- [x] View engine compatível com Express
- [x] Internacionalização
- [x] Include de sub-views direto no HTML
- [x] Metadados dinâmicos como scripts, links, meta, header, title
- [x] Criação de Bundle compactado de CSS e JavaScript
- [x] Integração para RPC transparente

## 🔄 WS (WebSocket)
- [x] Geração dos gateways de comunicação RPC
- [x] Abstração do empacotamento de dados
- [x] Implementação da comunicação WebSocket tanto client quanto server

## 🧩 Módulos  
- [x] **Swagger**: Fornece documentação da API com integração ao Swagger.  
- [x] **Testing**: Agora inclui testes unitários, testes S2S e mocks.  
- [x] **Elastic**: Integração com Elasticsearch para gerenciamento de índices e documentos.  
- [x] **Email**: Módulo para envio de e-mails usando SMTP ou AWS SES.  
- [x] **Encryptor**: Criptografia baseada em ECC, AES-256-GCM.  
- [x] **Events**: Arquitetura orientada a eventos para comunicação eficiente.  
- [x] **Inspector**: Ferramentas de depuração e monitoramento.  
- [x] **Keyv**: Integração com armazenamento chave-valor usando Keyv.  
- [x] **Normalizer**: Módulo para transformação de dados e parsing (JSON, XML, YAML, CSV).  
- [x] **Queue**: Gerenciamento de filas de jobs (Kafka, RabbitMQ, Redis).  
- [x] **UI**: Componentes de UI para construção de aplicações dinâmicas.  
- [x] **Vue**: Habilita integração com Vue.js.  