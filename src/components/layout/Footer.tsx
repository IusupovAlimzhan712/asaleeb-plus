import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import Reveal from '../ui/Reveal'
import { InstagramIcon, XIcon, YoutubeIcon, LinkedinIcon } from '../ui/SocialIcons'
import vision2030Png from '../../assets/vision-2030-logo.png'
import vision2030Webp from '../../assets/vision-2030-logo.webp'

const social = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: XIcon, label: 'Twitter / X', href: 'https://twitter.com' },
  { icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
]

const navLinks = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'projects', to: '/projects' },
  { key: 'contact', to: '/contact' },
]

export default function Footer() {
  const { t } = useTranslation()
  const services: string[] = t('services.items', { returnObjects: true }) as unknown as string[]
  const serviceItems = Array.isArray(services) ? services : []

  return (
    <footer className="relative mt-24 overflow-hidden border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="pointer-events-none absolute -top-40 start-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-[0.06] blur-3xl" style={{ background: 'var(--accent)' }} />

      <div className="container-page relative py-16 sm:py-20">
        <Reveal className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="full" />
            <picture>
              <source srcSet={vision2030Webp} type="image/webp" />
              <img
                src={vision2030Png}
                alt="Saudi Vision 2030"
                loading="lazy"
                className="mt-6 h-16 w-auto object-contain opacity-90 sm:h-20"
              />
            </picture>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text-faint)' }}>
              {t('footer.navTitle')}
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <Link to={l.to} className="text-sm transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--text-muted)' }}>
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text-faint)' }}>
              {t('footer.servicesTitle')}
            </h4>
            <ul className="mt-4 space-y-3">
              {serviceItems.map((s: any) => (
                <li key={s.title} className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text-faint)' }}>
              {t('footer.contactTitle')}
            </h4>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li>{t('contact.info.address')}</li>
              <li dir="ltr" className="text-end">
                <a href="tel:+966501082121" className="transition-colors hover:text-[var(--accent)]">
                  {t('contact.info.phone')}
                </a>
              </li>
              <li>
                <a href="mailto:info@asaleebplus.com" className="transition-colors hover:text-[var(--accent)]">
                  {t('contact.info.email')}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full glass transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-ring"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <Link to="/contact" className="group inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--text-muted)' }}>
            {t('common.getInTouch')}
            <ArrowUpRight size={13} className="transition-transform duration-300 rtl:-scale-x-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
