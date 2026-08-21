import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../lib/store'
import clsx from 'clsx'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useAppStore()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('common.themeLight') : t('common.themeDark')}
      title={isDark ? t('common.themeLight') : t('common.themeDark')}
      className={clsx(
        'relative flex h-11 w-11 items-center justify-center rounded-full glass cursor-pointer transition-colors duration-300 hover:border-[var(--accent)] focus-ring',
        className
      )}
    >
      <Sun size={17} className={clsx('absolute transition-all duration-300', isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100')} style={{ color: 'var(--accent)' }} />
      <Moon size={16} className={clsx('absolute transition-all duration-300', isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0')} style={{ color: 'var(--accent)' }} />
    </button>
  )
}

export function LangToggle({ className }: { className?: string }) {
  const { lang, toggleLang } = useAppStore()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('common.language')}
      title={t('common.language')}
      className={clsx(
        'relative flex h-11 items-center justify-center rounded-full glass cursor-pointer px-3.5 text-xs font-semibold tracking-wide transition-colors duration-300 hover:border-[var(--accent)] focus-ring',
        className
      )}
    >
      <span className={clsx(lang === 'ar' ? 'text-[var(--accent)]' : 'text-[var(--text-faint)]')}>ع</span>
      <span className="mx-1.5 h-3 w-px" style={{ background: 'var(--border-strong)' }} />
      <span className={clsx(lang === 'en' ? 'text-[var(--accent)]' : 'text-[var(--text-faint)]')}>EN</span>
    </button>
  )
}
