# LinkQR Tools - دليل التركيب وتحسين محركات البحث

## ما هو المشروع

مشروع **LinkQR Tools** هو موقع أدوات مجانية ثابت Static Web App لإنشاء روابط ورموز QR بدون قاعدة بيانات وبدون خدمات Backend. يمكن رفعه على أي استضافة مشتركة مثل Hostinger.

## متطلبات التشغيل

- استضافة تدعم ملفات HTML, CSS, JavaScript.
- يفضل تفعيل HTTPS على الاستضافة.
- لا يتطلب PHP أو Node.js أو قاعدة بيانات.

## تركيب المشروع محلياً

1. فك ضغط المجلد `qwen-8-clean` في أي مكان على جهازك.
2. افتح ملف `index.html` في المتصفح مباشرة.
3. لا تحتاج إلى سيرفر محلي لأن الموقع ثابت وكل الأدوات تعمل في المتصفح.

## رفع المشروع على Hostinger

1. ادخل إلى لوحة تحكم Hostinger (hPanel).
2. افتح **Hosting** > اختر الدومين > **File Manager**.
3. ادخل إلى مجلد `public_html`.
4. ارفع محتويات مجلد `qwen-8-clean` إلى `public_html`.
   - يمكنك رفع الملفات والمجلدات مباشرة داخل `public_html`.
   - أو ترفعهم داخل مجلد فرعي مثل `public_html/linkqr-tools`، ثم الوصول للموقع عبر `https://example.com/linkqr-tools/`.
   - **للرفع المباشر على الدومين الرئيسي**: ارفع محتويات المجلد فقط وليس المجلد نفسه، بحيث يكون `index.html` داخل `public_html` مباشرة.

## استبدال example.com بالدومين الحقيقي

افتح كل ملف وابحث عن `https://example.com` واستبدلها بدومينك الحقيقي مع HTTPS، مثلاً `https://yourdomain.com`.

الملفات التي تحتوي على روابط مطلقة:
- `sitemap.xml`
- `robots.txt`
- `manifest.webmanifest`
- جميع ملفات HTML في `canonical`, `og:url`, `twitter:url`
- `INSTALL_AND_SEO_AR.md` نفسها كمرجع

## استبدال البريد الإلكتروني

ابحث عن `contact@example.com` في الملفات واستبدلها بإيميلك الحقيقي. الملفات الأساسية:
- `config/site.config.json`
- `contact/index.html`
- `privacy-policy/index.html`
- `terms/index.html`

## ضبط Title و Meta Description

### الصفحة الرئيسية `index.html`
- Title: `LinkQR Tools - Free Link & QR Code Generators`
- Description: اكتب وصفاً قصيراً يشرح الأدوات المتوفرة.

### صفحة الأداة `tools/whatsapp-link-generator/index.html`
- Title: `WhatsApp Link Generator - Create wa.me Link with Message`
- Description: اشرح أن الأداة تنشئ روابط واتساب مع رسالة مسبقة.

### باقي الصفحات
- About: `About Us - LinkQR Tools`
- Contact: `Contact Us - LinkQR Tools`
- Privacy Policy: `Privacy Policy - LinkQR Tools`
- Terms: `Terms of Service - LinkQR Tools`

## ضبط H1 والنصوص

كل صفحة يجب أن تحتوي على H1 واحد واضح يصف محتوى الصفحة. لا تكرر H1 في نفس الصفحة.

## ضبط اللوغو

اللوغو الحالي هو ملف SVG بسيط في `assets/img/logo.svg`.

### مقاسات اللوغو الموصى بها
| الملف | المقاس | الاستخدام |
|------|------|---------|
| `logo.svg` | 512x512 | اللوغو في الموقع و manifest |
| `logo-512.png` | 512x512 | PWA icon |
| `logo-192.png` | 192x192 | PWA icon |
| `favicon.ico` | 16x16 أو 32x32 | Favicon للمتصفح |
| `favicon-32.png` | 32x32 | Favicon بديل |
| `apple-touch-icon.png` | 180x180 | أيقونة عند إضافة للمنزل على iOS |

لتوليد هذه المقاسات من الـ SVG استخدم أدوات مثل:
- https://realfavicongenerator.net/
- https://favicon.io/

بعد التوليد ضعها في `assets/img/` وحدث المسارات في `index.html` وملفات الأدوات.

## ضبط الفافيكون

في جميع صفحات HTML أضف في `<head>`:

```html
<link rel="icon" href="/assets/img/favicon.ico" sizes="any">
<link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
```

## ضبط صورة OG

الملف الحالي `assets/img/og-cover.svg` بسيط. يفضل تحويله إلى PNG بالمقاس 1200x630 لتحسين العرض على وسائل التواصل.

