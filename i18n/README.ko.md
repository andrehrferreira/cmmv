> 이 파일은 **ChatGPT**에 의해 자동 번역되었습니다.  
> 원본 문서는 **영어 및 포르투갈어**로 작성되었습니다.  
> 번역에서 오류를 발견하고 한국어를 잘 아신다면,  
> 검토 후 **Pull Request (PR)**를 보내주세요.  
> 여러분의 기여에 커뮤니티가 감사할 것입니다! 🙌 

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> 계약을 활용한 확장 가능하고 모듈화된 애플리케이션 구축.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM 버전" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="패키지 라이선스" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">문서</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">문제 보고</a>
</p>

## 설명 (Description)

CMMV (Contract Model View)는 웹 애플리케이션 개발의 패러다임을 바꾸며, 디지털 프로젝트를 생성, 유지 및 확장하는 방식을 새롭게 정의합니다. 최고의 개발 사례와 혁신적인 개념에서 영감을 받아 CMMV는 계약(Contract) 기능을 활용하여 강력하고 안전한 구조를 자동으로 생성합니다. 이를 통해 수동 코드 작성의 복잡성을 제거하고 새로운 수준의 개발 경험을 제공합니다.

TypeScript 계약 정의가 애플리케이션의 중심이 되어 API, 컨트롤러(controller), ORM 엔티티 및 바이너리 RPC 통신을 자동 생성하는 플랫폼을 상상해보세요. 이 모든 것은 최적화된 성능과 최신 기술과의 원활한 통합을 기반으로 합니다. CMMV를 사용하면 개발 속도를 높이는 동시에 코드의 품질과 일관성을 보장하며, 오류와 재작업을 대폭 줄일 수 있습니다.

또한 CMMV는 Vue 3을 기반으로 한 가볍고 반응형 인터페이스를 제공하며, React 및 Angular와 같은 프레임워크도 지원할 수 있습니다. 이는 성능과 SEO 최적화에 중점을 두고 설계되었습니다. CMMV에서는 프론트엔드가 단순한 프레젠테이션 레이어가 아니라, 백엔드와 실시간으로 동기화되는 애플리케이션의 필수적인 요소가 됩니다.

숙련된 개발자든 초보 프로그래머든 CMMV는 누구나 강력하고 현대적이며 확장 가능한 시스템을 구축할 수 있도록 지원합니다. 기술적 장벽을 제거하고 창의성과 혁신을 중심으로 개발을 진행할 수 있는 새로운 방식, 그것이 CMMV입니다.

## 철학 (Philosophy)

CMMV는 TypeScript의 강력한 타입 시스템과 데코레이터 기능을 활용하여 개발 프로세스를 단순화하는 것을 목표로 합니다. 무거운 프론트엔드 프레임워크의 필요성을 제거하고, 데이터 바인딩 및 인터랙션을 직접 제어할 수 있도록 하면서도 모듈화된 설계를 통해 유연성을 유지합니다.

## 기능 (Features)

- **계약 기반 개발:** TypeScript 계약을 사용하여 모델, 컨트롤러 및 기타 요소를 정의합니다.
- **모듈형 아키텍처:** 모듈을 사용하여 애플리케이션을 구성하여 관리 및 확장이 용이합니다.
- **RPC 및 REST 지원:** WebSocket을 통한 바이너리 RPC 및 전통적인 REST API 지원.
- **Express 통합:** Express와의 원활한 통합으로 친숙하고 강력한 HTTP 서버 환경을 제공합니다.
- **확장 가능:** 맞춤형 모듈 및 컴포넌트로 쉽게 확장 및 커스터마이징 가능.

## CLI를 통한 설정 (Setup with CLI)

CMMV는 CLI(명령줄 인터페이스)를 제공하여 설치 프로세스를 간소화하고 원하는 설정으로 프로젝트를 빠르게 구성할 수 있도록 합니다.

새 프로젝트를 초기화하려면 다음 명령을 사용하세요:

```bash
$ pnpm dlx @cmmv/cli@latest create <프로젝트명>
```

이 명령은 Vite, RPC, 캐싱, 저장소 유형 및 뷰 설정(Vue 3 또는 Reactivity) 등의 설정을 선택할 수 있는 가이드 설정 프로세스를 시작합니다. 필요한 파일 및 폴더를 자동으로 생성하고 종속성을 설정하며 프로젝트를 구성합니다.

## 수동 설정 (Legacy Setup)

프로젝트를 수동으로 설정하려면 필요한 모듈을 개별적으로 설치할 수도 있습니다:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## 빠른 시작 (Quick Start)

다음은 새 CMMV 애플리케이션을 생성하는 간단한 예제입니다:

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

# 기능 (Features)

