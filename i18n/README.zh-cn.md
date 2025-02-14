> 本文件通过 **ChatGPT** 自动翻译。  
> 原始文档是用 **英文和葡萄牙文** 编写的。  
> 如果您在翻译中发现任何错误，并且精通中文（简体），  
> 请进行审查并提交 **Pull Request (PR)**。  
> 整个社区将非常感谢您的贡献！ 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> 使用契约创建可扩展和模块化的应用程序。</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM 版本" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="软件包许可证" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">文档</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">报告问题</a>
</p>

## 描述 (Description)

CMMV (Contract Model View) 是在 Web 应用程序开发中的一场革命，突破了传统的开发模式，重新定义了我们如何创建、维护和扩展数字项目。CMMV 从最佳实践和创新概念中汲取灵感，利用契约的力量，自动生成强大且安全的结构，消除了手动编码的复杂性，并提供了前所未有的开发体验。

想象一下，您的应用程序以 TypeScript 契约为核心，自动生成 API、控制器、ORM 实体，甚至是通过二进制 RPC 进行通信，所有这些都具有优化的性能和与现代技术的无缝集成。通过 CMMV，您不仅加快了开发速度，还确保了代码的质量和一致性，大大减少了错误和返工。

此外，CMMV 提供了一个基于 Vue 3 的轻量级和反应式界面，但它也支持其他框架，如 React 和 Angular，始终专注于性能和 SEO。借助 CMMV，前端不仅仅是展示层，而是应用程序的一个集成且动态的部分，实时与后端同步。

无论您是经验丰富的开发人员还是刚刚开始编程，CMMV 都能帮助每个人消除技术障碍，构建强大、现代且可扩展的系统，使创造力和创新成为开发过程的核心。它不仅仅是一个框架；它是构建未来 Web 应用程序的新方式。

## 哲学 (Philosophy)

CMMV 旨在通过利用 TypeScript 强大的类型系统和装饰器来简化开发过程。它消除了对重型前端框架的需求，专注于直接控制数据绑定和交互，同时通过模块化设计保持灵活性。

## 特性 (Features)

- **契约驱动开发:** 使用 TypeScript 契约定义模型、控制器等。
- **模块化架构:** 使用模块组织应用程序，便于管理和扩展。
- **支持 RPC 和 REST:** 支持通过 WebSocket 进行二进制 RPC 和传统 REST API。
- **Express 集成:** 与 Express 无缝集成，提供熟悉且强大的 HTTP 服务器环境。
- **可扩展性:** 高度可定制，容易扩展自己的模块和组件。

## 使用 CLI 配置 (Setup with CLI)

CMMV 现在提供 CLI（命令行界面），简化了安装过程，并允许您快速使用所需配置设置项目。

要初始化一个新项目，您可以使用以下命令：

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

此命令将引导您完成配置过程，询问您偏好的配置选项，例如启用 Vite、RPC、缓存、存储库类型和视图设置（例如，Vue 3 或 Reactivity）。它将自动创建所需的文件和文件夹，设置依赖关系并配置项目。

## 手动配置 (Legacy Setup)

如果您更喜欢手动设置项目，您仍然可以分别安装所需的模块：

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## 快速入门 (Quick Start)

以下是如何创建一个新 CMMV 应用程序的简单示例：

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

# 特性 (Features)

## 🟢 核心 (Core)
- [x] 应用程序控制、契约加载、模型和模型生成
- [x] 创建转译器的基础
- [x] 用于 HTTP、WS、契约和服务的核心抽象
- [x] Singleton 类的基础实现
- [x] 契约、钩子、元数据和服务的装饰器
- [x] 所有模块的配置验证和访问控制
- [x] 钩子系统
- [x] 遥测和日志记录
- [x] 创建注册表的基础

## 🔐 身份验证 (Auth)
- [x] 一般应用程序访问控制
- [x] 本地用户注册和登录
- [ ] 通过提供商（Google、Facebook 等）登录
- [x] reCAPTCHA
- [x] 用于会话续期的刷新令牌
- [x] 完整的双重身份验证支持，带有 QR 代码生成和验证
- [x] 基于指纹、IP 和用户代理的会话控制

## 🚀 缓存 (Cache)
- [x] 使用与 Redis、Memcached、MongoDB 或二进制文件兼容的内存缓存来优化系统响应
- [x] 控制器和网关的简单集成装饰器
- [x] 与契约的自动集成
- [x] 用于检索、更新或删除缓存数据的 API

## 🌐 HTTP
- [x] 通过 `@cmmv/server` 或其他适配器（如 Express）提供 API 可用性
- [x] 自动生成控制器和服务
- [x] 与 `@cmmv/cache` 和 `@cmmv/auth` 的集成
- [x] Express 适配器
- [ ] Fastify 适配器

## 📡 Protobuf
- [x] 基于契约生成 `.proto` 文件以支持 RPC 通信
- [x] 为 TypeScript 生成接口和类型定义
- [x] 生成前端使用的 JSON 契约
- [x] 契约交叉链接

## 🗄 仓库 (Repository)
- [x] 与 SQLite、MySQL、PostgreSQL、SQL Server、Oracle 和 MongoDB 的集成
- [x] 为 TypeORM 自动生成实体
- [x] 自动生成索引
- [x] 自动生成关系
- [x] 数据验证
- [x] RPC 和 REST 的 CRUD 操作
- [x] 搜索过滤器（排序、ID 过滤、分页）
- [x] 服务重写以便与仓库直接集成
- [x] 与 `@cmmv/cache`、`@cmmv/auth` 的集成

## ⏳ 任务调度 (Scheduling)
- [x] 用于创建计划任务（cron）的装饰器
- [x] 计划任务管理

## 🎨 视图 (View)
- [x] SSR 用于 SEO 优化
- [x] 类似 EJS 的动态模板
- [x] 与 Express 兼容的视图引擎
- [x] 国际化支持 (i18n)
- [x] 在 HTML 中直接嵌入子视图
- [x] 动态元数据处理（脚本、链接、meta、标题、header）
- [x] 打包的 CSS 和 JavaScript 编译
- [x] 透明的 RPC 集成

## 🔄 WebSocket (WS)
- [x] 自动生成 RPC 通信网关
- [x] 数据打包抽象
- [x] 客户端和服务器的 WebSocket 通信实现

## 🧩 模块 (Modules)
- [x] **Swagger:** 提供与 Swagger 集成的 API 文档
- [x] **Testing:** 现在包括单元测试、S2S 测试和 mocks
- [x] **Elastic:** Elasticsearch 集成，用于管理索引和文档
- [x] **Email:** 使用 SMTP 或 AWS SES 的电子邮件处理模块
- [x] **Encryptor:** 基于 ECC 的加密，AES-256-GCM
- [x] **Events:** 事件驱动架构，实现无缝通信
- [x] **Inspector:** 调试和监控工具
- [x] **Keyv:** 使用 Keyv 进行键值存储集成
- [x] **Normalizer:** 数据转换模块，用于解析（JSON、XML、YAML、CSV）
- [x] **Queue:** 管理工作队列（Kafka、RabbitMQ、Redis）
- [x] **UI:** 用于构建动态应用程序的 UI 组件
- [x] **Vue:** 启用与 Vue.js 的集成