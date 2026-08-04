'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhatsAppIcon } from '@/components/icons'
import { products } from '@/lib/products'
import { WHATSAPP_URL } from '@/lib/site'

const sprayColors = products[0].colors ?? []

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent/50">
      {/* خلفية الهيرو */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-background/65 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-[0.05]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-start gap-6"
        >
          <span className="glass flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            جمالك يبدأ من هنا
          </span>

          <h1 className="text-4xl leading-tight font-extrabold text-balance md:text-5xl">
            <span className="text-gradient">سيلفي كوزمتكس</span>
            <br />
            لمسة فخامة لشعرك وبشرتك
          </h1>

          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            منتجات عناية فاخرة بجودة عالمية: ألوان شعر مؤقتة ودائمة آمنة تماماً،
            وعناية بالبشرة تمنحك إشراقاً يدوم. اكتشفي الفرق مع سيلفي.
          </p>

          {/* شريط الألوان السبعة — توقيع العلامة البصري */}
          <div className="flex items-center gap-3">
            <ul className="flex items-center -space-x-2 space-x-reverse">
              {sprayColors.map((color, i) => (
                <motion.li
                  key={color.name}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 260, damping: 18 }}
                  className="h-7 w-7 rounded-full border-2 border-background shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </ul>
            <span className="text-sm font-semibold text-muted-foreground">٧ ألوان للشعر</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gradient-brand px-8 text-base text-primary-foreground shadow-glow hover:opacity-90"
            >
              <Link href="/products">تسوقي المنتجات</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-transparent px-8 text-base">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                اطلبي عبر واتساب
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            className="absolute inset-0 -z-10 rounded-full bg-gradient-brand opacity-20 blur-3xl"
            aria-hidden="true"
          />
          <div className="overflow-hidden rounded-[2.5rem] border border-white/60 shadow-2xl">
            <Image
              src="/images/hair-spray.jpg"
              alt="اسبراي تلوين الشعر المؤقت من سيلفي كوزمتكس بسبعة ألوان"
              width={800}
              height={640}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="glass absolute -bottom-6 right-4 flex items-center gap-2 rounded-2xl border border-border p-2 shadow-lg animate-float md:right-auto md:-left-6">
            <Image
              src="/images/logo.png"
              alt="شعار سيلفي كوزمتكس"
              width={64}
              height={64}
              className="h-12 w-12 object-contain"
            />
            <div className="pl-2">
              <p className="text-xs font-bold">صناعة مصرية</p>
              <p className="text-[11px] text-muted-foreground">جودة عالمية</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
