import { createMockTopic } from './factories';

/**
 * Version allégée de l'encyclopédie pour les tests unitaires.
 * Évite de charger les centaines de sujets réels quand ce n'est pas nécessaire.
 */
export const MOCK_ENCYCLOPEDIA = [
  createMockTopic({ id: 'lion', title: { fr: 'Lion', en: 'Lion' } }),
  createMockTopic({ id: 'soleil', title: { fr: 'Soleil', en: 'Sun' } }),
  createMockTopic({ id: 'arbres', title: { fr: 'Arbres', en: 'Trees' } }),
];
