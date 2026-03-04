import React, { useMemo, useState } from 'react'
import { Activity, BatteryCharging, Apple, Droplets, Smile, ChevronRight, Share2, CalendarDays, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { GOAL_PILLAR_MAP } from '../types'
import type { PillarId } from '../types'
import styles from './Portal.module.css'

interface PillarData {
  id: PillarId
  title: string
  icon: React.ReactNode
  color: string
  bg: string
  habits: string[]
}

const ALL_PILLARS: PillarData[] = [
  {
    id: 'pain',
    title: 'Maneja tu Dolor',
    icon: <Activity size={24} />,
    color: 'var(--color-primary)',
    bg: 'rgba(16, 93, 119, 0.1)',
    habits: ['Usar TENS (20 min)', 'Ejercicios de suelo pélvico', 'Registrar dolor diario'],
  },
  {
    id: 'energy',
    title: 'Recupera tu Energía',
    icon: <BatteryCharging size={24} />,
    color: 'var(--color-success)',
    bg: 'rgba(42, 157, 143, 0.1)',
    habits: ['Dormir 8 horas', 'Tomar Magnesio/Vit D', 'Caminata ligera (15 min)'],
  },
  {
    id: 'nutrition',
    title: 'Cuida tu Alimentación',
    icon: <Apple size={24} />,
    color: 'var(--color-secondary)',
    bg: 'rgba(244, 162, 97, 0.1)',
    habits: ['Comida antiinflamatoria', 'Evitar lácteos/gluten hoy', 'Beber 2L de agua'],
  },
  {
    id: 'hormones',
    title: 'Equilibra tus Hormonas',
    icon: <Droplets size={24} />,
    color: 'var(--color-info)',
    bg: 'rgba(69, 123, 157, 0.1)',
    habits: ['Registrar ciclo menstrual', 'Tomar medicación a tiempo'],
  },
  {
    id: 'wellbeing',
    title: 'Fortalece tu Bienestar',
    icon: <Smile size={24} />,
    color: 'var(--color-accent)',
    bg: 'rgba(231, 111, 81, 0.1)',
    habits: ['Meditación (10 min)', 'Respiración diafragmática'],
  },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Animated Checkbox Component with localStorage persistence
const HabitCheckbox: React.FC<{
  habit: string
  color: string
  pillarId: string
  index: number
}> = ({ habit, color, pillarId, index }) => {
  const storageKey = `saude_habit_${pillarId}_${index}`

  const [checked, setChecked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === 'true'
    } catch {
      return false
    }
  })

  const handleToggle = () => {
    const next = !checked
    setChecked(next)
    try {
      localStorage.setItem(storageKey, String(next))
    } catch { /* ignore */ }
  }

  return (
    <motion.label
      className={`${styles.habitItem} ${checked ? styles.habitDone : ''}`}
      onClick={handleToggle}
      whileHover={{ x: 3 }}
      transition={{ duration: 0.15 }}
      data-testid={`habit-${pillarId}-${index}`}
    >
      <motion.div
        className={styles.habitCheckbox}
        animate={checked
          ? { backgroundColor: color, borderColor: color, scale: [1, 1.15, 1] }
          : { backgroundColor: 'transparent', borderColor: 'var(--color-border)', scale: 1 }
        }
        transition={{ duration: 0.2 }}
        style={{ borderColor: 'var(--color-border)' }}
      >
        {checked && (
          <motion.svg
            width="12" height="12" viewBox="0 0 12 12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <motion.path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25 }}
            />
          </motion.svg>
        )}
      </motion.div>
      <span className={styles.habitText} style={checked ? { textDecoration: 'line-through', opacity: 0.5 } : {}}>
        {habit}
      </span>
    </motion.label>
  )
}

