import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = ['', '/products', '/about', '/faq', '/contact'].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productRoutes = products.map((product) => ({
    url: `${SITE.url}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...productRoutes]
}
