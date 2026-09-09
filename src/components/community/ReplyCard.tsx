import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Flag, CornerDownRight } from 'lucide-react'
import type { ForumReply } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { checkUserSupported } from '../../services/communityService'
import { useCommunity } from '../../context/CommunityContext'
import { timeAgo } from '../../utils/timeAgo'
import UserProfileCard from './UserProfileCard'
import SupportButton from './SupportButton'
import ReportModal from './ReportModal'
import styles from './ReplyCard.module.css'

interface ReplyCardProps {
  reply: ForumReply
  isNested?: boolean
  delay?: number
}

const ReplyCard: React.FC<ReplyCardProps> = ({ reply, isNested, delay = 0 }) => {
  const { user, isAuthenticated } = useAuth()
  const { toggleSupport, reportContent } = useCommunity()
  const [supportCount, setSupportCount] = useState(reply.supportCount)
  const [isSupported, setIsSupported] = useState(user ? checkUserSupported(user.id, reply.id) : false)
  const [showReport, setShowReport] = useState(false)

  const handleSupport = async () => {
    if (!user) return
    const newCount = await toggleSupport(user.id, reply.id, 'reply')
    setSupportCount(newCount)
    setIsSupported(prev => !prev)
  }

  const handleReport = async (reason: string) => {
    if (!user) return
    await reportContent('reply', reply.id, user.id, reason)
    setShowReport(false)
  }

  return (
    <motion.div
      className={`${styles.card} ${isNested ? styles.nested : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {isNested && <CornerDownRight size={14} className={styles.nestIcon} />}

      <div className={styles.header}>
        <UserProfileCard
          name={reply.authorName}
          role={reply.authorRole}
          isAnonymous={reply.isAnonymous}
        />
        <span className={styles.time}>{timeAgo(reply.createdAt)}</span>
      </div>

      <p className={styles.body}>{reply.body}</p>

      <div className={styles.footer}>
        <SupportButton
          count={supportCount}
          isSupported={isSupported}
          onToggle={handleSupport}
          disabled={!isAuthenticated}
        />
        {isAuthenticated && user?.id !== reply.authorId && (
          <button className={styles.reportBtn} onClick={() => setShowReport(true)} aria-label="Reportar respuesta">
            <Flag size={12} />
          </button>
        )}
      </div>

      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        onSubmit={handleReport}
      />
    </motion.div>
  )
}

export default ReplyCard
