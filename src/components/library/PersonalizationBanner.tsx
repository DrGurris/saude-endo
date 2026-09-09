import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, UserPlus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { PHENOTYPE_LABELS } from '../../types'
import styles from './PersonalizationBanner.module.css'

const PersonalizationBanner: React.FC = () => {
  const { isAuthenticated, phenotypeResult } = useAuth()

  // Authenticated + has phenotype = personalized banner
  if (isAuthenticated && phenotypeResult) {
    const label = PHENOTYPE_LABELS[phenotypeResult.dominantPhenotype]
    return (
      <div className={`${styles.banner} ${styles.bannerPersonalized}`}>
        <div className={styles.iconWrap} style={{ background: 'rgba(42,157,143,0.15)' }}>
          <Sparkles size={22} color="var(--color-success)" />
        </div>
        <div className={styles.textWrap}>
          <p className={styles.bannerTitle}>
            Contenido personalizado para ti
          </p>
          <p className={styles.bannerDesc}>
            Basado en tu perfil{' '}
            <span
              className={styles.phenotypeChip}
              style={{
                background: 'rgba(42,157,143,0.12)',
                color: 'var(--color-success)',
              }}
            >
              {label}
            </span>
            {' '}— los artículos recomendados aparecen primero.
          </p>
        </div>
      </div>
    )
  }

  // Not authenticated or no phenotype = CTA banner
  return (
    <div className={`${styles.banner} ${styles.bannerCta}`}>
      <div className={styles.iconWrap} style={{ background: 'rgba(16,93,119,0.12)' }}>
        <UserPlus size={22} color="var(--color-primary)" />
      </div>
      <div className={styles.textWrap}>
        <p className={styles.bannerTitle}>
          {isAuthenticated ? 'Completa tu evaluación' : 'Regístrate para contenido personalizado'}
        </p>
        <p className={styles.bannerDesc}>
          {isAuthenticated
            ? 'Realiza el cuestionario para recibir recomendaciones basadas en tu perfil de dolor.'
            : 'Evalúa tu dolor y recibe artículos recomendados según tu fenotipo y objetivos.'}
        </p>
      </div>
      <Link
        to={isAuthenticated ? '/questionnaire' : '/register'}
        className={styles.bannerBtn}
      >
        {isAuthenticated ? 'Evaluar' : 'Comenzar'}
        <ArrowRight size={14} />
      </Link>
    </div>
  )
}

export default PersonalizationBanner
