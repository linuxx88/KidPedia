import type { HistoryNode } from './types';

export const civilizationsSubNodes: HistoryNode[] = [
  { 
    id: 'cv1', 
    page: 1, 
    color: '#f59e0b', 
    icon: '🏺', 
    title: { fr: 'L\'Égypte des Pharaons', en: 'Egypt of the Pharaohs' }, 
    description: { fr: 'La construction des grandes pyramides au bord du Nil.', en: 'Building the great pyramids by the Nile.' } 
  },
  { 
    id: 'cv2', 
    page: 1, 
    color: '#d97706', 
    icon: '📜', 
    title: { fr: 'L\'Écriture Sacrée', en: 'Sacred Writing' }, 
    description: { fr: 'La découverte des hiéroglyphes et du papyrus.', en: 'Discovering hieroglyphs and papyrus.' } 
  },
  { 
    id: 'cv3', 
    page: 1, 
    color: '#3b82f6', 
    icon: '🏛️', 
    title: { fr: 'La Grèce Antique', en: 'Ancient Greece' }, 
    description: { fr: 'La naissance des Jeux Olympiques et des philosophes.', en: 'Birth of the Olympic Games and philosophers.' } 
  },
  { 
    id: 'cv4', 
    page: 2, 
    color: '#6366f1', 
    icon: '🏟️', 
    title: { fr: 'Rome la Puissante', en: 'Powerful Rome' }, 
    description: { fr: 'L\'invention des routes, des aqueducs et le Colisée.', en: 'Invention of roads, aqueducts, and the Colosseum.' } 
  },
  { 
    id: 'cv5', 
    page: 2, 
    color: '#10b981', 
    icon: '🔢', 
    title: { fr: 'Les Mayas Astronomes', en: 'Maya Astronomers' }, 
    description: { fr: 'Les pyramides dans la jungle et l\'étude des étoiles.', en: 'Pyramids in the jungle and studying the stars.' } 
  },
  { 
    id: 'cv6', 
    page: 2, 
    color: '#ef4444', 
    icon: '🐉', 
    title: { fr: 'La Chine Impériale', en: 'Imperial China' }, 
    description: { fr: 'L\'invention du papier, de la soie et la Grande Muraille.', en: 'Invention of paper, silk, and the Great Wall.' } 
  },
  { 
    id: 'cv7', 
    page: 3, 
    color: '#fcd34d', 
    icon: '☀️', 
    title: { fr: 'L\'Empire des Incas', en: 'Inca Empire' }, 
    description: { fr: 'Les cités perchées dans les montagnes (Machu Picchu).', en: 'Cities perched in the mountains (Machu Picchu).' } 
  },
  { 
    id: 'cv8', 
    page: 3, 
    color: '#8b5cf6', 
    icon: '⛵', 
    title: { fr: 'Les Vikings Explorateurs', en: 'Viking Explorers' }, 
    description: { fr: 'Les drakkars qui traversent les océans.', en: 'The longships that cross the oceans.' } 
  },
  { 
    id: 'cv9', 
    page: 3, 
    color: '#475569', 
    icon: '🏰', 
    title: { fr: 'Vers les Châteaux Forts', en: 'Towards Castles' }, 
    description: { fr: 'La fin de l\'Antiquité et le début du Moyen-Âge ! C\'est l\'heure du quiz !', en: 'The end of Antiquity and the beginning of the Middle Ages! It\'s quiz time!' },
    topicId: 'histoire' 
  },
];
