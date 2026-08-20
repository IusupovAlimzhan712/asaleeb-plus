import { Link } from 'react-router-dom'
import clsx from 'clsx'
import wordmarkPng from '../../assets/asaleeb-logo-wordmark.png'
import wordmarkWebp from '../../assets/asaleeb-logo-wordmark.webp'
import fullPng from '../../assets/asaleeb-logo-full.png'
import fullWebp from '../../assets/asaleeb-logo-full.webp'

export default function Logo({ className, variant = 'compact' }: { className?: string; variant?: 'compact' | 'full' }) {
  const isFull = variant === 'full'

  return (
    <Link to="/" className={clsx('group flex items-center shrink-0 focus-ring rounded-full', className)} aria-label="Asaleeb Plus — Home">
      <picture>
        <source srcSet={isFull ? fullWebp : wordmarkWebp} type="image/webp" />
        <img
          src={isFull ? fullPng : wordmarkPng}
          alt="Asaleeb Plus"
          className={clsx('w-auto transition-transform duration-500 group-hover:scale-[1.03] origin-left', isFull ? 'h-12 sm:h-14' : 'h-8 sm:h-9')}
        />
      </picture>
    </Link>
  )
}
