import { useTranslation } from 'react-i18next'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

export default function CtaBanner() {
  const { t } = useTranslation()

  return (
    <section className="container-page pb-24 sm:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:rounded-[2.5rem] sm:px-16 sm:py-24" style={{ background: 'var(--bg-elevated-2)' }}>
          <div className="pointer-events-none absolute -top-24 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--accent)' }} />
          <h2 className="font-display relative text-4xl font-medium leading-[1.1] sm:text-6xl">{t('cta.title')}</h2>
          <p className="relative mx-auto mt-5 max-w-md text-base" style={{ color: 'var(--text-muted)' }}>
            {t('cta.subtitle')}
          </p>
          <Button to="/contact" variant="solid" className="relative mt-9">
            {t('cta.button')}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
