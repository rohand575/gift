// Lightweight session-token holder. The token is issued by the server (or the
// demo backend) after a correct PIN and is required for selection reads/writes.
// Kept in sessionStorage so it clears when the tab closes.
const TOKEN_KEY = 'gift-session-token'

export function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}
