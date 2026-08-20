import { useTranslation } from 'react-i18next'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import PersonPlaceholder from '../components/visuals/PersonPlaceholder'

export default function Team() {
  const { t } = useTranslation()
  const members = t('team.members', { returnObjects: true }) as unknown as { name: string; role: string; bio: string }[]

  return (
    <section className="container-page py-24 sm:py-32">
      <SectionHeading eyebrow={t('team.eyebrow')} title={t('team.title')} subtitle={t('team.subtitle')} />

      <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-10">
        {Array.isArray(members) &&
          members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="group overflow-hidden rounded-3xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <PersonPlaceholder name={m.name} seed={i + 1} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-medium">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
      </div>
    </section>
  )
}
