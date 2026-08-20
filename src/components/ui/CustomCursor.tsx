import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 30, stiffness: 350, mass: 0.5 })
  const springY = useSpring(y, { damping: 30, stiffness: 350, mass: 0.5 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    const on = isFine && !reduced
    setEnabled(on)
    document.documentElement.classList.toggle('custom-cursor-active', on)
    return () => document.documentElement.classList.remove('custom-cursor-active')
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [role="button"], input, textarea, select'))
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [enabled, x, y, visible])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ width: hovering ? 44 : 16, height: hovering ? 44 : 16 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="rounded-full"
        style={{ background: '#ffffff' }}
      />
    </motion.div>
  )
}
