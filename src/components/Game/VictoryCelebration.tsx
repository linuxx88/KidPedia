import React, { useState, useEffect } from 'react';
import { type Confetti } from '../../types/ui';
import styles from './VictoryCelebration.module.css';

interface VictoryCelebrationProps {
  gender: 'boy' | 'girl';
  onReset: () => void;
}

export const VictoryCelebration: React.FC<VictoryCelebrationProps> = ({ gender, onReset }) => {
  const [confettis, setConfettis] = useState<Confetti[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfettis(prev => {
      if (prev.length > 0) return prev;

      const colors = ['#f472b6', '#38bdf8', '#fbbf24', '#34d399', '#a855f7'];
      return Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    });
  }, []);


  return (
    <div className={styles.overlay}>
      {/* Pluie de confettis */}
      {confettis.map(c => (
        <div 
          key={c.id} 
          className={styles.confetti} 
          style={{ 
            left: c.left, 
            animationDelay: c.delay, 
            animationDuration: c.duration,
            backgroundColor: c.color
          }} 
        />
      ))}

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
