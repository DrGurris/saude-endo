import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, ArrowRight, PlayCircle,
  Zap, Brain, Heart, Apple, BatteryCharging, Smile, Droplets,
  ClipboardCheck, UserPlus, LayoutDashboard,
} from 'lucide-react'
import styles from './Home.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>&#127895;</span> Mes de Concientizaci&oacute;n en Endometriosis
          </div>
          <h1 className={styles.title}>No es &quot;s&oacute;lo un c&oacute;lico&quot;. Es hora de validarlo.</h1>
          <p className={styles.subtitle}>
            1 de cada 10 mujeres vive con endometriosis, muchas sin diagn&oacute;stico.
            En Saude Cl&iacute;nica de la Mujer, te ayudamos a entender tu dolor y tomar el control de tu salud.
          </p>
          <div className={styles.heroActions}>
            <Link to="/questionnaire" className={styles.primaryButton}>
              Evaluar mi dolor ahora <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* What is Endometriosis */}
      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoHeader}>
            <h2>&iquest;Qu&eacute; es la endometriosis?</h2>
            <p>
              La endometriosis es una enfermedad cr&oacute;nica donde tejido similar al endometrio crece fuera del &uacute;tero,
              causando dolor, inflamaci&oacute;n y adherencias. Afecta a <strong>1 de cada 10 mujeres</strong> en edad reproductiva
              y el diagn&oacute;stico tarda en promedio <strong>7 a 12 a&ntilde;os</strong>.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>190M</span>
              <span className={styles.statLabel}>Mujeres afectadas en el mundo</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>7-12</span>
              <span className={styles.statLabel}>A&ntilde;os promedio para diagn&oacute;stico</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>70%</span>
              <span className={styles.statLabel}>Reportan dolor cr&oacute;nico p&eacute;lvico</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Types of Pain */}
      <section className={styles.painSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoHeader}>
            <h2>Los 3 tipos de dolor en endometriosis</h2>
            <p>Entender el tipo de dolor (fenotipo) es el primer paso hacia un tratamiento efectivo y personalizado.</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={`${styles.iconWrapper} ${styles.bgInfo}`}>
                <Activity size={24} color="var(--color-info)" />
              </div>
              <h3>Nociceptivo (Inflamatorio)</h3>
              <p>
                Dolor directamente causado por inflamaci&oacute;n y lesiones de endometriosis.
                Se manifiesta como c&oacute;licos intensos, sensibilidad abdominal y dolor que empeora con la menstruaci&oacute;n.
                El tratamiento se enfoca en antiinflamatorios y terapia hormonal.
              </p>
            </div>

            <div className={styles.card}>
              <div className={`${styles.iconWrapper} ${styles.bgAccent}`}>
                <Zap size={24} color="var(--color-accent)" />
              </div>
              <h3>Neurop&aacute;tico (Nervioso)</h3>
              <p>
                Los nervios p&eacute;lvicos est&aacute;n siendo afectados o sensibilizados.
                Se siente como ardor, descargas el&eacute;ctricas, dolor punzante que irradia a piernas o espalda.
                Requiere neuromoduladores y evaluaci&oacute;n especializada.
              </p>
            </div>

            <div className={styles.card}>
              <div className={`${styles.iconWrapper} ${styles.bgSuccess}`}>
                <Brain size={24} color="var(--color-success)" />
              </div>
              <h3>Nocipl&aacute;stico (Sensibilizaci&oacute;n)</h3>
              <p>
                El sistema nervioso central amplifica las se&ntilde;ales de dolor.
                Se manifiesta como fatiga extrema, dolor difuso, problemas de sue&ntilde;o y sensibilidad aumentada.
                Requiere un abordaje multidisciplinario mente-cuerpo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Pillars */}
      <section className={styles.pillarsSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoHeader}>
            <h2>Nuestro enfoque: 5 Pilares de Salud</h2>
            <p>Un abordaje integral que va m&aacute;s all&aacute; de los medicamentos para mejorar tu calidad de vida.</p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarItem}>
              <div className={styles.pillarIcon} style={{ backgroundColor: 'rgba(16, 93, 119, 0.1)', color: 'var(--color-primary)' }}>
                <Heart size={24} />
              </div>
              <h4>Maneja tu Dolor</h4>
              <p>TENS, suelo p&eacute;lvico, manejo farmacol&oacute;gico</p>
            </div>
            <div className={styles.pillarItem}>
              <div className={styles.pillarIcon} style={{ backgroundColor: 'rgba(42, 157, 143, 0.1)', color: 'var(--color-success)' }}>
                <BatteryCharging size={24} />
              </div>
              <h4>Recupera tu Energ&iacute;a</h4>
              <p>Higiene del sue&ntilde;o, suplementos, ejercicio</p>
            </div>
            <div className={styles.pillarItem}>
              <div className={styles.pillarIcon} style={{ backgroundColor: 'rgba(244, 162, 97, 0.1)', color: 'var(--color-secondary)' }}>
                <Apple size={24} />
              </div>
              <h4>Cuida tu Alimentaci&oacute;n</h4>
              <p>Dieta antiinflamatoria, endo belly, nutrientes</p>
            </div>
            <div className={styles.pillarItem}>
              <div className={styles.pillarIcon} style={{ backgroundColor: 'rgba(69, 123, 157, 0.1)', color: 'var(--color-info)' }}>
                <Droplets size={24} />
              </div>
              <h4>Equilibra tus Hormonas</h4>
              <p>Ciclo menstrual, fertilidad, balance hormonal</p>
            </div>
            <div className={styles.pillarItem}>
              <div className={styles.pillarIcon} style={{ backgroundColor: 'rgba(231, 111, 81, 0.1)', color: 'var(--color-accent)' }}>
                <Smile size={24} />
              </div>
              <h4>Fortalece tu Bienestar</h4>
              <p>Salud mental, mindfulness, apoyo emocional</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoHeader}>
            <h2>&iquest;C&oacute;mo funciona?</h2>
            <p>En 3 simples pasos accede a tu portal personalizado de bienestar.</p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>
                <ClipboardCheck size={32} color="var(--color-primary)" />
              </div>
              <h3>Eval&uacute;a tu dolor</h3>
              <p>Completa nuestro cuestionario de 7 pasos para identificar tu fenotipo de dolor.</p>
            </div>
            <div className={styles.stepArrow}><ArrowRight size={24} /></div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>
                <UserPlus size={32} color="var(--color-endo-yellow-dark)" />
              </div>
              <h3>Crea tu cuenta</h3>
              <p>Reg&iacute;strate para guardar tus resultados y acceder a contenido personalizado.</p>
            </div>
            <div className={styles.stepArrow}><ArrowRight size={24} /></div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>
                <LayoutDashboard size={32} color="var(--color-success)" />
              </div>
              <h3>Accede a tu portal</h3>
              <p>Recibe h&aacute;bitos, art&iacute;culos y recomendaciones basadas en tu perfil &uacute;nico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2>Campa&ntilde;a de Revisi&oacute;n Saude</h2>
            <p>
              Durante el mes de concientizaci&oacute;n, te invitamos a dar el primer paso.
              Realiza nuestro cuestionario gratuito para recibir tu fenotipo pre-evaluado y un pase preferencial a consulta.
            </p>
            <Link to="/questionnaire" className={styles.ctaButton}>
              Iniciar Evaluaci&oacute;n <PlayCircle size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
