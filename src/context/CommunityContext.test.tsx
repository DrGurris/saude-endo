import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

// Mock the API layer
vi.mock('../services/api', () => ({
  isApiAvailable: vi.fn().mockResolvedValue(false),
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  apiPut: vi.fn(),
  apiDelete: vi.fn(),
}))

import { CommunityProvider, useCommunity } from './CommunityContext'

function wrapper({ children }: { children: React.ReactNode }) {
  return <CommunityProvider>{children}</CommunityProvider>
}

describe('CommunityContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('throws when used outside provider', () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      renderHook(() => useCommunity())
    }).toThrow('useCommunity must be used within a CommunityProvider')
    spy.mockRestore()
  })

  it('starts with empty state', () => {
    const { result } = renderHook(() => useCommunity(), { wrapper })
    expect(result.current.threads).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.selectedCategory).toBe('all')
    expect(result.current.sortBy).toBe('recent')
  })

  it('loadThreads populates threads from mock store', async () => {
    const { result } = renderHook(() => useCommunity(), { wrapper })

    await act(async () => {
      await result.current.loadThreads()
    })

    expect(result.current.threads.length).toBeGreaterThanOrEqual(10)
    expect(result.current.isLoading).toBe(false)
  })

  it('loadThread returns a single thread by id', async () => {
    const { result } = renderHook(() => useCommunity(), { wrapper })

    await act(async () => {
      await result.current.loadThreads()
    })

    const id = result.current.threads[0].id
    const thread = await result.current.loadThread(id)
    expect(thread).not.toBeNull()
    expect(thread!.id).toBe(id)
  })

  it('createThread adds thread to state', async () => {
    const { result } = renderHook(() => useCommunity(), { wrapper })

    await act(async () => {
      await result.current.loadThreads()
    })

    const before = result.current.threads.length

    await act(async () => {
      await result.current.createThread(
        'Nuevo tema',
        'Contenido del tema de prueba',
        'pain',
        false,
        'user-1',
        'Test User',
        'user'
      )
    })

    expect(result.current.threads.length).toBe(before + 1)
    expect(result.current.threads[0].title).toBe('Nuevo tema')
  })

  it('setCategory updates selectedCategory', () => {
    const { result } = renderHook(() => useCommunity(), { wrapper })

    act(() => {
      result.current.setCategory('pain')
    })

    expect(result.current.selectedCategory).toBe('pain')
  })

  it('setSortBy updates sort order', () => {
    const { result } = renderHook(() => useCommunity(), { wrapper })

    act(() => {
      result.current.setSortBy('popular')
    })

    expect(result.current.sortBy).toBe('popular')
  })
})
