> 此文件是透過 **ChatGPT** 自動翻譯的。  
> 原始文檔是用 **英文和葡萄牙文** 撰寫的。  
> 如果您發現翻譯中的錯誤並且擅長中文（繁體），  
> 請進行審查並提交 **Pull Request (PR)**。  
> 整個社區將對您的貢獻表示感謝！ 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> 使用契約創建可擴展和模塊化的應用程式。</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM 版本" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="套件授權" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">文件</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">報告問題</a>
</p>

## 說明 (Description)

CMMV (Contract Model View) 是一場在 Web 應用程式開發中的革命，它打破了舊有的模式，重新定義了我們如何創建、維護和擴展數字專案。CMMV 受到最佳實踐和創新概念的啟發，將契約的力量融入其中，讓強大且安全的結構自動生成。它消除了手動編碼的複雜性，並提供了前所未有的開發體驗。

想像一個平台，您在其中定義 TypeScript 契約，這成為您應用程式的核心，並自動生成 API、控制器、ORM 實體，甚至是通過二進制 RPC 進行通訊，所有這些都能實現最佳性能，並與現代技術無縫整合。使用 CMMV，您不僅加速開發，還能確保代碼的質量和一致性，顯著減少錯誤和返工。

此外，CMMV 提供了基於 Vue 3 的輕量級和反應式介面，但也能支持 React 和 Angular 等其他框架，始終關注性能和 SEO。使用 CMMV，前端不僅僅是呈現層，它是您應用程式的核心且動態的部分，與後端實時同步。

無論您是經驗豐富的開發人員還是程式設計新手，CMMV 都能幫助每個人創建強大、現代且可擴展的系統，消除技術障礙，並讓創造力和創新成為開發過程的核心。它不僅僅是一個框架；它是思考和構建未來 Web 應用程式的新方式。

## 哲學 (Philosophy)

CMMV 的目標是通過利用 TypeScript 強大的類型系統和裝飾器，簡化開發過程。它消除了對繁重前端框架的需求，專注於對數據綁定和交互的直接控制，同時通過模塊化設計保持靈活性。

## 特性 (Features)

- **契約驅動開發:** 使用 TypeScript 契約來定義模型、控制器和更多。
- **模塊化架構:** 使用模塊組織應用程式，便於管理和擴展。
- **RPC 和 REST 支持:** 同時支持 WebSocket 進行二進制 RPC 和傳統 REST API。
- **Express 整合:** 與 Express 無縫整合，提供熟悉且穩定的 HTTP 伺服器環境。
- **可擴展:** 高度可自定義，並能輕鬆擴展您的模塊和組件。

## 使用 CLI 設定 (Setup with CLI)

CMMV 現在提供 CLI (命令行介面) 來簡化安裝過程，並迅速按照您選擇的配置設置項目。

要啟動新項目，請使用以下命令：

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

此命令將引導您完成設定過程，詢問您關於 Vite、RPC、快取、存儲庫類型和視圖設置（例如 Vue 3 或 Reactivity）等偏好的配置。它會自動創建必要的檔案和資料夾，設置依賴關係並配置您的項目。

## 手動設置 (Legacy Setup)

如果您更喜歡手動設置項目，您仍然可以單獨安裝所需的模塊：

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## 快速啟動 (Quick Start)

以下是創建新 CMMV 應用程式的簡單範例：

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
- [x] 應用程式控制、契約加載、模型和模型生成
- [x] 創建轉譯器的基礎
- [x] 用於 HTTP、WS、契約和服務的核心抽象
- [x] Singleton 類的基礎實現
- [x] 契約、鉤子、元數據和服務的裝飾器
- [x] 所有模組的配置驗證和訪問控制
- [x] 鉤子系統
- [x] 遙測和日誌記錄
- [x] 創建註冊表的基礎

## 🔐 驗證 (Auth)
- [x] 一般應用程式訪問控制
- [x] 本地用戶註冊和登錄
- [ ] 通過提供商（Google、Facebook 等）登錄
- [x] reCAPTCHA
- [x] 用於會話續期的刷新令牌
- [x] 完整的雙重身份驗證支持，帶有 QR 代碼生成和驗證
- [x] 基於指紋、IP 和用戶代理的會話控制

## 🚀 快取 (Cache)
- [x] 使用與 Redis、Memcached、MongoDB 或二進位文件兼容的內存快取來優化系統響應
- [x] 用於控制器和網關的簡單集成裝飾器
- [x] 與契約的自動集成
- [x] 用於檢索、更新或刪除緩存數據的 API

## 🌐 HTTP
- [x] 通過 `@cmmv/server` 或其他適配器（如 Express）提供 API 可用性
- [x] 自動生成控制器和服務
- [x] 與 `@cmmv/cache` 和 `@cmmv/auth` 的集成
- [x] Express 適配器
- [ ] Fastify 適配器

## 📡 Protobuf
- [x] 基於契約生成 `.proto` 文件以支持 RPC 通信
- [x] 為 TypeScript 生成接口和類型定義
- [x] 生成前端使用的 JSON 契約
- [x] 契約交叉鏈接

## 🗄 資料庫 (Repository)
- [x] 與 SQL、MySQL、PostgreSQL、SQL Server、Oracle 和 MongoDB 的集成
- [x] 為 TypeORM 自動生成實體
- [x] 自動生成索引
- [x] 自動生成關係
- [x] 數據驗證
- [x] 用於 RPC 和 REST 的 CRUD 操作
- [x] 搜索過濾器（排序、ID 過濾、分頁）
- [x] 直接與資料庫集成的服務重寫
- [x] 與 `@cmmv/cache`、`@cmmv/auth` 的集成

## ⏳ 課程排程 (Scheduling)
- [x] 用於創建計劃任務（cron）的裝飾器
- [x] 計劃任務管理

## 🎨 視圖 (View)
- [x] 用於 SEO 優化的 SSR
- [x] 類似 EJS 的動態模板
- [x] 與 Express 兼容的視圖引擎
- [x] 支持國際化（i18n）
- [x] 在 HTML 中直接嵌入子視圖
- [x] 動態元數據處理（腳本、鏈接、元標籤、標題、標頭）
- [x] 打包 CSS 和 JavaScript 編譯
- [x] 透明 RPC 集成

## 🔄 WebSocket (WS)
- [x] 自動生成 RPC 通信閘道
- [x] 數據包裝抽象
- [x] 用於客戶端和伺服器的 WebSocket 通信實現

## 🧩 模塊 (Modules)
- [x] **Swagger:** 提供與 Swagger 集成的 API 文檔
- [x] **Testing:** 現在包括單元測試、S2S 測試和模擬
- [x] **Elastic:** Elasticsearch 集成，用於管理索引和文檔
- [x] **Email:** 使用 SMTP 或 AWS SES 的電子郵件處理模塊
- [x] **Encryptor:** 基於 ECC 的加密，AES-256-GCM
- [x] **Events:** 事件驅動架構，實現無縫通信
- [x] **Inspector:** 調試和監控工具
- [x] **Keyv:** 使用 Keyv 進行鍵值存儲集成
- [x] **Normalizer:** 用於解析的數據轉換模塊（JSON、XML、YAML、CSV）
- [x] **Queue:** 管理工作隊列（Kafka、RabbitMQ、Redis）
- [x] **UI:** 用於構建動態應用程序的 UI 組件
- [x] **Vue:** 啟用與 Vue.js 的集成