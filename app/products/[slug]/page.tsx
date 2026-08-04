import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CircleCheckBig, TriangleAlert, ListOrdered, ChevronLeft } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
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

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <ScrollReveal>
          <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold">
              <CircleCheckBig className="h-6 w-6 text-primary" aria-hidden="true" />
              المميزات
            </h2>
            <ul className="flex flex-col gap-3">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-brand"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-8">
          {product.usage && (
            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
                <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold">
                  <ListOrdered className="h-6 w-6 text-secondary" aria-hidden="true" />
                  طريقة الاستخدام
                </h2>
                <ol className="flex flex-col gap-3">
                  {product.usage.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          )}

          {product.warnings && (
            <ScrollReveal delay={0.15}>
              <div className="rounded-3xl border border-destructive/25 bg-destructive/5 p-7">
                <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-destructive">
                  <TriangleAlert className="h-6 w-6" aria-hidden="true" />
                  تحذيرات
                </h2>
                <ul className="flex flex-col gap-3">
                  {product.warnings.map((warning) => (
                    <li
                      key={warning}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive"
                        aria-hidden="true"
                      />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}
        </div>
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
