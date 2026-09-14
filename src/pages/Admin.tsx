import { useState } from 'react'
import { getApi, isDemoMode } from '../lib/api'
import { giftById } from '../config/gifts'
import type { AdminState } from '../lib/types'

// Private admin dashboard (PRD §25). Password verified server-side; this is the
// only place internal totals are ever shown. Reached via the secret /admin URL.
export default function Admin() {
  const [password, setPassword] = useState('')
  const [state, setState] = useState<AdminState | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setBusy(true)
    setError('')
    const api = await getApi()
    const res = await api.adminGetState(password)
    setBusy(false)
    if (res.ok) setState(res)
    else setError(res.reason === 'wrong_password' ? 'Wrong password.' : 'Something went wrong.')
  }

  const names = (ids?: string[]) =>
    (ids ?? []).map((id) => giftById(id)?.title ?? id).join(', ') || '—'

  if (!state) {
    return (
      <div className="mx-auto flex min-h-[100dvh] max-w-sm flex-col justify-center px-6">
        <h1 className="font-serif text-2xl text-ink">Admin</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {isDemoMode ? 'Demo mode — password is "demo".' : 'Enter the admin password.'}
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && load()}
          placeholder="Password"
          className="mt-4 rounded-xl border border-gold/40 bg-white px-4 py-3 outline-none
            focus:border-gold"
        />
        {error && <p className="mt-3 text-sm text-blush-deep">{error}</p>}
        <button className="btn-magic mt-5" onClick={load} disabled={busy || !password}>
          {busy ? 'Checking…' : 'Enter'}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-[100dvh] max-w-2xl px-6 py-12">
      <h1 className="font-serif text-3xl text-ink">
        {state.recipientName}&rsquo;s selection
      </h1>

      <div className="mt-6 rounded-2xl border border-gold/30 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-soft">Status</span>
          <span className={state.locked ? 'text-blush-deep' : 'text-gold'}>
            {state.locked ? 'Locked (deadline passed)' : 'Active'}
          </span>
        </div>
        <div className="mt-3">
          <span className="text-sm text-ink-soft">Current selection</span>
          <p className="mt-1 font-medium text-ink">{names(state.currentGiftIds)}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-ink-soft">Internal total</span>
          <span className="font-serif text-xl text-ink">€{state.internalTotal ?? 0}</span>
        </div>
        <p className="mt-1 text-xs text-ink-soft/60">Dinner included · €0</p>
      </div>

      <h2 className="mt-10 font-serif text-xl text-ink">History</h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Selection</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {(state.history ?? []).map((ev, i) => (
              <tr key={i} className="border-t border-black/5 bg-white">
                <td className="px-4 py-3 text-ink-soft">
                  {new Date(ev.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-ink">{names(ev.giftIds)}</td>
                <td className="px-4 py-3 text-right text-ink">€{ev.internalTotal}</td>
              </tr>
            ))}
            {(state.history ?? []).length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-ink-soft">
                  No changes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
