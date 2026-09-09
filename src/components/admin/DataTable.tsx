import React, { useState, useMemo, useEffect } from 'react'
import { Search, X, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'
import styles from './DataTable.module.css'

interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  onRowClick?: (item: T) => void
  getRowKey: (item: T) => string
}

function DataTable<T>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  pageSize = 10,
  onRowClick,
  getRowKey,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => { setPage(0) }, [data])

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const query = search.toLowerCase()
    return data.filter(item =>
      columns.some(col => {
        const value = (item as Record<string, unknown>)[col.key]
        return String(value ?? '').toLowerCase().includes(query)
      })
    )
  }, [data, search, columns])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const aVal = String((a as Record<string, unknown>)[sortKey] ?? '')
      const bVal = String((b as Record<string, unknown>)[sortKey] ?? '')
      const cmp = aVal.localeCompare(bVal)
      return sortAsc ? cmp : -cmp
    })
  }, [filtered, sortKey, sortAsc])

  const totalPages = Math.ceil(sorted.length / pageSize)
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(prev => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className={styles.wrapper}>
      {searchable && (
        <div className={styles.searchRow}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0) }}
              placeholder={searchPlaceholder}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Limpiar">
                <X size={14} />
              </button>
            )}
          </div>
          <span className={styles.count}>{sorted.length} resultados</span>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={col.sortable ? styles.sortable : undefined}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span>{col.label}</span>
                  {col.sortable && <ArrowUpDown size={14} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  No se encontraron resultados
                </td>
              </tr>
            ) : (
              paged.map(item => (
                <tr
                  key={getRowKey(item)}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  className={onRowClick ? styles.clickable : undefined}
                >
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className={styles.pageBtn}
          >
            <ChevronLeft size={16} />
          </button>
          <span className={styles.pageInfo}>
            Pagina {page + 1} de {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className={styles.pageBtn}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default DataTable
