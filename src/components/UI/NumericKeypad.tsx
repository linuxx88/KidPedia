import React from 'react';
import styles from './ParentalGate.module.css';
import type { PuzzleOption } from '../../utils/parentalGate';

interface NumericKeypadProps {
  options: PuzzleOption[];
  onOptionClick: (option: PuzzleOption) => void;
  language: 'fr' | 'en';
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  options,
  onOptionClick,
  language
}) => {
  return (
    <div className={styles.optionsGrid}>
      {options.map((option, idx) => (
        <button
          key={`${option.emoji}-${idx}`}
          className={styles.puzzleCard}
          onClick={() => onOptionClick(option)}
          aria-label={option.label[language]}
        >
          <span className={styles.optionEmoji}>{option.emoji}</span>
          <span className={styles.optionLabel}>{option.label[language]}</span>
        </button>
      ))}
    </div>
  );
};
