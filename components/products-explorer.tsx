'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/product-types'

const ALL = 'الكل'

export function ProductsExplorer({ products }: { products: Product[] }) {
  const categories = [ALL, ...Array.from(new Set(products.map((p) => p.category)))]
  const [active, setActive] = useState(ALL)

  const visible = active === ALL ? products : products.filter((p) => p.category === active)

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                'rounded-full border px-5 py-2 text-sm font-bold transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                isActive
                  ? 'border-transparent bg-gradient-brand text-primary-foreground shadow-md'
                  : 'border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary',
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
