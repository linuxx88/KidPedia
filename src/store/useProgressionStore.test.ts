import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProgressionStore } from './useProgressionStore'

describe('useProgressionStore', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    // Reset store state
    act(() => {
      useProgressionStore.getState().reset()
    });
  })

  it('devrait initialiser avec une map vide et aucun profil actif', () => {
    const { result } = renderHook(() => useProgressionStore())
    expect(result.current.progressions).toEqual({})
    expect(result.current.activeProfileId).toBeNull()
    expect(result.current.getBadges()).toEqual([])
    expect(result.current.getTotalXP()).toBe(0)
  })

  it('devrait initialiser un profil lors de la synchronisation', () => {
    const { result } = renderHook(() => useProgressionStore())
    
    act(() => {
      result.current.syncWithProfile('alice')
    })

    expect(result.current.activeProfileId).toBe('alice')
    expect(result.current.getTotalXP()).toBe(0)
    expect(result.current.getBadges()).toEqual([])
  })

  it('devrait ajouter un badge et calculer l\'XP pour le profil actif', () => {
    const { result } = renderHook(() => useProgressionStore())

    act(() => {
      result.current.syncWithProfile('alice')
    })

    act(() => {
      result.current.addBadge('lion', 'gold')
    })

    expect(result.current.getBadges()).toContainEqual({ id: 'lion', medal: 'gold' })
    expect(result.current.getTotalXP()).toBe(1000)
    expect(result.current.getCurrentRankId()).toBe('explorer')
  })

  it('devrait gérer l\'upgrade de médaille et l\'évolution du rang', () => {
    const { result } = renderHook(() => useProgressionStore())

    act(() => {
      result.current.syncWithProfile('alice')
    })

    // Bronze (250 XP) -> Rang Apprentice
    act(() => {
      result.current.addBadge('lion', 'bronze')
    })
    expect(result.current.getTotalXP()).toBe(250)
    expect(result.current.getCurrentRankId()).toBe('apprentice')

    // Or (1000 XP) -> Rang Explorer
    act(() => {
      result.current.addBadge('lion', 'gold')
    })
    expect(result.current.getBadges()).toContainEqual({ id: 'lion', medal: 'gold' })
    expect(result.current.getTotalXP()).toBe(1000)
    expect(result.current.getCurrentRankId()).toBe('explorer')
  })

  it('devrait isoler la progression entre deux profils', () => {
    const { result } = renderHook(() => useProgressionStore())

    // Alice gagne de l'XP
    act(() => { result.current.syncWithProfile('alice') })
    act(() => { result.current.addBadge('lion', 'gold') })
    expect(result.current.getTotalXP()).toBe(1000)

    // On switch sur Bob (qui est vide)
    act(() => { result.current.syncWithProfile('bob') })
    expect(result.current.getTotalXP()).toBe(0)
    expect(result.current.getBadges()).toEqual([])

    // Retour sur Alice
    act(() => { result.current.syncWithProfile('alice') })
    expect(result.current.getTotalXP()).toBe(1000)
  })

  it('devrait gagner de l\'XP via l\'action générique addXP', () => {
    const { result } = renderHook(() => useProgressionStore())
    
    act(() => { result.current.syncWithProfile('alice') })
    
    act(() => {
      result.current.addXP(100)
    })

    expect(result.current.getTotalXP()).toBe(100)
    expect(result.current.getCurrentRankId()).toBe('apprentice')

    act(() => {
      result.current.addXP(1000) // Total 1100
    })
    expect(result.current.getCurrentRankId()).toBe('explorer')
  })

  it('devrait être idempotent lors de la synchronisation (ne pas re-rendre si identique)', () => {
    const { result } = renderHook(() => useProgressionStore())

    // 1. Première synchro
    act(() => {
      result.current.syncWithProfile('alice')
    })
    
    // On s'abonne pour surveiller les changements
    const listener = vi.fn()
    const unsub = useProgressionStore.subscribe(listener)

    // 2. Deuxième synchro avec le même ID
    act(() => {
      result.current.syncWithProfile('alice')
    })

    expect(listener).not.toHaveBeenCalled()
    unsub()
  })

  it('devrait supprimer la progression d\'un profil lors de l\'appel à deleteProfileProgression', () => {
    const { result } = renderHook(() => useProgressionStore())

    // 1. Initialise la progression de alice et bob
    act(() => { result.current.syncWithProfile('alice') })
    act(() => { result.current.addBadge('lion', 'gold') })
    
    act(() => { result.current.syncWithProfile('bob') })
    act(() => { result.current.addBadge('soleil', 'silver') })

    expect(result.current.progressions['alice']).toBeDefined()
    expect(result.current.progressions['bob']).toBeDefined()

    // 2. Supprime la progression de alice
    act(() => {
      result.current.deleteProfileProgression('alice')
    })

    expect(result.current.progressions['alice']).toBeUndefined()
    expect(result.current.progressions['bob']).toBeDefined()
  })

  it('devrait réinitialiser activeProfileId à null si le profil actif est supprimé via deleteProfileProgression', () => {
    const { result } = renderHook(() => useProgressionStore())

    act(() => { result.current.syncWithProfile('alice') })
    expect(result.current.activeProfileId).toBe('alice')

    act(() => {
      result.current.deleteProfileProgression('alice')
    })

    expect(result.current.activeProfileId).toBeNull()
  })
})
