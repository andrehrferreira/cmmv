> このファイルは **ChatGPT** によって自動翻訳されました。  
> 元のドキュメントは **英語とポルトガル語** で作成されました。  
> 翻訳に誤りがある場合、日本語に精通している方は、  
> 修正を行い **Pull Request (PR)** を送信してください。  
> コミュニティ全体があなたの貢献に感謝します！ 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> 契約を使用してスケーラブルでモジュール化されたアプリケーションを構築する。</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPMバージョン" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="パッケージライセンス" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">ドキュメント</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">問題を報告する</a>
</p>

## 説明 (Description)

CMMV（Contract Model View）は、Webアプリケーション開発に革命をもたらし、従来のパラダイムを打ち破り、デジタルプロジェクトの作成、管理、拡張の方法を再定義します。ベストプラクティスと革新的なコンセプトにインスパイアされ、CMMVは契約の力を統合し、強力で安全な構造を自動的に生成します。これにより、手作業のコーディングの複雑さを排除し、これまでにない開発体験を提供します。

TypeScriptの契約定義がアプリケーションの中心となり、API、コントローラー（controller）、ORMエンティティ、さらにはバイナリRPC通信を自動生成するプラットフォームを想像してください。これらはすべて最適化されたパフォーマンスと最新技術とのシームレスな統合を備えています。CMMVを使用すれば、開発を加速させるだけでなく、コードの品質と一貫性を保証し、エラーや手戻りを大幅に削減できます。

さらに、CMMVは、Vue 3をベースとした軽量でリアクティブなインターフェースを提供し、ReactやAngularなどの他のフレームワークもサポート可能です。パフォーマンスとSEOの最適化に重点を置いています。CMMVでは、フロントエンドは単なるプレゼンテーションレイヤーではなく、リアルタイムでバックエンドと同期するアプリケーションの重要な一部となります。

経験豊富な開発者でも、初心者のプログラマーでも、CMMVを活用すれば、技術的な障壁を取り除き、強力でモダンかつスケーラブルなシステムを構築できます。創造性と革新を中心に据えた開発を実現する新しい方法、それがCMMVです。

## 哲学 (Philosophy)

CMMVは、TypeScriptの強力な型システムとデコレーターを活用することで、開発プロセスを簡素化することを目的としています。重いフロントエンドフレームワークの必要性を排除し、データバインディングとインタラクションの直接制御を可能にしながら、モジュール設計による柔軟性を維持します。

## 特徴 (Features)

- **契約ベースの開発:** TypeScriptの契約を使用して、モデル、コントローラーなどを定義
- **モジュラーアーキテクチャ:** モジュールを使用してアプリケーションを構成し、管理とスケーリングを容易に
- **RPC & REST サポート:** WebSocketを介したバイナリRPCと従来のREST APIの統合サポート
- **Express統合:** Expressとのシームレスな統合により、堅牢で使い慣れたHTTPサーバー環境を提供
- **拡張性:** カスタムモジュールやコンポーネントで容易にカスタマイズ・拡張可能

## CLIでのセットアップ (Setup with CLI)

CMMVは、インストールプロセスを簡素化し、希望の設定でプロジェクトをすばやくセットアップできるCLI（コマンドラインインターフェース）を提供します。

新しいプロジェクトを初期化するには、以下のコマンドを使用してください：

```bash
$ pnpm dlx @cmmv/cli@latest create <プロジェクト名>
```

このコマンドは、Vite、RPC、キャッシング、リポジトリの種類、ビュー設定（Vue 3またはReactivity）などの設定を選択できるガイド付きセットアップを開始します。必要なファイルやフォルダを自動生成し、依存関係を設定し、プロジェクトを構成します。

## 手動セットアップ (Legacy Setup)

プロジェクトを手動でセットアップしたい場合、必要なモジュールを個別にインストールすることもできます：

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## クイックスタート (Quick Start)

以下は、新しいCMMVアプリケーションを作成する簡単な例です：

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

# 特徴 (Features)

