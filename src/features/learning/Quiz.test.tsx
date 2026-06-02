import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QuizComponent } from './Quiz'
import { fr } from '../../locales/fr'
import { useStoryteller } from '../../hooks/useStoryteller'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

describe('QuizComponent', () => {
  const mockSpeak = vi.fn()
  const mockStopStory = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: false,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: vi.fn(),
    })
  })

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

  it("appelle onAnswer avec l'index correct quand on clique sur une option en mode normal", () => {
    render(<QuizComponent {...defaultProps} />)

    fireEvent.click(screen.getByText('Noir'))
    expect(mockOnAnswer).toHaveBeenCalledWith(1)
  })

  it("ne déclenche pas onAnswer mais déclenche speak quand on clique sur une option en mode MagicWand", () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: vi.fn(),
    })

    render(<QuizComponent {...defaultProps} />)

    fireEvent.click(screen.getByText('Noir'))
    expect(mockOnAnswer).not.toHaveBeenCalled()
    expect(mockSpeak).toHaveBeenCalledWith('Noir')
  })

  it("déclenche speak quand on clique sur la question en mode MagicWand", () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: vi.fn(),
    })

    render(<QuizComponent {...defaultProps} />)

    const questionText = screen.getByText('Quelle est la couleur du cheval blanc ?')
    fireEvent.click(questionText)
    expect(mockSpeak).toHaveBeenCalledWith(defaultProps.question)
  })

  it("déclenche speak quand on clique sur l'indice en mode MagicWand", () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: vi.fn(),
    })

    render(
      <QuizComponent
        {...defaultProps}
        activeHint="C'est un indice"
      />
    )

    const hintText = screen.getByText("C'est un indice")
    fireEvent.click(hintText)
    expect(mockSpeak).toHaveBeenCalledWith("C'est un indice")
  })

  it("déclenche speak quand on clique sur l'astuce du magicien en mode MagicWand", () => {
    vi.mocked(useStoryteller).mockReturnValue({
      isMagicWandActive: true,
      isSpeaking: false,
      speak: mockSpeak,
      stopStory: mockStopStory,
      toggleMagicWand: vi.fn(),
    })

    render(
      <QuizComponent
        {...defaultProps}
        attempts={4}
      />
    )

    // Open wizard help
    const wizardBtn = screen.getByTestId('wizard-help-btn')
    fireEvent.click(wizardBtn)

    const wizardText = screen.getByText(new RegExp(defaultProps.funFact, 'i'))
    fireEvent.click(wizardText)
    expect(mockSpeak).toHaveBeenCalledWith(defaultProps.funFact)
  })
})
