import type { HistoryNode } from './types';

export const evolutionSubNodes: HistoryNode[] = [
  { 
    id: 'ev1', 
    page: 1, 
    color: '#f97316', 
    icon: '🔥', 
    title: { fr: 'Le Feu Apprivoisé', en: 'Tamed Fire' }, 
    description: { fr: 'On apprend enfin à garder et transporter le feu précieusement.', en: 'We finally learn to keep and carry fire preciouslly.' } 
  },
  { 
    id: 'ev2', 
    page: 1, 
    color: '#ef4444', 
    icon: '🥘', 
    title: { fr: 'Cuisiner pour Grandir', en: 'Cooking to Grow' }, 
    description: { fr: 'Faire cuire la nourriture a aidé notre cerveau à devenir plus gros !', en: 'Cooking food helped our brain become bigger!' } 
  },
  { 
    id: 'ev3', 
    page: 1, 
    color: '#fcd34d', 
    icon: '🧥', 
    title: { fr: 'L\'Invention des Habits', en: 'Invention of Clothes' }, 
    description: { fr: 'On fabrique des vêtements en peau pour explorer les pays froids.', en: 'We make skin clothes to explore cold countries.' } 
  },
  { 
    id: 'ev4', 
    page: 2, 
    color: '#b45309', 
    icon: '🏹', 
    title: { fr: 'Chasseurs Ingénieux', en: 'Ingenious Hunters' }, 
    description: { fr: 'On invente des arcs pour attraper de gros gibiers.', en: 'We invent bows to catch big game.' } 
  },
  { 
    id: 'ev5', 
    page: 2, 
    color: '#f59e0b', 
    icon: '🗣️', 
    title: { fr: 'Le Langage naît', en: 'Language is Born' }, 
    description: { fr: 'On commence à se parler et à se raconter des histoires.', en: 'We start talking to each other and telling stories.' } 
  },
  { 
    id: 'ev6', 
    page: 2, 
    color: '#78350f', 
    icon: '🛖', 
    title: { fr: 'S\'abriter des Orages', en: 'Sheltering from Storms' }, 
    description: { fr: 'On construit les premières huttes avec des branches.', en: 'We build the first huts with branches.' } 
  },
  { 
    id: 'ev7', 
    page: 3, 
    color: '#8b5cf6', 
    icon: '🐚', 
    title: { fr: 'L\'Esprit des Ancêtres', en: 'Spirit of Ancestors' }, 
    description: { fr: 'On commence à fabriquer des bijoux et des colliers.', en: 'We start making jewelry and necklaces.' } 
  },
  { 
    id: 'ev8', 
    page: 3, 
    color: '#6366f1', 
    icon: '🐕', 
    title: { fr: 'Le Loup devient Ami', en: 'The Wolf becomes Friend' }, 
    description: { fr: 'Le chien devient le meilleur ami de l\'homme !', en: 'The dog becomes man\'s best friend!' } 
  },
  { 
    id: 'ev9', 
    page: 3, 
    color: '#0ea5e9', 
    icon: '🚶', 
    title: { fr: 'Homo Sapiens', en: 'Homo Sapiens' }, 
    description: { fr: 'C\'est nous ! Un cerveau capable de tout imaginer. C\'est l\'heure du quiz !', en: 'It\'s us! A brain capable of imagining everything. It\'s quiz time!' },
    topicId: 'histoire' 
  },
];
