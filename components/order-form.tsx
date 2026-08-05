'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CircleCheckBig, Loader2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPricing, SHIPPING_FLAT, GOVERNORATES } from '@/lib/pricing'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/products'

type Status = 'idle' | 'sending' | 'done'

export function OrderForm({ product }: { product: Product }) {
  const price = getPricing(product.slug)
  const colors = product.colors ?? []

  const [optionId, setOptionId] = useState(`tier-${price?.tiers[0]?.qty ?? 1}`)
  const [color, setColor] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [orderNo, setOrderNo] = useState<string | null>(null)

  if (!price) return null

  const isBundle = optionId === 'bundle'
  const selected = isBundle
    ? price.bundle
    : price.tiers.find((t) => `tier-${t.qty}` === optionId)
  const total = (selected?.price ?? 0) + SHIPPING_FLAT

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setStatus('sending')

    const data = new FormData(event.currentTarget)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: product.slug,
          optionId,
          color: isBundle ? 'جميع الألوان' : color,
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

      {/* الكمية والسعر */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-bold">اختاري الكمية</legend>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {price.tiers.map((tier) => {
            const id = `tier-${tier.qty}`
            const active = optionId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setOptionId(id)}
                aria-pressed={active}
                className={cn(
                  'flex flex-col items-center rounded-2xl border px-3 py-2.5 transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  active
                    ? 'border-primary bg-accent/60 shadow-md'
                    : 'border-border hover:border-primary/40',
                )}
              >
                <span className="text-sm font-bold">{tier.label}</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {tier.price} جنيه
                </span>
              </button>
            )
          })}
          {price.bundle && (
            <button
              type="button"
              onClick={() => setOptionId('bundle')}
              aria-pressed={isBundle}
              className={cn(
                'flex flex-col items-center rounded-2xl border px-3 py-2.5 transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                isBundle
                  ? 'border-transparent bg-gradient-brand text-primary-foreground shadow-md'
                  : 'border-primary/40 hover:border-primary',
              )}
            >
              <span className="text-sm font-bold">{price.bundle.label}</span>
              <span
                className={cn(
                  'text-xs font-semibold',
                  isBundle ? 'text-primary-foreground/90' : 'text-muted-foreground',
                )}
              >
                {price.bundle.price} جنيه
              </span>
            </button>
          )}
        </div>
      </fieldset>

      {/* اللون */}
      {colors.length > 0 && !isBundle && (
        <fieldset className="mb-6">
          <legend className="mb-3 text-sm font-bold">
            اللون المطلوب{' '}
            <span className="font-normal text-muted-foreground">
              {color ? `— ${color}` : '(اختياري)'}
            </span>
          </legend>
          <ul className="flex flex-wrap gap-2.5">
            {colors.map((c) => {
              const active = color === c.name
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => setColor(active ? '' : c.name)}
                    aria-pressed={active}
                    className={cn(
                      'flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                      active ? 'border-primary shadow-md' : 'border-border hover:border-primary/40',
                    )}
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    >
                      {active && <Check className="h-3 w-3 text-white drop-shadow" />}
                    </span>
                    <span className="text-sm font-semibold">{c.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          {(selected?.qty ?? 1) > 1 && (
            <p className="mt-2 text-xs text-muted-foreground">
              لطلب ألوان مختلفة، اكتبيها في خانة الملاحظات بالأسفل.
            </p>
          )}
        </fieldset>
      )}

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
          <dt className="text-muted-foreground">{selected?.label}</dt>
          <dd className="font-semibold">{selected?.price} جنيه</dd>
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
        disabled={status === 'sending'}
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
