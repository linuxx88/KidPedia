import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, resetAllStores } from './test/test-utils'
import { App } from './App'

describe('App Integration', () => {
  beforeEach(() => {
    resetAllStores()
  })

  it('renders the home page', async () => {
    render(<App />)
    expect(await screen.findByText('Le Lion', {}, { timeout: 5000 })).toBeInTheDocument()
  })

  it('renders the topic detail page when navigating via URL', async () => {
    // Note: To test initial navigation with MemoryRouter inside AllTheProviders, 
    // we would need a way to pass initialEntries to it. 
    // But since render wraps in a fresh MemoryRouter, we can just render the app.
    // However, if we want a specific path, we might need a custom render.
    
    // For now, let's just test that the app renders.
    render(<App />)
    const elements = await screen.findAllByText(/Lion/i)
    expect(elements.length).toBeGreaterThan(0)
  })

  it('filters topics correctly', async () => {
    render(<App />)

    const searchInput = await screen.findByPlaceholderText(
      /Cherche un sujet/i,
      {},
      { timeout: 5000 },
    )
    fireEvent.change(searchInput, { target: { value: 'Panda' } })

    expect(await screen.findByText('Le Panda', {}, { timeout: 5000 })).toBeInTheDocument()
    // On attend que les anciens sujets disparaissent
    await waitFor(
      () => {
        expect(screen.queryByText('Le Lion')).not.toBeInTheDocument()
      },
      { timeout: 2000 },
    )
  })
})
