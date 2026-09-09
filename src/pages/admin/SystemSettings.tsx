import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, Check } from 'lucide-react'
import type { SystemSettings as SystemSettingsType } from '../../types'
import { fetchSettings, saveSettings } from '../../services/adminService'
import styles from './SystemSettings.module.css'

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettingsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch(() => setSaveError('No se pudo cargar la configuracion'))
      .finally(() => setIsLoading(false))
  }, [])

  const handleChange = useCallback((key: keyof SystemSettingsType, value: unknown) => {
    setSettings(prev => prev ? { ...prev, [key]: value } : prev)
    setSaved(false)
  }, [])

  const handleSave = useCallback(async () => {
    if (!settings) return
    setIsSaving(true)
    setSaveError(null)
    try {
      const updated = await saveSettings(settings)
      setSettings(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setSaveError('Error al guardar. Intenta de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }, [settings])

  if (isLoading || !settings) {
    return <div className={styles.loading}>Cargando configuracion...</div>
  }

  return (
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>
          <Settings size={24} />
          Configuracion del Sistema
        </h1>
        <p className={styles.subtitle}>Ajustes generales de la plataforma</p>
      </motion.div>

      <div className={styles.settingsCard}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>General</h2>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Modo mantenimiento</label>
              <p className={styles.settingDesc}>Desactiva el acceso publico al sitio</p>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={e => handleChange('maintenanceMode', e.target.checked)}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Registro abierto</label>
              <p className={styles.settingDesc}>Permite que nuevas usuarias se registren</p>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={settings.registrationOpen}
                onChange={e => handleChange('registrationOpen', e.target.checked)}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Verificacion de email</label>
              <p className={styles.settingDesc}>Requiere confirmacion por email al registrarse</p>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={e => handleChange('requireEmailVerification', e.target.checked)}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Foro</h2>

          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <label className={styles.settingLabel}>Hilos maximos por dia</label>
              <p className={styles.settingDesc}>Limite de creacion de hilos por usuario por dia</p>
            </div>
            <input
              type="number"
              value={settings.maxThreadsPerDay}
              onChange={e => handleChange('maxThreadsPerDay', Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className={styles.numberInput}
              min={1}
              max={50}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Anuncio</h2>

          <div className={styles.settingRowFull}>
            <label className={styles.settingLabel}>Banner de anuncio</label>
            <p className={styles.settingDesc}>Texto mostrado en la parte superior del sitio (dejar vacio para ocultar)</p>
            <input
              type="text"
              value={settings.announcementBanner}
              onChange={e => handleChange('announcementBanner', e.target.value)}
              className={styles.textInput}
              placeholder="Ej: Mantenimiento programado para el sabado 15 de marzo"
            />
          </div>
        </div>

        {saveError && <p className={styles.error} role="alert">{saveError}</p>}

        <div className={styles.saveRow}>
          <button
            className={`${styles.saveBtn} ${saved ? styles.savedBtn : ''}`}
            onClick={handleSave}
            disabled={isSaving}
          >
            {saved ? (
              <>
                <Check size={16} />
                Guardado
              </>
            ) : (
              <>
                <Save size={16} />
                {isSaving ? 'Guardando...' : 'Guardar cambios'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SystemSettings
