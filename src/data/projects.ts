export type ProjectCategory = 'residential' | 'commercial' | 'interior' | 'cultural'

export interface Project {
  slug: string
  category: ProjectCategory
  location: { en: string; ar: string }
  year: string
  area: string
  client: { en: string; ar: string }
  title: { en: string; ar: string }
  summary: { en: string; ar: string }
  challenge: { en: string; ar: string }
  solution: { en: string; ar: string }
  /** seed drives the generated abstract artwork so each project looks distinct */
  seed: number
  palette: 'ink' | 'gold' | 'clay' | 'stone'
}

export const projects: Project[] = [
  {
    slug: 'al-nakheel-villa',
    category: 'residential',
    location: { en: 'Riyadh', ar: 'الرياض' },
    year: '2023',
    area: '1,450 m²',
    client: { en: 'Private Residence', ar: 'سكن خاص' },
    title: { en: 'Al-Nakheel Villa', ar: 'فيلا النخيل' },
    summary: {
      en: 'A courtyard villa organized around light, shade and privacy — Najdi geometry rendered in a contemporary material palette.',
      ar: 'فيلا ذات فناء داخلي منظمة حول الضوء والظل والخصوصية — هندسة نجدية بلغة مواد معاصرة.',
    },
    challenge: {
      en: 'A family of five wanted a home that felt both modern and unmistakably Saudi — without falling into pastiche.',
      ar: 'أرادت عائلة مكونة من خمسة أفراد منزلًا يبدو معاصرًا وسعوديًا بلا لبس — دون الوقوع في التقليد الشكلي.',
    },
    solution: {
      en: 'We centered the plan on an internal courtyard, using mashrabiya-inspired screening to filter light without sacrificing openness.',
      ar: 'وضعنا فناءً داخليًا في محور المخطط، واستخدمنا مشربيات معاصرة لتصفية الضوء دون التضحية بالانفتاح.',
    },
    seed: 12,
    palette: 'stone',
  },
  {
    slug: 'olaya-business-tower',
    category: 'commercial',
    location: { en: 'Riyadh', ar: 'الرياض' },
    year: '2022',
    area: '18,000 m²',
    client: { en: 'Commercial Developer', ar: 'مطوّر تجاري' },
    title: { en: 'Olaya Business Tower', ar: 'برج العليا التجاري' },
    summary: {
      en: 'A 22-storey office tower with a faceted stone-and-glass envelope tuned to Riyadh’s harsh southern light.',
      ar: 'برج مكاتب من 22 طابقًا بواجهة حجرية زجاجية متعددة الأوجه، مصممة للتعامل مع ضوء الرياض الجنوبي القاسي.',
    },
    challenge: {
      en: 'The client needed maximum leasable floor area without compromising on solar performance or arrival experience.',
      ar: 'احتاج العميل إلى أقصى مساحة تأجيرية دون المساس بالأداء الحراري أو تجربة الوصول.',
    },
    solution: {
      en: 'A faceted curtain wall with computational shading fins cuts solar gain by 34% while giving the tower a distinct silhouette.',
      ar: 'واجهة زجاجية متعددة الأوجه بزعانف تظليل محسوبة رقميًا تقلل الاكتساب الحراري بنسبة 34% وتمنح البرج ملامح مميزة.',
    },
    seed: 34,
    palette: 'ink',
  },
  {
    slug: 'diriyah-heritage-residence',
    category: 'residential',
    location: { en: 'Diriyah', ar: 'الدرعية' },
    year: '2024',
    area: '2,100 m²',
    client: { en: 'Private Residence', ar: 'سكن خاص' },
    title: { en: 'Diriyah Heritage Residence', ar: 'مسكن الدرعية التراثي' },
    summary: {
      en: 'A residence adjacent to At-Turaif, built in dialogue with Najdi mudbrick tradition using modern construction methods.',
      ar: 'مسكن مجاور لحي الطريف، بُني بحوار مع تقاليد الطين النجدي بأساليب إنشائية حديثة.',
    },
    challenge: {
      en: 'Heritage zoning demanded material and massing continuity with the historic district without imitation construction.',
      ar: 'تطلبت اشتراطات التراث العمراني انسجامًا في المادة والكتلة مع الحي التاريخي دون تقليد إنشائي مباشر.',
    },
    solution: {
      en: 'Rammed-earth-toned precast panels and deep-set windows echo Najdi form language while meeting modern seismic and thermal codes.',
      ar: 'ألواح خرسانية سابقة الصب بلون الطين وفتحات نوافذ غائرة تستحضر لغة الشكل النجدي مع الالتزام بالكود الإنشائي والحراري الحديث.',
    },
    seed: 58,
    palette: 'clay',
  },
  {
    slug: 'red-sea-retreat',
    category: 'residential',
    location: { en: 'Jeddah', ar: 'جدة' },
    year: '2023',
    area: '980 m²',
    client: { en: 'Private Residence', ar: 'سكن خاص' },
    title: { en: 'Red Sea Retreat', ar: 'فيلا شاطئ البحر الأحمر' },
    summary: {
      en: 'A coastal villa opening entirely toward the water, wrapped in a deep shading colonnade against Jeddah humidity.',
      ar: 'فيلا ساحلية تنفتح كليًا نحو البحر، محاطة برواق تظليل عميق يقاوم رطوبة جدة.',
    },
    challenge: {
      en: 'Maximize sea views while controlling glare, salt exposure and the intense humidity of the Red Sea coastline.',
      ar: 'تعظيم إطلالة البحر مع التحكم بالوهج والتعرض الملحي والرطوبة العالية على ساحل البحر الأحمر.',
    },
    solution: {
      en: 'A perimeter colonnade of deep-set concrete fins shades the glazing while framing the water view from every room.',
      ar: 'رواق محيطي من زعانف خرسانية عميقة يظلل الواجهات الزجاجية ويؤطر إطلالة البحر من كل غرفة.',
    },
    seed: 71,
    palette: 'stone',
  },
  {
    slug: 'al-faisaliah-retail-interior',
    category: 'interior',
    location: { en: 'Riyadh', ar: 'الرياض' },
    year: '2024',
    area: '3,200 m²',
    client: { en: 'Retail Group', ar: 'مجموعة تجزئة' },
    title: { en: 'Al-Faisaliah Retail Interior', ar: 'التصميم الداخلي — العليا مول' },
    summary: {
      en: 'A full interior fit-out for a luxury retail concourse — stone, brass and warm light choreographing a slow, deliberate walk.',
      ar: 'تنفيذ داخلي كامل لممر تجزئة فاخر — حجر ونحاس وإضاءة دافئة تصمم إيقاع مشي بطيئًا ومتأملًا.',
    },
    challenge: {
      en: 'Reposition a dated 2000s mall concourse as a destination for luxury tenants without a full structural rebuild.',
      ar: 'إعادة تموضع ممر مول قديم من الألفينات ليصبح وجهة لمستأجرين فاخرين دون إعادة بناء إنشائية كاملة.',
    },
    solution: {
      en: 'New stone flooring, brass reveal details and a choreographed lighting plan transform the concourse without touching the structure.',
      ar: 'أرضيات حجرية جديدة وتفاصيل نحاسية وخطة إضاءة مدروسة تحوّل الممر بالكامل دون المساس بالهيكل الإنشائي.',
    },
    seed: 19,
    palette: 'gold',
  },
  {
    slug: 'qassim-cultural-center',
    category: 'cultural',
    location: { en: 'Al-Qassim', ar: 'القصيم' },
    year: '2022',
    area: '6,500 m²',
    client: { en: 'Public Institution', ar: 'جهة حكومية' },
    title: { en: 'Al-Qassim Cultural Center', ar: 'مركز القصيم الثقافي' },
    summary: {
      en: 'A civic building housing a library, exhibition hall and auditorium beneath a single folded concrete roof.',
      ar: 'مبنى عام يضم مكتبة وقاعة معارض ومسرحًا تحت سقف خرساني واحد مطوي.',
    },
    challenge: {
      en: 'Three distinct public programs needed one coherent civic identity on a constrained municipal site.',
      ar: 'ثلاثة برامج عامة مختلفة تحتاج إلى هوية عمرانية واحدة متماسكة على موقع بلدي محدود المساحة.',
    },
    solution: {
      en: 'A single folded roof plane unifies the three volumes, creating a shaded public plaza beneath its widest overhang.',
      ar: 'سطح خرساني مطوي واحد يوحّد الكتل الثلاث، وينشئ ساحة عامة مظللة تحت أوسع امتداد له.',
    },
    seed: 45,
    palette: 'ink',
  },
  {
    slug: 'jeddah-waterfront-residence',
    category: 'residential',
    location: { en: 'Jeddah', ar: 'جدة' },
    year: '2021',
    area: '1,200 m²',
    client: { en: 'Private Residence', ar: 'سكن خاص' },
    title: { en: 'Jeddah Waterfront Residence', ar: 'مسكن واجهة جدة البحرية' },
    summary: {
      en: 'A layered white villa on the Corniche, its terraces stepping down toward the water like a section of coral.',
      ar: 'فيلا بيضاء متدرجة على الكورنيش، تتنازل شرفاتها نحو الماء كأنها مقطع من الشعاب المرجانية.',
    },
    challenge: {
      en: 'The narrow waterfront lot demanded privacy from the public Corniche promenade without closing off the view.',
      ar: 'استلزمت القطعة الساحلية الضيقة خصوصية عن ممشى الكورنيش العام دون حجب الإطلالة.',
    },
    solution: {
      en: 'Stepped terraces and angled screening walls give every level a private outdoor moment facing the sea.',
      ar: 'شرفات متدرجة وجدران حجب مائلة تمنح كل طابق لحظة خارجية خاصة تطل على البحر.',
    },
    seed: 83,
    palette: 'stone',
  },
  {
    slug: 'neom-concept-pavilion',
    category: 'interior',
    location: { en: 'NEOM', ar: 'نيوم' },
    year: '2024',
    area: '640 m²',
    client: { en: 'Concept / Exhibition', ar: 'مفاهيمي / معرض' },
    title: { en: 'NEOM Concept Pavilion', ar: 'جناح نيوم المفاهيمي' },
    summary: {
      en: 'A speculative furniture-and-material pavilion imagining how Saudi craft language scales into a future city.',
      ar: 'جناح مفاهيمي للأثاث والمواد يتخيل كيف تتوسع لغة الحرفة السعودية داخل مدينة المستقبل.',
    },
    challenge: {
      en: 'An internal design exercise: create a full furniture line expressing Asaleeb Plus’s design language independent of a client brief.',
      ar: 'تمرين تصميم أجرته الشركة داخليًا: تصميم خط أثاث كامل يعبر عن لغة أساليب بلس التصميمية بمعزل عن طلب عميل محدد.',
    },
    solution: {
      en: 'A modular furniture system in oak, brass and travertine, designed to assemble into configurations from majlis to boardroom.',
      ar: 'نظام أثاث معياري من خشب البلوط والنحاس والترافرتين، مصمم للتشكل من المجلس إلى قاعة الاجتماعات.',
    },
    seed: 27,
    palette: 'gold',
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}
