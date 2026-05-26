import { useState, useEffect, useCallback, useRef } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'

interface CustomWindow extends Window {
  activeStorytellerUtterance?: SpeechSynthesisUtterance
}

export function useStoryteller() {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const language = useSettingsStore((state) => state.language)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const speakTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stop = useCallback(() => {
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current)
      speakTimeoutRef.current = null
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    utteranceRef.current = null
    if (typeof window !== 'undefined') {
      delete (window as unknown as CustomWindow).activeStorytellerUtterance
    }
  }, [])

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause()
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return
      }

      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current)
      }

      window.speechSynthesis.cancel()

      // 100% offline vocal reading: only allow local voices (localService === true)
      const availableVoices = window.speechSynthesis.getVoices()
      const localVoices = availableVoices.filter((v) => v.localService === true)

      if (localVoices.length === 0) {
        // Manage silently when devoid of local voices
        return
      }

      const voiceLang = language === 'fr' ? 'fr' : 'en'
      const langVoices = localVoices.filter((v) =>
        v.lang.toLowerCase().includes(voiceLang)
      )

      if (langVoices.length === 0) {
        // Manage silently when devoid of local voices in target language
        return
      }

      // Priority search for sweet/natural/soft voices as they are child friendly
      let selectedVoice = langVoices.find((v) => {
        const name = v.name.toLowerCase()
        return (
          name.includes('natural') ||
          name.includes('soft') ||
          name.includes('doux') ||
          name.includes('sweet') ||
          name.includes('child')
        )
      })

      if (!selectedVoice) {
        selectedVoice = langVoices[0]
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utteranceRef.current = utterance
      utterance.voice = selectedVoice
      utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
      utterance.rate = 0.85 // Slow rate for kids learning

      // Prevent Chrome GC issues
      if (typeof window !== 'undefined') {
        (window as unknown as CustomWindow).activeStorytellerUtterance = utterance
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        utteranceRef.current = null
        if (typeof window !== 'undefined') {
          delete (window as unknown as CustomWindow).activeStorytellerUtterance
        }
      }

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          // Fail silently
        }
        setIsSpeaking(false)
        utteranceRef.current = null
        if (typeof window !== 'undefined') {
          delete (window as unknown as CustomWindow).activeStorytellerUtterance
        }
      }

      utterance.onpause = () => {
        setIsSpeaking(false)
      }

      utterance.onresume = () => {
        setIsSpeaking(true)
      }

      // Delay to avoid async bugs on cancel/speak collision in some browsers
      speakTimeoutRef.current = setTimeout(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.speak(utterance)
        }
        speakTimeoutRef.current = null
      }, 250)
    },
    [language]
  )

  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return {
    speak,
    pause,
    stop,
    isSpeaking,
  }
}
