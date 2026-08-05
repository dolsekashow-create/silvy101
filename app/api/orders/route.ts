import { NextResponse } from 'next/server'
import { getProduct } from '@/lib/products'
import { resolveOption, SHIPPING_FLAT, GOVERNORATES } from '@/lib/pricing'
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
  const option = resolveOption(slug, str(body.optionId, 40))
  if (!option) {
    return NextResponse.json({ error: 'اختاري الكمية المطلوبة.' }, { status: 400 })
  }

  const customerName = str(body.name, 80)
  const phoneRaw = str(body.phone, 20).replace(/\D/g, '')
  const governorate = str(body.governorate, 40)
  const address = str(body.address, 300)
  const notes = str(body.notes, 500)
  const color = str(body.color, 40)

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

  const itemsTotal = option.price
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
      variant_label: option.label,
      color: color || null,
      quantity: option.qty,
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
