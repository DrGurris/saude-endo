import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import styles from './StatCard.module.css'

interface StatCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, trendValue, color }) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div className={styles.card} style={color ? { borderTopColor: color } : undefined}>
      <div className={styles.header}>
        <div className={styles.iconWrapper} style={color ? { color } : undefined}>
          {icon}
        </div>
        {trend && trendValue && (
          <span className={`${styles.trend} ${styles[trend]}`}>
            <TrendIcon size={14} />
            {trendValue}
          </span>
        )}
      </div>
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </div>
  )
}

export default StatCard