للتحويل استخدم:
- https://cloudconvert.com/svg-to-png
- أو أي محرر صور.

بعد التحويل ضعها كـ `assets/img/og-cover.png` وحدث المسار في:
- `config/site.config.json`
- جميع ملفات HTML في `og:image` و `twitter:image`

## ضبط canonical

في كل صفحة HTML أضف وسم canonical في `<head>`:

```html
<link rel="canonical" href="https://example.com/page-url/">
```

تأكد أن canonical يشير إلى الصفحة الحالية وليس لصفحة أخرى.

## ضبط sitemap.xml

- تأكد أن كل الصفحات المهمة موجودة في `sitemap.xml`.
- حدث `lastmod` عند كل تعديل.
- استخدم `changefreq` مناسب:
  - الصفحة الرئيسية والأدوات: `weekly`
  - الصفحات القانونية: `monthly`
- تأكد أن الرابط في `robots.txt` يطابق الرابط في `sitemap.xml`.

## ضبط robots.txt

الملف الحالي يسمح بالزحف لجميع الصفحات ويشير إلى sitemap. إذا أردت حجز صفحات معينة أضف `Disallow`.

## ضبط Schema JSON-LD

### الصفحة الرئيسية
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LinkQR Tools",
  "url": "https://example.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### صفحة الأداة
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "WhatsApp Link Generator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "url": "https://example.com/tools/whatsapp-link-generator/",
  "description": "Generate WhatsApp wa.me links with custom messages and QR codes."
}
```

## إضافة لغات جديدة

1. أنشئ مجلد لكل لغة مثل `ar/`, `es/`, `pt/`.
2. انسخ `index.html` إلى كل مجلد.
3. عدل النصوص واتجاه الصفحة (`dir="rtl"` للعربية).
4. أضف `hreflang` في `<head>`:

```html
<link rel="alternate" hreflang="en" href="https://example.com/" />
<link rel="alternate" hreflang="ar" href="https://example.com/ar/" />
<link rel="alternate" hreflang="es" href="https://example.com/es/" />
<link rel="alternate" hreflang="pt" href="https://example.com/pt/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

## استخدام hreflang

في كل صفحة أضف روابط `hreflang` لجميع اللغات المتوفرة، مع نسخة `x-default` تشير للصفحة الافتراضية.

## ضبط AdSense بعد القبول

1. لا تضع كود AdSense قبل الحصول على قبول نهائي من Google.
2. بعد القبول، ضع كود AdSense في مكان التعليقات:
   ```html
   <!-- AdSense: paste your approved AdSense script here -->
   ```
3. الأماكن المسموح بها:
   - بين الفقرات في قسم المحتوى النصي.
   - في الشريط الجانبي إن وجد.
4. الأماكن الممنوعة:
   - لا تضع إعلانات فوق الأداة مباشرة.
   - لا تضع إعلانات منبثقة أو تختلق نقرات.
   - لا تضع إعلانات تغطي النتيجة.

## أماكن الإعلانات المسموح بها

- بعد قسم Hero.
- بين أقسام المحتوى.
- بعد شبكة الأدوات.

## أخطاء يجب تجنبها في AdSense

- لا تضغط على إعلاناتك بنفسك.
- لا تطلب من الزوار النقر على الإعلانات.
- لا تضع عناصر تشبه الإعلانات بشكل مضلل.
- لا تضع إعلانات في صفحات غير مكتملة المحتوى.
- لا تستخدم شبكات إعلانية أخرى متضاربة.

## إضافة Google Analytics اختيارياً

1. أنشئ حساب Google Analytics 4.
2. انسخ Measurement ID (مثل `G-XXXXXXXXXX`).
3. ضعه في `config/site.config.json` تحت `analytics`.
4. أضف كود GTAG في `<head>` لجميع الصفحات بعد تفعيله.

## تحسين الأداء

- استخدم خطوط النظام ولا تحمل خطوط خارجية ثقيلة.
- ضغط الصور.
- تفعيل Compression و Cache عبر `.htaccess`.
- استخدم CDN للمكتبات أو حملها محلياً في `assets/vendor/`.
- تجنب السكربتات الثقيلة في الصفحة الرئيسية.
- استخدم `defer` و `async` للسكربتات غير الضرورية.

## كيفية إضافة أداة جديدة

1. أنشئ مجلد جديد في `tools/` باسم الأداة بالانجليزية مع واصلات، مثلاً `tools/utm-builder/`.
2. أنشئ ملف `index.html` داخل المجلد.
3. أنشئ ملف JavaScript للأداة في `assets/js/tools/`.
4. أضف بطاقة الأداة في الصفحة الرئيسية `index.html`.
5. أضف رابط للأداة في القائمة الرئيسية.
6. أضف الأداة في `sitemap.xml`.
7. اكتب محتوى نصي للصفحة (كيفية الاستخدام، الأسئلة الشائعة).

