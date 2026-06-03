import React, { useState, useEffect } from 'react';
import styles from './ParentalGate.module.css';
import { useSettingsStore } from '../../../../store/useSettingsStore';
import type { 
  PuzzleChallenge, 
  PuzzleOption 
} from '../../../../utils/parentalGate';
import { 
  generatePuzzleChallenge, 
  validatePuzzleChallenge 
} from '../../../../utils/parentalGate';
import { NumericKeypad } from './NumericKeypad';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const { labels, language } = useSettingsStore();
  const t = labels.parents;

  const [challenge, setChallenge] = useState<PuzzleChallenge>(() => generatePuzzleChallenge());
  const [successCount, setSuccessCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setChallenge(generatePuzzleChallenge());
      setError(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [error]);

  const handleOptionClick = (option: PuzzleOption) => {
    if (error) return;

    if (validatePuzzleChallenge(option)) {
      const nextCount = successCount + 1;
      if (nextCount >= 3) {
        onSuccess();
      } else {
        setSuccessCount(nextCount);
        setChallenge(generatePuzzleChallenge());
      }
    } else {
      setError(true);
      setSuccessCount(0);
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
        
        {/* Visual Progress Indicator */}
        <div 
          className={styles.progressContainer} 
          aria-label={language === 'fr' ? `Étape ${successCount} sur 3` : `Step ${successCount} of 3`}
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`${styles.progressDot} ${
                idx < successCount 
                  ? styles.progressDotActive 
                  : error 
                    ? styles.progressDotError 
                    : ''
              }`}
            />
          ))}
        </div>
        
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
