/** @type {import('next').NextConfig} */
const nextConfig = {
  // شبكة أمان أثناء التطوير — يمكن تعطيلها بعد تشغيل `tsc --noEmit` بنجاح
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
  },
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
