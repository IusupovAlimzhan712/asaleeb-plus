import { useMemo, useId } from 'react'
import { mulberry32, range } from '../../lib/prng'

export type ArtPalette = 'ink' | 'gold' | 'clay' | 'stone'

const PALETTES: Record<ArtPalette, { from: string; to: string; line: string; fill: string; sun: string }> = {
  ink: { from: '#1a1712', to: '#0b0a08', line: '#df7843', fill: '#22201b', sun: '#f0a878' },
  gold: { from: '#3a2213', to: '#140a06', line: '#f1a874', fill: '#4a2b19', sun: '#f6c9a0' },
  clay: { from: '#4a2f21', to: '#1c130d', line: '#e2925a', fill: '#5c3c29', sun: '#f3b98a' },
  stone: { from: '#3a362f', to: '#161410', line: '#cbb49c', fill: '#46423a', sun: '#e8dcc8' },
}

interface Props {
  seed: number
  palette?: ArtPalette
  className?: string
}

/** Procedurally generated architectural line-art used as an image placeholder — deterministic per seed. */
export default function ArchArt({ seed, palette = 'ink', className }: Props) {
  const uid = useId().replace(/:/g, '')
  const colors = PALETTES[palette]
  const W = 1200
  const H = 800

  const scene = useMemo(() => {
    const rand = mulberry32(seed * 9973 + 17)
    const buildingCount = Math.floor(range(rand, 4, 7))
    const baseline = H * range(rand, 0.62, 0.72)
    let cursor = -40
    const buildings = []
    for (let i = 0; i < buildingCount; i++) {
      const w = range(rand, 90, 210)
      const h = range(rand, H * 0.14, H * 0.5)
      const hasRoofSlant = rand() > 0.55
      const windowRows = Math.floor(range(rand, 2, 6))
      const windowCols = Math.floor(range(rand, 2, 5))
      buildings.push({ x: cursor, w, h, hasRoofSlant, windowRows, windowCols, key: i })
      cursor += w * range(rand, 0.72, 0.95)
    }
    const sun = { cx: range(rand, W * 0.62, W * 0.9), cy: range(rand, H * 0.14, H * 0.3), r: range(rand, 46, 90) }
    const contourCount = Math.floor(range(rand, 2, 4))
    const contours = Array.from({ length: contourCount }, (_, i) => {
      const y = baseline + 30 + i * range(rand, 26, 46)
      const amp = range(rand, 14, 30)
      const p1 = `M -20 ${y} Q ${W * 0.25} ${y - amp} ${W * 0.5} ${y} T ${W + 20} ${y}`
      return p1
    })
    const gridLines = Array.from({ length: 6 }, (_, i) => (H / 6) * i)
    const dimY = baseline + range(rand, 90, 130)
    return { buildings, sun, contours, gridLines, dimY, baseline }
  }, [seed])

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.from} />
          <stop offset="100%" stopColor={colors.to} />
        </linearGradient>
        <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#bg-${uid})`} />

      {/* blueprint grid */}
      <g stroke={colors.line} strokeOpacity="0.08" strokeWidth="1">
        {scene.gridLines.map((y, i) => (
          <line key={i} x1="0" y1={y} x2={W} y2={y} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v${i}`} x1={(W / 10) * i} y1="0" x2={(W / 10) * i} y2={H} />
        ))}
      </g>

      {/* sun / site marker */}
      <circle cx={scene.sun.cx} cy={scene.sun.cy} r={scene.sun.r} fill="none" stroke={colors.sun} strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx={scene.sun.cx} cy={scene.sun.cy} r={scene.sun.r * 0.55} fill={colors.sun} fillOpacity="0.12" />

      {/* contour / terrain lines */}
      <g stroke={colors.line} strokeOpacity="0.14" strokeWidth="1.5" fill="none">
        {scene.contours.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* skyline massing */}
      <g>
        {scene.buildings.map((b) => {
          const y = scene.baseline - b.h
          const windows = []
          const padX = b.w * 0.16
          const padY = b.h * 0.12
          const cellW = (b.w - padX * 2) / b.windowCols
          const cellH = (b.h - padY * 2) / b.windowRows
          for (let r = 0; r < b.windowRows; r++) {
            for (let c = 0; c < b.windowCols; c++) {
              windows.push(
                <rect
                  key={`${r}-${c}`}
                  x={b.x + padX + c * cellW + cellW * 0.18}
                  y={y + padY + r * cellH + cellH * 0.18}
                  width={cellW * 0.64}
                  height={cellH * 0.64}
                  fill={colors.sun}
                  fillOpacity="0.1"
                />
              )
            }
          }
          return (
            <g key={b.key}>
              <polygon
                points={
                  b.hasRoofSlant
                    ? `${b.x},${y + 24} ${b.x + b.w * 0.5},${y} ${b.x + b.w},${y + 24} ${b.x + b.w},${scene.baseline} ${b.x},${scene.baseline}`
                    : `${b.x},${y} ${b.x + b.w},${y} ${b.x + b.w},${scene.baseline} ${b.x},${scene.baseline}`
                }
                fill={colors.fill}
                fillOpacity="0.55"
                stroke={colors.line}
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              {windows}
            </g>
          )
        })}
        <line x1="0" y1={scene.baseline} x2={W} y2={scene.baseline} stroke={colors.line} strokeOpacity="0.3" strokeWidth="1.5" />
      </g>

      {/* dimension line, drafting flourish */}
      <g stroke={colors.line} strokeOpacity="0.28" strokeWidth="1">
        <line x1={W * 0.08} y1={scene.dimY} x2={W * 0.4} y2={scene.dimY} />
        <line x1={W * 0.08} y1={scene.dimY - 8} x2={W * 0.08} y2={scene.dimY + 8} />
        <line x1={W * 0.4} y1={scene.dimY - 8} x2={W * 0.4} y2={scene.dimY + 8} />
      </g>

      <rect width={W} height={H} fill={`url(#fade-${uid})`} />
    </svg>
  )
}
