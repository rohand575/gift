import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'
import { site } from '../config/site'

interface Star {
  left: number
  top: number
  size: number
  delay: number
}

// Subtle twinkling stars. Clicking one reveals a rare, sweet easter-egg message
// (PRD §43) — kept gentle and infrequent.
export default function StarField({ count = 14 }: { count?: number }) {
  const reduced = usePrefersReducedMotion()
  const [message, setMessage] = useState<{ id: number; text: string; x: number; y: number } | null>(
    null,
  )

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 70,
        size: 6 + Math.random() * 8,
        delay: Math.random() * 4,
      })),
    [count],
  )

  const reveal = (e: React.MouseEvent, i: number) => {
    const text = site.easterEggs[i % site.easterEggs.length]
    setMessage({ id: i, text, x: e.clientX, y: e.clientY })
    window.setTimeout(() => setMessage((m) => (m?.id === i ? null : m)), 2600)
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        {stars.map((s, i) => (
          <button
            key={i}
            onClick={(e) => reveal(e, i)}
            className="pointer-events-auto absolute cursor-pointer select-none text-gold/60
              transition-transform hover:scale-125"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              fontSize: s.size,
              animation: reduced ? undefined : `twinkle 4s ease-in-out ${s.delay}s infinite`,
            }}
            aria-label="a little star"
            tabIndex={-1}
          >
            ✦
          </button>
        ))}
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="glass pointer-events-none fixed z-50 rounded-2xl px-4 py-2 text-sm
              italic text-ink-soft shadow-soft"
            style={{
              left: Math.min(message.x, window.innerWidth - 220),
              top: Math.max(message.y - 48, 12),
            }}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
