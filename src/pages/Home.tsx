import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, ArrowRight, PlayCircle,
  Zap, Brain, Heart, Apple, BatteryCharging, Smile, Droplets,
  ClipboardCheck, UserPlus, LayoutDashboard, CheckCircle, Star,
  Quote,
} from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './Home.module.css'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1767884022378-7909a74a15ab?w=700&q=85&crop=entropy&cs=srgb'
const WELLBEING_IMAGE =
  'https://images.unsplash.com/photo-1769238507274-59e0db6c6bbe?w=600&q=80&crop=entropy&cs=srgb'

const TESTIMONIALS = [
  {
    name: 'Valentina G.',
    city: 'Ciudad de México',
    age: 32,
    initials: 'VG',
    color: 'var(--color-primary)',
    bg: 'rgba(16,93,119,0.12)',
    quote: 'Por fin alguien entendió que mi dolor era real. El cuestionario me ayudó a identificar mi fenotipo, y el plan de tratamiento cambió completamente mi vida.',
  },
  {
    name: 'Mariana T.',
    city: 'Bogotá, Colombia',
    age: 28,
    initials: 'MT',
    color: 'var(--color-success)',
    bg: 'rgba(42,157,143,0.12)',
    quote: 'Tardé 9 años en obtener un diagnóstico. Saude me dio las herramientas para hablar con mi ginecóloga con más claridad y finalmente recibir atención adecuada.',
  },
  {
    name: 'Carolina R.',
    city: 'Buenos Aires, Argentina',
    age: 35,
    initials: 'CR',
    color: 'var(--color-secondary)',
    bg: 'rgba(244,162,97,0.12)',
    quote: 'La sección de alimentación antiinflamatoria fue un cambio de vida para mi endo belly. Finalmente entiendo qué comer y por qué me siento así.',
  },
  {
    name: 'Sofía M.',
    city: 'Santiago, Chile',
    age: 24,
    initials: 'SM',
    color: 'var(--color-accent)',
    bg: 'rgba(231,111,81,0.12)',
    quote: 'Pensé que era normal sentir tanto dolor. Gracias al cuestionario entendí que tenía sensibilización central y pude buscar el especialista adecuado.',
  },
]