## Checklist كامل قبل النشر

### المحتوى
- [ ] جميع الصفحات موجودة.
- [ ] النصوص مفيدة وليست محشوة كلمات مفتاحية.
- [ ] لا يوجد محتوى منسوخ.
- [ ] الصفحات القانونية موجودة.

### SEO
- [ ] Title مختلف لكل صفحة.
- [ ] Meta Description مختلف لكل صفحة.
- [ ] H1 واحد واضح في كل صفحة.
- [ ] canonical صحيح في كل صفحة.
- [ ] OG Tags كاملة في كل صفحة.
- [ ] Twitter Cards كاملة في كل صفحة.
- [ ] alt text للصور.
- [ ] Schema JSON-LD موجود.
- [ ] sitemap.xml صالح ويشمل كل الصفحات.
- [ ] robots.txt يشير لـ sitemap ويسمح بالزحف.

### التقنية
- [ ] جميع الروابط الداخلية نسبية أو مطلقة صحيحة.
- [ ] لا توجد مسارات مكسورة.
- [ ] CSS يعمل بشكل صحيح.
- [ ] JS يعمل بدون أخطاء Console.
- [ ] الموقع متجاوب مع الموبايل.
- [ ] HTTPS مفعل.
- [ ] .htaccess لا يحتوي أخطاء.

### AdSense
- [ ] لا يوجد كود AdSense حقيقي قبل القبول.
- [ ] الصفحات القانونية موجودة.
- [ ] لا يوجد نصوص تحرض على النقر.

### الأداء
- [ ] الصفحة الرئيسية تحمل بسرعة.
- [ ] الصور مضغوطة.
- [ ] المكتبات محملة من CDN أو محلياً.

### بعد النشر
- [ ] اختبر جميع الروابط.
- [ ] اختبر النموذج إن وجد.
- [ ] تأكد من عمل الأداة على الموبايل.
- [ ] أضف الموقع في Google Search Console.
- [ ] أرسل sitemap.xml في Google Search Console.
- [ ] اختبر Speed Insights.

## تنبيه قانوني

صفحات **Privacy Policy** و **Terms of Service** هي قوالب عامة. يجب مراجعتها من قبل محامٍ لضمان توافقها مع قوانين بلدك وقوانين الاتحاد الأوروبي (GDPR) والقوانين المحلية الأخرى.

## تنبيه العلامات التجارية

لا تستخدم شعارات **WhatsApp** أو **Telegram** أو **YouTube** بشكل رسمي أو مضلل. هذا المشروع لا تابع لهذه الشركات. استخدم أسماء الأدوات بشكل وصفي فقط.

## الإضافات الجديدة (نسخة الإطلاق الخارقة)

### Offline PWA
- تم إضافة `sw.js` لدعم العمل بدون إنترنت بعد الزيارة الأولى.
- التخزين المؤقت يشمل: index.html، 404.html، CSS، JS، واللوغو.

### لافتة المقهى المطبوعة
- أداة WiFi QR Generator تحتوي على زر "Print Café Sign" لطباعة لافتة WiFi جاهزة للمسح.

### التوقيع الرقمي للصور
- `assets/js/tools/png-signer.js` يضيف metadata Copyright تلقائياً لكل صورة QR يتم تحميلها.

### القائمة المنسدلة
- تم استبدال رابط Tools بقائمة منسدلة تحتوي على جميع الأدوات مقسمة إلى مجموعتين: Links & QR و Calculators.

### SDK للمطورين
- `assets/js/linkqr.sdk.js` يوفر واجهة برمجة مجانية لجميع الأدوات.
- صفحة `developers/index.html` تحتوي على توثيق وأمثلة و Live Demo.

### الحاسبات الأربع
- Age Calculator
- Hijri-Gregorian Converter
- BMI Calculator
- Calorie Calculator

### محرك المحتوى Guides
- 5 مقالات أصلية طويلة الذيل لتحسين SEO.
- المجلد `guides/` يحتوي على فهرس + 5 مقالات.

### صندوق البحث
- صفحة الرئيسية تحتوي على صندوق بحث فوري لتصفية الأدوات.

### GA4
- تعليق اختياري في كل الصفحات لإضافة Google Analytics بعد إنشاء Property.

### logo-new.svg
- لوغو بديل موجود في `assets/img/logo-new.svg` للاستخدام اليدوي إذا رغبت.

## بعد النشر

- [ ] حول `og-cover.svg` إلى `og-cover.png` (1200x630) وارفعه.
- [ ] فعّل HTTPS.
- [ ] أرسل sitemap.xml إلى Google Search Console.
- [ ] اختبر PageSpeed Insights.
