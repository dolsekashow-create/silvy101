import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const faqs = [
  {
    q: 'هل اسبراي تلوين الشعر المؤقت يزول بالماء أو المطر؟',
    a: 'لا، الاسبراي مقاوم للماء والمطر ولا يزول إلا بغسل الشعر بالشامبو، لذلك يمكنك الاستمتاع بلونك طوال اليوم بثقة تامة.',
  },
  {
    q: 'هل منتجات التلوين المؤقت آمنة للأطفال؟',
    a: 'نعم، اسبراي تلوين الشعر المؤقت آمن على الشعر وفروة الرأس ومناسب للرجال والنساء والأطفال في المناسبات والحفلات.',
  },
  {
    q: 'هل صبغة الشعر الدائمة تحتوي على أمونيا؟',
    a: 'لا، صبغة سيلفي الدائمة بتركيبة خالية من الأمونيا وغنية بالبروتين وزيت الأرجان لتغذية الشعر ومنحه لمعاناً ونعومة.',
  },
  {
    q: 'كيف أزيل لون الاسبراي أو الكريم المؤقت؟',
    a: 'ببساطة اغسلي شعرك بالشامبو والماء وسيزول اللون تماماً دون أن يترك أي أثر.',
  },
  {
    q: 'هل اسبراي تفتيح البشرة مناسب لجميع أنواع البشرة؟',
    a: 'نعم، الاسبراي مناسب لجميع أنواع البشرة، وهو سريع الامتصاص وغير دهني ويحتوي على حمض الهيالورونيك للترطيب العميق.',
  },
  {
    q: 'هل يجب عمل اختبار حساسية قبل استخدام الصبغة الدائمة؟',
    a: 'نعم، ننصح دائماً بإجراء اختبار حساسية قبل كل استخدام بـ48 ساعة لضمان سلامتك التامة.',
  },
  {
    q: 'كيف أطلب المنتجات؟',
    a: 'يمكنك الطلب مباشرة عبر واتساب على الرقم 01283658904 أو من خلال صفحتنا على فيسبوك، وسيقوم فريقنا بخدمتك فوراً.',
  },
]

export function FaqAccordion({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, i) => (
        <AccordionItem key={faq.q} value={`item-${i}`} className="border-border">
          <AccordionTrigger className="text-right text-base font-bold hover:text-primary">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed text-muted-foreground">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
