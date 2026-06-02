import React, { useEffect } from 'react';
import { launchCelebration } from '../../utils/celebrations';
import styles from './VictoryCelebration.module.css';

interface VictoryCelebrationProps {
  gender: 'boy' | 'girl';
  onReset: () => void;
}

export const VictoryCelebration: React.FC<VictoryCelebrationProps> = ({ gender, onReset }) => {
  useEffect(() => {
    launchCelebration();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.trophyWrapper}>
          <span className={styles.trophy}>🏆</span>
          <span className={styles.star}>⭐</span>
          <span className={styles.star2}>⭐</span>
        </div>

        <h2 className={styles.title}>
          {gender === 'girl' ? 'BRAVO CHAMPIONNE !' : 'BRAVO CHAMPION !'}
        </h2>
        
        <p className={styles.message}>
          Tu as traversé toute la savane et relevé tous les défis !
        </p>

        <button className={styles.resetBtn} onClick={onReset}>
          Rejouer une partie ! 🔄
        </button>
      </div>
    </div>
  );
};

