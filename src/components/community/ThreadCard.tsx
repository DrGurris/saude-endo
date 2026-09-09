import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Pin } from 'lucide-react'
import type { ForumThread } from '../../types'
import { timeAgo } from '../../utils/timeAgo'
import CategoryBadge from './CategoryBadge'
import UserProfileCard from './UserProfileCard'
import SupportButton from './SupportButton'
import styles from './ThreadCard.module.css'

interface ThreadCardProps {
  thread: ForumThread
  isSupported: boolean
  onToggleSupport: () => void
  isAuthenticated: boolean
  delay?: number
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread, isSupported, onToggleSupport, isAuthenticated, delay = 0 }) => {
  const navigate = useNavigate()
  const excerpt = thread.body.length > 150 ? `${thread.body.slice(0, 150)}...` : thread.body

  const handleCardClick = () => {
    navigate(`/community/${thread.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div
        className={styles.card}
        onClick={handleCardClick}
        onKeyDown={e => { if (e.key === 'Enter') handleCardClick() }}
        role="link"
        tabIndex={0}
      >
        {thread.pinned && (
          <div className={styles.pinnedBadge}>
            <Pin size={12} />
            Fijado
          </div>
        )}

        <div className={styles.header}>
          <UserProfileCard
            name={thread.authorName}
            role={thread.authorRole}
            isAnonymous={thread.isAnonymous}
          />
          <div className={styles.meta}>
            <CategoryBadge category={thread.category} />
            <span className={styles.time}>{timeAgo(thread.updatedAt)}</span>
          </div>
        </div>

        <h3 className={styles.title}>{thread.title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.footer} onClick={e => e.stopPropagation()}>
          <div className={styles.stats}>
            <SupportButton
              count={thread.supportCount}
              isSupported={isSupported}
              onToggle={onToggleSupport}
              disabled={!isAuthenticated}
            />
            <span className={styles.replies}>
              <MessageCircle size={14} />
              {thread.replyCount}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ThreadCard
