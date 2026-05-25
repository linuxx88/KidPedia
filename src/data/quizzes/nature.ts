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
  },
  'premieres-cellules': {
    question: {
      fr: "Où sont apparues les toutes premières cellules vivantes ?",
      en: "Where did the very first living cells appear?",
    },
    options: {
      fr: ["Dans les nuages", "Dans les océans", "Dans le sable du désert"],
      en: ["In the clouds", "In the oceans", "In the desert sand"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est un grand endroit rempli d'eau salée où l'on adore nager !",
      en: "It is a large place filled with salty water where we love to swim!"
    }
  },
  'air-pur': {
    question: {
      fr: "Quel organe a remplacé les branchies pour respirer sur terre ?",
      en: "Which organ replaced gills to breathe on land?",
    },
    options: {
      fr: ["Les oreilles", "Les poumons", "L'estomac"],
      en: ["The ears", "The lungs", "The stomach"],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est l'organe magique qui se gonfle dans ta poitrine quand tu respires fort !",
      en: "It is the magic organ that inflates in your chest when you breathe deeply!"
    }
  },
  'premieres-forets': {
    question: {
      fr: "De quelles plantes géantes étaient faites les premières forêts ?",
      en: "What giant plants made up the first forests?",
    },
    options: {
      fr: ["Des rosiers géants", "Des fougères et des mousses", "Des arbres en bonbon"],
      en: ["Giant rose bushes", "Ferns and mosses", "Candy trees"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Ce sont des plantes vertes toutes douces qui adorent l'ombre !",
      en: "They are soft green plants that love the shade!"
    }
  },
  'climat-change': {
    question: {
      fr: "Qu'est-ce qui est apparu sur Terre lorsque le climat est devenu très sec ?",
      en: "What appeared on Earth when the climate became very dry?",
    },
    options: {
      fr: ["Des glaciers géants", "De grands déserts chauds et secs", "Des rivières de chocolat"],
      en: ["Giant glaciers", "Large hot and dry deserts", "Chocolate rivers"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Pense à de grands espaces remplis de sable très chaud !",
      en: "Think of large spaces filled with very hot sand!"
    }
  },
  'apparition-fleurs': {
    question: {
      fr: "Pourquoi les fleurs ont-elles inventé de jolies couleurs et des parfums ?",
      en: "Why did flowers invent pretty colors and scents?",
    },
    options: {
      fr: ["Pour faire joli sur les photos", "Pour attirer les insectes pollinisateurs", "Pour cacher le soleil"],
      en: ["To look pretty in photos", "To attract pollinating insects", "To hide the sun"],
    },
    correctAnswer: 1,
    hint: {
      fr: "Elles ont besoin des petites abeilles et papillons pour voyager !",
      en: "They need little bees and butterflies to travel!"
    }
  }
};
