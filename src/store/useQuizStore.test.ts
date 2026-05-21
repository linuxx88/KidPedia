import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useQuizStore } from './useQuizStore'
import { useSettingsStore } from './useSettingsStore'
import { LABELS } from '../utils/labels'
import { type Labels } from '../locales/types'

// Mock des dépendances
vi.mock('../data/topics', () => ({
  encyclopedia: [
    {
      id: 'lion',
      title: { fr: 'Le Lion', en: 'The Lion' },
      quiz: {
        correctAnswer: 1, // B
      }
    }
  ]
}))

describe('useQuizStore', () => {
  beforeEach(() => {
    useQuizStore.getState().resetQuiz()
    useSettingsStore.setState({ labels: LABELS as unknown as Labels, gender: 'boy' })
    vi.clearAllMocks()
  })

  it('devrait initialiser avec un état neutre', () => {
    const { result } = renderHook(() => useQuizStore())
    expect(result.current.quizResult).toBeNull()
    expect(result.current.retryMsg).toBeNull()
  })

  it('devrait démarrer un quiz pour un sujet donné', () => {
    const { result } = renderHook(() => useQuizStore())
    
    act(() => {
      result.current.startQuiz('lion')
    })

    expect(result.current.activeTopicId).toBe('lion')
  })

  it('devrait valider une bonne réponse et retourner un succès', () => {
    const { result } = renderHook(() => useQuizStore())
    
    act(() => {
      result.current.startQuiz('lion')
    })

    let response: { success: boolean, medal?: string };
    act(() => {
      response = result.current.submitAnswer(1) // Bonne réponse
    })

    expect(response!.success).toBe(true)
    expect(result.current.quizResult?.medal).toBe('gold')
  })

  it('devrait gérer une mauvaise réponse et proposer de réessayer', () => {
    const { result } = renderHook(() => useQuizStore())
    
    act(() => {
      result.current.startQuiz('lion')
    })

    let response: { success: boolean, medal?: string };
    act(() => {
      response = result.current.submitAnswer(0) // Mauvaise réponse
    })

    expect(response!.success).toBe(false)
    expect(result.current.retryMsg).not.toBeNull()
    expect(result.current.quizResult).toBeNull()
    expect(result.current.attempts).toBe(2)
    // On vérifie que l'indice est bien récupéré (lion a un indice dans QUIZZES réel, 
    // mais ici on mock encyclopedia. Attention: useQuizStore utilise QUIZZES de ../data/quizzes)
    // L'indice devrait être présent si défini dans QUIZZES
    expect(result.current.activeHint).not.toBeNull()
  })

  it('devrait donner une médaille d\'argent au deuxième essai', () => {
    const { result } = renderHook(() => useQuizStore())
    
    act(() => {
      result.current.startQuiz('lion')
    })

    act(() => {
      result.current.submitAnswer(0) // 1er essai raté
    })

    act(() => {
      result.current.submitAnswer(1) // 2ème essai réussi
    })

    expect(result.current.quizResult?.medal).toBe('silver')
  })

  it('devrait donner une médaille de bronze au troisième essai et plus', () => {
    const { result } = renderHook(() => useQuizStore())
    
    act(() => {
      result.current.startQuiz('lion')
    })

    act(() => {
      result.current.submitAnswer(0) // 1er raté
    })
    act(() => {
      result.current.submitAnswer(0) // 2ème raté
    })
    act(() => {
      result.current.submitAnswer(1) // 3ème réussi
    })

    expect(result.current.quizResult?.medal).toBe('bronze')
  })
})
