import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: {
    default: 'سيلفي كوزمتكس | Silvy Cosmetics - منتجات تجميل فاخرة',
    template: '%s | سيلفي كوزمتكس',
  },
  description:
    'سيلفي كوزمتكس - علامة تجارية فاخرة لمنتجات العناية بالشعر والبشرة. اسبراي تلوين الشعر المؤقت، كريم تلوين الشعر، صبغة الشعر الدائمة، واسبراي تفتيح البشرة.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/images/logo.png', type: 'image/png' }],
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#e0378c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} bg-background`}>
      <body className="antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
