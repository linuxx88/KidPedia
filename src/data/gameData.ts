import { type TopicId } from '../types/domain';

export type SafariCellType = 'start' | 'neutral' | 'boost' | 'hazard' | 'animal' | 'end';

export interface SafariCell {
  id: number;
  type: SafariCellType;
  label: string;
  effect?: number; // Pour boost/hazard
  subjectId?: TopicId; // Pour les animaux
  icon?: string;
}

export const safariMap: SafariCell[] = [
  { id: 0, type: 'start', label: 'Départ Safari' },
  { id: 1, type: 'animal', subjectId: 'lapin', label: 'Terrier des Lapins' },
  { id: 2, type: 'boost', label: 'Liane Magique', effect: 2, icon: '🌿' },
  { id: 3, type: 'neutral', label: 'Plaine Calme' },
  { id: 4, type: 'hazard', label: 'Sable Mouvant', effect: -2, icon: '⏳' },
  { id: 5, type: 'animal', subjectId: 'panda', label: 'Bambouseraie' },
  { id: 6, type: 'neutral', label: 'Petit Pont' },
  { id: 7, type: 'animal', subjectId: 'girafe', label: 'Savane Haute' },
  { id: 8, type: 'hazard', label: 'Trou de Serpent', effect: -3, icon: '🐍' },
  { id: 9, type: 'animal', subjectId: 'dauphin', label: 'Lagon Bleu' },
  { id: 10, type: 'boost', label: 'Trampoline', effect: 3, icon: '🚀' },
  { id: 11, type: 'animal', subjectId: 'elephant', label: 'Point d\'eau' },
  { id: 12, type: 'hazard', label: 'Grotte Sombre', effect: -5, icon: '🦇' },
  { id: 13, type: 'animal', subjectId: 'lion', label: 'Rocher du Roi' },
  { id: 14, type: 'end', label: 'Arrivée Royale' },
];
