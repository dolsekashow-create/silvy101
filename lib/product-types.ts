export type ProductColor = {
  name: string
  hex: string
}

export type Product = {
  slug: string
  name: string
  shortName: string
  /** اسم الفئة كما يظهر في الموقع */
  category: string
  /** العلامة المطبوعة على العبوة */
  brand: string
  /** حجم العبوة كما هو مكتوب عليها */
  size: string
  /** الصورة الرئيسية — أول صورة في مجلد القسم */
  image: string
  /** معرض الصور — يُقرأ تلقائياً من public/images/<slug>/ */
  images: string[]
  shortDescription: string
  description: string
  /** ٣ نقاط سريعة تظهر أسفل الوصف في صفحة المنتج */
  highlights: string[]
  features: string[]
  usage?: string[]
  warnings?: string[]
  colors?: ProductColor[]
  badge?: string
}

/** بيانات المنتج بدون صور — الصور تُضاف تلقائياً في lib/products.ts */
export type ProductMeta = Omit<Product, 'image' | 'images'>
