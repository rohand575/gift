// Shared types for the data-access layer. Nothing here carries a price —
// the browser never receives monetary values in production.

export interface PinResult {
  ok: boolean
  token?: string
  reason?: 'mismatch' | 'wrong' | 'locked_out' | 'already_exists' | 'error'
}

export type SelectionBlockReason = 'exceeds' | 'locked' | 'invalid_token' | 'error'

export interface SelectionResult {
  ok: boolean
  giftIds: string[]
  reason?: SelectionBlockReason
}

export interface AppStatus {
  locked: boolean // true once the deadline has passed
  deadline: string // ISO date
}

// Admin-only shape — the ONLY place internal totals are ever exposed.
export interface AdminEvent {
  createdAt: string
  eventType: string
  giftIds: string[]
  internalTotal: number
}

export interface AdminState {
  ok: boolean
  recipientName?: string
  currentGiftIds?: string[]
  internalTotal?: number
  locked?: boolean
  history?: AdminEvent[]
  reason?: 'wrong_password' | 'error'
}

export interface GiftApi {
  /** Whether maaike has already created her PIN. */
  hasPin(): Promise<boolean>
  createPin(pin: string, confirm: string): Promise<PinResult>
  verifyPin(pin: string): Promise<PinResult>
  /** Global deadline / lock status (no auth needed). */
  status(): Promise<AppStatus>
  /** Current saved selection for the authenticated session. */
  getSelection(token: string): Promise<SelectionResult>
  /** Feasibility check WITHOUT saving (drives instant UI feedback). */
  checkSelection(token: string, giftIds: string[]): Promise<SelectionResult>
  /** Persist the final selection; logs an event server-side. */
  saveSelection(token: string, giftIds: string[]): Promise<SelectionResult>
  /** Admin dashboard data — internal totals included. */
  adminGetState(password: string): Promise<AdminState>
}
