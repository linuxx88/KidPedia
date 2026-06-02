import React, { useState, useEffect } from 'react';
import styles from './ParentalGate.module.css';
import { useSettingsStore } from '../../store/useSettingsStore';
import type { 
  PuzzleChallenge, 
  PuzzleOption 
} from '../../utils/parentalGate';
import { 
  generatePuzzleChallenge, 
  validatePuzzleChallenge 
} from '../../utils/parentalGate';
import { NumericKeypad } from './NumericKeypad';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const { labels, language } = useSettingsStore();
  const t = labels.parents;

  const [challenge, setChallenge] = useState<PuzzleChallenge>(() => generatePuzzleChallenge());
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setChallenge(generatePuzzleChallenge());
      setError(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [error]);

  const handleOptionClick = (option: PuzzleOption) => {
    if (validatePuzzleChallenge(option)) {
      onSuccess();
    } else {
      setError(true);
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
        <NumericKeypad 
          options={challenge.options} 
          onOptionClick={handleOptionClick} 
          language={language} 
        />

        {error && (
          <p className={styles.errorMsg} role="alert">
            {t.gateError}
          </p>
        )}
      </div>
    </div>
  );
};
