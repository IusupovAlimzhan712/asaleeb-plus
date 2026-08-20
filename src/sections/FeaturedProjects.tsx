import { useTranslation } from 'react-i18next'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ProjectCard from '../components/ui/ProjectCard'
import { projects } from '../data/projects'

const featured = projects.filter((p) => ['al-nakheel-villa', 'olaya-business-tower', 'diriyah-heritage-residence', 'al-faisaliah-retail-interior'].includes(p.slug))

export default function FeaturedProjects() {
  const { t } = useTranslation()

  return (
    <section className="container-page py-24 sm:py-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow={t('projects.eyebrow')} title={t('projects.title')} subtitle={t('projects.subtitle')} />
        <Reveal delay={0.2}>
          <Button to="/projects" variant="glass" className="shrink-0">
            {t('projects.viewAll')}
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06} className={i === 0 ? 'lg:col-span-2' : ''}>
            <ProjectCard project={p} size={i === 0 ? 'feature' : 'grid'} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
