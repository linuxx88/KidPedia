import React from 'react';
import { DICE_COLORS, type DiceColor } from './DiceRoller.types';
import styles from './DiceRoller.module.css';

interface DiceRollerProps {
  value: number | null;
  isRolling: boolean;
  onRoll: () => void;
  disabled?: boolean;
  color?: DiceColor;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ 
  value, 
  isRolling, 
  onRoll, 
  disabled,
  color = DICE_COLORS[0]
}) => {
  // Déterminer la rotation finale en fonction de la valeur
  const getRotation = (val: number | null) => {
    switch (val) {
      case 1: return 'rotateX(0deg) rotateY(0deg)';
      case 2: return 'rotateX(90deg) rotateY(0deg)';
      case 3: return 'rotateX(0deg) rotateY(-90deg)';
      case 4: return 'rotateX(0deg) rotateY(90deg)';
      case 5: return 'rotateX(-90deg) rotateY(0deg)';
      case 6: return 'rotateX(0deg) rotateY(180deg)';
      default: return 'rotateX(45deg) rotateY(45deg)';
    }
  };

  const cssVars = {
    '--dice-color': color.bg,
    '--dice-text-color': color.text
  } as React.CSSProperties;

  return (
    <div 
      className={styles.diceContainer} 
      onClick={!disabled && !isRolling ? onRoll : undefined}
      style={cssVars}
    >
      <div 
        className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}
        style={{ transform: !isRolling ? getRotation(value) : undefined }}
      >
        <div className={`${styles.face} ${styles.front}`}>1</div>
        <div className={`${styles.face} ${styles.bottom}`}>2</div>
        <div className={`${styles.face} ${styles.right}`}>3</div>
        <div className={`${styles.face} ${styles.left}`}>4</div>
        <div className={`${styles.face} ${styles.top}`}>5</div>
        <div className={`${styles.face} ${styles.back}`}>6</div>
      </div>
    </div>
  );
};
