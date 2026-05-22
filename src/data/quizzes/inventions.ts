import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  ampoule: {
    question: {
      fr: "Qui a inventé l'ampoule électrique ?",
      en: 'Who invented the light bulb?',
    },
    options: {
      fr: ['Thomas Edison', 'Isaac Newton', 'Léonard de Vinci'],
      en: ['Thomas Edison', 'Isaac Newton', 'Leonardo da Vinci'],
    },
    correctAnswer: 0,
  },
  imprimerie: {
    question: {
      fr: "Pourquoi l'imprimerie était-elle une invention importante ?",
      en: 'Why was the printing press an important invention?',
    },
    options: {
      fr: ['Pour faire de la musique', 'Pour imprimer des livres plus vite', 'Pour faire voler les gens'],
      en: ['To make music', 'To print books faster', 'To make people fly'],
    },
    correctAnswer: 1,
  },
  avion: {
    question: {
      fr: 'En quelle année a eu lieu le premier vol motorisé ?',
      en: 'In what year did the first motorized flight take place?',
    },
    options: {
      fr: ['1800', '1903', '2020'],
      en: ['1800', '1903', '2020'],
    },
    correctAnswer: 1,
  },
  telephone: {
    question: {
      fr: "Qui est l'inventeur du téléphone ?",
      en: 'Who is the inventor of the telephone?',
    },
    options: {
      fr: ['Alexander Graham Bell', 'Steve Jobs', 'Albert Einstein'],
      en: ['Alexander Graham Bell', 'Steve Jobs', 'Albert Einstein'],
    },
    correctAnswer: 0,
  },
  internet: {
    question: {
      fr: 'À quoi sert principalement Internet ?',
      en: 'What is the main purpose of the Internet?',
    },
    options: {
      fr: ['À faire cuire des pâtes', 'À relier les ordinatrices entre eux', 'À fabriquer des chaussures'],
      en: ['To cook pasta', 'To connect computers together', 'To make shoes'],
    },
    correctAnswer: 1,
  },
  roue: {
    question: {
      fr: 'Il y a combien de temps environ la roue a-t-elle été inventée ?',
      en: 'About how long ago was the wheel invented?',
    },
    options: {
      fr: ['100 ans', '5 000 ans', "1 million d'années"],
      en: ['100 years', '5,000 years', '1 million years'],
    },
    correctAnswer: 1,
  },
  velo: {
    question: {
      fr: 'Comment avançait-on sur le tout premier vélo ?',
      en: 'How did people move on the first bicycle?',
    },
    options: {
      fr: ['Avec un moteur', 'En poussant avec ses pieds', 'Avec des voiles'],
      en: ['With a motor', 'By pushing with feet', 'With sails'],
    },
    correctAnswer: 1,
  },
  'appareil-photo': {
    question: {
      fr: "Qu'est-ce qui permet de capturer l'image dans un appareil photo ?",
      en: 'What allows the image to be captured in a camera?',
    },
    options: {
      fr: ['Le vent', 'La lumière', 'Le son'],
      en: ['Wind', 'Light', 'Sound'],
    },
    correctAnswer: 1,
  },
  telescope: {
    question: {
      fr: "Qui a été l'un des premiers à utiliser un télescope pour regarder le ciel ?",
      en: 'Who was one of the first to use a telescope to look at the sky?',
    },
    options: {
      fr: ['Galilée', 'Christophe Colomb', 'Napoléon'],
      en: ['Galileo', 'Christopher Columbus', 'Napoleon'],
    },
    correctAnswer: 0,
  },
  boussole: {
    question: {
      fr: "Où pointe toujours l'aiguille de la boussole ?",
      en: 'Where does the compass needle always point?',
    },
    options: {
      fr: ['Vers le Sud', 'Vers le Nord', 'Vers la maison'],
      en: ['South', 'North', 'Home'],
    },
    correctAnswer: 1,
  },
  microscope: {
    question: {
      fr: 'À quoi sert un microscope ?',
      en: 'What is a microscope for?',
    },
    options: {
      fr: ['À voir les étoiles', 'À voir des choses minuscules', 'À écouter de la musique'],
      en: ['To see stars', 'To see tiny things', 'To listen to music'],
    },
    correctAnswer: 1,
  },
  radio: {
    question: {
      fr: "Comment les sons de la radio voyagent-ils dans l'air ?",
      en: 'How do radio sounds travel through the air?',
    },
    options: {
      fr: ['Par des fils', 'Par des ondes invisibles', 'Par des oiseaux'],
      en: ['Through wires', 'Through invisible waves', 'Through birds'],
    },
    correctAnswer: 1,
  }
};
