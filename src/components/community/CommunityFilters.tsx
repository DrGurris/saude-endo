import React from 'react'
import { Heart, BatteryCharging, Apple, Droplets, Smile, MessageSquare } from 'lucide-react'
import type { ForumCategory } from '../../types'
import styles from './CommunityFilters.module.css'

interface CommunityFiltersProps {
  selectedCategory: ForumCategory | 'all'
  onCategoryChange: (cat: ForumCategory | 'all') => void
  sortBy: 'recent' | 'popular'
  onSortChange: (sort: 'recent' | 'popular') => void
}

const CATEGORIES: Array<{ id: ForumCategory | 'all'; label: string; icon: React.ReactNode }> = [
  { id: 'all', label: 'Todos', icon: <MessageSquare size={14} /> },
  { id: 'general', label: 'General', icon: <MessageSquare size={14} /> },
  { id: 'pain', label: 'Dolor', icon: <Heart size={14} /> },
  { id: 'energy', label: 'Energia', icon: <BatteryCharging size={14} /> },
  { id: 'nutrition', label: 'Nutricion', icon: <Apple size={14} /> },
  { id: 'hormones', label: 'Hormonas', icon: <Droplets size={14} /> },
  { id: 'wellbeing', label: 'Bienestar', icon: <Smile size={14} /> },
]

const CommunityFilters: React.FC<CommunityFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.catBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.sortWrapper}>
        <select
          value={sortBy}
          onChange={e => onSortChange(e.target.value as 'recent' | 'popular')}
          className={styles.sortSelect}
        >
          <option value="recent">Mas recientes</option>
          <option value="popular">Mas apoyados</option>
        </select>
      </div>
    </div>
  )
}

export default CommunityFilters
