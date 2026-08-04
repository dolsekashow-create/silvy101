'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/lib/site'

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'المنتجات' },
  { href: '/about', label: 'من نحن' },
  { href: '/faq', label: 'الأسئلة الشائعة' },
  { href: '/contact', label: 'تواصل معنا' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="سيلفي كوزمتكس - الرئيسية">
          <Image
            src="/images/logo.png"
            alt="شعار سيلفي كوزمتكس"
            width={64}
            height={64}
            className="h-14 w-14 object-contain md:h-16 md:w-16"
            priority
          />
          <span className="text-lg font-bold text-gradient hidden sm:inline">
            سيلفي كوزمتكس
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-semibold transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-foreground/80',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild className="rounded-full bg-gradient-brand text-primary-foreground hover:opacity-90">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              اطلبي الآن
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-border/60 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground',
                    pathname === link.href ? 'text-primary' : 'text-foreground/80',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full rounded-full bg-gradient-brand text-primary-foreground">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  اطلبي الآن
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
