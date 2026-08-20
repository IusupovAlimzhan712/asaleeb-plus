import type { Lang } from '../../lib/store'

interface Intent {
  keywords: { en: string[]; ar: string[] }
  reply: { en: string; ar: string }
}

const intents: Intent[] = [
  {
    keywords: {
      en: ['service', 'offer', 'do you do', 'what do you'],
      ar: ['خدم', 'ماذا تقدم', 'تقدمون'],
    },
    reply: {
      en: 'We offer four services: Architecture, Interior Design, Project Management and Furniture Design — from first concept to final furnishing. Check the Services section for details.',
      ar: 'نقدم أربع خدمات: العمارة، والتصميم الداخلي، وإدارة المشاريع، وتصميم الأثاث — من الفكرة الأولى إلى التأثيث النهائي. راجع قسم خدماتنا للتفاصيل.',
    },
  },
  {
    keywords: {
      en: ['commercial', 'office', 'tower', 'retail', 'business'],
      ar: ['تجار', 'مكتب', 'برج', 'أعمال'],
    },
    reply: {
      en: 'Yes — Asaleeb Plus handles both residential and commercial architecture, including offices, retail and mixed-use towers. Tap "Our Projects" to see examples like Olaya Business Tower.',
      ar: 'نعم — نتعامل مع المشاريع السكنية والتجارية، بما في ذلك المكاتب والتجزئة والأبراج متعددة الاستخدامات. اضغط على "أعمالنا" لترى أمثلة مثل برج العليا التجاري.',
    },
  },
  {
    keywords: {
      en: ['start', 'begin', 'process', 'how do i', 'how does'],
      ar: ['ابدأ', 'كيف أبدأ', 'خطوات', 'آلية'],
    },
    reply: {
      en: 'Starting is simple: reach out through the Contact page with your site and vision, we schedule a consultation, then move through concept design, detailed design, execution and handover.',
      ar: 'البدء بسيط: تواصل معنا عبر صفحة "تواصل معنا" بموقعك ورؤيتك، نُحدد موعدًا للاستشارة، ثم ننتقل عبر التصميم المفاهيمي والتفصيلي والتنفيذ والتسليم.',
    },
  },
  {
    keywords: {
      en: ['where', 'location', 'address', 'office located'],
      ar: ['أين', 'موقع', 'عنوان', 'مقر'],
    },
    reply: {
      en: 'Our head office is in Al-Olaya District, Riyadh, Saudi Arabia. You can find the address and map on the Contact page.',
      ar: 'يقع مقرنا الرئيسي في حي العليا، الرياض، المملكة العربية السعودية. يمكنك إيجاد العنوان والخريطة في صفحة "تواصل معنا".',
    },
  },
  {
    keywords: {
      en: ['price', 'cost', 'budget', 'fee'],
      ar: ['سعر', 'تكلفة', 'ميزانية', 'رسوم'],
    },
    reply: {
      en: 'Every project is scoped individually based on size and complexity. Share your project details on the Contact page and our team will follow up with an estimate.',
      ar: 'يُحدد نطاق كل مشروع بناءً على حجمه وتعقيده. شارك تفاصيل مشروعك في صفحة "تواصل معنا" وسيتواصل فريقنا معك بتقدير مبدئي.',
    },
  },
]

export function getChatResponse(message: string, lang: Lang, fallback: string): string {
  const normalized = message.toLowerCase()
  for (const intent of intents) {
    const words = lang === 'ar' ? intent.keywords.ar : intent.keywords.en
    if (words.some((w) => normalized.includes(w.toLowerCase()))) {
      return lang === 'ar' ? intent.reply.ar : intent.reply.en
    }
  }
  return fallback
}
