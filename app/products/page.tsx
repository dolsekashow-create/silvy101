import type { Metadata } from 'next'
import { ProductsExplorer } from '@/components/products-explorer'
import { ScrollReveal } from '@/components/scroll-reveal'
import { JsonLd } from '@/components/json-ld'
import { products } from '@/lib/products'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'جميع المنتجات',
  description:
    'تسوقي جميع منتجات سيلفي كوزمتكس: اسبراي تلوين الشعر المؤقت، كريم تلوين الشعر، صبغة الشعر الدائمة، واسبراي تفتيح البشرة.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'جميع المنتجات | سيلفي كوزمتكس',
    description: 'تشكيلة سيلفي كوزمتكس الفاخرة للعناية بالشعر والبشرة.',
    url: `${SITE.url}/products`,
    images: [SITE.ogImage],
  },
}

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'منتجات سيلفي كوزمتكس',
  itemListElement: products.map((product, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: product.name,
    url: `${SITE.url}/products/${product.slug}`,
  })),
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">
          جميع <span className="text-gradient">المنتجات</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          تشكيلة سيلفي كوزمتكس الفاخرة للعناية بالشعر والبشرة، بجودة عالمية وأمان تام.
        </p>
      </ScrollReveal>
      <ProductsExplorer products={products} />
      <JsonLd data={listSchema} />
    </div>
  )
}
