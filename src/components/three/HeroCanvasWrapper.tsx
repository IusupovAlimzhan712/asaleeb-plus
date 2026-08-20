import { useEffect, useRef } from 'react'
import HeroScene from './HeroScene'
import CanvasErrorBoundary from './CanvasErrorBoundary'
import ArchArt from '../visuals/ArchArt'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAppStore } from '../../lib/store'

export default function HeroCanvasWrapper() {
  const reduced = useReducedMotion()
  const theme = useAppStore((s) => s.theme)
  const scrollRef = useRef(0)
  const color = theme === 'dark' ? '#e4c66a' : '#9c6a10'

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight || 1
        scrollRef.current = Math.min(1, Math.max(0, window.scrollY / vh))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const fallback = (
    <div className="absolute inset-0 opacity-70">
      <ArchArt seed={4} palette="gold" className="h-full w-full" />
    </div>
  )

  if (reduced) return fallback

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <HeroScene color={color} scrollRef={scrollRef} />
    </CanvasErrorBoundary>
  )
}
