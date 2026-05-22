import { type MedalType } from '../utils/quizMessages';

export type AccessoryCategory = 'espace' | 'animaux' | 'dinosaures' | 'nature' | 'histoire' | 'corps-humain';

export interface UnlockCondition {
  type: 'count' | 'specific_topic' | 'xp';
  value: number | string; // nombre de médailles, ID de sujet, ou seuil d'XP
  medal?: MedalType;      // médaille minimum requise si type 'count' ou 'specific_topic'
  category?: AccessoryCategory; // catégorie concernée si type 'count'
}

export interface Accessory {
  id: string;
  name: { fr: string, en: string };
  category: AccessoryCategory;
  icon: string; // Emoji pour le prototype, remplacé par image path plus tard
  unlockCondition: UnlockCondition;
  slot?: 'head' | 'companion';
  price?: number; // Prix en tickets (optionnel, ex: cadeaux gratuits)
}

export const ACCESSORIES_DB: Accessory[] = [
  {
    id: 'space-helmet',
    name: { fr: 'Casque Stellaire', en: 'Star Helmet' },
    category: 'espace',
    icon: '👨‍🚀',
    unlockCondition: { type: 'count', category: 'espace', value: 3, medal: 'gold' },
    slot: 'head',
    price: 5
  },
  {
    id: 'explorer-hat',
    name: { fr: "Chapeau de Brousse", en: "Explorer Hat" },
    category: 'animaux',
    icon: '🤠',
    unlockCondition: { type: 'xp', value: 1000 },
    slot: 'head'
  },
  {
    id: 'dino-mask',
    name: { fr: 'Masque de T-Rex', en: 'Dino Mask' },
    category: 'dinosaures',
    icon: '🦖',
    unlockCondition: { type: 'specific_topic', value: 'tyrannosaure', medal: 'gold' },
    slot: 'head',
    price: 5
  },
  {
    id: 'crown',
    name: { fr: 'Couronne Royale', en: 'Royal Crown' },
    category: 'histoire',
    icon: '👑',
    unlockCondition: { type: 'xp', value: 5000 },
    slot: 'head',
    price: 15
  },
  {
    id: 'dog-companion',
    name: { fr: 'Petit Chien', en: 'Puppy' },
    category: 'animaux',
    icon: '🐶',
    unlockCondition: { type: 'count', category: 'animaux', value: 3, medal: 'gold' },
    slot: 'companion',
    price: 10
  },
  {
    id: 'robot-companion',
    name: { fr: 'Mini Robot', en: 'Mini Robot' },
    category: 'espace',
    icon: '🤖',
    unlockCondition: { type: 'count', category: 'espace', value: 3, medal: 'gold' },
    slot: 'companion',
    price: 10
  },
  {
    id: 'dino-companion',
    name: { fr: 'Bébé Dino', en: 'Baby Dino' },
    category: 'dinosaures',
    icon: '🦕',
    unlockCondition: { type: 'count', category: 'dinosaures', value: 3, medal: 'gold' },
    slot: 'companion',
    price: 10
  }
];
