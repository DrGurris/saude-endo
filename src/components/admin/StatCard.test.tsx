import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatCard from './StatCard'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Usuarios" value={42} icon={<span>icon</span>} />)
    expect(screen.getByText('Usuarios')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders string values', () => {
    render(<StatCard label="Estado" value="Activo" icon={<span>icon</span>} />)
    expect(screen.getByText('Activo')).toBeInTheDocument()
  })

  it('shows trend indicator when provided', () => {
    render(
      <StatCard label="Growth" value={100} icon={<span>icon</span>} trend="up" trendValue="+12%" />
    )
    expect(screen.getByText('+12%')).toBeInTheDocument()
  })

  it('does not show trend when not provided', () => {
    render(<StatCard label="Total" value={50} icon={<span>icon</span>} />)
    expect(screen.queryByText('%')).not.toBeInTheDocument()
  })

  it('applies custom color to border', () => {
    const { container } = render(
      <StatCard label="Custom" value={10} icon={<span>icon</span>} color="#ff0000" />
    )
    const card = container.firstElementChild as HTMLElement
    expect(card.style.borderTopColor).toBe('rgb(255, 0, 0)')
  })
})
