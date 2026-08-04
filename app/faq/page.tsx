import type { Metadata } from 'next'
import { FaqAccordion } from '@/components/faq-accordion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/lib/products'

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة',
  description: 'إجابات على أكثر الأسئلة شيوعاً حول منتجات سيلفي كوزمتكس وطرق استخدامها.',
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">
          الأسئلة <span className="text-gradient">الشائعة</span>
        </h1>
        <p className="mx-auto mb-12 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          جمعنا لك إجابات أكثر الأسئلة شيوعاً حول منتجاتنا وطرق استخدامها.
        </p>
        <FaqAccordion />
        <div className="mt-12 rounded-3xl bg-accent/60 p-8 text-center">
          <h2 className="mb-3 text-xl font-extrabold text-balance">لم تجدي إجابة سؤالك؟</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
            فريقنا جاهز للإجابة على جميع استفساراتك عبر واتساب.
          </p>
          <Button asChild className="rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              تواصلي معنا الآن
            </a>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  )
}
