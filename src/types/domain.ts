import { type MedalType } from '../utils/quizMessages';
import { animals } from '../data/topics/animals';
import { space } from '../data/topics/space';
import { humanBody } from '../data/topics/humanBody';
import { questions } from '../data/topics/questions';
import { dinosaurs } from '../data/topics/dinosaurs';
import { nature } from '../data/topics/nature';
import { history } from '../data/topics/history';
import { geography } from '../data/topics/geography';
import { inventions } from '../data/topics/inventions';
import { arts } from '../data/topics/arts';

import { type Topic } from '../data/topics/types';

/**
 * Identifiants uniques pour tous les sujets de l'encyclopédie KidPedia.
 * Ce type est extrait dynamiquement des données réelles (as const).
 */
export type TopicId = 
  | (typeof animals)[number]['id']
  | (typeof space)[number]['id']
  | (typeof humanBody)[number]['id']
  | (typeof questions)[number]['id']
  | (typeof dinosaurs)[number]['id']
  | (typeof nature)[number]['id']
  | (typeof history)[number]['id']
  | (typeof geography)[number]['id']
  | (typeof inventions)[number]['id']
  | (typeof arts)[number]['id']
  | 'histoire' | 'dinosaurs' | 'animaux'; // Hubs de catégories

/**
 * Médaille gagnée par un joueur.
 */
export interface EarnedBadge {
  id: string;
  medal: MedalType;
}

/**
 * Identifiants pour les éléments interactifs de la scène NatureExplorer.
 */
export type NatureElementId = 
  | 'trunk' 
  | 'roots' 
  | 'root' 
  | 'leaf' 
  | 'flower' 
  | 'fruit' 
  | 'fish' 
  | 'insect' 
  | 'animal';

/**
 * Type pour un badge gagné (lié à un sujet).
 */
export type BadgeId = TopicId;

/**
 * Structure de données pour le hub de découverte.
 */
export interface TopicsData {
  search: string;
  setSearch: (val: string) => void;
  groupedTopics: Record<string, { name: string; topics: Topic[] }>;
  handleTopicClick: (id: string) => void;
  handleGoHome: (callback?: () => void) => void;
  handleSurprise: () => void;
}

/**
 * Identifiants pour les époques du Grand Voyage du Temps.
 */
export type HistoryNodeId = 
  | 'big-bang' | 'oceans' | 'life' | 'dinosaurs' | 'humans' | 'civilization';

/**
 * Structure globale de la progression d'un joueur.
 */
export interface PlayerProgression {
  xp: number;
  badges: EarnedBadge[];
  rankId: string;
}

/**
 * Interface unifiée pour l'identité du joueur.
 */
export interface PlayerIdentity {
  name: string;
  avatar: string;
}
