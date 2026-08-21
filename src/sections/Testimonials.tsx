import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as unknown as { quote: string; name: string; role: string }[]
  const list = Array.isArray(items) ? items : []
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || list.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 6000)
    return () => clearInterval(id)
  }, [list.length, reduced])

  if (list.length === 0) return null
  const current = list[index]

  return (
    <section className="container-page py-24 sm:py-32">
      <SectionHeading eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} align="center" className="mx-auto" />

      <Reveal delay={0.15} className="relative mx-auto mt-14 max-w-3xl">
        <div className="glass relative min-h-[16rem] rounded-[2rem] p-8 sm:p-14">
          <Quote size={36} style={{ color: 'var(--accent)' }} className="opacity-60 rtl:-scale-x-100" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display mt-6 text-xl leading-relaxed sm:text-2xl">{current.quote}</p>
              <div className="mt-8">
                <p className="text-sm font-semibold">{current.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
            aria-label={t('common.previous')}
            className="flex h-11 w-11 items-center justify-center rounded-full glass cursor-pointer transition-colors hover:border-[var(--accent)] focus-ring"
          >
            <ChevronLeft size={16} className="rtl:-scale-x-100" />
          </button>
          <div className="flex items-center gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}`}
                className="flex items-center justify-center p-2.5 cursor-pointer focus-ring rounded-full"
              >
                <span
                  className="block h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === index ? '1.5rem' : '0.4rem', background: i === index ? 'var(--accent)' : 'var(--border-strong)' }}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % list.length)}
            aria-label={t('common.next')}
            className="flex h-11 w-11 items-center justify-center rounded-full glass cursor-pointer transition-colors hover:border-[var(--accent)] focus-ring"
          >
            <ChevronRight size={16} className="rtl:-scale-x-100" />
          </button>
        </div>
      </Reveal>
    </section>
  )
}
