import React from 'react'
import type { ForumThread } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { checkUserSupported } from '../../services/communityService'
import { useCommunity } from '../../context/CommunityContext'
import ThreadCard from './ThreadCard'
import styles from './ThreadList.module.css'

interface ThreadListProps {
  threads: ForumThread[]
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  const { user, isAuthenticated } = useAuth()
  const { toggleSupport } = useCommunity()

  if (threads.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay hilos en esta categoria</p>
        <span>Se la primera en iniciar una conversacion</span>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {threads.map((thread, index) => (
        <ThreadCard
          key={thread.id}
          thread={thread}
          isSupported={user ? checkUserSupported(user.id, thread.id) : false}
          onToggleSupport={() => user && toggleSupport(user.id, thread.id, 'thread')}
          isAuthenticated={isAuthenticated}
          delay={index * 0.04}
        />
      ))}
    </div>
  )
}

export default ThreadList
