import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StarBackground } from './StarBackground'

describe('StarBackground', () => {
  it('affiche le nombre par défaut de 50 étoiles', () => {
    const { container } = render(<StarBackground />)
    const starsContainer = container.firstChild as HTMLElement
    expect(starsContainer.childNodes.length).toBe(50)
  })

  it("affiche le nombre d'étoiles spécifié par la prop count", () => {
    const { container } = render(<StarBackground count={20} />)
    const starsContainer = container.firstChild as HTMLElement
    expect(starsContainer.childNodes.length).toBe(20)
  })

  it('a l\'attribut aria-hidden="true"', () => {
    const { container } = render(<StarBackground />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
  })

  it('applique des styles aléatoires mais valides à chaque étoile', () => {
    const { container } = render(<StarBackground count={1} />)
    const starsContainer = container.firstChild as HTMLElement
    const star = starsContainer.firstChild as HTMLElement

    expect(star.style.top).toMatch(/\d+(\.\d+)?%/)
    expect(star.style.left).toMatch(/\d+(\.\d+)?%/)
    expect(star.style.width).toMatch(/\d+(\.\d+)?px/)
    expect(star.style.height).toMatch(star.style.width)

    // Vérification de la propriété personnalisée --duration
    expect(star.style.getPropertyValue('--duration')).toMatch(/\d+(\.\d+)?s/)
  })
})
