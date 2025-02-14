> Este ficheiro foi traduzido automaticamente através do **ChatGPT**.  
> A documentação original foi escrita em **Inglês e Português**.  
> Se encontrar erros na tradução e tem bons conhecimentos de português de Portugal,  
> por favor, faça a revisão e submeta um **Pull Request (PR)**.  
> Toda a comunidade agradecerá imenso a sua contribuição! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Construção de aplicações escaláveis e modulares utilizando contratos.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Versão NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Licença do Pacote" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentação</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Reportar Problema</a>
</p>

## Descrição (Description)

CMMV (Contract Model View) é uma revolução no desenvolvimento de aplicações web, quebrando paradigmas e redefinindo como criamos, mantemos e escalamos projetos digitais. Inspirado nas melhores práticas e conceitos inovadores, CMMV integra o poder dos contratos para gerar automaticamente estruturas robustas e seguras, eliminando a complexidade do código manual e proporcionando uma experiência de desenvolvimento sem precedentes.

Imagine uma plataforma onde a definição de contratos em TypeScript se torna o coração da sua aplicação, gerando automaticamente APIs, controladores, entidades ORM e até mesmo comunicação via RPC binário, tudo com desempenho otimizado e integração perfeita com as tecnologias mais modernas. Com o CMMV, você não só acelera o desenvolvimento, como também garante a qualidade e consistência do seu código, reduzindo drasticamente erros e retrabalho.

Além disso, o CMMV oferece uma interface reativa e leve, baseada no Vue 3, mas com a capacidade de suportar outros frameworks como React e Angular, sempre focando em desempenho e SEO. Com o CMMV, o frontend não é apenas uma camada de apresentação, mas sim uma parte integral e dinâmica da sua aplicação, sincronizada em tempo real com o backend.

Quer você seja um desenvolvedor experiente ou um iniciante em programação, o CMMV capacita todos a construir sistemas poderosos, modernos e escaláveis, eliminando barreiras técnicas e permitindo que a criatividade e inovação estejam no centro da sua jornada de desenvolvimento. Ele é mais do que um framework; é uma nova maneira de pensar e construir o futuro das aplicações web.

## Filosofia (Philosophy)

O CMMV visa simplificar o processo de desenvolvimento utilizando o poderoso sistema de tipos e decoradores do TypeScript. Ele elimina a necessidade de frameworks pesados de frontend, focando no controle direto sobre o binding de dados e interações, enquanto mantém flexibilidade através de um design modular.

## Funcionalidades (Features)

- **Desenvolvimento Orientado a Contratos:** Use contratos TypeScript para definir modelos, controladores e mais.
- **Arquitetura Modular:** Organize sua aplicação usando módulos, facilitando o gerenciamento e a escalabilidade.
- **Suporte a RPC e REST:** Suporte integrado tanto para RPC binário via WebSocket quanto para APIs REST tradicionais.
- **Integração com Express:** Integração perfeita com o Express para um ambiente de servidor HTTP robusto e familiar.
- **Extensível:** Altamente personalizável e fácil de expandir com seus próprios módulos e componentes.

## Configuração com CLI (Setup with CLI)

O CMMV agora oferece uma CLI (Interface de Linha de Comando) para simplificar o processo de instalação e configurar rapidamente o seu projeto com as configurações desejadas.

Para inicializar um novo projeto, você pode usar o seguinte comando:

```bash
$ pnpm dlx @cmmv/cli@latest create <nome-do-projeto>
```

Este comando irá guiá-lo por um processo de configuração, perguntando sobre as preferências de configuração, como habilitar Vite, RPC, caching, tipo de repositório e configuração de visualização (por exemplo, Vue 3 ou Reactivity). Ele criará automaticamente os arquivos e pastas necessários, configurará as dependências e configurará o seu projeto.

## Configuração Manual (Legacy Setup)

Se você preferir configurar o projeto manualmente, ainda pode instalar os módulos necessários separadamente:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Início Rápido (Quick Start)

Aqui está um exemplo simples de como criar um novo aplicativo CMMV:

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

# Funcionalidades (Features)

