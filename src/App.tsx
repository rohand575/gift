import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './store/AppContext'
import Landing from './pages/Landing'
import Welcome from './pages/Welcome'
import Gifts from './pages/Gifts'
import Review from './pages/Review'
import Success from './pages/Success'
import CreatePin from './pages/CreatePin'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { type ReactNode } from 'react'

// Gate for the authenticated part of the journey.
function RequireAuth({ children }: { children: ReactNode }) {
  const { token, ready } = useApp()
  if (!ready) return null
  if (!token) return <Navigate to="/welcome" replace />
  return <>{children}</>
}

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/gifts"
          element={
            <RequireAuth>
              <Gifts />
            </RequireAuth>
          }
        />
        <Route
          path="/review"
          element={
            <RequireAuth>
              <Review />
            </RequireAuth>
          }
        />
        <Route
          path="/success"
          element={
            <RequireAuth>
              <Success />
            </RequireAuth>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
