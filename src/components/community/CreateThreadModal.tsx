import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ForumCategory } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { useCommunity } from '../../context/CommunityContext'
import { threadSchema, type ThreadFormData } from '../../utils/communityValidation'
import styles from './CreateThreadModal.module.css'

interface CreateThreadModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES: Array<{ id: ForumCategory; label: string }> = [
  { id: 'general', label: 'General' },
  { id: 'pain', label: 'Dolor' },
  { id: 'energy', label: 'Energia' },
  { id: 'nutrition', label: 'Nutricion' },
  { id: 'hormones', label: 'Hormonas' },
  { id: 'wellbeing', label: 'Bienestar' },
]

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const { createThread } = useCommunity()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ThreadFormData>({
    resolver: zodResolver(threadSchema),
    defaultValues: { title: '', body: '', category: 'general', isAnonymous: false },
  })

  const onSubmit = async (data: ThreadFormData) => {
    if (!user) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await createThread(
        data.title,
        data.body,
        data.category as ForumCategory,
        data.isAnonymous,
        user.id,
        user.name,
        user.role,
      )
      reset()
      onClose()
    } catch {
      setSubmitError('No se pudo publicar el tema. Intenta de nuevo.')
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Nuevo tema"
          >
            <div className={styles.header}>
              <h2>Nuevo tema</h2>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.field}>
                <input
                  {...register('title')}
                  placeholder="Titulo de tu tema"
                  maxLength={200}
                  className={`${styles.input} ${errors.title ? styles.hasError : ''}`}
                />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}
              </div>

              <div className={styles.field}>
                <textarea
                  {...register('body')}
                  placeholder="Comparte tu experiencia o pregunta..."
                  rows={6}
                  maxLength={5000}
                  className={`${styles.textarea} ${errors.body ? styles.hasError : ''}`}
                />
                {errors.body && <p className={styles.error}>{errors.body.message}</p>}
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Categoria</label>
                  <select {...register('category')} className={styles.select}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>

                <label className={styles.anonymousToggle}>
                  <input type="checkbox" {...register('isAnonymous')} />
                  <EyeOff size={14} />
                  <span>Publicar anonimamente</span>
                </label>
              </div>

              {submitError && <p className={styles.error} role="alert">{submitError}</p>}

              <div className={styles.actions}>
                <button type="button" className={styles.cancelBtn} onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  <Send size={16} />
                  {isSubmitting ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CreateThreadModal