## 🟢 코어 (Core)
- [x] 애플리케이션 제어, 계약 로드, 모델 및 모델 생성
- [x] 트랜스파일러 생성의 기초
- [x] HTTP, WS, 계약 및 서비스의 핵심 추상화
- [x] 싱글톤 클래스의 기본 구현
- [x] 계약, 훅, 메타데이터 및 서비스 데코레이터
- [x] 모든 모듈에서 설정 검증 및 액세스 제어
- [x] 훅 시스템
- [x] 원격 측정 및 로깅
- [x] 레지스트리 생성의 기초

## 🔐 인증 (Auth)
- [x] 일반적인 애플리케이션 액세스 제어
- [x] 로컬 사용자 등록 및 로그인
- [ ] 제공자(Google, Facebook 등)를 통한 로그인
- [x] reCAPTCHA
- [x] 세션 갱신을 위한 리프레시 토큰
- [x] QR 코드 생성 및 검증을 통한 2단계 인증(2FA) 지원
- [x] 지문, IP 및 사용자 에이전트 기반 세션 제어

## 🚀 캐시 (Cache)
- [x] Redis, Memcached, MongoDB 또는 바이너리 파일과 호환되는 인메모리 캐시를 활용한 시스템 최적화
- [x] 컨트롤러 및 게이트웨이를 위한 간단한 통합 데코레이터
- [x] 계약과의 자동 통합
- [x] 캐시된 데이터 검색, 업데이트 또는 제거를 위한 API 제공

## 🌐 HTTP
- [x] `@cmmv/server` 또는 Express와 같은 다른 어댑터를 통한 API 제공
- [x] 컨트롤러 및 서비스 자동 생성
- [x] `@cmmv/cache` 및 `@cmmv/auth` 통합
- [x] Express 어댑터 지원
- [ ] Fastify 어댑터 지원 예정

## 📡 Protobuf
- [x] 계약 기반 RPC 통신을 위한 `.proto` 파일 생성
- [x] TypeScript 인터페이스 및 타입 정의 생성
- [x] 프론트엔드 사용을 위한 JSON 계약 생성
- [x] 계약 간의 상호 연결 지원

## 🗄 리포지토리 (Repository)
- [x] SQL, MySQL, PostgreSQL, SQL Server, Oracle, MongoDB 통합
- [x] TypeORM을 위한 자동 엔티티 생성
- [x] 자동 인덱스 생성
- [x] 자동 관계 설정
- [x] 데이터 검증
- [x] RPC 및 REST용 CRUD 기능
- [x] 검색 필터(정렬, ID 필터링, 페이지네이션)
- [x] 직접적인 리포지토리 통합을 위한 서비스 오버라이드
- [x] `@cmmv/cache`, `@cmmv/auth` 통합

## ⏳ 스케줄링 (Scheduling)
- [x] 크론(cron) 기반 예약 작업을 위한 데코레이터 지원
- [x] 예약된 작업 관리 기능

## 🎨 뷰 (View)
- [x] SEO 최적화를 위한 서버 사이드 렌더링(SSR)
- [x] EJS와 유사한 동적 템플릿 지원
- [x] Express와 호환되는 뷰 엔진
- [x] 다국어(i18n) 지원
- [x] HTML 내 직접적인 서브 뷰 포함 기능
- [x] 동적 메타데이터 관리(스크립트, 링크, 메타, 헤더, 타이틀)
- [x] 번들된 CSS 및 JavaScript 컴파일 지원
- [x] 투명한 RPC 통합

## 🔄 웹소켓 (WebSocket, WS)
- [x] RPC 통신 게이트웨이 자동 생성
- [x] 데이터 패키징 추상화
- [x] 클라이언트 및 서버 간 WebSocket 통신 구현

## 🧩 모듈 (Modules)
- [x] **Swagger:** Swagger를 활용한 API 문서화 제공
- [x] **Testing:** 단위 테스트(Unit test), S2S 테스트 및 모의(Mock) 테스트 포함
- [x] **Elastic:** Elasticsearch를 활용한 인덱스 및 문서 관리
- [x] **Email:** SMTP 또는 AWS SES를 활용한 이메일 관리 모듈
- [x] **Encryptor:** ECC 기반 암호화, AES-256-GCM 지원
- [x] **Events:** 원활한 통신을 위한 이벤트 기반 아키텍처
- [x] **Inspector:** 디버깅 및 모니터링 도구 제공
- [x] **Keyv:** Keyv를 활용한 키-값 저장소 지원
- [x] **Normalizer:** JSON, XML, YAML, CSV 파싱을 위한 데이터 변환 모듈
- [x] **Queue:** 작업 큐(Kafka, RabbitMQ, Redis) 관리 기능
- [x] **UI:** 동적 애플리케이션 구축을 위한 UI 컴포넌트
- [x] **Vue:** Vue.js와의 통합 지원