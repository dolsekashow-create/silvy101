import Link from 'next/link'
import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import {
  WhySilvy,
  FeaturedProducts,
  Categories,
  AboutBrand,
  Benefits,
  ContactCta,
} from '@/components/home/sections'
import { FaqAccordion, faqs } from '@/components/faq-accordion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { JsonLd } from '@/components/json-ld'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site'
import { getProduct } from '@/lib/products'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'ar',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function HomePage() {
  return (
    <>
      <Hero sprayColors={getProduct('hair-color-spray')?.colors ?? []} />
      <WhySilvy />
      <FeaturedProducts />
      <Categories />
      <AboutBrand />
      <Benefits />
      <section className="bg-accent/40 py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <ScrollReveal>
            <h2 className="mb-8 text-center text-3xl font-extrabold text-balance">الأسئلة الشائعة</h2>
            <FaqAccordion limit={4} />
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="rounded-full bg-transparent px-8">
                <Link href="/faq">جميع الأسئلة الشائعة</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <div className="pt-16">
        <ContactCta />
      </div>
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
    </>
  )
}
