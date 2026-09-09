import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Plus, Trash2, Archive, Send } from 'lucide-react'
import type { ManagedArticle } from '../../types'
import { fetchManagedArticles, deleteArticle, publishArticle, archiveArticle } from '../../services/articleService'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import ActionModal from '../../components/admin/ActionModal'
import styles from './ArticleManagement.module.css'

const ArticleManagement: React.FC = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<ManagedArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<ManagedArticle | null>(null)

  const loadArticles = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchManagedArticles()
      setArticles(data)
    } catch {
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { loadArticles() }, [loadArticles])

  const handlePublish = useCallback(async (id: string) => {
    try {
      const updated = await publishArticle(id)
      if (updated) {
        setArticles(prev => prev.map(a => (a.id === updated.id ? updated : a)))
      }
    } catch {
      // Publish failed silently
    }
  }, [])

  const handleArchive = useCallback(async (id: string) => {
    try {
      const updated = await archiveArticle(id)
      if (updated) {
        setArticles(prev => prev.map(a => (a.id === updated.id ? updated : a)))
      }
    } catch {
      // Archive failed silently
    }
  }, [])

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return
    try {
      const success = await deleteArticle(deleteTarget.id)
      if (success) {
        setArticles(prev => prev.filter(a => a.id !== deleteTarget.id))
      }
    } catch {
      // Delete failed
    } finally {
      setDeleteTarget(null)
    }
  }, [deleteTarget])

  const columns = [
    { key: 'title', label: 'Titulo', sortable: true },
    { key: 'pillarId', label: 'Pilar', sortable: true },
    {
      key: 'status',
      label: 'Estado',
      render: (a: ManagedArticle) => <StatusBadge status={a.status} />,
    },
    { key: 'readTimeMinutes', label: 'Lectura', render: (a: ManagedArticle) => `${a.readTimeMinutes} min` },
    { key: 'version', label: 'Version', render: (a: ManagedArticle) => `v${a.version}` },
    {
      key: 'actions',
      label: 'Acciones',
      render: (a: ManagedArticle) => (
        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={e => { e.stopPropagation(); navigate(`/admin/articles/${a.id}/edit`) }}
          >
            Editar
          </button>
          {a.status === 'draft' && (
            <button
              className={styles.publishBtn}
              onClick={e => { e.stopPropagation(); handlePublish(a.id) }}
              title="Publicar"
            >
              <Send size={14} />
            </button>
          )}
          {a.status === 'published' && (
            <button
              className={styles.archiveBtn}
              onClick={e => { e.stopPropagation(); handleArchive(a.id) }}
              title="Archivar"
            >
              <Archive size={14} />
            </button>
          )}
          <button
            className={styles.deleteBtn}
            onClick={e => { e.stopPropagation(); setDeleteTarget(a) }}
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <div className={styles.loading}>Cargando articulos...</div>
  }

  return (
    <div className={styles.container}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              <FileText size={24} />
              Gestion de Articulos
            </h1>
            <p className={styles.subtitle}>{articles.length} articulos en total</p>
          </div>
          <button
            className={styles.newBtn}
            onClick={() => navigate('/admin/articles/new')}
          >
            <Plus size={18} />
            Nuevo articulo
          </button>
        </div>
      </motion.div>

      <DataTable
        data={articles}
        columns={columns}
        getRowKey={a => a.id}
        searchPlaceholder="Buscar articulos..."
        onRowClick={a => navigate(`/admin/articles/${a.id}/edit`)}
      />

      <ActionModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Eliminar articulo"
        description={`Se eliminara "${deleteTarget?.title}". Esta accion no se puede deshacer.`}
        confirmLabel="Eliminar"
        confirmVariant="danger"
      />
    </div>
  )
}

export default ArticleManagement
