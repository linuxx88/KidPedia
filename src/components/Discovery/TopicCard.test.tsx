import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { TopicCard } from './TopicCard'

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

  it('affiche le titre et la description', () => {
    render(<TopicCard {...defaultProps} />)

    expect(screen.getByText('Dinosaures')).toBeDefined()
    expect(screen.getByText('Apprends tout sur les dinos !')).toBeDefined()
  })

  it('appelle onClick quand on clique sur la carte', () => {
    const handleClick = vi.fn()
    render(<TopicCard {...defaultProps} onClick={handleClick} />)

    // On clique sur le titre (ou n'importe quoi dans la carte)
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
})
