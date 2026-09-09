import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Send } from 'lucide-react'
import styles from './ReportModal.module.css'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string) => Promise<void>
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (reason.trim().length < 10) return
    setIsSubmitting(true)
    try {
      await onSubmit(reason.trim())
      setReason('')
      onClose()
    } catch {
      // silent
    } finally {
      setIsSubmitting(false)
    }
  }

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.header}>
              <AlertTriangle size={18} color="var(--color-accent)" />
              <h3>Reportar contenido</h3>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Describe por que reportas este contenido (minimo 10 caracteres)..."
                rows={4}
                className={styles.textarea}
              />
              <div className={styles.actions}>
                <button type="button" className={styles.cancelBtn} onClick={onClose}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting || reason.trim().length < 10}
                >
                  <Send size={14} />
                  {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ReportModal
