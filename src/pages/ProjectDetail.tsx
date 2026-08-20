import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import ArchArt from '../components/visuals/ArchArt'
import ProjectCard from '../components/ui/ProjectCard'
import { getProjectBySlug, projects } from '../data/projects'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) return <Navigate to="/projects" replace />

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 2)
  const galleryTiles = [project.seed, project.seed + 101, project.seed + 202]

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <div className="container-page">
        <Reveal>
          <Button to="/projects" variant="ghost" icon={false} className="!px-0">
            <ArrowLeft size={15} className="rtl:-scale-x-100" />
            {t('projects.backToProjects')}
          </Button>
        </Reveal>

        <Reveal delay={0.06} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {t(`projects.filters.${project.category}`)}
            </span>
            <h1 className="font-display mt-3 text-4xl font-medium leading-[1.05] sm:text-6xl">
              {isAr ? project.title.ar : project.title.en}
            </h1>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="container-page mt-10">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] border sm:rounded-[2rem]" style={{ borderColor: 'var(--border)' }}>
          <ArchArt seed={project.seed} palette={project.palette} className="h-full w-full" />
        </div>
      </Reveal>

      <div className="container-page mt-10 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="order-2 space-y-10 lg:order-1">
          <Reveal>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {t('projects.labels.challenge')}
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {isAr ? project.challenge.ar : project.challenge.en}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {t('projects.labels.solution')}
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {isAr ? project.solution.ar : project.solution.en}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
              {t('projects.labels.gallery')}
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {galleryTiles.map((seed) => (
                <div key={seed} className="aspect-square overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <ArchArt seed={seed} palette={project.palette} className="h-full w-full" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="order-1 h-fit glass rounded-3xl p-6 sm:p-7 lg:order-2 lg:sticky lg:top-28">
          <dl className="space-y-5">
            {[
              { label: t('projects.labels.location'), value: isAr ? project.location.ar : project.location.en },
              { label: t('projects.labels.year'), value: project.year },
              { label: t('projects.labels.area'), value: project.area },
              { label: t('projects.labels.client'), value: isAr ? project.client.ar : project.client.en },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0" style={{ borderColor: 'var(--border)' }}>
                <dt className="text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--text-faint)' }}>{row.label}</dt>
                <dd className="text-sm font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
          <Button to="/contact" variant="solid" className="mt-7 w-full justify-center">
            {t('common.getInTouch')}
          </Button>
        </Reveal>
      </div>

      {related.length > 0 && (
        <div className="container-page mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-medium">{t('projects.viewAll')}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} size="grid" />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
