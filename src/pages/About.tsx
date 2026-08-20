import { useTranslation } from 'react-i18next'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ArchArt from '../components/visuals/ArchArt'
import GoogleMapEmbed from '../components/visuals/GoogleMapEmbed'
import Button from '../components/ui/Button'
import Team from '../sections/Team'
import CtaBanner from '../sections/CtaBanner'
import { Sparkles, MapPin, Phone, Clock } from 'lucide-react'

export default function About() {
  const { t } = useTranslation()
  const values = t('aboutPage.values', { returnObjects: true }) as unknown as { title: string; description: string }[]
  const milestones = t('aboutPage.milestones', { returnObjects: true }) as unknown as { year: string; title: string; description: string }[]

  return (
    <>
      <section className="container-page pb-20 pt-36 sm:pt-44">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>
            <span className="h-px w-6" style={{ background: 'var(--accent)' }} />
            {t('aboutPage.eyebrow')}
          </span>
          <h1 className="font-display mt-4 text-5xl font-medium leading-[1.05] sm:text-7xl">{t('aboutPage.title')}</h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('aboutPage.lead')}
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="aspect-[4/3] overflow-hidden rounded-[2rem] border" style={{ borderColor: 'var(--border)' }}>
            <ArchArt seed={7} palette="ink" className="h-full w-full" />
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t('aboutPage.storyP1')}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t('aboutPage.storyP2')}</p>
            </Reveal>
            <Reveal delay={0.16} className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-medium" style={{ color: 'var(--accent)' }}>{t('aboutPage.missionTitle')}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t('aboutPage.mission')}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-medium" style={{ color: 'var(--accent)' }}>{t('aboutPage.visionTitle')}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t('aboutPage.vision')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container-page">
          <SectionHeading eyebrow={t('aboutPage.valuesEyebrow')} title={t('aboutPage.valuesTitle')} align="center" className="mx-auto" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(values) &&
              values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06} className="glass rounded-2xl p-7">
                  <Sparkles size={18} style={{ color: 'var(--accent)' }} />
                  <h3 className="font-display mt-4 text-xl font-medium">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.description}</p>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading eyebrow={t('aboutPage.milestonesEyebrow')} title={t('aboutPage.milestonesTitle')} />
        </div>
        <div className="container-page mt-14 overflow-x-auto pb-4">
          <div className="flex w-max min-w-full snap-x snap-mandatory sm:w-full sm:justify-between">
            {Array.isArray(milestones) &&
              milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.08} className="w-60 flex-none snap-start ps-1 pe-6 last:pe-1 sm:w-auto sm:flex-1 sm:px-2">
                  <div className="flex items-center">
                    <span
                      className="h-px flex-1"
                      style={{ background: i === 0 ? 'transparent' : 'var(--border-strong)' }}
                    />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span
                      className="h-px flex-1"
                      style={{ background: i === milestones.length - 1 ? 'transparent' : 'var(--border-strong)' }}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-display text-2xl font-medium" style={{ color: 'var(--accent)' }}>{m.year}</p>
                    <h3 className="mt-1 text-lg font-semibold">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.description}</p>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-24 sm:pb-32">
        <SectionHeading eyebrow={t('aboutPage.visitEyebrow')} title={t('aboutPage.visitTitle')} subtitle={t('aboutPage.visitSubtitle')} />
        <Reveal delay={0.1} className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="aspect-[16/10] overflow-hidden rounded-[2rem] border sm:aspect-[16/9]" style={{ borderColor: 'var(--border)' }}>
            <GoogleMapEmbed className="h-full w-full" />
          </div>
          <div className="glass flex flex-col justify-center gap-5 rounded-[2rem] p-7 sm:p-8">
            <div className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div>
                <p className="text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                  {t('contact.info.addressLabel')}
                </p>
                <p className="mt-1 text-sm font-medium">{t('contact.info.address')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={17} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div>
                <p className="text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                  {t('contact.info.phoneLabel')}
                </p>
                <p className="mt-1 text-sm font-medium" dir="ltr">
                  {t('contact.info.phone')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={17} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div>
                <p className="text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                  {t('contact.info.hoursLabel')}
                </p>
                <p className="mt-1 text-sm font-medium">{t('contact.info.hours')}</p>
              </div>
            </div>
            <Button to="/contact" variant="glass" className="mt-2 justify-center">
              {t('common.getInTouch')}
            </Button>
          </div>
        </Reveal>
      </section>

      <Team />
      <CtaBanner />
    </>
  )
}
