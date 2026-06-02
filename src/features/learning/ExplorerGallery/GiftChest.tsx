import React from 'react';
import { AvatarDisplay } from '../../../components/UI/AvatarDisplay';
import styles from './GiftChest.module.css';

interface GiftChestProps {
  avatar: string;
  playerName: string;
  equippedAccessoryId: string | null;
  equippedCompanionId: string | null;
  language: 'fr' | 'en';
  isChestOpened: boolean;
  isEligibleToOpen: boolean;
  progressPercent: number;
  totalXP: number;
  xpNeeded: number;
  onOpenChest: () => void;
  onToggleEquip: (id: string, isCurrentlyEquipped: boolean, slot?: 'head' | 'companion') => void;
}

export const GiftChest: React.FC<GiftChestProps> = ({
  avatar,
  playerName,
  equippedAccessoryId,
  equippedCompanionId,
  language,
  isChestOpened,
  isEligibleToOpen,
  progressPercent,
  totalXP,
  xpNeeded,
  onOpenChest,
  onToggleEquip,
}) => {
  return (
    <section className={styles.chestSection}>
      <div className={styles.avatarPreview}>
        <AvatarDisplay 
          avatar={avatar} 
          name={playerName}
          accessoryId={equippedAccessoryId} 
          companionId={equippedCompanionId}
          size="large" 
          animate={true}
        />
        <p className={styles.avatarLabel}>
          {language === 'fr' ? 'Mon Explorateur' : 'My Explorer'}
        </p>
      </div>

      <div className={styles.chestDisplayCard}>
        {!isChestOpened && isEligibleToOpen && (
          <div className={styles.chestAction} onClick={onOpenChest} role="button" tabIndex={0} aria-label="Ouvrir le coffre magique">
            <div className={`${styles.chestEmoji} ${styles.pulsing}`}>🎁</div>
            <h2 className={styles.chestTitle}>
              {language === 'fr' ? 'Un cadeau magique t\'attend !' : 'A magical gift awaits!'}
            </h2>
            <p className={styles.chestHint}>
              {language === 'fr' ? 'Clique sur le coffre pour l\'ouvrir ! ✨' : 'Click the chest to open it! ✨'}
            </p>
          </div>
        )}

        {isChestOpened && (
          <div className={styles.chestRevealed}>
            <div className={styles.haloEffect}>
              <span className={styles.revealedAccessoryIcon}>🤠</span>
            </div>
            <h2 className={styles.revealedTitle}>
              {language === 'fr' ? 'Chapeau de Brousse débloqué !' : 'Explorer Hat Unlocked!'}
            </h2>
            <button
              className={`${styles.btnEquipLarge} ${equippedAccessoryId === 'explorer-hat' ? styles.btnEquipActive : styles.btnEquipPrimary}`}
              onClick={() => onToggleEquip('explorer-hat', equippedAccessoryId === 'explorer-hat')}
            >
              {equippedAccessoryId === 'explorer-hat' ? (
                language === 'fr' ? 'Retirer de mon avatar ❌' : 'Remove from avatar ❌'
              ) : (
                language === 'fr' ? 'Mettre sur mon avatar ! 🤠' : 'Equip on avatar! 🤠'
              )}
            </button>
          </div>
        )}

        {!isEligibleToOpen && (
          <div className={styles.chestLocked}>
            <div className={styles.lockedChestIcon}>🔒🎁</div>
            <h2 className={styles.lockedTitle}>
              {language === 'fr' ? 'Le Coffre des Secrets' : 'The Secrets Chest'}
            </h2>
            
            {/* 3D Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBarWrapper}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className={styles.progressLabels}>
                <span>{totalXP} XP</span>
                <span>1000 XP</span>
              </div>
            </div>

            <p className={styles.motivationalMessage}>
              {language === 'fr' 
                ? `Plus que ${xpNeeded} 🌟 pour ouvrir ton coffre !` 
                : `Only ${xpNeeded} 🌟 left to open your chest!`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
