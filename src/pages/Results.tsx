import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CalendarCheck, Info, ChevronRight, Award, Flame, Zap, Brain, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { PHENOTYPE_LABELS, PHENOTYPE_DESCRIPTIONS } from '../types'
import type { PhenotypeType } from '../types'
import BookingModal from '../components/BookingModal'
import styles from './Results.module.css'

const PHENOTYPE_VISUALS: Record<PhenotypeType, {
  image: string
  icon: React.ReactNode
  tags: string[]
  profile: string
}> = {
  nociceptive: {
    image: 'https://images.unsplash.com/photo-1552650272-b8a34e21bc4b?w=420&q=80&crop=entropy&cs=srgb',
    icon: <Flame size={22} />,
    tags: ['Inflamatorio', 'Cíclico', 'Hormonal'],
    profile: 'Tu dolor responde principalmente a la inflamación y variaciones hormonales del ciclo menstrual.',
  },
  neuropathic: {
    image: 'https://images.unsplash.com/photo-1769238507274-59e0db6c6bbe?w=420&q=80&crop=entropy&cs=srgb',
    icon: <Zap size={22} />,
    tags: ['Nervioso', 'Irradiado', 'Eléctrico'],
    profile: 'Los nervios pélvicos están sensibilizados. El tratamiento se enfoca en neuromodulación.',
  },
  nociplastic: {
    image: 'https://images.unsplash.com/photo-1600721391711-58a817124605?w=420&q=80&crop=entropy&cs=srgb',
    icon: <Brain size={22} />,
    tags: ['Sensibilización central', 'Sistémico', 'Difuso'],
    profile: 'El sistema nervioso central amplifica el dolor. El abordaje es multidisciplinario mente-cuerpo.',
  },
  mixed: {
    image: 'https://images.unsplash.com/photo-1767884022378-7909a74a15ab?w=420&q=80&crop=entropy&cs=srgb',
    icon: <Layers size={22} />,
    tags: ['Inflamatorio', 'Neuropático', 'Complejo'],
    profile: 'Presentas múltiples componentes. Tu plan requiere un enfoque escalonado y personalizado.',
  },
}

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
  const [showBooking, setShowBooking] = useState(false)

  if (!phenotypeResult) {
    return <Navigate to="/questionnaire" replace />
  }

  const details = PHENOTYPE_DESCRIPTIONS[phenotypeResult.dominantPhenotype]
  const label = PHENOTYPE_LABELS[phenotypeResult.dominantPhenotype]
  const visual = PHENOTYPE_VISUALS[phenotypeResult.dominantPhenotype]

  return (
    <div className={styles.container}>
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
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
          {/* Phenotype Visual Row */}
          <div className={styles.phenotypeVisualRow}>
            <div className={styles.phenotypeTextSide}>
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

              {/* Tags */}
              <motion.div
                className={styles.phenotypeTags}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className={styles.phenotypeIconBadge} style={{ background: `${details.color}18`, color: details.color }}>
                  {visual.icon}
                </span>
                {visual.tags.map((tag) => (
                  <span key={tag} className={styles.tag} style={{ borderColor: `${details.color}40`, color: details.color }}>
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.p
                className={styles.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {details.description}
              </motion.p>
            </div>

            {/* Phenotype Image */}
            <motion.div
              className={styles.phenotypeImageWrap}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
            >
              <img src={visual.image} alt={`Fenotipo ${label}`} className={styles.phenotypeImg} />
              <div className={styles.phenotypeImgOverlay} style={{ background: `linear-gradient(to top, ${details.color}cc, transparent)` }}>
                <p>{visual.profile}</p>
              </div>
            </motion.div>
          </div>

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
              onClick={() => setShowBooking(true)}
              data-testid="booking-btn"
              aria-label="Solicitar cita médica"
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
