import { useNavigate } from 'react-router-dom';
import { useProgressionStore } from '../store/useProgressionStore';
import { NATURE_ELEMENTS } from '../data/natureData';
import { type NatureElementId } from '../types/domain';

/**
 * useNatureGame - Hook métier pour l'expérience NatureExplorer.
 * 
 * Il fait le pont entre les interactions de la scène (UI)
 * et le système de progression global (Store).
 */
export const useNatureGame = () => {
  const navigate = useNavigate();
  const addXP = useProgressionStore(state => state.addXP);

  /**
   * Gère une interaction avec un élément de la nature.
   * Calcule la récompense et redirige vers le sujet correspondant.
   */
  const handleInteraction = (elementId: NatureElementId) => {
    const element = NATURE_ELEMENTS[elementId];
    
    // 1. Accorder l'XP si une récompense est prévue
    if (element.xpReward) {
      addXP(element.xpReward);
    }

    // 2. Retourner l'ID du sujet pour navigation ou affichage
    return element.topicId;
  };

  /**
   * Action combinée : Interaction + Navigation vers le détail
   */
  const interactAndNavigate = (elementId: NatureElementId) => {
    const topicId = handleInteraction(elementId);
    navigate(`/topic/${topicId}`);
  };

  return {
    handleInteraction,
    interactAndNavigate,
    elements: NATURE_ELEMENTS
  };
};
