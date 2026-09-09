import React from 'react'
import styles from './StatusBadge.module.css'

type BadgeVariant = 'active' | 'suspended' | 'banned' | 'draft' | 'published' | 'archived' | 'pending' | 'reviewed' | 'dismissed'

interface StatusBadgeProps {
  status: BadgeVariant
  label?: string
}

const STATUS_LABELS: Record<BadgeVariant, string> = {
  active: 'Activo',
  suspended: 'Suspendido',
  banned: 'Baneado',
  draft: 'Borrador',
  published: 'Publicado',
  archived: 'Archivado',
  pending: 'Pendiente',
  reviewed: 'Revisado',
  dismissed: 'Descartado',
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {label ?? STATUS_LABELS[status]}
    </span>
  )
}

export default StatusBadge
