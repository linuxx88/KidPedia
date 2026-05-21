import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppButton } from './AppButton'

describe('AppButton', () => {
  it('affiche le contenu enfant', () => {
    render(<AppButton onClick={() => {}}>Cliquez-moi</AppButton>)
    expect(screen.getByText('Cliquez-moi')).toBeInTheDocument()
  })

  it('appelle onClick quand on clique', () => {
    const handleClick = vi.fn()
    render(<AppButton onClick={handleClick}>Bouton</AppButton>)

    fireEvent.click(screen.getByText('Bouton'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("affiche l'icône fournie via la prop icon", () => {
    render(
      <AppButton onClick={() => {}} icon="🚀">
        Lancer
      </AppButton>,
    )
    expect(screen.getByText('🚀')).toBeInTheDocument()
  })

  it('applique le type de bouton correct', () => {
    render(
      <AppButton onClick={() => {}} type="submit">
        Submit
      </AppButton>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('ajoute des classes CSS personnalisées', () => {
    render(
      <AppButton onClick={() => {}} className="ma-classe-perso">
        Custom
      </AppButton>,
    )
    const button = screen.getByRole('button')
    expect(button.className).toContain('ma-classe-perso')
  })

  it('utilise le type "button" par défaut', () => {
    render(<AppButton onClick={() => {}}>Default Type</AppButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })
})
