import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PinInput from '../components/PinInput'
import { site } from '../config/site'
import { useApp } from '../store/AppContext'

// Returning visit: enter the 4-digit PIN (PRD §21).
export default function Login() {
  const navigate = useNavigate()
  const { verifyPin, hasPin } = useApp()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // No PIN yet? Route to first-time creation.
  if (!hasPin) return <Navigate to="/create-pin" replace />;

  const submit = async (value: string) => {
    if (value.length !== 4) return
    setBusy(true)
    setError('')
    const res = await verifyPin(value)
    setBusy(false)
    if (res.ok) {
      navigate('/gifts')
    } else if (res.reason === 'locked_out') {
      setError(site.pin.lockedOut)
    } else {
      setError(site.pin.wrong)
      setPin('')
    }
  }

  return (
    <PageShell className="justify-center text-center">
      <motion.div
        className="glass w-full max-w-md rounded-[2rem] px-8 py-12 shadow-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-serif text-3xl text-ink">{site.pin.returnTitle}</h2>
        <p className="mt-3 text-sm text-ink-soft">{site.pin.returnSubtitle}</p>

        <div className="mt-10">
          <PinInput value={pin} onChange={setPin} onComplete={submit} />
        </div>

        {error && <p className="mt-6 text-sm italic text-blush-deep">{error}</p>}

        <button
          className="btn-magic mt-10 disabled:opacity-50"
          onClick={() => submit(pin)}
          disabled={busy || pin.length !== 4}
        >
          {busy ? 'A little magic…' : 'Enter ✨'}
        </button>
      </motion.div>
    </PageShell>
  )
}
