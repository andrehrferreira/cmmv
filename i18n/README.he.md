> קובץ זה תורגם אוטומטית על ידי **ChatGPT**.  
> התיעוד המקורי נכתב ב**אנגלית ופורטוגזית**.  
> אם אתה מוצא שגיאה בתרגום ושולט היטב ב**עברית**,  
> אל תהסס לסקור ולשלוח **Pull Request (PR)**.  
> הקהילה כולה מודה לך על שיתוף הפעולה! 🙌  

<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> בניית יישומים מודולריים וניתנים להרחבה באמצעות חוזים.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="גרסת NPM" /></a>
    <a href="https://github.com/cmmvio/cmmv/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="רישיון חבילה" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/7gdwcdqbMYfbYYX4hhoNhc/tree/main.svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">תיעוד</a> &bull;
  <a href="https://github.com/cmmvio/cmmv/issues">דיווח על בעיה</a>
</p>

## תיאור

CMMV (Contract Model View) הוא מהפכה בפיתוח יישומי אינטרנט, משנה פרדיגמות ומגדיר מחדש את הדרך שבה אנו יוצרים, מתחזקים ומרחיבים פרויקטים דיגיטליים. בהשראת שיטות עבודה מומלצות ורעיונות חדשניים, CMMV משלב את הכוח של חוזים ליצירת מבנים חזקים ומאובטחים באופן אוטומטי, תוך ביטול המורכבות של כתיבת קוד ידנית ומתן חוויית פיתוח ייחודית.

דמיינו פלטפורמה שבה הגדרת חוזים ב-TypeScript הופכת לליבת היישום שלכם, יוצרת באופן אוטומטי API, בקרים, ישויות ORM ואפילו תקשורת בינארית באמצעות RPC, עם ביצועים אופטימליים ואינטגרציה חלקה עם הטכנולוגיות המתקדמות ביותר. עם CMMV, לא רק שתקצרו את זמן הפיתוח, אלא גם תבטיחו איכות ועקביות בקוד, תפחיתו שגיאות ותמנעו עבודה חוזרת.

בנוסף, CMMV מספק ממשק קליל וריאקטיבי, המבוסס על Vue 3, עם תמיכה גם ב-React ו-Angular, תוך התמקדות בביצועים וב-SEO. החזית (Frontend) אינה רק שכבת תצוגה, אלא חלק דינמי ואינטגרלי מהיישום, המסונכרן בזמן אמת עם השרת.

## התקנה באמצעות CLI

להתחלת פרויקט חדש, השתמשו בפקודה הבאה:

```bash
$ pnpm dlx @cmmv/cli@latest create <project-name>
```

## התחלה מהירה

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

# תכונות

## 🟢 ליבה (Core)
- [x] ניהול אפליקציה, טעינת חוזים, מודלים ויצירת מודלים
- [x] בסיס ליצירת מתרגמים (Transpilers)
- [x] הפשטה מרכזית עבור HTTP, WS, חוזים ושירותים
- [x] יישום בסיסי למחלקת Singleton
- [x] דקורטורים לחוזים, Hooks, Metadata ושירותים
- [x] אימות תצורה ובקרת גישה לכל המודולים
- [x] מערכת Hooks
- [x] טלמטריה ולוגים
- [x] בסיס ליצירת רישומים (Registries)

