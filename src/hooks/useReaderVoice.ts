import { useState, useEffect, useCallback, useRef } from 'react'

export interface UseReaderVoiceProps {
  language: 'fr' | 'en'
  onError?: (error: string) => void
}

export function useReaderVoice({ language, onError }: UseReaderVoiceProps) {
  const [isBaguetteMode, setIsBaguetteMode] = useState(false)
  const [activeTextId, setActiveTextId] = useState<string | null>(null)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const [highlightLength, setHighlightLength] = useState<number>(0)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isVoicesReady, setIsVoicesReady] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const speakTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Charger les voix disponibles dans le navigateur
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
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current)
      speakTimeoutRef.current = null
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setActiveTextId(null)
    setHighlightIndex(-1)
    setHighlightLength(0)
    utteranceRef.current = null
  }, [])

  const toggleBaguetteMode = useCallback(() => {
    setIsBaguetteMode((prev) => {
      const next = !prev
      if (!next) {
        stop()
      }
      return next
    })
  }, [stop])

  const speak = useCallback(
    (text: string, id: string) => {
      if (!('speechSynthesis' in window)) {
        if (onError) onError('Speech synthesis not supported')
        return
      }

      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current)
      }

      window.speechSynthesis.cancel()

      if (id === activeTextId) {
        // Clic sur l'élément en cours de lecture : arrêt
        stop()
        return
      }

      let currentVoices = voices
      if (currentVoices.length === 0) {
        currentVoices = window.speechSynthesis.getVoices()
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utteranceRef.current = utterance

      // Sélection fine d'une voix bienveillante et naturelle ("doux", "natural", "google", etc.)
      const voiceLang = language === 'fr' ? 'fr' : 'en'
      const langVoices = currentVoices.filter((v) =>
        v.lang.toLowerCase().includes(voiceLang)
      )

      // Recherche de voix douces ou Google de haute qualité
      let voice = langVoices.find((v) => {
        const name = v.name.toLowerCase()
        return (
          name.includes('natural') ||
          name.includes('google') ||
          name.includes('soft') ||
          name.includes('doux') ||
          name.includes('sweet') ||
          name.includes('child')
        )
      })

      if (!voice && langVoices.length > 0) {
        voice = langVoices[0]
      }

      if (voice) {
        utterance.voice = voice
      }

      utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US'
      utterance.rate = 0.85 // Vitesse ralentie, idéale pour l'apprentissage autonome

      utterance.onstart = () => {
        setActiveTextId(id)
        setHighlightIndex(0)
        setHighlightLength(0)
      }

      utterance.onend = () => {
        setActiveTextId((current) => {
          if (current === id) {
            setHighlightIndex(-1)
            setHighlightLength(0)
            utteranceRef.current = null
            return null
          }
          return current
        })
      }

      utterance.onboundary = (event) => {
        // S'assurer que nous sommes sur une frontière de mot
        if (event.name === 'word') {
          const charIndex = event.charIndex
          let charLength = event.charLength

          // Calculer manuellement la longueur du mot pour les navigateurs non conformes
          if (charLength === undefined || charLength === 0) {
            const remainingText = text.substring(charIndex)
            const match = remainingText.match(/^[\w\dÀ-ÿ]+/u)
            charLength = match ? match[0].length : 1
          }

          setHighlightIndex(charIndex)
          setHighlightLength(charLength)
        }
      }

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          console.error('useReaderVoice speech error:', e)
          if (onError) onError('Speech synthesis error occurred')
        }
        setActiveTextId((current) => {
          if (current === id) {
            setHighlightIndex(-1)
            setHighlightLength(0)
            utteranceRef.current = null
            return null
          }
          return current
        })
      }

      // Délai de 250ms pour contourner le bug asynchrone de Chrome après cancel()
      speakTimeoutRef.current = setTimeout(() => {
        window.speechSynthesis.speak(utterance)
        speakTimeoutRef.current = null
      }, 250)
    },
    [voices, language, activeTextId, stop, onError]
  )

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return {
    isBaguetteMode,
    activeTextId,
    highlightIndex,
    highlightLength,
    isVoicesReady,
    toggleBaguetteMode,
    speak,
    stop,
  }
}
