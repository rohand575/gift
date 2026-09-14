import { motion } from 'framer-motion'
import { type GiftDisplay, categories } from '../config/gifts'
import GiftImage from './GiftImage'
import Sparkles from './Sparkles'

// Premium invitation-style gift card (PRD §30). No prices, ever.
export default function GiftCard({
  gift,
  selected,
  justSelected,
  onToggle,
}: {
  gift: GiftDisplay
  selected: boolean
  justSelected: boolean
  onToggle: () => void
}) {
  const cat = categories[gift.category]

  return (
    <motion.button
      layout
      onClick={onToggle}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl text-left
        transition-shadow duration-500
        ${
          selected
            ? 'shadow-glow ring-2 ring-gold'
            : 'shadow-card ring-1 ring-black/5 hover:shadow-glow'
        }`}
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <GiftImage
          src={gift.image}
          alt={gift.title}
          emoji={cat.emoji}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[11px]
          font-medium tracking-wide text-ink-soft backdrop-blur">
          {cat.emoji} {cat.label}
        </span>
        {gift.isExclusive && (
          <span className="absolute right-3 top-3 rounded-full bg-gold-sheen px-3 py-1
            text-[11px] font-medium tracking-wide text-ink shadow-soft">
            A whole adventure ✨
          </span>
        )}
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center
              rounded-full bg-gold text-white shadow-glow"
          >
            ✓
          </motion.span>
        )}
        <Sparkles show={justSelected} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col bg-white/80 p-5 backdrop-blur">
        <h3 className="font-serif text-xl text-ink">{gift.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{gift.description}</p>
        <span
          className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5
            text-sm font-medium tracking-wide transition-all duration-300
            ${
              selected
                ? 'bg-gold text-white'
                : 'border border-gold/40 text-ink-soft group-hover:border-gold group-hover:text-ink'
            }`}
        >
          {selected ? 'Chosen ✨' : 'Choose ✨'}
        </span>
      </div>
    </motion.button>
  )
}
