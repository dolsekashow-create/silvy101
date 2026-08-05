import { Skeleton } from '@/components/ui/skeleton'
import { ProductGridSkeleton } from '@/components/product-card-skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="mb-12 flex flex-col items-center gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-80" />
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
      <ProductGridSkeleton />
    </div>
  )
}
