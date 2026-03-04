import React, { useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { calculatePhenotype } from '../utils/phenotypeAlgorithm'
import { stepSchemas } from '../utils/validation'
import type {
  DiagnosisOption,
  HormonalStatus,
  PainCharacteristic,
  GoalOption,
  CommitmentLevel,
  QuestionnaireAnswers,
} from '../types'
import { EMPTY_QUESTIONNAIRE_ANSWERS } from '../types'
import styles from './Questionnaire.module.css'

const TOTAL_STEPS = 7

const DIAGNOSIS_OPTIONS: { value: DiagnosisOption; label: string }[] = [
  { value: 'confirmed', label: 'Tengo diagnóstico confirmado de endometriosis' },
  { value: 'suspected', label: 'Sospecho que tengo endometriosis' },
  { value: 'adenomyosis', label: 'Tengo diagnóstico de adenomiosis' },
  { value: 'unsure', label: 'No estoy segura' },
]

const HORMONAL_OPTIONS: { value: HormonalStatus; label: string }[] = [
  { value: 'hormonal_with_period', label: 'Uso anticonceptivos hormonales y tengo mi periodo' },
  { value: 'hormonal_no_period', label: 'Uso anticonceptivos hormonales y NO tengo mi periodo' },
  { value: 'natural_period', label: 'Tengo mi periodo sin anticonceptivos hormonales' },
  { value: 'no_period', label: 'Ya no tengo mi periodo (menopausia natural o inducida)' },
  { value: 'unsure', label: 'No estoy segura' },
]

const PAIN_OPTIONS: { value: PainCharacteristic; label: string }[] = [
  { value: 'cramps_localized', label: 'Cólicos o calambres localizados en pelvis' },
  { value: 'worse_with_menstruation', label: 'Dolor que empeora con la menstruación' },
  { value: 'tenderness_lower_abdomen', label: 'Sensibilidad al presionar el abdomen bajo' },
  { value: 'burning_sensation', label: 'Ardor o sensación de quemazón' },
  { value: 'electric_shocks', label: 'Descargas eléctricas u hormigueo' },
  { value: 'shooting_pain_radiating', label: 'Dolor punzante que irradia a piernas/espalda' },
  { value: 'allodynia', label: 'Dolor al tacto leve en zona pélvica (alodinia)' },
  { value: 'diffuse_pain', label: 'Dolor difuso sin localización clara' },
  { value: 'extreme_fatigue', label: 'Fatiga extrema constante' },
  { value: 'sleep_concentration_problems', label: 'Problemas de sueño o concentración' },
  { value: 'sensitivity_light_sound_touch', label: 'Sensibilidad aumentada a luz, sonido o tacto' },
  { value: 'disproportionate_pain', label: 'Dolor desproporcionado a lo que encuentran en estudios' },
]

const SEVERITY_FIELDS: { key: 'pelvic' | 'nervous' | 'fatigue' | 'digestive' | 'mood'; label: string; color: string }[] = [
  { key: 'pelvic', label: 'Dolor pélvico tipo calambre', color: 'var(--color-info)' },
  { key: 'nervous', label: 'Dolor tipo nervioso (ardor, eléctrico)', color: 'var(--color-accent)' },
  { key: 'fatigue', label: 'Fatiga, problemas de sueño, neblina mental', color: 'var(--color-success)' },
  { key: 'digestive', label: 'Problemas digestivos (endo belly, hinchazón)', color: 'var(--color-secondary)' },
  { key: 'mood', label: 'Cambios de ánimo (ansiedad, tristeza)', color: 'var(--color-primary)' },
]

const GOAL_OPTIONS: { value: GoalOption; label: string; icon: string }[] = [
  { value: 'reduce_pain', label: 'Reducir mi dolor', icon: '💪' },
  { value: 'improve_energy', label: 'Mejorar mi energía y reducir fatiga', icon: '⚡' },
  { value: 'control_belly', label: 'Controlar mi endo belly / problemas digestivos', icon: '🍎' },
  { value: 'balance_hormones', label: 'Equilibrar mis hormonas', icon: '💧' },
  { value: 'improve_fertility', label: 'Mejorar mi fertilidad', icon: '🌸' },
  { value: 'general_wellbeing', label: 'Bienestar general', icon: '🌿' },
]

const COMMITMENT_OPTIONS: { value: CommitmentLevel; label: string }[] = [
  { value: 'very_committed', label: 'Estoy muy comprometida con mejorar mi salud' },
  { value: 'willing_to_try', label: 'Quiero intentarlo y ver cómo me va' },
  { value: 'exploring', label: 'Solo estoy explorando opciones' },
]

const STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
  1: { title: 'Tu diagnóstico', subtitle: 'Esto nos ayuda a personalizar tu experiencia.' },
  2: { title: 'Estado hormonal', subtitle: 'Esto nos ayuda a entender tu ciclo.' },
  3: { title: 'Último periodo', subtitle: 'Selecciona la fecha aproximada de tu último periodo.' },
  4: { title: 'Características de tu dolor', subtitle: 'Selecciona todas las que apliquen regularmente para ti.' },
  5: { title: 'Severidad por área', subtitle: 'Indica la intensidad en cada área (0 = ninguna, 10 = máxima).' },
  6: { title: 'Tu objetivo principal', subtitle: 'Esto nos ayuda a priorizar tu plan.' },
  7: { title: 'Tu nivel de compromiso', subtitle: 'No hay respuesta incorrecta.' },
}

