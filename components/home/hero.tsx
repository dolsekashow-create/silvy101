'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/lib/products'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent/50">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-[0.06]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-start gap-6"
        >
          <span className="flex items-center gap-2 rounded-full glass border border-border px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            جمالك يبدأ من هنا
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-balance md:text-5xl">
            <span className="text-gradient">سيلفي كوزمتكس</span>
            <br />
            لمسة فخامة لشعرك وبشرتك
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            منتجات عناية فاخرة بجودة عالمية: ألوان شعر مؤقتة ودائمة آمنة تماماً،
            وعناية بالبشرة تمنحك إشراقاً يدوم. اكتشفي الفرق مع سيلفي.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90"
            >
              <Link href="/products">تسوقي المنتجات</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
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
          <Image
            src="/images/logo.png"
            alt="شعار سيلفي كوزمتكس"
            width={520}
            height={520}
            className="h-auto w-full object-contain drop-shadow-xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
