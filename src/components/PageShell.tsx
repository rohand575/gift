import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import Particles from './Particles'
import StarField from './StarField'
import MusicToggle from './MusicToggle'

// Shared page background + entrance transition. `stars` adds the clickable
// easter-egg starfield (used on landing/success), off by default elsewhere.
export default function PageShell({
  children,
  stars = false,
  className = '',
}: {
  children: ReactNode
  stars?: boolean
  className?: string
}) {
  return (
    <div className="relative min-h-[100dvh] bg-ivory-radial">
      <Particles />
      {stars && <StarField />}
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col
          items-center px-5 py-10 sm:px-8 ${className}`}
      >
        {children}
      </motion.main>
      <MusicToggle />
    </div>
  )
}
