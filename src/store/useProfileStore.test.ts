import { act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProfileStore, type Profile } from './useProfileStore'
import { useSettingsStore } from './useSettingsStore'
import { useProgressionStore } from './useProgressionStore'
import { useCompanionStore } from './useCompanionStore'
import { createMockProfile } from '../test/factories'

describe('useProfileStore (Declarative Orchestration)', () => {
  beforeEach(() => {
    localStorage.clear()
    useProfileStore.getState().reset()
    useSettingsStore.getState().reset()
    useProgressionStore.getState().reset()
    useCompanionStore.getState().reset()
    vi.clearAllMocks()
  })

  it('devrait notifier les stores dépendants lors de l\'ajout d\'un profil', async () => {
    const syncSettingsSpy = vi.spyOn(useSettingsStore.getState(), 'syncWithProfile')
    const syncProgressionSpy = vi.spyOn(useProgressionStore.getState(), 'syncWithProfile')

    let profile: Profile | null = null;
    act(() => {
      profile = useProfileStore.getState().addProfile('Alice', '👧', 'girl')
    })

    if (!profile) throw new Error('Profile should have been created')

    expect(syncSettingsSpy).toHaveBeenCalledWith(profile)
    expect(syncProgressionSpy).toHaveBeenCalledWith((profile as Profile).id)
  })

  it('devrait notifier les stores dépendants lors de la sélection d\'un profil', () => {
    const mockProfile = createMockProfile({ id: 'target-id', name: 'Alice' })
    
    // On injecte le profil manuellement pour tester la sélection
    useProfileStore.setState({ profiles: [mockProfile] })

    const syncSettingsSpy = vi.spyOn(useSettingsStore.getState(), 'syncWithProfile')
    const syncProgressionSpy = vi.spyOn(useProgressionStore.getState(), 'syncWithProfile')

    act(() => {
      useProfileStore.getState().selectProfile('target-id')
    })

    expect(syncSettingsSpy).toHaveBeenCalledWith(mockProfile)
    expect(syncProgressionSpy).toHaveBeenCalledWith('target-id')
  })

  it('devrait générer un UUID valide même si crypto.randomUUID est indéfini', () => {
    const originalRandomUUID = crypto.randomUUID;
    try {
      // @ts-expect-error - temporairement indéfini pour tester le fallback
      crypto.randomUUID = undefined;

      let profile: Profile | null = null;
      act(() => {
        profile = useProfileStore.getState().addProfile('Bob', '👦', 'boy');
      });

      expect(profile).not.toBeNull();
      expect(profile!.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    } finally {
      crypto.randomUUID = originalRandomUUID;
    }
  });

  it('devrait appeler deleteProfileProgression lors de la suppression d\'un profil', () => {
    const deleteProgressionSpy = vi.spyOn(useProgressionStore.getState(), 'deleteProfileProgression')

    let profileId = ''
    act(() => {
      const p = useProfileStore.getState().addProfile('Alice', '👧', 'girl')
      profileId = p.id
    })

    act(() => {
      useProfileStore.getState().deleteProfile(profileId)
    })

    expect(deleteProgressionSpy).toHaveBeenCalledWith(profileId)
  })

  it('devrait appeler deleteProfileCompanionData lors de la suppression d\'un profil', () => {
    const deleteCompanionSpy = vi.spyOn(useCompanionStore.getState(), 'deleteProfileCompanionData')

    let profileId = ''
    act(() => {
      const p = useProfileStore.getState().addProfile('Alice', '👧', 'girl')
      profileId = p.id
    })

    act(() => {
      useProfileStore.getState().deleteProfile(profileId)
    })

    expect(deleteCompanionSpy).toHaveBeenCalledWith(profileId)
  })
})
