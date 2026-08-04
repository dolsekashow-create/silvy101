import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Gem, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'من نحن',
  description:
    'تعرفي على قصة سيلفي كوزمتكس، العلامة التجارية الفاخرة المتخصصة في منتجات العناية بالشعر والبشرة.',
}

const values = [
  {
    icon: Gem,
    title: 'الجودة أولاً',
    text: 'نختار أجود المكونات مثل زيت الأرجان والبروتين وحمض الهيالورونيك في كل منتج.',
  },
  {
    icon: ShieldCheck,
    title: 'الأمان التام',
    text: 'تركيبات لطيفة وآمنة على الشعر والبشرة، خالية من الأمونيا في صبغاتنا.',
  },
  {
    icon: Sparkles,
    title: 'الابتكار المستمر',
    text: 'نطور منتجاتنا باستمرار لنواكب أحدث صيحات الجمال العالمية.',
  },
  {
    icon: HeartHandshake,
    title: 'رضا عملائنا',
    text: 'ثقتك هي أغلى ما نملك، ونسعى دائماً لتجربة تسوق وخدمة استثنائية.',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-5 text-center">
          <Image
            src="/images/logo.png"
            alt="شعار سيلفي كوزمتكس"
            width={180}
            height={180}
            className="h-36 w-36 object-contain"
            priority
          />
          <h1 className="text-4xl font-extrabold text-balance">
            قصة <span className="text-gradient">سيلفي كوزمتكس</span>
          </h1>
          <p className="leading-relaxed text-muted-foreground text-pretty">
            وُلدت سيلفي كوزمتكس من شغف حقيقي بالجمال والتميز، لنكون وجهتك الأولى
            لمنتجات العناية بالشعر والبشرة الفاخرة. نؤمن بأن الجمال حق للجميع،
            لذلك نقدم منتجات بجودة عالمية وأسعار مناسبة، مصممة بعناية لتناسب
            احتياجاتك اليومية وتمنحك ثقة وتألقاً في كل لحظة.
          </p>
        </div>
      </ScrollReveal>

      <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => (
          <ScrollReveal key={value.title} delay={i * 0.1}>
            <div className="flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
                <value.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold">{value.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{value.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="grid items-center gap-10 rounded-3xl bg-accent/50 p-8 md:grid-cols-2 md:p-12">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-extrabold text-balance">رؤيتنا</h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              أن نصبح العلامة التجارية الأولى في عالم العناية بالشعر والبشرة في
              المنطقة، من خلال تقديم منتجات مبتكرة وآمنة تلبي تطلعات كل امرأة
              ورجل وطفل، وتجمع بين الفخامة العالمية واللمسة العربية الأصيلة.
            </p>
            <Button asChild className="rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90">
              <Link href="/products">اكتشفي منتجاتنا</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/hair-spray.jpg"
              alt="اسبراي تلوين الشعر المؤقت من سيلفي كوزمتكس بسبعة ألوان"
              width={640}
              height={512}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
