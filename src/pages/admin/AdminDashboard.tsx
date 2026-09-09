import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, FileText, MessageSquare, BarChart3, AlertTriangle, Plus } from 'lucide-react'
import type { AdminAnalytics } from '../../types'
import { fetchAnalytics } from '../../services/adminService'
import StatCard from '../../components/admin/StatCard'
import styles from './AdminDashboard.module.css'

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
      .then(setAnalytics)
      .catch(() => setError('No se pudieron cargar los datos del dashboard'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <div className={styles.loading}>Cargando dashboard...</div>
  }

  if (error || !analytics) {
    return <div className={styles.loading}>{error || 'Error al cargar datos'}</div>
  }

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={styles.title}>Dashboard de Administracion</h1>
        <p className={styles.subtitle}>Resumen general de la plataforma</p>
      </motion.div>

      <div className={styles.statsGrid}>
        <StatCard
          label="Usuarias registradas"
          value={analytics.totalUsers}
          icon={<Users size={20} />}
          trend="up"
          trendValue="+8 esta semana"
          color="var(--color-primary)"
        />
        <StatCard
          label="Usuarias activas"
          value={analytics.activeUsers}
          icon={<Users size={20} />}
          trend="up"
          trendValue="+5"
          color="var(--color-success)"
        />
        <StatCard
          label="Hilos del foro"
          value={analytics.totalThreads}
          icon={<MessageSquare size={20} />}
          trend="up"
          trendValue="+3"
          color="var(--color-info)"
        />
        <StatCard
          label="Articulos publicados"
          value={analytics.totalArticles}
          icon={<FileText size={20} />}
          trend="neutral"
          trendValue="sin cambios"
          color="var(--color-secondary)"
        />
      </div>

      <div className={styles.row}>
        <motion.section
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={styles.cardTitle}>
            <BarChart3 size={18} />
            Distribucion de fenotipos
          </h2>
          <div className={styles.phenotypeList}>
            {Object.entries(analytics.phenotypeDistribution).map(([type, count]) => (
              <div key={type} className={styles.phenotypeRow}>
                <span className={styles.phenotypeLabel}>{type}</span>
                <div className={styles.phenotypeBar}>
                  <div
                    className={styles.phenotypeFill}
                    style={{ width: `${(count / analytics.totalUsers) * 100}%` }}
                  />
                </div>
                <span className={styles.phenotypeCount}>{count}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className={styles.cardTitle}>
            <FileText size={18} />
            Articulos mas leidos
          </h2>
          <div className={styles.topList}>
            {analytics.topArticles.map((article, idx) => (
              <div key={article.id} className={styles.topItem}>
                <span className={styles.topRank}>{idx + 1}</span>
                <span className={styles.topTitle}>{article.title}</span>
                <span className={styles.topReads}>{article.reads} lecturas</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section
        className={styles.quickActions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={styles.cardTitle}>Acciones rapidas</h2>
        <div className={styles.actionsGrid}>
          <Link to="/admin/articles/new" className={styles.actionBtn}>
            <Plus size={18} />
            Nuevo articulo
          </Link>
          <Link to="/admin/users" className={styles.actionBtn}>
            <Users size={18} />
            Gestionar usuarios
          </Link>
          <Link to="/admin/content" className={styles.actionBtn}>
            <AlertTriangle size={18} />
            Moderar contenido
          </Link>
          <Link to="/admin/analytics" className={styles.actionBtn}>
            <BarChart3 size={18} />
            Ver analiticas
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default AdminDashboard
