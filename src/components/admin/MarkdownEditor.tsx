import React, { useState, useMemo } from 'react'
import { Eye, Edit3 } from 'lucide-react'
import { renderMarkdown } from '../../utils/markdownRenderer'
import styles from './MarkdownEditor.module.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minRows?: number
  label?: string
  error?: string
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Escribe en markdown...',
  minRows = 12,
  label,
  error,
}) => {
  const [showPreview, setShowPreview] = useState(false)
  const rendered = useMemo(() => renderMarkdown(value), [value])

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.toolbar}>
        <button
          type="button"
          className={`${styles.tabBtn} ${!showPreview ? styles.activeTab : ''}`}
          onClick={() => setShowPreview(false)}
        >
          <Edit3 size={14} />
          Editar
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${showPreview ? styles.activeTab : ''}`}
          onClick={() => setShowPreview(true)}
        >
          <Eye size={14} />
          Vista previa
        </button>
      </div>

      {showPreview ? (
        <div className={styles.preview}>
          {value.trim() ? rendered : <p className={styles.emptyPreview}>Sin contenido</p>}
        </div>
      ) : (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          className={`${styles.textarea} ${error ? styles.hasError : ''}`}
        />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default MarkdownEditor
