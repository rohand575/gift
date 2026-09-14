import { useMemo } from 'react'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

interface Particle {
  left: number
  top: number
  size: number
  delay: number
  duration: number
  opacity: number
}

// Soft floating bokeh/particle layer for the ivory background (PRD §4).
export default function Particles({ count = 22 }: { count?: number }) {
  const reduced = usePrefersReducedMotion()
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 10,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 7,
        opacity: 0.15 + Math.random() * 0.4,
      })),
    [count],
  )

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background:
              'radial-gradient(circle at 30% 30%, #ffffff 0%, #e6d3a3 55%, rgba(201,162,75,0) 75%)',
            filter: 'blur(0.5px)',
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
