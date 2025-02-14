> Tệp này đã được dịch tự động bằng **ChatGPT**.  
> Tài liệu gốc được viết bằng **tiếng Anh và tiếng Bồ Đào Nha**.  
> Nếu bạn phát hiện lỗi dịch thuật và có trình độ tiếng Việt tốt,  
> vui lòng xem xét và gửi **Pull Request (PR)** để sửa lỗi.  
> Cộng đồng sẽ rất biết ơn sự đóng góp của bạn! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="Logo CMMV" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Xây dựng các ứng dụng có thể mở rộng và linh hoạt bằng cách sử dụng hợp đồng.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="Phiên bản NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Giấy phép" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Tài liệu</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">Báo cáo lỗi</a>
</p>

## Mô tả (Description)

CMMV (Contract Model View) là một cuộc cách mạng trong phát triển ứng dụng web, thay đổi cách chúng ta tạo, duy trì và mở rộng các dự án kỹ thuật số. Lấy cảm hứng từ những thực tiễn tốt nhất và các khái niệm đổi mới, CMMV tích hợp sức mạnh của hợp đồng để tự động tạo ra các cấu trúc mạnh mẽ và an toàn, loại bỏ sự phức tạp của mã thủ công và mang lại trải nghiệm phát triển chưa từng có.

Hãy tưởng tượng một nền tảng mà việc xác định hợp đồng bằng TypeScript trở thành trung tâm của ứng dụng của bạn, tự động tạo API, bộ điều khiển (controllers), thực thể ORM và thậm chí cả giao tiếp RPC nhị phân – tất cả đều có hiệu suất được tối ưu hóa và tích hợp liền mạch với các công nghệ hiện đại nhất. Với CMMV, bạn không chỉ đẩy nhanh quá trình phát triển mà còn đảm bảo chất lượng và tính nhất quán của mã, giảm đáng kể lỗi và công việc làm lại.

Ngoài ra, CMMV cung cấp giao diện phản ứng nhanh và nhẹ, dựa trên Vue 3 nhưng cũng hỗ trợ các framework khác như React và Angular, luôn tập trung vào hiệu suất và SEO. Với CMMV, frontend không chỉ là một lớp trình bày mà còn là một phần tích hợp và động của ứng dụng của bạn, được đồng bộ hóa theo thời gian thực với backend.

Dù bạn là nhà phát triển giàu kinh nghiệm hay người mới lập trình, CMMV giúp mọi người xây dựng các hệ thống mạnh mẽ, có thể mở rộng và hiện đại bằng cách loại bỏ các rào cản kỹ thuật và đặt sự sáng tạo cũng như đổi mới vào trung tâm của quá trình phát triển. Đây không chỉ là một framework mà còn là một cách mới để suy nghĩ và xây dựng ứng dụng web.

## Triết lý (Philosophy)

CMMV hướng đến đơn giản hóa quá trình phát triển bằng cách tận dụng hệ thống kiểu mạnh mẽ của TypeScript và decorators. Nó loại bỏ nhu cầu về các framework frontend nặng nề bằng cách tập trung vào quyền kiểm soát trực tiếp dữ liệu và tương tác, đồng thời vẫn duy trì tính linh hoạt thông qua thiết kế mô-đun.

## Tính năng (Features)

- **Phát triển dựa trên hợp đồng:** Sử dụng hợp đồng TypeScript để xác định mô hình, bộ điều khiển và nhiều hơn nữa.
- **Kiến trúc mô-đun:** Tổ chức ứng dụng của bạn bằng các mô-đun, giúp dễ dàng quản lý và mở rộng.
- **Hỗ trợ RPC & REST:** Tích hợp cả RPC nhị phân qua WebSocket và API REST truyền thống.
- **Tích hợp với Express:** Kết nối liền mạch với Express để tạo môi trường máy chủ HTTP mạnh mẽ.
- **Mở rộng linh hoạt:** Dễ dàng tùy chỉnh và mở rộng với các mô-đun và thành phần của riêng bạn.

## Cài đặt bằng CLI (Setup with CLI)

CMMV hiện cung cấp CLI (Giao diện Dòng lệnh) giúp đơn giản hóa quy trình cài đặt và thiết lập dự án nhanh chóng với các cấu hình mong muốn.

Để khởi tạo một dự án mới, bạn có thể sử dụng lệnh sau:

```bash
$ pnpm dlx @cmmv/cli@latest create <tên-dự-án>
```

Lệnh này sẽ hướng dẫn bạn qua quá trình thiết lập, cho phép bạn chọn các tùy chọn như bật Vite, RPC, bộ nhớ đệm, loại cơ sở dữ liệu và thiết lập giao diện (ví dụ: Vue 3 hoặc Reactivity). Nó sẽ tự động tạo các tệp và thư mục cần thiết, cài đặt các thư viện phụ thuộc và cấu hình dự án.

## Cài đặt thủ công (Legacy Setup)

Nếu bạn muốn thiết lập dự án theo cách thủ công, bạn vẫn có thể cài đặt từng mô-đun cần thiết riêng lẻ:

```bash
$ pnpm add @cmmv/core @cmmv/http @cmmv/view reflect-metadata class-validator class-transformer fast-json-stringify
```

## Bắt đầu nhanh (Quick Start)

Dưới đây là một ví dụ đơn giản về cách tạo ứng dụng CMMV mới:

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

