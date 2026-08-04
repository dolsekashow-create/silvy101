import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle2, AlertTriangle, ListOrdered, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ProductCard } from '@/components/product-card'
import { getProduct, products, WHATSAPP_URL } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.shortDescription,
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

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)
  const whatsappMessage = encodeURIComponent(`مرحباً، أرغب في طلب: ${product.name}`)

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-lg">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              width={720}
              height={720}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col items-start gap-5">
            <span className="rounded-full bg-accent px-4 py-1 text-sm font-bold text-accent-foreground">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-balance md:text-4xl">{product.name}</h1>
            <p className="leading-relaxed text-muted-foreground text-pretty">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="w-full">
                <h2 className="mb-3 text-lg font-bold">الألوان المتوفرة</h2>
                <ul className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <li key={color.name} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                      <span
                        className="h-5 w-5 rounded-full border border-border"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-semibold">{color.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-brand px-10 text-primary-foreground hover:opacity-90"
            >
              <a
                href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                اطلبي عبر واتساب
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <ScrollReveal>
          <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold">
              <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
              المميزات
            </h2>
            <ul className="flex flex-col gap-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-brand" aria-hidden="true" />
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
                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
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
                  <AlertTriangle className="h-6 w-6" aria-hidden="true" />
                  تحذيرات
                </h2>
                <ul className="flex flex-col gap-3">
                  {product.warnings.map((warning) => (
                    <li key={warning} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
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
    </div>
  )
}
