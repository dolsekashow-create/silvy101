'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhatsAppIcon } from '@/components/icons'
import { whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/products'

/** اختيار اللون + زر الطلب عبر واتساب برسالة جاهزة تتضمن اللون المختار */
export function ProductOrder({ product }: { product: Product }) {
  const colors = product.colors ?? []
  const [selected, setSelected] = useState<string | null>(colors.length === 1 ? colors[0].name : null)

  const message = selected
    ? `مرحباً، أرغب في طلب: ${product.name} - اللون ${selected}`
    : `مرحباً، أرغب في طلب: ${product.name}`

  return (
    <div className="flex w-full flex-col gap-6">
      {colors.length > 0 && (
        <div>
          <div className="mb-3 flex items-baseline gap-2">
            <h2 className="text-lg font-bold">الألوان المتوفرة</h2>
            <span className="text-sm text-muted-foreground">
              {selected ? selected : `${colors.length} ألوان`}
            </span>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {colors.map((color) => {
              const isActive = selected === color.name
              return (
                <li key={color.name}>
                  <button
                    type="button"
                    onClick={() => setSelected(isActive ? null : color.name)}
                    aria-pressed={isActive}
                    className={cn(
                      'flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                      isActive
                        ? 'border-primary shadow-md'
                        : 'border-border hover:border-primary/40 hover:shadow-sm',
                    )}
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    >
                      {isActive && <Check className="h-3 w-3 text-white drop-shadow" />}
                    </span>
                    <span className="text-sm font-semibold">{color.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
        <Button
          asChild
          size="lg"
          className="h-12 w-full rounded-full bg-gradient-brand px-10 text-base text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 sm:w-auto"
        >
          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5" />
            اطلبي عبر واتساب
          </a>
        </Button>
      </motion.div>
      <p className="-mt-3 text-sm text-muted-foreground">
        الطلب والاستفسار عبر واتساب مباشرة، والرد فوري.
      </p>
    </div>
  )
}
