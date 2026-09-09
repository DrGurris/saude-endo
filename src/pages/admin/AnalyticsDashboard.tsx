import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, FileText, MessageSquare } from 'lucide-react'
import type { AdminAnalytics } from '../../types'
import { PHENOTYPE_LABELS } from '../../types'
import { fetchAnalytics } from '../../services/adminService'
import StatCard from '../../components/admin/StatCard'
import styles from './AnalyticsDashboard.module.css'

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
      .then(setAnalytics)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading || !analytics) {
    return <div className={styles.loading}>Cargando analiticas...</div>
  }

  const maxPhenotype = Math.max(...Object.values(analytics.phenotypeDistribution), 1)
  const maxRegistrations = Math.max(...analytics.registrationsByMonth.map(r => r.count), 1)

  return (
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>
          <BarChart3 size={24} />
          Analiticas
        </h1>
        <p className={styles.subtitle}>Metricas y tendencias de la plataforma</p>
      </motion.div>

      <div className={styles.statsGrid}>
        <StatCard
          label="Total usuarios"
          value={analytics.totalUsers}
          icon={<Users size={20} />}
          color="var(--color-primary)"
        />
        <StatCard
          label="Usuarios activos"
          value={analytics.activeUsers}
          icon={<Users size={20} />}
          color="var(--color-success)"
        />
        <StatCard
          label="Hilos del foro"
          value={analytics.totalThreads}
          icon={<MessageSquare size={20} />}
          color="var(--color-info)"
        />
        <StatCard
          label="Respuestas"
          value={analytics.totalReplies}
          icon={<MessageSquare size={20} />}
          color="var(--color-secondary)"
        />
      </div>

      <div className={styles.chartsRow}>
        <motion.section
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={styles.chartTitle}>Registros por mes</h2>
          <div className={styles.barChart}>
            {analytics.registrationsByMonth.map(item => (
              <div key={item.month} className={styles.barItem}>
                <div className={styles.barWrapper}>
                  <motion.div
                    className={styles.bar}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.count / maxRegistrations) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
                <span className={styles.barLabel}>{item.month.slice(5)}</span>
                <span className={styles.barValue}>{item.count}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className={styles.chartTitle}>Distribucion de fenotipos</h2>
          <div className={styles.horizontalBars}>
            {Object.entries(analytics.phenotypeDistribution).map(([type, count]) => (
              <div key={type} className={styles.hBarRow}>
                <span className={styles.hBarLabel}>
                  {PHENOTYPE_LABELS[type as keyof typeof PHENOTYPE_LABELS] ?? type}
                </span>
                <div className={styles.hBarTrack}>
                  <motion.div
                    className={styles.hBarFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxPhenotype) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
                <span className={styles.hBarValue}>{count}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section
        className={styles.chartCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={styles.chartTitle}>
          <FileText size={18} />
          Articulos mas leidos
        </h2>
        <div className={styles.topArticles}>
          {analytics.topArticles.map((article, idx) => (
            <div key={article.id} className={styles.articleRow}>
              <span className={styles.rank}>{idx + 1}</span>
              <span className={styles.articleTitle}>{article.title}</span>
              <div className={styles.readsBar}>
                <motion.div
                  className={styles.readsFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${(article.reads / analytics.topArticles[0].reads) * 100}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                />
              </div>
              <span className={styles.readsCount}>{article.reads}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className={styles.chartCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h2 className={styles.chartTitle}>Actividad del foro por semana</h2>
        <div className={styles.activityTable}>
          <div className={styles.activityHeader}>
            <span>Semana</span>
            <span>Hilos</span>
            <span>Respuestas</span>
          </div>
          {analytics.forumActivityByWeek.map(week => (
            <div key={week.week} className={styles.activityRow}>
              <span>{week.week}</span>
              <span className={styles.activityCount}>{week.threads}</span>
              <span className={styles.activityCount}>{week.replies}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default AnalyticsDashboard
