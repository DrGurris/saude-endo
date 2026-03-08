import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'
import styles from './Toast.module.css'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const COLORS = {
  success: 'var(--color-success)',
  error: 'var(--color-accent)',
  warning: 'var(--color-secondary)',
  info: 'var(--color-info)',
}

const ToastItem: React.FC<{ toast: Toast; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  const Icon = ICONS[toast.type]
  const color = COLORS[toast.type]

  React.useEffect(() => {
    const timer = setTimeout(onDismiss, toast.duration || 4000)
    return () => clearTimeout(timer)
  }, [toast.duration, onDismiss])

  return (
    <motion.div
      className={styles.toast}
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ borderLeftColor: color }}
      data-testid={`toast-${toast.type}`}
    >
      <div className={styles.iconWrapper} style={{ color }}>
        <Icon size={20} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{toast.title}</p>
        {toast.message && <p className={styles.message}>{toast.message}</p>}
      </div>
      <button 
        className={styles.dismissBtn} 
        onClick={onDismiss}
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>
    </motion.div>
  )
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: ToastType, title: string, message?: string, duration?: number) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setToasts(prev => [...prev, { id, type, title, message, duration }])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const success = useCallback((title: string, message?: string) => showToast('success', title, message), [showToast])
  const error = useCallback((title: string, message?: string) => showToast('error', title, message), [showToast])
  const warning = useCallback((title: string, message?: string) => showToast('warning', title, message), [showToast])
  const info = useCallback((title: string, message?: string) => showToast('info', title, message), [showToast])

  const value = useMemo(() => ({ showToast, success, error, warning, info }), [showToast, success, error, warning, info])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.container}>
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <ToastItem 
              key={toast.id} 
              toast={toast} 
              onDismiss={() => dismissToast(toast.id)} 
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
