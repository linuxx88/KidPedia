import React from 'react';
import { AppOverlay } from '../UI/AppOverlay';
import { AppButton } from '../UI/AppButton';
import { StorytellerButton } from '../UI/StorytellerButton';
import { useStoryteller } from '../../hooks/useStoryteller';
import { useSettingsStore } from '../../store/useSettingsStore';
import { type Topic } from '../../data/topics/types';
import styles from './LockedTopicOverlay.module.css';

interface LockedTopicOverlayProps {
  lockedTopic: Topic | null;
  onClose: () => void;
}

export const LockedTopicOverlay: React.FC<LockedTopicOverlayProps> = ({
  lockedTopic,
  onClose,
}) => {
  const { labels, language } = useSettingsStore();
  const { speak, stopStory } = useStoryteller();

  const handleClose = () => {
    stopStory();
    onClose();
  };

  return (
    <AppOverlay
      isOpen={!!lockedTopic}
      onClose={handleClose}
      closeLabel={labels.common.close}
      title={lockedTopic?.title[language]}
      data-testid="locked-topic-popup"
    >
      {lockedTopic && (
        <div className={styles.popupContent}>
          <StorytellerButton
            onClick={() =>
              speak(
                `${labels.discovery.owlWhispers}. ${labels.discovery.lockedTopicMessage(
                  lockedTopic.title[language]
                )}`
              )
            }
          />
          <h3 className={styles.owlTitle}>{labels.discovery.owlWhispers}</h3>
          <p className={styles.popupText}>
            {labels.discovery.lockedTopicMessage(lockedTopic.title[language])}
          </p>
          <AppButton onClick={handleClose} className={styles.explorerBtnMap}>
            {language === 'fr' ? 'Compris ! 🚀' : 'Got it! 🚀'}
          </AppButton>
        </div>
      )}
    </AppOverlay>
  );
};