// ─── Animation Variants ────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// ─── Component ─────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  return (
    <div className={styles.container}>

      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.blobTopRight} />
        <div className={styles.blobBottomLeft} />

        <div className={styles.heroInner}>
          {/* Left: Text */}
          <motion.div
            className={styles.heroText}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={styles.badge} variants={fadeUp}>
              <span className={styles.badgePulse} />
              <span>&#127895; Mes de Concientización en Endometriosis</span>
            </motion.div>

            <motion.h1 className={styles.title} variants={fadeUp}>
              No es <span className={styles.highlight}>&quot;solo un cólico&quot;</span>.<br />
              Es hora de validarlo.
            </motion.h1>

            <motion.p className={styles.subtitle} variants={fadeUp}>
              1 de cada 10 mujeres vive con endometriosis, muchas sin diagnóstico.
              En Saude Clínica de la Mujer, te ayudamos a entender tu dolor y tomar el control de tu salud.
            </motion.p>

            <motion.div className={styles.heroActions} variants={fadeUp}>
              <Link to="/questionnaire" data-testid="hero-cta-btn" className={styles.primaryButton}>
                Evaluar mi dolor ahora <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div className={styles.heroTrustBadges} variants={fadeUp}>
              <div className={styles.trustBadge}>
                <CheckCircle size={15} color="var(--color-success)" />
                <span>Gratuito</span>
              </div>
              <div className={styles.trustBadge}>
                <CheckCircle size={15} color="var(--color-success)" />
                <span>Resultado inmediato</span>
              </div>
              <div className={styles.trustBadge}>
                <CheckCircle size={15} color="var(--color-success)" />
                <span>Basado en evidencia</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.img
              src={HERO_IMAGE}
              alt="Mujer mirando al horizonte con esperanza y bienestar"
              className={styles.heroImg}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            />
            {/* Floating card: emotion */}
            <motion.div
              className={`${styles.floatingCard} ${styles.floatingCardRight}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <span className={styles.floatingIconWrap} style={{ background: 'rgba(231,111,81,0.12)' }}>
                <Heart size={18} color="var(--color-accent)" />
              </span>
              <div>
                <p className={styles.floatingTitle}>Tu dolor es real</p>
                <p className={styles.floatingSubtitle}>y tiene solución</p>
              </div>
            </motion.div>
            {/* Floating card: stat */}
            <motion.div
              className={`${styles.floatingCard} ${styles.floatingCardLeft}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <span className={styles.floatingIconWrap} style={{ background: 'rgba(16,93,119,0.1)' }}>
                <Activity size={18} color="var(--color-primary)" />
              </span>
              <div>
                <p className={styles.floatingTitle}>190M mujeres</p>
                <p className={styles.floatingSubtitle}>afectadas en el mundo</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ══════════════════════════════════════════════════════════ */}
      <section className={styles.statsSection}>
        <motion.div
          className={styles.statsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div className={styles.statCard} variants={scaleIn}>
            <span className={styles.statNumber}>190M</span>
            <span className={styles.statLabel}>Mujeres afectadas en el mundo</span>
          </motion.div>
          <motion.div className={styles.statCard} variants={scaleIn}>
            <span className={styles.statNumber}>7-12</span>
            <span className={styles.statLabel}>Años promedio para diagnóstico</span>
          </motion.div>
          <motion.div className={styles.statCard} variants={scaleIn}>
            <span className={styles.statNumber}>70%</span>
            <span className={styles.statLabel}>Reportan dolor crónico pélvico</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ WHAT IS ENDOMETRIOSIS ════════════════════════════════════════ */}
      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <motion.div
            className={styles.infoHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>¿Qué es la endometriosis?</h2>
            <p>
              La endometriosis es una enfermedad crónica donde tejido similar al endometrio crece fuera del útero,
              causando dolor, inflamación y adherencias. Afecta a <strong>1 de cada 10 mujeres</strong> en edad reproductiva
              y el diagnóstico tarda en promedio <strong>7 a 12 años</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3 PAIN TYPES ═══════════════════════════════════════════════════ */}
      <section className={styles.painSection}>
        <div className={styles.infoContainer}>
          <motion.div
            className={styles.infoHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Los 3 tipos de dolor en endometriosis</h2>
            <p>Entender el tipo de dolor (fenotipo) es el primer paso hacia un tratamiento efectivo y personalizado.</p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              className={`${styles.card} ${styles.cardInfo}`}
              variants={slideUp}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`${styles.iconWrapper} ${styles.bgInfo}`}>
                <Activity size={24} color="var(--color-info)" />
              </div>
              <h3>Nociceptivo (Inflamatorio)</h3>
              <p>
                Dolor directamente causado por inflamación y lesiones de endometriosis.
                Se manifiesta como cólicos intensos, sensibilidad abdominal y dolor que empeora con la menstruación.
                El tratamiento se enfoca en antiinflamatorios y terapia hormonal.
              </p>
            </motion.div>

            <motion.div
              className={`${styles.card} ${styles.cardAccent}`}
              variants={slideUp}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`${styles.iconWrapper} ${styles.bgAccent}`}>
                <Zap size={24} color="var(--color-accent)" />
              </div>
              <h3>Neuropático (Nervioso)</h3>
              <p>
                Los nervios pélvicos están siendo afectados o sensibilizados.
                Se siente como ardor, descargas eléctricas, dolor punzante que irradia a piernas o espalda.
                Requiere neuromoduladores y evaluación especializada.
              </p>
            </motion.div>

            <motion.div
              className={`${styles.card} ${styles.cardSuccess}`}
              variants={slideUp}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`${styles.iconWrapper} ${styles.bgSuccess}`}>
                <Brain size={24} color="var(--color-success)" />
              </div>
              <h3>Nociplástico (Sensibilización)</h3>
              <p>
                El sistema nervioso central amplifica las señales de dolor.
                Se manifiesta como fatiga extrema, dolor difuso, problemas de sueño y sensibilidad aumentada.
                Requiere un abordaje multidisciplinario mente-cuerpo.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5 PILLARS ══════════════════════════════════════════════════════ */}
      <section className={styles.pillarsSection}>
        <div className={styles.infoContainer}>
          <motion.div
            className={styles.infoHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Nuestro enfoque: 5 Pilares de Salud</h2>
            <p>Un abordaje integral que va más allá de los medicamentos para mejorar tu calidad de vida.</p>
          </motion.div>

          <div className={styles.pillarsLayout}>
            {/* Image Panel */}
            <motion.div
              className={styles.pillarsImagePanel}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            >
              <img src={WELLBEING_IMAGE} alt="Mujer meditando en bosque, representando bienestar integral" className={styles.pillarsImg} />
              <div className={styles.pillarsImgOverlay}>
                <h3>Tu bienestar integral</h3>
                <p>Un plan personalizado basado en tu fenotipo de dolor</p>
              </div>
            </motion.div>

            {/* Pillars List */}
            <motion.div
              className={styles.pillarsGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { icon: <Heart size={20} />, title: 'Maneja tu Dolor', sub: 'TENS, suelo pélvico, manejo farmacológico', bg: 'rgba(16,93,119,0.1)', color: 'var(--color-primary)' },
                { icon: <BatteryCharging size={20} />, title: 'Recupera tu Energía', sub: 'Higiene del sueño, suplementos, ejercicio', bg: 'rgba(42,157,143,0.1)', color: 'var(--color-success)' },
                { icon: <Apple size={20} />, title: 'Cuida tu Alimentación', sub: 'Dieta antiinflamatoria, endo belly, nutrientes', bg: 'rgba(244,162,97,0.1)', color: 'var(--color-secondary)' },
                { icon: <Droplets size={20} />, title: 'Equilibra tus Hormonas', sub: 'Ciclo menstrual, fertilidad, balance hormonal', bg: 'rgba(69,123,157,0.1)', color: 'var(--color-info)' },
                { icon: <Smile size={20} />, title: 'Fortalece tu Bienestar', sub: 'Salud mental, mindfulness, apoyo emocional', bg: 'rgba(231,111,81,0.1)', color: 'var(--color-accent)' },
              ].map((p) => (
                <motion.div key={p.title} className={styles.pillarItem} variants={slideUp}>
                  <div className={styles.pillarIcon} style={{ backgroundColor: p.bg, color: p.color }}>
                    {p.icon}
                  </div>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══════════════════════════════════════════════════ */}
      <section className={styles.howSection}>
        <div className={styles.infoContainer}>
          <motion.div
            className={styles.infoHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>¿Cómo funciona?</h2>
            <p>En 3 simples pasos accede a tu portal personalizado de bienestar.</p>
          </motion.div>

          <motion.div
            className={styles.stepsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className={styles.stepCard} variants={slideUp}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}><ClipboardCheck size={32} color="var(--color-primary)" /></div>
              <h3>Evalúa tu dolor</h3>
              <p>Completa nuestro cuestionario de 7 pasos para identificar tu fenotipo de dolor.</p>
            </motion.div>

            <motion.div className={styles.stepArrow} variants={fadeUp}>
              <ArrowRight size={24} />
            </motion.div>

            <motion.div className={styles.stepCard} variants={slideUp}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}><UserPlus size={32} color="var(--color-endo-yellow-dark)" /></div>
              <h3>Crea tu cuenta</h3>
              <p>Regístrate para guardar tus resultados y acceder a contenido personalizado.</p>
            </motion.div>

            <motion.div className={styles.stepArrow} variants={fadeUp}>
              <ArrowRight size={24} />
            </motion.div>

            <motion.div className={styles.stepCard} variants={slideUp}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}><LayoutDashboard size={32} color="var(--color-success)" /></div>
              <h3>Accede a tu portal</h3>
              <p>Recibe hábitos, artículos y recomendaciones basadas en tu perfil único.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ════════════════════════════════════════════════ */}
      <section className={styles.testimoniosSection}>
        <div className={styles.infoContainer}>
          <motion.div
            className={styles.infoHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Lo que dicen nuestras pacientes</h2>
            <p>Mujeres que encontraron respuestas y tomaron el control de su salud.</p>
          </motion.div>

          <motion.div
            className={styles.testimoniosGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                className={styles.testimonialCard}
                variants={slideUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Quote size={28} className={styles.quoteIcon} color={t.color} />
                <p className={styles.testimonialQuote}>{t.quote}</p>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={t.color} color={t.color} />
                  ))}
                </div>
                <div className={styles.testimonialAuthor}>
                  <div
                    className={styles.testimonialAvatar}
                    style={{ backgroundColor: t.bg, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialMeta}>{t.age} años · {t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ LIBRARY PREVIEW ══════════════════════════════════════════════ */}
      <section className={styles.libraryPreview}>
        <div className={styles.infoContainer}>
          <motion.div
            className={styles.infoHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Biblioteca de Conocimiento</h2>
            <p>Artículos y recursos para entender y manejar tu endometriosis.</p>
          </motion.div>

          <motion.div
            className={styles.libraryGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className={styles.libraryCard} variants={slideUp}>
              <Apple size={28} color="var(--color-success)" />
              <h3>Nutrición</h3>
              <p>Dieta antiinflamatoria y alimentos que pueden aliviar síntomas.</p>
            </motion.div>
            <motion.div className={styles.libraryCard} variants={slideUp}>
              <Activity size={28} color="var(--color-accent)" />
              <h3>Ejercicio</h3>
              <p>Rutinas suaves y ejercicios adaptados para días de dolor.</p>
            </motion.div>
            <motion.div className={styles.libraryCard} variants={slideUp}>
              <Brain size={28} color="var(--color-info)" />
              <h3>Bienestar Emocional</h3>
              <p>Manejo del estrés, ansiedad y cuidado de la salud mental.</p>
            </motion.div>
            <motion.div className={styles.libraryCard} variants={slideUp}>
              <Heart size={28} color="var(--color-secondary)" />
              <h3>Información Médica</h3>
              <p>Guías sobre fenotipos, tratamientos y fertilidad.</p>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.libraryAction}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link to="/library" className={styles.secondaryBtn} data-testid="library-cta">
              Explorar Biblioteca <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className={styles.ctaGlowTop} />
          <div className={styles.ctaGlowBottom} />
          <div className={styles.ctaContent}>
            <h2>Campaña de Revisión Saude</h2>
            <p>
              Durante el mes de concientización, te invitamos a dar el primer paso.
              Realiza nuestro cuestionario gratuito para recibir tu fenotipo pre-evaluado y un pase preferencial a consulta.
            </p>
            <Link to="/questionnaire" data-testid="cta-section-btn" className={styles.ctaButton}>
              Iniciar Evaluación <PlayCircle size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}

export default Home
