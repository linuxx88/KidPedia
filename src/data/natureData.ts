import { type TopicId, type NatureElementId } from '../types/domain';

/**
 * Informations sur les éléments de la scène NatureExplorer.
 * Associe chaque élément à un sujet de l'encyclopédie et définit les récompenses.
 */
export interface NatureElementInfo {
  id: NatureElementId;
  topicId: TopicId;
  xpReward?: number;
}

export const NATURE_ELEMENTS: Record<NatureElementId, NatureElementInfo> = {
  trunk: { id: 'trunk', topicId: 'arbres', xpReward: 5 },
  roots: { id: 'roots', topicId: 'champignons-nature', xpReward: 5 },
  root: { id: 'root', topicId: 'champignons-nature', xpReward: 5 },
  leaf: { id: 'leaf', topicId: 'saisons' },
  flower: { id: 'flower', topicId: 'abeilles' },
  fruit: { id: 'fruit', topicId: 'arbres' },
  fish: { id: 'fish', topicId: 'dauphin' },
  insect: { id: 'insect', topicId: 'abeilles' },
  animal: { id: 'animal', topicId: 'lapin' },
};
