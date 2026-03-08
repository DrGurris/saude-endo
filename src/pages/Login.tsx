import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { loginSchema, type LoginFormData } from '../utils/validation'
import styles from './Login.module.css'

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const fieldVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner} />
          <p>Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/portal" replace />
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError('')
      await login(data.email, data.password)
      navigate('/portal')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al iniciar sesión')
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
        <motion.div
          className={styles.header}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.iconCircle} variants={fieldVariant}>
            <LogIn size={28} color="var(--color-primary)" />
          </motion.div>
          <motion.h1 variants={fieldVariant}>Iniciar sesión</motion.h1>
          <motion.p className={styles.subtitle} variants={fieldVariant}>
            Accede a tu portal de bienestar personalizado.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {serverError && (
            <motion.div
              className={styles.errorBanner}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {serverError}
            </motion.div>
          )}

          <motion.div className={styles.inputGroup} variants={fieldVariant}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              data-testid="login-email"
              {...register('email')}
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
          </motion.div>

          <motion.div className={styles.inputGroup} variants={fieldVariant}>
            <label htmlFor="password">Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña"
                data-testid="login-password"
                {...register('password')}
                className={errors.password ? styles.inputError : ''}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
          </motion.div>

          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
            variants={fieldVariant}
            whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            data-testid="login-submit"
          >
            {isSubmitting ? 'Ingresando...' : (
              <>Iniciar sesión <ArrowRight size={16} /></>
            )}
          </motion.button>

          <motion.p className={styles.registerLink} variants={fieldVariant}>
            ¿No tienes cuenta? <Link to="/questionnaire">Realiza tu evaluación</Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Login
