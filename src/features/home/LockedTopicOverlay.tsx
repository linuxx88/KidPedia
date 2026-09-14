import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppOverlay } from '../../components/UI/AppOverlay';
import { AppButton } from '../../components/UI/AppButton';
import { StorytellerButton } from '../../components/UI/StorytellerButton';
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
  const navigate = useNavigate();
  const { labels, language } = useSettingsStore();
  const { speak, stopStory } = useStoryteller();

  const handleClose = () => {
    stopStory();
    onClose();
  };

  const handleEarnStars = () => {
    stopStory();
    onClose();
    navigate('/?category=animaux');
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
          <div className={styles.buttonGroup}>
            <AppButton onClick={handleEarnStars} variant="primary" className={styles.explorerBtnMap}>
              {language === 'fr' ? '🌟 Gagner des étoiles !' : '🌟 Earn stars!'}
            </AppButton>
            <AppButton onClick={handleClose} variant="secondary" className={styles.explorerBtnMap}>
              {language === 'fr' ? 'Compris ! 🚀' : 'Got it! 🚀'}
            </AppButton>
          </div>
        </div>
      )}
    </AppOverlay>
  );
};
