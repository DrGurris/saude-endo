import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DataTable from './DataTable'

interface TestItem {
  id: string
  name: string
  email: string
  count: number
}

const ITEMS: TestItem[] = [
  { id: '1', name: 'Alice', email: 'alice@test.com', count: 5 },
  { id: '2', name: 'Bob', email: 'bob@test.com', count: 12 },
  { id: '3', name: 'Charlie', email: 'charlie@test.com', count: 3 },
  { id: '4', name: 'Diana', email: 'diana@test.com', count: 8 },
]

const COLUMNS = [
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'count', label: 'Total', sortable: true },
]

describe('DataTable', () => {
  it('renders all rows', () => {
    render(<DataTable data={ITEMS} columns={COLUMNS} getRowKey={i => i.id} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
    expect(screen.getByText('Diana')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(<DataTable data={ITEMS} columns={COLUMNS} getRowKey={i => i.id} />)
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('filters by search', () => {
    render(<DataTable data={ITEMS} columns={COLUMNS} getRowKey={i => i.id} />)
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'bob' } })

    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
    expect(screen.getByText('1 resultados')).toBeInTheDocument()
  })

  it('shows empty state when no results', () => {
    render(<DataTable data={ITEMS} columns={COLUMNS} getRowKey={i => i.id} />)
    fireEvent.change(screen.getByPlaceholderText('Buscar...'), { target: { value: 'xyz' } })
    expect(screen.getByText('No se encontraron resultados')).toBeInTheDocument()
  })

  it('handles row click', () => {
    const onRowClick = vi.fn()
    render(<DataTable data={ITEMS} columns={COLUMNS} getRowKey={i => i.id} onRowClick={onRowClick} />)
    fireEvent.click(screen.getByText('Alice'))
    expect(onRowClick).toHaveBeenCalledWith(ITEMS[0])
  })

  it('paginates when data exceeds pageSize', () => {
    const manyItems = Array.from({ length: 25 }, (_, i) => ({
      id: `${i}`, name: `User ${i}`, email: `u${i}@test.com`, count: i,
    }))
    render(<DataTable data={manyItems} columns={COLUMNS} getRowKey={i => i.id} pageSize={10} />)

    // First page should show 10 items
    expect(screen.getByText('User 0')).toBeInTheDocument()
    expect(screen.getByText('User 9')).toBeInTheDocument()
    expect(screen.queryByText('User 10')).not.toBeInTheDocument()

    // Navigate to page 2
    expect(screen.getByText('Pagina 1 de 3')).toBeInTheDocument()
  })

  it('clears search when X is clicked', () => {
    render(<DataTable data={ITEMS} columns={COLUMNS} getRowKey={i => i.id} />)
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'bob' } })

    expect(screen.queryByText('Alice')).not.toBeInTheDocument()

    const clearBtn = screen.getByLabelText('Limpiar')
    fireEvent.click(clearBtn)

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('hides search when searchable is false', () => {
    render(<DataTable data={ITEMS} columns={COLUMNS} getRowKey={i => i.id} searchable={false} />)
    expect(screen.queryByPlaceholderText('Buscar...')).not.toBeInTheDocument()
  })
})
