import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  't-rex': {
    question: {
      fr: 'À quoi ressemblait la taille des dents du T-Rex ?',
      en: "What was the size of a T-Rex's teeth like?",
    },
    options: {
      fr: ['Des crayons', 'Des bananes', 'Des grains de riz'],
      en: ['Pencils', 'Bananas', 'Rice grains'],
    },
    correctAnswer: 1,
  },
  triceratops: {
    question: {
      fr: 'Que mangeait le Tricératops ?',
      en: 'What did the Triceratops eat?',
    },
    options: {
      fr: ['De la viande', 'Des plantes', 'Des glaces'],
      en: ['Meat', 'Plants', 'Ice cream'],
    },
    correctAnswer: 1,
  },
  stegosaure: {
    question: {
      fr: 'Quelle était la taille du cerveau du Stégosaure ?',
      en: "How big was the Stegosaurus's brain?",
    },
    options: {
      fr: ['Gros comme un ballon', 'Gros comme une noix', 'Gros comme une pomme'],
      en: ['Big as a ball', 'Big as a walnut', 'Big as an apple'],
    },
    correctAnswer: 1,
  },
  velociraptor: {
    question: {
      fr: "Qu'est-ce que le Vélociraptor avait probablement sur son corps ?",
      en: 'What did the Velociraptor probably have on its body?',
    },
    options: {
      fr: ['Des écailles', 'Des plumes', 'De la laine'],
      en: ['Scales', 'Feathers', 'Wool'],
    },
    correctAnswer: 1,
  },
  pterodactyle: {
    question: {
      fr: 'Que mangeait principalement le Ptérodactyle ?',
      en: 'What did the Pterodactyl mainly eat?',
    },
    options: {
      fr: ['Des fruits', 'Du poisson', 'Du fromage'],
      en: ['Fruit', 'Fish', 'Cheese'],
    },
    correctAnswer: 1,
  },
  brachiosaure: {
    question: {
      fr: "Jusqu'à quel étage d'un immeuble le Brachiosaure pouvait-il regarder ?",
      en: 'Up to which floor of a building could the Brachiosaurus look?',
    },
    options: {
      fr: ['Le 1er étage', 'Le 4ème étage', 'Le 10ème étage'],
      en: ['1st floor', '4th floor', '10th floor'],
    },
    correctAnswer: 1,
  },
  ankylosaure: {
    question: {
      fr: "Qu'est-ce que l'Ankylosaure avait au bout de sa queue ?",
      en: 'What did the Ankylosaurus have at the end of its tail?',
    },
    options: {
      fr: ['Une fleur', "Une massue d'os", 'Un sifflet'],
      en: ['A flower', 'A bone club', 'A whistle'],
    },
    correctAnswer: 1,
  },
  diplodocus: {
    question: {
      fr: 'Comment le Diplodocus utilisait-il sa queue ?',
      en: 'How did the Diplodocus use its tail?',
    },
    options: {
      fr: ['Pour nager', 'Comme un fouet', 'Pour faire coucou'],
      en: ['To swim', 'Like a whip', 'To wave hello'],
    },
    correctAnswer: 1,
  },
  spinosaure: {
    question: {
      fr: 'Où le Spinosaure passait-il beaucoup de temps ?',
      en: 'Where did the Spinosaurus spend a lot of time?',
    },
    options: {
      fr: ['Dans les arbres', "Dans l'eau", 'Dans les grottes'],
      en: ['In trees', 'In water', 'In caves'],
    },
    correctAnswer: 1,
  },
  parasaurolophus: {
    question: {
      fr: 'À quoi servait la crête du Parasaurolophus ?',
      en: "What was the Parasaurolophus's crest for?",
    },
    options: {
      fr: [
        'À porter un chapeau',
        'À faire des bruits comme une trompette',
        'À ranger de la nourriture',
      ],
      en: ['To wear a hat', 'To make noises like a trumpet', 'To store food'],
    },
    correctAnswer: 1,
  },
  iguanodon: {
    question: {
      fr: "Qu'est-ce que l'Iguanodon avait de spécial sur ses mains ?",
      en: "What was special about the Iguanodon's hands?",
    },
    options: {
      fr: ['Des gants', "Un pouce en forme d'éperon pointu", 'Des nageoires'],
      en: ['Gloves', 'A sharp spur-like thumb', 'Flippers'],
    },
    correctAnswer: 1,
  },
  mosasaure: {
    question: {
      fr: 'Où vivait le Mosasaure ?',
      en: 'Where did the Mosasaurus live?',
    },
    options: {
      fr: ['Dans la jungle', "Dans l'océan", 'Sur les montagnes'],
      en: ['In the jungle', 'In the ocean', 'On mountains'],
    },
    correctAnswer: 1,
  }
};
