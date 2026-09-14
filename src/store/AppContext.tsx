import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getApi } from '../lib/api'
import { clearToken, getToken, setToken } from '../lib/session'
import type { PinResult, SelectionResult } from '../lib/types'

interface AppState {
  ready: boolean
  hasPin: boolean
  locked: boolean // deadline passed
  deadline: string
  token: string | null
  selection: string[]
  // actions
  createPin: (pin: string, confirm: string) => Promise<PinResult>
  verifyPin: (pin: string) => Promise<PinResult>
  loadSelection: () => Promise<void>
  checkSelection: (ids: string[]) => Promise<SelectionResult>
  saveSelection: (ids: string[]) => Promise<SelectionResult>
  refreshStatus: () => Promise<void>
  logout: () => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [hasPin, setHasPin] = useState(false)
  const [locked, setLocked] = useState(false)
  const [deadline, setDeadline] = useState('')
  const [token, setTokenState] = useState<string | null>(getToken())
  const [selection, setSelection] = useState<string[]>([])

  const refreshStatus = useCallback(async () => {
    const api = await getApi()
    const [status, pinExists] = await Promise.all([api.status(), api.hasPin()])
    setLocked(status.locked)
    setDeadline(status.deadline)
    setHasPin(pinExists)
  }, [])

  useEffect(() => {
    refreshStatus().finally(() => setReady(true))
  }, [refreshStatus])

  const applyToken = (t: string) => {
    setToken(t)
    setTokenState(t)
  }

  const createPin = useCallback(async (pin: string, confirm: string) => {
    const api = await getApi()
    const res = await api.createPin(pin, confirm)
    if (res.ok && res.token) {
      applyToken(res.token)
      setHasPin(true)
    }
    return res
  }, [])

  const verifyPin = useCallback(async (pin: string) => {
    const api = await getApi()
    const res = await api.verifyPin(pin)
    if (res.ok && res.token) applyToken(res.token)
    return res
  }, [])

  const loadSelection = useCallback(async () => {
    if (!token) return
    const api = await getApi()
    const res = await api.getSelection(token)
    if (res.ok) setSelection(res.giftIds)
  }, [token])

  const checkSelection = useCallback(
    async (ids: string[]) => {
      const api = await getApi()
      return api.checkSelection(token ?? '', ids)
    },
    [token],
  )

  const saveSelection = useCallback(
    async (ids: string[]) => {
      const api = await getApi()
      const res = await api.saveSelection(token ?? '', ids)
      if (res.ok) setSelection(res.giftIds)
      return res
    },
    [token],
  )

  const logout = useCallback(() => {
    clearToken()
    setTokenState(null)
    setSelection([])
  }, [])

  const value = useMemo<AppState>(
    () => ({
      ready,
      hasPin,
      locked,
      deadline,
      token,
      selection,
      createPin,
      verifyPin,
      loadSelection,
      checkSelection,
      saveSelection,
      refreshStatus,
      logout,
    }),
    [
      ready,
      hasPin,
      locked,
      deadline,
      token,
      selection,
      createPin,
      verifyPin,
      loadSelection,
      checkSelection,
      saveSelection,
      refreshStatus,
      logout,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
