import React from 'react'
import { Search, X } from 'lucide-react'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
}) => {
  return (
    <div className={styles.wrapper}>
      <Search size={16} className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      {value && (
        <button className={styles.clearBtn} onClick={() => onChange('')} aria-label="Limpiar busqueda">
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export default SearchInput
