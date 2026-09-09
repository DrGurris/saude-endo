import React from 'react'
import type { ForumCategory } from '../../types'
import styles from './CategoryBadge.module.css'

interface CategoryBadgeProps {
  category: ForumCategory
}

const CATEGORY_LABELS: Record<ForumCategory, string> = {
  pain: 'Dolor',
  energy: 'Energia',
  nutrition: 'Nutricion',
  hormones: 'Hormonas',
  wellbeing: 'Bienestar',
  general: 'General',
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <span className={`${styles.badge} ${styles[category]}`}>
      {CATEGORY_LABELS[category]}
    </span>
  )
}

export default CategoryBadge
