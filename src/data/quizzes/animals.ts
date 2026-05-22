import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  lion: {
    question: {
      fr: 'Comment appelle-t-on le groupe de lions qui vivent ensemble ?',
      en: 'What is a group of lions called?',
    },
    options: {
      fr: ['Une équipe', 'Une troupe', 'Une chorale'],
      en: ['A team', 'A pride', 'A choir'],
    },
    correctAnswer: 1,
    hint: {
      fr: "C'est un mot qui commence par la lettre 'T'. On dit aussi une troupe de théâtre !",
      en: "It starts with the letter 'P'. Like the word pride, it means being proud!"
    }
  },
  elephant: {
    question: {
      fr: "Qu'est-ce que les éléphants ne savent pas faire ?",
      en: 'What can elephants not do?',
    },
    options: {
      fr: ['Nager', 'Manger avec leur nez', 'Sauter'],
      en: ['Swim', 'Eat with their nose', 'Jump'],
    },
    correctAnswer: 2,
    hint: {
      fr: "Pense à tes pieds... Ils sont très lourds et ne peuvent pas décoller du sol en même temps !",
      en: "Think about your feet... They are very heavy and cannot leave the ground at the same time!"
    }
  },
  tigre: {
    question: {
      fr: "Est-ce que les tigres aiment l'eau ?",
      en: 'Do tigers like water?',
    },
    options: {
      fr: ['Non, ils détestent ça', 'Oui, ils adorent nager', 'Seulement pour boire'],
      en: ["No, they hate it", "Yes, they love swimming", "Only for drinking"],
    },
    correctAnswer: 1,
  },
  singe: {
    question: {
      fr: 'Comment les singes font-ils pour tenir en équilibre dans les arbres ?',
      en: 'How do monkeys balance in trees?',
    },
    options: {
      fr: ['Avec des chaussures spéciales', 'Grâce à leur queue', 'En tenant un parapluie'],
      en: ['With special shoes', 'Thanks to their tail', 'By holding an umbrella'],
    },
    correctAnswer: 1,
  },
  lapin: {
    question: {
      fr: "Qu'est-ce qui ne s'arrête jamais de pousser chez le lapin ?",
      en: 'What never stops growing in a rabbit?',
    },
    options: {
      fr: ['Ses oreilles', 'Ses dents', 'Sa queue'],
      en: ['Its ears', 'Its teeth', 'Its tail'],
    },
    correctAnswer: 1,
  },
  tortue: {
    question: {
      fr: 'À quoi sert la carapace de la tortue ?',
      en: "What is the turtle's shell for?",
    },
    options: {
      fr: ['À faire du sport', 'À se protéger', 'À ranger ses jouets'],
      en: ['For sports', 'To protect itself', 'To store toys'],
    },
    correctAnswer: 1,
  },
  kangourou: {
    question: {
      fr: 'Où la maman kangourou garde-t-elle son bébé ?',
      en: 'Where does the mother kangaroo keep her baby?',
    },
    options: {
      fr: ['Dans un sac à dos', 'Dans sa poche', 'Sur sa tête'],
      en: ['In a backpack', 'In her pouch', 'On her head'],
    },
    correctAnswer: 1,
  },
  dauphin: {
    question: {
      fr: 'Comment le dauphin communique-t-il ?',
      en: 'How does the dolphin communicate?',
    },
    options: {
      fr: ['En criant', 'Avec des cliquetis', 'En chantant'],
      en: ['By shouting', 'With clicks', 'By singing'],
    },
    correctAnswer: 1,
  },
  girafe: {
    question: {
      fr: 'De quelle couleur est la langue de la girafe ?',
      en: 'What color is the giraffe\'s tongue?',
    },
    options: {
      fr: ['Rose', 'Bleue', 'Verte'],
      en: ['Pink', 'Blue', 'Green'],
    },
    correctAnswer: 1,
  },
  panda: {
    question: {
      fr: 'Que mange principalement le panda ?',
      en: 'What does the panda mainly eat?',
    },
    options: {
      fr: ['Des pommes', 'Du bambou', 'Du miel'],
      en: ['Apples', 'Bamboo', 'Honey'],
    },
    correctAnswer: 1,
  },
  pingouin: {
    question: {
      fr: 'Est-ce que le manchot peut voler dans le ciel ?',
      en: 'Can the penguin fly in the sky?',
    },
    options: {
      fr: ['Oui', 'Non, il nage', 'Seulement bébé'],
      en: ['Yes', 'No, it swims', 'Only as a baby'],
    },
    correctAnswer: 1,
  },
  loup: {
    question: {
      fr: "Comment s'appelle la famille du loup ?",
      en: 'What is the wolf family called?',
    },
    options: {
      fr: ['Une meute', 'Une classe', 'Un club'],
      en: ['A pack', 'A class', 'A club'],
    },
    correctAnswer: 0,
  }
};
