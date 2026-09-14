import { motion } from 'framer-motion'

// A short sparkle burst played when a gift is selected (PRD §16, §30).
export default function Sparkles({ show }: { show: boolean }) {
  if (!show) return null
  const points = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2)

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {points.map((angle, i) => (
        <motion.span
          key={i}
          className="absolute text-gold"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos(angle) * 46,
            y: Math.sin(angle) * 46,
            scale: [0.4, 1, 0.6],
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ fontSize: 12 }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}
