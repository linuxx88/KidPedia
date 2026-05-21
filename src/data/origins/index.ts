import type { HistoryNode } from './types';
import { bigBangSubNodes } from './bigBang';
import { marineSpeciesSubNodes } from './marine';
import { landSpeciesSubNodes } from './land';
import { dinosaurSubNodes } from './dinosaurs';
import { humanFormsSubNodes } from './humans';
import { evolutionSubNodes } from './evolution';
import { villageSubNodes } from './groups';
import { civilizationsSubNodes } from './civilizations';
import { middleAgesSubNodes } from './middleAges';

export * from './types';
export * from './bigBang';
export * from './marine';
export * from './land';
export * from './dinosaurs';
export * from './humans';
export * from './evolution';
export * from './groups';
export * from './civilizations';
export * from './middleAges';

export const originData: HistoryNode[] = [
  { 
    id: 'h1', 
    page: 1, 
    color: '#0ea5e9', 
    icon: '💥', 
    title: { fr: 'Le Big Bang', en: 'The Big Bang' }, 
    description: { fr: "Un énorme feu d'artifice qui a créé tout l'univers d'un coup !", en: "A huge firework that created the whole universe at once!" },
    subNodes: bigBangSubNodes
  },
  { id: 'h2', page: 1, color: '#0ea5e9', icon: '🐟', title: { fr: 'Premières espèces marines', en: 'First marine species' }, description: { fr: 'Plouf ! Les toutes premières petites bêtes nagent dans la mer.', en: 'Splash! The very first tiny beasts swim in the sea.' }, subNodes: marineSpeciesSubNodes },
  { id: 'h3', page: 2, color: '#10b981', icon: '🦎', title: { fr: 'Premières espèces terrestres', en: 'First land species' }, description: { fr: "Hop ! Certains poissons sortent de l'eau pour marcher.", en: "Hop! Some fishes get out of the water to walk." }, subNodes: landSpeciesSubNodes },
  { id: 'h4', page: 2, color: '#10b981', icon: '🦖', title: { fr: 'Les Dinosaures', en: 'Dinosaurs' }, description: { fr: 'GRRR ! Les lézards géants sont les rois de la planète !', en: 'GRRR! Giant lizards are the kings of the planet!' }, subNodes: dinosaurSubNodes },
  { id: 'h5', page: 3, color: '#f59e0b', icon: '🪨', title: { fr: 'Premières formes humaines', en: 'First human forms' }, description: { fr: 'Coucou ! Les premiers humains fabriquent des outils en pierre.', en: 'Hello! The first humans make stone tools.' }, subNodes: humanFormsSubNodes },
  { id: 'h6', page: 3, color: '#f59e0b', icon: '🔥', title: { fr: 'Évolution de l\'homme', en: 'Human evolution' }, description: { fr: 'On se redresse et on découvre comment maîtriser le feu !', en: 'We stand up and discover how to master fire!' }, subNodes: evolutionSubNodes },
  { id: 'h7', page: 3, color: '#f59e0b', icon: '🛖', title: { fr: 'Regroupements primitifs', en: 'Primitive groups' }, description: { fr: 'L\'union fait la force, on construit les premiers villages.', en: 'Strength in numbers, we build the first villages.' }, subNodes: villageSubNodes },
  { id: 'h8', page: 4, color: '#8b5cf6', icon: '🏜️', title: { fr: 'Grandes civilisations', en: 'Great civilizations' }, description: { fr: 'Direction l\'Égypte avec ses gigantesques pyramides !', en: 'To Egypt with its gigantic pyramids!' }, subNodes: civilizationsSubNodes },
  { id: 'h9', page: 4, color: '#8b5cf6', icon: '🏰', title: { fr: 'Le Moyen-Âge', en: 'Middle Ages' }, description: { fr: 'Place aux fiers chevaliers et aux châteaux forts !', en: 'Make way for proud knights and castles!' }, subNodes: middleAgesSubNodes },
];
