import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  pyramides: {
    question: {
      fr: 'Pourquoi les Égyptiens construisaient-ils des pyramides ?',
      en: 'Why did the Egyptians build pyramids?',
    },
    options: {
      fr: ['Pour stocker du grain', 'Comme tombeaux pour les pharaons', 'Pour observer les étoiles'],
      en: ['To store grain', 'As tombs for pharaohs', 'To observe the stars'],
    },
    correctAnswer: 1,
  },
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
  romains: {
    question: {
      fr: "Qu'est-ce que les Romains construisaient pour transporter l'eau ?",
      en: 'What did the Romans build to transport water?',
    },
    options: {
      fr: ['Des toboggans', 'Des aqueducs', 'Des camions'],
      en: ['Slides', 'Aqueducts', 'Trucks'],
    },
    correctAnswer: 1,
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
  pirates: {
    question: {
      fr: "Comment s'appelle le drapeau noir des pirates ?",
      en: 'What is the name of the black pirate flag?',
    },
    options: {
      fr: ['Le Jolly Roger', 'Le Beau Drapeau', 'Le Pavillon Bleu'],
      en: ['The Jolly Roger', 'The Beautiful Flag', 'The Blue Flag'],
    },
    correctAnswer: 0,
  },
  prehistoire: {
    question: {
      fr: 'Où les hommes préhistoriques dessinaient-ils souvent ?',
      en: 'Where did prehistoric humans often draw?',
    },
    options: {
      fr: ['Sur du papier', 'Dans des grottes', 'Sur des voitures'],
      en: ['On paper', 'In caves', 'On cars'],
    },
    correctAnswer: 1,
  },
  'grece-antique': {
    question: {
      fr: 'Quelle célèbre compétition sportive les Grecs ont-ils inventée ?',
      en: 'Which famous sporting competition did the Greeks invent?',
    },
    options: {
      fr: ['Le Football', 'Les Jeux Olympiques', 'Le Tour de France'],
      en: ['Football', 'The Olympic Games', 'The Tour de France'],
    },
    correctAnswer: 1,
  },
  'leonard-vinci': {
    question: {
      fr: 'Quel célèbre tableau Léonard de Vinci a-t-il peint ?',
      en: 'Which famous painting did Leonardo da Vinci paint?',
    },
    options: {
      fr: ['La Joconde', 'Le Petit Prince', 'Un paysage de neige'],
      en: ['The Mona Lisa', 'The Little Prince', 'A snow landscape'],
    },
    correctAnswer: 0,
  },
  mayas: {
    question: {
      fr: 'Où les Mayas construisaient-ils leurs cités ?',
      en: 'Where did the Mayans build their cities?',
    },
    options: {
      fr: ['Dans le désert', 'Dans la jungle', 'Sur la glace'],
      en: ['In the desert', 'In the jungle', 'On ice'],
    },
    correctAnswer: 1,
  },
  'premier-pas-lune': {
    question: {
      fr: 'Qui est le premier homme à avoir marché sur la Lune ?',
      en: 'Who was the first man to walk on the Moon?',
    },
    options: {
      fr: ['Tintin', 'Neil Armstrong', "Buzz l'Éclair"],
      en: ['Tintin', 'Neil Armstrong', 'Buzz Lightyear'],
    },
    correctAnswer: 1,
  },
  'berceau-afrique': {
    question: {
      fr: "Quel est le nom de la région d'Afrique où l'histoire humaine a commencé ?",
      en: "What is the name of the region in Africa where human history began?",
    },
    options: {
      fr: ["Le Grand Rift", "Le grand désert", "La forêt dense"],
      en: ["The Great Rift", "The great desert", "The dense forest"],
    },
    correctAnswer: 0,
  },
  'debout-deux-pieds': {
    question: {
      fr: "Comment s'appelle le fait de se tenir debout et de marcher sur deux pieds ?",
      en: "What is standing up and walking on two feet called?",
    },
    options: {
      fr: ["La nage", "La bipédie", "Le vol"],
      en: ["Swimming", "Bipedalism", "Flying"],
    },
    correctAnswer: 1,
  },
  'artisan-pierres': {
    question: {
      fr: "Quel est le surnom de l'Homo Habilis qui a créé les premiers outils ?",
      en: "What is the nickname of Homo Habilis who created the first tools?",
    },
    options: {
      fr: ["L'homme rapide", "L'homme habile", "L'homme fort"],
      en: ["Handy man", "Fast man", "Strong man"],
    },
    correctAnswer: 1,
  },
  'dompteur-feu': {
    question: {
      fr: "Qu'est-ce que la nourriture cuite sur le feu a aidé à grandir chez les humains ?",
      en: "What did food cooked on the fire help grow in humans?",
    },
    options: {
      fr: ["Leurs cheveux", "Leur cerveau", "Leurs dents"],
      en: ["Their hair", "Their brain", "Their teeth"],
    },
    correctAnswer: 1,
  },
  'grand-voyage': {
    question: {
      fr: "Comment les premiers humains sont-ils passés de l'Asie à l'Amérique ?",
      en: "How did early humans cross from Asia to America?",
    },
    options: {
      fr: ["En marchant sur de la glace géante", "En avion", "En sous-marin"],
      en: ["By walking on giant ice", "By plane", "By submarine"],
    },
    correctAnswer: 0,
  },
  'cousins-neandertal': {
    question: {
      fr: "À quel âge de la Terre l'Homme de Néandertal était-il adapté ?",
      en: "Which Earth age was Neanderthal man adapted to?",
    },
    options: {
      fr: ["L'âge de glace", "L'âge du sable", "L'âge du feu"],
      en: ["The ice age", "The sand age", "The fire age"],
    },
    correctAnswer: 0,
  },
  'artistes-cavernes': {
    question: {
      fr: "Comment s'appelle la célèbre grotte française souvent appelée la 'Chapelle Sixtine de la préhistoire' ?",
      en: "What is the name of the famous French cave often called the 'Sistine Chapel of prehistory'?",
    },
    options: {
      fr: ["La grotte de Lascaux", "La grotte bleue", "La grotte de glace"],
      en: ["Lascaux Cave", "The blue cave", "The ice cave"],
    },
    correctAnswer: 0,
  },
  'premiers-villages': {
    question: {
      fr: "Qu'est-ce que les humains ont appris à faire pour pouvoir vivre dans les premiers villages fixes ?",
      en: "What did humans learn to do to be able to live in the first permanent villages?",
    },
    options: {
      fr: ["Piloter des avions", "L'agriculture et l'élevage", "Nager sous l'eau"],
      en: ["Fly planes", "Agriculture and farming", "Swim underwater"],
    },
    correctAnswer: 1,
  }
};
