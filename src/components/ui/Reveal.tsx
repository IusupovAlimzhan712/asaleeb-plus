import { motion, type Variants } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  y?: number
  once?: boolean
  as?: 'div' | 'span' | 'li'
}

export default function Reveal({ children, className, style, delay = 0, y = 28, once = true, as = 'div' }: Props) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: '-40px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
