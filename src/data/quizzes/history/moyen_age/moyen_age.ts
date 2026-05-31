import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';

export const moyenAgeQuizzes: Partial<Record<TopicId, Quiz>> = {
  chevaliers: {
    question: {
      fr: 'Où vivaient souvent les chevaliers ?',
      en: 'Where did knights often live?',
    },
    options: {
      fr: ['Dans des cabanes', 'Dans des châteaux', 'Dans des bateaux'],
      en: ['In huts', 'In castles', 'In boats'],
    },
    correctAnswer: 1,
  },
  vikings: {
    question: {
      fr: "Comment s'appelaient les bateaux des Vikings ?",
      en: 'What were Viking boats called?',
    },
    options: {
      fr: ['Des barques', 'Des drakkars', 'Des canoës'],
      en: ['Skiffs', 'Longships', 'Canoes'],
    },
    correctAnswer: 1,
  },
  chateaux: {
    question: {
      fr: "Comment s'appelle le pont qu'on peut remonter pour fermer le château ?",
      en: 'What is the name of the bridge that can be raised to close the castle?',
    },
    options: {
      fr: ['Le pont-levis', 'Le pont-volant', 'Le pont-sauteur'],
      en: ['Drawbridge', 'Flying bridge', 'Jumping bridge'],
    },
    correctAnswer: 0,
  },
  samourais: {
    question: {
      fr: 'De quel pays venaient les samouraïs ?',
      en: 'Which country did the samurai come from?',
    },
    options: {
      fr: ['De Chine', 'Du Japon', 'De France'],
      en: ['China', 'Japan', 'France'],
    },
    correctAnswer: 1,
  },
  cathedrales: {
    question: {
      fr: "Comment s'appellent les jolies fenêtres en verre coloré des cathédrales ?",
      en: "What are the pretty colored glass windows of cathedrals called?",
    },
    options: {
      fr: ["Des vitraux", "Des miroirs", "Des rideaux"],
      en: ["Stained glass windows", "Mirrors", "Curtains"],
    },
    correctAnswer: 0,
  },
  calligraphie: {
    question: {
      fr: "Avec quel instrument de plume écrivait-on les manuscrits au Moyen Âge ?",
      en: "With which feather instrument did they write manuscripts in the Middle Ages?",
    },
    options: {
      fr: ["Une plume d'oie", "Un stylo à bille", "Un pinceau en plastique"],
      en: ["A goose feather", "A ballpoint pen", "A plastic brush"],
    },
    correctAnswer: 0,
  },
  'moulins-moyen-age': {
    question: {
      fr: "Quelle force de la nature faisait tourner les moulins à vent ?",
      en: "Which force of nature turned windmills?",
    },
    options: {
      fr: ["Le vent", "La pluie", "Le soleil"],
      en: ["The wind", "The rain", "The sun"],
    },
    correctAnswer: 0,
  },
  'foires-marches': {
    question: {
      fr: "Pourquoi les marchands venaient-ils s'installer dans les foires ?",
      en: "Why did merchants set up in fairs?",
    },
    options: {
      fr: ["Pour faire du toboggan", "Pour vendre des épices et de beaux tissus", "Pour dormir tranquillement"],
      en: ["To go down slides", "To sell spices and beautiful fabrics", "To sleep quietly"],
    },
    correctAnswer: 1,
  }
};
