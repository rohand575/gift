import { motion } from 'framer-motion'
import PageShell from './PageShell'
import { site } from '../config/site'

// Shown after the selection deadline has passed (PRD §23).
export default function Sealed() {
  return (
    <PageShell stars className="justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="mb-6 text-5xl">✨</div>
        <h1 className="heading-hero gold-text">{site.sealed.title}</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft">
          {site.sealed.body}
        </p>
      </motion.div>
    </PageShell>
  )
}
