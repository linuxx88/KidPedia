import { type LocalizedString } from './topics/types';

export interface RankInfo {
  id: string;
  minXP: number;
  icon: string;
  title: Record<'boy' | 'girl', string>;
  description: LocalizedString;
}

/**
 * Dictionnaire des rangs de progression.
 * Définit les paliers d'XP nécessaires pour évoluer.
 */
export const RANKS: RankInfo[] = [
  { 
    id: 'apprentice', 
    minXP: 0, 
    icon: '🌱', 
    title: { boy: 'Apprenti', girl: 'Apprentie' },
    description: { fr: 'Tes premiers pas dans le savoir !', en: 'Your first steps in knowledge!' }
  },
  { 
    id: 'explorer', 
    minXP: 1000, 
    icon: '🧭', 
    title: { boy: 'Explorateur', girl: 'Exploratrice' },
    description: { fr: 'Tu commences à connaître le monde.', en: 'You are starting to know the world.' }
  },
  { 
    id: 'expert', 
    minXP: 5000, 
    icon: '🧠', 
    title: { boy: 'Expert', girl: 'Experte' },
    description: { fr: 'Le savoir n\'a presque plus de secrets pour toi.', en: 'Knowledge has almost no secrets for you.' }
  },
  { 
    id: 'sage', 
    minXP: 10000, 
    icon: '🧙', 
    title: { boy: 'Sage', girl: 'Sage' },
    description: { fr: 'Tu es une véritable encyclopédie vivante !', en: 'You are a true living encyclopedia!' }
  },
];
