import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MarkdownEditor from './MarkdownEditor'

describe('MarkdownEditor', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  }

  it('renders textarea in edit mode by default', () => {
    render(<MarkdownEditor {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Escribe en markdown...')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('renders label when provided', () => {
    render(<MarkdownEditor {...defaultProps} label="Contenido" />)
    expect(screen.getByText('Contenido')).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(<MarkdownEditor {...defaultProps} onChange={onChange} />)
    fireEvent.change(screen.getByPlaceholderText('Escribe en markdown...'), {
      target: { value: 'Hello **world**' },
    })
    expect(onChange).toHaveBeenCalledWith('Hello **world**')
  })

  it('switches to preview mode', () => {
    render(<MarkdownEditor {...defaultProps} value="## Title" />)
    fireEvent.click(screen.getByText('Vista previa'))
    // In preview mode, the textarea should not be visible
    expect(screen.queryByPlaceholderText('Escribe en markdown...')).not.toBeInTheDocument()
    // The rendered heading should be visible
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('shows empty preview message when value is empty', () => {
    render(<MarkdownEditor {...defaultProps} value="" />)
    fireEvent.click(screen.getByText('Vista previa'))
    expect(screen.getByText('Sin contenido')).toBeInTheDocument()
  })

  it('switches back to edit mode', () => {
    render(<MarkdownEditor {...defaultProps} value="Some text" />)
    fireEvent.click(screen.getByText('Vista previa'))
    fireEvent.click(screen.getByText('Editar'))
    expect(screen.getByPlaceholderText('Escribe en markdown...')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<MarkdownEditor {...defaultProps} error="Campo requerido" />)
    expect(screen.getByText('Campo requerido')).toBeInTheDocument()
  })

  it('uses custom placeholder', () => {
    render(<MarkdownEditor {...defaultProps} placeholder="Escribe aqui..." />)
    expect(screen.getByPlaceholderText('Escribe aqui...')).toBeInTheDocument()
  })
})
