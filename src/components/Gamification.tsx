import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Flame, Star, Target, Award, Calendar, Heart, Zap, CheckCircle2, X, MessageCircle, BookOpen, Users } from 'lucide-react'
import { getGamificationData, type GamificationData } from '../services/gamificationService'
import styles from './Gamification.module.css'

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  total?: number
}

function getBadges(data: GamificationData): Badge[] {
  return [
    {
      id: 'first_log',
      name: 'Primer Paso',
      description: 'Registra tu primer día en el diario',
      icon: <Star size={24} />,
      color: 'var(--color-endo-yellow)',
      unlocked: data.totalDaysLogged >= 1,
      progress: Math.min(data.totalDaysLogged, 1),
      total: 1,
    },
    {
      id: 'week_warrior',
      name: 'Guerrera de la Semana',
      description: 'Mantén una racha de 7 días',
      icon: <Flame size={24} />,
      color: 'var(--color-accent)',
      unlocked: data.longestStreak >= 7,
      progress: Math.min(data.currentStreak, 7),
      total: 7,
    },
    {
      id: 'month_master',
      name: 'Maestra del Mes',
      description: 'Mantén una racha de 30 días',
      icon: <Trophy size={24} />,
      color: 'var(--color-success)',
      unlocked: data.longestStreak >= 30,
      progress: Math.min(data.currentStreak, 30),
      total: 30,
    },
    {
      id: 'habit_starter',
      name: 'Constructora de Hábitos',
      description: 'Completa 10 hábitos',
      icon: <Target size={24} />,
      color: 'var(--color-primary)',
      unlocked: data.totalHabitsCompleted >= 10,
      progress: Math.min(data.totalHabitsCompleted, 10),
      total: 10,
    },
    {
      id: 'habit_champion',
      name: 'Campeona de Hábitos',
      description: 'Completa 50 hábitos',
      icon: <Award size={24} />,
      color: 'var(--color-info)',
      unlocked: data.totalHabitsCompleted >= 50,
      progress: Math.min(data.totalHabitsCompleted, 50),
      total: 50,
    },
    {
      id: 'consistent',
      name: 'Consistente',
      description: 'Registra 14 dias en total',
      icon: <Calendar size={24} />,
      color: 'var(--color-secondary)',
      unlocked: data.totalDaysLogged >= 14,
      progress: Math.min(data.totalDaysLogged, 14),
      total: 14,
    },
    // ─── Community Badges ────────────────────────────────────────────────
    {
      id: 'first_post',
      name: 'Primera Voz',
      description: 'Crea tu primer hilo en la comunidad',
      icon: <MessageCircle size={24} />,
      color: 'var(--color-primary)',
      unlocked: data.totalPosts >= 1,
      progress: Math.min(data.totalPosts, 1),
      total: 1,
    },
    {
      id: 'helpful_reply',
      name: 'Respuesta Solidaria',
      description: 'Recibe 5 apoyos en tus respuestas',
      icon: <Heart size={24} />,
      color: 'var(--color-accent)',
      unlocked: data.totalSupportsReceived >= 5,
      progress: Math.min(data.totalSupportsReceived, 5),
      total: 5,
    },
    {
      id: 'community_star',
      name: 'Estrella Comunitaria',
      description: '10 publicaciones y 20 apoyos recibidos',
      icon: <Users size={24} />,
      color: 'var(--color-endo-yellow)',
      unlocked: data.totalPosts >= 10 && data.totalSupportsReceived >= 20,
      progress: Math.min(data.totalPosts, 10) + Math.min(data.totalSupportsReceived, 20),
      total: 30,
    },
    {
      id: 'knowledge_seeker',
      name: 'Buscadora de Conocimiento',
      description: 'Lee 10 articulos de la biblioteca',
      icon: <BookOpen size={24} />,
      color: 'var(--color-info)',
      unlocked: data.totalArticlesRead >= 10,
      progress: Math.min(data.totalArticlesRead, 10),
      total: 10,
    },
  ]
}

// Streak Card Component
export const StreakCard: React.FC<{ onShowBadges?: () => void }> = ({ onShowBadges }) => {
  const data = getGamificationData()
  const badges = getBadges(data)
  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <motion.div 
      className={styles.streakCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="streak-card"
    >
      <div className={styles.streakHeader}>
        <div className={styles.streakIcon}>
          <Flame size={28} color={data.currentStreak > 0 ? 'var(--color-accent)' : 'var(--color-text-muted)'} />
        </div>
        <div className={styles.streakInfo}>
          <motion.span 
            className={styles.streakNumber}
            key={data.currentStreak}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {data.currentStreak}
          </motion.span>
          <span className={styles.streakLabel}>
            {data.currentStreak === 1 ? 'día de racha' : 'días de racha'}
          </span>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <Heart size={16} color="var(--color-accent)" />
          <span>{data.totalDaysLogged} días registrados</span>
        </div>
        <div className={styles.stat}>
          <Zap size={16} color="var(--color-endo-yellow)" />
          <span>{data.totalHabitsCompleted} hábitos completados</span>
        </div>
      </div>

      <motion.button 
        className={styles.badgesBtn}
        onClick={onShowBadges}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-testid="show-badges-btn"
      >
        <Trophy size={16} />
        <span>Ver insignias ({unlockedCount}/{badges.length})</span>
      </motion.button>
    </motion.div>
  )
}

// Badges Modal Component
export const BadgesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const data = getGamificationData()
  const badges = getBadges(data)

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
            aria-label="Insignias"
            data-testid="badges-modal"
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <Trophy size={24} color="var(--color-endo-yellow)" />
                <h2>Tus Insignias</h2>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            <div className={styles.streakBanner}>
              <Flame size={32} color="var(--color-accent)" />
              <div>
                <p className={styles.streakBannerNumber}>{data.currentStreak} días</p>
                <p className={styles.streakBannerLabel}>Racha actual • Récord: {data.longestStreak} días</p>
              </div>
            </div>

            <div className={styles.badgesGrid}>
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  className={`${styles.badgeCard} ${badge.unlocked ? styles.unlocked : styles.locked}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  data-testid={`badge-${badge.id}`}
                >
                  <div 
                    className={styles.badgeIcon}
                    style={{ 
                      backgroundColor: badge.unlocked ? `${badge.color}20` : 'var(--color-border)',
                      color: badge.unlocked ? badge.color : 'var(--color-text-muted)'
                    }}
                  >
                    {badge.icon}
                    {badge.unlocked && (
                      <motion.div 
                        className={styles.checkmark}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                      >
                        <CheckCircle2 size={14} />
                      </motion.div>
                    )}
                  </div>
                  <h3 className={styles.badgeName}>{badge.name}</h3>
                  <p className={styles.badgeDesc}>{badge.description}</p>
                  
                  {!badge.unlocked && badge.progress !== undefined && badge.total && (
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressBar}>
                        <motion.div 
                          className={styles.progressFill}
                          initial={{ width: 0 }}
                          animate={{ width: `${(badge.progress / badge.total) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          style={{ backgroundColor: badge.color }}
                        />
                      </div>
                      <span className={styles.progressText}>{badge.progress}/{badge.total}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Combined component for easy usage
const Gamification: React.FC<{ onShowBadges?: () => void }> = ({ onShowBadges }) => {
  return <StreakCard onShowBadges={onShowBadges} />
}

export default Gamification
