import { Skeleton } from '@/components/ui/skeleton'
import { ProductGridSkeleton } from '@/components/product-card-skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="mb-14 grid items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-40 rounded-full" />
            <Skeleton className="h-11 w-40 rounded-full" />
          </div>
        </div>
        <Skeleton className="mx-auto aspect-square w-full max-w-md rounded-full" />
      </div>
      <ProductGridSkeleton />
    </div>
  )
}
