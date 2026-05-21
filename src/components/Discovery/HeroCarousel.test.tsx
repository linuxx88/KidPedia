import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroCarousel } from './HeroCarousel'

describe('HeroCarousel', () => {
  const defaultProps = {
    images: [
      { webp: 'img1.webp', png: 'img1.png' },
      { webp: 'img2.webp', png: 'img2.png' },
      { webp: 'img3.webp', png: 'img3.png' },
    ],
    activeStep: 0,
    previousStep: 0,
  }

  it('affiche le contenu enfant (children)', () => {
    render(
      <HeroCarousel {...defaultProps}>
        <h1>Bienvenue</h1>
      </HeroCarousel>,
    )

    expect(screen.getByText('Bienvenue')).toBeDefined()
  })

  it('affiche les images avec les bons attributs src', () => {
    const { container } = render(
      <HeroCarousel {...defaultProps} activeStep={1} previousStep={0}>
        <div>Contenu</div>
      </HeroCarousel>,
    )

    const images = Array.from(container.querySelectorAll('img'));
    const srcs = images.map(img => img.getAttribute('src'));

    expect(srcs).toContain('img1.png');
    expect(srcs).toContain('img2.png');
  })
})