# Tính năng (Features)

## 🟢 Lõi (Core)
- [x] Kiểm soát ứng dụng, tải hợp đồng, mô hình và tạo mô hình
- [x] Cơ sở cho việc tạo trình biên dịch (Transpilers)
- [x] Trừu tượng hóa lõi cho HTTP, WS, hợp đồng và dịch vụ
- [x] Triển khai cơ bản cho lớp Singleton
- [x] Decorators cho hợp đồng, hooks, metadata và dịch vụ
- [x] Xác thực cấu hình và kiểm soát truy cập trên tất cả các mô-đun
- [x] Hệ thống hooks (Hooks System)
- [x] Ghi nhật ký và theo dõi (Logging & Telemetry)
- [x] Cơ sở để tạo sổ đăng ký (Registry)

## 🔐 Xác thực (Auth)
- [x] Kiểm soát truy cập tổng quát cho ứng dụng
- [x] Đăng ký và đăng nhập người dùng nội bộ
- [ ] Đăng nhập qua nhà cung cấp (Google, Facebook, v.v.)
- [x] Hỗ trợ reCAPTCHA
- [x] Token làm mới (refresh token) để gia hạn phiên
- [x] Hỗ trợ 2FA đầy đủ với mã QR để xác minh
- [x] Kiểm soát phiên dựa trên dấu vân tay, địa chỉ IP và user agent

## 🚀 Bộ nhớ đệm (Cache)
- [x] Phản hồi hệ thống tối ưu bằng cách sử dụng bộ nhớ đệm trong bộ nhớ tương thích với Redis, Memcached, MongoDB hoặc tệp nhị phân
- [x] Decorators tích hợp đơn giản cho bộ điều khiển và gateway
- [x] Tích hợp tự động với hợp đồng
- [x] API để truy xuất, cập nhật hoặc xóa dữ liệu được lưu trong bộ nhớ đệm

## 🌐 HTTP
- [x] API có sẵn thông qua `@cmmv/server` hoặc các adapter khác như Express
- [x] Tạo bộ điều khiển và dịch vụ tự động
- [x] Tích hợp với `@cmmv/cache` và `@cmmv/auth`
- [x] Adapter Express
- [ ] Adapter Fastify

## 📡 Protobuf
- [x] Tạo tệp `.proto` để giao tiếp RPC dựa trên hợp đồng
- [x] Tạo giao diện và định nghĩa kiểu cho TypeScript
- [x] Tạo hợp đồng JSON để sử dụng trên frontend
- [x] Liên kết hợp đồng với nhau

## 🗄 Kho dữ liệu (Repository)
- [x] Hỗ trợ SQL, MySQL, PostgreSQL, SQL Server, Oracle và MongoDB
- [x] Tạo thực thể tự động cho TypeORM
- [x] Tự động tạo chỉ mục
- [x] Tự động tạo mối quan hệ
- [x] Xác thực dữ liệu
- [x] Các thao tác CRUD cho RPC và REST
- [x] Bộ lọc tìm kiếm (sắp xếp, lọc theo ID, phân trang)
- [x] Ghi đè dịch vụ để tích hợp kho dữ liệu trực tiếp
- [x] Tích hợp với `@cmmv/cache`, `@cmmv/auth`

## ⏳ Lập lịch (Scheduling)
- [x] Decorators để tạo công việc theo lịch trình (cron jobs)
- [x] Quản lý công việc theo lịch trình

## 🎨 Giao diện hiển thị (View)
- [x] Hỗ trợ SSR để tối ưu hóa SEO
- [x] Mẫu động tương tự như EJS
- [x] Công cụ hiển thị tương thích với Express
- [x] Hỗ trợ quốc tế hóa (i18n)
- [x] Bao gồm các chế độ xem con trực tiếp trong HTML
- [x] Quản lý metadata động (script, liên kết, meta, tiêu đề)
- [x] Gộp và biên dịch CSS và JavaScript
- [x] Tích hợp RPC một cách minh bạch

## 🔄 WebSocket (WS)
- [x] Tạo cổng giao tiếp RPC tự động
- [x] Trừu tượng hóa việc đóng gói dữ liệu
- [x] Triển khai giao tiếp WebSocket cho cả máy khách và máy chủ

## 🧩 Mô-đun (Modules)
- [x] **Swagger:** Cung cấp tài liệu API với tích hợp Swagger
- [x] **Testing:** Hỗ trợ kiểm thử đơn vị, kiểm thử S2S và mock testing
- [x] **Elastic:** Tích hợp Elasticsearch để quản lý chỉ mục và tài liệu
- [x] **Email:** Mô-đun xử lý email qua SMTP hoặc AWS SES
- [x] **Encryptor:** Mã hóa dựa trên ECC, AES-256-GCM
- [x] **Events:** Kiến trúc hướng sự kiện (event-driven)
- [x] **Inspector:** Công cụ gỡ lỗi và giám sát hệ thống
- [x] **Keyv:** Tích hợp kho dữ liệu key-value bằng Keyv
- [x] **Normalizer:** Mô-đun chuyển đổi dữ liệu cho JSON, XML, YAML, CSV
- [x] **Queue:** Quản lý hàng đợi công việc (Kafka, RabbitMQ, Redis)
- [x] **UI:** Thành phần UI để xây dựng ứng dụng động
- [x] **Vue:** Hỗ trợ tích hợp Vue.js