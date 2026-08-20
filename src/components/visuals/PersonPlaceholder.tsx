import { useId, useMemo } from 'react'
import { mulberry32, range } from '../../lib/prng'

interface Props {
  name: string
  seed: number
  className?: string
}

/** Monogram-style avatar placeholder — used in place of real portraits for this demo. */
export default function PersonPlaceholder({ name, seed, className }: Props) {
  const uid = useId().replace(/:/g, '')
  const initial = name.trim().charAt(0)

  const rings = useMemo(() => {
    const rand = mulberry32(seed * 733 + 5)
    return Array.from({ length: 4 }, (_, i) => ({
      r: 40 + i * range(rand, 22, 30),
      dash: rand() > 0.5,
      opacity: range(rand, 0.05, 0.16),
    }))
  }, [seed])

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`p-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--bg-elevated-2)" />
          <stop offset="100%" stopColor="var(--bg-elevated)" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#p-${uid})`} />
      <g stroke="var(--accent)" fill="none">
        {rings.map((r, i) => (
          <circle key={i} cx="200" cy="200" r={r.r} strokeOpacity={r.opacity} strokeWidth="1" strokeDasharray={r.dash ? '4 6' : undefined} />
        ))}
      </g>
      <text
        x="200"
        y="228"
        textAnchor="middle"
        fontSize="130"
        fontFamily="var(--font-display)"
        fill="var(--accent)"
        fillOpacity="0.85"
      >
        {initial}
      </text>
    </svg>
  )
}
