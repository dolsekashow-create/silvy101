export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // البيانات ثابتة ومولّدة من الخادم
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
