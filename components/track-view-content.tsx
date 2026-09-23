'use client'

import { useEffect } from 'react'
import { track } from '@/lib/meta-pixel'

export function TrackViewContent({ slug, name, price }: { slug: string; name: string; price: number | null }) {
  useEffect(() => {
    track('ViewContent', {
      content_ids: [slug],
      content_name: name,
      content_type: 'product',
      currency: 'EGP',
      ...(price ? { value: price } : {}),
    })
  }, [slug, name, price])

  return null
}
