import { readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { productMeta } from '@/lib/product-meta'
import type { Product, ProductColor } from '@/lib/product-types'

export type { Product, ProductColor }

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
/** تُستخدم عند عدم وجود صور للمنتج */
const PLACEHOLDER = '/images/logo.png'

function isImage(file: string) {
  return EXTENSIONS.has(path.extname(file).toLowerCase())
}

/** الرقم في آخر الاسم يحدد الترتيب: 01.jpg قبل 02.jpg */
function orderOf(file: string) {
  const match = path.basename(file, path.extname(file)).match(/(\d+)$/)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

/**
 * يقرأ صور كل منتج تلقائياً من: public/images/<slug>/
 * أي صورة تضعها داخل المجلد تظهر في المنتج، وأي صورة تحذفها تختفي —
 * بدون تعديل أي كود. الصورة الأولى (01) هي صورة الغلاف.
 */
function imagesFor(slug: string): string[] {
  const dir = path.join(IMAGES_DIR, slug)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter(isImage)
    .sort((a, b) => orderOf(a) - orderOf(b) || a.localeCompare(b, 'en'))
    .map((file) => `/images/${slug}/${file}`)
}

export const products: Product[] = productMeta.map((meta) => {
  const images = imagesFor(meta.slug)
  return { ...meta, images, image: images[0] ?? PLACEHOLDER }
})

export const categories = [
  { label: 'اسبراي تلوين الشعر المؤقت', slug: 'hair-color-spray' },
  { label: 'كريم تلوين الشعر المؤقت', slug: 'hair-color-cream' },
  { label: 'صبغة الشعر الدائمة', slug: 'permanent-hair-dye' },
  { label: 'اسبراي تفتيح البشرة', slug: 'skin-whitening-spray' },
  { label: 'صابونة GD لتبييض الجسم', slug: 'whitening-soap' },
  { label: 'صابونة الذهب K24', slug: 'gold-soap' },
]

/** الفئات المستخدمة في فلتر صفحة المنتجات */
export const productCategories = Array.from(new Set(products.map((p) => p.category)))

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getRelated(slug: string, limit = 3) {
  const current = getProduct(slug)
  if (!current) return products.slice(0, limit)
  const sameCategory = products.filter((p) => p.slug !== slug && p.category === current.category)
  const others = products.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}

export { WHATSAPP_NUMBER, WHATSAPP_URL, FACEBOOK_URL, whatsappLink } from '@/lib/site'
