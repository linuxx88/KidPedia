import React, { useState } from 'react';
import { useProfileStore } from '../../store/useProfileStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useDiscoveryStore } from '../../store/useDiscoveryStore';
import { useSafariStore } from '../../store/useSafariStore';
import { useGiftStore } from '../../store/useGiftStore';
import { useEnvironmentStore } from '../../store/useEnvironmentStore';
import { useQuizChampionshipStore } from '../../store/useQuizChampionshipStore';
import { useQuizStore } from '../../store/useQuizStore';
import { ParentalGate } from '../../features/parents';
import styles from './ResetButton.module.css';

interface ResetButtonProps {
  className?: string;
  mode?: 'all' | 'championship';
}

export const ResetButton: React.FC<ResetButtonProps> = ({ className = '', mode = 'all' }) => {
  const { language } = useSettingsStore();
  const [showGate, setShowGate] = useState(false);

  const handleResetClick = () => {
    setShowGate(true);
  };

  const handleGateSuccess = async () => {
    setShowGate(false);

    const isFr = language === 'fr';
    if (mode === 'championship') {
      const confirmMessage = isFr
        ? "⚠️ Voulez-vous vraiment effacer tous les scores du Grand Quiz des Champions ?"
        : "⚠️ Do you really want to clear all high scores of the Grand Quiz of Champions?";

      if (window.confirm(confirmMessage)) {
        try {
          useQuizChampionshipStore.getState().resetScores();
        } catch (error) {
          console.error("Error resetting championship scores:", error);
        }
      }
    } else {
      const confirmMessage = isFr
        ? "⚠️ Attention ! Voulez-vous vraiment réinitialiser entièrement KidPedia ? Tous les profils, médailles, trophées et progressions seront définitivement effacés."
        : "⚠️ Warning! Do you really want to fully reset KidPedia? All profiles, medals, trophies, and progressions will be permanently erased.";

      if (window.confirm(confirmMessage)) {
        try {
          // 1. Clear IndexedDB persistent storages
          if (useSettingsStore.persist?.clearStorage) {
            await useSettingsStore.persist.clearStorage();
          }
          if (useProgressionStore.persist?.clearStorage) {
            await useProgressionStore.persist.clearStorage();
          }
          if (useQuizChampionshipStore.persist?.clearStorage) {
            await useQuizChampionshipStore.persist.clearStorage();
          }

          // 2. Clear localStorage
          localStorage.clear();

          // 3. Reset all Zustand stores
          useProfileStore.getState().reset();
          useSettingsStore.getState().reset();
          useProgressionStore.getState().reset();
          useDiscoveryStore.getState().reset();
          useSafariStore.getState().reset();
          useGiftStore.getState().reset();
          useEnvironmentStore.getState().reset();
          useQuizChampionshipStore.getState().resetGame();
          useQuizStore.getState().resetQuiz();

          // 4. Force hard reload to re-initialize application in clean state
          window.location.href = '/';
        } catch (error) {
          console.error("Error resetting application state:", error);
        }
      }
    }
  };

  const handleGateCancel = () => {
    setShowGate(false);
  };

  const buttonLabel = mode === 'championship'
    ? (language === 'fr' ? 'Réinitialiser les scores' : 'Reset scores')
    : (language === 'fr' ? 'Réinitialiser KidPedia' : 'Reset KidPedia');

  const buttonAria = mode === 'championship'
    ? (language === 'fr' ? "Réinitialiser les scores du championnat" : "Reset championship scores")
    : (language === 'fr' ? "Réinitialiser entièrement l'application" : "Reset the application completely");

  return (
    <>
      <button
        onClick={handleResetClick}
        className={`${styles.resetButton} ${className}`}
        type="button"
        aria-label={buttonAria}
      >
        <span className={styles.resetIcon}>🗑️</span>
        <span>{buttonLabel}</span>
      </button>

      {showGate && (
        <ParentalGate
          onSuccess={handleGateSuccess}
          onCancel={handleGateCancel}
        />
      )}
    </>
  );
};
