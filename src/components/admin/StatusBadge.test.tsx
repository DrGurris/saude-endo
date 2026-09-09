import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusBadge from './StatusBadge'

describe('StatusBadge', () => {
  it('renders default label for status', () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByText('Activo')).toBeInTheDocument()
  })

  it('renders all status variants', () => {
    const variants = [
      { status: 'active', label: 'Activo' },
      { status: 'suspended', label: 'Suspendido' },
      { status: 'banned', label: 'Baneado' },
      { status: 'draft', label: 'Borrador' },
      { status: 'published', label: 'Publicado' },
      { status: 'archived', label: 'Archivado' },
      { status: 'pending', label: 'Pendiente' },
      { status: 'reviewed', label: 'Revisado' },
      { status: 'dismissed', label: 'Descartado' },
    ] as const

    for (const { status, label } of variants) {
      const { unmount } = render(<StatusBadge status={status} />)
      expect(screen.getByText(label)).toBeInTheDocument()
      unmount()
    }
  })

  it('uses custom label when provided', () => {
    render(<StatusBadge status="active" label="Custom Label" />)
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
    expect(screen.queryByText('Activo')).not.toBeInTheDocument()
  })

  it('applies status CSS class', () => {
    const { container } = render(<StatusBadge status="banned" />)
    const badge = container.firstElementChild as HTMLElement
    expect(badge.className).toContain('banned')
  })
})
