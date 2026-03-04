import React, { useMemo } from 'react'
import { Activity, BatteryCharging, Apple, Droplets, Smile, ChevronRight, Share2 } from 'lucide-react'
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
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px' }}>

        <header className={styles.dashboardHeader}>
          <div>
            <h1>Hola, {user?.name?.split(' ')[0] ?? 'Bienvenida'}</h1>
            <p className={styles.subtitle}>Tu gu&iacute;a integral basada en los 5 pilares de Saude.</p>
          </div>
          <div className={styles.scoreCard}>
            <div className={styles.scoreInfo}>
              <span className={styles.scoreLabel}>&Iacute;ndice de Bienestar</span>
              <span className={styles.scoreValue}>72<small>/100</small></span>
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
          </div>
        </header>

        <div className={styles.pillarsGrid}>
          {sortedPillars.map((pillar) => (
            <div key={pillar.id} className={styles.pillarCard} style={{ borderTopColor: pillar.color }}>
              <div className={styles.pillarHeader}>
                <div className={styles.iconWrapper} style={{ backgroundColor: pillar.bg, color: pillar.color }}>
                  {pillar.icon}
                </div>
                <h3>{pillar.title}</h3>
              </div>

              <div className={styles.habitsList}>
                {pillar.habits.map((habit, idx) => (
                  <label key={idx} className={styles.habitItem}>
                    <input type="checkbox" className={styles.checkbox} style={{ accentColor: pillar.color }} />
                    <span className={styles.habitText}>{habit}</span>
                  </label>
                ))}
              </div>

              <button className={styles.moduleBtn} style={{ color: pillar.color }}>
                Ver M&oacute;dulo Completo <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.widgetsGrid}>
          <div className={`${styles.widget} ${styles.widgetPrimary}`}>
            <h3>Campa&ntilde;a Saude: Mes de la Endometriosis</h3>
            <p>Recuerda que tienes un pase preferencial para consulta de revisi&oacute;n.</p>
            <button className={styles.widgetBtn}>Agendar Revisi&oacute;n</button>
          </div>

          <div className={`${styles.widget} ${styles.widgetYellow}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Diario de S&iacute;ntomas</h3>
              <span style={{ fontSize: '1.5rem' }}>&#128221;</span>
            </div>
            <p>Registra c&oacute;mo te sientes hoy para ir ajustando tu &iacute;ndice de bienestar.</p>
            <button className={styles.widgetBtnOutline}>Registrar mi d&iacute;a</button>
          </div>

          <div className={styles.widget}>
            <h3>Comparte tu Historia</h3>
            <p>1 de cada 10 mujeres vive con esto. Ay&uacute;danos a visibilizar y crear comunidad.</p>
            <button className={styles.widgetBtnOutlineVariant}>
              <Share2 size={16} /> Compartir Campa&ntilde;a
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Portal
