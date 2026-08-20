import { useEffect, useState } from 'react'
import { Link, useLocation, type Location } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Home, Info, Layers, Image, Phone, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import Logo from './Logo'
import Button from '../ui/Button'
import { ThemeToggle, LangToggle } from './ThemeLangToggle'
import { useAppStore } from '../../lib/store'

const links = [
  { key: 'home', to: '/', icon: Home },
  { key: 'about', to: '/about', icon: Info },
  { key: 'services', to: '/#services', icon: Layers },
  { key: 'projects', to: '/projects', icon: Image },
  { key: 'contact', to: '/contact', icon: Phone },
]

function isLinkActive(to: string, location: Location) {
  const [path, hash] = to.split('#')
  if (hash) return location.pathname === (path || '/') && location.hash === `#${hash}`
  return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
}

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const { menuOpen, setMenuOpen } = useAppStore()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash, setMenuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <div
          className={clsx(
            'flex w-full max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5',
            scrolled ? 'glass-strong shadow-[var(--shadow-soft)]' : 'glass'
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.key}
                to={l.to}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 focus-ring',
                  isLinkActive(l.to, location) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                )}
              >
                {t(`nav.${l.key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle className="hidden sm:flex" />
            <ThemeToggle />
            <Button to="/contact" variant="solid" icon={false} className="hidden lg:inline-flex !py-2.5 !px-5 text-xs">
              {t('nav.cta')}
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t('common.closeMenu') : t('common.openMenu')}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full glass cursor-pointer focus-ring lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(8, 6, 4, 0.45)', backdropFilter: 'blur(2px)' }}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong fixed inset-x-4 top-[4.75rem] z-40 overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] sm:top-[5.25rem] lg:hidden"
              style={{ transformOrigin: 'top center' }}
            >
              <nav className="flex flex-col p-2">
                {links.map((l) => {
                  const active = isLinkActive(l.to, location)
                  return (
                    <Link
                      key={l.key}
                      to={l.to}
                      className={clsx(
                        'flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-[0.95rem] font-medium transition-colors duration-200',
                        active ? 'text-[var(--accent)]' : 'text-[var(--text)] hover:bg-[var(--surface)]'
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <l.icon size={17} style={{ color: active ? 'var(--accent)' : 'var(--text-faint)' }} />
                        {t(`nav.${l.key}`)}
                      </span>
                      <ChevronRight size={15} className="opacity-30 rtl:-scale-x-100" />
                    </Link>
                  )
                })}
              </nav>

              <div className="border-t px-4 py-4" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <LangToggle className="flex" />
                  <ThemeToggle />
                  <Button to="/contact" variant="solid" icon={false} className="flex-1 !py-2.5 text-xs">
                    {t('nav.cta')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
