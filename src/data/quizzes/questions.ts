import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  'ciel-bleu': {
    question: {
      fr: "Quelle couleur s'éparpille le plus ?",
      en: 'Which color scatters the most?',
    },
    options: {
      fr: ['Vert', 'Bleu', 'Rose'],
      en: ['Green', 'Blue', 'Pink'],
    },
    correctAnswer: 1,
  },
  'mer-salee': {
    question: {
      fr: "D'où vient le sel ?",
      en: 'Where does the salt come from?',
    },
    options: {
      fr: ['Des baleines', 'Des roches', "De l'usine"],
      en: ['From whales', 'From rocks', 'From the factory'],
    },
    correctAnswer: 1,
  },
  'question-arc-en-ciel': {
    question: {
      fr: 'Que faut-il pour voir un arc-en-ciel ?',
      en: 'What is needed to see a rainbow?',
    },
    options: {
      fr: ['De la neige', 'Soleil et pluie', 'La nuit'],
      en: ['Snow', 'Sun and rain', 'Night'],
    },
    correctAnswer: 1,
  },
  'chat-ronronne': {
    question: {
      fr: "Quand est-ce qu'un chat ronronne le plus ?",
      en: 'When does a cat purr the most?',
    },
    options: {
      fr: ['Quand il a peur', 'Quand il est content', 'Quand il court'],
      en: ["When it's scared", "When it's happy", "When it's running"],
    },
    correctAnswer: 1,
  },
  'fourmis-jambes': {
    question: {
      fr: 'Pourquoi a-t-on des fourmis ?',
      en: 'Why do we get pins and needles?',
    },
    options: {
      fr: ['Des insectes nous piquent', "À cause d'une mauvaise position", 'On a mangé trop de sucre'],
      en: ['Insects are biting us', 'Because of a bad position', 'We ate too much sugar'],
    },
    correctAnswer: 1,
  },
  'fromage-trous': {
    question: {
      fr: "Qu'est-ce qui crée les trous dans le fromage ?",
      en: 'What creates the holes in the cheese?',
    },
    options: {
      fr: ['Des souris', 'Des bulles de gaz', 'Des coups de couteau'],
      en: ['Mice', 'Gas bubbles', 'Knife cuts'],
    },
    correctAnswer: 1,
  },
  'oignons-pleurer': {
    question: {
      fr: 'Pourquoi pleure-t-on avec les oignons ?',
      en: 'Why do onions make us cry?',
    },
    options: {
      fr: ["Parce qu'on est triste", "À cause d'un gaz invisible", "Parce que c'est pas bon"],
      en: ['Because we are sad', 'Because of an invisible gas', "Because it's not good"],
    },
    correctAnswer: 1,
  },
  'neige-blanche': {
    question: {
      fr: 'De quelle couleur est un seul flocon de neige ?',
      en: 'What color is a single snowflake?',
    },
    options: {
      fr: ['Bleu', 'Transparent', 'Jaune'],
      en: ['Blue', 'Transparent', 'Yellow'],
    },
    correctAnswer: 1,
  },
  'feuilles-tombent': {
    question: {
      fr: "Pourquoi l'arbre fait-il tomber ses feuilles ?",
      en: 'Why does the tree drop its leaves?',
    },
    options: {
      fr: ["Pour s'amuser", 'Pour économiser son énergie', "Parce qu'il pleut"],
      en: ['To have fun', 'To save energy', "Because it's raining"],
    },
    correctAnswer: 1,
  },
  'rayures-zebre': {
    question: {
      fr: 'À quoi servent les rayures du zèbre ?',
      en: "What are the zebra's stripes for?",
    },
    options: {
      fr: ['À se cacher', 'À se protéger des lions et des mouches', 'À avoir chaud'],
      en: ['To hide', 'To protect against lions and flies', 'To stay warm'],
    },
    correctAnswer: 1,
  },
  'reves-sommeil': {
    question: {
      fr: 'Que fait ton cerveau quand tu dors ?',
      en: 'What does your brain do while you sleep?',
    },
    options: {
      fr: ["Il s'arrête de travailler", 'Il range tes souvenirs', 'Il mange des bonbons'],
      en: ['It stops working', 'It organizes your memories', 'It eats candy'],
    },
    correctAnswer: 1,
  },
  'pourquoi-caca': {
    question: {
      fr: "C'est quoi, le caca ?",
      en: 'What is poop?',
    },
    options: {
      fr: ['De la nourriture magique', "Les déchets dont le corps n'a plus besoin", 'Des cailloux rigolos'],
      en: ['Magical food', 'The waste the body no longer needs', 'Funny rocks'],
    },
    correctAnswer: 1,
  }
};
