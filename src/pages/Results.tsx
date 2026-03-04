import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CalendarCheck, Info, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PHENOTYPE_LABELS, PHENOTYPE_DESCRIPTIONS } from '../types'
import styles from './Results.module.css'

const Results: React.FC = () => {
  const { user, phenotypeResult } = useAuth()

  if (!phenotypeResult) {
    return <Navigate to="/questionnaire" replace />
  }

  const details = PHENOTYPE_DESCRIPTIONS[phenotypeResult.dominantPhenotype]
  const label = PHENOTYPE_LABELS[phenotypeResult.dominantPhenotype]

  return (
    <div className={styles.container}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '900px' }}>

        <header className={styles.header}>
          <h1>Hola, {user?.name ?? 'Valiente'}</h1>
          <p className={styles.subtitle}>Hemos analizado tus s&iacute;ntomas. Tu dolor es real y tiene un nombre.</p>
        </header>

        <div className={styles.resultCard} style={{ borderTop: `4px solid ${details.color}` }}>
          <div className={styles.badge}>Resultado de Evaluaci&oacute;n</div>
          <h2 className={styles.dominantText} style={{ color: details.color }}>
            Perfil de Dolor {label}
          </h2>
          <p className={styles.description}>{details.description}</p>

          <div className={styles.chartContainer}>
            <div className={styles.chartBar}>
              <div className={styles.chartOption}>
                <span>Nociceptivo (Inflamatorio)</span>
                <div className={styles.barWrap}>
                  <div className={styles.barFill} style={{ width: `${phenotypeResult.scores.nociceptive}%`, background: 'var(--color-info)' }} />
                </div>
                <span>{phenotypeResult.scores.nociceptive}%</span>
              </div>
              <div className={styles.chartOption}>
                <span>Neurop&aacute;tico (Nervioso)</span>
                <div className={styles.barWrap}>
                  <div className={styles.barFill} style={{ width: `${phenotypeResult.scores.neuropathic}%`, background: 'var(--color-accent)' }} />
                </div>
                <span>{phenotypeResult.scores.neuropathic}%</span>
              </div>
              <div className={styles.chartOption}>
                <span>Nocipl&aacute;stico (Sensibilizaci&oacute;n)</span>
                <div className={styles.barWrap}>
                  <div className={styles.barFill} style={{ width: `${phenotypeResult.scores.nociplastic}%`, background: 'var(--color-success)' }} />
                </div>
                <span>{phenotypeResult.scores.nociplastic}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionSection}>
          <div className={styles.nextSteps}>
            <h3>Siguientes Pasos</h3>
            <div className={styles.infoBox}>
              <Info size={24} color={details.color} className={styles.infoIcon} />
              <p>{details.action}</p>
            </div>
            <p className={styles.campaignText}>
              Aprovecha nuestra <strong>Campa&ntilde;a del Mes de la Endometriosis</strong>: Agenda tu consulta de revisi&oacute;n presentando este resultado para recibir tratamiento oportuno.
            </p>
          </div>

          <div className={styles.ctaCard}>
            <h3>Agenda tu Cita</h3>
            <p>El diagn&oacute;stico temprano hace la diferencia.</p>
            <button className={styles.bookingBtn}>
              <CalendarCheck size={20} /> Solicitar Cita
            </button>
            <Link to="/portal" className={styles.portalLink}>
              Continuar a mi Portal de Bienestar <ChevronRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Results
