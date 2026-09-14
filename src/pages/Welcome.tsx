import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { site } from '../config/site'
import { useApp } from '../store/AppContext'

// Personal message (PRD §7). The CTA routes into auth, then to the gifts.
export default function Welcome() {
  const navigate = useNavigate()
  const { token, hasPin } = useApp()

  const proceed = () => {
    if (token) navigate('/gifts')
    else if (hasPin) navigate('/login')
    else navigate('/create-pin')
  }

  return (
    <PageShell className="justify-center">
      <motion.div
        className="glass w-full max-w-xl rounded-[2rem] px-8 py-12 text-center shadow-card sm:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">{site.welcome.salutation}</h2>
        <div className="mt-6 space-y-4">
          {site.welcome.body.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.35 }}
              className={
                line.includes('choose it yourself')
                  ? 'font-display text-xl italic text-gold'
                  : 'text-base leading-relaxed text-ink-soft'
              }
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.button
          className="btn-magic mt-10"
          onClick={proceed}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + site.welcome.body.length * 0.35 + 0.3 }}
        >
          {site.welcome.cta}
        </motion.button>
      </motion.div>
    </PageShell>
  )
}
