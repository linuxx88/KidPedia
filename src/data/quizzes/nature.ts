import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  arbres: {
    question: {
      fr: 'Que fabriquent les arbres pour nous ?',
      en: 'What do trees make for us?',
    },
    options: {
      fr: ['Du chocolat', "De l'oxygène", 'De la peinture'],
      en: ['Chocolate', 'Oxygen', 'Paint'],
    },
    correctAnswer: 1,
  },
  volcan: {
    question: {
      fr: 'Comment appelle-t-on la roche fondue qui sort du volcan ?',
      en: 'What do we call the molten rock that comes out of a volcano?',
    },
    options: {
      fr: ['De la boue', 'De la lave', "Du jus d'orange"],
      en: ['Mud', 'Lava', 'Orange juice'],
    },
    correctAnswer: 1,
  },
  pluie: {
    question: {
      fr: "D'où tombe la pluie ?",
      en: 'Where does rain fall from?',
    },
    options: {
      fr: ['Des arbres', 'Des nuages', 'De la Lune'],
      en: ['Trees', 'Clouds', 'The Moon'],
    },
    correctAnswer: 1,
  },
  'arc-en-ciel': {
    question: {
      fr: 'Combien de couleurs y a-t-il dans un arc-en-ciel ?',
      en: 'How many colors are in a rainbow?',
    },
    options: {
      fr: ['3 couleurs', '7 couleurs', '10 couleurs'],
      en: ['3 colors', '7 colors', '10 colors'],
    },
    correctAnswer: 1,
  },
  abeilles: {
    question: {
      fr: 'Que fabriquent les abeilles avec le nectar ?',
      en: 'What do bees make with nectar?',
    },
    options: {
      fr: ['Du fromage', 'Du miel', 'De la confiture'],
      en: ['Cheese', 'Honey', 'Jam'],
    },
    correctAnswer: 1,
  },
  'cycle-eau': {
    question: {
      fr: "Comment appelle-t-on le voyage sans fin de l'eau ?",
      en: 'What is the endless journey of water called?',
    },
    options: {
      fr: ["La course de l'eau", "Le cycle de l'eau", "Le toboggan de l'eau"],
      en: ['The water race', 'The water cycle', 'The water slide'],
    },
    correctAnswer: 1,
  },
  saisons: {
    question: {
      fr: "Quelle saison vient juste après l'hiver ?",
      en: 'Which season comes right after winter?',
    },
    options: {
      fr: ["L'automne", 'Le printemps', "L'été"],
      en: ['Autumn', 'Spring', 'Summer'],
    },
    correctAnswer: 1,
  },
  'orage-tonnerre': {
    question: {
      fr: "Pourquoi voit-on l'éclair avant d'entendre le tonnerre ?",
      en: 'Why do we see the flash before hearing the thunder?',
    },
    options: {
      fr: ['Le tonnerre est timide', 'La lumière va plus vite que le son', "L'éclair est plus gros"],
      en: ['The thunder is shy', 'Light goes faster than sound', 'The lightning is bigger'],
    },
    correctAnswer: 1,
  },
  'vent-air': {
    question: {
      fr: "Qu'est-ce que le vent ?",
      en: 'What is the wind?',
    },
    options: {
      fr: ["De l'air qui bouge", 'De la poussière', "De la vapeur d'eau"],
      en: ['Moving air', 'Dust', 'Water vapor'],
    },
    correctAnswer: 0,
  },
  'champignons-nature': {
    question: {
      fr: 'Le champignon est-il une plante ?',
      en: 'Is a mushroom a plant?',
    },
    options: {
      fr: ['Oui', "Non, c'est un 'fongique'", "C'est un petit animal"],
      en: ['Yes', "No, it's a fungus", "It's a small animal"],
    },
    correctAnswer: 1,
  },
  'banquise-glace': {
    question: {
      fr: 'Où se trouve la banquise ?',
      en: 'Where is sea ice found?',
    },
    options: {
      fr: ['Dans le désert', 'Aux pôles de la Terre', 'Dans la forêt'],
      en: ['In the desert', "At the Earth's poles", 'In the forest'],
    },
    correctAnswer: 1,
  },
  'grottes-souterraines': {
    question: {
      fr: 'Comment appelle-t-on les roches qui descendent du plafond des grottes ?',
      en: 'What do we call the rocks that hang from the ceiling of caves?',
    },
    options: {
      fr: ['Des stalagmites', 'Des stalactites', 'Des sucettes de pierre'],
      en: ['Stalagmites', 'Stalactites', 'Stone lollipops'],
    },
    correctAnswer: 1,
  }
};
