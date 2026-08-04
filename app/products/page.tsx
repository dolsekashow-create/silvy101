import type { Metadata } from 'next'
import { ProductCard } from '@/components/product-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'جميع المنتجات',
  description:
    'تسوقي جميع منتجات سيلفي كوزمتكس: اسبراي تلوين الشعر المؤقت، كريم تلوين الشعر، صبغة الشعر الدائمة، واسبراي تفتيح البشرة.',
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">
          جميع <span className="text-gradient">المنتجات</span>
        </h1>
        <p className="mx-auto mb-12 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          تشكيلة سيلفي كوزمتكس الفاخرة للعناية بالشعر والبشرة، بجودة عالمية وأمان تام.
        </p>
      </ScrollReveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <ScrollReveal key={product.slug} delay={i * 0.08}>
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
