// بيكسل ميتا (فيسبوك) — يعمل فقط لو NEXT_PUBLIC_META_PIXEL_ID متضاف في متغيرات البيئة
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

type Fbq = (...args: unknown[]) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

/**
 * يسجل حدث في البيكسل. لو سكربت البيكسل لسه ما اتحملش، بيعيد المحاولة لمدة 5 ثواني.
 * eventId بيتبعت كمان من السيرفر (Conversions API) عشان ميتا متحسبش الطلب مرتين.
 */
export function track(event: string, params: Record<string, unknown> = {}, eventId?: string) {
  if (!PIXEL_ID || typeof window === 'undefined') return
  let tries = 0
  const send = () => {
    if (window.fbq) {
      window.fbq('track', event, params, eventId ? { eventID: eventId } : undefined)
      return
    }
    if (++tries < 20) setTimeout(send, 250)
  }
  send()
}
