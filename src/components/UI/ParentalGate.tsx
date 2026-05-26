import React, { useState } from 'react';
import styles from './ParentalGate.module.css';
import { useSettingsStore } from '../../store/useSettingsStore';

interface PuzzleOption {
  emoji: string;
  label: { fr: string; en: string };
  isCorrect: boolean;
}

interface PuzzleChallenge {
  type: string;
  instruction: { fr: string; en: string };
  targetEmoji?: string;
  targetLabel?: { fr: string; en: string };
  questionContent?: { fr: string; en: string };
  options: PuzzleOption[];
}

const PUZZLE_BANK: PuzzleChallenge[] = [
  // 1. Baby to Parent
  {
    type: 'baby-parent',
    instruction: {
      fr: "Trouve le parent de ce bébé animal !",
      en: "Find the parent of this baby animal!"
    },
    targetEmoji: "🐶",
    targetLabel: { fr: "Chiot", en: "Puppy" },
    options: [
      { emoji: "🐕", label: { fr: "Chien", en: "Dog" }, isCorrect: true },
      { emoji: "🐈", label: { fr: "Chat", en: "Cat" }, isCorrect: false },
      { emoji: "🐄", label: { fr: "Vache", en: "Cow" }, isCorrect: false }
    ]
  },
  {
    type: 'baby-parent',
    instruction: {
      fr: "Trouve le parent de ce petit poussin !",
      en: "Find the parent of this baby chick!"
    },
    targetEmoji: "🐣",
    targetLabel: { fr: "Poussin", en: "Baby chick" },
    options: [
      { emoji: "🐔", label: { fr: "Poule", en: "Hen" }, isCorrect: true },
      { emoji: "🦆", label: { fr: "Canard", en: "Duck" }, isCorrect: false },
      { emoji: "🦉", label: { fr: "Hibou", en: "Owl" }, isCorrect: false }
    ]
  },
  {
    type: 'baby-parent',
    instruction: {
      fr: "Trouve le parent de ce mignon lionceau !",
      en: "Find the parent of this lion cub!"
    },
    targetEmoji: "🦁",
    targetLabel: { fr: "Lionceau", en: "Lion cub" },
    options: [
      { emoji: "🦁", label: { fr: "Lion", en: "Lion" }, isCorrect: true },
      { emoji: "🐻", label: { fr: "Ours", en: "Bear" }, isCorrect: false },
      { emoji: "🐺", label: { fr: "Loup", en: "Wolf" }, isCorrect: false }
    ]
  },
  {
    type: 'baby-parent',
    instruction: {
      fr: "Trouve le parent de ce chaton !",
      en: "Find the parent of this kitten!"
    },
    targetEmoji: "🐱",
    targetLabel: { fr: "Chaton", en: "Kitten" },
    options: [
      { emoji: "🐈", label: { fr: "Chat", en: "Cat" }, isCorrect: true },
      { emoji: "🐇", label: { fr: "Lapin", en: "Rabbit" }, isCorrect: false },
      { emoji: "🐴", label: { fr: "Cheval", en: "Horse" }, isCorrect: false }
    ]
  },
  
  // 2. Find the Odd One Out
  {
    type: 'odd-one-out',
    instruction: {
      fr: "Trouve l'intrus (celui qui n'est pas vert/légume) !",
      en: "Find the odd one out (not green/vegetable)!"
    },
    options: [
      { emoji: "🍎", label: { fr: "Pomme rouge", en: "Red apple" }, isCorrect: true },
      { emoji: "🥦", label: { fr: "Brocoli", en: "Broccoli" }, isCorrect: false },
      { emoji: "🥑", label: { fr: "Avocat", en: "Avocado" }, isCorrect: false },
      { emoji: "🥒", label: { fr: "Concombre", en: "Cucumber" }, isCorrect: false }
    ]
  },
  {
    type: 'odd-one-out',
    instruction: {
      fr: "Trouve l'intrus qui ne peut pas voler !",
      en: "Find the odd one out that cannot fly!"
    },
    options: [
      { emoji: "⛵", label: { fr: "Voilier", en: "Sailboat" }, isCorrect: true },
      { emoji: "✈️", label: { fr: "Avion", en: "Airplane" }, isCorrect: false },
      { emoji: "🚁", label: { fr: "Hélicoptère", en: "Helicopter" }, isCorrect: false },
      { emoji: "🚀", label: { fr: "Fusée", en: "Rocket" }, isCorrect: false }
    ]
  },
  {
    type: 'odd-one-out',
    instruction: {
      fr: "Trouve l'intrus qui ne vit pas dans l'océan !",
      en: "Find the odd one out that does not live in the ocean!"
    },
    options: [
      { emoji: "🦅", label: { fr: "Aigle", en: "Eagle" }, isCorrect: true },
      { emoji: "🐠", label: { fr: "Poisson", en: "Fish" }, isCorrect: false },
      { emoji: "🐬", label: { fr: "Dauphin", en: "Dolphin" }, isCorrect: false },
      { emoji: "🦈", label: { fr: "Requin", en: "Shark" }, isCorrect: false }
    ]
  },
  {
    type: 'odd-one-out',
    instruction: {
      fr: "Trouve l'intrus chaud caché parmi le froid !",
      en: "Find the hot item hidden among the cold items!"
    },
    options: [
      { emoji: "🔥", label: { fr: "Feu", en: "Fire" }, isCorrect: true },
      { emoji: "🧊", label: { fr: "Glaçon", en: "Ice Cube" }, isCorrect: false },
      { emoji: "⛄", label: { fr: "Bonhomme de neige", en: "Snowman" }, isCorrect: false },
      { emoji: "🍦", label: { fr: "Glace", en: "Ice Cream" }, isCorrect: false }
    ]
  },

  // 3. Logical Sequence
  {
    type: 'sequence',
    instruction: {
      fr: "Complète le motif logique !",
      en: "Complete the logical pattern!"
    },
    questionContent: { fr: "🌙 ➡️ ⭐ ➡️ 🌙 ➡️ ⭐ ➡️ ?", en: "🌙 ➡️ ⭐ ➡️ 🌙 ➡️ ⭐ ➡️ ?" },
    options: [
      { emoji: "🌙", label: { fr: "Lune", en: "Moon" }, isCorrect: true },
      { emoji: "☀️", label: { fr: "Soleil", en: "Sun" }, isCorrect: false },
      { emoji: "☁️", label: { fr: "Nuage", en: "Cloud" }, isCorrect: false }
    ]
  },
  {
    type: 'sequence',
    instruction: {
      fr: "Complète le motif logique !",
      en: "Complete the logical pattern!"
    },
    questionContent: { fr: "🍎 ➡️ 🍌 ➡️ 🍎 ➡️ 🍌 ➡️ ?", en: "🍎 ➡️ 🍌 ➡️ 🍎 ➡️ 🍌 ➡️ ?" },
    options: [
      { emoji: "🍎", label: { fr: "Pomme", en: "Apple" }, isCorrect: true },
      { emoji: "🍇", label: { fr: "Raisin", en: "Grapes" }, isCorrect: false },
      { emoji: "🥦", label: { fr: "Brocoli", en: "Broccoli" }, isCorrect: false }
    ]
  },
  {
    type: 'sequence',
    instruction: {
      fr: "Complète le motif logique !",
      en: "Complete the logical pattern!"
    },
    questionContent: { fr: "🔴 ➡️ 🔵 ➡️ 🔴 ➡️ 🔵 ➡️ ?", en: "🔴 ➡️ 🔵 ➡️ 🔴 ➡️ 🔵 ➡️ ?" },
    options: [
      { emoji: "🔴", label: { fr: "Rond rouge", en: "Red circle" }, isCorrect: true },
      { emoji: "🟢", label: { fr: "Rond vert", en: "Green circle" }, isCorrect: false },
      { emoji: "🟡", label: { fr: "Rond jaune", en: "Yellow circle" }, isCorrect: false }
    ]
  },

  // 4. Opposites
  {
    type: 'opposite',
    instruction: {
      fr: "Trouve le contraire du jour !",
      en: "Find the opposite of day!"
    },
    targetEmoji: "☀️",
    targetLabel: { fr: "Jour / Soleil", en: "Day / Sun" },
    options: [
      { emoji: "🌙", label: { fr: "Nuit (Lune)", en: "Night (Moon)" }, isCorrect: true },
      { emoji: "🌈", label: { fr: "Arc-en-ciel", en: "Rainbow" }, isCorrect: false },
      { emoji: "☁️", label: { fr: "Nuage", en: "Cloud" }, isCorrect: false }
    ]
  },
  {
    type: 'opposite',
    instruction: {
      fr: "Trouve le contraire du feu brûlant !",
      en: "Find the opposite of hot fire!"
    },
    targetEmoji: "🔥",
    targetLabel: { fr: "Feu chaud", en: "Hot fire" },
    options: [
      { emoji: "❄️", label: { fr: "Flocon de neige glacé", en: "Icy snowflake" }, isCorrect: true },
      { emoji: "🌋", label: { fr: "Volcan", en: "Volcano" }, isCorrect: false },
      { emoji: "⚡", label: { fr: "Éclair", en: "Lightning" }, isCorrect: false }
    ]
  },
  {
    type: 'opposite',
    instruction: {
      fr: "Trouve le contraire de la flèche haut !",
      en: "Find the opposite of the up arrow!"
    },
    targetEmoji: "⬆️",
    targetLabel: { fr: "Haut", en: "Up" },
    options: [
      { emoji: "⬇️", label: { fr: "Bas", en: "Down" }, isCorrect: true },
      { emoji: "➡️", label: { fr: "Droite", en: "Right" }, isCorrect: false },
      { emoji: "⬅️", label: { fr: "Gauche", en: "Left" }, isCorrect: false }
    ]
  },

  // 5. Habitats
  {
    type: 'habitat',
    instruction: {
      fr: "Où habite ce gentil petit poisson ?",
      en: "Where does this nice little fish live?"
    },
    targetEmoji: "🐟",
    targetLabel: { fr: "Poisson", en: "Fish" },
    options: [
      { emoji: "🌊", label: { fr: "Mer / Océan", en: "Sea / Ocean" }, isCorrect: true },
      { emoji: "🌵", label: { fr: "Désert", en: "Desert" }, isCorrect: false },
      { emoji: "🌳", label: { fr: "Forêt / Arbre", en: "Forest / Tree" }, isCorrect: false }
    ]
  },
  {
    type: 'habitat',
    instruction: {
      fr: "Où habite ce chameau résistant ?",
      en: "Where does this camel live?"
    },
    targetEmoji: "🐫",
    targetLabel: { fr: "Chameau", en: "Camel" },
    options: [
      { emoji: "🌵", label: { fr: "Désert", en: "Desert" }, isCorrect: true },
      { emoji: "🌊", label: { fr: "Mer / Océan", en: "Sea / Ocean" }, isCorrect: false },
      { emoji: "❄️", label: { fr: "Neige / Pôle Nord", en: "Snow / North Pole" }, isCorrect: false }
    ]
  },
  {
    type: 'habitat',
    instruction: {
      fr: "Dans quel habitat vit ce singe agile ?",
      en: "In which habitat does this agile monkey live?"
    },
    targetEmoji: "🐒",
    targetLabel: { fr: "Singe", en: "Monkey" },
    options: [
      { emoji: "🌳", label: { fr: "Dans les arbres", en: "In the trees" }, isCorrect: true },
      { emoji: "🌊", label: { fr: "Dans l'océan", en: "In the ocean" }, isCorrect: false },
      { emoji: "🏔️", label: { fr: "Sur les sommets enneigés", en: "On snowy peaks" }, isCorrect: false }
    ]
  }
];

