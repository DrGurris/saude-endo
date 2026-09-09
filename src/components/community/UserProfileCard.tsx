import React from 'react'
import { Shield, Star } from 'lucide-react'
import type { UserRole } from '../../types'
import styles from './UserProfileCard.module.css'

interface UserProfileCardProps {
  name: string
  role: UserRole
  isAnonymous?: boolean
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const ROLE_LABELS: Record<UserRole, string> = {
  user: '',
  moderator: 'Moderadora',
  admin: 'Admin',
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, role, isAnonymous }) => {
  const displayName = isAnonymous ? 'Anonima' : name
  const initials = isAnonymous ? '?' : getInitials(name)

  return (
    <div className={styles.card}>
      <div className={`${styles.avatar} ${styles[role]}`}>
        <span>{initials}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{displayName}</span>
        {role !== 'user' && (
          <span className={`${styles.roleBadge} ${styles[`role_${role}`]}`}>
            {role === 'admin' ? <Shield size={10} /> : <Star size={10} />}
            {ROLE_LABELS[role]}
          </span>
        )}
      </div>
    </div>
  )
}

export default UserProfileCard
