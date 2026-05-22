import { screen } from '@testing-library/react'
import { render, resetAllStores } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TopicPage } from './index'
import { isSpoiler } from './index'
import { setupSpeechMock, setupAudioMock } from '../../test/mockUtils'
import { useProgressionStore } from '../../store/useProgressionStore'

// Mock react-router-dom to set custom useParams
const mockParams = { topicId: 'soleil' }
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => mockParams,
  }
})

describe('TopicPage - Anti-spoiler Security', () => {
  const mockGoHome = vi.fn()

  beforeEach(() => {
    resetAllStores()
    vi.clearAllMocks()
    setupSpeechMock()
    setupAudioMock()
    
    // Set active profile
    useProgressionStore.getState().syncWithProfile('test-profile')
  })

  describe('isSpoiler Unit Tests', () => {
    const sampleQuiz = {
      question: { fr: "Question", en: "Question" },
      options: {
        fr: ['100', '1 000', '1 million'],
        en: ['100', '1,000', '1 million'],
      },
      correctAnswer: 2, // '1 million'
    }

    it('returns true when the fun fact directly contains the correct option', () => {
      const spoilerFunFact = {
        fr: "Il y a 1 million de kilomètres.",
        en: "There is 1 million kilometers.",
      }
      expect(isSpoiler(spoilerFunFact, sampleQuiz)).toBe(true)
    })

    it('returns false for short option values <= 3 chars to avoid false positives', () => {
      const shortQuiz = {
        question: { fr: "Est-ce vrai ?", en: "Is it true?" },
        options: {
          fr: ['Oui', 'Non'],
          en: ['Yes', 'No'],
        },
        correctAnswer: 0, // 'Oui'
      }
      const fact = {
        fr: "Oui, la Terre est ronde !",
        en: "Yes, the Earth is round!",
      }
      expect(isSpoiler(fact, shortQuiz)).toBe(false)
    })

    it('returns true when correct answer contains a number >= 2 digits and that number is in the trivia', () => {
      const numericQuiz = {
        question: { fr: "Quelle vitesse ?", en: "Which speed?" },
        options: {
          fr: ['10 km/h', '1600 km/h'],
          en: ['10 km/h', '1600 km/h'],
        },
        correctAnswer: 1, // '1600 km/h'
      }
      const fact = {
        fr: "La rotation est rapide, environ 1600 km/h à l'équateur.",
        en: "The rotation is fast, around 1600 km/h at the equator.",
      }
      expect(isSpoiler(fact, numericQuiz)).toBe(true)
    })

    it('returns false when no overlap exists', () => {
      const safeFunFact = {
        fr: "Le Soleil brille fort.",
        en: "The Sun shines brightly.",
      }
      expect(isSpoiler(safeFunFact, sampleQuiz)).toBe(false)
    })
  })

  describe('TopicPage Integration', () => {
    it('filters out the spoiler fun fact when the quiz that contains its answer is active', async () => {
      // Mock Math.random to return 0.5.
      // 1. selectedQuizIndex = Math.floor(0.5 * 3) = 1 (Quiz: "Combien de Terres...")
      // 2. funFactIndex selection from 2 non-spoiler items
      // 3. descriptionIndex selection from 3 items
      const mockMath = vi.spyOn(Math, 'random').mockReturnValue(0.5)

      render(<TopicPage handleGoHome={mockGoHome} />)

      // When quiz index is 1, the question "Combien de Terres..." should be displayed.
      expect(await screen.findByText(/Combien de Terres/i)).toBeInTheDocument()

      // The correct answer to this quiz is "1 million".
      // The spoiler fun fact is "On pourrait mettre 1 million de Terres à l'intérieur du Soleil !".
      // Since it is a spoiler, it MUST have been filtered out.
      // Therefore, the text of that fun fact should NOT be present.
      expect(screen.queryByText(/mettre 1 million de Terres/i)).not.toBeInTheDocument()

      mockMath.mockRestore()
    })
  })
})
