-- ============================================================
-- Silvy Cosmetics — جدول الطلبات
-- الصق هذا الملف كاملاً في: Supabase → SQL Editor → New query → Run
-- ============================================================

-- تسلسل أرقام الطلبات
create sequence if not exists public.order_no_seq start 1001;

create table if not exists public.orders (
  id            bigint generated always as identity primary key,
  order_no      text not null unique
                default ('SLV-' || lpad(nextval('public.order_no_seq')::text, 5, '0')),

  -- بيانات العميل
  customer_name text not null,
  phone         text not null,
  governorate   text not null,
  address       text not null,
  notes         text,

  -- بيانات الطلب
  product_slug  text not null,
  product_name  text not null,
  variant_label text not null,          -- مثال: عبوتين / جميع الألوان
  color         text,
  quantity      int  not null default 1,

  -- الحساب (يُحسب في السيرفر وليس من المتصفح)
  items_total   numeric(10,2) not null,
  shipping      numeric(10,2) not null default 50,
  total         numeric(10,2) not null,

  status        text not null default 'جديد'
                check (status in ('جديد','تم التأكيد','تم الشحن','تم التسليم','ملغي')),
  created_at    timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx     on public.orders (status);
create index if not exists orders_phone_idx      on public.orders (phone);

-- ============================================================
-- الحماية: RLS مفعّل بدون أي policy
-- يعني لا أحد يقرأ أو يكتب بالمفتاح العام (publishable) نهائياً.
-- الموقع يكتب الطلبات من السيرفر بالمفتاح السري (secret) الذي يتجاوز RLS.
-- ============================================================
alter table public.orders enable row level security;
