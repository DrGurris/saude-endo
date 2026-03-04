import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'
import { Heart, Home, User, Info, LogOut, BarChart3, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './Layout.module.css'

const Layout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logoLink}>
            <Logo className={styles.logo} />
          </Link>
          <nav className={styles.nav}>
            {isAuthenticated ? (
              <>
                <Link to="/" className={styles.navLink}>
                  <Home size={18} />
                  <span>Inicio</span>
                </Link>
                <Link to="/results" className={styles.navLink}>
                  <BarChart3 size={18} />
                  <span>Resultados</span>
                </Link>
                <Link to="/portal" className={styles.navLink}>
                  <User size={18} />
                  <span>Portal</span>
                </Link>
                <button onClick={handleLogout} className={styles.navLink}>
                  <LogOut size={18} />
                  <span>{user?.name?.split(' ')[0] ?? 'Salir'}</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className={styles.navLink}>
                  <Home size={18} />
                  <span>Inicio</span>
                </Link>
                <Link to="/questionnaire" className={styles.navLink}>
                  <Heart size={18} />
                  <span>Evaluación</span>
                </Link>
              </>
            )}

            {/* Dark mode toggle */}
            <motion.button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              data-testid="theme-toggle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </motion.button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Saude Cl&iacute;nica de la Mujer. Mes de Concientizaci&oacute;n en Endometriosis.</p>
        <div className={styles.footerLinks}>
          <a href="#"><Info size={14} /> T&eacute;rminos</a>
          <a href="#">Privacidad</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