// Step icon labels for the progress dots
const STEP_ICONS: Record<number, string> = {
  1: '🩺', 2: '💊', 3: '📅', 4: '🔍', 5: '📊', 6: '🎯', 7: '🌟',
}

const Questionnaire: React.FC = () => {
  const navigate = useNavigate()
  const { saveQuestionnaireAnswers, savePhenotypeResult } = useAuth()
  const [step, setStep] = useState(1)
  const directionRef = useRef(1)
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({ ...EMPTY_QUESTIONNAIRE_ANSWERS })

  const currentStepData = useMemo(() => {
    const idx = step - 1
    const schema = stepSchemas[idx]
    let dataForStep: Record<string, unknown> = {}
    switch (step) {
      case 1: dataForStep = { q1Diagnosis: answers.q1Diagnosis }; break
      case 2: dataForStep = { q2HormonalStatus: answers.q2HormonalStatus }; break
      case 3: dataForStep = { q3LastPeriod: answers.q3LastPeriod }; break
      case 4: dataForStep = { q4PainCharacteristics: answers.q4PainCharacteristics }; break
      case 5: dataForStep = { q5Severity: answers.q5Severity }; break
      case 6: dataForStep = { q6Goal: answers.q6Goal }; break
      case 7: dataForStep = { q7Commitment: answers.q7Commitment }; break
    }
    return { isValid: schema.safeParse(dataForStep).success }
  }, [step, answers])

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      directionRef.current = 1
      setStep((s) => s + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      directionRef.current = -1
      setStep((s) => s - 1)
    }
  }

  const togglePainCharacteristic = (id: PainCharacteristic) => {
    setAnswers((prev) => ({
      ...prev,
      q4PainCharacteristics: prev.q4PainCharacteristics.includes(id)
        ? prev.q4PainCharacteristics.filter((s) => s !== id)
        : [...prev.q4PainCharacteristics, id],
    }))
  }

  const updateSeverity = (key: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      q5Severity: { ...prev.q5Severity, [key]: value },
    }))
  }

  const handleSubmit = () => {
    const result = calculatePhenotype(answers)
    saveQuestionnaireAnswers(answers)
    savePhenotypeResult(result)
    navigate('/register')
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* Progress Header */}
        <div className={styles.progressHeader}>
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>Paso {step} de {TOTAL_STEPS}</span>
            <span className={styles.progressPct}>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={false}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className={styles.progressDots}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i + 1 === step ? styles.dotActive : ''} ${i + 1 < step ? styles.dotDone : ''}`}
                title={STEP_TITLES[i + 1].title}
              >
                {i + 1 < step ? (
                  <CheckCircle2 size={14} color="white" />
                ) : (
                  <span className={styles.dotNum}>{STEP_ICONS[i + 1]}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content with slide transition */}
        <div className={styles.stepWrapper}>
          <AnimatePresence mode="wait" custom={directionRef.current}>
            <motion.div
              key={step}
              custom={directionRef.current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: 'easeInOut' }}
            >
              <h2 data-testid={`step-title-${step}`}>{STEP_TITLES[step].title}</h2>
              <p className={styles.subtitle}>{STEP_TITLES[step].subtitle}</p>

              {/* Step 1: Diagnosis */}
              {step === 1 && (
                <div className={styles.optionsGrid}>
                  {DIAGNOSIS_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt.value}
                      data-testid={`diagnosis-${opt.value}`}
                      className={`${styles.radioCard} ${answers.q1Diagnosis === opt.value ? styles.selected : ''}`}
                      onClick={() => setAnswers({ ...answers, q1Diagnosis: opt.value })}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={styles.radioCircle}>
                        {answers.q1Diagnosis === opt.value && (
                          <motion.div
                            className={styles.radioInner}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.15 }}
                          />
                        )}
                      </div>
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 2: Hormonal Status */}
              {step === 2 && (
                <div className={styles.optionsGrid}>
                  {HORMONAL_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt.value}
                      data-testid={`hormonal-${opt.value}`}
                      className={`${styles.radioCard} ${answers.q2HormonalStatus === opt.value ? styles.selected : ''}`}
                      onClick={() => setAnswers({ ...answers, q2HormonalStatus: opt.value })}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={styles.radioCircle}>
                        {answers.q2HormonalStatus === opt.value && (
                          <motion.div className={styles.radioInner} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }} />
                        )}
                      </div>
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 3: Last Period */}
              {step === 3 && (
                <div className={styles.inputGroup}>
                  <label htmlFor="lastPeriod">Fecha aproximada</label>
                  <input
                    id="lastPeriod"
                    data-testid="last-period-input"
                    type="date"
                    value={answers.q3LastPeriod ?? ''}
                    onChange={(e) => setAnswers({ ...answers, q3LastPeriod: e.target.value })}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              )}

              {/* Step 4: Pain Characteristics */}
              {step === 4 && (
                <div className={styles.symptomsGrid}>
                  {PAIN_OPTIONS.map((sym) => (
                    <motion.button
                      key={sym.value}
                      data-testid={`pain-${sym.value}`}
                      className={`${styles.checkboxCard} ${answers.q4PainCharacteristics.includes(sym.value) ? styles.selected : ''}`}
                      onClick={() => togglePainCharacteristic(sym.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={styles.checkboxBox}>
                        {answers.q4PainCharacteristics.includes(sym.value) && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}>
                            <CheckCircle2 size={16} color="var(--color-surface)" />
                          </motion.div>
                        )}
                      </div>
                      <span>{sym.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 5: Severity */}
              {step === 5 && (
                <div>
                  {SEVERITY_FIELDS.map((field) => (
                    <div key={field.key} className={styles.sliderGroup}>
                      <div className={styles.sliderLabelRow}>
                        <label>{field.label}</label>
                        <span className={styles.sliderValue} style={{ color: field.color }}>
                          {answers.q5Severity[field.key]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        data-testid={`severity-${field.key}`}
                        value={answers.q5Severity[field.key]}
                        onChange={(e) => updateSeverity(field.key, Number(e.target.value))}
                        className={styles.rangeInput}
                        style={{ accentColor: field.color, color: field.color }}
                      />
                      <div className={styles.sliderLabels}>
                        <span>Sin dolor</span>
                        <span>Moderado</span>
                        <span>Máximo</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 6: Goal */}
              {step === 6 && (
                <div className={styles.goalsGrid}>
                  {GOAL_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt.value}
                      data-testid={`goal-${opt.value}`}
                      className={`${styles.goalCard} ${answers.q6Goal === opt.value ? styles.selected : ''}`}
                      onClick={() => setAnswers({ ...answers, q6Goal: opt.value })}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className={styles.goalIcon}>{opt.icon}</span>
                      <span>{opt.label}</span>
                      {answers.q6Goal === opt.value && (
                        <motion.div className={styles.goalCheck} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 size={18} color="var(--color-primary)" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 7: Commitment */}
              {step === 7 && (
                <div className={styles.optionsGrid}>
                  {COMMITMENT_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt.value}
                      data-testid={`commitment-${opt.value}`}
                      className={`${styles.radioCard} ${answers.q7Commitment === opt.value ? styles.selected : ''}`}
                      onClick={() => setAnswers({ ...answers, q7Commitment: opt.value })}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={styles.radioCircle}>
                        {answers.q7Commitment === opt.value && (
                          <motion.div className={styles.radioInner} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }} />
                        )}
                      </div>
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {step > 1 && (
            <motion.button
              className={styles.btnSecondary}
              onClick={handlePrev}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              data-testid="btn-prev"
            >
              <ChevronLeft size={18} /> Atrás
            </motion.button>
          )}

          <div style={{ flex: 1 }} />

          {step < TOTAL_STEPS ? (
            <motion.button
              className={styles.btnPrimary}
              onClick={handleNext}
              disabled={!currentStepData.isValid}
              whileHover={currentStepData.isValid ? { x: 3 } : {}}
              whileTap={currentStepData.isValid ? { scale: 0.97 } : {}}
              data-testid="btn-next"
            >
              Siguiente <ChevronRight size={18} />
            </motion.button>
          ) : (
            <motion.button
              className={styles.btnSubmit}
              onClick={handleSubmit}
              disabled={!currentStepData.isValid}
              whileHover={currentStepData.isValid ? { scale: 1.03 } : {}}
              whileTap={currentStepData.isValid ? { scale: 0.97 } : {}}
              data-testid="btn-submit"
            >
              Ver mis resultados ✨
            </motion.button>
          )}
        </div>

      </div>
    </div>
  )
}

export default Questionnaire
