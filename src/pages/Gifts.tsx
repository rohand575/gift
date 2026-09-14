import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Progress from '../components/Progress'
import GiftCard from '../components/GiftCard'
import Modal from '../components/Modal'
import Sealed from '../components/Sealed'
import { categories, gifts, giftById, type GiftCategory } from '../config/gifts'
import { site } from '../config/site'
import { useApp } from '../store/AppContext'

const ORDER: GiftCategory[] = ['keep', 'use', 'experience', 'go']

export default function Gifts() {
  const navigate = useNavigate()
  const { locked, selection, loadSelection, checkSelection, saveSelection } = useApp()

  const [draft, setDraft] = useState<string[]>(selection)
  const [justSelected, setJustSelected] = useState<string | null>(null)
  const [tooMuch, setTooMuch] = useState(false)
  const [pendingExclusive, setPendingExclusive] = useState<string | null>(null)
  const [dinnerShown, setDinnerShown] = useState(false)
  const [showDinner, setShowDinner] = useState(false)
  const [busy, setBusy] = useState(false)

  // Load any previously saved selection once.
  useEffect(() => {
    loadSelection()
  }, [loadSelection])
  useEffect(() => {
    setDraft(selection)
  }, [selection])

  const grouped = useMemo(
    () => ORDER.map((cat) => ({ cat, items: gifts.filter((g) => g.category === cat) })),
    [],
  )

  const burst = (id: string) => {
    setJustSelected(id)
    window.setTimeout(() => setJustSelected((v) => (v === id ? null : v)), 800)
  }

  // Cute one-time dinner reveal on the very first pick (PRD §13).
  const maybeRevealDinner = () => {
    if (!dinnerShown) {
      setDinnerShown(true)
      setShowDinner(true)
    }
  }

  const applyDraft = async (next: string[]) => {
    const res = await checkSelection(next)
    if (res.ok) {
      setDraft(res.giftIds)
      return true
    }
    if (res.reason === 'exceeds') setTooMuch(true)
    return false
  }

  const toggle = async (id: string) => {
    const gift = giftById(id)
    if (!gift) return
    const isSelected = draft.includes(id)

    if (isSelected) {
      setDraft(draft.filter((g) => g !== id))
      return
    }

    // Selecting an exclusive "whole adventure" gift → confirm first.
    if (gift.isExclusive) {
      setPendingExclusive(id)
      return
    }

    const ok = await applyDraft([...draft, id])
    if (ok) {
      burst(id)
      maybeRevealDinner()
    }
  }

  const confirmExclusive = async () => {
    if (!pendingExclusive) return
    const id = pendingExclusive
    setPendingExclusive(null)
    const ok = await applyDraft([id])
    if (ok) {
      burst(id)
      maybeRevealDinner()
    }
  }

  const proceed = async () => {
    if (draft.length === 0) return
    setBusy(true)
    const res = await saveSelection(draft)
    setBusy(false)
    if (res.ok) navigate('/review')
    else if (res.reason === 'exceeds') setTooMuch(true)
  }

  if (locked) return <Sealed />

  return (
    <PageShell className="justify-start">
      <Progress step={1} />

      <div className="text-center">
        <h1 className="heading-hero gold-text">{site.gifts.heading}</h1>
        <p className="mx-auto mt-4 max-w-md text-base italic text-ink-soft">
          {site.gifts.subheading}
        </p>
        <p className="mt-2 text-sm text-ink-soft/70">
          {draft.length === 0
            ? site.gifts.hintSingle
            : draft.length === 1
              ? site.gifts.hintSelected
              : site.gifts.hintMultiple}
        </p>
      </div>

      <div className="mt-10 w-full space-y-14">
        {grouped.map(({ cat, items }) => (
          <section key={cat}>
            <h2 className="mb-5 text-center font-display text-2xl text-ink">
              {categories[cat].emoji} {categories[cat].label}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  selected={draft.includes(gift.id)}
                  justSelected={justSelected === gift.id}
                  onToggle={() => toggle(gift.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating confirm bar */}
      <div className="sticky bottom-5 z-20 mt-14 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto flex max-w-md items-center justify-between gap-4 rounded-full
            px-6 py-3 shadow-card"
        >
          <span className="text-sm text-ink-soft">
            {draft.length === 0 ? 'Choose your magic…' : `${draft.length} chosen ✨`}
          </span>
          <button
            className="btn-magic px-6 py-2.5 text-sm disabled:opacity-40"
            onClick={proceed}
            disabled={draft.length === 0 || busy}
          >
            {busy ? 'A little magic…' : site.gifts.cta}
          </button>
        </motion.div>
      </div>

      {/* "Too much magic" — no numbers, ever (PRD §17). */}
      <Modal open={tooMuch} onClose={() => setTooMuch(false)}>
        <div className="text-4xl">✨</div>
        <h3 className="mt-4 font-serif text-2xl text-ink">{site.gifts.tooMuchMagic.title}</h3>
        <p className="mt-3 text-sm text-ink-soft">{site.gifts.tooMuchMagic.body}</p>
        <button className="btn-ghost mt-8" onClick={() => setTooMuch(false)}>
          Okay ✨
        </button>
      </Modal>

      {/* Exclusive "whole adventure" confirmation (PRD §15). */}
      <Modal open={pendingExclusive !== null} onClose={() => setPendingExclusive(null)}>
        <div className="text-4xl">✨</div>
        <h3 className="mt-4 font-serif text-2xl text-ink">
          {site.gifts.exclusiveConfirm.title}
        </h3>
        <p className="mt-3 text-sm text-ink-soft">{site.gifts.exclusiveConfirm.body}</p>
        <div className="mt-8 flex flex-col gap-3">
          <button className="btn-magic" onClick={confirmExclusive}>
            {site.gifts.exclusiveConfirm.confirm}
          </button>
          <button className="btn-ghost" onClick={() => setPendingExclusive(null)}>
            {site.gifts.exclusiveConfirm.cancel}
          </button>
        </div>
      </Modal>

      {/* Dinner reveal moment (PRD §13). */}
      <Modal open={showDinner} onClose={() => setShowDinner(false)}>
        <div className="text-4xl">🍽️</div>
        <h3 className="mt-4 font-serif text-2xl text-ink">{site.dinnerReveal.title}</h3>
        <p className="mt-3 font-display text-2xl italic text-gold">{site.dinnerReveal.body}</p>
        <p className="mt-2 text-sm text-ink-soft">{site.dinnerReveal.note}</p>
        <button className="btn-magic mt-8" onClick={() => setShowDinner(false)}>
          ❤️
        </button>
      </Modal>
    </PageShell>
  )
}
