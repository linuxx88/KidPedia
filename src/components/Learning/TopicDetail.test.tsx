import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TopicDetail } from './TopicDetail'
import { fr } from '../../locales/fr'
import { setupSpeechMock, setupAudioMock } from '../../test/mockUtils'
import { createMockQuiz } from '../../test/factories'

describe('TopicDetail', () => {
  const mockOnBack = vi.fn()
  const mockOnAnswer = vi.fn()
  const defaultProps = {
    title: 'Titre de Test',
    description: 'Ceci est le contenu complet du sujet de test.',
    funFact: 'Un fait amusant !',
    icon: '🌿',
    quiz: createMockQuiz(),
    onBack: mockOnBack,
    onAnswer: mockOnAnswer,
    quizResult: null,
    gender: 'boy' as const,
    retryMsg: null,
    activeHint: null,
    language: 'fr' as const,
    labels: fr,
    attempts: 1
  }

  beforeEach(() => {
    vi.clearAllMocks()
    setupSpeechMock()
    setupAudioMock()
  })

  it('affiche les informations du sujet correctement', () => {
    render(<TopicDetail {...defaultProps} />)

    expect(screen.getByText('Titre de Test')).toBeInTheDocument()
    expect(screen.getByText('🌿')).toBeInTheDocument()
    expect(screen.getByText('Ceci est le contenu complet du sujet de test.')).toBeInTheDocument()
  })

  it('affiche la médaille si un badge est présent', () => {
    render(
      <TopicDetail
        {...defaultProps}
        badgeIcon="🥇"
      />,
    )

    expect(screen.getByText('🥇')).toBeInTheDocument()
  })

  it('appelle onBack quand on clique sur Retour', () => {
    render(<TopicDetail {...defaultProps} />)

    fireEvent.click(screen.getByText(new RegExp(fr.common.back)))
    expect(mockOnBack).toHaveBeenCalled()
  })

  it('utilise la synthèse vocale quand on clique sur Écouter', () => {
    render(<TopicDetail {...defaultProps} />)

    const speakBtn = screen.getByText(new RegExp(fr.common.listen))
    fireEvent.click(speakBtn)
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  it('utilise le fichier audio quand il est présent dans le topic', () => {
    render(
      <TopicDetail
        {...defaultProps}
        audioFile="test.mp3"
      />,
    )

    const speakBtn = screen.getByText(new RegExp(fr.common.listenAudio))
    fireEvent.click(speakBtn)
    expect(window.Audio).toHaveBeenCalledWith('test.mp3')
  })

  it('utilise la synthèse vocale pour lire la description', () => {
    render(<TopicDetail {...defaultProps} />)

    const speakBtn = screen.getByLabelText('Écouter la description')
    fireEvent.click(speakBtn)
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  it("utilise la synthèse vocale pour lire l'anecdote", () => {
    render(<TopicDetail {...defaultProps} />)

    const speakBtn = screen.getByLabelText("Écouter l'anecdote")
    fireEvent.click(speakBtn)
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  it("affiche le bouton flottant de la Baguette Magique et bascule l'état au clic", () => {
    render(<TopicDetail {...defaultProps} />)

    const wandBtn = screen.getByLabelText("Activer la baguette magique de lecture")
    expect(wandBtn).toBeInTheDocument()

    // Clic pour activer
    fireEvent.click(wandBtn)
    expect(wandBtn).toHaveClass(/baguetteFloatingBtnActive/)

    // Clic pour désactiver
    fireEvent.click(wandBtn)
    expect(wandBtn).not.toHaveClass(/baguetteFloatingBtnActive/)
  })

  it("utilise la Baguette Magique pour lire un texte interactif au clic", () => {
    render(<TopicDetail {...defaultProps} />)

    const wandBtn = screen.getByLabelText("Activer la baguette magique de lecture")
    
    // Activer le mode baguette
    fireEvent.click(wandBtn)

    // La description est maintenant un texte interactif Baguette
    const interactiveText = screen.getByText('Ceci est le contenu complet du sujet de test.')
    fireEvent.click(interactiveText)

    expect(window.speechSynthesis.speak).toHaveBeenCalled()
    const mockUtterance = vi.mocked(window.speechSynthesis.speak).mock.calls[0][0]
    expect(mockUtterance.text).toBe('Ceci est le contenu complet du sujet de test.')
  })
})

