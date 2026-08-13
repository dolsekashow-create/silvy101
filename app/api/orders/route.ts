import { NextResponse } from 'next/server'
import { getProduct } from '@/lib/products'
import {
  resolveOption,
  priceForQuantity,
  quantityLabel,
  describeItems,
  MAX_QTY,
  SHIPPING_FLAT,
  GOVERNORATES,
  type OrderItem,
} from '@/lib/pricing'
import { insertOrder } from '@/lib/supabase'

export const runtime = 'nodejs'

// حد بسيط لمنع الإرسال المتكرر من نفس الجهاز
const hits = new Map<string, number[]>()
const WINDOW = 60_000
const MAX = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  list.push(now)
  hits.set(ip, list)
  return list.length > MAX
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'حاولت كثيراً في وقت قصير، انتظري دقيقة وأعيدي المحاولة.' },
      { status: 429 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح.' }, { status: 400 })
  }

  const slug = str(body.slug, 60)
  const product = getProduct(slug)
  if (!product) {
    return NextResponse.json({ error: 'المنتج غير موجود.' }, { status: 400 })
  }

  // السعر يُحسب في السيرفر — لا نثق بأي رقم قادم من المتصفح
  let variantLabel: string
  let colorSummary: string
  let quantity: number
  let itemsTotal: number

  if (str(body.optionId, 40) === 'bundle') {
    const bundle = resolveOption(slug, 'bundle')
    if (!bundle) {
      return NextResponse.json({ error: 'هذا العرض غير متاح.' }, { status: 400 })
    }
    variantLabel = bundle.label
    colorSummary = 'جميع الألوان'
    quantity = bundle.qty
    itemsTotal = bundle.price
  } else {
    const allowed = new Set((product.colors ?? []).map((c) => c.name))
    const raw = Array.isArray(body.items) ? body.items : []
    const items: OrderItem[] = []

    for (const entry of raw) {
      if (!entry || typeof entry !== 'object') continue
      const color = str((entry as Record<string, unknown>).color, 40)
      const qty = Number((entry as Record<string, unknown>).qty)
      if (!Number.isInteger(qty) || qty < 1) continue
      if (allowed.size > 0 && !allowed.has(color)) {
        return NextResponse.json({ error: 'أحد الألوان غير متاح.' }, { status: 400 })
      }
      items.push({ color, qty })
    }

    quantity = items.reduce((sum, i) => sum + i.qty, 0)
    if (quantity < 1) {
      return NextResponse.json({ error: 'اختاري الكمية المطلوبة.' }, { status: 400 })
    }
    if (quantity > MAX_QTY) {
      return NextResponse.json(
        { error: `أقصى كمية في الطلب الواحد ${MAX_QTY} قطعة، تواصلي معنا للطلبات الأكبر.` },
        { status: 400 },
      )
    }

    const computed = priceForQuantity(slug, quantity)
    if (computed === null) {
      return NextResponse.json({ error: 'تعذر حساب السعر.' }, { status: 400 })
    }

    itemsTotal = computed
    variantLabel = quantityLabel(slug, quantity)
    colorSummary = describeItems(items)
  }

  const customerName = str(body.name, 80)
  const phoneRaw = str(body.phone, 20).replace(/\D/g, '')
  const governorate = str(body.governorate, 40)
  const address = str(body.address, 300)
  const notes = str(body.notes, 500)

  if (customerName.length < 3) {
    return NextResponse.json({ error: 'اكتبي الاسم بالكامل.' }, { status: 400 })
  }
  if (!/^01[0125][0-9]{8}$/.test(phoneRaw)) {
    return NextResponse.json({ error: 'رقم الموبايل غير صحيح.' }, { status: 400 })
  }
  if (!GOVERNORATES.includes(governorate)) {
    return NextResponse.json({ error: 'اختاري المحافظة.' }, { status: 400 })
  }
  if (address.length < 10) {
    return NextResponse.json({ error: 'اكتبي العنوان بالتفصيل.' }, { status: 400 })
  }

  const total = itemsTotal + SHIPPING_FLAT

  try {
    const order = await insertOrder({
      customer_name: customerName,
      phone: phoneRaw,
      governorate,
      address,
      notes: notes || null,
      product_slug: product.slug,
      product_name: product.name,
      variant_label: variantLabel,
      color: colorSummary || null,
      quantity,
      items_total: itemsTotal,
      shipping: SHIPPING_FLAT,
      total,
    })

    return NextResponse.json({ orderNo: order.order_no, total })
  } catch (error) {
    console.error('[orders]', error)
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الطلب، حاولي مرة أخرى.' },
      { status: 500 },
    )
  }
}