const generatePuzzleChallenge = (): PuzzleChallenge => {
  const randomIndex = Math.floor(Math.random() * PUZZLE_BANK.length);
  const rawChallenge = PUZZLE_BANK[randomIndex];
  
  // Shuffle options to prevent click spamming and learning by absolute position
  const shuffledOptions = [...rawChallenge.options].sort(() => Math.random() - 0.5);
  
  return {
    ...rawChallenge,
    options: shuffledOptions
  };
};

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const { labels, language } = useSettingsStore();
  const t = labels.parents;

  const [challenge, setChallenge] = useState<PuzzleChallenge>(() => generatePuzzleChallenge());
  const [error, setError] = useState(false);

  const handleOptionClick = (option: PuzzleOption) => {
    if (option.isCorrect) {
      onSuccess();
    } else {
      setError(true);
      
      // Automatically scramble and generate a brand new puzzle to block random tapping
      setTimeout(() => {
        setChallenge(generatePuzzleChallenge());
        setError(false);
      }, 500);
    }
  };

  if (!challenge) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${error ? styles.shake : ''}`}>
        <button 
          className={styles.closeBtn} 
          onClick={onCancel}
          aria-label={language === 'fr' ? "Fermer la barrière de sécurité" : "Close security barrier"}
        >
          ✕
        </button>
        
        <h2 className={styles.title}>🔒 {t.gateTitle}</h2>
        
        <p className={styles.instruction}>
          {challenge.instruction[language]}
        </p>

        {/* Visual Target Area */}
        <div className={styles.targetContainer}>
          {challenge.questionContent ? (
            <div className={styles.sequenceText} aria-label={challenge.questionContent[language]}>
              {challenge.questionContent[language]}
            </div>
          ) : challenge.targetEmoji ? (
            <div className={styles.targetBubble} aria-label={challenge.targetLabel ? challenge.targetLabel[language] : challenge.targetEmoji}>
              <span className={styles.targetEmoji}>{challenge.targetEmoji}</span>
              {challenge.targetLabel && (
                <span className={styles.targetLabel}>{challenge.targetLabel[language]}</span>
              )}
            </div>
          ) : null}
        </div>

        {/* Tactile Puzzle Options */}
        <div className={styles.optionsGrid}>
          {challenge.options.map((option, idx) => (
            <button
              key={`${option.emoji}-${idx}`}
              className={styles.puzzleCard}
              onClick={() => handleOptionClick(option)}
              aria-label={option.label[language]}
            >
              <span className={styles.optionEmoji}>{option.emoji}</span>
              <span className={styles.optionLabel}>{option.label[language]}</span>
            </button>
          ))}
        </div>

        {error && (
          <p className={styles.errorMsg} role="alert">
            {t.gateError}
          </p>
        )}
      </div>
    </div>
  );
};
