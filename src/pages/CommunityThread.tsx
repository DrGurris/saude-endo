import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Pin, Lock, Flag, Loader2, AlertCircle } from 'lucide-react'
import type { ForumThread, ForumReply } from '../types'
import { useAuth } from '../context/AuthContext'
import { useCommunity } from '../context/CommunityContext'
import { checkUserSupported } from '../services/communityService'
import { timeAgo } from '../utils/timeAgo'
import UserProfileCard from '../components/community/UserProfileCard'
import CategoryBadge from '../components/community/CategoryBadge'
import SupportButton from '../components/community/SupportButton'
import ReplyCard from '../components/community/ReplyCard'
import ReplyForm from '../components/community/ReplyForm'
import ReportModal from '../components/community/ReportModal'
import styles from './CommunityThread.module.css'

const CommunityThread: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>()
  const { user, isAuthenticated } = useAuth()
  const { loadThread, loadReplies, toggleSupport, reportContent } = useCommunity()

  const [thread, setThread] = useState<ForumThread | null>(null)
  const [replies, setReplies] = useState<ForumReply[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showReport, setShowReport] = useState(false)
  const [supportCount, setSupportCount] = useState(0)
  const [isSupported, setIsSupported] = useState(false)

  const fetchData = useCallback(async () => {
    if (!threadId) return
    setIsLoading(true)
    try {
      const [threadData, replyData] = await Promise.all([
        loadThread(threadId),
        loadReplies(threadId),
      ])
      if (threadData) {
        setThread(threadData)
        setSupportCount(threadData.supportCount)
        if (user) {
          setIsSupported(checkUserSupported(user.id, threadData.id))
        }
      }
      setReplies(replyData)
    } catch {
      setError('No se pudo cargar el hilo. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }, [threadId, user?.id, loadThread, loadReplies])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSupport = async () => {
    if (!user || !thread) return
    const newCount = await toggleSupport(user.id, thread.id, 'thread')
    setSupportCount(newCount)
    setIsSupported(prev => !prev)
  }

  const handleReport = async (reason: string) => {
    if (!user || !thread) return
    await reportContent('thread', thread.id, user.id, reason)
    setShowReport(false)
  }

  // Group replies: top-level + nested
  const topLevelReplies = replies.filter(r => !r.parentReplyId)
  const nestedReplies = replies.filter(r => r.parentReplyId)

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader2 size={32} className={styles.spinner} />
        <p>Cargando hilo...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.notFound}>
        <AlertCircle size={24} />
        <p>{error}</p>
        <Link to="/community" className={styles.backLink}>Volver a la comunidad</Link>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className={styles.notFound}>
        <p>Hilo no encontrado</p>
        <Link to="/community" className={styles.backLink}>Volver a la comunidad</Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Link to="/community" className={styles.back}>
        <ArrowLeft size={18} />
        Volver a la comunidad
      </Link>

      <motion.article
        className={styles.threadCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.threadHeader}>
          <UserProfileCard
            name={thread.authorName}
            role={thread.authorRole}
            isAnonymous={thread.isAnonymous}
          />
          <div className={styles.threadMeta}>
            <CategoryBadge category={thread.category} />
            <span className={styles.time}>{timeAgo(thread.createdAt)}</span>
          </div>
        </div>

        <div className={styles.badges}>
          {thread.pinned && (
            <span className={styles.badge}><Pin size={12} /> Fijado</span>
          )}
          {thread.locked && (
            <span className={styles.badge}><Lock size={12} /> Cerrado</span>
          )}
        </div>

        <h1 className={styles.threadTitle}>{thread.title}</h1>
        <div className={styles.threadBody}>{thread.body}</div>

        <div className={styles.threadFooter}>
          <div className={styles.threadActions}>
            <SupportButton
              count={supportCount}
              isSupported={isSupported}
              onToggle={handleSupport}
              disabled={!isAuthenticated}
            />
            <span className={styles.replyCount}>
              <MessageCircle size={14} />
              {replies.length} respuestas
            </span>
          </div>
          {isAuthenticated && user?.id !== thread.authorId && (
            <button className={styles.reportBtn} onClick={() => setShowReport(true)}>
              <Flag size={14} />
              Reportar
            </button>
          )}
        </div>
      </motion.article>

      {/* Replies */}
      <section className={styles.repliesSection}>
        <h2 className={styles.repliesTitle}>
          <MessageCircle size={18} />
          Respuestas ({replies.length})
        </h2>

        <div className={styles.repliesList}>
          {topLevelReplies.map((reply, index) => (
            <React.Fragment key={reply.id}>
              <ReplyCard reply={reply} delay={index * 0.04} />
              {nestedReplies
                .filter(nr => nr.parentReplyId === reply.id)
                .map((nested, nIdx) => (
                  <ReplyCard
                    key={nested.id}
                    reply={nested}
                    isNested
                    delay={(index + nIdx + 1) * 0.04}
                  />
                ))}
            </React.Fragment>
          ))}
        </div>

        {/* Reply Form */}
        {isAuthenticated && !thread.locked ? (
          <ReplyForm threadId={thread.id} onReplyAdded={fetchData} />
        ) : thread.locked ? (
          <div className={styles.lockedBanner}>
            <Lock size={16} />
            Este hilo esta cerrado y no acepta nuevas respuestas
          </div>
        ) : (
          <div className={styles.loginBanner}>
            Inicia sesion para participar en la conversacion
          </div>
        )}
      </section>

      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        onSubmit={handleReport}
      />
    </div>
  )
}

export default CommunityThread
