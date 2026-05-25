import type { HistoryNode } from './types';

export const dinosaurSubNodes: HistoryNode[] = [
  { 
    id: 'dn1', 
    page: 1, 
    color: '#f97316', 
    icon: '🏜️', 
    title: { fr: 'L\'Aube du Trias', en: 'Dawn of Triassic' }, 
    description: { fr: 'Après la grande extinction, les premiers petits dinosaures apparaissent.', en: 'After the great extinction, the first small dinosaurs appear.' },
    topicId: 'velociraptor'
  },
  { 
    id: 'dn2', 
    page: 1, 
    color: '#b45309', 
    icon: '🦕', 
    title: { fr: 'Les Premiers Géants', en: 'The First Giants' }, 
    description: { fr: 'Des dinosaures comme le Plateosaurus commencent à grandir.', en: 'Dinosaurs like Plateosaurus start to grow.' },
    topicId: 'diplodocus'
  },
  { 
    id: 'dn3', 
    page: 1, 
    color: '#10b981', 
    icon: '🌿', 
    title: { fr: 'L\'Âge d\'Or : Le Jurassique', en: 'The Golden Age: Jurassic' }, 
    description: { fr: 'La Terre est chaude, humide et pleine de plantes géantes.', en: 'The Earth is hot, humid and full of giant plants.' },
    topicId: 'pterodactyle'
  },
  { 
    id: 'dn4', 
    page: 2, 
    color: '#059669', 
    icon: '🦕', 
    title: { fr: 'Les Longs Cous', en: 'The Long Necks' }, 
    description: { fr: 'Le Brachiosaure peut manger les feuilles tout en haut des arbres !', en: 'Brachiosaurus can eat the leaves at the very top of the trees!' },
    topicId: 'brachiosaure'
  },
  { 
    id: 'dn5', 
    page: 2, 
    color: '#064e3b', 
    icon: '🛡️', 
    title: { fr: 'Armures et Plaques', en: 'Armor and Plates' }, 
    description: { fr: 'Le Stégosaure utilise ses plaques pour se protéger.', en: 'Stegosaurus uses its plates to protect itself.' },
    topicId: 'stegosaure'
  },
  { 
    id: 'dn6', 
    page: 2, 
    color: '#ef4444', 
    icon: '🌋', 
    title: { fr: 'Le Crétacé : Le Sommet', en: 'Cretaceous: The Summit' }, 
    description: { fr: 'Les continents bougent et de nouvelles espèces apparaissent.', en: 'Continents move and new species appear.' },
    topicId: 'spinosaure'
  },
  { 
    id: 'dn7', 
    page: 3, 
    color: '#991b1b', 
    icon: 'Rex', 
    title: { fr: 'Le Roi des Dinosaures', en: 'The King of Dinosaurs' }, 
    description: { fr: 'Le T-Rex entre en scène avec ses dents redoutables !', en: 'T-Rex enters the scene with its fearsome teeth!' },
    topicId: 't-rex'
  },
  { 
    id: 'dn8', 
    page: 3, 
    color: '#1d4ed8', 
    icon: '🛡️', 
    title: { fr: 'Trois Cornes Magiques', en: 'Three Magic Horns' }, 
    description: { fr: 'Le Tricératops est prêt à se défendre contre n\'importe qui.', en: 'Triceratops is ready to defend itself against anyone.' },
    topicId: 'triceratops'
  },
  { 
    id: 'dn9', 
    page: 3, 
    color: '#475569', 
    icon: '☄️', 
    title: { fr: 'Le Mystère de la Fin', en: 'The Mystery of the End' }, 
    description: { fr: 'Une étoile filante géante ? C\'est l\'heure du quiz pour tout savoir !', en: 'A giant shooting star? It\'s quiz time to find out everything!' },
    topicId: 'dinosaurs' 
  },
];
