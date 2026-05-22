import React, { useState } from 'react';
import styles from './ParentalGate.module.css';
import { AppButton } from './AppButton';
import { useSettingsStore } from '../../store/useSettingsStore';

interface ParentalGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const generateChallenge = () => {
  const n1 = Math.floor(Math.random() * 8) + 2;
  const n2 = Math.floor(Math.random() * 8) + 2;
  return { num1: n1, num2: n2, result: n1 * n2 };
};

/**
 * ParentalGate - Barrière de sécurité pour l'accès aux paramètres ou au dashboard parents.
 * Demande une opération mathématique simple pour prouver qu'on est un adulte.
 */
export const ParentalGate: React.FC<ParentalGateProps> = ({ onSuccess, onCancel }) => {
  const labels = useSettingsStore(state => state.labels);
  const t = labels.parents;

  const [challenge, setChallenge] = useState(generateChallenge);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(value, 10) === challenge.result) {
      onSuccess();
    } else {
      setError(true);
      setValue('');
      // Régénérer un défi après erreur
      setChallenge(generateChallenge());
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onCancel}>✕</button>
        <h2 className={styles.title}>🔒 {t.gateTitle}</h2>
        <p className={styles.instruction}>
          {t.gateInstruction}
        </p>
        
        <div className={styles.challengeBox}>
          <span className={styles.mathText}>{challenge.num1} × {challenge.num2} = ?</span>
        </div>
 
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="number" 
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder={t.gatePlaceholder}
            autoFocus
          />
          {error && <p className={styles.errorMsg}>{t.gateError}</p>}
          
          <div className={styles.actions}>
            <AppButton type="submit" variant="primary" className={styles.submitBtn}>
              {t.gateValidate}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
};
