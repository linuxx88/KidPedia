import React from 'react';
import { ACCESSORIES_DB } from '../../data/accessories';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { AvatarDisplay } from '../UI/AvatarDisplay';
import { usePlayerStore } from '../../store/usePlayerStore';
import styles from './Wardrobe.module.css';

const EMPTY_ARRAY: string[] = [];

/**
 * Composant Wardrobe
 * Permet à l'enfant de voir et d'équiper ses accessoires débloqués.
 */
export const Wardrobe: React.FC = () => {
  const { language, labels } = useSettingsStore();
  const { avatar, playerName } = usePlayerStore();
  
  // Correction des sélecteurs pour éviter les boucles infinies
  const activeProfileId = useProgressionStore(state => state.activeProfileId);
  
  const unlockedIds = useProgressionStore(state => 
    activeProfileId ? (state.progressions[activeProfileId]?.unlockedAccessories || EMPTY_ARRAY) : EMPTY_ARRAY
  );
  
  const equippedId = useProgressionStore(state => 
    activeProfileId ? (state.progressions[activeProfileId]?.equippedAccessoryId || null) : null
  );
  const equipAccessory = useProgressionStore(state => state.equipAccessory);

  const unlockedAccessories = ACCESSORIES_DB.filter(acc => unlockedIds.includes(acc.id));

  return (
    <div className={styles.wardrobeContainer}>
      <h3 className={styles.title}>
        <span className={styles.icon}>👕</span> {labels.badges.wardrobeTitle}
      </h3>

      <div className={styles.previewSection}>
        <AvatarDisplay 
          avatar={avatar} 
          name={playerName}
          accessoryId={equippedId} 
          size="large" 
          animate={true}
        />
      </div>

      {unlockedAccessories.length > 0 ? (
        <div className={styles.grid}>
          {/* Option : Retirer l'accessoire */}
          <button 
            className={`${styles.item} ${!equippedId ? styles.active : ''}`}
            onClick={() => equipAccessory(null)}
          >
            <div className={styles.itemIcon}>❌</div>
            <span className={styles.itemName}>
              {language === 'fr' ? 'Aucun' : 'None'}
            </span>
          </button>

          {unlockedAccessories.map(acc => (
            <button 
              key={acc.id}
              className={`${styles.item} ${equippedId === acc.id ? styles.active : ''}`}
              onClick={() => equipAccessory(acc.id)}
            >
              <div className={styles.itemIcon}>{acc.icon}</div>
              <span className={styles.itemName}>{acc.name[language]}</span>
              {equippedId === acc.id && (
                <span className={styles.equippedBadge}>{labels.badges.equipped}</span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMsg}>{labels.badges.noAccessories}</p>
      )}
    </div>
  );
};
