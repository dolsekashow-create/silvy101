/**
 * عميل بسيط لـ Supabase عبر REST — بدون أي حزم إضافية.
 * يُستخدم في السيرفر فقط (المفتاح السري لا يصل للمتصفح أبداً).
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SECRET_KEY

function headers() {
  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL أو SUPABASE_SECRET_KEY غير مضبوطين في .env.local')
  }
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  }
}

export type OrderRow = {
  id: number
  order_no: string
  customer_name: string
  phone: string
  governorate: string
  address: string
  notes: string | null
  product_name: string
  product_slug: string
  variant_label: string
  color: string | null
  quantity: number
  items_total: number
  shipping: number
  total: number
  status: string
  created_at: string
}

export async function insertOrder(payload: Record<string, unknown>): Promise<OrderRow> {
  const res = await fetch(`${url}/rest/v1/orders`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=representation' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`)
  const rows = (await res.json()) as OrderRow[]
  return rows[0]
}

export async function listOrders(limit = 200): Promise<OrderRow[]> {
  const res = await fetch(
    `${url}/rest/v1/orders?select=*&order=created_at.desc&limit=${limit}`,
    { headers: headers(), cache: 'no-store' },
  )
  if (!res.ok) throw new Error(`Supabase select failed: ${res.status} ${await res.text()}`)
  return (await res.json()) as OrderRow[]
}
