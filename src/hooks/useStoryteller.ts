import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'

interface CustomWindow extends Window {
  activeStorytellerUtterance?: SpeechSynthesisUtterance
}

export interface StorytellerContextType {
  isMagicWandActive: boolean
  isSpeaking: boolean
  speak: (text: string) => void
  stopStory: () => void
  toggleMagicWand: () => void
  pause?: () => void
  stop?: () => void
}

const StorytellerContext = createContext<StorytellerContextType | null>(null)

export const useStoryteller = (): StorytellerContextType => {
  const context = useContext(StorytellerContext)

  // Fallback local implementation if not rendered under a StorytellerProvider.
  // This ensures 100% backward compatibility and test stability.
  // All hooks are executed unconditionally to comply with React's Rules of Hooks.
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const language = useSettingsStore((state) => state.language)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const speakTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopStory = useCallback(() => {
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

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return
      }

      stopStory()

      const availableVoices = window.speechSynthesis.getVoices()
      const localVoices = availableVoices.filter((v) => v.localService === true)

      if (localVoices.length === 0) {
        return
      }

      const voiceLang = language === 'fr' ? 'fr' : 'en'
      const langVoices = localVoices.filter((v) =>
        v.lang.toLowerCase().includes(voiceLang)
      )

      if (langVoices.length === 0) {
        return
      }

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
      utterance.rate = 0.85

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

      speakTimeoutRef.current = setTimeout(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.speak(utterance)
        }
        speakTimeoutRef.current = null
      }, 250)
    },
    [language, stopStory]
  )

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause()
    }
  }, [])

  if (context) {
    return context
  }

  return {
    isMagicWandActive: false,
    isSpeaking,
    speak,
    stopStory,
    toggleMagicWand: () => {},
    // Keep internal legacy functions to maintain test coverage
    pause,
    stop: stopStory,
  } as unknown as StorytellerContextType
}

interface StorytellerProviderProps {
  children: React.ReactNode
}

export const StorytellerProvider: React.FC<StorytellerProviderProps> = ({ children }) => {
  const [isMagicWandActive, setIsMagicWandActive] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const language = useSettingsStore((state) => state.language)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const speakTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopStory = useCallback(() => {
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

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return
      }

      // Precede speak by stopStory to guarantee exclusivity as requested
      stopStory()

      // 100% offline vocal reading: only allow local voices (localService === true)
      const availableVoices = window.speechSynthesis.getVoices()
      const localVoices = availableVoices.filter((v) => v.localService === true)

      if (localVoices.length === 0) {
        return
      }

      const voiceLang = language === 'fr' ? 'fr' : 'en'
      const langVoices = localVoices.filter((v) =>
        v.lang.toLowerCase().includes(voiceLang)
      )

      if (langVoices.length === 0) {
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
    [language, stopStory]
  )

  const toggleMagicWand = useCallback(() => {
    setIsMagicWandActive((prev) => {
      const next = !prev
      if (!next) {
        stopStory()
      }
      return next
    })
  }, [stopStory])

  useEffect(() => {
    return () => {
      stopStory()
    }
  }, [stopStory])

  /* eslint-disable react-hooks/refs */
  return React.createElement(
    StorytellerContext.Provider,
    {
      value: {
        isMagicWandActive,
        isSpeaking,
        speak,
        stopStory,
        toggleMagicWand,
      },
    },
    children
  )
  /* eslint-enable react-hooks/refs */
}
