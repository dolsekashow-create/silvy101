# سيلفي كوزمتكس | Silvy Cosmetics

موقع عربي فاخر (RTL بالكامل) لعلامة **سيلفي كوزمتكس** لمنتجات العناية بالشعر والبشرة.

## التقنيات

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Base UI (shadcn) · Lucide · خط Cairo

## التشغيل

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

## الصفحات

| المسار | الصفحة |
| --- | --- |
| `/` | الرئيسية (هيرو، لماذا سيلفي، المنتجات المميزة، الفئات، عن العلامة، المزايا، الأسئلة الشائعة، دعوة للتواصل) |
| `/products` | جميع المنتجات مع فلتر الفئات |
| `/products/[slug]` | صفحة مستقلة لكل منتج (معرض صور، ألوان، مميزات، طريقة الاستخدام، تحذيرات، منتجات مشابهة) |
| `/about` | من نحن |
| `/faq` | الأسئلة الشائعة |
| `/contact` | تواصل معنا |

## البنية

```
app/          الصفحات + sitemap.ts / robots.ts / manifest.ts / loading / not-found / error
components/   مكونات قابلة لإعادة الاستخدام (navbar, footer, product-*, home/*, ui/*)
lib/site.ts   ثوابت العلامة والتواصل والسيو
lib/products.ts  بيانات المنتجات (مصدر الحقيقة الوحيد)
public/images/   الشعار وصور المنتجات
```

## قبل النشر

1. **الدومين**: غيّري `url` في `lib/site.ts` إلى الدومين الفعلي — يعتمد عليه `sitemap.xml` و canonical و OpenGraph.
2. **بيانات التواصل**: رقم واتساب ورابط فيسبوك في `lib/site.ts` فقط.
3. **إضافة منتج أو لون**: عدّلي `lib/products.ts` — الصفحات والفوتر والسايت ماب تتحدث تلقائياً.
4. **فحص الأنواع**: بعد `pnpm install` شغّلي `npx tsc --noEmit`، وإذا مرّت بنجاح احذفي `typescript.ignoreBuildErrors` من `next.config.mjs`.

## ملاحظات

- الطلب يتم عبر واتساب برسالة جاهزة تتضمن اسم المنتج واللون المختار (لا توجد سلة شراء).
- السيو: Metadata كاملة + OpenGraph + بيانات منظمة (Organization / Product / FAQPage / BreadcrumbList / ItemList).
- إمكانية الوصول: رابط تخطي للمحتوى، تسميات ARIA، تركيز واضح بلوحة المفاتيح، واحترام `prefers-reduced-motion`.
- محتوى المنتجات مأخوذ من العبوات الفعلية (GD و DINA DYE) — راجعي أي تعديل تسويقي قبل النشر.
