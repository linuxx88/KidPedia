import { render, screen, fireEvent } from '../../test/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  const mockOnChange = vi.fn()
  const mockOnClear = vi.fn()
  const defaultProps = {
    value: '',
    onChange: mockOnChange,
    onClear: mockOnClear,
    placeholder: 'Chercher...',
    clearLabel: 'Effacer',
  }

  it("affiche l'input avec le bon placeholder", () => {
    render(<SearchBar {...defaultProps} />)

    const input = screen.getByPlaceholderText('Chercher...')
    expect(input).toBeInTheDocument()
  })

  it('affiche la valeur initiale', () => {
    render(<SearchBar {...defaultProps} value="Dinosaures" />)

    const input = screen.getByDisplayValue('Dinosaures')
    expect(input).toBeInTheDocument()
  })

  it('appelle onChange quand on tape du texte', () => {
    render(<SearchBar {...defaultProps} />)

    const input = screen.getByPlaceholderText('Chercher...')
    fireEvent.change(input, { target: { value: 'Espace' } })

    expect(mockOnChange).toHaveBeenCalledWith('Espace')
  })

  it('affiche le bouton de nettoyage quand il y a du texte', () => {
    render(<SearchBar {...defaultProps} value="Texte" />)

    const clearBtn = screen.getByRole('button', { name: 'Effacer' })
    expect(clearBtn).toBeInTheDocument()
  })

  it('ne montre pas le bouton de nettoyage quand le texte est vide', () => {
    render(<SearchBar {...defaultProps} value="" />)

    expect(screen.queryByRole('button')).toBeNull()
  })

  it('appelle onClear quand on clique sur le bouton de nettoyage', () => {
    render(<SearchBar {...defaultProps} value="Texte" />)

    const clearBtn = screen.getByRole('button')
    fireEvent.click(clearBtn)

    expect(mockOnClear).toHaveBeenCalled()
  })

  it('applique l\'attribut data-compact quand isCompact est vrai', () => {
    const { container } = render(
      <SearchBar {...defaultProps} isCompact={true} />,
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.getAttribute('data-compact')).toBe('true')
  })
})
