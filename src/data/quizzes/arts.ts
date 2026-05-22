import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  peinture: {
    question: {
      fr: "Quel artiste a peint 'La Nuit Étoilée' ?",
      en: "Which artist painted 'The Starry Night'?",
    },
    options: {
      fr: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh'],
      en: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh'],
    },
    correctAnswer: 2,
  },
  musique: {
    question: {
      fr: 'Quel instrument a des touches noires et blanches ?',
      en: 'Which instrument has black and white keys?',
    },
    options: {
      fr: ['La guitare', 'Le piano', 'La trompette'],
      en: ['The guitar', 'The piano', 'The trumpet'],
    },
    correctAnswer: 1,
  },
  cinema: {
    question: {
      fr: "Qu'utilise-t-on pour fabriquer un film ?",
      en: 'What is used to make a movie?',
    },
    options: {
      fr: ['Une brosse à dents', 'Une caméra', 'Un grille-pain'],
      en: ['A toothbrush', 'A camera', 'A toaster'],
    },
    correctAnswer: 1,
  },
  danse: {
    question: {
      fr: 'Comment appelle-t-on le fait de bouger en rythme ?',
      en: 'What do we call moving in rhythm?',
    },
    options: {
      fr: ['Dormir', 'La danse', 'Manger'],
      en: ['Sleeping', 'Dancing', 'Eating'],
    },
    correctAnswer: 1,
  },
  sculpture: {
    question: {
      fr: 'En quoi peut être faite une sculpture ?',
      en: 'What can a sculpture be made of?',
    },
    options: {
      fr: ['En pierre', 'En nuages', 'En chansons'],
      en: ['Stone', 'Clouds', 'Songs'],
    },
    correctAnswer: 0,
  },
  theatre: {
    question: {
      fr: 'Où jouent les acteurs de théâtre ?',
      en: 'Where do theater actors perform?',
    },
    options: {
      fr: ['Sur une scène', 'Dans une piscine', 'Dans un placard'],
      en: ['On a stage', 'In a pool', 'In a closet'],
    },
    correctAnswer: 0,
  },
  architecture: {
    question: {
      fr: 'Que dessine un architecte ?',
      en: 'What does an architect design?',
    },
    options: {
      fr: ['Des vêtements', 'Des bâtiments', 'Des gâteaux'],
      en: ['Clothes', 'Buildings', 'Cakes'],
    },
    correctAnswer: 1,
  },
  photographie: {
    question: {
      fr: 'Que capture un appareil photo ?',
      en: 'What does a camera capture?',
    },
    options: {
      fr: ['Des sons', 'De la lumière', 'Des odeurs'],
      en: ['Sounds', 'Light', 'Smells'],
    },
    correctAnswer: 1,
  },
  litterature: {
    question: {
      fr: 'Comment appelle-t-on celui qui écrit un livre ?',
      en: 'What do we call someone who writes a book?',
    },
    options: {
      fr: ['Un docteur', 'Un auteur', 'Un pilote'],
      en: ['A doctor', 'An author', 'A pilot'],
    },
    correctAnswer: 1,
  },
  'bd-manga': {
    question: {
      fr: "Comment s'appellent les cercles où les personnages parlent ?",
      en: 'What are the circles where characters talk called?',
    },
    options: {
      fr: ['Des ballons', 'Des bulles', 'Des nuages'],
      en: ['Balloons', 'Bubbles', 'Clouds'],
    },
    correctAnswer: 1,
  },
  cirque: {
    question: {
      fr: 'Qui nous fait rire au cirque ?',
      en: 'Who makes us laugh at the circus?',
    },
    options: {
      fr: ['Le lion', 'Le clown', 'Le photographe'],
      en: ['The lion', 'The clown', 'The photographer'],
    },
    correctAnswer: 1,
  },
  'jeu-video': {
    question: {
      fr: 'Pourquoi dit-on que le jeu vidéo est interactif ?',
      en: 'Why is it said that video games are interactive?',
    },
    options: {
      fr: [
        "Parce qu'on peut le regarder",
        "Parce que c'est toi qui joues et décides",
        "Parce que c'est blanc",
      ],
      en: [
        'Because you can watch it',
        'Because you are the one playing and deciding',
        "Because it's white",
      ],
    },
    correctAnswer: 1,
  }
};
