import React, { useMemo, useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import styles from './SymptomChart.module.css'

const API_URL = import.meta.env.VITE_API_URL || '/api'

interface DayEntry {
  date: string
  pain: number
  energy: number
  mood: 'good' | 'neutral' | 'bad'
  notes: string
}

function getStorageKey(date: string) {
  return `saude_diario_${date}`
}

function getLast7Entries(): DayEntry[] {
  const entries: DayEntry[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    const raw = localStorage.getItem(getStorageKey(key))
    if (raw) {
      try {
        entries.push(JSON.parse(raw))
      } catch {
        /* skip */
      }
    }
  }
  return entries
}

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('es-ES', { weekday: 'short' }).substring(0, 3)
}

interface TrendInfo {
  direction: 'up' | 'down' | 'stable'
  label: string
  color: string
}

function analyzeTrend(values: number[], type: 'pain' | 'energy'): TrendInfo {
  if (values.length < 2) {
    return { direction: 'stable', label: 'Sin datos suficientes', color: 'var(--color-text-muted)' }
  }
  
  const firstHalf = values.slice(0, Math.ceil(values.length / 2))
  const secondHalf = values.slice(Math.ceil(values.length / 2))
  
  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
  const diff = avgSecond - avgFirst

  if (type === 'pain') {
    if (diff < -0.5) return { direction: 'down', label: 'Dolor reducido', color: 'var(--color-success)' }
    if (diff > 0.5) return { direction: 'up', label: 'Dolor aumentado', color: 'var(--color-accent)' }
    return { direction: 'stable', label: 'Dolor estable', color: 'var(--color-secondary)' }
  } else {
    if (diff > 0.5) return { direction: 'up', label: 'Energía mejorada', color: 'var(--color-success)' }
    if (diff < -0.5) return { direction: 'down', label: 'Energía reducida', color: 'var(--color-accent)' }
    return { direction: 'stable', label: 'Energía estable', color: 'var(--color-secondary)' }
  }
}

const CustomTooltip: React.FC<{ active?: boolean; payload?: { value: number; name: string }[]; label?: string }> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (!active || !payload || !payload.length) return null

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className={styles.tooltipValue} style={{ color: entry.name === 'pain' ? 'var(--color-accent)' : 'var(--color-success)' }}>
          {entry.name === 'pain' ? 'Dolor' : 'Energía'}: {entry.value}/10
        </p>
      ))}
    </div>
  )
}

const SymptomChart: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const [backendEntries, setBackendEntries] = useState<DayEntry[]>([])
  
  // Fetch entries from backend if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('saude_token')
      if (token) {
        fetch(`${API_URL}/symptoms?days=7`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data.symptoms) {
              setBackendEntries(data.symptoms.map((s: { date: string; pain: number; energy: number; mood: 'good' | 'neutral' | 'bad'; notes: string }) => ({
                date: s.date,
                pain: s.pain,
                energy: s.energy,
                mood: s.mood,
                notes: s.notes
              })))
            }
          })
          .catch(console.error)
      }
    }
  }, [isAuthenticated])

  // Combine localStorage entries with backend entries (backend takes priority)
  const entries = useMemo(() => {
    const localEntries = getLast7Entries()
    
    if (backendEntries.length > 0) {
      // Merge: backend entries take priority
      const entriesMap = new Map<string, DayEntry>()
      localEntries.forEach(e => entriesMap.set(e.date, e))
      backendEntries.forEach(e => entriesMap.set(e.date, e))
      return Array.from(entriesMap.values()).sort((a, b) => a.date.localeCompare(b.date))
    }
    
    return localEntries
  }, [backendEntries])

  const chartData = useMemo(() => {
    return entries.map((entry) => ({
      name: formatDayLabel(entry.date),
      pain: entry.pain,
      energy: entry.energy,
      fullDate: entry.date,
    }))
  }, [entries])

  const painTrend = useMemo(() => analyzeTrend(entries.map(e => e.pain), 'pain'), [entries])
  const energyTrend = useMemo(() => analyzeTrend(entries.map(e => e.energy), 'energy'), [entries])

  const TrendIcon = ({ direction }: { direction: 'up' | 'down' | 'stable' }) => {
    if (direction === 'up') return <TrendingUp size={16} />
    if (direction === 'down') return <TrendingDown size={16} />
    return <Minus size={16} />
  }

  if (entries.length === 0) {
    return (
      <motion.div 
        className={styles.emptyState}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        data-testid="symptom-chart-empty"
      >
        <p className={styles.emptyTitle}>Sin registros aún</p>
        <p className={styles.emptyDesc}>Usa el Diario de Síntomas para ver tu progreso aquí.</p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      data-testid="symptom-chart"
    >
      <div className={styles.header}>
        <h3 className={styles.title}>Tu Progreso (últimos 7 días)</h3>
        <div className={styles.trendsRow}>
          <motion.div 
            className={styles.trendBadge}
            style={{ background: `${painTrend.color}14`, color: painTrend.color }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TrendIcon direction={painTrend.direction} />
            <span>{painTrend.label}</span>
          </motion.div>
          <motion.div 
            className={styles.trendBadge}
            style={{ background: `${energyTrend.color}14`, color: energyTrend.color }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TrendIcon direction={energyTrend.direction} />
            <span>{energyTrend.label}</span>
          </motion.div>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
            />
            <YAxis 
              domain={[0, 10]} 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
              ticks={[0, 5, 10]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="pain"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--color-bg)' }}
              name="pain"
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="var(--color-success)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--color-bg)' }}
              name="energy"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: 'var(--color-accent)' }} />
          Dolor
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: 'var(--color-success)' }} />
          Energía
        </span>
      </div>
    </motion.div>
  )
}

export default SymptomChart
