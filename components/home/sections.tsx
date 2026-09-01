import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  Droplets,
  WandSparkles,
  HeartHandshake,
  Palette,
  SprayCan,
  Paintbrush,
  Sun,
  Clock,
  Leaf,
  Smile,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'
import { WHATSAPP_URL } from '@/lib/site'

const whyItems = [
  {
    icon: ShieldCheck,
    title: 'أمان تام',
    text: 'تركيبات آمنة على الشعر وفروة الرأس والبشرة، خالية من الأمونيا في الصبغات.',
  },
  {
    icon: WandSparkles,
    title: 'جودة فاخرة',
    text: 'مكونات مميزة مثل زيت الأرجان والبروتين وحمض الهيالورونيك لنتائج مبهرة.',
  },
  {
    icon: Droplets,
    title: 'سهولة الاستخدام',
    text: 'منتجات عملية للاستخدام المنزلي بخطوات بسيطة ونتائج فورية.',
  },
  {
    icon: HeartHandshake,
    title: 'مناسبة للجميع',
    text: 'منتجات تناسب الرجال والنساء والأطفال ولجميع أنواع البشرة والشعر.',
  },
]

const categoryItems = [
  { icon: SprayCan, title: 'اسبراي تلوين الشعر المؤقت', slug: 'hair-color-spray' },
  { icon: Paintbrush, title: 'كريم تلوين الشعر المؤقت', slug: 'hair-color-cream' },
  { icon: Palette, title: 'صبغة الشعر الدائمة', slug: 'permanent-hair-dye' },
  { icon: Sun, title: 'اسبراي تفتيح البشرة', slug: 'skin-whitening-spray' },
]

const benefits = [
  { icon: Clock, title: 'نتائج سريعة', text: 'ألوان فورية وتفتيح ملحوظ من أول استخدام.' },
  { icon: Leaf, title: 'مكونات مغذية', text: 'زيت الأرجان والبروتين وحمض الهيالورونيك.' },
  { icon: ShieldCheck, title: 'آمنة للاستخدام اليومي', text: 'تركيبات لطيفة لا تضر الشعر أو البشرة.' },
  { icon: Smile, title: 'ثقة عملائنا', text: 'آلاف العميلات السعيدات بنتائج منتجاتنا.' },
]

export function WhySilvy() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <ScrollReveal>
        <h2 className="mb-3 text-center text-3xl font-extrabold text-balance">
          لماذا <span className="text-gradient">سيلفي كوزمتكس</span>؟
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          نجمع بين الجودة الفاخرة والأمان التام لنمنحك تجربة جمال استثنائية.
        </p>
      </ScrollReveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyItems.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1}>
            <div className="flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export function FeaturedProducts() {
  return (
    <section className="bg-accent/40 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal>
          <h2 className="mb-3 text-center text-3xl font-extrabold text-balance">منتجاتنا المميزة</h2>
          <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
            اكتشفي تشكيلة سيلفي الفاخرة للعناية بالشعر والبشرة.
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
    </section>
  )
}

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <ScrollReveal>
        <h2 className="mb-10 text-center text-3xl font-extrabold text-balance">فئات المنتجات</h2>
      </ScrollReveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categoryItems.map((cat, i) => (
          <ScrollReveal key={cat.slug} delay={i * 0.1}>
            <Link
              href={`/products/${cat.slug}`}
              className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground transition-transform group-hover:scale-110">
                <cat.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="text-base font-bold text-balance">{cat.title}</h3>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export function AboutBrand() {
  return (
    <section className="bg-accent/40 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
        <ScrollReveal className="order-2 md:order-1">
          <div className="flex flex-col items-start gap-5">
            <h2 className="text-3xl font-extrabold text-balance">
              عن <span className="text-gradient">سيلفي كوزمتكس</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              وُلدت سيلفي كوزمتكس من شغف حقيقي بالجمال، لنقدم لك منتجات عناية
              بالشعر والبشرة بمعايير عالمية وجودة فاخرة. نؤمن بأن كل امرأة تستحق
              أن تشعر بالثقة والتألق كل يوم، لذلك نطور تركيبات آمنة وفعالة تجمع
              بين أحدث الابتكارات وأجود المكونات الطبيعية.
            </p>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              من ألوان الشعر الجريئة المؤقتة إلى الصبغات الدائمة الغنية بزيت
              الأرجان، ومن العناية بالبشرة إلى إشراقتها اليومية — سيلفي هي
              وجهتك الأولى للجمال.
            </p>
            <Button asChild className="rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90">
              <Link href="/about">اعرفي المزيد عنا</Link>
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal className="order-1 md:order-2" delay={0.15}>
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/permanent-hair-dye/01.webp"
              alt="مجموعة صبغات دينا داي بزيت الأرجان من سيلفي كوزمتكس"
              width={640}
              height={430}
              className="h-auto w-full object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <ScrollReveal>
        <h2 className="mb-10 text-center text-3xl font-extrabold text-balance">ماذا تكسبين مع سيلفي؟</h2>
      </ScrollReveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1}>
            <div className="flex h-full flex-col items-center gap-3 rounded-3xl border border-border glass p-6 text-center shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 text-center md:p-14">
          <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground text-balance">
            جاهزة لتجربة الفرق؟
          </h2>
          <p className="mx-auto mb-8 max-w-lg leading-relaxed text-primary-foreground/90 text-pretty">
            اطلبي منتجاتك المفضلة من صفحة المنتج مباشرة، أو تواصلي معنا عبر واتساب لأي استفسار.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full bg-card px-8 text-foreground hover:bg-card/90">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                تواصلي عبر واتساب
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/50 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/contact">صفحة التواصل</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
