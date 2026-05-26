import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { TopicCard } from './TopicCard'
import { useOfflineAvailability } from '../../hooks/useOfflineAvailability'

// Mock the offline availability hook
vi.mock('../../hooks/useOfflineAvailability', () => ({
  useOfflineAvailability: vi.fn().mockReturnValue(false)
}))

describe('TopicCard', () => {
  const defaultProps = {
    id: 'dino',
    title: 'Dinosaures',
    description: 'Apprends tout sur les dinos !',
    icon: '🦖',
    categoryKey: 'histoire',
    exploreLabel: 'Explorer',
    onClick: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useOfflineAvailability).mockReturnValue(false)
    // Make sure navigator is mocked to online by default
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('affiche le titre et la description', () => {
    render(<TopicCard {...defaultProps} />)

    expect(screen.getByText('Dinosaures')).toBeDefined()
    expect(screen.getByText('Apprends tout sur les dinos !')).toBeDefined()
  })

  it('appelle onClick quand on clique sur la carte', () => {
    const handleClick = vi.fn()
    render(<TopicCard {...defaultProps} onClick={handleClick} />)

    fireEvent.click(screen.getByText('Dinosaures'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('affiche la médaille si le sujet est terminé', () => {
    render(
      <TopicCard
        {...defaultProps}
        isDiscovered={true}
        medalIcon="🥇"
      />
    )

    expect(screen.getByText('🥇')).toBeDefined()
  })

  it('devrait appliquer le style hors-ligne et désactiver la carte si hors-ligne et non disponible en cache', () => {
    // Mock navigator.onLine to be false (offline)
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    // Mock cache to not have the topic
    vi.mocked(useOfflineAvailability).mockReturnValue(false)

    const handleClick = vi.fn()
    render(<TopicCard {...defaultProps} onClick={handleClick} />)

    const button = screen.getByRole('button')
    
    // The button should be disabled
    expect(button).toBeDisabled()

    // The click should be blocked / not trigger onClick
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()

    // Slashed cloud icon overlay should be visible
    expect(screen.getByTestId('offline-badge')).toBeDefined()
    expect(screen.getByText('☁️🚫')).toBeDefined()

    // ARIA label should reflect offline state
    expect(button.getAttribute('aria-label')).toContain('Non disponible hors-ligne')
  })

  it('devrait rester actif si hors-ligne mais la fiche est disponible dans le cache', () => {
    // Mock navigator.onLine to be false (offline)
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    // Mock cache to have the topic
    vi.mocked(useOfflineAvailability).mockReturnValue(true)

    const handleClick = vi.fn()
    render(<TopicCard {...defaultProps} onClick={handleClick} />)

    const button = screen.getByRole('button')
    
    // The button should not be disabled
    expect(button).not.toBeDisabled()

    // The click should work
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()

    // Slashed cloud icon overlay should not be visible
    expect(screen.queryByTestId('offline-badge')).toBeNull()
  })
})
