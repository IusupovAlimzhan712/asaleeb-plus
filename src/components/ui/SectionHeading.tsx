import type { ReactNode } from 'react'
import clsx from 'clsx'
import Reveal from './Reveal'

interface Props {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  align?: 'start' | 'center'
  className?: string
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'start', className }: Props) {
  return (
    <div className={clsx('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: 'var(--accent)' }}
        >
          <span className="h-px w-6" style={{ background: 'var(--accent)' }} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-4 text-[length:var(--fs-h2)] font-medium leading-[1.1]">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.14}>
          <p className="mt-5 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
