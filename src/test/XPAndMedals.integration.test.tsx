import { render, screen, fireEvent, waitFor, resetAllStores } from './test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../App'

// Mock des composants qui posent problème en environnement JSDOM
vi.mock('../components/Layout/StarBackground', () => ({
  StarBackground: () => <div data-testid="star-bg" />
}))

// Mock de SpeechSynthesis
const mockSpeak = vi.fn()
vi.stubGlobal('speechSynthesis', {
  speak: mockSpeak,
  cancel: vi.fn(),
  getVoices: vi.fn(() => []),
})

// Helper pour créer un profil Alice
const createAliceProfile = async () => {
  const input = screen.getByPlaceholderText(/Ton petit nom/i);
  fireEvent.change(input, { target: { value: 'Alice' } });
  
  const createBtn = screen.getByText(/C'est parti/i);
  fireEvent.click(createBtn);
  
  // Attendre que la page d'accueil se charge (vérifier la présence du dashboard)
  await screen.findByRole('link', { name: /mes médailles/i });
};

describe('Integration: XP and Medals System', () => {
  beforeEach(() => {
    resetAllStores()
    vi.clearAllMocks()
  })

  it('permet de gagner 1000 XP avec une médaille d\'Or', async () => {
    render(<App />)

    // 1. Créer le profil d'Alice
    await createAliceProfile();

    // 2. Naviguer vers le sujet "Le Lion"
    const lionCard = screen.getByTestId('topic-card-lion');
    fireEvent.click(lionCard);

    // 3. Répondre au Quiz (Lion correct = B)
    // On attend que le Suspense finisse de charger TopicDetail
    const optionB = await screen.findByLabelText(/Réponse B/i, {}, { timeout: 5000 });
    fireEvent.click(optionB);

    // 4. Vérifier le gain d'XP (1.0k pour l'Or)
    const finishBtn = screen.getByText(/fini/i);
    fireEvent.click(finishBtn);

    // Vérifier l'XP sur le dashboard de l'accueil
    await waitFor(() => {
      expect(screen.getByText(/1\.5k/i)).toBeDefined();
    });
  }, 20000)

  it('gère l\'upgrade d\'une médaille (Bronze -> Or) et met à jour les XP correctement', async () => {
    render(<App />)

    // 1. Créer le profil d'Alice
    await createAliceProfile();

    // 2. Gagner une médaille de Bronze (3 essais ou plus)
    fireEvent.click(screen.getByTestId('topic-card-lion'));
    
    // Fail 2 fois (Option A)
    const optionA = await screen.findByLabelText(/Réponse A/i);
    fireEvent.click(optionA);
    fireEvent.click(optionA);
    
    // Réussir (Option B)
    const optionB = await screen.findByLabelText(/Réponse B/i);
    fireEvent.click(optionB);

    // Vérifier Médaille de Bronze (250 XP)
    fireEvent.click(screen.getByText(/fini/i));
    await waitFor(() => {
      expect(screen.getByText(/250/i)).toBeDefined();
    });

    // 3. Rejouer pour gagner l'Or
    fireEvent.click(screen.getByTestId('topic-card-lion'));
    const optionB_new = await screen.findByLabelText(/Réponse B/i);
    fireEvent.click(optionB_new); // Réussite du premier coup cette fois

    // Vérifier Upgrade vers Or (1.5k total)
    fireEvent.click(screen.getByText(/fini/i));
    await waitFor(() => {
      expect(screen.getByText(/1\.5k/i)).toBeDefined();
    });
    expect(screen.queryByText(/250/i)).toBeNull();
  }, 20000)

  it('préserve les médailles et les XP après un rafraîchissement (LocalStorage)', async () => {
    const { unmount } = render(<App />)

    // 1. Créer Alice et gagner de l'Or
    await createAliceProfile();
    fireEvent.click(screen.getByTestId('topic-card-lion'));
    const optionB = await screen.findByLabelText(/Réponse B/i);
    fireEvent.click(optionB);
    fireEvent.click(screen.getByText(/fini/i));

    // 2. Simuler un refresh en démontant et remontant le composant
    unmount();
    
    render(<App />)

    // Vérifier que les données sont rechargées (Alice devrait être auto-chargée)
    await waitFor(() => {
      expect(screen.getByText(/1\.5k/i)).toBeDefined();
    }, { timeout: 3000 })
  }, 20000)
})
