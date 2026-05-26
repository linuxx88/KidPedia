import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useStoryteller } from './useStoryteller'
import { setupSpeechMock } from '../test/mockUtils'
import { useSettingsStore } from '../store/useSettingsStore'

describe('useStoryteller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupSpeechMock()
    
    // Configurer getVoices pour retourner des voix locales et non locales
    vi.mocked(window.speechSynthesis.getVoices).mockReturnValue([
      { lang: 'fr-FR', name: 'Voix FR Locale', localService: true, voiceURI: 'voix-fr-local' } as unknown as SpeechSynthesisVoice,
      { lang: 'en-US', name: 'Voix EN Locale', localService: true, voiceURI: 'voix-en-local' } as unknown as SpeechSynthesisVoice,
      { lang: 'fr-FR', name: 'Voix FR Cloud', localService: false, voiceURI: 'voix-fr-cloud' } as unknown as SpeechSynthesisVoice,
    ])

    // Ajouter pause et resume car non mockés par setupSpeechMock
    window.speechSynthesis.pause = vi.fn()
    window.speechSynthesis.resume = vi.fn()
    
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('devrait initialiser avec isSpeaking a false', () => {
    const { result } = renderHook(() => useStoryteller())
    expect(result.current.isSpeaking).toBe(false)
  })

  it('devrait configurer l utterance avec la langue FR si le store est en FR', () => {
    act(() => {
      useSettingsStore.setState({ language: 'fr' })
    })

    const { result } = renderHook(() => useStoryteller())

    act(() => {
      result.current.speak('Bonjour les enfants')
      vi.advanceTimersByTime(250)
    })

    expect(window.speechSynthesis.speak).toHaveBeenCalled()
    const utterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]
    expect(utterance.text).toBe('Bonjour les enfants')
    expect(utterance.lang).toBe('fr-FR')
    expect(utterance.voice?.name).toBe('Voix FR Locale')
    expect(utterance.voice?.localService).toBe(true)
  })

  it('devrait configurer l utterance avec la langue EN si le store est en EN', () => {
    act(() => {
      useSettingsStore.setState({ language: 'en' })
    })

    const { result } = renderHook(() => useStoryteller())

    act(() => {
      result.current.speak('Hello children')
      vi.advanceTimersByTime(250)
    })

    expect(window.speechSynthesis.speak).toHaveBeenCalled()
    const utterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]
    expect(utterance.text).toBe('Hello children')
    expect(utterance.lang).toBe('en-US')
    expect(utterance.voice?.name).toBe('Voix EN Locale')
    expect(utterance.voice?.localService).toBe(true)
  })

  it('devrait gerer les evenements de cycle de vie et mettre a jour isSpeaking', () => {
    act(() => {
      useSettingsStore.setState({ language: 'fr' })
    })

    const { result } = renderHook(() => useStoryteller())

    act(() => {
      result.current.speak('Test de lecture')
      vi.advanceTimersByTime(250)
    })

    const utterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]

    // start
    act(() => {
      if (utterance.onstart) {
        utterance.onstart(new Event('start') as SpeechSynthesisEvent)
      }
    })
    expect(result.current.isSpeaking).toBe(true)

    // pause
    act(() => {
      if (utterance.onpause) {
        utterance.onpause(new Event('pause') as SpeechSynthesisEvent)
      }
    })
    expect(result.current.isSpeaking).toBe(false)

    // resume
    act(() => {
      if (utterance.onresume) {
        utterance.onresume(new Event('resume') as SpeechSynthesisEvent)
      }
    })
    expect(result.current.isSpeaking).toBe(true)

    // end
    act(() => {
      if (utterance.onend) {
        utterance.onend(new Event('end') as SpeechSynthesisEvent)
      }
    })
    expect(result.current.isSpeaking).toBe(false)
  })

  it('devrait arreter la lecture lors de l appel a stop', () => {
    const { result } = renderHook(() => useStoryteller())

    act(() => {
      result.current.speak('Lecture en cours')
      vi.advanceTimersByTime(250)
    })

    act(() => {
      result.current.stop()
    })

    expect(window.speechSynthesis.cancel).toHaveBeenCalled()
    expect(result.current.isSpeaking).toBe(false)
  })

  it('devrait pauser la lecture lors de l appel a pause', () => {
    const { result } = renderHook(() => useStoryteller())

    act(() => {
      result.current.speak('Lecture en cours')
      vi.advanceTimersByTime(250)
    })

    act(() => {
      result.current.pause()
    })

    expect(window.speechSynthesis.pause).toHaveBeenCalled()
  })

  it('devrait gerer silencieusement si la synthese vocale n est pas supportee', () => {
    // Supprimer temporairement speechSynthesis du window
    const originalSpeechSynthesis = window.speechSynthesis
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.speechSynthesis

    const { result } = renderHook(() => useStoryteller())

    act(() => {
      expect(() => result.current.speak('Test')).not.toThrow()
    })

    // Restaurer
    window.speechSynthesis = originalSpeechSynthesis
  })

  it('devrait gerer silencieusement si aucune voix locale n est disponible', () => {
    // Configurer getVoices pour ne retourner que des voix cloud
    vi.mocked(window.speechSynthesis.getVoices).mockReturnValue([
      { lang: 'fr-FR', name: 'Voix FR Cloud', localService: false } as unknown as SpeechSynthesisVoice,
    ])

    const { result } = renderHook(() => useStoryteller())

    act(() => {
      result.current.speak('Test de lecture')
      vi.advanceTimersByTime(250)
    })

    // Ne devrait pas appeler speak car aucune voix locale n'est disponible
    expect(window.speechSynthesis.speak).not.toHaveBeenCalled()
  })
})
