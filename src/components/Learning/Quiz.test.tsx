import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QuizComponent } from './Quiz'
import { fr } from '../../locales/fr'
import { useStoryteller } from '../../hooks/useStoryteller'
import { setupSpeechMock } from '../../test/mockUtils'

vi.mock('../../hooks/useStoryteller', () => ({
  useStoryteller: vi.fn(),
}))

describe('QuizComponent', () => {
  const mockSpeak = vi.fn()
  const mockStop = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    setupSpeechMock()
    vi.mocked(useStoryteller).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      pause: vi.fn(),
      isSpeaking: false,
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

  it("affiche la bannière de perfection quand la médaille d'or est obtenue", () => {
    render(
      <QuizComponent
        {...defaultProps}
        result={{ medal: 'gold' }}
      />,
    )

    expect(screen.getByTestId('perfect-banner')).toBeInTheDocument()
    expect(screen.getByText(fr.quiz.perfectBadge)).toBeInTheDocument()
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
    expect(screen.getByText(new RegExp(fr.quiz.winMessage('BRONZE'), 'i'))).toBeInTheDocument()
    expect(screen.getByText('🥉')).toBeInTheDocument()
  })

  it('appelle onSpeakText quand on clique sur le haut-parleur de la question', () => {
    const mockOnSpeakText = vi.fn()
    render(
      <QuizComponent
        {...defaultProps}
        onSpeakText={mockOnSpeakText}
      />,
    )

    const speakBtn = screen.getByLabelText('Écouter la question')
    fireEvent.click(speakBtn)
    expect(mockOnSpeakText).toHaveBeenCalledWith(defaultProps.question, 'quiz-question')
  })

  it('déclenche la lecture de la réponse avec useStoryteller quand on clique sur le haut-parleur d\'une option', () => {
    render(<QuizComponent {...defaultProps} />)

    // The option has a corner speaker button with aria-label="Écouter la réponse"
    const speakBtns = screen.getAllByLabelText('Écouter la réponse')
    expect(speakBtns).toHaveLength(defaultProps.options.length)

    // Click on the first option's speaker
    fireEvent.click(speakBtns[0])
    expect(mockSpeak).toHaveBeenCalledWith(defaultProps.options[0])
  })

  it("appelle onAnswer avec l'index correct quand on appuie sur Enter sur une option ayant le focus", () => {
    mockOnAnswer.mockClear()
    render(<QuizComponent {...defaultProps} />)

    const option = screen.getByTestId('quiz-option-1')
    option.focus()
    expect(option).toHaveFocus()

    fireEvent.keyDown(option, { key: 'Enter', code: 'Enter' })
    expect(mockOnAnswer).toHaveBeenCalledWith(1)
  })

  it("appelle onAnswer avec l'index correct quand on appuie sur Espace sur une option ayant le focus", () => {
    mockOnAnswer.mockClear()
    render(<QuizComponent {...defaultProps} />)

    const option = screen.getByTestId('quiz-option-2')
    option.focus()
    expect(option).toHaveFocus()

    fireEvent.keyDown(option, { key: ' ', code: 'Space' })
    expect(mockOnAnswer).toHaveBeenCalledWith(2)
  })

  it('affiche le StorytellerButton et déclenche speak avec la question', () => {
    render(<QuizComponent {...defaultProps} />)

    // Check that Storyteller owl mascot icon or button is present
    const storytellerBtn = screen.getByRole('button', { name: /Lancer la lecture vocale/i })
    expect(storytellerBtn).toBeInTheDocument()

    // Clicking should invoke speak
    fireEvent.click(storytellerBtn)
    expect(mockSpeak).toHaveBeenCalledWith(defaultProps.question)
  })

  it('appelle stop si la lecture est déjà active', () => {
    vi.mocked(useStoryteller).mockReturnValue({
      speak: mockSpeak,
      stop: mockStop,
      pause: vi.fn(),
      isSpeaking: true,
    })

    render(<QuizComponent {...defaultProps} />)

    const storytellerBtn = screen.getByRole('button', { name: /Arrêter la lecture vocale/i })
    expect(storytellerBtn).toBeInTheDocument()

    fireEvent.click(storytellerBtn)
    expect(mockStop).toHaveBeenCalled()
  })
})


