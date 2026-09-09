import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CommunityFilters from './CommunityFilters'

describe('CommunityFilters', () => {
  const defaultProps = {
    selectedCategory: 'all' as const,
    onCategoryChange: vi.fn(),
    sortBy: 'recent' as const,
    onSortChange: vi.fn(),
  }

  it('renders all category buttons', () => {
    render(<CommunityFilters {...defaultProps} />)
    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Dolor')).toBeInTheDocument()
    expect(screen.getByText('Energia')).toBeInTheDocument()
    expect(screen.getByText('Nutricion')).toBeInTheDocument()
    expect(screen.getByText('Hormonas')).toBeInTheDocument()
    expect(screen.getByText('Bienestar')).toBeInTheDocument()
  })

  it('calls onCategoryChange when a category is clicked', () => {
    const onCategoryChange = vi.fn()
    render(<CommunityFilters {...defaultProps} onCategoryChange={onCategoryChange} />)
    fireEvent.click(screen.getByText('Dolor'))
    expect(onCategoryChange).toHaveBeenCalledWith('pain')
  })

  it('renders sort dropdown with both options', () => {
    render(<CommunityFilters {...defaultProps} />)
    const select = screen.getByDisplayValue('Mas recientes')
    expect(select).toBeInTheDocument()
  })

  it('calls onSortChange when sort selection changes', () => {
    const onSortChange = vi.fn()
    render(<CommunityFilters {...defaultProps} onSortChange={onSortChange} />)
    fireEvent.change(screen.getByDisplayValue('Mas recientes'), { target: { value: 'popular' } })
    expect(onSortChange).toHaveBeenCalledWith('popular')
  })

  it('highlights the active category', () => {
    render(
      <CommunityFilters {...defaultProps} selectedCategory="pain" />
    )
    const painBtn = screen.getByText('Dolor').closest('button')
    expect(painBtn?.className).toContain('active')
  })
})