## 🟢 コア (Core)
- [x] アプリケーション制御、契約のロード、モデル、およびモデル生成
- [x] トランスパイラを作成するための基盤
- [x] HTTP、WS、契約、およびサービスのためのコア抽象化
- [x] シングルトンクラスの基本実装
- [x] 契約、フック、メタデータ、およびサービスのデコレーター
- [x] すべてのモジュールにわたる設定検証とアクセス制御
- [x] フックシステム
- [x] テレメトリとロギング
- [x] レジストリ作成の基盤

## 🔐 認証 (Auth)
- [x] 一般的なアプリケーションアクセス制御
- [x] ローカルユーザーの登録とログイン
- [ ] プロバイダー（Google、Facebookなど）経由のログイン
- [x] reCAPTCHA
- [x] セッション更新用のリフレッシュトークン
- [x] QRコード生成と検証による完全な2FAサポート
- [x] 指紋、IP、およびユーザーエージェントに基づいたセッション制御

## 🚀 キャッシュ (Cache)
- [x] Redis、Memcached、MongoDB、またはバイナリファイルと互換性のあるインメモリキャッシュを使用した最適化システム応答
- [x] コントローラーとゲートウェイのための簡単な統合デコレーター
- [x] 契約との自動統合
- [x] キャッシュデータの取得、更新、または削除のためのAPI

## 🌐 HTTP
- [x] `@cmmv/server` または Express などの他のアダプターによる API 提供
- [x] 自動コントローラーとサービス生成
- [x] `@cmmv/cache` および `@cmmv/auth` との統合
- [x] Express アダプター
- [ ] Fastify アダプター

## 📡 Protobuf
- [x] 契約に基づいた RPC 通信のための `.proto` ファイル生成
- [x] TypeScript のためのインターフェースと型定義の生成
- [x] フロントエンド用の JSON 契約生成
- [x] 契約間のリンク機能

## 🗄 リポジトリ (Repository)
- [x] SQL、MySQL、PostgreSQL、SQL Server、Oracle、MongoDB との統合
- [x] TypeORM のための自動エンティティ生成
- [x] インデックスの自動生成
- [x] 関係の自動生成
- [x] データ検証
- [x] RPC と REST のための CRUD 操作
- [x] 検索フィルター（ソート、ID フィルタリング、ページネーション）
- [x] 直接リポジトリ統合のためのサービスオーバーライド
- [x] `@cmmv/cache`、`@cmmv/auth` との統合

## ⏳ スケジューリング (Scheduling)
- [x] スケジュールタスク作成のためのデコレーター（cron）
- [x] スケジュールタスクの管理

## 🎨 ビュー (View)
- [x] SEO 最適化のための SSR（サーバーサイドレンダリング）
- [x] EJS に類似した動的テンプレート
- [x] Express 互換のビューエンジン
- [x] 国際化 (i18n) サポート
- [x] HTML へのサブビューの直接挿入
- [x] 動的メタデータ管理（スクリプト、リンク、メタ、ヘッダー、タイトル）
- [x] CSS および JavaScript のバンドルコンパイル
- [x] 透過的な RPC 統合

## 🔄 WebSocket (WS)
- [x] RPC 通信ゲートウェイの自動生成
- [x] データパッケージングの抽象化
- [x] クライアントおよびサーバーの WebSocket 通信の実装

## 🧩 モジュール (Modules)
- [x] **Swagger:** Swagger を使用した API ドキュメント提供
- [x] **Testing:** ユニットテスト、S2S テスト、モックが追加
- [x] **Elastic:** インデックスおよびドキュメント管理のための Elasticsearch 統合
- [x] **Email:** SMTP または AWS SES を使用したメール管理モジュール
- [x] **Encryptor:** ECC ベースの暗号化、AES-256-GCM
- [x] **Events:** シームレスな通信のためのイベント駆動型アーキテクチャ
- [x] **Inspector:** デバッグと監視ツール
- [x] **Keyv:** Keyv を使用したキー・バリュー・ストア統合
- [x] **Normalizer:** JSON、XML、YAML、CSV の解析用データ変換モジュール
- [x] **Queue:** ジョブキューの管理（Kafka、RabbitMQ、Redis）
- [x] **UI:** 動的アプリケーション構築のための UI コンポーネント
- [x] **Vue:** Vue.js との統合を可能にする