## 🔐 אימות (Auth)
- [x] בקרת גישה כללית לאפליקציה
- [x] הרשמה והתחברות משתמשים מקומית
- [ ] התחברות דרך ספקים (Google, Facebook וכו')
- [x] reCAPTCHA
- [x] רענון אסימון (Refresh Token) לחידוש מושבים
- [x] תמיכה מלאה ב-2FA עם יצירת קוד QR ואימות
- [x] ניהול מושבים (Sessions) מבוסס טביעת אצבע, IP וסוכן משתמש

## 🚀 מטמון (Cache)
- [x] אופטימיזציה של תגובות מערכת באמצעות מטמון בזיכרון, תואם ל-Redis, Memcached, MongoDB או קבצים בינאריים
- [x] דקורטורים פשוטים לשילוב בקרים ושערים (Gateways)
- [x] אינטגרציה אוטומטית עם חוזים
- [x] API לשליפה, עדכון או הסרת נתונים מהמטמון

## 🌐 HTTP
- [x] זמינות API דרך `@cmmv/server` או מתאמים נוספים כמו Express
- [x] יצירה אוטומטית של בקרים ושירותים
- [x] אינטגרציה עם `@cmmv/cache` ו-`@cmmv/auth`
- [x] מתאם Express
- [ ] מתאם Fastify

## 📡 Protobuf
- [x] יצירת קבצי `.proto` עבור תקשורת RPC מבוססת חוזים
- [x] יצירת ממשקים והגדרות טיפוס עבור TypeScript
- [x] יצירת חוזים בפורמט JSON לשימוש בצד לקוח
- [x] קישור בין חוזים (Contract Interlinking)

## 🗄 מאגר נתונים (Repository)
- [x] אינטגרציה עם SQL, MySQL, PostgreSQL, SQL Server, Oracle ו-MongoDB
- [x] יצירה אוטומטית של ישויות עבור TypeORM
- [x] יצירה אוטומטית של אינדקסים
- [x] יצירה אוטומטית של קשרים
- [x] אימות נתונים
- [x] פעולות CRUD עבור RPC ו-REST
- [x] מסנני חיפוש (מיון, סינון לפי מזהה, עימוד)
- [x] אפשרות לעקוף שירותים (Overrides) לשימוש ישיר במאגר
- [x] אינטגרציה עם `@cmmv/cache`, `@cmmv/auth`

## ⏳ תזמון משימות (Scheduling)
- [x] דקורטורים ליצירת משימות מתוזמנות (Cron)
- [x] ניהול משימות מתוזמנות

## 🎨 תצוגה (View)
- [x] SSR לאופטימיזציה של SEO
- [x] תבניות דינמיות בסגנון EJS
- [x] מנוע תצוגה תואם ל-Express
- [x] תמיכה ברב-לשוניות (i18n)
- [x] הכללת תצוגות משנה (Sub-views) ישירות ב-HTML
- [x] ניהול דינמי של מטא-נתונים (Scripts, Links, Meta, Header, Title)
- [x] קיבוץ וקומפילציה של CSS ו-JavaScript
- [x] אינטגרציה שקופה עם RPC

## 🔄 WebSocket (WS)
- [x] יצירה אוטומטית של שערי תקשורת RPC
- [x] הפשטת אריזת נתונים
- [x] יישום תקשורת WebSocket בצד הלקוח והשרת

## 🧩 מודולים (Modules)
- [x] **Swagger:** מספק תיעוד API עם אינטגרציה של Swagger
- [x] **Testing:** כולל בדיקות יחידה (Unit Tests), בדיקות S2S ומוקים (Mocks)
- [x] **Elastic:** אינטגרציה עם Elasticsearch לניהול אינדקסים ומסמכים
- [x] **Email:** מודול לשליחת דוא"ל באמצעות SMTP או AWS SES
- [x] **Encryptor:** הצפנה מבוססת ECC, AES-256-GCM
- [x] **Events:** ארכיטקטורה מבוססת אירועים לתקשורת חלקה
- [x] **Inspector:** כלי ניפוי באגים וניטור
- [x] **Keyv:** שילוב של אחסון מבוסס מפתח-ערך (Key-Value Store) באמצעות Keyv
- [x] **Normalizer:** מודול להמרת נתונים (JSON, XML, YAML, CSV)
- [x] **Queue:** ניהול תורי משימות (Kafka, RabbitMQ, Redis)
- [x] **UI:** רכיבי ממשק לבניית יישומים דינמיים
- [x] **Vue:** שילוב עם Vue.js