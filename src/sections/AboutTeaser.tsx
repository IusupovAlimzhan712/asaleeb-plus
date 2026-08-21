import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import ArchArt from '../components/visuals/ArchArt'

export default function AboutTeaser() {
  const { t } = useTranslation()
  const points = t('about.points', { returnObjects: true }) as unknown as { title: string; description: string }[]

  return (
    <section className="container-page py-24 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border" style={{ borderColor: 'var(--border)' }}>
            <ArchArt seed={2} palette="stone" className="h-full w-full" />
          </div>
          <div
            className="glass-strong absolute -bottom-8 start-6 flex items-center gap-4 rounded-2xl px-5 py-4 shadow-[var(--shadow-soft)] sm:-bottom-10 sm:start-10"
          >
            <p className="font-display text-3xl font-medium" style={{ color: 'var(--accent)' }}>25+</p>
            <div className="h-8 w-px" style={{ background: 'var(--border-strong)' }} />
            <p className="max-w-[9rem] text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>
              {t('hero.stat1Label')}
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>
              <span className="h-px w-6" style={{ background: 'var(--accent)' }} />
              {t('about.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-4 text-[length:var(--fs-h2)] font-medium leading-[1.1]">{t('about.title')}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('about.body')}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-8 grid gap-4 sm:grid-cols-1">
              {Array.isArray(points) &&
                points.map((p) => (
                  <li key={p.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--surface-strong)' }}>
                      <Check size={13} style={{ color: 'var(--accent)' }} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{p.title}</span>
                      <span className="block text-sm" style={{ color: 'var(--text-muted)' }}>{p.description}</span>
                    </span>
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal delay={0.32}>
            <Button to="/about" variant="glass" className="mt-9">
              {t('about.cta')}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
