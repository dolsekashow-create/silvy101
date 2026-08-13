'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CircleCheckBig, Loader2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getPricing,
  priceForQuantity,
  quantityLabel,
  MAX_QTY,
  SHIPPING_FLAT,
  GOVERNORATES,
} from '@/lib/pricing'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/product-types'

type Status = 'idle' | 'sending' | 'done'

export function OrderForm({ product }: { product: Product }) {
  const price = getPricing(product.slug)
  const colors = product.colors ?? []

  // كمية مستقلة لكل لون — والمنتجات بدون ألوان لها عدّاد واحد
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    colors.length > 0 ? {} : { '': 1 },
  )
  const [isBundle, setIsBundle] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [orderNo, setOrderNo] = useState<string | null>(null)

  const items: { color: string; qty: number }[] = Object.entries(
    quantities as Record<string, number>,
  )
    .filter(([, qty]) => qty > 0)
    .map(([color, qty]) => ({ color, qty }))
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0)

  const itemsTotal = isBundle
    ? (price?.bundle?.price ?? 0)
    : totalQty > 0
      ? (priceForQuantity(product.slug, totalQty) ?? 0)
      : 0
  const total = itemsTotal + SHIPPING_FLAT

  function changeQty(color: string, delta: number) {
    setIsBundle(false)
    setQuantities((current: Record<string, number>) => {
      const next = Math.max(0, Math.min(MAX_QTY, (current[color] ?? 0) + delta))
      const totalOthers = Object.entries(current)
        .filter(([key]) => key !== color)
        .reduce((sum, [, qty]) => sum + (qty as number), 0)
      if (totalOthers + next > MAX_QTY) return current
      return { ...current, [color]: next }
    })
  }

  if (!price) return null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isBundle && totalQty < 1) {
      setError('اختاري الكمية المطلوبة أولاً.')
      return
    }
    setError(null)
    setStatus('sending')

    const data = new FormData(event.currentTarget)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: product.slug,
          optionId: isBundle ? 'bundle' : 'items',
          items,
          name: data.get('name'),
          phone: data.get('phone'),
          governorate: data.get('governorate'),
          address: data.get('address'),
          notes: data.get('notes'),
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'تعذر إرسال الطلب.')
      setOrderNo(json.orderNo)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر إرسال الطلب.')
      setStatus('idle')
    }
  }

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-3xl border border-primary/30 bg-accent/50 p-8 text-center"
      >
        <CircleCheckBig className="mx-auto mb-4 h-12 w-12 text-primary" aria-hidden="true" />
        <h2 className="mb-2 text-xl font-extrabold">تم استلام طلبك بنجاح</h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          سنتواصل معك لتأكيد الطلب وموعد التسليم. احتفظي برقم الطلب:
        </p>
        <p className="mb-6 text-2xl font-extrabold text-gradient" dir="ltr">
          {orderNo}
        </p>
        <Button
          variant="outline"
          className="rounded-full bg-transparent px-8"
          onClick={() => {
            setStatus('idle')
            setOrderNo(null)
          }}
        >
          طلب آخر
        </Button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold">
        <ShoppingBag className="h-6 w-6 text-primary" aria-hidden="true" />
        اطلبي الآن
      </h2>

      {/* الكمية لكل لون */}
      <fieldset className="mb-6">
        <legend className="mb-1 text-sm font-bold">
          {colors.length > 0 ? 'اختاري الألوان والكمية' : 'الكمية'}
        </legend>
        {colors.length > 0 && (
          <p className="mb-3 text-xs text-muted-foreground">
            حددي كمية مستقلة لكل لون — والسعر يُحسب تلقائياً على أفضل عرض.
          </p>
        )}

        <ul className="flex flex-col gap-2">
          {(colors.length > 0 ? colors : [{ name: '', hex: '' }]).map((c) => {
            const qty = quantities[c.name] ?? 0
            return (
              <li
                key={c.name || 'single'}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition-colors',
                  qty > 0 && !isBundle ? 'border-primary bg-accent/40' : 'border-border',
                )}
              >
                <span className="flex items-center gap-2.5">
                  {c.hex && (
                    <span
                      className="h-6 w-6 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-sm font-bold">{c.name || product.shortName}</span>
                </span>

                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => changeQty(c.name, -1)}
                    disabled={qty === 0}
                    aria-label={`إنقاص ${c.name || 'الكمية'}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary/50 disabled:opacity-40"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="w-8 text-center text-base font-extrabold" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeQty(c.name, 1)}
                    aria-label={`زيادة ${c.name || 'الكمية'}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </span>
              </li>
            )
          })}
        </ul>

        {price.bundle && (
          <button
            type="button"
            onClick={() => {
              setIsBundle((v) => !v)
              setQuantities(colors.length > 0 ? {} : { '': 1 })
            }}
            aria-pressed={isBundle}
            className={cn(
              'mt-3 flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              isBundle
                ? 'border-transparent bg-gradient-brand text-primary-foreground shadow-md'
                : 'border-primary/40 hover:border-primary',
            )}
          >
            <span className="text-sm font-extrabold">{price.bundle.label} — عرض خاص</span>
            <span className="text-sm font-extrabold">{price.bundle.price} جنيه</span>
          </button>
        )}

        {/* جدول العروض */}
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-semibold text-primary">
            عرض جدول الأسعار
          </summary>
          <ul className="mt-2 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
            {price.tiers.map((t) => (
              <li key={t.qty} className="rounded-xl bg-muted px-2.5 py-1.5">
                {t.label}: <span className="font-bold text-foreground">{t.price} جنيه</span>
              </li>
            ))}
          </ul>
        </details>
      </fieldset>

      {/* بيانات التوصيل */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="الاسم بالكامل" name="name" required placeholder="مثال: سارة أحمد" />
        <Field
          label="رقم الموبايل"
          name="phone"
          required
          type="tel"
          inputMode="numeric"
          placeholder="01xxxxxxxxx"
          dir="ltr"
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="governorate" className="text-sm font-bold">
            المحافظة
          </label>
          <select
            id="governorate"
            name="governorate"
            required
            defaultValue=""
            className="h-11 rounded-2xl border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>
              اختاري المحافظة
            </option>
            {GOVERNORATES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <Field label="العنوان بالتفصيل" name="address" required placeholder="الشارع، رقم العقار، علامة مميزة" />
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="notes" className="text-sm font-bold">
            ملاحظات <span className="font-normal text-muted-foreground">(اختياري)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="أي تفاصيل إضافية عن الطلب أو الألوان المطلوبة"
            className="rounded-2xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      </div>

      {/* الإجمالي */}
      <dl className="mt-6 space-y-1.5 rounded-2xl bg-accent/50 p-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">
            {isBundle ? price.bundle?.label : totalQty > 0 ? quantityLabel(product.slug, totalQty) : 'لم تحددي كمية بعد'}
          </dt>
          <dd className="font-semibold">{itemsTotal} جنيه</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">الشحن (جميع المحافظات)</dt>
          <dd className="font-semibold">{SHIPPING_FLAT} جنيه</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base">
          <dt className="font-extrabold">الإجمالي</dt>
          <dd className="font-extrabold text-primary">{total} جنيه</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-muted-foreground">الدفع عند الاستلام.</p>

      {error && (
        <p role="alert" className="mt-4 rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'sending' || (!isBundle && totalQty < 1)}
        className="mt-5 h-12 w-full rounded-full bg-gradient-brand text-base text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            جارٍ الإرسال…
          </>
        ) : (
          <>تأكيد الطلب — {total} جنيه</>
        )}
      </Button>
    </form>
  )
}

function Field({
  label,
  name,
  ...props
}: { label: string; name: string } & React.ComponentProps<'input'>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-bold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="h-11 rounded-2xl border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        {...props}
      />
    </div>
  )
}
