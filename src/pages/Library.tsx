import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Search, X, BookmarkCheck, Loader2 } from 'lucide-react'
import type { PillarId, WebArticle } from '../types'
import { useAuth } from '../context/AuthContext'
import { useArticles } from '../hooks/useArticles'
import { filterArticles, getRecommendedArticles, getBookmarks, toggleBookmark, getReadProgress } from '../utils/articleHelpers'
import PillarFilter from '../components/library/PillarFilter'
import ArticleCard from '../components/library/ArticleCard'
import ArticleModal from '../components/library/ArticleModal'
import PersonalizationBanner from '../components/library/PersonalizationBanner'
import styles from './Library.module.css'

const Library: React.FC = () => {
  const { isAuthenticated, phenotypeResult } = useAuth()
  const { articles, isLoading: articlesLoading } = useArticles()
  const [selectedPillar, setSelectedPillar] = useState<PillarId | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookmarks, setBookmarks] = useState<string[]>(() => getBookmarks())
  const [openArticle, setOpenArticle] = useState<WebArticle | null>(null)
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [readProgress, setReadProgressState] = useState(() => getReadProgress())

  const filteredArticles = useMemo(
    () => filterArticles(articles, {
      pillarId: selectedPillar,
      searchQuery,
      bookmarkedOnly: showSavedOnly,
      bookmarks,
    }),
    [articles, selectedPillar, searchQuery, showSavedOnly, bookmarks]
  )

  const recommended = useMemo(() => {
    if (!phenotypeResult || articles.length === 0) return []
    return getRecommendedArticles(
      articles,
      phenotypeResult.dominantPhenotype,
      phenotypeResult.goal,
      4
    )
  }, [articles, phenotypeResult])

  const featuredArticles = useMemo(
    () => articles.filter(a => a.featured),
    [articles]
  )

  const handleToggleBookmark = useCallback((articleId: string) => {
    const updated = toggleBookmark(articleId)
    setBookmarks(updated)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenArticle(null)
    setReadProgressState(getReadProgress())
  }, [])

  const showRecommended = isAuthenticated && phenotypeResult && selectedPillar === 'all' && !searchQuery && !showSavedOnly
  const showFeatured = selectedPillar === 'all' && !searchQuery && !showSavedOnly && !showRecommended

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerIcon}>
            <BookOpen size={32} />
          </div>
          <h1>Biblioteca de Conocimiento</h1>
          <p>Artículos basados en evidencia para entender y manejar la endometriosis</p>
        </motion.header>

        {/* Loading State */}
        {articlesLoading && (
          <motion.div
            className={styles.loadingState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 size={32} className={styles.spinner} />
            <p>Cargando articulos...</p>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              data-testid="library-search"
            />
            {searchQuery && (
              <button
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <PillarFilter selected={selectedPillar} onSelect={setSelectedPillar} />

          {isAuthenticated && (
            <button
              className={`${styles.savedToggle} ${showSavedOnly ? styles.active : ''}`}
              onClick={() => setShowSavedOnly(prev => !prev)}
              data-testid="show-saved-toggle"
            >
              <BookmarkCheck size={18} />
              <span>Guardados ({bookmarks.length})</span>
            </button>
          )}
        </motion.div>

        {/* Personalization Banner */}
        <PersonalizationBanner />

        {/* Recommended Section (auth + phenotype only) */}
        {showRecommended && recommended.length > 0 && (
          <motion.section
            className={styles.featuredSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.sectionTitle}>Recomendados para ti</h2>
            <div className={styles.featuredGrid}>
              {recommended.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isSaved={bookmarks.includes(article.id)}
                  onToggleSave={() => handleToggleBookmark(article.id)}
                  onOpen={() => setOpenArticle(article)}
                  readProgress={readProgress[article.id] ?? 0}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Featured Section (no login / no search) */}
        {showFeatured && (
          <motion.section
            className={styles.featuredSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.sectionTitle}>Artículos Destacados</h2>
            <div className={styles.featuredGrid}>
              {featuredArticles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isSaved={bookmarks.includes(article.id)}
                  onToggleSave={() => handleToggleBookmark(article.id)}
                  onOpen={() => setOpenArticle(article)}
                  readProgress={readProgress[article.id] ?? 0}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* All Articles */}
        <motion.section
          className={styles.articlesSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(selectedPillar !== 'all' || searchQuery || showSavedOnly) && (
            <h2 className={styles.sectionTitle}>
              {showSavedOnly
                ? 'Artículos Guardados'
                : searchQuery
                  ? `Resultados para "${searchQuery}"`
                  : 'Todos los artículos'}
              <span className={styles.resultsCount}>({filteredArticles.length})</span>
            </h2>
          )}

          {filteredArticles.length > 0 ? (
            <div className={styles.articlesGrid}>
              {filteredArticles
                .filter(a => {
                  if (showRecommended) return !recommended.some(r => r.id === a.id)
                  if (showFeatured) return !a.featured
                  return true
                })
                .map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <ArticleCard
                      article={article}
                      isSaved={bookmarks.includes(article.id)}
                      onToggleSave={() => handleToggleBookmark(article.id)}
                      onOpen={() => setOpenArticle(article)}
                      readProgress={readProgress[article.id] ?? 0}
                    />
                  </motion.div>
                ))}
            </div>
          ) : (
            <motion.div
              className={styles.noResults}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen size={48} />
              <p>No se encontraron artículos</p>
              <span>Prueba con otros términos de búsqueda o pilares</span>
            </motion.div>
          )}
        </motion.section>

        {/* Article Modal — AnimatePresence at parent level (H3) */}
        <AnimatePresence>
          {openArticle && (
            <ArticleModal
              key={openArticle.id}
              article={openArticle}
              onClose={handleCloseModal}
              isSaved={bookmarks.includes(openArticle.id)}
              onToggleSave={() => handleToggleBookmark(openArticle.id)}
              onOpenArticle={setOpenArticle}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Library
