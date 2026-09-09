import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import type { ManagedArticle, PillarId, PhenotypeType, GoalOption, ArticleStatus } from '../../types'
import { fetchManagedArticleById, createArticle, updateArticle } from '../../services/articleService'
import { useAuth } from '../../context/AuthContext'
import MarkdownEditor from '../../components/admin/MarkdownEditor'
import styles from './ArticleEditor.module.css'

interface ArticleFormData {
  title: string
  pillarId: PillarId
  summary: string
  contentMarkdown: string
  citations: string
  phenotypeRelevance: PhenotypeType[]
  goalRelevance: GoalOption[]
  readTimeMinutes: number
  tags: string
  featured: boolean
  status: ArticleStatus
}

const PILLARS: Array<{ id: PillarId; label: string }> = [
  { id: 'pain', label: 'Dolor' },
  { id: 'energy', label: 'Energia' },
  { id: 'nutrition', label: 'Nutricion' },
  { id: 'hormones', label: 'Hormonas' },
  { id: 'wellbeing', label: 'Bienestar' },
]

const PHENOTYPES: PhenotypeType[] = ['nociceptive', 'neuropathic', 'nociplastic', 'mixed']
const GOALS: Array<{ id: GoalOption; label: string }> = [
  { id: 'reduce_pain', label: 'Reducir dolor' },
  { id: 'improve_energy', label: 'Mejorar energia' },
  { id: 'control_belly', label: 'Controlar endo belly' },
  { id: 'balance_hormones', label: 'Equilibrar hormonas' },
  { id: 'improve_fertility', label: 'Mejorar fertilidad' },
  { id: 'general_wellbeing', label: 'Bienestar general' },
]

const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isNew = !id

  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [existing, setExisting] = useState<ManagedArticle | null>(null)

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ArticleFormData>({
    defaultValues: {
      title: '',
      pillarId: 'pain',
      summary: '',
      contentMarkdown: '',
      citations: '',
      phenotypeRelevance: [],
      goalRelevance: [],
      readTimeMinutes: 5,
      tags: '',
      featured: false,
      status: 'draft',
    },
  })

  useEffect(() => {
    if (!id) return
    fetchManagedArticleById(id)
      .then(article => {
        if (article) {
          setExisting(article)
          reset({
            title: article.title,
            pillarId: article.pillarId,
            summary: article.summary,
            contentMarkdown: article.contentMarkdown,
            citations: article.citations.join('\n'),
            phenotypeRelevance: article.phenotypeRelevance,
            goalRelevance: article.goalRelevance,
            readTimeMinutes: article.readTimeMinutes,
            tags: article.tags.join(', '),
            featured: article.featured ?? false,
            status: article.status,
          })
        }
      })
      .finally(() => setIsLoading(false))
  }, [id, reset])

  const onSubmit = useCallback(async (data: ArticleFormData) => {
    setIsSaving(true)
    setSaveError(null)
    try {
      const articleData = {
        title: data.title,
        pillarId: data.pillarId,
        summary: data.summary,
        contentMarkdown: data.contentMarkdown,
        citations: data.citations.split('\n').map(c => c.trim()).filter(Boolean),
        phenotypeRelevance: data.phenotypeRelevance,
        goalRelevance: data.goalRelevance,
        readTimeMinutes: data.readTimeMinutes,
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
        featured: data.featured,
        status: data.status,
        authorId: user?.id ?? 'admin',
      }

      if (isNew) {
        await createArticle(articleData)
      } else if (existing) {
        await updateArticle(existing.id, articleData)
      }

      navigate('/admin/articles')
    } catch {
      setSaveError('Error al guardar el articulo. Intenta de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }, [isNew, existing, user, navigate])

  if (isLoading) {
    return <div className={styles.loading}>Cargando articulo...</div>
  }

  return (
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <button className={styles.backBtn} onClick={() => navigate('/admin/articles')}>
          <ArrowLeft size={18} />
          Volver a articulos
        </button>
        <h1 className={styles.title}>{isNew ? 'Nuevo Articulo' : 'Editar Articulo'}</h1>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Titulo *</label>
            <input
              {...register('title', { required: 'El titulo es obligatorio', minLength: { value: 5, message: 'Minimo 5 caracteres' } })}
              className={`${styles.input} ${errors.title ? styles.hasError : ''}`}
              placeholder="Titulo del articulo"
            />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Pilar *</label>
            <select {...register('pillarId')} className={styles.select}>
              {PILLARS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Resumen *</label>
          <textarea
            {...register('summary', { required: 'El resumen es obligatorio', minLength: { value: 20, message: 'Minimo 20 caracteres' } })}
            className={`${styles.textarea} ${errors.summary ? styles.hasError : ''}`}
            rows={3}
            placeholder="Resumen breve del articulo"
          />
          {errors.summary && <p className={styles.error}>{errors.summary.message}</p>}
        </div>

        <Controller
          name="contentMarkdown"
          control={control}
          rules={{ required: 'El contenido es obligatorio' }}
          render={({ field }) => (
            <MarkdownEditor
              value={field.value}
              onChange={field.onChange}
              label="Contenido (Markdown) *"
              error={errors.contentMarkdown?.message}
            />
          )}
        />

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Tiempo de lectura (min)</label>
            <input
              type="number"
              {...register('readTimeMinutes', { valueAsNumber: true, min: 1, max: 60 })}
              className={styles.input}
              min={1}
              max={60}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Estado</label>
            <select {...register('status')} className={styles.select}>
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Citas (una por linea)</label>
          <textarea
            {...register('citations')}
            className={styles.textarea}
            rows={4}
            placeholder="Autor et al. (2024). Titulo. Revista."
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Tags (separados por coma)</label>
          <input
            {...register('tags')}
            className={styles.input}
            placeholder="endometriosis, dolor, tratamiento"
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.label}>Relevancia por fenotipo</label>
          <div className={styles.checkboxes}>
            {PHENOTYPES.map(pt => (
              <label key={pt} className={styles.checkbox}>
                <input type="checkbox" value={pt} {...register('phenotypeRelevance')} />
                <span>{pt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.label}>Relevancia por objetivo</label>
          <div className={styles.checkboxes}>
            {GOALS.map(g => (
              <label key={g.id} className={styles.checkbox}>
                <input type="checkbox" value={g.id} {...register('goalRelevance')} />
                <span>{g.label}</span>
              </label>
            ))}
          </div>
        </div>

        <label className={styles.checkbox}>
          <input type="checkbox" {...register('featured')} />
          <span>Articulo destacado</span>
        </label>

        {saveError && <p className={styles.error} role="alert">{saveError}</p>}

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate('/admin/articles')}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? 'Guardando...' : (isNew ? 'Crear articulo' : 'Guardar cambios')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ArticleEditor
