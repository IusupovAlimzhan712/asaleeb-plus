import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="container-page flex min-h-[80vh] flex-col items-center justify-center py-40 text-center">
      <p className="font-display text-[length:var(--fs-404)]" style={{ color: 'var(--accent)' }}>404</p>
      <h1 className="font-display mt-4 text-3xl font-medium">{t('common.notFoundTitle')}</h1>
      <p className="mt-3 max-w-md text-sm" style={{ color: 'var(--text-muted)' }}>
        {t('common.notFoundBody')}
      </p>
      <Button to="/" variant="solid" className="mt-8">
        {t('common.backHome')}
      </Button>
    </section>
  )
}
