import type { HistoryNode } from './types';

export const landSpeciesSubNodes: HistoryNode[] = [
  { 
    id: 'ls1', 
    page: 1, 
    color: '#10b981', 
    icon: '🐟🦵', 
    title: { fr: 'Sortie des eaux', en: 'Out of the water' }, 
    description: { fr: 'Certains poissons utilisent leurs nageoires pour ramper.', en: 'Some fish use their fins to crawl.' } 
  },
  { 
    id: 'ls2', 
    page: 1, 
    color: '#84cc16', 
    icon: '🌬️', 
    title: { fr: 'L\'air pur', en: 'Fresh air' }, 
    description: { fr: 'Les poumons remplacent enfin les branchies !', en: 'Lungs finally replace gills!' } 
  },
  { 
    id: 'ls3', 
    page: 1, 
    color: '#10b981', 
    icon: '🌳', 
    title: { fr: 'Premières forêts', en: 'First forests' }, 
    description: { fr: 'La Terre se couvre de mousses et de fougères géantes.', en: 'The Earth is covered with mosses and giant ferns.' } 
  },
  { 
    id: 'ls4', 
    page: 2, 
    color: '#059669', 
    icon: '🐜', 
    title: { fr: 'Insectes géants', en: 'Giant insects' }, 
    description: { fr: 'Des libellules de la taille d\'un aigle volent partout !', en: 'Dragonflies the size of an eagle fly everywhere!' } 
  },
  { 
    id: 'ls5', 
    page: 2, 
    color: '#d97706', 
    icon: '🦎', 
    title: { fr: 'Peau de Reptile', en: 'Reptile skin' }, 
    description: { fr: 'Une peau écailleuse pour ne plus sécher au soleil.', en: 'Scaly skin to avoid drying out in the sun.' } 
  },
  { 
    id: 'ls6', 
    page: 2, 
    color: '#b45309', 
    icon: '🥚', 
    title: { fr: 'L\'œuf solide', en: 'The solid egg' }, 
    description: { fr: 'Plus besoin de retourner à l\'eau pour pondre !', en: 'No more need to go back to the water to lay eggs!' } 
  },
  { 
    id: 'ls7', 
    page: 3, 
    color: '#ea580c', 
    icon: '☀️', 
    title: { fr: 'Le climat change', en: 'Changing climate' }, 
    description: { fr: 'La Terre devient chaude et les déserts apparaissent.', en: 'The Earth becomes hot and deserts appear.' } 
  },
  { 
    id: 'ls8', 
    page: 3, 
    color: '#ec4899', 
    icon: '🌸', 
    title: { fr: 'Apparition des fleurs', en: 'Flowers appearance' }, 
    description: { fr: 'La nature se pare de ses premières couleurs.', en: 'Nature adorns itself with its first colors.' } 
  },
  { 
    id: 'ls9', 
    page: 3, 
    color: '#10b981', 
    icon: 'Rex', 
    title: { fr: 'L\'Aube des Dinosaures', en: 'Dawn of Dinosaurs' }, 
    description: { fr: 'Les premiers géants arrivent. C\'est l\'heure du quiz !', en: 'The first giants arrive. It\'s quiz time!' },
    topicId: 'dinosaurs' 
  },
];
