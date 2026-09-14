import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell'
import { site } from '../config/site'
import { giftById, categories } from '../config/gifts'
import { useApp } from '../store/AppContext'

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  const ms = target.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

// Final confirmation experience (PRD §19, §45) with a gentle birthday countdown.
export default function Success() {
  const { selection, loadSelection } = useApp()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    loadSelection()
  }, [loadSelection])

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 900),
      window.setTimeout(() => setPhase(2), 2400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const countdown = useMemo(() => daysUntil(site.dates.birthday), [])

  return (
    <PageShell stars className="justify-center text-center">
      {/* Selected gifts float upward */}
      <div className="mb-8 flex items-center justify-center gap-3">
        {selection.map((id, i) => {
          const gift = giftById(id)
          if (!gift) return null
          return (
            <motion.span
              key={id}
              initial={{ opacity: 0, y: 30, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 18 }}
              className="text-4xl"
            >
              {categories[gift.category].emoji}
            </motion.span>
          )
        })}
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="heading-hero gold-text"
      >
        {site.success.heading}
      </motion.h1>

      <div className="mt-6 space-y-2">
        {site.success.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.4 }}
            className="text-base leading-relaxed text-ink-soft"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="mt-8 font-display text-2xl italic text-gold"
      >
        {site.success.closing}
      </motion.p>

      {/* Milestones + gentle countdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="glass mt-10 flex flex-col items-center gap-2 rounded-3xl px-8 py-6 shadow-soft"
      >
        <p className="text-sm text-ink-soft">Graduation · 15 October 2026 🎓</p>
        <p className="text-sm text-ink-soft">Birthday · 9 November 2026 🎂</p>
        {countdown > 0 && (
          <p className="mt-2 font-serif text-xl text-ink">
            {countdown} {countdown === 1 ? 'day' : 'days'} until your birthday ✨
          </p>
        )}
      </motion.div>

      <p className="mt-10 font-display text-lg italic text-ink-soft">{site.success.footer}</p>
    </PageShell>
  )
}
