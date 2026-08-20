import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  value: string
  suffix?: string
  className?: string
}

export default function Counter({ value, suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const target = parseInt(value.replace(/\D/g, ''), 10) || 0
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 26, stiffness: 90 })
  const [display, setDisplay] = useState(reduced ? target : 0)

  useEffect(() => {
    if (inView) {
      if (reduced) {
        setDisplay(target)
      } else {
        motionValue.set(target)
      }
    }
  }, [inView, target, reduced, motionValue])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
