import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { FacebookIcon, WhatsAppIcon } from '@/components/icons'
import { products } from '@/lib/products'
import { FACEBOOK_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/site'

const pageLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'جميع المنتجات' },
  { href: '/about', label: 'من نحن' },
  { href: '/faq', label: 'الأسئلة الشائعة' },
  { href: '/contact', label: 'تواصل معنا' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="flex flex-col items-start gap-3 md:col-span-1">
          <Image
            src="/images/logo.png"
            alt="شعار سيلفي كوزمتكس"
            width={110}
            height={110}
            className="h-24 w-24 object-contain"
          />
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            سيلفي كوزمتكس علامة تجارية فاخرة متخصصة في منتجات العناية بالشعر
            والبشرة، نقدم جودة عالية وأماناً تاماً لجمالك اليومي.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب سيلفي كوزمتكس"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-[#1da851] shadow-sm transition-transform hover:scale-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="صفحة سيلفي كوزمتكس على فيسبوك"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-[#1877F2] shadow-sm transition-transform hover:scale-110"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label="روابط الصفحات">
          <h3 className="mb-4 text-base font-bold text-foreground">روابط سريعة</h3>
          <ul className="flex flex-col gap-2">
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="روابط المنتجات">
          <h3 className="mb-4 text-base font-bold text-foreground">منتجاتنا</h3>
          <ul className="flex flex-col gap-2">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-base font-bold text-foreground">تواصلي معنا</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{WHATSAPP_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <FacebookIcon className="h-4 w-4" />
                صفحتنا على فيسبوك
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground">
          {'© '}
          {new Date().getFullYear()}
          {' سيلفي كوزمتكس — جميع الحقوق محفوظة'}
        </p>
      </div>
    </footer>
  )
}
