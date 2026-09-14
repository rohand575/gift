import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type {
  AdminState,
  AppStatus,
  GiftApi,
  PinResult,
  SelectionResult,
} from './types'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const hasSupabase = Boolean(url && anonKey)

let client: SupabaseClient | null = null
function db(): SupabaseClient {
  if (!client) client = createClient(url!, anonKey!, { auth: { persistSession: false } })
  return client
}

// Every server-side rule (budget, deadline, PIN, prices) lives in these RPCs.
// The client only ever receives sanitized results — never prices or totals.
export const supabaseApi: GiftApi = {
  async hasPin() {
    const { data } = await db().rpc('app_has_pin')
    return Boolean(data)
  },

  async createPin(pin, confirm) {
    if (pin !== confirm) return { ok: false, reason: 'mismatch' }
    const { data, error } = await db().rpc('app_create_pin', { p_pin: pin })
    if (error) return { ok: false, reason: 'error' }
    return data as PinResult
  },

  async verifyPin(pin) {
    const { data, error } = await db().rpc('app_verify_pin', { p_pin: pin })
    if (error) return { ok: false, reason: 'error' }
    return data as PinResult
  },

  async status() {
    const { data, error } = await db().rpc('app_status')
    if (error || !data) return { locked: false, deadline: '' }
    return data as AppStatus
  },

  async getSelection(token) {
    const { data, error } = await db().rpc('app_get_selection', { p_token: token })
    if (error || !data) return { ok: false, giftIds: [], reason: 'error' }
    return data as SelectionResult
  },

  async checkSelection(token, giftIds) {
    const { data, error } = await db().rpc('app_check_selection', {
      p_token: token,
      p_gift_ids: giftIds,
    })
    if (error || !data) return { ok: false, giftIds, reason: 'error' }
    return data as SelectionResult
  },

  async saveSelection(token, giftIds) {
    const { data, error } = await db().rpc('app_save_selection', {
      p_token: token,
      p_gift_ids: giftIds,
    })
    if (error || !data) return { ok: false, giftIds, reason: 'error' }
    return data as SelectionResult
  },

  async adminGetState(password) {
    const { data, error } = await db().rpc('admin_get_state', { p_password: password })
    if (error || !data) return { ok: false, reason: 'error' }
    return data as AdminState
  },
}
