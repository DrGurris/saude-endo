import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { renderMarkdown } from './markdownRenderer'

function MarkdownWrapper({ md }: { md: string }) {
  return React.createElement('div', { 'data-testid': 'md' }, ...renderMarkdown(md))
}

describe('renderMarkdown', () => {
  it('renders a plain paragraph', () => {
    render(<MarkdownWrapper md="Hello world" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders headings h1, h2, h3', () => {
    render(<MarkdownWrapper md={'# Title\n## Subtitle\n### Section'} />)
    expect(screen.getByText('Title').tagName).toBe('H1')
    expect(screen.getByText('Subtitle').tagName).toBe('H2')
    expect(screen.getByText('Section').tagName).toBe('H3')
  })

  it('renders bold text with **', () => {
    render(<MarkdownWrapper md="This is **bold** text" />)
    const strong = screen.getByText('bold')
    expect(strong.tagName).toBe('STRONG')
  })

  it('renders italic text with *', () => {
    render(<MarkdownWrapper md="This is *italic* text" />)
    const em = screen.getByText('italic')
    expect(em.tagName).toBe('EM')
  })

  it('renders bold+italic with ***', () => {
    render(<MarkdownWrapper md="This is ***both*** text" />)
    const strong = screen.getByText('both').closest('strong')
    expect(strong).toBeInTheDocument()
    const em = screen.getByText('both')
    expect(em.tagName).toBe('EM')
  })

  it('renders inline code with backticks', () => {
    render(<MarkdownWrapper md="Use `console.log` here" />)
    const code = screen.getByText('console.log')
    expect(code.tagName).toBe('CODE')
  })

  it('renders unordered lists', () => {
    render(<MarkdownWrapper md={'- First\n- Second\n- Third'} />)
    const list = screen.getByText('First').closest('ul')
    expect(list).toBeInTheDocument()
    expect(list!.querySelectorAll('li')).toHaveLength(3)
  })

  it('renders ordered lists', () => {
    render(<MarkdownWrapper md={'1. Alpha\n2. Beta\n3. Gamma'} />)
    const list = screen.getByText('Alpha').closest('ol')
    expect(list).toBeInTheDocument()
    expect(list!.querySelectorAll('li')).toHaveLength(3)
  })

  it('renders blockquotes', () => {
    render(<MarkdownWrapper md="> Quote text" />)
    const bq = screen.getByText('Quote text').closest('blockquote')
    expect(bq).toBeInTheDocument()
  })

  it('renders horizontal rules', () => {
    const { container } = render(<MarkdownWrapper md={'Line 1\n---\nLine 2'} />)
    const hrs = container.querySelectorAll('hr')
    expect(hrs.length).toBe(1)
  })

  it('skips empty lines without error', () => {
    render(<MarkdownWrapper md={'Hello\n\n\n\nWorld'} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('World')).toBeInTheDocument()
  })

  it('handles mixed content', () => {
    const md = `## Title
Some **bold** paragraph.

- Item with *italic*
- Item two

> A wise quote

Regular ending.`
    render(<MarkdownWrapper md={md} />)
    expect(screen.getByText('Title').tagName).toBe('H2')
    expect(screen.getByText('bold').tagName).toBe('STRONG')
    expect(screen.getByText(/A wise quote/).closest('blockquote')).toBeInTheDocument()
    expect(screen.getByText('Regular ending.')).toBeInTheDocument()
  })

  it('returns empty array for empty string', () => {
    const result = renderMarkdown('')
    expect(result).toHaveLength(0)
  })
})
