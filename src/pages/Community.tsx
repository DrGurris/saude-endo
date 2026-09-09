import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Plus, Loader2 } from 'lucide-react'
import type { ForumCategory } from '../types'
import { useAuth } from '../context/AuthContext'
import { useCommunity } from '../context/CommunityContext'
import CommunityFilters from '../components/community/CommunityFilters'
import ThreadList from '../components/community/ThreadList'
import CreateThreadModal from '../components/community/CreateThreadModal'
import styles from './Community.module.css'

const Community: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const { threads, isLoading, selectedCategory, sortBy, setCategory, setSortBy, loadThreads } = useCommunity()
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadThreads()
  }, [loadThreads])

  const filteredAndSorted = useMemo(() => {
    let filtered = [...threads]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }

    // Pinned threads first, then sort
    const pinned = filtered.filter(t => t.pinned)
    const unpinned = filtered.filter(t => !t.pinned)

    if (sortBy === 'popular') {
      unpinned.sort((a, b) => b.supportCount - a.supportCount)
    } else {
      unpinned.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }

    return [...pinned, ...unpinned]
  }, [threads, selectedCategory, sortBy])

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerIcon}>
            <MessageSquare size={32} />
          </div>
          <h1>Comunidad</h1>
          <p>Un espacio seguro para compartir experiencias y apoyarnos mutuamente</p>
        </motion.header>

        <motion.div
          className={styles.toolbar}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CommunityFilters
            selectedCategory={selectedCategory}
            onCategoryChange={(cat: ForumCategory | 'all') => setCategory(cat)}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          {isAuthenticated && (
            <button
              className={styles.newThreadBtn}
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={18} />
              Nuevo tema
            </button>
          )}
        </motion.div>

        {isLoading ? (
          <div className={styles.loading}>
            <Loader2 size={32} className={styles.spinner} />
            <p>Cargando conversaciones...</p>
          </div>
        ) : (
          <ThreadList threads={filteredAndSorted} />
        )}

        {!isAuthenticated && (
          <motion.div
            className={styles.ctaBanner}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p>Inicia sesion para participar en la comunidad</p>
          </motion.div>
        )}
      </motion.div>

      <CreateThreadModal
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); loadThreads() }}
      />
    </div>
  )
}

export default Community
