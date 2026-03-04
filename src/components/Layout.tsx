import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import { Heart, Home, User, Info, LogOut, BarChart3 } from 'lucide-react'
import styles from './Layout.module.css'

const Layout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth()
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
