import { useTranslation } from 'react-i18next'
import { MapPin, ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'

const OFFICE_QUERY = 'Asaleeb Plus Co. اساليب بلس معماريون, Riyadh, Saudi Arabia'

interface Props {
  className?: string
  label?: string
}

/** Real, clickable Google Maps embed — no API key required. Opens turn-by-turn directions in a new tab. */
export default function GoogleMapEmbed({ className, label }: Props) {
  const { t } = useTranslation()
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(OFFICE_QUERY)}&z=15&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_QUERY)}`
  const caption = label ?? t('contact.mapCaption')

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <iframe
        src={embedSrc}
        title={caption}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-4 sm:justify-start sm:p-6">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-strong pointer-events-auto group flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold shadow-[var(--shadow-lift)] transition-colors duration-300 hover:border-[var(--accent)] focus-ring"
        >
          <MapPin size={14} style={{ color: 'var(--accent)' }} />
          {caption}
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 rtl:-scale-x-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: 'var(--accent)' }}
          />
        </a>
      </div>
    </div>
  )
}
