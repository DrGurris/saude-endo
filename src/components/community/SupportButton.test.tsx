import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SupportButton from './SupportButton'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { whileHover, whileTap, ...rest } = props
      return <button {...rest as React.ButtonHTMLAttributes<HTMLButtonElement>}>{children}</button>
    },
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, ...rest } = props
      return <span {...rest as React.HTMLAttributes<HTMLSpanElement>}>{children}</span>
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

describe('SupportButton', () => {
  it('renders count', () => {
    render(<SupportButton count={5} isSupported={false} onToggle={() => {}} disabled={false} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn()
    render(<SupportButton count={3} isSupported={false} onToggle={onToggle} disabled={false} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('does not call onToggle when disabled', () => {
    const onToggle = vi.fn()
    render(<SupportButton count={3} isSupported={false} onToggle={onToggle} disabled={true} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).not.toHaveBeenCalled()
  })

  it('shows supported state', () => {
    const { container } = render(
      <SupportButton count={10} isSupported={true} onToggle={() => {}} disabled={false} />
    )
    expect(container.querySelector('button')).toHaveAttribute('aria-label', 'Quitar apoyo')
  })

  it('shows unsupported state', () => {
    const { container } = render(
      <SupportButton count={10} isSupported={false} onToggle={() => {}} disabled={false} />
    )
    expect(container.querySelector('button')).toHaveAttribute('aria-label', 'Dar apoyo')
  })
})
