import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const { i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  useEffect(() => {
    const start = performance.now()
    const duration = 1400
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setVisible(false), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
          style={{ background: 'var(--bg)' }}
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.svg width="72" height="72" viewBox="0 0 64 64" fill="none" initial="hidden" animate="show">
            <motion.path
              d="M32 15 L48.5 45 H42 L38.5 38.5 H25.5 L22 45 H15.5 L32 15Z"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
              variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M28.5 32 H35.5"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }}
              transition={{ duration: 0.4, delay: 1.0 }}
            />
          </motion.svg>
          <div className="flex flex-col items-center gap-3">
            <p className="font-display text-sm tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
              {isAr ? 'أساليب بلس' : 'ASALEEB PLUS'}
            </p>
            <div className="h-px w-40 overflow-hidden rounded-full" style={{ background: 'var(--border)' }}>
              <motion.div className="h-full" style={{ background: 'var(--accent)', width: `${progress}%` }} />
            </div>
            <p className="text-[0.65rem] tabular-nums" style={{ color: 'var(--text-faint)' }}>
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
