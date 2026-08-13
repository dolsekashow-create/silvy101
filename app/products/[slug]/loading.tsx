import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="flex gap-3">
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <Skeleton className="h-20 w-20 rounded-2xl" />
            <Skeleton className="h-20 w-20 rounded-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-9 w-56 rounded-full" />
          <Skeleton className="h-12 w-52 rounded-full" />
        </div>
      </div>
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-72 w-full rounded-3xl" />
        <Skeleton className="h-72 w-full rounded-3xl" />
      </div>
    </div>
  )
}
