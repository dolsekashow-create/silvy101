'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center md:px-6">
      <h1 className="text-2xl font-extrabold text-balance">حدث خطأ أثناء تحميل الصفحة</h1>
      <p className="leading-relaxed text-muted-foreground text-pretty">
        جربي إعادة المحاولة، وإذا استمرت المشكلة تواصلي معنا عبر واتساب.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={reset}
          className="rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90"
        >
          إعادة المحاولة
        </Button>
        <Button asChild variant="outline" className="rounded-full bg-transparent px-8">
          <Link href="/">العودة للرئيسية</Link>
        </Button>
      </div>
    </div>
  )
}
