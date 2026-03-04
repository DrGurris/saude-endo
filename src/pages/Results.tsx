import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CalendarCheck, Info, ChevronRight, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { PHENOTYPE_LABELS, PHENOTYPE_DESCRIPTIONS } from '../types'
import styles from './Results.module.css'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

interface BarProps {
  label: string
  value: number
  color: string
  delay: number
}

const AnimatedBar: React.FC<BarProps> = ({ label, value, color, delay }) => (
  <div className={styles.chartOption}>
    <span className={styles.barLabel}>{label}</span>
    <div className={styles.barWrap}>
      <motion.div
        className={styles.barFill}
        initial={{ width: '0%' }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ background: color }}
      />
    </div>
    <motion.span
      className={styles.barPct}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.6, duration: 0.4 }}
    >
      {value}%
    </motion.span>
  </div>
)

const Results: React.FC = () => {
  const { user, phenotypeResult } = useAuth()

  if (!phenotypeResult) {
    return <Navigate to="/questionnaire" replace />
  }

  const details = PHENOTYPE_DESCRIPTIONS[phenotypeResult.dominantPhenotype]
  const label = PHENOTYPE_LABELS[phenotypeResult.dominantPhenotype]

  return (
    <div className={styles.container}>
      <motion.div
        style={{ width: '100%', maxWidth: '900px' }}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className={styles.header} variants={fadeUp}>
          <div className={styles.headerBadge}>
            <Award size={18} color="var(--color-endo-yellow-dark)" />
            <span>Evaluación completada</span>
          </div>
          <h1>Hola, {user?.name ?? 'Valiente'}</h1>
          <p className={styles.subtitle}>Hemos analizado tus síntomas. Tu dolor es real y tiene un nombre.</p>
        </motion.header>

        {/* Result Card */}
        <motion.div
          className={styles.resultCard}
          style={{ borderTop: `4px solid ${details.color}` }}
          variants={scaleIn}
        >
          <div className={styles.badge}>Resultado de Evaluación</div>
          <motion.h2
            className={styles.dominantText}
            style={{ color: details.color }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Perfil de Dolor {label}
          </motion.h2>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {details.description}
          </motion.p>

          {/* Animated Chart */}
          <motion.div
            className={styles.chartContainer}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className={styles.chartTitle}>Distribución de tu fenotipo de dolor</p>
            <div className={styles.chartBar}>
              <AnimatedBar
                label="Nociceptivo (Inflamatorio)"
                value={phenotypeResult.scores.nociceptive}
                color="var(--color-info)"
                delay={0.7}
              />
              <AnimatedBar
                label="Neuropático (Nervioso)"
                value={phenotypeResult.scores.neuropathic}
                color="var(--color-accent)"
                delay={0.9}
              />
              <AnimatedBar
                label="Nociplástico (Sensibilización)"
                value={phenotypeResult.scores.nociplastic}
                color="var(--color-success)"
                delay={1.1}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Action Section */}
        <motion.div className={styles.actionSection} variants={stagger}>
          <motion.div className={styles.nextSteps} variants={fadeUp}>
            <h3>Siguientes Pasos</h3>
            <div className={styles.infoBox}>
              <Info size={24} color={details.color} className={styles.infoIcon} />
              <p>{details.action}</p>
            </div>
            <p className={styles.campaignText}>
              Aprovecha nuestra <strong>Campaña del Mes de la Endometriosis</strong>: Agenda tu consulta de revisión presentando este resultado para recibir tratamiento oportuno.
            </p>
          </motion.div>

          <motion.div className={styles.ctaCard} variants={scaleIn}>
            <div className={styles.ctaIconTop}>
              <CalendarCheck size={28} color="var(--color-endo-yellow)" />
            </div>
            <h3>Agenda tu Cita</h3>
            <p>El diagnóstico temprano hace la diferencia.</p>
            <motion.button
              className={styles.bookingBtn}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-testid="booking-btn"
            >
              <CalendarCheck size={20} /> Solicitar Cita
            </motion.button>
            <Link to="/portal" className={styles.portalLink} data-testid="portal-link">
              Continuar a mi Portal de Bienestar <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Results
