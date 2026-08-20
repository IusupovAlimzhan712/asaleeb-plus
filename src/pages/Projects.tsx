import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Reveal from '../components/ui/Reveal'
import ProjectCard from '../components/ui/ProjectCard'
import { projects, type ProjectCategory } from '../data/projects'
import clsx from 'clsx'

const CATEGORIES: (ProjectCategory | 'all')[] = ['all', 'residential', 'commercial', 'interior', 'cultural']

export default function Projects() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')

  const filtered = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)), [filter])

  return (
    <section className="container-page pb-24 pt-36 sm:pt-44">
      <Reveal className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--accent)' }}>
          <span className="h-px w-6" style={{ background: 'var(--accent)' }} />
          {t('projects.eyebrow')}
        </span>
        <h1 className="font-display mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl">{t('projects.title')}</h1>
        <p className="mt-5 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('projects.subtitle')}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={clsx(
              'cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-ring',
              filter === cat ? 'text-[var(--accent-foreground)]' : 'glass hover:border-[var(--accent)]'
            )}
            style={filter === cat ? { background: 'var(--accent)' } : undefined}
          >
            {t(`projects.filters.${cat}`)}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.04 }}>
            <ProjectCard project={p} size="grid" />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          —
        </p>
      )}
    </section>
  )
}
