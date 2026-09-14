import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { encyclopedia } from '../../data/topics';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import { getMedalIcon } from '../../utils/quizMessages';
import BackButton from '../../components/UI/BackButton';
import { GiftButton } from './Elements/GiftButton';
import type { EarnedBadge } from '../../types/domain';
import { type Topic } from '../../data/topics/types';
import styles from './ExplorerGallery.module.css';

interface ExplorerGalleryProps {
  onTopicClick?: (topicId: string) => void;
  onBack?: () => void;
}

const EMPTY_BADGES: EarnedBadge[] = [];

/**
 * ExplorerGallery - A ludic sticker album to visualize discovery progression.
 */
export function ExplorerGallery({ onTopicClick, onBack }: ExplorerGalleryProps) {
  const navigate = useNavigate();
  const { labels, language } = useSettingsStore();
  const { playSound } = useAudioFeedback();
  
  const activeProfileId = useProgressionStore(state => state.activeProfileId);
  const badges = useProgressionStore(state => 
    activeProfileId ? state.progressions[activeProfileId]?.badges : EMPTY_BADGES
  ) || EMPTY_BADGES;

  const allTopics: Topic[] = useMemo(() => encyclopedia, []);

  const handleStickerClick = (topicId: string, isUnlocked: boolean, audioFile?: string) => {
    if (isUnlocked) {
      if (audioFile) {
        playSound(audioFile);
      } else {
        playSound('click');
      }
      onTopicClick?.(topicId);
    } else {
      playSound('pop');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleGiftsClick = () => {
    playSound('woosh');
    navigate('/gifts');
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeaderBar}>
        <div className={styles.navSection}>
          <BackButton onClick={handleBack} className={styles.headerBtn} />
        </div>

        <div className={styles.titleSection}>
          <div className={styles.titleRow}>
            <span className={styles.headerIcon} role="img" aria-hidden="true">📔</span>
            <h1 className={styles.galleryTitle}>{labels.gallery.title}</h1>
          </div>
          <p className={styles.gallerySubtitle}>{labels.gallery.subtitle}</p>
        </div>

        <div className={styles.rightSection}>
          <GiftButton onClick={handleGiftsClick} className={styles.headerBtn} />
        </div>
      </div>

      <div className={styles.stickerGrid}>
        {allTopics.map((topic) => {
          const earned = badges.find(b => b.id === topic.id);
          const isUnlocked = !!earned;
          const name = topic.title[language];

          return (
            <div key={topic.id} className={styles.stickerWrapper}>
              <button
                className={`${styles.sticker} ${isUnlocked ? styles.unlocked : styles.locked}`}
                onClick={() => handleStickerClick(topic.id, isUnlocked, topic.audioFile)}
                aria-label={
                  isUnlocked
                    ? labels.gallery.unlockedAria(name)
                    : labels.gallery.lockedAria(name)
                }
              >
                <span className={styles.icon}>{topic.icon}</span>
                {!isUnlocked && <span className={styles.questionMark}>?</span>}
                {isUnlocked && (
                  <>
                    <span className={styles.name}>{name}</span>
                    {earned && (
                      <span className={styles.medalIcon}>{getMedalIcon(earned.medal)}</span>
                    )}
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {allTopics.length === 0 && (
        <p className={styles.empty}>{labels.gallery.empty}</p>
      )}
    </div>
  );
}
