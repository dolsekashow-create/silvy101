import { WhatsAppIcon } from '@/components/icons'
import { WHATSAPP_URL } from '@/lib/site'

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصلي معنا عبر واتساب"
      className="group fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl shadow-black/15 transition-all hover:scale-105 hover:bg-[#1da851] focus-visible:ring-3 focus-visible:ring-[#25D366]/40 focus-visible:outline-none md:p-4"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      <WhatsAppIcon className="size-6 md:size-7" />
      <span className="max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap transition-all duration-300 group-hover:max-w-32 group-hover:pl-1">
        تواصلي معنا
      </span>
    </a>
  )
}
