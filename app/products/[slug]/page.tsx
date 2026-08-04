import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FeaturesGrid, UsageStepper, WarningsCard } from '@/components/product-details'
import { ProductCard } from '@/components/product-card'
import { ProductGallery } from '@/components/product-gallery'
import { ProductOrder } from '@/components/product-order'
import { JsonLd } from '@/components/json-ld'
import { getProduct, getRelated, products } from '@/lib/products'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}

  const url = `${SITE.url}/products/${product.slug}`
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} | ${SITE.name}`,
      description: product.shortDescription,
      url,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getRelated(product.slug, 3)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    ...(product.colors ? { color: product.colors.map((c) => c.name) } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'المنتجات', item: `${SITE.url}/products` },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${SITE.url}/products/${product.slug}`,
      },
    ],
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <nav aria-label="مسار التنقل" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              الرئيسية
            </Link>
          </li>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <li>
            <Link href="/products" className="transition-colors hover:text-primary">
              المنتجات
            </Link>
          </li>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <li className="font-semibold text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ScrollReveal>
          <ProductGallery images={product.images} alt={product.name} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent px-4 py-1 text-sm font-bold text-accent-foreground">
                {product.category}
              </span>
              <span className="rounded-full border border-border px-4 py-1 text-sm font-semibold text-muted-foreground">
                {product.size}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-balance md:text-4xl">{product.name}</h1>
            <p className="leading-relaxed text-muted-foreground text-pretty">{product.description}</p>

            <ul className="flex flex-wrap gap-2">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-muted px-3.5 py-1.5 text-xs font-bold text-foreground/75"
                >
                  {item}
                </li>
              ))}
            </ul>

            <ProductOrder product={product} />
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16 flex flex-col gap-14">
        <ScrollReveal>
          <FeaturesGrid features={product.features} />
        </ScrollReveal>

        {product.usage && (
          <ScrollReveal>
            <UsageStepper steps={product.usage} />
          </ScrollReveal>
        )}

        {product.warnings && (
          <ScrollReveal>
            <WarningsCard warnings={product.warnings} />
          </ScrollReveal>
        )}
      </div>

      <section className="mt-20">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-2xl font-extrabold text-balance">منتجات مشابهة</h2>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
    </div>
  )
}
