import React from 'react';
import { TransformedEmoji } from '../../../components/UI/TransformedEmoji';
import { type UnlockCondition } from '../../../data/accessories';
import styles from './GiftCard.module.css';

interface AccessoryType {
  id: string;
  name: { fr: string; en: string };
  icon: string;
  slot?: 'head' | 'companion';
  unlockCondition: UnlockCondition;
  price?: number;
}

interface GiftCardProps {
  accessory: AccessoryType;
  isUnlocked: boolean;
  isEquipped: boolean;
  language: 'fr' | 'en';
  tickets: number;
  hint: string;
  onToggleEquip: (id: string, isCurrentlyEquipped: boolean, slot?: 'head' | 'companion') => void;
  onSelectPurchase: (target: { id: string; name: string; price: number; icon: string; isCompanion: boolean }) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({
  accessory,
  isUnlocked,
  isEquipped,
  language,
  tickets,
  hint,
  onToggleEquip,
  onSelectPurchase,
}) => {
  const name = accessory.name[language];

  return (
    <div 
      className={`${styles.giftCard} ${isUnlocked ? styles.unlocked : styles.locked}`}
      aria-label={isUnlocked ? name : `Cadeau mystère: ${hint}`}
    >
      <div className={styles.iconWrapper}>
        {isUnlocked ? (
          <span className={styles.icon}>
            <TransformedEmoji emoji={accessory.icon} size="large" />
          </span>
        ) : (
          <span className={styles.lockIcon}>❓</span>
        )}
      </div>
      
      <h3 className={styles.giftName}>
        {isUnlocked ? name : (accessory.price !== undefined ? name : '???')}
      </h3>

      {isUnlocked ? (
        <button
          className={`${styles.btnGift} ${isEquipped ? styles.btnGiftActive : styles.btnGiftPrimary}`}
          onClick={() => onToggleEquip(accessory.id, isEquipped, accessory.slot)}
          aria-label={isEquipped ? `Enlever ${name}` : `Porter ${name}`}
        >
          {isEquipped ? (
            language === 'fr' ? 'Enlever ❌' : 'Remove ❌'
          ) : (
            language === 'fr' ? 'Porter' : 'Wear'
          )}
        </button>
      ) : (
        <div className={styles.lockHintWrapper}>
          <span className={styles.lockEmoji}>🔒</span>
          <p className={styles.lockHintText}>{hint}</p>
          {accessory.price !== undefined && (
            <button
              className={styles.btnBuyAccessory}
              disabled={tickets < accessory.price}
              onClick={() => onSelectPurchase({
                id: accessory.id,
                name,
                price: accessory.price!,
                icon: accessory.icon,
                isCompanion: accessory.slot === 'companion'
              })}
            >
              {language === 'fr' ? `Acheter (${accessory.price} 🎫)` : `Buy (${accessory.price} 🎫)`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
