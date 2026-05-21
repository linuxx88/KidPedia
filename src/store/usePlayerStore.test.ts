import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePlayerStore } from './usePlayerStore'
import { useProfileStore, type ProfileState, type Profile } from './useProfileStore'
import { useProgressionStore, type ProgressionState } from './useProgressionStore'

// Mock des stores pour tester le sélecteur isolément
vi.mock('./useProfileStore', () => ({
  useProfileStore: vi.fn(),
}))

vi.mock('./useProgressionStore', () => ({
  useProgressionStore: vi.fn(),
}))

describe('usePlayerStore (Selector Hook)', () => {
  const mockProfile: Profile = {
    id: '1',
    name: 'Alice',
    avatar: '👧',
    gender: 'girl',
    theme: 'light',
    language: 'fr'
  }

  const mockProgression = {
    badges: [{ id: 'lion', medal: 'gold' as const }],
    totalXP: 1250,
    currentRankId: 'explorer'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('devrait retourner les données agrégées correctement', () => {
    // Mock des retours de stores
    vi.mocked(useProfileStore).mockImplementation((selector) => 
      selector({ activeProfile: mockProfile } as unknown as ProfileState)
    )
    vi.mocked(useProgressionStore).mockImplementation((selector) => {
      const state = {
        activeProfileId: '1',
        progressions: { '1': mockProgression }
      }
      return selector(state as unknown as ProgressionState)
    })

    const { result } = renderHook(() => usePlayerStore())

    expect(result.current.playerName).toBe('Alice')
    expect(result.current.avatar).toBe('👧')
    expect(result.current.xp).toBe(1250)
    expect(result.current.badges).toEqual([{ id: 'lion', medal: 'gold' }])
  })

  it('devrait retourner des valeurs par défaut si aucun profil n\'est actif', () => {
    vi.mocked(useProfileStore).mockImplementation((selector) => 
      selector({ activeProfile: null } as unknown as ProfileState)
    )
    vi.mocked(useProgressionStore).mockImplementation((selector) => {
      const state = {
        activeProfileId: null,
        progressions: {}
      }
      return selector(state as unknown as ProgressionState)
    })

    const { result } = renderHook(() => usePlayerStore())

    expect(result.current.playerName).toBe('Explorateur')
    expect(result.current.avatar).toBe('🦁')
    expect(result.current.xp).toBe(0)
    expect(result.current.badges).toEqual([])
  })
})
