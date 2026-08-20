import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'
import ArchArt from '../visuals/ArchArt'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  project: Project
  size?: 'feature' | 'grid'
}

export default function ProjectCard({ project, size = 'grid' }: Props) {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '6%'])

  const feature = size === 'feature'

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={ref as never}
      className="group relative block w-full overflow-hidden rounded-[1.75rem] border focus-ring sm:rounded-[2rem]"
      style={{
        borderColor: 'var(--border)',
        height: feature ? 'clamp(24rem, 78vh, 46rem)' : 'clamp(20rem, 46vh, 28rem)',
      }}
    >
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 scale-[1.12]">
        <ArchArt seed={project.seed} palette={project.palette} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
        <span className="glass rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white">
          {t(`projects.filters.${project.category}`)}
        </span>
        <span className="glass flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 rtl:group-hover:-translate-x-1 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight size={16} className="text-white rtl:-scale-x-100" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">
          {(isAr ? project.location.ar : project.location.en)} — {project.year}
        </p>
        <h3 className={feature ? 'font-display mt-2 text-3xl font-medium text-white sm:text-5xl' : 'font-display mt-2 text-2xl font-medium text-white sm:text-3xl'}>
          {isAr ? project.title.ar : project.title.en}
        </h3>
        {feature && (
          <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-white/75 sm:block">
            {isAr ? project.summary.ar : project.summary.en}
          </p>
        )}
      </div>
    </Link>
  )
}
