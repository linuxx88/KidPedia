import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useReaderVoice } from './useReaderVoice'
import { setupSpeechMock } from '../test/mockUtils'

describe('useReaderVoice', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupSpeechMock()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('devrait initialiser avec le mode baguette inactif et aucun texte actif', () => {
    const { result } = renderHook(() => useReaderVoice({ language: 'fr' }))

    expect(result.current.isBaguetteMode).toBe(false)
    expect(result.current.activeTextId).toBeNull()
    expect(result.current.highlightIndex).toBe(-1)
    expect(result.current.highlightLength).toBe(0)
  })

  it('devrait basculer le mode baguette lors du toggle', () => {
    const { result } = renderHook(() => useReaderVoice({ language: 'fr' }))

    act(() => {
      result.current.toggleBaguetteMode()
    })
    expect(result.current.isBaguetteMode).toBe(true)

    act(() => {
      result.current.toggleBaguetteMode()
    })
    expect(result.current.isBaguetteMode).toBe(false)
  })

  it('devrait configurer correctement SpeechSynthesisUtterance et appeler speak', () => {
    const { result } = renderHook(() => useReaderVoice({ language: 'fr' }))

    act(() => {
      result.current.speak('Le Soleil est une étoile.', 'description')
      vi.advanceTimersByTime(250)
    })

    expect(window.speechSynthesis.speak).toHaveBeenCalled()
    
    // Récupérer l'instance d'utterance passée à speak
    const mockUtterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]
    expect(mockUtterance.text).toBe('Le Soleil est une étoile.')
    expect(mockUtterance.lang).toBe('fr-FR')
    expect(mockUtterance.rate).toBe(0.85) // Doit être plus lent
  })

  it('devrait gérer la surbrillance lors des événements onboundary', () => {
    const { result } = renderHook(() => useReaderVoice({ language: 'fr' }))

    act(() => {
      result.current.speak('Soleil', 'description')
      vi.advanceTimersByTime(250)
    })

    const mockUtterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]

    // Simuler le démarrage du discours
    if (mockUtterance.onstart) {
      act(() => {
        mockUtterance.onstart!(new Event('start') as unknown as SpeechSynthesisEvent)
      })
    }
    expect(result.current.activeTextId).toBe('description')

    // Simuler un événement boundary (mot)
    if (mockUtterance.onboundary) {
      const boundaryEvent = {
        name: 'word',
        charIndex: 0,
        charLength: 6,
      } as unknown as SpeechSynthesisEvent

      act(() => {
        mockUtterance.onboundary!(boundaryEvent)
      })
    }

    expect(result.current.highlightIndex).toBe(0)
    expect(result.current.highlightLength).toBe(6)

    // Simuler la fin du discours
    if (mockUtterance.onend) {
      act(() => {
        mockUtterance.onend!(new Event('end') as unknown as SpeechSynthesisEvent)
      })
    }
    expect(result.current.activeTextId).toBeNull()
    expect(result.current.highlightIndex).toBe(-1)
  })

  it('devrait calculer la longueur du mot en fallback si charLength est absent', () => {
    const { result } = renderHook(() => useReaderVoice({ language: 'fr' }))

    act(() => {
      result.current.speak('Terre bleue', 'description')
      vi.advanceTimersByTime(250)
    })

    const mockUtterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]

    if (mockUtterance.onboundary) {
      const boundaryEvent = {
        name: 'word',
        charIndex: 0,
        charLength: undefined, // Pas supporté par le navigateur
      } as unknown as SpeechSynthesisEvent

      act(() => {
        mockUtterance.onboundary!(boundaryEvent)
      })
    }

    // Le fallback doit détecter "Terre" (longueur = 5)
    expect(result.current.highlightIndex).toBe(0)
    expect(result.current.highlightLength).toBe(5)
  })
})
