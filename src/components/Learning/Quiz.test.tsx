import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { QuizComponent } from './Quiz'
import { fr } from '../../locales/fr'

describe('QuizComponent', () => {
  const mockOnAnswer = vi.fn()
  const defaultProps = {
    question: 'Quelle est la couleur du cheval blanc ?',
    options: ['Blanc', 'Noir', 'Gris'],
    onAnswer: mockOnAnswer,
    result: null,
    gender: 'boy' as const,
    retryMsg: null,
    activeHint: null,
    onReview: vi.fn(),
    labels: fr,
    attempts: 1,
    funFact: "Le cheval blanc est en fait gris clair."
  }

  it("affiche la question et les options quand il n'y a pas de résultat", () => {
    render(<QuizComponent {...defaultProps} />)

    expect(screen.getByText('Quelle est la couleur du cheval blanc ?')).toBeInTheDocument()
    expect(screen.getByText('Blanc')).toBeInTheDocument()
    expect(screen.getByText('Noir')).toBeInTheDocument()
    expect(screen.getByText('Gris')).toBeInTheDocument()
  })

  it("appelle onAnswer avec l'index correct quand on clique sur une option", () => {
    render(<QuizComponent {...defaultProps} />)

    fireEvent.click(screen.getByText('Noir'))
    expect(mockOnAnswer).toHaveBeenCalledWith(1)
  })

  it('affiche le message de réessai si retryMsg est présent', () => {
    render(
      <QuizComponent
        {...defaultProps}
        retryMsg="Presque ! Réessaie encore."
      />,
    )

    expect(screen.getByText('Presque ! Réessaie encore.')).toBeInTheDocument()
  })

  it("affiche l'indice quand activeHint est présent", () => {
    render(
      <QuizComponent
        {...defaultProps}
        activeHint="C'est un indice"
      />,
    )

    expect(screen.getByText(fr.quiz.hintTitle)).toBeInTheDocument()
    expect(screen.getByText("C'est un indice")).toBeInTheDocument()
  })

  it("affiche la médaille d'or et un message de succès", () => {
    render(
      <QuizComponent
        {...defaultProps}
        result={{ medal: 'gold' }}
      />,
    )

    expect(screen.getByText(new RegExp(fr.quiz.winMessage('OR'), 'i'))).toBeInTheDocument()
    expect(screen.getByText('🥇')).toBeInTheDocument()
  })

  it("affiche la médaille d'argent", () => {
    render(
      <QuizComponent
        {...defaultProps}
        result={{ medal: 'silver' }}
      />,
    )

    expect(screen.getByText(new RegExp(fr.quiz.winMessage('ARGENT'), 'i'))).toBeInTheDocument()
    expect(screen.getByText('🥈')).toBeInTheDocument()
  })

  it('affiche la médaille de bronze', () => {
    render(
      <QuizComponent
        {...defaultProps}
        result={{ medal: 'bronze' }}
      />,
    )

    expect(screen.getByText(new RegExp(fr.quiz.winMessage('BRONZE'), 'i'))).toBeInTheDocument()
    expect(screen.getByText('🥉')).toBeInTheDocument()
  })
})
