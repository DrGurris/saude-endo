import React from 'react'
import { BookOpen } from 'lucide-react'
import type { PillarId } from '../../types'
import { PILLARS } from '../../data/pillars'
import styles from './PillarFilter.module.css'

interface PillarFilterProps {
  selected: PillarId | 'all'
  onSelect: (id: PillarId | 'all') => void
}

const PillarFilter: React.FC<PillarFilterProps> = ({ selected, onSelect }) => {
  return (
    <div className={styles.filterRow}>
      <button
        className={`${styles.pillarBtn} ${selected === 'all' ? styles.active : ''}`}
        onClick={() => onSelect('all')}
        style={{ '--pillar-color': 'var(--color-primary)' } as React.CSSProperties}
        data-testid="pillar-all"
      >
        <BookOpen size={16} />
        <span>Todos</span>
      </button>
      {PILLARS.map(pillar => (
        <button
          key={pillar.id}
          className={`${styles.pillarBtn} ${selected === pillar.id ? styles.active : ''}`}
          onClick={() => onSelect(pillar.id)}
          style={{ '--pillar-color': pillar.color } as React.CSSProperties}
          data-testid={`pillar-${pillar.id}`}
        >
          <img
            src={pillar.image}
            alt=""
            className={styles.pillarImage}
          />
          <img src={pillar.iconImage} alt="" className={styles.pillarIconImg} />
          <span>{pillar.label}</span>
        </button>
      ))}
    </div>
  )
}

export default PillarFilter
