import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { loginSchema, type LoginFormData } from '../utils/validation'
import styles from './Login.module.css'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
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
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <LogIn size={28} color="var(--color-primary)" />
          </div>
          <h1>Iniciar sesión</h1>
          <p className={styles.subtitle}>Accede a tu portal de bienestar personalizado.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {serverError && (
            <div className={styles.errorBanner}>{serverError}</div>
          )}

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
            <label htmlFor="password">Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña"
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
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          <p className={styles.registerLink}>
            ¿No tienes cuenta? <Link to="/questionnaire">Realiza tu evaluación</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
