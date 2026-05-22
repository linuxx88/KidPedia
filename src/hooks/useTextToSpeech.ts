import { useState, useEffect, useCallback } from 'react'

export interface UseTextToSpeechProps {
  language: 'fr' | 'en'
  onError?: (errorKey: 'speechNotSupported' | 'speechSystem') => void
}

export function useTextToSpeech({ language, onError }: UseTextToSpeechProps) {
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isVoicesReady, setIsVoicesReady] = useState(false)

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      return
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        setVoices(availableVoices)
        setIsVoicesReady(true)
      }
    }

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
    loadVoices()

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [])

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setActiveSpeechId(null)
  }, [])

  const speak = useCallback(
    (text: string, id: string) => {
      if (!('speechSynthesis' in window)) {
        if (onError) onError('speechNotSupported')
        return
      }

      window.speechSynthesis.cancel()

      if (id === activeSpeechId) {
        // Toggle behavior: clicking the active speaker stops it
        setActiveSpeechId(null)
        return
      }

      let currentVoices = voices
      if (currentVoices.length === 0) {
        currentVoices = window.speechSynthesis.getVoices()
      }

      const utterance = new SpeechSynthesisUtterance(text)
      const voiceLang = language === 'fr' ? 'fr' : 'en'
      const voice = currentVoices.find((v) =>
        v.lang.toLowerCase().includes(voiceLang)
      )
      if (voice) {
        utterance.voice = voice
      }

      utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
      utterance.rate = 0.9

      utterance.onstart = () => {
        setActiveSpeechId(id)
      }

      utterance.onend = () => {
        setActiveSpeechId((current) => (current === id ? null : current))
      }

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          console.error('SpeechSynthesis error:', e)
          if (onError) onError('speechSystem')
        }
        setActiveSpeechId((current) => (current === id ? null : current))
      }

      window.speechSynthesis.speak(utterance)
    },
    [voices, language, activeSpeechId, onError]
  )

  return {
    activeSpeechId,
    isVoicesReady,
    speak,
    stop,
  }
}
