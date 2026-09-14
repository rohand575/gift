import { type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Soft, glassy centered modal for confirmations and gentle messages.
export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose?: () => void
  children: ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative z-10 w-full max-w-md rounded-3xl p-8 text-center shadow-card"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
