import React from 'react'
import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck, Clock, ChevronRight, FileText, Share2 } from 'lucide-react'
import type { WebArticle } from '../../types'
import { getPillarById } from '../../data/pillars'
import { shareArticle } from '../../utils/articleHelpers'
import styles from './ArticleCard.module.css'

interface ArticleCardProps {
  article: WebArticle
  isSaved: boolean
  onToggleSave: () => void
  onOpen: () => void
  readProgress?: number
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isSaved,
  onToggleSave,
  onOpen,
  readProgress = 0,
}) => {
  const pillar = getPillarById(article.pillarId)

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onOpen}
      data-testid={`article-${article.id}`}
    >
      {article.featured && (
        <span className={styles.featuredBadge}>Destacado</span>
      )}

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
        <div className={styles.headerActions}>
          <button
            className={styles.shareBtn}
            onClick={e => { e.stopPropagation(); shareArticle(article) }}
            aria-label="Compartir artículo"
            data-testid={`share-${article.id}`}
          >
            <Share2 size={15} />
          </button>
          <button
            className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
            onClick={e => { e.stopPropagation(); onToggleSave() }}
            aria-label={isSaved ? 'Quitar de guardados' : 'Guardar artículo'}
            data-testid={`save-${article.id}`}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
      </div>

      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.summary}>{article.summary}</p>

      {article.citations.length > 0 && (
        <span className={styles.citationBadge}>
          <FileText size={11} />
          {article.citations.length} cita{article.citations.length > 1 ? 's' : ''}
        </span>
      )}

      {readProgress > 0 && (
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${readProgress}%` }}
          />
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.readTime}>
          <Clock size={14} />
          {article.readTimeMinutes} min
        </span>
        <button
          className={styles.readBtn}
          onClick={e => { e.stopPropagation(); onOpen() }}
          data-testid={`read-${article.id}`}
        >
          Leer más
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.article>
  )
}

export default ArticleCard
