import React, { useState } from 'react'
import { X, CalendarCheck, Clock, CheckCircle2, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import DatePicker from './DatePicker'
import styles from './BookingModal.module.css'

const TIME_SLOTS = [
  { value: 'morning',   label: 'Mañana',   sub: '9:00 – 12:00 h' },
  { value: 'afternoon', label: 'Tarde',    sub: '13:00 – 17:00 h' },
  { value: 'anytime',   label: 'Cualquier hora', sub: 'Flexible' },
]

interface BookingForm {
  name: string
  email: string
  date: string
  time: string
  notes: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()

  const [form, setForm] = useState<BookingForm>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    date: '',
    time: 'morning',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<BookingForm>>({})

  const validate = (): boolean => {
    const e: Partial<BookingForm> = {}
    if (!form.name.trim())  e.name  = 'El nombre es requerido'
    if (!form.email.trim()) e.email = 'El correo es requerido'
    if (!form.date)         e.date  = 'Selecciona una fecha'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    const booking = { ...form, createdAt: new Date().toISOString(), id: Date.now().toString() }
    try { localStorage.setItem(`saude_booking_${booking.id}`, JSON.stringify(booking)) } catch { /* ignore */ }
    setSubmitted(true)
  }

  const minDate = new Date(); minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]
  const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Agendar cita"
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.headerIcon}>
                  <CalendarCheck size={22} color="var(--color-endo-yellow)" />
                </div>
                <div>
                  <h2>Solicitar Cita</h2>
                  <p>Campaña Mes de la Endometriosis – Revisión preferencial</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            <div className={styles.body}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className={styles.form}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className={styles.row2}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="booking-name">Nombre completo</label>
                        <input
                          id="booking-name"
                          type="text"
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Tu nombre"
                          className={errors.name ? styles.inputError : ''}
                          data-testid="booking-name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="booking-email">Correo electrónico</label>
                        <input
                          id="booking-email"
                          type="email"
                          value={form.email}
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          placeholder="correo@ejemplo.com"
                          className={errors.email ? styles.inputError : ''}
                          data-testid="booking-email"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Fecha preferida</label>
                      <DatePicker
                        id="booking-date"
                        value={form.date}
                        onChange={val => setForm(p => ({ ...p, date: val }))}
                        max={maxDateStr}
                        hasError={!!errors.date}
                      />
                      {errors.date && <span className={styles.fieldError}>{errors.date}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Horario preferido</label>
                      <div className={styles.timeSlots}>
                        {TIME_SLOTS.map(slot => (
                          <motion.button
                            key={slot.value}
                            type="button"
                            className={`${styles.timeSlot} ${form.time === slot.value ? styles.timeSelected : ''}`}
                            onClick={() => setForm(p => ({ ...p, time: slot.value }))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-pressed={form.time === slot.value}
                            data-testid={`booking-time-${slot.value}`}
                          >
                            <Clock size={16} />
                            <span className={styles.slotLabel}>{slot.label}</span>
                            <span className={styles.slotSub}>{slot.sub}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="booking-notes">Motivo o comentarios (opcional)</label>
                      <textarea
                        id="booking-notes"
                        rows={2}
                        value={form.notes}
                        onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                        placeholder="¿Hay algo que quieras que la doctora sepa antes de la consulta?"
                        className={styles.textarea}
                        data-testid="booking-notes"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className={styles.submitBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-testid="booking-submit"
                    >
                      <Send size={18} /> Solicitar mi Cita
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className={styles.successState}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'backOut' }}
                  >
                    <motion.div
                      className={styles.successCircle}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.5, ease: 'backOut' }}
                    >
                      <CheckCircle2 size={48} color="var(--color-success)" />
                    </motion.div>
                    <h3>¡Solicitud enviada!</h3>
                    <p>Te contactaremos dentro de las próximas 24 horas para confirmar tu cita.</p>
                    <p className={styles.successSub}>Revisa tu correo <strong>{form.email}</strong></p>
                    <motion.button
                      className={styles.closeSuccessBtn}
                      onClick={onClose}
                      whileHover={{ scale: 1.03 }}
                      data-testid="booking-success-close"
                    >
                      Entendido
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BookingModal
