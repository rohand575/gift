import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { site } from '../config/site'

// Cinematic opening (PRD §6): kicker → whispered lines → main heading → CTA.
export default function Landing() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 1400),
      window.setTimeout(() => setPhase(2), 3000),
      window.setTimeout(() => setPhase(3), 4600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <PageShell stars className="justify-center text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-6 text-sm uppercase tracking-[0.35em] text-gold"
      >
        {site.landing.kicker}
      </motion.p>

      <div className="mb-8 min-h-[3.5rem] space-y-2">
        {site.landing.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 8 }}
            animate={phase > i ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="font-display text-lg italic text-ink-soft sm:text-xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="heading-hero gold-text"
      >
        {site.landing.heading}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft"
      >
        {site.landing.subheading}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10"
      >
        <button className="btn-magic text-base" onClick={() => navigate('/welcome')}>
          {site.landing.cta}
        </button>
      </motion.div>
    </PageShell>
  )
}
