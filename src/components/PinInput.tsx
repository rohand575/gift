import { useRef, useState, type KeyboardEvent, type ClipboardEvent } from 'react'

// Four individual PIN boxes with auto-advancing focus (PRD §21).
export default function PinInput({
  value,
  onChange,
  onComplete,
  autoFocus = true,
}: {
  value: string
  onChange: (v: string) => void
  onComplete?: (v: string) => void
  autoFocus?: boolean
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const [digits, setDigits] = useState<string[]>(
    () => value.padEnd(4, ' ').slice(0, 4).split('').map((c) => (c === ' ' ? '' : c)),
  )

  const commit = (next: string[]) => {
    setDigits(next)
    const joined = next.join('')
    onChange(joined)
    if (joined.length === 4 && !next.includes('')) onComplete?.(joined)
  }

  const handle = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = d
    commit(next)
    if (d && i < 3) refs.current[i + 1]?.focus()
  }

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!pasted) return
    const next = pasted.padEnd(4, ' ').split('').map((c) => (c === ' ' ? '' : c))
    commit(next)
    refs.current[Math.min(pasted.length, 3)]?.focus()
  }

  return (
    <div className="flex justify-center gap-3">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={digits[i]}
          onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          type="password"
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          aria-label={`PIN digit ${i + 1}`}
          className="h-16 w-14 rounded-2xl border border-gold/40 bg-white/70 text-center
            text-2xl text-ink shadow-soft outline-none transition-all duration-300
            focus:border-gold focus:shadow-glow"
        />
      ))}
    </div>
  )
}
