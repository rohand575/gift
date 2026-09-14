// DEV-ONLY in-browser backend backed by localStorage. Stripped from production
// builds (only imported behind import.meta.env.DEV). Mirrors the server rules so
// the budget/exclusive/deadline logic can be felt during local preview.
import { DEMO_BUDGET, DEMO_DEADLINE, demoPrices } from './demoData'
import type { AdminState, AppStatus, GiftApi, PinResult, SelectionResult } from './types'
import { gifts } from '../config/gifts'
import { site } from '../config/site'

const KEY = 'gift-demo-state'
const TOKEN = 'demo-token'

interface DemoState {
  pinHash: string | null
  giftIds: string[]
  history: { createdAt: string; eventType: string; giftIds: string[]; internalTotal: number }[]
  failed: number
}

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { pinHash: null, giftIds: [], history: [], failed: 0 }
}
function save(s: DemoState) {
  localStorage.setItem(KEY, JSON.stringify(s))
}

const isExclusive = (id: string) => gifts.find((g) => g.id === id)?.isExclusive ?? false
const total = (ids: string[]) => ids.reduce((sum, id) => sum + (demoPrices[id] ?? 0), 0)

function normalize(ids: string[]): string[] {
  // If any exclusive gift is present, it stands alone.
  const exclusive = ids.find((id) => isExclusive(id))
  return exclusive ? [exclusive] : ids
}

function isLocked(): boolean {
  const end = new Date(DEMO_DEADLINE + 'T23:59:59')
  return new Date() > end
}

export const demoApi: GiftApi = {
  async hasPin() {
    return load().pinHash !== null
  },

  async createPin(pin, confirm): Promise<PinResult> {
    if (pin !== confirm) return { ok: false, reason: 'mismatch' }
    const s = load()
    s.pinHash = `demo:${pin}`
    save(s)
    return { ok: true, token: TOKEN }
  },

  async verifyPin(pin): Promise<PinResult> {
    const s = load()
    if (s.failed >= 5) return { ok: false, reason: 'locked_out' }
    if (s.pinHash === `demo:${pin}`) {
      s.failed = 0
      save(s)
      return { ok: true, token: TOKEN }
    }
    s.failed += 1
    save(s)
    return { ok: false, reason: 'wrong' }
  },

  async status(): Promise<AppStatus> {
    return { locked: isLocked(), deadline: DEMO_DEADLINE }
  },

  async getSelection(): Promise<SelectionResult> {
    return { ok: true, giftIds: load().giftIds }
  },

  async checkSelection(_token, giftIds): Promise<SelectionResult> {
    if (isLocked()) return { ok: false, giftIds: load().giftIds, reason: 'locked' }
    const next = normalize(giftIds)
    if (total(next) > DEMO_BUDGET) return { ok: false, giftIds, reason: 'exceeds' }
    return { ok: true, giftIds: next }
  },

  async saveSelection(_token, giftIds): Promise<SelectionResult> {
    if (isLocked()) return { ok: false, giftIds: load().giftIds, reason: 'locked' }
    const next = normalize(giftIds)
    if (total(next) > DEMO_BUDGET) return { ok: false, giftIds, reason: 'exceeds' }
    const s = load()
    s.giftIds = next
    s.history.unshift({
      createdAt: new Date().toISOString(),
      eventType: 'save',
      giftIds: next,
      internalTotal: total(next),
    })
    save(s)
    return { ok: true, giftIds: next }
  },

  async adminGetState(password): Promise<AdminState> {
    // Dev convenience password.
    if (password !== 'demo') return { ok: false, reason: 'wrong_password' }
    const s = load()
    return {
      ok: true,
      recipientName: site.recipientName,
      currentGiftIds: s.giftIds,
      internalTotal: total(s.giftIds),
      locked: isLocked(),
      history: s.history,
    }
  },
}
