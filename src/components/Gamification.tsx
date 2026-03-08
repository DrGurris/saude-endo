import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Flame, Star, Target, Award, Calendar, Heart, Zap, CheckCircle2, X } from 'lucide-react'
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

interface GamificationData {
  currentStreak: number
  longestStreak: number
  totalDaysLogged: number
  habitsCompletedToday: number
  totalHabitsCompleted: number
}

// Helper to get streak data from localStorage
function getGamificationData(): GamificationData {
  const symptomPrefix = 'saude_diario_'
  const habitPrefix = 'saude_habit_'
  
  let totalDaysLogged = 0
  let currentStreak = 0
  let longestStreak = 0
  let habitsCompletedToday = 0
  let totalHabitsCompleted = 0
  
  // Count symptom logs and calculate streak
  const dates: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(symptomPrefix)) {
      const date = key.replace(symptomPrefix, '')
      dates.push(date)
      totalDaysLogged++
    }
    if (key?.startsWith(habitPrefix)) {
      const value = localStorage.getItem(key)
      if (value === 'true') {
        totalHabitsCompleted++
        // Check if it's today
        if (key.includes(new Date().toISOString().split('T')[0])) {
          habitsCompletedToday++
        }
      }
    }
  }
  
  // Sort dates and calculate streak
  dates.sort((a, b) => b.localeCompare(a)) // Most recent first
  
  if (dates.length > 0) {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    // Check if user logged today or yesterday to start streak
    if (dates[0] === today || dates[0] === yesterday) {
      currentStreak = 1
      let prevDate = new Date(dates[0])
      
      for (let i = 1; i < dates.length; i++) {
        const currDate = new Date(dates[i])
        const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / 86400000)
        
        if (diffDays === 1) {
          currentStreak++
          prevDate = currDate
        } else {
          break
        }
      }
    }
    
    // Calculate longest streak
    let tempStreak = 1
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1])
      const curr = new Date(dates[i])
      const diffDays = Math.floor((prev.getTime() - curr.getTime()) / 86400000)
      
      if (diffDays === 1) {
        tempStreak++
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak)
  }
  
  return { currentStreak, longestStreak, totalDaysLogged, habitsCompletedToday, totalHabitsCompleted }
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
      description: 'Registra 14 días en total',
      icon: <Calendar size={24} />,
      color: 'var(--color-secondary)',
      unlocked: data.totalDaysLogged >= 14,
      progress: Math.min(data.totalDaysLogged, 14),
      total: 14,
    },
  ]
}

// Streak Card Component
export const StreakCard: React.FC<{ onShowBadges?: () => void }> = ({ onShowBadges }) => {
  const data = useMemo(() => getGamificationData(), [])
  const badges = useMemo(() => getBadges(data), [data])
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
  const data = useMemo(() => getGamificationData(), [])
  const badges = useMemo(() => getBadges(data), [data])

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
                    {badge.unlocked ? badge.icon : badge.icon}
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
