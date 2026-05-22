import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  cerveau: {
    question: {
      fr: 'À quoi ressemble ton cerveau ?',
      en: 'What is your brain like?',
    },
    options: {
      fr: ['À un muscle', 'À un ordinateur super puissant', 'À un ballon'],
      en: ['A muscle', 'A super-powerful computer', 'A balloon'],
    },
    correctAnswer: 1,
  },
  coeur: {
    question: {
      fr: 'Que fait le cœur dans ton corps ?',
      en: 'What does the heart do in your body?',
    },
    options: {
      fr: ['Il fabrique de la nourriture', 'Il pompe le sang', "Il t'aide à chanter"],
      en: ['It makes food', 'It pumps blood', 'It helps you sing'],
    },
    correctAnswer: 1,
  },
  sang: {
    question: {
      fr: "Comment s'appellent les petits tuyaux où voyage le sang ?",
      en: 'What are the small tubes where blood travels called?',
    },
    options: {
      fr: ['Des spaghettis', 'Des vaisseaux sanguins', 'Des toboggans'],
      en: ['Spaghetti', 'Blood vessels', 'Slides'],
    },
    correctAnswer: 1,
  },
  os: {
    question: {
      fr: "Comment s'appelle l'ensemble de tous tes os ?",
      en: 'What is the set of all your bones called?',
    },
    options: {
      fr: ['Une armure', 'Le squelette', 'Une cabane'],
      en: ['Armor', 'The skeleton', 'A hut'],
    },
    correctAnswer: 1,
  },
  poumons: {
    question: {
      fr: "Que se passe-t-il quand tu inspires de l'air ?",
      en: 'What happens when you breathe in air?',
    },
    options: {
      fr: ['Tes poumons se dégonflent', 'Tes poumons se gonflent', 'Rien du tout'],
      en: ['Your lungs deflate', 'Your lungs inflate', 'Nothing at all'],
    },
    correctAnswer: 1,
  },
  estomac: {
    question: {
      fr: "Que fait l'estomac ?",
      en: 'What does the stomach do?',
    },
    options: {
      fr: [
        'Il fabrique tes pensées',
        'Il transforme la nourriture en énergie',
        'Il fait pousser tes cheveux',
      ],
      en: ['It makes your thoughts', 'It turns food into energy', 'It makes your hair grow'],
    },
    correctAnswer: 1,
  },
  muscles: {
    question: {
      fr: 'Combien de muscles as-tu environ dans ton corps ?',
      en: 'How many muscles do you have in your body approximately?',
    },
    options: {
      fr: ['10 muscles', 'Plus de 600 muscles', 'Seulement 2'],
      en: ['10 muscles', 'More than 600 muscles', 'Only 2'],
    },
    correctAnswer: 1,
  },
  peau: {
    question: {
      fr: 'Quel est le plus grand organe de ton corps ?',
      en: 'What is the largest organ in your body?',
    },
    options: {
      fr: ['Le cœur', 'Le cerveau', 'La peau'],
      en: ['The heart', 'The brain', 'The skin'],
    },
    correctAnswer: 2,
  },
  dents: {
    question: {
      fr: 'Pourquoi faut-il se brosser les dents ?',
      en: 'Why should you brush your teeth?',
    },
    options: {
      fr: [
        "Pour qu'elles brillent",
        'Pour chasser les microbes et éviter les caries',
        'Pour changer de couleur',
      ],
      en: ['To make them shine', 'To chase away germs and avoid cavities', 'To change color'],
    },
    correctAnswer: 1,
  },
  yeux: {
    question: {
      fr: 'Que captent tes yeux pour envoyer des images ?',
      en: 'What do your eyes capture to send images?',
    },
    options: {
      fr: ['Du son', 'De la lumière', 'De la poussière'],
      en: ['Sound', 'Light', 'Dust'],
    },
    correctAnswer: 1,
  },
  oreilles: {
    question: {
      fr: 'À quoi sert le tympan dans ton oreille ?',
      en: 'What is the eardrum in your ear for?',
    },
    options: {
      fr: ['À faire de la musique', 'À vibrer quand il reçoit un son', "À boucher l'oreille"],
      en: ['To make music', 'To vibrate when it receives a sound', 'To plug the ear'],
    },
    correctAnswer: 1,
  },
  nez: {
    question: {
      fr: 'À quoi sert principalement ton nez ?',
      en: 'What is your nose primarily for?',
    },
    options: {
      fr: ['À manger', 'À respirer et sentir les odeurs', 'À écouter la radio'],
      en: ['Eating', 'Breathing and smelling odors', 'Listening to the radio'],
    },
    correctAnswer: 1,
  }
};
