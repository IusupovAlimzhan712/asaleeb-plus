import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'

type Variant = 'solid' | 'glass' | 'ghost'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  className?: string
  icon?: boolean
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  to?: undefined
  href?: undefined
}

interface ButtonAsLink extends BaseProps {
  to: string
  href?: undefined
  type?: undefined
}

interface ButtonAsAnchor extends BaseProps {
  href: string
  to?: undefined
  type?: undefined
}

type Props = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer focus-ring whitespace-nowrap'

const variants: Record<Variant, string> = {
  solid: 'bg-[var(--accent)] text-[var(--accent-foreground)] hover:brightness-110 active:scale-[0.97] shadow-[var(--shadow-lift)]',
  glass: 'glass text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] active:scale-[0.97]',
  ghost: 'text-[var(--text)] hover:text-[var(--accent)] px-2 py-1',
}

const ButtonCore = forwardRef<HTMLButtonElement, Props>(function ButtonCore(props, ref) {
  const { children, variant = 'solid', className, icon = true, ...rest } = props as ButtonAsButton
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 rtl:-scale-x-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5"
        />
      )}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={clsx(base, variants[variant], className)}>
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={clsx(base, variants[variant], className)} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} className={clsx(base, variants[variant], className)} {...rest}>
      {content}
    </button>
  )
})

export default ButtonCore
