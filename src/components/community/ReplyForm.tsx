import React, { useState } from 'react'
import { Send, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCommunity } from '../../context/CommunityContext'
import styles from './ReplyForm.module.css'

interface ReplyFormProps {
  threadId: string
  parentReplyId?: string
  onReplyAdded: () => void
}

const MAX_REPLY_LENGTH = 3000

const ReplyForm: React.FC<ReplyFormProps> = ({ threadId, parentReplyId, onReplyAdded }) => {
  const { user } = useAuth()
  const { createReply } = useCommunity()
  const [body, setBody] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user) return null

  const trimmed = body.trim()
  const isValid = trimmed.length >= 3 && trimmed.length <= MAX_REPLY_LENGTH

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)
    setError(null)
    try {
      await createReply(threadId, trimmed, isAnonymous, user.id, user.name, user.role, parentReplyId)
      setBody('')
      setIsAnonymous(false)
      onReplyAdded()
    } catch {
      setError('No se pudo enviar la respuesta. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Escribe tu respuesta..."
        rows={3}
        maxLength={MAX_REPLY_LENGTH}
        className={styles.textarea}
      />
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.actions}>
        <label className={styles.anonymousToggle}>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={e => setIsAnonymous(e.target.checked)}
          />
          <EyeOff size={13} />
          <span>Anonimo</span>
        </label>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting || !isValid}
        >
          <Send size={14} />
          {isSubmitting ? 'Enviando...' : 'Responder'}
        </button>
      </div>
    </form>
  )
}

export default ReplyForm
