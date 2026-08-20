import { useTranslation } from 'react-i18next'
import { Gem } from 'lucide-react'

export default function Marquee() {
  const { t } = useTranslation()
  const items: string[] = t('marquee', { returnObjects: true }) as unknown as string[]
  const list = Array.isArray(items) ? items : []
  const doubled = [...list, ...list]

  return (
    <div className="relative overflow-hidden border-y py-5" style={{ borderColor: 'var(--border)' }}>
      <div className="flex w-max animate-marquee gap-10">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex items-center gap-10" aria-hidden={rep === 1}>
            {doubled.map((item, i) => (
              <span key={`${rep}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-display text-xl sm:text-2xl" style={{ color: 'var(--text-muted)' }}>
                  {item}
                </span>
                <Gem size={14} style={{ color: 'var(--accent)' }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
