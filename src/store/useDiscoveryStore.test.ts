import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useDiscoveryStore } from './useDiscoveryStore'
import { useSettingsStore } from './useSettingsStore'
import { locales } from '../locales'

describe('useDiscoveryStore', () => {
  beforeEach(() => {
    useDiscoveryStore.getState().reset()
    useSettingsStore.setState({ language: 'fr', labels: locales['fr'] })
  })

  it('devrait initialiser avec une recherche vide', () => {
    const { result } = renderHook(() => useDiscoveryStore())
    expect(result.current.search).toBe('')
  })

  it('devrait mettre à jour la recherche et les groupes', () => {
    const { result } = renderHook(() => useDiscoveryStore())
    
    act(() => {
      result.current.setSearch('Lion')
    })

    expect(result.current.search).toBe('Lion')
    
    // Vérifier qu'on a bien un groupe "animaux" (le Lion existe dans les data)
    const groups = result.current.groupedTopics
    expect(Object.keys(groups).length).toBeGreaterThan(0)
    expect(groups['animaux']).toBeDefined()
  })

  it('devrait réinitialiser la recherche', () => {
    const { result } = renderHook(() => useDiscoveryStore())
    
    act(() => {
      result.current.setSearch('Dinos')
      result.current.resetSearch()
    })

    expect(result.current.search).toBe('')
  })

  it('devrait initialiser avec les catégories fermées', () => {
    const { result } = renderHook(() => useDiscoveryStore())
    expect(result.current.expandedCategories).toEqual({})
  })

  it('devrait basculer l\'état d\'expansion d\'une catégorie', () => {
    const { result } = renderHook(() => useDiscoveryStore())
    
    act(() => {
      result.current.toggleCategoryExpand('animaux')
    })
    expect(result.current.expandedCategories['animaux']).toBe(true)

    act(() => {
      result.current.toggleCategoryExpand('animaux')
    })
    expect(result.current.expandedCategories['animaux']).toBe(false)
  })

  it('devrait forcer l\'état d\'expansion d\'une catégorie', () => {
    const { result } = renderHook(() => useDiscoveryStore())
    
    act(() => {
      result.current.setCategoryExpanded('espace', true)
    })
    expect(result.current.expandedCategories['espace']).toBe(true)

    act(() => {
      result.current.setCategoryExpanded('espace', true)
    })
    expect(result.current.expandedCategories['espace']).toBe(true)

    act(() => {
      result.current.setCategoryExpanded('espace', false)
    })
    expect(result.current.expandedCategories['espace']).toBe(false)
  })

  it('devrait réinitialiser l\'état d\'expansion des catégories lors du reset', () => {
    const { result } = renderHook(() => useDiscoveryStore())
    
    act(() => {
      result.current.toggleCategoryExpand('dinos')
      result.current.reset()
    })
    expect(result.current.expandedCategories).toEqual({})
  })
})
