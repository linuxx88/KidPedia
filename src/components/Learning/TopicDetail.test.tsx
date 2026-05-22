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
})

