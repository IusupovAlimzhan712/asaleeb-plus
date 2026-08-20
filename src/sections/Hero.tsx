import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import HeroCanvasWrapper from '../components/three/HeroCanvasWrapper'
import Button from '../components/ui/Button'
import Counter from '../components/ui/Counter'

export default function Hero() {
  const { t } = useTranslation()

  const stats = [
    { value: t('hero.stat1Value'), suffix: t('hero.stat1Suffix'), label: t('hero.stat1Label') },
    { value: t('hero.stat2Value'), suffix: t('hero.stat2Suffix'), label: t('hero.stat2Label') },
    { value: t('hero.stat3Value'), suffix: t('hero.stat3Suffix'), label: t('hero.stat3Label') },
  ]

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-28">
      <div className="absolute inset-0">
        <HeroCanvasWrapper />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(80% 60% at 50% 30%, transparent, var(--bg) 92%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
        />
      </div>

      <div className="container-page relative flex flex-1 flex-col items-center justify-center py-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          {t('hero.eyebrow')}
        </motion.span>

        <h1 className="font-display mt-7 text-[3.4rem] font-medium leading-[0.98] sm:text-8xl md:text-9xl">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            {t('hero.titleLine1')}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-gradient-gold block italic"
          >
            {t('hero.titleLine2')}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to="/projects" variant="solid">
            {t('hero.cta')}
          </Button>
          <Button to="/about" variant="glass" icon={false}>
            {t('hero.ctaSecondary')}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="container-page relative pb-10 sm:pb-14"
      >
        <div className="grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-start">
              <p className="font-display text-2xl font-medium sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.15em] sm:text-xs" style={{ color: 'var(--text-faint)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
