import type { Metadata } from 'next'
import { Clock, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FacebookIcon, WhatsAppIcon } from '@/components/icons'
import { FACEBOOK_URL, SITE, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'تواصلي مع فريق سيلفي كوزمتكس عبر واتساب أو فيسبوك لأي استفسار عن المنتجات.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'تواصل معنا | سيلفي كوزمتكس',
    description: 'تواصلي مع فريق سيلفي كوزمتكس عبر واتساب أو فيسبوك للطلب أو الاستفسار.',
    url: `${SITE.url}/contact`,
    images: [SITE.ogImage],
  },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">
          تواصلي <span className="text-gradient">معنا</span>
        </h1>
        <p className="mx-auto mb-12 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          يسعدنا تواصلك معنا في أي وقت للطلب أو الاستفسار عن منتجاتنا.
        </p>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2">
        <ScrollReveal>
          <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1da851]">
              <WhatsAppIcon className="h-7 w-7" />
            </span>
            <h2 className="text-xl font-extrabold">واتساب</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              لأي استفسار عن المنتجات أو متابعة طلبك، فريقنا يرد عليك فوراً.
            </p>
            <p className="text-lg font-bold" dir="ltr">
              {WHATSAPP_DISPLAY}
            </p>
            <Button asChild className="mt-auto rounded-full bg-[#25D366] px-8 text-white hover:bg-[#1da851]">
              <a
                href={whatsappLink('مرحباً، أرغب في الاستفسار عن منتجات سيلفي كوزمتكس')}
                target="_blank"
                rel="noopener noreferrer"
              >
                ابدئي المحادثة
              </a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1877F2]/15 text-[#1877F2]">
              <FacebookIcon className="h-7 w-7" />
            </span>
            <h2 className="text-xl font-extrabold">فيسبوك</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              تابعي جديدنا وعروضنا الحصرية على صفحتنا الرسمية على فيسبوك.
            </p>
            <Button asChild variant="outline" className="mt-auto rounded-full bg-transparent px-8">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                زوري صفحتنا
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ScrollReveal delay={0.15}>
          <div className="flex h-full items-center gap-3 rounded-3xl bg-accent/60 p-6">
            <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold text-muted-foreground">
              متاحون للرد على استفساراتك يومياً على مدار الساعة.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex h-full items-center gap-3 rounded-3xl bg-accent/60 p-6">
            <BadgeCheck className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
            <p className="text-sm font-semibold text-muted-foreground">
              منتجات سيلفي كوزمتكس صناعة مصرية 100%.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
