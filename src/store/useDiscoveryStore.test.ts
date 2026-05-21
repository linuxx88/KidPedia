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
})
