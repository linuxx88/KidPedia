import { act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSettingsStore } from './useSettingsStore'
import { useProfileStore } from './useProfileStore'
import { createMockProfile } from '../test/factories'

describe('useSettingsStore (Theme)', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.removeAttribute('data-theme')
    useSettingsStore.getState().reset()
    useProfileStore.getState().reset()
  })

  it('should initialize and set a theme on documentElement', () => {
    // getInitialState is called when module is loaded, but we can check if it's active
    // In JSDOM, if it was already set by a previous test, we just want to ensure it's a valid theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(currentTheme);
  })

  it('should toggle theme and update DOM', () => {
    const initialState = useSettingsStore.getState().isDarkMode;
    const expectedTheme = !initialState ? 'dark' : 'light';
    
    act(() => {
      useSettingsStore.getState().toggleTheme();
    });

    const state = useSettingsStore.getState();
    expect(state.isDarkMode).toBe(!initialState);
    expect(document.documentElement.getAttribute('data-theme')).toBe(expectedTheme);
    
    if (expectedTheme === 'dark') {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    } else {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    }
  })

  it('should update the active profile in useProfileStore when settings are toggled (bidirectional sync)', () => {
    act(() => {
      useProfileStore.getState().addProfile('Alice', '👧', 'girl');
    });

    expect(useProfileStore.getState().activeProfile?.theme).toBe('light');

    act(() => {
      useSettingsStore.getState().toggleTheme();
    });

    expect(useProfileStore.getState().activeProfile?.theme).toBe('dark');
  })

  it('should reset settings to default values when syncWithProfile is called with null', () => {
    // Set non-default settings
    act(() => {
      useSettingsStore.setState({
        theme: 'dark',
        isDarkMode: true,
        gender: 'girl',
        language: 'en'
      });
    });

    expect(useSettingsStore.getState().theme).toBe('dark');
    expect(useSettingsStore.getState().gender).toBe('girl');
    expect(useSettingsStore.getState().language).toBe('en');

    // Sync with null
    act(() => {
      useSettingsStore.getState().syncWithProfile(null);
    });

    expect(useSettingsStore.getState().theme).toBe('light');
    expect(useSettingsStore.getState().gender).toBe('boy');
    expect(useSettingsStore.getState().language).toBe('fr');
  })

  it('devrait être idempotent lors de la synchronisation (ne pas re-rendre si identique)', () => {
    const profile = createMockProfile({
      id: '1',
      name: 'Alice',
      theme: 'dark'
    });

    // 1. Première synchro
    act(() => {
      useSettingsStore.getState().syncWithProfile(profile);
    });
    
    // On s'abonne pour surveiller les changements
    const listener = vi.fn();
    const unsub = useSettingsStore.subscribe(listener);

    // 2. Deuxième synchro avec les mêmes données
    act(() => {
      useSettingsStore.getState().syncWithProfile(profile);
    });

    expect(listener).not.toHaveBeenCalled();
    unsub();
  })
})
