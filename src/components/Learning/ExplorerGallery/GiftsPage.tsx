import React from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { PageHeader } from '../../Layout/PageHeader';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { useAudioFeedback } from '../../../hooks/useAudioFeedback';
import { useProgressionStore } from '../../../store/useProgressionStore';
import { useGiftStore } from '../../../store/useGiftStore';
import { usePlayerStore } from '../../../store/usePlayerStore';
import { AvatarDisplay } from '../../UI/AvatarDisplay';
import { TransformedEmoji } from '../../UI/TransformedEmoji';
import { ACCESSORIES_DB, type UnlockCondition } from '../../../data/accessories';
import { encyclopedia } from '../../../data/topics';
import styles from './GiftsPage.module.css';

const getUnlockHint = (condition: UnlockCondition, language: 'fr' | 'en'): string => {
  if (condition.type === 'xp') {
    return language === 'fr' 
      ? `Atteins ${condition.value} XP` 
      : `Reach ${condition.value} XP`;
  }
  if (condition.type === 'specific_topic') {
    const topic = encyclopedia.find(t => t.id === condition.value);
    const title = topic ? topic.title[language] : condition.value;
    const medalName = language === 'fr'
      ? (condition.medal === 'gold' ? 'd\'Or' : condition.medal === 'silver' ? 'd\'Argent' : 'de Bronze')
      : condition.medal;
    return language === 'fr'
      ? `Obtiens une médaille ${medalName} dans "${title}"`
      : `Get a ${medalName} medal in "${title}"`;
  }
  if (condition.type === 'count') {
    const medalName = language === 'fr'
      ? (condition.medal === 'gold' ? 'd\'Or' : condition.medal === 'silver' ? 'd\'Argent' : 'de Bronze')
      : condition.medal;
    const catName = language === 'fr'
      ? (condition.category === 'espace' ? 'l\'Espace' : condition.category === 'animaux' ? 'les Animaux' : condition.category === 'dinosaures' ? 'les Dinosaures' : condition.category === 'nature' ? 'la Nature' : condition.category === 'histoire' ? 'l\'Histoire' : condition.category === 'corps-humain' ? 'le Corps Humain' : condition.category)
      : condition.category;
    return language === 'fr'
      ? `Obtiens ${condition.value} médailles ${medalName} dans ${catName}`
      : `Get ${condition.value} ${medalName} medals in ${catName}`;
  }
  return '';
};

