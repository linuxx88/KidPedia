import { screen } from '@testing-library/react'
import { render } from '../../test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { TopicCard } from './TopicCard'
import { userEvent } from '@testing-library/user-event'

describe('TopicCard Accessibility', () => {
  const defaultProps = {
    id: 'test-topic',
    title: 'Sujet Test',
    description: 'Une description pour tester',
    icon: '🧪',
    categoryKey: 'science',
    exploreLabel: 'Explorer',
    onClick: vi.fn(),
  }

  it('should be focusable via keyboard', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<TopicCard {...defaultProps} onClick={onClick} />)

    const button = screen.getByRole('button')

    // Check if it's in the tab order
    await user.tab()
    expect(button).toHaveFocus()

    // Check keyboard interaction
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)

    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('has correct aria-label for screen readers', () => {
    render(<TopicCard {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', expect.stringContaining(defaultProps.title))
    expect(button).toHaveAttribute('aria-label', expect.stringContaining(defaultProps.description))
  })
})
