import { act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useSettingsStore } from '../store/useSettingsStore'
import { createMockProfile } from '../test/factories'

describe('useSettingsStore (Theme)', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.removeAttribute('data-theme')
    useSettingsStore.getState().reset()
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

  it('should call updateProfile callback when toggling theme', () => {
    const mockUpdateProfile = vi.fn();
    
    act(() => {
      useSettingsStore.getState().toggleTheme(mockUpdateProfile);
    });

    expect(mockUpdateProfile).toHaveBeenCalled();
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
