import { useTranslation } from 'react-i18next'
import { Building2, Sofa, ClipboardList, PenTool } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

const icons = [Building2, PenTool, ClipboardList, Sofa]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as unknown as { title: string; description: string; tag: string }[]

  return (
    <section id="services" className="container-page scroll-mt-28 py-24 sm:py-32">
      <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} subtitle={t('services.subtitle')} />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {Array.isArray(items) &&
          items.map((s, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-3xl border p-8 transition-colors duration-500 hover:border-[var(--accent)] sm:p-10" style={{ borderColor: 'var(--border)' }}>
                  <div
                    className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ background: 'var(--accent)' }}
                  />
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl glass transition-colors duration-500 group-hover:border-[var(--accent)]">
                      <Icon size={20} style={{ color: 'var(--accent)' }} />
                    </span>
                    <span className="font-display text-3xl" style={{ color: 'var(--border-strong)' }}>{s.tag}</span>
                  </div>
                  <h3 className="font-display mt-7 text-2xl font-medium">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {s.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
      </div>
    </section>
  )
}
