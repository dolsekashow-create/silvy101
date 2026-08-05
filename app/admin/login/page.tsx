import type { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'دخول لوحة التحكم',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-6 px-4 py-24">
      <Image
        src="/images/logo.png"
        alt="سيلفي كوزمتكس"
        width={120}
        height={120}
        className="h-20 w-20 object-contain"
      />
      <h1 className="text-2xl font-extrabold">لوحة الطلبات</h1>
      <form
        action="/api/admin/login"
        method="post"
        className="flex w-full flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-bold">
            كلمة المرور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="h-11 rounded-2xl border border-border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
        {error && (
          <p role="alert" className="rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">
            كلمة المرور غير صحيحة.
          </p>
        )}
        <Button
          type="submit"
          className="h-11 rounded-full bg-gradient-brand text-primary-foreground hover:opacity-90"
        >
          دخول
        </Button>
      </form>
    </div>
  )
}
