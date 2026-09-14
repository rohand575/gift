import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import PinInput from '../components/PinInput'
import { site } from '../config/site'
import { useApp } from '../store/AppContext'

// First visit: create a 4-digit PIN with confirmation (PRD §20).
export default function CreatePin() {
  const navigate = useNavigate()
  const { createPin, hasPin } = useApp()
  const [pin, setPin] = useState('')
  const [confirm, setConfirm] = useState('')
  const [step, setStep] = useState<'pin' | 'confirm'>('pin')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // If a PIN already exists, this is a returning visit — send to login.
  if (hasPin) return <Navigate to="/login" replace />;

  const submit = async () => {
    setError('')
    if (pin.length !== 4) return
    if (confirm.length !== 4) return
    setBusy(true)
    const res = await createPin(pin, confirm)
    setBusy(false)
    if (res.ok) {
      navigate('/gifts')
    } else if (res.reason === 'mismatch') {
      setError(site.pin.mismatch)
      setConfirm('')
      setStep('confirm')
    } else {
      setError('Something went a little sideways. Try once more. ✨')
    }
  }

  return (
    <PageShell className="justify-center text-center">
      <motion.div
        className="glass w-full max-w-md rounded-[2rem] px-8 py-12 shadow-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-serif text-3xl text-ink">{site.pin.createTitle}</h2>
        <p className="mx-auto mt-3 max-w-xs text-sm text-ink-soft">{site.pin.createSubtitle}</p>

        <div className="mt-10 space-y-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink-soft/70">
              Your secret
            </p>
            <PinInput
              value={pin}
              onChange={setPin}
              onComplete={() => setStep('confirm')}
            />
          </div>

          {step === 'confirm' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink-soft/70">
                Once more
              </p>
              <PinInput
                value={confirm}
                onChange={setConfirm}
                onComplete={submit}
                autoFocus
              />
            </motion.div>
          )}
        </div>

        {error && <p className="mt-6 text-sm italic text-blush-deep">{error}</p>}

        <button
          className="btn-magic mt-10 disabled:opacity-50"
          onClick={step === 'pin' ? () => setStep('confirm') : submit}
          disabled={busy || pin.length !== 4 || (step === 'confirm' && confirm.length !== 4)}
        >
          {busy ? 'Sealing your secret…' : step === 'pin' ? 'Continue' : 'Save my PIN ✨'}
        </button>
      </motion.div>
    </PageShell>
  )
}
