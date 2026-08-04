import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { PageTransition } from '@/components/page-transition'
import { JsonLd } from '@/components/json-ld'
import { FACEBOOK_URL, SITE, WHATSAPP_DISPLAY } from '@/lib/site'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.nameEn} - منتجات تجميل فاخرة`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'سيلفي كوزمتكس',
    'اسبراي تلوين الشعر',
    'اسبراي شعر مؤقت',
    'كريم تلوين الشعر',
    'صبغة شعر دائمة',
    'صبغة بزيت الأرجان',
    'اسبراي تفتيح البشرة',
    'منتجات عناية بالشعر',
    'Silvy Cosmetics',
  ],
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} | منتجات تجميل فاخرة`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | منتجات تجميل فاخرة`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#e0378c',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: SITE.url,
  logo: `${SITE.url}/images/logo.png`,
  description: SITE.description,
  sameAs: [FACEBOOK_URL],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: `+2${WHATSAPP_DISPLAY}`,
      contactType: 'customer service',
      availableLanguage: ['Arabic'],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} bg-background`}>
      <body className="antialiased font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:right-3 focus:z-[60] focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:shadow-lg"
        >
          تخطي إلى المحتوى
        </a>
        <Navbar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
        <JsonLd data={organizationSchema} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
