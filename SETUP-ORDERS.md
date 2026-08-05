# تشغيل نظام الطلبات — خطوات مرتبة

## 1) قاعدة البيانات

Supabase → مشروعك → **SQL Editor** → **New query** → الصق محتوى ملف `supabase/schema.sql` كاملاً → **Run**.

المفروض تشوف رسالة نجاح، وجدول `orders` يظهر في **Table Editor**.

## 2) المفاتيح

Supabase → **Project Settings** → **API Keys** → انسخ **Secret key** (يبدأ بـ `sb_secret_`).

في مجلد المشروع، انسخ `.env.example` باسم `.env.local` واملأه:

```
NEXT_PUBLIC_SUPABASE_URL=https://nwheccnlwlkddlqpptmr.supabase.co
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxx
ADMIN_PASSWORD=اكتب كلمة مرور قوية
ADMIN_SESSION_SECRET=أي نص عشوائي طويل
```

> المفتاح السري لا يُرسل لأحد ولا يُرفع على GitHub. لو انكشف، اعمل له Reset من نفس الصفحة.
> المفتاح العام (`sb_publishable_`) غير مستخدم — القراءة والكتابة كلها من السيرفر.

## 3) التشغيل

```bash
pnpm install
pnpm dev
```

- الطلب: أي صفحة منتج → قسم «اطلبي الآن» في الأسفل
- اللوحة: `http://localhost:3000/admin` → كلمة المرور من `.env.local`

## 4) النشر على Vercel

استورد المشروع، وأضف نفس الأربع متغيرات في **Settings → Environment Variables**، ثم Deploy.

---

## ملاحظات

- الأسعار في `lib/pricing.ts` والشحن `SHIPPING_FLAT = 50`. السعر يُحسب في السيرفر، فتعديل أي رقم من المتصفح لا يؤثر.
- تغيير حالة الطلب حالياً من **Supabase → Table Editor** (عمود `status`). اللوحة للعرض فقط كما طلبت.
- تنبيهات الطلبات الجديدة (إيميل/تليجرام) غير مفعّلة — لم تُحدد بعد.
