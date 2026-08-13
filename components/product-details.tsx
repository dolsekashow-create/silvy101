import {
  Sparkles,
  Droplets,
  Palette,
  Users,
  Zap,
  Timer,
  PartyPopper,
  Package,
  ShieldCheck,
  Umbrella,
  Wind,
  Feather,
  Layers,
  Leaf,
  Sun,
  Baby,
  TriangleAlert,
  ListOrdered,
  CircleCheckBig,
  type LucideIcon,
} from 'lucide-react'

/** يختار أيقونة مناسبة لكل ميزة حسب كلماتها المفتاحية */
const iconRules: { match: string[]; icon: LucideIcon }[] = [
  { match: ['شامبو', 'يغسل', 'الغسل', 'يزول', 'يُزال', 'يزال'], icon: Droplets },
  { match: ['المطر', 'الماء والمطر', 'مقاوم'], icon: Umbrella },
  { match: ['يجف', 'سريع'], icon: Wind },
  { match: ['دهني', 'ملمس', 'نعومة', 'حريري'], icon: Feather },
  { match: ['حفلات', 'مناسبات', 'التصوير'], icon: PartyPopper },
  { match: ['حجم العبوة', 'جم', 'مل'], icon: Package },
  { match: ['آمن', 'لا يضر', 'الأمونيا', 'أمان'], icon: ShieldCheck },
  { match: ['الأطفال'], icon: Baby },
  { match: ['الرجال والنساء', 'جميع أنواع', 'لجميع', 'مناسب للاستخدام المنزلي'], icon: Users },
  { match: ['خصل', 'كامل الشعر', 'تغطية'], icon: Layers },
  { match: ['أرجان', 'بروتين', 'هيالورونيك', 'مكونات', 'تغذية'], icon: Leaf },
  { match: ['بشرة', 'إشراق', 'تفتيح', 'لمعان', 'حيوية'], icon: Sun },
  { match: ['ترطيب', 'يرطب', 'امتصاص'], icon: Droplets },
  { match: ['سهل', 'سهولة', 'سريع التطبيق'], icon: Zap },
  { match: ['لون', 'ألوان'], icon: Palette },
  { match: ['دقائق', 'يدوم', 'ثابت'], icon: Timer },
]

function iconFor(text: string): LucideIcon {
  const rule = iconRules.find((r) => r.match.some((m) => text.includes(m)))
  return rule?.icon ?? Sparkles
}

export function FeaturesGrid({ features }: { features: string[] }) {
  return (
    <section aria-labelledby="features-heading">
      <h2
        id="features-heading"
        className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-balance"
      >
        <CircleCheckBig className="h-6 w-6 text-primary" aria-hidden="true" />
        مميزات المنتج
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = iconFor(feature)
          return (
            <li
              key={feature}
              className="group flex items-start gap-3 rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="pt-1.5 text-sm leading-relaxed font-semibold text-foreground/85 text-pretty">
                {feature}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function UsageStepper({ steps }: { steps: string[] }) {
  return (
    <section aria-labelledby="usage-heading">
      <h2
        id="usage-heading"
        className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-balance"
      >
        <ListOrdered className="h-6 w-6 text-secondary" aria-hidden="true" />
        طريقة الاستخدام
      </h2>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
        <ol className="relative flex flex-col gap-7 border-e-2 border-dashed border-accent pe-7">
          {steps.map((step, i) => (
            <li key={step} className="relative">
              <span
                className="absolute -end-[2.35rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold text-primary-foreground shadow-md ring-4 ring-card"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="pt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function WarningsCard({ warnings }: { warnings: string[] }) {
  return (
    <section aria-labelledby="warnings-heading">
      <h2
        id="warnings-heading"
        className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-balance"
      >
        <TriangleAlert className="h-6 w-6 text-[#b26a00]" aria-hidden="true" />
        تحذيرات واحتياطات
      </h2>
      <div className="rounded-3xl border border-[#e9c46a]/50 bg-[#fdf6e6] p-6 shadow-sm md:p-8">
        <ul className="grid gap-4 sm:grid-cols-2">
          {warnings.map((warning) => (
            <li key={warning} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f3e0b0] text-[#b26a00]">
                <TriangleAlert className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="pt-1 text-sm leading-relaxed text-[#6b4b14] text-pretty">{warning}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
