export type ProductColor = {
  name: string
  hex: string
}

export type Product = {
  slug: string
  name: string
  shortName: string
  /** اسم الفئة كما يظهر في الموقع */
  category: string
  /** العلامة المطبوعة على العبوة */
  brand: string
  /** حجم العبوة كما هو مكتوب عليها */
  size: string
  /** الصورة الرئيسية */
  image: string
  /** معرض الصور (الرئيسية أولاً) */
  images: string[]
  shortDescription: string
  description: string
  /** ٣ نقاط سريعة تظهر أسفل الوصف في صفحة المنتج */
  highlights: string[]
  features: string[]
  usage?: string[]
  warnings?: string[]
  colors?: ProductColor[]
  badge?: string
}

export const products: Product[] = [
  {
    slug: 'hair-color-spray',
    name: 'اسبراي تلوين الشعر المؤقت',
    shortName: 'اسبراي تلوين الشعر',
    category: 'تلوين مؤقت',
    brand: 'GD',
    size: '50 مل',
    image: '/images/hair-spray.jpg',
    images: [
      '/images/hair-spray.jpg',
      '/images/spray-purple.jpg',
      '/images/spray-red.jpg',
      '/images/spray-blue.jpg',
      '/images/spray-color-grid.jpg',
      '/images/spray-usage.jpg',
      '/images/spray-silver.jpg',
      '/images/spray-green.jpg',
      '/images/hair-spray-pack.jpg',
      '/images/hair-spray-colors.jpg',
    ],
    badge: '٧ ألوان',
    shortDescription: 'ألوان مؤقتة جذابة تزول بالشامبو فقط، مثالية للمناسبات والحفلات.',
    description:
      'اسبراي يمنح الشعر ألواناً مؤقتة تزول بسهولة بالشامبو فقط، بينما لا تزول بالماء أو المطر، مناسب لتلوين الشعر بالكامل أو عمل خصل، ويستخدمه الرجال والنساء والأطفال في المناسبات والحفلات.',
    highlights: ['يجف في ثوانٍ', 'لا يزول بالماء أو المطر', 'يغسل بالشامبو'],
    features: [
      'ألوان مؤقتة تزول بالشامبو',
      'مقاوم للماء والمطر',
      'مناسب للخصل أو تلوين الشعر بالكامل',
      'يجف بسرعة',
      'لا يترك ملمساً دهنياً',
      'سهل الاستخدام',
      'آمن على الشعر وفروة الرأس',
      'مناسب للرجال والنساء والأطفال',
    ],
    usage: [
      'رج العبوة جيداً لمدة 15–30 ثانية.',
      'يجب أن يكون الشعر نظيفاً وجافاً.',
      'ضع منشفة لحماية الملابس.',
      'رش من مسافة 15–20 سم.',
      'وزع اللون بالتساوي.',
      'اتركه لمدة 10 دقائق.',
      'يمكن تمشيط الشعر بعد الجفاف.',
      'يزال بالشامبو.',
    ],
    warnings: [
      'للاستعمال الخارجي فقط.',
      'تجنب ملامسة العينين.',
      'لا يستخدم على فروة ملتهبة أو مجروحة.',
      'يحفظ بعيداً عن الأطفال.',
      'يحفظ بعيداً عن الحرارة وأشعة الشمس.',
    ],
    colors: [
      { name: 'فضي', hex: '#d9d9d9' },
      { name: 'ذهبي', hex: '#e8b027' },
      { name: 'أحمر', hex: '#d32020' },
      { name: 'نبيتي', hex: '#8e1230' },
      { name: 'أزرق', hex: '#1a5fd0' },
      { name: 'أخضر', hex: '#17a03a' },
      { name: 'موف', hex: '#8b3ad4' },
    ],
  },
  {
    slug: 'hair-color-cream',
    name: 'كريم تلوين الشعر المؤقت',
    shortName: 'كريم تلوين الشعر',
    category: 'تلوين مؤقت',
    brand: 'GD',
    size: '100 جم',
    image: '/images/hair-cream.jpg',
    images: [
      '/images/hair-cream.jpg',
      '/images/cream-box.jpg',
      '/images/cream-lineup.jpg',
      '/images/cream-strands.jpg',
      '/images/cream-color-grid.jpg',
      '/images/cream-colors-chart.jpg',
      '/images/cream-red.jpg',
      '/images/cream-purple.jpg',
      '/images/cream-gold.jpg',
      '/images/cream-blue.jpg',
      '/images/cream-green.jpg',
      '/images/cream-white.jpg',
      '/images/hair-cream-pack.jpg',
    ],
    badge: '٨ ألوان',
    shortDescription: 'ألوان زاهية مؤقتة للخصل، تدوم حتى الغسل وتزول بالشامبو.',
    description:
      'كريم تلوين الشعر المؤقت من GD يمنح خصل الشعر ألواناً زاهية ومؤقتة تدوم حتى الغسل التالي، مناسب لتلوين الشعر بالكامل أو عمل خصل بسهولة، بتركيبة لطيفة لا تحتوي على الأمونيا أو البيروكسيد، ويزال بالماء والشامبو.',
    highlights: ['ألوان زاهية ومتعددة', 'لا يضر الشعر', 'يغسل بالماء والشامبو'],
    features: [
      'يمنح خصل الشعر ألواناً زاهية ومؤقتة',
      'مناسب لجميع أنواع الشعر',
      'سهل الاستخدام وسريع التطبيق',
      'يُزال بسهولة باستخدام الشامبو',
      'مناسب للحفلات والمناسبات والتصوير والاستخدام اليومي',
      'حجم العبوة: 100 جم',
    ],
    usage: [
      'تأكد من أن الشعر نظيف وجاف تماماً قبل الاستخدام.',
      'ارتدِ قفازات مناسبة لحماية اليدين (يوصى بذلك).',
      'ضع كمية مناسبة من كريم GD على خصل الشعر المراد تلوينها.',
      'وزّع الكريم بالتساوي باستخدام الأصابع أو مشط التوزيع حتى تغطية الخصلة بالكامل.',
      'اترك الكريم لمدة من 5 إلى 10 دقائق حسب درجة اللون المطلوبة.',
      'صفف الشعر بعد الجفاف للحصول على أفضل مظهر.',
      'لإزالة اللون، اغسل الشعر جيداً بالماء والشامبو حتى يختفي اللون تماماً.',
    ],
    warnings: [
      'للاستعمال الخارجي فقط.',
      'تجنب ملامسة العينين، وفي حال حدوث ذلك تُغسل العينان فوراً بكمية وفيرة من الماء.',
      'يُنصح بإجراء اختبار حساسية على جزء صغير من الجلد قبل أول استخدام بـ24 ساعة.',
      'لا يُستخدم على فروة الرأس المتهيجة أو المصابة.',
      'يُحفظ بعيداً عن متناول الأطفال.',
      'يُحفظ في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة.',
    ],
    colors: [
      { name: 'أحمر', hex: '#cc1526' },
      { name: 'موف', hex: '#8e2fa5' },
      { name: 'ذهبي', hex: '#c8951f' },
      { name: 'فضي', hex: '#b6b9bd' },
      { name: 'أزرق', hex: '#1a4fc4' },
      { name: 'أخضر', hex: '#1f7a3d' },
      { name: 'نبيتي', hex: '#8e1230' },
      { name: 'أبيض', hex: '#f3f2ef' },
    ],
  },
  {
    slug: 'permanent-hair-dye',
    name: 'صبغة الشعر الدائمة',
    shortName: 'صبغة الشعر الدائمة',
    category: 'صبغات دائمة',
    brand: 'DINA DYE',
    size: '100 جم',
    image: '/images/hair-dye-permanent.jpg',
    images: [
      '/images/hair-dye-permanent.jpg',
      '/images/dye-pack.jpg',
      '/images/dye-black.jpg',
      '/images/dye-brown.jpg',
      '/images/dye-burgundy.jpg',
      '/images/hair-dye-pack.jpg',
    ],
    badge: 'بزيت الأرجان',
    shortDescription: 'لون غني وثابت مع تغطية ممتازة للشيب، بتركيبة خالية من الأمونيا.',
    description:
      'صبغة شعر دائمة تمنح لوناً غنياً وثابتاً مع تغطية ممتازة للشيب، غنية بالبروتين وزيت الأرجان لتغذية الشعر ومنحه لمعاناً ونعومة حريرية، بتركيبة خالية من الأمونيا ورائحة لطيفة.',
    highlights: ['خالية من الأمونيا', 'بزيت الأرجان والبروتين', 'تغطية كاملة للشيب'],
    features: [
      'يمنح لوناً غنياً وثابتاً',
      'تغطية ممتازة للشيب',
      'يمنح الشعر لمعاناً وحيوية',
      'يحتوي على البروتين وزيت الأرجان',
      'يساعد على تغذية الشعر',
      'يمنح نعومة وملمساً حريرياً',
      'تركيبة خالية من الأمونيا',
      'رائحة لطيفة',
      'لون طبيعي يدوم طويلاً',
    ],
    usage: [
      'إجراء اختبار حساسية قبل الاستخدام بـ48 ساعة.',
      'ارتداء القفازات.',
      'خلط كريم الصبغة مع الأكسجين حسب التعليمات.',
      'وضع الخليط على شعر جاف غير مغسول.',
      'اللون الأسود يترك 15–25 دقيقة.',
      'باقي الألوان 30–45 دقيقة.',
      'غسل الشعر جيداً ثم استخدام البلسم أو الماسك.',
    ],
    warnings: [
      'للاستعمال الخارجي فقط.',
      'تجنب العينين.',
      'لا يستخدم للرموش أو الحواجب.',
      'يحفظ بعيداً عن الأطفال.',
      'اختبار حساسية قبل كل استخدام بـ48 ساعة.',
    ],
    colors: [
      { name: 'أسود', hex: '#141414' },
      { name: 'بني', hex: '#5b3a24' },
      { name: 'نبيتي', hex: '#7a1230' },
    ],
  },
  {
    slug: 'skin-whitening-spray',
    name: 'اسبراي تفتيح البشرة',
    shortName: 'اسبراي تفتيح البشرة',
    category: 'العناية بالبشرة',
    brand: 'GD',
    size: '100 مل',
    image: '/images/skin-spray.jpg',
    images: [
      '/images/skin-spray.jpg',
      '/images/skin-face-result.jpg',
      '/images/skin-legs-result.jpg',
      '/images/skin-spray-pack.jpg',
    ],
    badge: 'ترطيب عميق',
    shortDescription: 'بشرة أكثر إشراقاً ونعومة، مع ترطيب عميق وامتصاص سريع.',
    description:
      'اسبراي يساعد على تفتيح البشرة وتوحيد لونها ومنحها إشراقاً ونعومة، غني بحمض الهيالورونيك للترطيب العميق ومدعم بالنياسيناميد وفيتامين سي، سريع الامتصاص وغير دهني وخالٍ من الكحول، ومناسب لجميع أنواع البشرة.',
    highlights: ['نياسيناميد وفيتامين سي', 'خالٍ من الكحول', 'سريع الامتصاص'],
    features: [
      'يساعد على تفتيح البشرة',
      'يوحد لون البشرة',
      'يمنح البشرة إشراقاً',
      'يحتوي على حمض الهيالورونيك',
      'يرطب البشرة',
      'سريع الامتصاص',
      'غير دهني',
      'مناسب لجميع أنواع البشرة',
      'يمنح نعومة وانتعاشاً',
      'سهل الاستخدام',
    ],
    usage: [
      'رج العبوة جيداً.',
      'تنظيف وتجفيف البشرة.',
      'الرش من مسافة 15–20 سم.',
      'توزيع المنتج برفق حتى الامتصاص.',
      'يستخدم مرة أو مرتين يومياً.',
      'للاستعمال الخارجي فقط مع تجنب العينين والجروح.',
    ],
    warnings: [
      'للاستعمال الخارجي فقط.',
      'تجنب ملامسة العينين والجروح.',
      'يفضل إجراء اختبار بسيط على جزء صغير من الجلد قبل الاستخدام.',
      'يحفظ بعيداً عن الأطفال.',
      'يحفظ بعيداً عن الحرارة وأشعة الشمس المباشرة.',
    ],
  },
]

export const categories = [
  { label: 'اسبراي تلوين الشعر المؤقت', slug: 'hair-color-spray' },
  { label: 'كريم تلوين الشعر المؤقت', slug: 'hair-color-cream' },
  { label: 'صبغة الشعر الدائمة', slug: 'permanent-hair-dye' },
  { label: 'اسبراي تفتيح البشرة', slug: 'skin-whitening-spray' },
]

/** الفئات المستخدمة في فلتر صفحة المنتجات */
export const productCategories = Array.from(new Set(products.map((p) => p.category)))

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getRelated(slug: string, limit = 3) {
  const current = getProduct(slug)
  if (!current) return products.slice(0, limit)
  const sameCategory = products.filter((p) => p.slug !== slug && p.category === current.category)
  const others = products.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, limit)
}

export { WHATSAPP_NUMBER, WHATSAPP_URL, FACEBOOK_URL, whatsappLink } from '@/lib/site'
