import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center md:px-6">
      <Image
        src="/images/logo.png"
        alt="شعار سيلفي كوزمتكس"
        width={140}
        height={140}
        className="h-28 w-28 object-contain opacity-90"
      />
      <p className="text-6xl font-extrabold text-gradient">٤٠٤</p>
      <h1 className="text-2xl font-extrabold text-balance">هذه الصفحة غير موجودة</h1>
      <p className="leading-relaxed text-muted-foreground text-pretty">
        ربما تم تغيير الرابط أو حذف الصفحة. يمكنك العودة للرئيسية أو تصفح جميع المنتجات.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90">
          <Link href="/">العودة للرئيسية</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full bg-transparent px-8">
          <Link href="/products">تصفح المنتجات</Link>
        </Button>
      </div>
    </div>
  )
}
