import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareWarning, Check, X, AlertTriangle } from 'lucide-react'
import type { ForumReport } from '../../types'
import { fetchPendingReports, resolveReport } from '../../services/adminService'
import StatusBadge from '../../components/admin/StatusBadge'
import ActionModal from '../../components/admin/ActionModal'
import styles from './ContentModeration.module.css'

const ContentModeration: React.FC = () => {
  const [reports, setReports] = useState<ForumReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionTarget, setActionTarget] = useState<{ report: ForumReport; action: 'reviewed' | 'dismissed' } | null>(null)

  useEffect(() => {
    fetchPendingReports()
      .then(setReports)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  const confirmAction = useCallback(async () => {
    if (!actionTarget) return
    try {
      const success = await resolveReport(actionTarget.report.id, actionTarget.action)
      if (success) {
        setReports(prev => prev.filter(r => r.id !== actionTarget.report.id))
      }
    } catch {
      // Error handled silently for moderation actions
    } finally {
      setActionTarget(null)
    }
  }, [actionTarget])

  if (isLoading) {
    return <div className={styles.loading}>Cargando reportes...</div>
  }

  return (
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>
          <MessageSquareWarning size={24} />
          Moderacion de Contenido
        </h1>
        <p className={styles.subtitle}>{reports.length} reportes pendientes</p>
      </motion.div>

      {reports.length === 0 ? (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Check size={48} />
          <h3>Todo esta en orden</h3>
          <p>No hay reportes pendientes de revision</p>
        </motion.div>
      ) : (
        <div className={styles.reportList}>
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              className={styles.reportCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={styles.reportHeader}>
                <div className={styles.reportType}>
                  <AlertTriangle size={16} />
                  <span>{report.targetType === 'thread' ? 'Hilo' : 'Respuesta'}</span>
                </div>
                <StatusBadge status={report.status} />
              </div>

              <p className={styles.reportReason}>{report.reason}</p>

              <div className={styles.reportMeta}>
                <span>ID: {report.targetId}</span>
                <span>Reportado: {new Date(report.createdAt).toLocaleDateString('es')}</span>
              </div>

              <div className={styles.reportActions}>
                <button
                  className={styles.approveBtn}
                  onClick={() => setActionTarget({ report, action: 'reviewed' })}
                >
                  <Check size={14} />
                  Revisar y actuar
                </button>
                <button
                  className={styles.dismissBtn}
                  onClick={() => setActionTarget({ report, action: 'dismissed' })}
                >
                  <X size={14} />
                  Descartar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ActionModal
        isOpen={actionTarget !== null}
        onClose={() => setActionTarget(null)}
        onConfirm={confirmAction}
        title={actionTarget?.action === 'reviewed' ? 'Marcar como revisado' : 'Descartar reporte'}
        description={
          actionTarget?.action === 'reviewed'
            ? 'El reporte se marcara como revisado. Puedes tomar acciones adicionales sobre el contenido.'
            : 'El reporte se descartara. El contenido permanecera visible.'
        }
        confirmLabel={actionTarget?.action === 'reviewed' ? 'Revisar' : 'Descartar'}
        confirmVariant={actionTarget?.action === 'reviewed' ? 'primary' : 'danger'}
      />
    </div>
  )
}

export default ContentModeration
