export type PriceTier = {
  /** عدد العبوات */
  qty: number
  label: string
  price: number
}

export type ProductPricing = {
  tiers: PriceTier[]
  /** عرض «جميع الألوان» إن وُجد */
  bundle?: { label: string; price: number; qty: number }
}

export const SHIPPING_FLAT = 50

export const pricing: Record<string, ProductPricing> = {
  'hair-color-spray': {
    // يبدأ 150 للعبوة، وينزل 5 جنيه في سعر العبوة مع كل عبوة إضافية
    tiers: [
      { qty: 1, label: 'عبوة', price: 150 },
      { qty: 2, label: 'عبوتين', price: 290 },
      { qty: 3, label: '3 عبوات', price: 420 },
      { qty: 4, label: '4 عبوات', price: 540 },
      { qty: 5, label: '5 عبوات', price: 650 },
      { qty: 6, label: '6 عبوات', price: 750 },
      { qty: 7, label: '7 عبوات', price: 840 },
      { qty: 8, label: '8 عبوات', price: 920 },
      { qty: 9, label: '9 عبوات', price: 990 },
    ],
    bundle: { label: 'جميع الألوان', price: 990, qty: 9 },
  },
  'hair-color-cream': {
    // يبدأ 200 للعبوة، وينزل 5 جنيه في سعر العبوة مع كل عبوة إضافية
    tiers: [
      { qty: 1, label: 'عبوة', price: 200 },
      { qty: 2, label: 'عبوتين', price: 390 },
      { qty: 3, label: '3 عبوات', price: 570 },
      { qty: 4, label: '4 عبوات', price: 740 },
      { qty: 5, label: '5 عبوات', price: 900 },
      { qty: 6, label: '6 عبوات', price: 1050 },
      { qty: 7, label: '7 عبوات', price: 1190 },
      { qty: 8, label: '8 عبوات', price: 1320 },
      { qty: 9, label: '9 عبوات', price: 1440 },
    ],
    bundle: { label: 'جميع الألوان', price: 1440, qty: 9 },
  },
  'permanent-hair-dye': {
    tiers: [
      { qty: 1, label: 'قطعة', price: 150 },
      { qty: 2, label: 'قطعتين', price: 280 },
      { qty: 3, label: '3 قطع', price: 390 },
      { qty: 6, label: '6 قطع', price: 720 },
    ],
  },
  'skin-whitening-spray': {
    tiers: [
      { qty: 1, label: 'عبوة', price: 200 },
      { qty: 2, label: 'عبوتين', price: 380 },
      { qty: 3, label: '3 عبوات', price: 540 },
    ],
  },
  // سعر ثابت بدون عروض كميات: أي عدد = 180 × العدد
  'whitening-soap': {
    tiers: [{ qty: 1, label: 'صابونة', price: 180 }],
  },
  'gold-soap': {
    tiers: [{ qty: 1, label: 'صابونة', price: 180 }],
  },
}

export function getPricing(slug: string) {
  return pricing[slug]
}

/** أقل سعر للمنتج — يُعرض في بطاقات المنتجات */
export function startingPrice(slug: string) {
  return pricing[slug]?.tiers[0]?.price
}

/** أقصى عدد قطع مسموح به في الطلب الواحد */
export const MAX_QTY = 30

/**
 * أفضل سعر لأي كمية — يجمّع بين العروض المتاحة بحيث يحصل العميل على أقل سعر.
 * مثال: 7 عبوات اسبراي = عرض 5 (500) + عرض عبوتين (230) = 730 جنيه.
 */
export function priceForQuantity(slug: string, qty: number): number | null {
  const p = pricing[slug]
  if (!p || qty < 1 || qty > MAX_QTY) return null

  const best: number[] = [0, ...Array(qty).fill(Number.POSITIVE_INFINITY)]
  for (let q = 1; q <= qty; q++) {
    for (const tier of p.tiers) {
      if (tier.qty <= q) {
        best[q] = Math.min(best[q], tier.price + best[q - tier.qty])
      }
    }
  }
  return Number.isFinite(best[qty]) ? best[qty] : null
}

/** وصف الكمية: «عبوة» أو «3 عبوات» حسب جدول العروض */
/** جمع وحدة القياس المستخدمة في جدول العروض */
const UNIT_PLURALS: Record<string, string> = {
  عبوة: 'عبوات',
  قطعة: 'قطع',
  صابونة: 'صابونات',
}

export function quantityLabel(slug: string, qty: number) {
  const p = pricing[slug]
  const exact = p?.tiers.find((t) => t.qty === qty)
  if (exact) return exact.label
  const unit = p?.tiers[0]?.label ?? 'عبوة'
  return `${qty} ${UNIT_PLURALS[unit] ?? 'عبوات'}`
}

export type OrderItem = { color: string; qty: number }

/** «أحمر ×2 · أزرق ×1» */
export function describeItems(items: OrderItem[]) {
  return items
    .filter((i) => i.qty > 0)
    .map((i) => (i.color ? `${i.color} ×${i.qty}` : `×${i.qty}`))
    .join(' · ')
}

/** يُستخدم في السيرفر للتحقق من السعر المرسل من المتصفح */
export function resolveOption(slug: string, optionId: string) {
  const p = pricing[slug]
  if (!p) return null
  if (optionId === 'bundle' && p.bundle) {
    return { label: p.bundle.label, price: p.bundle.price, qty: p.bundle.qty }
  }
  const tier = p.tiers.find((t) => `tier-${t.qty}` === optionId)
  return tier ? { label: tier.label, price: tier.price, qty: tier.qty } : null
}

export const GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'القليوبية',
  'الدقهلية',
  'الشرقية',
  'الغربية',
  'المنوفية',
  'البحيرة',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'شمال سيناء',
  'جنوب سيناء',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
]
