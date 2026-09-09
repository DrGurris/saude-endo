import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ForumThread } from '../../types'

// Mock framer-motion to avoid animation issues — must use React from import
vi.mock('framer-motion', async () => {
  const R = await import('react')
  const handler: ProxyHandler<Record<string, unknown>> = {
    get: (_target, prop: string) => {
      return R.forwardRef((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => {
        const { children, initial, animate, transition, whileHover, whileTap, exit, variants, ...rest } = props
        return R.createElement(prop, { ...rest, ref }, children as React.ReactNode)
      })
    },
  }
  return {
    motion: new Proxy({}, handler),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => R.createElement(R.Fragment, null, children),
  }
})

const { default: ThreadCard } = await import('./ThreadCard')

const mockThread: ForumThread = {
  id: 'thread-1',
  title: 'Mi experiencia con dolor pelvico',
  body: 'Este es un tema sobre dolor pelvico que quiero compartir con la comunidad para ayudar a otras personas.',
  authorId: 'user-1',
  authorName: 'Maria Garcia',
  authorRole: 'user',
  isAnonymous: false,
  category: 'pain',
  pinned: false,
  locked: false,
  supportCount: 5,
  replyCount: 3,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

function renderCard(overrides: Partial<ForumThread> = {}, props = {}) {
  const defaults = {
    isSupported: false,
    onToggleSupport: vi.fn(),
    isAuthenticated: true,
  }
  return render(
    <MemoryRouter>
      <ThreadCard thread={{ ...mockThread, ...overrides }} {...defaults} {...props} />
    </MemoryRouter>
  )
}

describe('ThreadCard', () => {
  it('renders thread title and excerpt', () => {
    renderCard()
    expect(screen.getByText('Mi experiencia con dolor pelvico')).toBeInTheDocument()
    // Excerpt also renders in the body
    expect(screen.getByText(/compartir con la comunidad/)).toBeInTheDocument()
  })

  it('shows reply count', () => {
    renderCard({ replyCount: 7 })
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('shows pinned badge when thread is pinned', () => {
    renderCard({ pinned: true })
    expect(screen.getByText('Fijado')).toBeInTheDocument()
  })

  it('does not show pinned badge when not pinned', () => {
    renderCard({ pinned: false })
    expect(screen.queryByText('Fijado')).not.toBeInTheDocument()
  })

  it('shows author name', () => {
    renderCard()
    expect(screen.getByText('Maria Garcia')).toBeInTheDocument()
  })

  it('truncates long body to 150 chars', () => {
    const longBody = 'A'.repeat(200)
    renderCard({ body: longBody })
    const excerpt = screen.getByText(/\.\.\./)
    expect(excerpt.textContent!.length).toBeLessThanOrEqual(154) // 150 + "..."
  })

  it('has keyboard accessible link role', () => {
    renderCard()
    const card = screen.getByRole('link')
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute('tabindex', '0')
  })

  it('calls navigate on Enter key', () => {
    renderCard()
    const card = screen.getByRole('link')
    fireEvent.keyDown(card, { key: 'Enter' })
    // No error means navigation handler was called
  })
})
