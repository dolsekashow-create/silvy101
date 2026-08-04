import type { Metadata } from 'next'
import { MessageCircle, Facebook, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FACEBOOK_URL, WHATSAPP_URL } from '@/lib/products'

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'تواصلي مع فريق سيلفي كوزمتكس عبر واتساب أو فيسبوك للطلب أو الاستفسار.',
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
          <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1da851]">
              <MessageCircle className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-extrabold">واتساب</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              الطريقة الأسرع للطلب والاستفسار، فريقنا يرد عليك فوراً.
            </p>
            <p className="text-lg font-bold" dir="ltr">
              01283658904
            </p>
            <Button asChild className="mt-auto rounded-full bg-[#25D366] px-8 text-white hover:bg-[#1da851]">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                ابدئي المحادثة
              </a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
              <Facebook className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-extrabold">فيسبوك</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              تابعي جديدنا وعروضنا الحصرية على صفحتنا الرسمية على فيسبوك.
            </p>
            <Button asChild variant="outline" className="mt-auto rounded-full px-8 bg-transparent">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                زوري صفحتنا
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.15}>
        <div className="mt-8 flex items-center justify-center gap-3 rounded-3xl bg-accent/60 p-6 text-center">
          <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm font-semibold text-muted-foreground">
            متاحون للرد على استفساراتك يومياً على مدار الساعة.
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}
