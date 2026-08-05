export const SITE = {
  name: 'سيلفي كوزمتكس',
  nameEn: 'Silvy Cosmetics',
  /** غيّري هذا الرابط إلى الدومين الفعلي بعد النشر */
  url: 'https://silvycosmetics.com',
  description:
    'سيلفي كوزمتكس علامة تجارية فاخرة لمنتجات العناية بالشعر والبشرة: اسبراي وكريم تلوين الشعر المؤقت، صبغة الشعر الدائمة بزيت الأرجان، واسبراي تفتيح البشرة.',
  ogImage: '/images/og.jpg',
  locale: 'ar_EG',
} as const

export const WHATSAPP_NUMBER = '201283658904'
export const WHATSAPP_DISPLAY = '01283658904'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100064127946084'

/** رابط واتساب مع رسالة جاهزة */
export function whatsappLink(message?: string) {
  if (!message) return WHATSAPP_URL
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}
