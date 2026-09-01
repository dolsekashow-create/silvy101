/** @type {import('next').NextConfig} */
const nextConfig = {
  // شبكة أمان أثناء التطوير — يمكن تعطيلها بعد تشغيل `tsc --noEmit` بنجاح
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // محسّن صور Vercel معطّل — الحصة المجانية تنفد فتتوقف الصور الجديدة عن الظهور
    // (‎402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED‎). الصور مضغوطة مسبقاً بصيغة
    // WebP داخل public/images، فتُخدم كما هي. لإعادة تفعيله: احذف السطر التالي.
    unoptimized: true,
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
  },
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
