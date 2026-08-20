import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  color: string
  scrollRef: React.MutableRefObject<number>
}

const SHAPES = [
  { type: 'box', pos: [1.4, 0.4, -0.6], scale: 1.15, speed: 0.06 },
  { type: 'octa', pos: [-1.9, -0.5, -1.4], scale: 0.85, speed: -0.09 },
  { type: 'icosa', pos: [0.3, 1.3, -2.2], scale: 0.62, speed: 0.11 },
  { type: 'box', pos: [-1.1, 1.1, -0.2], scale: 0.5, speed: -0.14 },
  { type: 'torus', pos: [2.1, -1.0, -1.9], scale: 0.7, speed: 0.08 },
  { type: 'octa', pos: [0.9, -1.4, -0.7], scale: 0.42, speed: -0.18 },
  { type: 'box', pos: [-2.3, 0.3, -2.6], scale: 0.9, speed: 0.05 },
] as const

function Shape({ def, color, index }: { def: (typeof SHAPES)[number]; color: string; index: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * def.speed
    ref.current.rotation.y += delta * def.speed * 0.7
  })

  const geometry = useMemo(() => {
    switch (def.type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />
      case 'octa':
        return <octahedronGeometry args={[0.9, 0]} />
      case 'icosa':
        return <icosahedronGeometry args={[0.9, 0]} />
      case 'torus':
        return <torusGeometry args={[0.7, 0.22, 8, 24]} />
    }
  }, [def.type])

  return (
    <mesh ref={ref} position={def.pos as unknown as [number, number, number]} scale={def.scale} rotation={[index, index * 0.6, 0]}>
      {geometry}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  )
}

function SitePlanGrid({ color }: { color: string }) {
  const points = useMemo(() => {
    const lines: [number, number, number][][] = []
    const size = 10
    const step = 1
    for (let i = -size; i <= size; i += step) {
      lines.push([
        [i, 0, -size],
        [i, 0, size],
      ])
      lines.push([
        [-size, 0, i],
        [size, 0, i],
      ])
    }
    return lines
  }, [])

  return (
    <group position={[0, -2.6, -1]} rotation={[0, 0, 0]}>
      {points.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array(pts.flat()), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={0.06} />
        </line>
      ))}
    </group>
  )
}

function Scene({ color, scrollRef }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  useFrame((state) => {
    pointer.current.x = state.pointer.x
    pointer.current.y = state.pointer.y
    if (!group.current) return
    const targetRotY = pointer.current.x * 0.25
    const targetRotX = -pointer.current.y * 0.15
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.04
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.04

    const progress = scrollRef.current
    group.current.position.y = progress * -1.4
    const scale = 1 - progress * 0.18
    group.current.scale.setScalar(Math.max(0.7, scale))
  })

  const mobile = size.width < 640

  return (
    <group ref={group} scale={mobile ? 0.72 : 1}>
      {SHAPES.map((def, i) => (
        <Shape key={i} def={def} color={color} index={i} />
      ))}
      <SitePlanGrid color={color} />
      <Sparkles count={70} scale={[8, 5, 6]} size={2.4} speed={0.25} color={color} opacity={0.5} />
    </group>
  )
}

export default function HeroScene({ color, scrollRef }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <Scene color={color} scrollRef={scrollRef} />
      </Suspense>
    </Canvas>
  )
}
