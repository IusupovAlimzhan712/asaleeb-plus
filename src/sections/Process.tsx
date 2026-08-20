import { useTranslation } from 'react-i18next'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

export default function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as unknown as { title: string; description: string }[]

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container-page">
        <SectionHeading eyebrow={t('process.eyebrow')} title={t('process.title')} align="center" className="mx-auto" />

        <div className="relative mt-16 grid gap-8 sm:gap-6 lg:grid-cols-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-6 hidden h-px lg:block"
            style={{ background: 'linear-gradient(to right, transparent, var(--border-strong), transparent)' }}
          />
          {Array.isArray(steps) &&
            steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="relative">
                <div className="flex items-start gap-4 lg:flex-col lg:items-start lg:gap-6">
                  <span
                    className="font-display relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-strong text-lg"
                    style={{ color: 'var(--accent)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {s.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  )
}
