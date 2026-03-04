import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, Eye, EyeOff, Check, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { registerSchema, type RegisterFormData } from '../utils/validation'
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
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      acceptTerms: false,
    },
  })

  const watchPassword = watch('password', '')
  const strength = getPasswordStrength(watchPassword)

  if (isAuthenticated) {
    return <Navigate to="/results" replace />
  }

  if (!phenotypeResult) {
    return <Navigate to="/questionnaire" replace />
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError('')
      await authRegister({
        name: data.name,
        email: data.email,
        password: data.password,
        birthDate: data.birthDate,
      })
      navigate('/results')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al crear la cuenta')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <UserPlus size={28} color="var(--color-primary)" />
          </div>
          <h1>Crea tu cuenta para ver tus resultados</h1>
          <p className={styles.subtitle}>
            Tu evaluación está lista. Regístrate para acceder a tu perfil de dolor personalizado y portal de bienestar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {serverError && (
            <div className={styles.errorBanner}>{serverError}</div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              {...register('name')}
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.fieldError}>{errors.name.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              {...register('email')}
              className={errors.email ? styles.inputError : ''}
            />
            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              id="birthDate"
              type="date"
              {...register('birthDate')}
              className={errors.birthDate ? styles.inputError : ''}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.birthDate && <span className={styles.fieldError}>{errors.birthDate.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Crea una contraseña segura"
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

            {watchPassword.length > 0 && (
              <div className={styles.strengthSection}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{ width: `${(strength.score / 5) * 100}%`, backgroundColor: strength.color }}
                  />
                </div>
                <span className={styles.strengthLabel} style={{ color: strength.color }}>
                  {strength.label}
                </span>

                <ul className={styles.rulesList}>
                  {PASSWORD_RULES.map((rule) => {
                    const passes = rule.test(watchPassword)
                    return (
                      <li key={rule.label} className={passes ? styles.rulePass : styles.ruleFail}>
                        {passes ? <Check size={14} /> : <X size={14} />}
                        {rule.label}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repite tu contraseña"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? styles.inputError : ''}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword.message}</span>}
          </div>

          <label className={styles.checkboxLabel}>
            <input type="checkbox" {...register('acceptTerms')} />
            <span>Acepto los <a href="#" className={styles.link}>términos y condiciones</a> y la <a href="#" className={styles.link}>política de privacidad</a></span>
          </label>
          {errors.acceptTerms && <span className={styles.fieldError}>{errors.acceptTerms.message}</span>}

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta y ver resultados'}
          </button>

          <p className={styles.loginLink}>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
