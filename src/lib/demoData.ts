// DEV-ONLY. These internal prices mirror the Supabase seed and exist purely so
// the experience can be previewed locally without a backend. This module is
// only imported behind `import.meta.env.DEV`, so it is stripped from production
// builds — in production, prices live solely in Supabase and never ship.

export const DEMO_BUDGET = 250

export const demoPrices: Record<string, number> = {
  pandora: 60,
  jewelry: 60,
  dress: 80,
  keyboard: 60,
  shopping: 100,
  germany_getaway: 200,
  tablet: 250,
  apple_watch: 250,
  european_getaway: 250,
}

// Change to a past date to preview the "sealed" state locally.
export const DEMO_DEADLINE = '2026-10-25'