export const GiftsPage: React.FC = () => {
  const navigate = useNavigate();
  const { labels, language } = useSettingsStore();
  const { playSound } = useAudioFeedback();
  
  const { avatar, playerName } = usePlayerStore();
  
  // Progression & Profile Stores
  const unlockedAccessories = useProgressionStore(state => state.getUnlockedAccessories());
  const equippedAccessoryId = useProgressionStore(state => state.getEquippedAccessoryId());
  const equippedCompanionId = useProgressionStore(state => state.getEquippedCompanionId());
  const equipAccessory = useProgressionStore(state => state.equipAccessory);
  const equipCompanion = useProgressionStore(state => state.equipCompanion);
  const totalXP = useProgressionStore(state => state.getTotalXP());
  const tickets = useProgressionStore(state => state.getTickets());
  const buyAccessory = useProgressionStore(state => state.buyAccessory);

  // State for purchase confirmation modal
  const [purchaseTarget, setPurchaseTarget] = React.useState<{ id: string; name: string; price: number; icon: string; isCompanion: boolean } | null>(null);

  const confirmPurchase = (id: string, price: number) => {
    const success = buyAccessory(id, price);
    if (success) {
      playSound('medal');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    setPurchaseTarget(null);
  };

  // Gift Store
  const { isChestOpened, isEligibleToOpen, checkEligibility, openChest } = useGiftStore();

  React.useEffect(() => {
    checkEligibility(totalXP);
  }, [totalXP, checkEligibility]);

  const handleBack = () => {
    playSound('bloop');
    navigate('/gallery');
  };

  const handleToggleEquip = (id: string, isCurrentlyEquipped: boolean, slot?: 'head' | 'companion') => {
    if (slot === 'companion') {
      if (isCurrentlyEquipped) {
        playSound('pop');
        equipCompanion(null);
      } else {
        playSound('medal');
        equipCompanion(id);
      }
    } else {
      if (isCurrentlyEquipped) {
        playSound('pop');
        equipAccessory(null);
      } else {
        playSound('medal');
        equipAccessory(id);
      }
    }
  };

  const handleOpenChest = () => {
    if (isEligibleToOpen && !isChestOpened) {
      playSound('medal');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      openChest();
      // Auto-equip the explorer-hat when opening the chest
      equipAccessory('explorer-hat');
    }
  };

  const progressPercent = Math.min(100, (totalXP / 1000) * 100);
  const xpNeeded = Math.max(0, 1000 - totalXP);

  return (
    <div className={styles.giftsPage}>
      <PageHeader 
        title={labels.badges.unlockedTitle || "Mes Cadeaux"}
        icon="🎁"
        onBack={handleBack}
      />

      <main className={styles.mainContent}>
        {/* Solde de tickets premium */}
        <div className={styles.ticketsBalanceContainer}>
          <div className={styles.ticketsPill}>
            <span className={styles.ticketsIcon}>🎫</span>
            <span className={styles.ticketsCount} data-testid="gifts-ticket-count">
              {tickets}
            </span>
            <span className={styles.ticketsLabel}>
              {language === 'fr' ? 'Tickets' : 'Tickets'}
            </span>
          </div>
        </div>

        {/* SECTION COFFRE MAGIQUE */}
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
              <div className={styles.chestAction} onClick={handleOpenChest} role="button" tabIndex={0} aria-label="Ouvrir le coffre magique">
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
                  onClick={() => handleToggleEquip('explorer-hat', equippedAccessoryId === 'explorer-hat')}
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

        {/* SECTION GRILLE MES TRESORS */}
        <section className={styles.treasuresSection}>
          <h2 className={styles.treasuresTitle}>
            {language === 'fr' ? '👑 Mes Trésors' : '👑 My Treasures'}
          </h2>
          
          <div className={styles.treasuresColumns}>
            {/* Colonne Chapeaux */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>
                {language === 'fr' ? '🎩 Chapeaux & Masques' : '🎩 Hats & Masks'}
              </h3>
              <div className={styles.giftsGrid}>
                {ACCESSORIES_DB.filter(acc => acc.slot !== 'companion').map((accessory) => {
                  const isUnlocked = unlockedAccessories.includes(accessory.id);
                  const isEquipped = equippedAccessoryId === accessory.id;
                  const name = accessory.name[language];
                  const hint = getUnlockHint(accessory.unlockCondition, language);

                  return (
                    <div 
                      key={accessory.id} 
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
                          onClick={() => handleToggleEquip(accessory.id, isEquipped, accessory.slot)}
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
                              onClick={() => setPurchaseTarget({
                                id: accessory.id,
                                name,
                                price: accessory.price!,
                                icon: accessory.icon,
                                isCompanion: false
                              })}
                            >
                              {language === 'fr' ? `Acheter (${accessory.price} 🎫)` : `Buy (${accessory.price} 🎫)`}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Colonne Familiers */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>
                {language === 'fr' ? '🐶 Mes Familiers' : '🐶 My Pets'}
              </h3>
              <div className={styles.giftsGrid}>
                {ACCESSORIES_DB.filter(acc => acc.slot === 'companion').map((accessory) => {
                  const isUnlocked = unlockedAccessories.includes(accessory.id);
                  const isEquipped = equippedCompanionId === accessory.id;
                  const name = accessory.name[language];
                  const hint = getUnlockHint(accessory.unlockCondition, language);

                  return (
                    <div 
                      key={accessory.id} 
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
                          onClick={() => handleToggleEquip(accessory.id, isEquipped, accessory.slot)}
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
                              onClick={() => setPurchaseTarget({
                                id: accessory.id,
                                name,
                                price: accessory.price!,
                                icon: accessory.icon,
                                isCompanion: true
                              })}
                            >
                              {language === 'fr' ? `Acheter (${accessory.price} 🎫)` : `Buy (${accessory.price} 🎫)`}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          {language === 'fr'
            ? 'Plus tu explores, plus tu gagnes de cadeaux ! 🎖️'
            : 'The more you explore, the more gifts you earn! 🎖️'}
        </p>
      </footer>

      {purchaseTarget && (
        <div className={styles.modalOverlay} onClick={() => setPurchaseTarget(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalGiftIcon}>{purchaseTarget.icon}</span>
            </div>
            <h3 className={styles.modalTitle}>
              {language === 'fr' 
                ? `Veux-tu acheter "${purchaseTarget.name}" pour ${purchaseTarget.price} tickets ? 🎫`
                : `Do you want to buy "${purchaseTarget.name}" for ${purchaseTarget.price} tickets? 🎫`}
            </h3>
            <p className={styles.modalSubtitle}>
              {language === 'fr'
                ? 'Il sera immédiatement mis sur ton explorateur ! ✨'
                : 'It will be immediately equipped on your explorer! ✨'}
            </p>
            <div className={styles.modalActions}>
              <button 
                className={styles.modalConfirmBtn}
                onClick={() => confirmPurchase(purchaseTarget.id, purchaseTarget.price)}
              >
                {language === 'fr' ? "Oui, s'il te plaît ! 💖" : "Yes, please! 💖"}
              </button>
              <button 
                className={styles.modalCancelBtn}
                onClick={() => setPurchaseTarget(null)}
              >
                {language === 'fr' ? 'Non, merci ❌' : 'No, thanks ❌'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
