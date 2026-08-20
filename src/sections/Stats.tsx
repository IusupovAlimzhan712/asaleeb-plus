import { useTranslation } from 'react-i18next'
import { CalendarClock, Building2, MapPin, HeartHandshake } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Counter from '../components/ui/Counter'
import SectionHeading from '../components/ui/SectionHeading'

const icons = [CalendarClock, Building2, MapPin, HeartHandshake]

export default function Stats() {
  const { t } = useTranslation()
  const items = t('stats.items', { returnObjects: true }) as unknown as { value: string; suffix: string; label: string }[]

  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container-page">
        <SectionHeading eyebrow={t('stats.eyebrow')} title={t('stats.title')} className="max-w-xl" />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {Array.isArray(items) &&
            items.map((s, i) => {
              const Icon = icons[i % icons.length]
              return (
                <Reveal key={s.label} delay={i * 0.08} className="h-full">
                  <div
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-colors duration-500 hover:border-[var(--accent)] sm:p-10"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div
                      className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                      style={{ background: 'var(--accent)' }}
                    />

                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl glass transition-colors duration-500 group-hover:border-[var(--accent)]">
                      <Icon size={20} style={{ color: 'var(--accent)' }} />
                    </span>

                    <p className="text-gradient-gold font-display mt-8 text-6xl leading-none font-medium sm:text-7xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text)' }}>
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              )
            })}
        </div>
      </div>
    </section>
  )
}
