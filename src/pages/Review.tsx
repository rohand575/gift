import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Progress from '../components/Progress'
import Sealed from '../components/Sealed'
import { categories, giftById } from '../config/gifts'
import { site } from '../config/site'
import { useApp } from '../store/AppContext'

// "Your Little Collection" summary before the final confirmation (PRD §18).
export default function Review() {
  const navigate = useNavigate()
  const { selection, loadSelection, locked } = useApp()

  useEffect(() => {
    loadSelection()
  }, [loadSelection])

  if (locked) return <Sealed />

  // No selection yet → gently guide back.
  if (selection.length === 0) {
    return (
      <PageShell className="justify-center text-center">
        <p className="text-ink-soft">Your little collection is waiting to begin. ✨</p>
        <button className="btn-magic mt-6" onClick={() => navigate('/gifts')}>
          Choose your magic
        </button>
      </PageShell>
    )
  }

  return (
    <PageShell className="justify-start">
      <Progress step={2} />
      <div className="text-center">
        <h1 className="heading-hero gold-text">{site.review.heading}</h1>
        <p className="mt-4 text-base italic text-ink-soft">{site.review.ready}</p>
      </div>

      <div className="mt-10 w-full max-w-lg space-y-4">
        {selection.map((id, i) => {
          const gift = giftById(id)
          if (!gift) return null
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="glass flex items-center gap-4 rounded-2xl px-5 py-4 shadow-soft"
            >
              <span className="text-2xl">{categories[gift.category].emoji}</span>
              <div>
                <p className="font-serif text-lg text-ink">{gift.title}</p>
                <p className="text-xs text-ink-soft">{categories[gift.category].label}</p>
              </div>
            </motion.div>
          )
        })}

        {/* Dinner — always included, never negotiable (PRD §13). */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: selection.length * 0.12 + 0.1 }}
          className="flex items-center gap-4 rounded-2xl border border-gold/40
            bg-gold-sheen/20 px-5 py-4"
        >
          <span className="text-2xl">🍽️</span>
          <div>
            <p className="font-serif text-lg text-ink">{site.review.dinnerLine}</p>
            <p className="text-xs italic text-gold">{site.review.dinnerNote}</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <button className="btn-magic" onClick={() => navigate('/success')}>
          {site.review.cta}
        </button>
        <button className="btn-ghost" onClick={() => navigate('/gifts')}>
          {site.review.back}
        </button>
      </div>
    </PageShell>
  )
}
