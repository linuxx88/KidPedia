import React from 'react';
import styles from './WizardHelp.module.css';

interface WizardHelpProps {
  language: 'fr' | 'en';
  showWizardHelp: boolean;
  setShowWizardHelp: React.Dispatch<React.SetStateAction<boolean>>;
  isMagicWandActive: boolean;
  funFact: string;
  handleWizardClick: (e: React.MouseEvent) => void;
  playSound: (type: string) => void;
  stopStory: () => void;
}

export const WizardHelp: React.FC<WizardHelpProps> = ({
  language,
  showWizardHelp,
  setShowWizardHelp,
  isMagicWandActive,
  funFact,
  handleWizardClick,
  playSound,
  stopStory,
}) => {
  return (
    <div className={styles.wizardHelpContainer}>
      <button 
        type="button"
        className={styles.wizardHelpBtn}
        onClick={() => {
          stopStory();
          playSound('click');
          setShowWizardHelp(prev => !prev);
        }}
        data-testid="wizard-help-btn"
      >
        🧙‍♂️ {language === 'fr' ? "Demander l'aide du Magicien" : "Ask the Wizard for help"}
      </button>

      {showWizardHelp && (
        <div className={styles.wizardHelpBox} data-testid="wizard-help-box">
          <div className={styles.wizardHeader}>
            <span className={styles.wizardIcon}>✨🧙‍♂️✨</span>
            <h4 className={styles.wizardTitle}>
              {language === 'fr' ? "L'astuce magique du Magicien" : "The Wizard's Magic Hint"}
            </h4>
          </div>
          <p 
            className={styles.wizardText}
            onClick={handleWizardClick}
            style={{ 
              cursor: isMagicWandActive ? 'help' : 'default',
              textDecoration: isMagicWandActive ? 'underline dotted' : 'none'
            }}
          >
            "{funFact}"
          </p>
        </div>
      )}
    </div>
  );
};
