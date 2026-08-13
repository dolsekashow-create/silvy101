import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { Product } from '@/lib/product-types'
import { startingPrice } from '@/lib/pricing'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 rounded-full glass border border-border px-3 py-1 text-xs font-bold text-primary">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold text-secondary">{product.category}</span>
        <h3 className="text-lg font-bold text-card-foreground text-balance">{product.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-lg font-extrabold text-gradient">
            {startingPrice(product.slug)} جنيه
          </span>
          <span className="text-xs font-semibold text-muted-foreground">يبدأ من</span>
        </div>
        <span className="flex items-center gap-1 text-sm font-bold text-primary">
          عرض التفاصيل
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
