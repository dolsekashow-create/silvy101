import { createHash } from 'crypto'

// Conversions API — بيبعت الطلب لميتا من السيرفر، فيتسجل حتى لو المتصفح حاجب البيكسل.
// يعمل فقط لو NEXT_PUBLIC_META_PIXEL_ID و META_CAPI_TOKEN متضافين.
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v23.0'

const sha256 = (value: string) => createHash('sha256').update(value.trim().toLowerCase()).digest('hex')

function readCookie(header: string | null, name: string) {
  const match = header?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

export async function sendPurchaseEvent(
  request: Request,
  order: {
    orderNo: string
    value: number
    slug: string
    productName: string
    quantity: number
    phone: string // بصيغة 01xxxxxxxxx
    customerName: string
  },
) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const token = process.env.META_CAPI_TOKEN
  if (!pixelId || !token) return

  const cookies = request.headers.get('cookie')
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const firstName = order.customerName.split(/\s+/)[0] ?? ''

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        // نفس الـ ID اللي البيكسل بيبعته من المتصفح عشان ميتا تشيل التكرار
        event_id: `order-${order.orderNo}`,
        action_source: 'website',
        event_source_url: request.headers.get('referer') ?? undefined,
        user_data: {
          ph: [sha256(`2${order.phone}`)],
          ...(firstName ? { fn: [sha256(firstName)] } : {}),
          country: [sha256('eg')],
          client_ip_address: ip,
          client_user_agent: request.headers.get('user-agent') ?? undefined,
          fbp: readCookie(cookies, '_fbp'),
          fbc: readCookie(cookies, '_fbc'),
        },
        custom_data: {
          currency: 'EGP',
          value: order.value,
          content_ids: [order.slug],
          content_name: order.productName,
          content_type: 'product',
          num_items: order.quantity,
          order_id: order.orderNo,
        },
      },
    ],
  }
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000),
      },
    )
    if (!res.ok) console.error('[meta-capi]', res.status, await res.text())
  } catch (error) {
    // فشل التتبع ما يوقفش الطلب أبداً
    console.error('[meta-capi]', error)
  }
}
