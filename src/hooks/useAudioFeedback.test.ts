import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAudioFeedback } from './useAudioFeedback';
import { useSettingsStore } from '../store/useSettingsStore';

// Stub Audio globally for these tests
const playMock = vi.fn().mockResolvedValue(undefined);
const pauseMock = vi.fn();

class MockAudio {
  src = '';
  volume = 1;
  currentTime = 0;
  play = playMock;
  pause = pauseMock;
}

describe('useAudioFeedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('Audio', MockAudio);
    
    // Réinitialiser le store Zustand
    act(() => {
      useSettingsStore.getState().reset();
    });
  });

  it('ne devrait pas jouer de son si isMuted est actif', () => {
    act(() => {
      useSettingsStore.getState().toggleMute(); // passe à true
    });

    const { result } = renderHook(() => useAudioFeedback());

    act(() => {
      result.current.playSound('/src/assets/audio/Elephant.m4a');
    });

    expect(playMock).not.toHaveBeenCalled();
  });

  it('devrait configurer et jouer le son si isMuted est inactif', () => {
    const { result } = renderHook(() => useAudioFeedback());

    act(() => {
      result.current.playSound('/src/assets/audio/Elephant.m4a');
    });

    expect(playMock).toHaveBeenCalled();
  });

  it('devrait réagir à la mise en sourdine globale et arrêter le son en cours instantanément', () => {
    const { result } = renderHook(() => useAudioFeedback());

    // Lance la lecture d'un son
    act(() => {
      result.current.playSound('/src/assets/audio/Elephant.m4a');
    });
    expect(playMock).toHaveBeenCalled();

    // Activer la sourdine
    act(() => {
      useSettingsStore.getState().toggleMute(); // passe à true
    });

    // L'abonnement doit avoir déclenché pause()
    expect(pauseMock).toHaveBeenCalled();
  });

  it('devrait interrompre le son précédent si un nouveau son est lancé', () => {
    const { result } = renderHook(() => useAudioFeedback());

    // Lance un premier son
    act(() => {
      result.current.playSound('/src/assets/audio/Elephant.m4a');
    });

    // Lance un deuxième son
    act(() => {
      result.current.playSound('/src/assets/audio/Lion.m4a');
    });

    // Devrait avoir appelé pause() sur l'instance pour arrêter le premier son
    expect(pauseMock).toHaveBeenCalled();
    expect(playMock).toHaveBeenCalledTimes(2);
  });
});
