import React from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { PageHeader } from '../../../components/Layout/PageHeader';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { useAudioFeedback } from '../../../hooks/useAudioFeedback';
import { useProgressionStore } from '../../../store/useProgressionStore';
import { useGiftStore } from '../../../store/useGiftStore';
import { usePlayerStore } from '../../../store/usePlayerStore';
import { GiftChest } from './GiftChest';
import { GiftCard } from './GiftCard';
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
        <GiftChest
          avatar={avatar}
          playerName={playerName}
          equippedAccessoryId={equippedAccessoryId}
          equippedCompanionId={equippedCompanionId}
          language={language}
          isChestOpened={isChestOpened}
          isEligibleToOpen={isEligibleToOpen}
          progressPercent={progressPercent}
          totalXP={totalXP}
          xpNeeded={xpNeeded}
          onOpenChest={handleOpenChest}
          onToggleEquip={handleToggleEquip}
        />

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
                  const hint = getUnlockHint(accessory.unlockCondition, language);

                  return (
                    <GiftCard
                      key={accessory.id}
                      accessory={accessory}
                      isUnlocked={isUnlocked}
                      isEquipped={isEquipped}
                      language={language}
                      tickets={tickets}
                      hint={hint}
                      onToggleEquip={handleToggleEquip}
                      onSelectPurchase={setPurchaseTarget}
                    />
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
                  const hint = getUnlockHint(accessory.unlockCondition, language);

                  return (
                    <GiftCard
                      key={accessory.id}
                      accessory={accessory}
                      isUnlocked={isUnlocked}
                      isEquipped={isEquipped}
                      language={language}
                      tickets={tickets}
                      hint={hint}
                      onToggleEquip={handleToggleEquip}
                      onSelectPurchase={setPurchaseTarget}
                    />
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
