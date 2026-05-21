import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AccessibleSvgHotspot } from './AccessibleSvgHotspot'

describe('AccessibleSvgHotspot', () => {
  it('rend l\'élément enfant avec les attributs ARIA corrects', () => {
    render(
      <svg>
        <AccessibleSvgHotspot aria-label="Mon Bouton SVG" onClick={() => {}}>
          <rect width="100" height="100" />
        </AccessibleSvgHotspot>
      </svg>
    )
    
    const element = screen.getByRole('button', { name: /mon bouton svg/i })
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('tabindex', '0')
  })

  it('appelle onClick lors d\'un clic souris', () => {
    const handleClick = vi.fn()
    render(
      <svg>
        <AccessibleSvgHotspot aria-label="Action" onClick={handleClick}>
          <circle r="50" />
        </AccessibleSvgHotspot>
      </svg>
    )

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('appelle onClick lors de l\'appui sur la touche Enter', () => {
    const handleClick = vi.fn()
    render(
      <svg>
        <AccessibleSvgHotspot aria-label="Action" onClick={handleClick}>
          <circle r="50" />
        </AccessibleSvgHotspot>
      </svg>
    )

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('appelle onClick lors de l\'appui sur la touche Espace', () => {
    const handleClick = vi.fn()
    render(
      <svg>
        <AccessibleSvgHotspot aria-label="Action" onClick={handleClick}>
          <circle r="50" />
        </AccessibleSvgHotspot>
      </svg>
    )

    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('ne fait rien lors de l\'appui sur une autre touche', () => {
    const handleClick = vi.fn()
    render(
      <svg>
        <AccessibleSvgHotspot aria-label="Action" onClick={handleClick}>
          <circle r="50" />
        </AccessibleSvgHotspot>
      </svg>
    )

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' })
    expect(handleClick).not.toHaveBeenCalled()
  })
})
