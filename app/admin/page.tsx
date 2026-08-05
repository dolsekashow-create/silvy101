import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ADMIN_COOKIE, isValidSession } from '@/lib/admin-session'
import { listOrders, type OrderRow } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'الطلبات',
  robots: { index: false, follow: false },
}

const statusStyles: Record<string, string> = {
  جديد: 'bg-primary/15 text-primary',
  'تم التأكيد': 'bg-secondary/15 text-secondary',
  'تم الشحن': 'bg-amber-100 text-amber-700',
  'تم التسليم': 'bg-emerald-100 text-emerald-700',
  ملغي: 'bg-destructive/10 text-destructive',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ar-EG', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Africa/Cairo',
  }).format(new Date(value))
}

export default async function AdminPage() {
  const store = await cookies()
  if (!isValidSession(store.get(ADMIN_COOKIE)?.value)) {
    redirect('/admin/login')
  }

  let orders: OrderRow[] = []
  let error: string | null = null
  try {
    orders = await listOrders()
  } catch {
    error = 'تعذر تحميل الطلبات — تأكد من إعدادات Supabase في ملف .env.local'
  }

  const todayCount = orders.filter(
    (o) => new Date(o.created_at).toDateString() === new Date().toDateString(),
  ).length
  const newCount = orders.filter((o) => o.status === 'جديد').length

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">الطلبات</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {orders.length} طلب · {newCount} جديد · {todayCount} اليوم
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <Button type="submit" variant="outline" className="rounded-full bg-transparent">
            خروج
          </Button>
        </form>
      </div>

      {error && (
        <p role="alert" className="rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {!error && orders.length === 0 && (
        <p className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
          لا توجد طلبات بعد.
        </p>
      )}

      <ul className="flex flex-col gap-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold" dir="ltr">
                  {order.order_no}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    statusStyles[order.status] ?? 'bg-muted text-muted-foreground'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(order.created_at)}</span>
            </div>

            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <Item label="العميل" value={order.customer_name} />
              <Item label="الموبايل" value={order.phone} ltr />
              <Item label="المحافظة" value={order.governorate} />
              <Item
                label="المنتج"
                value={`${order.product_name} — ${order.variant_label}${
                  order.color ? ` (${order.color})` : ''
                }`}
              />
              <Item label="العنوان" value={order.address} />
              <Item
                label="الإجمالي"
                value={`${order.total} جنيه (منها ${order.shipping} شحن)`}
                strong
              />
              {order.notes && <Item label="ملاحظات" value={order.notes} />}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Item({
  label,
  value,
  ltr,
  strong,
}: {
  label: string
  value: string
  ltr?: boolean
  strong?: boolean
}) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd
        className={`leading-relaxed ${strong ? 'font-extrabold text-primary' : 'font-semibold'}`}
        dir={ltr ? 'ltr' : undefined}
        style={ltr ? { textAlign: 'start' } : undefined}
      >
        {value}
      </dd>
    </div>
  )
}