const Portal: React.FC = () => {
  const { user, phenotypeResult } = useAuth()

  const sortedPillars = useMemo(() => {
    if (!phenotypeResult?.goal) return ALL_PILLARS
    const mapping = GOAL_PILLAR_MAP[phenotypeResult.goal]
    if (!mapping) return ALL_PILLARS
    return [...ALL_PILLARS].sort((a, b) => {
      if (a.id === mapping.primary) return -1
      if (b.id === mapping.primary) return 1
      if (a.id === mapping.secondary) return -1
      if (b.id === mapping.secondary) return 1
      return 0
    })
  }, [phenotypeResult])

  return (
    <div className={styles.container}>
      <motion.div
        style={{ width: '100%', maxWidth: '1200px' }}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Dashboard Header */}
        <motion.header className={styles.dashboardHeader} variants={fadeUp}>
          <div>
            <h1 data-testid="portal-greeting">Hola, {user?.name?.split(' ')[0] ?? 'Bienvenida'} 👋</h1>
            <p className={styles.subtitle}>Tu guía integral basada en los 5 pilares de Saude.</p>
          </div>
          <motion.div
            className={styles.scoreCard}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55, ease: 'backOut' }}
          >
            <div className={styles.scoreInfo}>
              <span className={styles.scoreLabel}>Índice de Bienestar</span>
              <motion.span
                className={styles.scoreValue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                72<small>/100</small>
              </motion.span>
            </div>
            <div className={styles.scoreGraph}>
              <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path className={styles.circleBg}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className={styles.circle}
                  strokeDasharray="72, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </div>
          </motion.div>
        </motion.header>

        {/* Pillar Cards */}
        <motion.div
          className={styles.pillarsGrid}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {sortedPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              className={styles.pillarCard}
              style={{ borderTopColor: pillar.color }}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              data-testid={`pillar-card-${pillar.id}`}
            >
              <div className={styles.pillarHeader}>
                <motion.div
                  className={styles.iconWrapper}
                  style={{ backgroundColor: pillar.bg, color: pillar.color }}
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.08, type: 'spring', stiffness: 200 }}
                >
                  {pillar.icon}
                </motion.div>
                <h3>{pillar.title}</h3>
              </div>

              <div className={styles.habitsList}>
                {pillar.habits.map((habit, hIdx) => (
                  <HabitCheckbox
                    key={habit}
                    habit={habit}
                    color={pillar.color}
                    pillarId={pillar.id}
                    index={hIdx}
                  />
                ))}
              </div>

              <motion.button
                className={styles.moduleBtn}
                style={{ color: pillar.color }}
                whileHover={{ paddingLeft: '1.25rem' }}
                transition={{ duration: 0.15 }}
              >
                Ver Módulo Completo <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Widgets */}
        <motion.div
          className={styles.widgetsGrid}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className={`${styles.widget} ${styles.widgetPrimary}`}
            variants={cardVariant}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className={styles.widgetIcon}>
              <CalendarDays size={24} color="var(--color-endo-yellow)" />
            </div>
            <h3>Campaña Saude: Mes de la Endometriosis</h3>
            <p>Recuerda que tienes un pase preferencial para consulta de revisión.</p>
            <motion.button
              className={styles.widgetBtn}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-testid="widget-agendar"
            >
              Agendar Revisión
            </motion.button>
          </motion.div>

          <motion.div
            className={`${styles.widget} ${styles.widgetYellow}`}
            variants={cardVariant}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className={styles.widgetIcon}>
              <BookOpen size={24} color="var(--color-primary-dark)" />
            </div>
            <h3>Diario de Síntomas</h3>
            <p>Registra cómo te sientes hoy para ir ajustando tu índice de bienestar.</p>
            <motion.button
              className={styles.widgetBtnOutline}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              data-testid="widget-diario"
            >
              Registrar mi día
            </motion.button>
          </motion.div>

          <motion.div
            className={styles.widget}
            variants={cardVariant}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className={styles.widgetIcon}>
              <Share2 size={24} color="var(--color-primary)" />
            </div>
            <h3>Comparte tu Historia</h3>
            <p>1 de cada 10 mujeres vive con esto. Ayúdanos a visibilizar y crear comunidad.</p>
            <motion.button
              className={styles.widgetBtnOutlineVariant}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              data-testid="widget-compartir"
            >
              <Share2 size={16} /> Compartir Campaña
            </motion.button>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Portal
