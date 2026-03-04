import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, Eye, EyeOff, Check, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { registerSchema, type RegisterFormData } from '../utils/validation'
import DatePicker from '../components/DatePicker'
import styles from './Register.module.css'

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 2) return { score, label: 'Débil', color: 'var(--color-accent)' }
  if (score <= 3) return { score, label: 'Media', color: 'var(--color-secondary)' }
  if (score <= 4) return { score, label: 'Buena', color: 'var(--color-info)' }
  return { score, label: 'Fuerte', color: 'var(--color-success)' }
}

const PASSWORD_RULES = [
  { test: (p: string) => p.length >= 8, label: 'Al menos 8 caracteres' },
  { test: (p: string) => /[A-Z]/.test(p), label: 'Una letra mayúscula' },
  { test: (p: string) => /[a-z]/.test(p), label: 'Una letra minúscula' },
  { test: (p: string) => /[0-9]/.test(p), label: 'Un número' },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: 'Un carácter especial' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const fieldVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { phenotypeResult, register: authRegister, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', birthDate: '', acceptTerms: false },
  })

  const watchPassword = watch('password', '')
  const strength = getPasswordStrength(watchPassword)

  if (isAuthenticated) return <Navigate to="/results" replace />
  if (!phenotypeResult) return <Navigate to="/questionnaire" replace />

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError('')
      await authRegister({ name: data.name, email: data.email, password: data.password, birthDate: data.birthDate })
      navigate('/results')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al crear la cuenta')
    }
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className={styles.header} variants={stagger} initial="hidden" animate="visible">
          <motion.div className={styles.iconCircle} variants={fieldVariant}>
            <UserPlus size={28} color="var(--color-primary)" />
          </motion.div>
          <motion.h1 variants={fieldVariant}>Crea tu cuenta para ver tus resultados</motion.h1>
          <motion.p className={styles.subtitle} variants={fieldVariant}>
            Tu evaluación está lista. Regístrate para acceder a tu perfil de dolor personalizado y portal de bienestar.
          </motion.p>

          {/* Phenotype preview banner */}
          <motion.div className={styles.phenotypeBanner} variants={fieldVariant}>
            <span className={styles.phenotypeDot} />
            Tu evaluación ha sido completada. ¡Ya casi estás lista!
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {serverError && (
              <motion.div
                className={styles.errorBanner}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className={styles.inputGroup} variants={fieldVariant}>
            <label htmlFor="name">Nombre completo</label>
            <input id="name" type="text" placeholder="Tu nombre" data-testid="register-name"
              {...register('name')} className={errors.name ? styles.inputError : ''} />
            {errors.name && <span className={styles.fieldError}>{errors.name.message}</span>}
          </motion.div>

          <motion.div className={styles.inputGroup} variants={fieldVariant}>
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" placeholder="correo@ejemplo.com" data-testid="register-email"
              {...register('email')} className={errors.email ? styles.inputError : ''} />
            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
          </motion.div>

          <motion.div className={styles.inputGroup} variants={fieldVariant}>
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="birthDate"
                  value={field.value}
                  onChange={field.onChange}
                  max={new Date().toISOString().split('T')[0]}
                  hasError={!!errors.birthDate}
                />
              )}
            />
            {errors.birthDate && <span className={styles.fieldError}>{errors.birthDate.message}</span>}
          </motion.div>

          <motion.div className={styles.inputGroup} variants={fieldVariant}>
            <label htmlFor="password">Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input id="password" type={showPassword ? 'text' : 'password'}
                placeholder="Crea una contraseña segura" data-testid="register-password"
                {...register('password')} className={errors.password ? styles.inputError : ''} />
              <button type="button" className={styles.togglePassword}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}

            <AnimatePresence>
              {watchPassword.length > 0 && (
                <motion.div
                  className={styles.strengthSection}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.strengthBar}>
                    <motion.div
                      className={styles.strengthFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${(strength.score / 5) * 100}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{ backgroundColor: strength.color }}
                    />
                  </div>
                  <span className={styles.strengthLabel} style={{ color: strength.color }}>{strength.label}</span>
                  <ul className={styles.rulesList}>
                    {PASSWORD_RULES.map((rule) => {
                      const passes = rule.test(watchPassword)
                      return (
                        <motion.li
                          key={rule.label}
                          className={passes ? styles.rulePass : styles.ruleFail}
                          animate={{ color: passes ? 'var(--color-success)' : 'var(--color-text-muted)' }}
                          transition={{ duration: 0.2 }}
                        >
                          {passes ? <Check size={14} /> : <X size={14} />}
                          {rule.label}
                        </motion.li>
                      )
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className={styles.inputGroup} variants={fieldVariant}>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className={styles.passwordWrapper}>
              <input id="confirmPassword" type={showConfirm ? 'text' : 'password'}
                placeholder="Repite tu contraseña" data-testid="register-confirm-password"
                {...register('confirmPassword')} className={errors.confirmPassword ? styles.inputError : ''} />
              <button type="button" className={styles.togglePassword}
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword.message}</span>}
          </motion.div>

          <motion.label className={styles.checkboxLabel} variants={fieldVariant}>
            <input type="checkbox" data-testid="register-terms" {...register('acceptTerms')} />
            <span>Acepto los <a href="#" className={styles.link}>términos y condiciones</a> y la <a href="#" className={styles.link}>política de privacidad</a></span>
          </motion.label>
          {errors.acceptTerms && <span className={styles.fieldError}>{errors.acceptTerms.message}</span>}

          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
            variants={fieldVariant}
            whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            data-testid="register-submit"
          >
            {isSubmitting ? 'Creando cuenta...' : (
              <>Crear cuenta y ver resultados <ArrowRight size={16} /></>
            )}
          </motion.button>

          <motion.p className={styles.loginLink} variants={fieldVariant}>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Register
