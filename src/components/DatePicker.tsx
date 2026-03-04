import React, { useState, useEffect } from 'react'
import styles from './DatePicker.module.css'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

interface DatePickerProps {
  value: string           // YYYY-MM-DD or ""
  onChange: (value: string) => void
  max?: string            // YYYY-MM-DD — limits year/month/day options
  id?: string
  className?: string
  hasError?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, max, id, className, hasError }) => {
  const parseValue = (v: string) => {
    if (!v) return { year: '', month: '', day: '' }
    const [y, m, d] = v.split('-')
    return { year: y ?? '', month: m ?? '', day: d ?? '' }
  }

  const [parts, setParts] = useState(parseValue(value))

  // Sync from parent if value changes externally
  useEffect(() => {
    setParts(parseValue(value))
  }, [value])

  const maxDate = max ? new Date(max) : new Date()
  const maxYear = maxDate.getFullYear()
  const minYear = maxYear - 100

  const daysInMonth =
    parts.year && parts.month
      ? new Date(Number(parts.year), Number(parts.month), 0).getDate()
      : 31

  const handlePart = (key: 'year' | 'month' | 'day', val: string) => {
    const next = { ...parts, [key]: val }
    setParts(next)
    if (next.year && next.month && next.day) {
      onChange(`${next.year}-${next.month.padStart(2, '0')}-${next.day.padStart(2, '0')}`)
    } else {
      onChange('')
    }
  }

  const isError = hasError ?? false

  return (
    <div className={`${styles.wrapper} ${className ?? ''} ${isError ? styles.wrapperError : ''}`} id={id}>
      {/* Day */}
      <select
        value={parts.day}
        onChange={(e) => handlePart('day', e.target.value)}
        className={`${styles.select} ${!parts.day ? styles.placeholder : ''}`}
        aria-label="Día"
        data-testid={id ? `${id}-day` : 'datepicker-day'}
      >
        <option value="">Día</option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
          <option key={d} value={String(d)}>{d}</option>
        ))}
      </select>

      <span className={styles.sep}>/</span>

      {/* Month */}
      <select
        value={parts.month}
        onChange={(e) => handlePart('month', e.target.value)}
        className={`${styles.select} ${styles.selectMonth} ${!parts.month ? styles.placeholder : ''}`}
        aria-label="Mes"
        data-testid={id ? `${id}-month` : 'datepicker-month'}
      >
        <option value="">Mes</option>
        {MONTHS.map((name, i) => (
          <option key={i} value={String(i + 1)}>{name}</option>
        ))}
      </select>

      <span className={styles.sep}>/</span>

      {/* Year */}
      <select
        value={parts.year}
        onChange={(e) => handlePart('year', e.target.value)}
        className={`${styles.select} ${styles.selectYear} ${!parts.year ? styles.placeholder : ''}`}
        aria-label="Año"
        data-testid={id ? `${id}-year` : 'datepicker-year'}
      >
        <option value="">Año</option>
        {Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map((y) => (
          <option key={y} value={String(y)}>{y}</option>
        ))}
      </select>
    </div>
  )
}

export default DatePicker
