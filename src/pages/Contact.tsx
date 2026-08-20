import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import GoogleMapEmbed from '../components/visuals/GoogleMapEmbed'
import clsx from 'clsx'

interface FormState {
  name: string
  email: string
  phone: string
  projectType: string
  message: string
}

const initialState: FormState = { name: '', email: '', phone: '', projectType: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const options = t('contact.form.projectTypeOptions', { returnObjects: true }) as unknown as string[]

  const infoItems = [
    { icon: MapPin, label: t('contact.info.addressLabel'), value: t('contact.info.address') },
    { icon: Phone, label: t('contact.info.phoneLabel'), value: t('contact.info.phone'), dir: 'ltr' as const },
    { icon: Mail, label: t('contact.info.emailLabel'), value: t('contact.info.email') },
    { icon: Clock, label: t('contact.info.hoursLabel'), value: t('contact.info.hours') },
  ]

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = t('contact.form.errorRequired')
    if (!form.email.trim()) next.email = t('contact.form.errorRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('contact.form.errorEmail')
    if (!form.message.trim()) next.message = t('contact.form.errorRequired')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setForm(initialState)
    }, 900)
  }

  function field<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const inputClass =
    'w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]'

  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>
            <span className="h-px w-6" style={{ background: 'var(--accent)' }} />
            {t('contact.eyebrow')}
          </span>
          <h1 className="font-display mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl">{t('contact.title')}</h1>
          <p className="mt-5 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('contact.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal delay={0.08} className="space-y-6">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border" style={{ borderColor: 'var(--border)' }}>
              <GoogleMapEmbed className="h-full w-full" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {infoItems.map((item) => (
                <div key={item.label} className="glass rounded-2xl p-5">
                  <item.icon size={17} style={{ color: 'var(--accent)' }} />
                  <p className="mt-3 text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>{item.label}</p>
                  <p className="mt-1 text-sm font-medium" dir={item.dir}>{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            {status === 'success' ? (
              <div className="glass flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl p-10 text-center">
                <CheckCircle2 size={40} style={{ color: 'var(--accent)' }} />
                <p className="font-display mt-5 text-2xl font-medium">{t('contact.form.success')}</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 cursor-pointer text-sm font-medium underline underline-offset-4"
                  style={{ color: 'var(--accent)' }}
                >
                  {t('common.getInTouch')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="glass space-y-5 rounded-3xl p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                      {t('contact.form.name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => field('name', e.target.value)}
                      placeholder={t('contact.form.namePlaceholder')}
                      className={inputClass}
                      style={{ borderColor: errors.name ? 'var(--danger)' : 'var(--border)' }}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="mt-1.5 text-xs" style={{ color: 'var(--danger)' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => field('email', e.target.value)}
                      placeholder={t('contact.form.emailPlaceholder')}
                      dir="ltr"
                      className={clsx(inputClass, 'text-end')}
                      style={{ borderColor: errors.email ? 'var(--danger)' : 'var(--border)' }}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="mt-1.5 text-xs" style={{ color: 'var(--danger)' }}>{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                      {t('contact.form.phone')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => field('phone', e.target.value)}
                      placeholder={t('contact.form.phonePlaceholder')}
                      dir="ltr"
                      className={clsx(inputClass, 'text-end')}
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                      {t('contact.form.projectType')}
                    </label>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={(e) => field('projectType', e.target.value)}
                      className={inputClass}
                      style={{ borderColor: 'var(--border)', color: form.projectType ? 'var(--text)' : 'var(--text-faint)' }}
                    >
                      <option value="" style={{ color: 'initial' }}>{t('contact.form.projectTypePlaceholder')}</option>
                      {Array.isArray(options) &&
                        options.map((opt) => (
                          <option key={opt} value={opt} style={{ color: 'initial' }}>{opt}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => field('message', e.target.value)}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className={clsx(inputClass, 'resize-none')}
                    style={{ borderColor: errors.message ? 'var(--danger)' : 'var(--border)' }}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <p id="message-error" className="mt-1.5 text-xs" style={{ color: 'var(--danger)' }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full cursor-pointer rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
