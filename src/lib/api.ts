import type { GiftApi } from './types'
import { hasSupabase, supabaseApi } from './supabaseApi'

// Chooses the real Supabase backend when configured. Otherwise, in DEV only,
// lazy-loads the localStorage demo so the experience can be previewed with no
// backend. In a production build the demo branch is dead code and is dropped,
// guaranteeing no prices ship.
let cached: GiftApi | null = null

export async function getApi(): Promise<GiftApi> {
  if (cached) return cached
  if (hasSupabase) {
    cached = supabaseApi
  } else if (import.meta.env.DEV) {
    cached = (await import('./demoApi')).demoApi
  } else {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    )
  }
  return cached
}

export const isDemoMode = !hasSupabase && import.meta.env.DEV
