import Link from 'next/link'
import { Hero } from '@/components/home/hero'
import {
  WhySilvy,
  FeaturedProducts,
  Categories,
  AboutBrand,
  Benefits,
  ContactCta,
} from '@/components/home/sections'
import { FaqAccordion } from '@/components/faq-accordion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <>
      <Hero />
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
              <Button asChild variant="outline" className="rounded-full px-8 bg-transparent">
                <Link href="/faq">جميع الأسئلة الشائعة</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <div className="pt-16">
        <ContactCta />
      </div>
    </>
  )
}
