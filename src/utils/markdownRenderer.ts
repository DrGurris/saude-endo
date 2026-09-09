import React from 'react'

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold + italic
    const boldItalicMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/)
    if (boldItalicMatch) {
      nodes.push(React.createElement('strong', { key: key++ },
        React.createElement('em', null, boldItalicMatch[1])))
      remaining = remaining.slice(boldItalicMatch[0].length)
      continue
    }

    // Bold
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    if (boldMatch) {
      nodes.push(React.createElement('strong', { key: key++ }, boldMatch[1]))
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic with *
    const italicMatch = remaining.match(/^\*([^*]+?)\*/)
    if (italicMatch) {
      nodes.push(React.createElement('em', { key: key++ }, italicMatch[1]))
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Inline code
    const codeMatch = remaining.match(/^`([^`]+?)`/)
    if (codeMatch) {
      nodes.push(React.createElement('code', { key: key++, style: {
        background: 'var(--color-surface-hover)',
        padding: '0.15em 0.4em',
        borderRadius: '4px',
        fontSize: '0.9em',
      } }, codeMatch[1]))
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Regular text (up to next special char)
    const nextSpecial = remaining.search(/[*`]/)
    if (nextSpecial === -1) {
      nodes.push(remaining)
      break
    }
    if (nextSpecial === 0) {
      nodes.push(remaining[0])
      remaining = remaining.slice(1)
    } else {
      nodes.push(remaining.slice(0, nextSpecial))
      remaining = remaining.slice(nextSpecial)
    }
  }

  return nodes
}

export function renderMarkdown(markdown: string): React.ReactNode[] {
  const lines = markdown.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip empty lines
    if (!trimmed) {
      i++
      continue
    }

    // H1
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      elements.push(React.createElement('h1', {
        key: key++,
        style: { fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'var(--color-text-primary)' },
      }, parseInline(trimmed.slice(2))))
      i++
      continue
    }

    // H3 (check before H2)
    if (trimmed.startsWith('### ')) {
      elements.push(React.createElement('h3', {
        key: key++,
        style: { fontSize: '1rem', fontWeight: 600, margin: '1.25rem 0 0.5rem 0', color: 'var(--color-text-primary)' },
      }, parseInline(trimmed.slice(4))))
      i++
      continue
    }

    // H2
    if (trimmed.startsWith('## ')) {
      elements.push(React.createElement('h2', {
        key: key++,
        style: { fontSize: '1.15rem', fontWeight: 600, margin: '1.5rem 0 0.75rem 0', color: 'var(--color-text-primary)' },
      }, parseInline(trimmed.slice(3))))
      i++
      continue
    }

    // HR
    if (trimmed === '---' || trimmed === '***') {
      elements.push(React.createElement('hr', {
        key: key++,
        style: { border: 'none', borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' },
      }))
      i++
      continue
    }

    // Unordered list
    if (trimmed.startsWith('- ')) {
      const items: React.ReactNode[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(React.createElement('li', {
          key: key++,
          style: { marginBottom: '0.35rem', lineHeight: 1.6 },
        }, parseInline(lines[i].trim().slice(2))))
        i++
      }
      elements.push(React.createElement('ul', {
        key: key++,
        style: { margin: '0.5rem 0 1rem 0', paddingLeft: '1.25rem' },
      }, items))
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items: React.ReactNode[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const text = lines[i].trim().replace(/^\d+\.\s/, '')
        items.push(React.createElement('li', {
          key: key++,
          style: { marginBottom: '0.35rem', lineHeight: 1.6 },
        }, parseInline(text)))
        i++
      }
      elements.push(React.createElement('ol', {
        key: key++,
        style: { margin: '0.5rem 0 1rem 0', paddingLeft: '1.25rem' },
      }, items))
      continue
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      elements.push(React.createElement('blockquote', {
        key: key++,
        style: {
          borderLeft: '3px solid var(--color-primary)',
          paddingLeft: '1rem',
          margin: '0.75rem 0',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
        },
      }, parseInline(trimmed.slice(2))))
      i++
      continue
    }

    // Regular paragraph
    elements.push(React.createElement('p', {
      key: key++,
      style: { margin: '0 0 0.75rem 0', lineHeight: 1.7 },
    }, parseInline(trimmed)))
    i++
  }

  return elements
}
