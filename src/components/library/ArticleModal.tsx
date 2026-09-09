import React, { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck, X, Clock, Tag, Share2 } from 'lucide-react'
import type { WebArticle } from '../../types'
import { getPillarById } from '../../data/pillars'
import { ARTICLES } from '../../data/articles'
import { renderMarkdown } from '../../utils/markdownRenderer'
import { setReadProgress, shareArticle } from '../../utils/articleHelpers'
import { useAuth } from '../../context/AuthContext'
import styles from './ArticleModal.module.css'

interface ArticleModalProps {
  article: WebArticle
  onClose: () => void
  isSaved: boolean
  onToggleSave: () => void
  onOpenArticle: (article: WebArticle) => void
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
  onOpenArticle,
}) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const { isAuthenticated } = useAuth()

  // Lock body scroll when modal is open (H1)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Scroll to top when article changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0
    }
    progressRef.current = 0
  }, [article.id])

  // Persist read progress on unmount or article change (M1 — throttled via ref)
  useEffect(() => {
    const currentArticleId = article.id
    return () => {
      if (isAuthenticated && progressRef.current > 0) {
        setReadProgress(currentArticleId, progressRef.current)
      }
    }
  }, [article.id, isAuthenticated])

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Track read progress on scroll — only update ref, persist on unmount (C1 + M1)
  const handleScroll = useCallback(() => {
    if (!bodyRef.current || !isAuthenticated) return
    const { scrollTop, scrollHeight, clientHeight } = bodyRef.current
    const scrollable = scrollHeight - clientHeight
    if (scrollable <= 0) {
      progressRef.current = 100
      return
    }
    progressRef.current = Math.round((scrollTop / scrollable) * 100)
  }, [isAuthenticated])

  const pillar = getPillarById(article.pillarId)

  // Get related articles (same pillar, different article)
  const related = ARTICLES
    .filter(a => a.pillarId === article.pillarId && a.id !== article.id)
    .slice(0, 3)

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="article-modal-overlay"
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
        data-testid="article-modal"
      >
        {/* Sticky header */}
        <div className={styles.header}>
          <span
            className={styles.pillarTag}
            style={{
              backgroundColor: `${pillar?.color}15`,
              color: pillar?.color,
            }}
          >
            <img
              src={pillar?.image ?? ''}
              alt=""
              className={styles.pillarImage}
            />
            {pillar?.label}
          </span>
          <div className={styles.actions}>
            <button
              className={styles.shareBtn}
              onClick={() => shareArticle(article)}
              aria-label="Compartir artículo"
            >
              <Share2 size={18} />
            </button>
            <button
              className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
              onClick={onToggleSave}
              aria-label={isSaved ? 'Quitar de guardados' : 'Guardar artículo'}
            >
              {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div
          className={styles.body}
          ref={bodyRef}
          onScroll={handleScroll}
        >
          <div className={styles.titleArea}>
            <h1 id="article-modal-title" className={styles.title}>{article.title}</h1>
          </div>

          <div className={styles.meta}>
            <span className={styles.readTime}>
              <Clock size={14} />
              {article.readTimeMinutes} min de lectura
            </span>
            <div className={styles.tags}>
              {article.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Rendered markdown content */}
          <div className={styles.content}>
            {renderMarkdown(article.contentMarkdown)}
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className={styles.related}>
              <h3 className={styles.relatedTitle}>Artículos relacionados</h3>
              <div className={styles.relatedGrid}>
                {related.map(r => {
                  const rPillar = getPillarById(r.pillarId)
                  return (
                    <div
                      key={r.id}
                      className={styles.relatedCard}
                      onClick={() => onOpenArticle(r)}
                    >
                      <p className={styles.relatedCardTitle}>{r.title}</p>
                      <span className={styles.relatedCardPillar}>
                        {rPillar?.label} · {r.readTimeMinutes} min
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Citations footer */}
        {article.citations.length > 0 && (
          <div className={styles.citations}>
            <h4 className={styles.citationsTitle}>
              Referencias ({article.citations.length})
            </h4>
            <ol className={styles.citationsList}>
              {article.citations.map((citation, idx) => (
                <li
                  key={idx}
                  className={styles.citationItem}
                  data-index={`[${idx + 1}]`}
                >
                  {citation}
                </li>
              ))}
            </ol>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ArticleModal
