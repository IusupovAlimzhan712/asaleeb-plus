import Hero from '../sections/Hero'
import Marquee from '../components/ui/Marquee'
import AboutTeaser from '../sections/AboutTeaser'
import Stats from '../sections/Stats'
import Services from '../sections/Services'
import FeaturedProjects from '../sections/FeaturedProjects'
import Process from '../sections/Process'
import Testimonials from '../sections/Testimonials'
import CtaBanner from '../sections/CtaBanner'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutTeaser />
      <Stats />
      <Services />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
