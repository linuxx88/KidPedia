import React from 'react';
import { type MapMarker } from '../../../data/mapData';
import { type Labels } from '../../../locales/types';
import { AppButton } from '../../../components/UI/AppButton';
import { StorytellerButton } from '../../../components/UI/StorytellerButton';
import styles from '../TreasureMap.module.css';

interface MapOverlayContentProps {
  selectedPoint: MapMarker;
  language: 'fr' | 'en';
  labels: Labels;
  unlocked: boolean;
  playClickSound: () => void;
  stopStory: () => void;
  speak: (message: string) => void;
  navigate: (path: string) => void;
  onClose: () => void;
}

export const MapOverlayContent: React.FC<MapOverlayContentProps> = ({
  selectedPoint,
  language,
  labels,
  unlocked,
  playClickSound,
  stopStory,
  speak,
  navigate,
  onClose,
}) => {
  if (unlocked) {
    return (
      <div className={styles.popupContent}>
        <span className={styles.popupIcon} aria-hidden="true">{selectedPoint.icon}</span>
        <p className={styles.popupText}>{labels.discovery.discoveryMessage}</p>
        <AppButton 
          onClick={() => {
            playClickSound();
            navigate(`/topic/${selectedPoint.topicId}`);
          }}
          className={styles.explorerBtnMap}
        >
          {labels.discovery.explore(selectedPoint.title[language])}
        </AppButton>
      </div>
    );
  }

  return (
    <div className={styles.popupContent}>
      <StorytellerButton 
        onClick={() => {
          const message = language === 'fr'
            ? `Le Sage Hibou te chuchote... Oh oh ! ${selectedPoint.title.fr} est encore secret. Réussis les aventures précédentes pour obtenir la clé magique ! 🗝️✨`
            : `The Wise Owl whispers... Oops! ${selectedPoint.title.en} is still secret. Succeed in the previous adventures to get the magic key! 🗝️✨`;
          speak(message);
        }}
      />
      <h3 className={styles.owlTitle}>
        {language === 'fr' ? 'Le Sage Hibou te chuchote...' : 'The Wise Owl whispers...'}
      </h3>
      <p className={styles.popupText}>
        {language === 'fr' 
          ? `Oh oh ! ${selectedPoint.title.fr} est encore secret. Réussis les aventures précédentes pour obtenir la clé magique ! 🗝️✨`
          : `Oops! ${selectedPoint.title.en} is still secret. Succeed in the previous adventures to get the magic key! 🗝️✨`}
      </p>
      <AppButton 
        onClick={() => {
          stopStory();
          playClickSound();
          onClose();
        }}
        className={styles.explorerBtnMap}
      >
        {language === 'fr' ? 'Compris ! 🚀' : 'Got it! 🚀'}
      </AppButton>
    </div>
  );
};
