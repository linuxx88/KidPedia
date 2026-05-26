import { type TopicId } from '../types/domain';

export interface BilingualQuestion {
  fr: string;
  en: string;
}

export interface DiscussionStarter {
  question: BilingualQuestion;
}

/**
 * Dictionnaire de questions bilingues parent-enfant associées à des sujets précis.
 */
export const DISCUSSION_STARTERS: Partial<Record<TopicId, DiscussionStarter>> = {
  lion: {
    question: {
      fr: "Si tu devais rugir comme un lion pour montrer ta force ou ta joie, quand le ferais-tu ?",
      en: "If you had to roar like a lion to show your strength or joy, when would you do it?"
    }
  },
  elephant: {
    question: {
      fr: "Les éléphants s'entraident beaucoup en famille. Comment peut-on s'entraider dans notre famille aujourd'hui ?",
      en: "Elephants help each other a lot in families. How can we help each other in our family today?"
    }
  },
  soleil: {
    question: {
      fr: "Le Soleil brille pour tout le monde. Quelle petite action pourrais-tu faire aujourd'hui pour apporter un peu de chaleur à quelqu'un ?",
      en: "The Sun shines for everyone. What small action could you do today to bring some warmth to someone?"
    }
  },
  't-rex': {
    question: {
      fr: "Le T-Rex avait d'immenses dents mais de tout petits bras. Quelle est ta plus grande force, et y a-t-il quelque chose de difficile pour toi ?",
      en: "The T-Rex had huge teeth but very small arms. What is your greatest strength, and is there something difficult for you?"
    }
  },
  triceratops: {
    question: {
      fr: "Le Tricératops avait des cornes pour se défendre, mais il mangeait des plantes. Penses-tu qu'on peut être très fort tout en étant doux ?",
      en: "The Triceratops had horns to defend itself, but it ate plants. Do you think we can be very strong yet gentle?"
    }
  }
};

/**
 * Discussions de secours si aucun sujet n'a été exploré aujourd'hui.
 */
export const FALLBACK_DISCUSSIONS = [
  {
    topicId: 'general_learning' as TopicId,
    question: {
      fr: "Quelle est la chose la plus surprenante ou amusante que tu as découverte aujourd'hui ?",
      en: "What is the most surprising or fun thing you discovered today?"
    }
  },
  {
    topicId: 'general_curiosity' as TopicId,
    question: {
      fr: "Si tu pouvais voyager dans le temps ou monter dans une fusée spatiale, où aimerais-tu aller ?",
      en: "If you could travel through time or ride a space rocket, where would you like to go?"
    }
  },
  {
    topicId: 'general_creation' as TopicId,
    question: {
      fr: "Si tu devais inventer un animal rigolo ou magique, à quoi ressemblerait-il ?",
      en: "If you had to invent a funny or magical animal, what would it look like?"
    }
  }
];
