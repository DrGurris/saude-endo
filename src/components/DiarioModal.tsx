import React, { useState } from 'react'
import { X, Smile, Meh, Frown, CheckCircle2, CalendarDays, Zap, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './DiarioModal.module.css'

interface DayEntry {
  date: string
  pain: number
  energy: number
  mood: 'good' | 'neutral' | 'bad'
  notes: string
}

const MOOD_OPTIONS: { value: DayEntry['mood']; label: string; Icon: React.FC<{ size: number; color: string }>; color: string }[] = [
  { value: 'good',    label: 'Bien',    Icon: Smile, color: 'var(--color-success)' },
  { value: 'neutral', label: 'Regular', Icon: Meh,   color: 'var(--color-secondary)' },
  { value: 'bad',     label: 'Difícil', Icon: Frown,  color: 'var(--color-accent)' },
]

function getStorageKey(date: string) { return `saude_diario_${date}` }

function loadEntry(date: string): DayEntry {
  try {
    const raw = localStorage.getItem(getStorageKey(date))
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { date, pain: 3, energy: 7, mood: 'neutral', notes: '' }
}

function getLast7Entries(): DayEntry[] {
  const entries: DayEntry[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    const raw = localStorage.getItem(getStorageKey(key))
    if (raw) {
      try { entries.push(JSON.parse(raw)) } catch { /* skip */ }
    }
  }
  return entries
}

function painColor(v: number) {
  if (v <= 3) return 'var(--color-success)'
  if (v <= 6) return 'var(--color-secondary)'
  return 'var(--color-accent)'
}

function energyColor(v: number) {
  if (v >= 7) return 'var(--color-success)'
  if (v >= 4) return 'var(--color-secondary)'
  return 'var(--color-accent)'
}

const today = new Date().toISOString().split('T')[0]
const dateLabel = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

interface DiarioModalProps {
  isOpen: boolean
  onClose: () => void
}

const DiarioModal: React.FC<DiarioModalProps> = ({ isOpen, onClose }) => {
  const [entry, setEntry] = useState<DayEntry>(() => loadEntry(today))
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    try { localStorage.setItem(getStorageKey(today), JSON.stringify(entry)) } catch { /* ignore */ }
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 1600)
  }

  const history = getLast7Entries().filter(e => e.date !== today).slice(-3)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Side Panel */}
          <motion.aside
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Diario de síntomas"
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <CalendarDays size={20} color="var(--color-primary)" />
                <div>
                  <h2>Registrar mi día</h2>
                  <p className={styles.dateLabel}>{dateLabel}</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar diario">
                <X size={20} />
              </button>
            </div>

            <div className={styles.body}>
              {/* Pain */}
              <div className={styles.fieldGroup}>
                <div className={styles.fieldLabel}>
                  <Heart size={16} color={painColor(entry.pain)} />
                  <span>Nivel de dolor</span>
                  <span className={styles.sliderVal} style={{ color: painColor(entry.pain) }}>{entry.pain}</span>
                </div>
                <input
                  type="range" min={0} max={10} value={entry.pain}
                  onChange={e => setEntry(p => ({ ...p, pain: Number(e.target.value) }))}
                  className={styles.slider}
                  style={{ accentColor: painColor(entry.pain) }}
                  aria-label="Nivel de dolor del 0 al 10"
                  data-testid="diario-pain"
                />
                <div className={styles.sliderTicks}><span>Sin dolor</span><span>Moderado</span><span>Intenso</span></div>
              </div>

              {/* Energy */}
              <div className={styles.fieldGroup}>
                <div className={styles.fieldLabel}>
                  <Zap size={16} color={energyColor(entry.energy)} />
                  <span>Nivel de energía</span>
                  <span className={styles.sliderVal} style={{ color: energyColor(entry.energy) }}>{entry.energy}</span>
                </div>
                <input
                  type="range" min={0} max={10} value={entry.energy}
                  onChange={e => setEntry(p => ({ ...p, energy: Number(e.target.value) }))}
                  className={styles.slider}
                  style={{ accentColor: energyColor(entry.energy) }}
                  aria-label="Nivel de energía del 0 al 10"
                  data-testid="diario-energy"
                />
                <div className={styles.sliderTicks}><span>Agotada</span><span>Regular</span><span>Excelente</span></div>
              </div>

              {/* Mood */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabelText}>Estado de ánimo</label>
                <div className={styles.moodRow}>
                  {MOOD_OPTIONS.map(({ value, label, Icon, color }) => (
                    <motion.button
                      key={value}
                      className={`${styles.moodBtn} ${entry.mood === value ? styles.moodSelected : ''}`}
                      style={entry.mood === value ? { borderColor: color, background: `${color}14` } : {}}
                      onClick={() => setEntry(p => ({ ...p, mood: value }))}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-pressed={entry.mood === value}
                      data-testid={`diario-mood-${value}`}
                    >
                      <Icon size={24} color={entry.mood === value ? color : 'var(--color-text-muted)'} />
                      <span style={entry.mood === value ? { color } : {}}>{label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabelText} htmlFor="diario-notes">Notas (opcional)</label>
                <textarea
                  id="diario-notes"
                  className={styles.notes}
                  placeholder="¿Algo importante hoy? Síntomas nuevos, medicación tomada..."
                  value={entry.notes}
                  onChange={e => setEntry(p => ({ ...p, notes: e.target.value }))}
                  rows={3}
                  data-testid="diario-notes"
                  aria-label="Notas del día"
                />
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className={styles.history}>
                  <p className={styles.historyTitle}>Últimos registros</p>
                  <div className={styles.historyDots}>
                    {history.map((h) => (
                      <div key={h.date} className={styles.historyDot} title={`Dolor: ${h.pain} | Energía: ${h.energy}`}>
                        <div className={styles.historyDotCircle} style={{ background: painColor(h.pain) }} />
                        <span>{new Date(h.date + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.div
                    key="saved"
                    className={styles.savedState}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={22} color="var(--color-success)" />
                    <span>Registrado correctamente</span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="save"
                    className={styles.saveBtn}
                    onClick={handleSave}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    data-testid="diario-save"
                  >
                    Guardar registro del día
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default DiarioModal