## 🟢 Núcleo (Core)
- [x] Controlo da aplicação, carregamento de contratos, modelos e geração de modelos
- [x] Base para criar transpilers
- [x] Abstração do núcleo para HTTP, WS, contratos e serviços
- [x] Implementação base para a classe Singleton
- [x] Decoradores de contrato, hooks, metadados e serviços
- [x] Validação de configuração e controlo de acesso através de todos os módulos
- [x] Sistema de hooks
- [x] Telemetria e registo de logs
- [x] Base para criar registos

## 🔐 Autenticação (Auth)
- [x] Controlo de acesso geral à aplicação
- [x] Registo e login de utilizadores locais
- [ ] Login via fornecedor (Google, Facebook, etc.)
- [x] reCAPTCHA
- [x] Token de atualização para renovação da sessão
- [x] Suporte completo para 2FA com geração e validação de QR-Code
- [x] Controlo da sessão baseado em impressões digitais, IP e agente de utilizador

## 🚀 Cache
- [x] Respostas de sistema otimizadas utilizando cache em memória compatível com Redis, Memcached, MongoDB ou ficheiros binários
- [x] Decoradores de integração simples para controladores e gateways
- [x] Integração automática com contratos
- [x] API para recuperar, atualizar ou remover dados em cache

## 🌐 HTTP
- [x] Disponibilidade da API através de `@cmmv/server` ou outros adaptadores como Express
- [x] Geração automática de controladores e serviços
- [x] Integração com `@cmmv/cache` e `@cmmv/auth`
- [x] Adaptador Express
- [ ] Adaptador Fastify

## 📡 Protobuf
- [x] Geração de ficheiros `.proto` para comunicação RPC baseada em contratos
- [x] Geração de interfaces e definições de tipos para TypeScript
- [x] Geração de contratos JSON para uso no frontend
- [x] Interligação de contratos

## 🗄 Repositório (Repository)
- [x] Integração com SQLite, MySQL, PostgreSQL, SQL Server, Oracle e MongoDB
- [x] Geração automática de entidades para TypeORM
- [x] Geração automática de índices
- [x] Geração automática de relações
- [x] Validação de dados
- [x] Operações CRUD para RPC e REST
- [x] Filtros de pesquisa (ordenação, filtragem de ID, paginação)
- [x] Sobrescrita de serviços para integração direta com o repositório
- [x] Integração com `@cmmv/cache`, `@cmmv/auth`

## ⏳ Agendamento (Scheduling)
- [x] Decoradores para criação de tarefas agendadas (cron)
- [x] Gestão de tarefas agendadas

## 🎨 Visão (View)
- [x] SSR para otimização SEO
- [x] Templates dinâmicos semelhantes ao EJS
- [x] Motor de visão compatível com Express
- [x] Suporte para internacionalização (i18n)
- [x] Inclusão direta de sub-visualizações no HTML
- [x] Gestão dinâmica de metadados (scripts, links, meta, cabeçalhos, título)
- [x] Compilação de CSS e JavaScript combinados
- [x] Integração transparente de RPC

## 🔄 WebSocket (WS)
- [x] Geração automática de gateways de comunicação RPC
- [x] Abstração de empacotamento de dados
- [x] Implementação de comunicação WebSocket para cliente e servidor

## 🧩 Módulos (Modules)
- [x] **Swagger:** Documentação da API com integração do Swagger
- [x] **Testing:** Agora inclui testes unitários, testes S2S e mocks
- [x] **Elastic:** Integração com Elasticsearch para gestão de índices e documentos
- [x] **Email:** Módulo de processamento de e-mail utilizando SMTP ou AWS SES
- [x] **Encryptor:** Encriptação baseada em ECC, AES-256-GCM
- [x] **Events:** Arquitetura orientada a eventos para comunicação sem interrupções
- [x] **Inspector:** Ferramentas de depuração e monitoramento
- [x] **Keyv:** Integração de armazenamento chave-valor usando Keyv
- [x] **Normalizer:** Módulo de transformação de dados para parsing (JSON, XML, YAML, CSV)
- [x] **Queue:** Gestão de filas de trabalho (Kafka, RabbitMQ, Redis)
- [x] **UI:** Componentes UI para construção de aplicações dinâmicas
- [x] **Vue:** Permite a integração com Vue.js