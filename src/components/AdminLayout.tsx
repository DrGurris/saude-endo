import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, FileText, BarChart3, Settings,
  Shield, MessageSquareWarning, ChevronLeft, ChevronRight, BookOpen,
} from 'lucide-react'
import styles from './AdminLayout.module.css'

const ADMIN_NAV = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/users', icon: Users, label: 'Usuarios' },
  { path: '/admin/articles', icon: FileText, label: 'Articulos' },
  { path: '/admin/content', icon: MessageSquareWarning, label: 'Moderacion' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analiticas' },
  { path: '/admin/settings', icon: Settings, label: 'Configuracion' },
]

const AdminLayout: React.FC = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path)

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          {!collapsed && (
            <div className={styles.brand}>
              <Shield size={20} />
              <span>Admin Panel</span>
            </div>
          )}
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed(prev => !prev)}
            aria-label={collapsed ? 'Expandir menu' : 'Colapsar menu'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {ADMIN_NAV.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive(item.path, item.exact) ? styles.active : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link to="/library" className={styles.backLink} title={collapsed ? 'Volver al sitio' : undefined}>
            <BookOpen size={18} />
            {!collapsed && <span>Volver al sitio</span>}
          </Link>
        </div>
      </aside>

      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
