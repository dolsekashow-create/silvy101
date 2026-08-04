'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const src = images[active] ?? images[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <ul className="flex flex-wrap gap-3">
          {images.map((image, i) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`عرض الصورة ${i + 1} من ${images.length}`}
                aria-current={i === active}
                className={cn(
                  'relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  i === active
                    ? 'border-primary shadow-md'
                    : 'border-border opacity-70 hover:opacity-100',
                )}
              >
                <Image src={image} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
