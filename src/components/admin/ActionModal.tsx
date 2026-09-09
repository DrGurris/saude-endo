import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import styles from './ActionModal.module.css'

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  confirmVariant?: 'danger' | 'primary'
  isLoading?: boolean
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar',
  confirmVariant = 'primary',
  isLoading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
              <X size={18} />
            </button>

            <div className={styles.content}>
              {confirmVariant === 'danger' && (
                <div className={styles.warningIcon}>
                  <AlertTriangle size={28} />
                </div>
              )}
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
                Cancelar
              </button>
              <button
                className={`${styles.confirmBtn} ${styles[confirmVariant]}`}
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ActionModal
