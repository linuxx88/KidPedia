import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useCompanionStore } from '../../store/useCompanionStore';
import { TransformedEmoji } from '../../components/UI/TransformedEmoji/TransformedEmoji';
import { AppButton } from '../../components/UI/AppButton';
import { encyclopedia } from '../../data/topics';
import styles from './RefugePage.module.css';
import emojiStyles from '../../components/UI/TransformedEmoji/TransformedEmoji.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  dx: number;
}

export function RefugePage() {
  const navigate = useNavigate();
  const { labels, language, isMuted } = useSettingsStore();
  
  // Stores
  const activeProfileId = useProgressionStore((state) => state.activeProfileId);
  const tickets = useProgressionStore((state) => state.getTickets());
  const unlockedAccessories = useProgressionStore((state) => {
    if (!activeProfileId) return [];
    return state.progressions[activeProfileId]?.unlockedAccessories || [];
  });
  
  const companionStore = useCompanionStore();
  const inventory = companionStore.getInventory();

  // Selected companion State
  // Default to Puppy
  const [selectedCompanionId, setSelectedCompanionId] = useState<'dog-companion' | 'dino-companion' | 'robot-companion'>('dog-companion');
  
  // Animation states
  const [isFeedingActive, setIsFeedingActive] = useState(false);
  const [isPettingActive, setIsPettingActive] = useState(false);
  const [highlightBoutique, setHighlightBoutique] = useState(false);

  // Particles
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextParticleId = useRef(0);

  // Sound generator
  const playSound = (type: 'pet' | 'feed' | 'buy' | 'error') => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'pet') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'feed') {
        const now = ctx.currentTime;
        const playNote = (freq: number, delay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          gain.gain.setValueAtTime(0.08, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.3);
          
          osc.start(now + delay);
          osc.stop(now + delay + 0.35);
        };
        
        playNote(523.25, 0); // C5
        playNote(659.25, 0.08); // E5
        playNote(783.99, 0.16); // G5
      } else if (type === 'buy') {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e);
    }
  };

  const triggerParticles = (char: string) => {
    const newParticles: Particle[] = Array.from({ length: 8 }).map(() => ({
      id: nextParticleId.current++,
      x: 45 + Math.random() * 10,
      y: 40 + Math.random() * 10,
      char,
      dx: (Math.random() - 0.5) * 80
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 1000);
  };

  // Helper values
  const companionInfo = {
    'dog-companion': {
      name: language === 'fr' ? 'Petit Chien' : 'Puppy',
      emoji: '🐶',
      categoryKey: 'animaux',
      treatType: 'sugarBone' as const,
      treatEmoji: '🦴',
      treatName: labels.refuge.sugarBoneName,
      desc: labels.refuge.boneDesc
    },
    'dino-companion': {
      name: language === 'fr' ? 'Bébé Dino' : 'Baby Dino',
      emoji: '🦕',
      categoryKey: 'dinosaures',
      treatType: 'goldenLeaf' as const,
      treatEmoji: '🍃',
      treatName: labels.refuge.goldenLeafName,
      desc: labels.refuge.leafDesc
    },
    'robot-companion': {
      name: language === 'fr' ? 'Mini Robot' : 'Mini Robot',
      emoji: '🤖',
      categoryKey: 'espace',
      treatType: 'batteryCell' as const,
      treatEmoji: '🔋',
      treatName: labels.refuge.batteryCellName,
      desc: labels.refuge.batteryDesc
    }
  };

  const activeComp = companionInfo[selectedCompanionId];
  const isCompanionUnlocked = unlockedAccessories.includes(selectedCompanionId);
  const compState = companionStore.getCompanionState(selectedCompanionId);

  // Helper for progress UI
  const getGoldMedalsCount = (categoryKey: string) => {
    if (!activeProfileId) return 0;
    const progression = useProgressionStore.getState().progressions[activeProfileId];
    if (!progression) return 0;
    const badges = progression.badges || [];
    return badges.filter((b) => {
      const topic = encyclopedia.find((t) => t.id === b.id);
      return topic?.categoryKey.toLowerCase() === categoryKey.toLowerCase() && b.medal === 'gold';
    }).length;
  };

  const handlePet = () => {
    if (!isCompanionUnlocked) return;
    setIsPettingActive(true);
    playSound('pet');
    triggerParticles('❤️');
    companionStore.petCompanion(selectedCompanionId);
    setTimeout(() => setIsPettingActive(false), 800);
  };

  const handleFeed = () => {
    if (!isCompanionUnlocked) return;
    const requiredTreat = activeComp.treatType;
    if ((inventory[requiredTreat] || 0) <= 0) {
      playSound('error');
      setHighlightBoutique(true);
      setTimeout(() => setHighlightBoutique(false), 1500);
      return;
    }
    
    setIsFeedingActive(true);
    playSound('feed');
    triggerParticles('✨');
    companionStore.feedCompanion(selectedCompanionId, requiredTreat);
    setTimeout(() => setIsFeedingActive(false), 800);
  };

  const handleBuyTreat = (treatType: 'sugarBone' | 'goldenLeaf' | 'batteryCell') => {
    const success = companionStore.buyTreat(treatType, 1);
    if (success) {
      playSound('buy');
    } else {
      playSound('error');
    }
  };

  // Determine dynamic classes for animation
  const animationClass = isFeedingActive
    ? emojiStyles.isFeeding
    : isPettingActive
    ? emojiStyles.isPetting
    : '';

  return (
    <div className={styles.refugeContainer}>
      {/* Particles layer */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            '--dx': `${p.dx}px`
          } as React.CSSProperties}
        >
          {p.char}
        </span>
      ))}

      {/* Top Navigation Panel */}
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          ⬅️ {labels.refuge.backBtn}
        </button>
        <h1 className={styles.title}>{labels.refuge.title}</h1>
        <div className={styles.ticketDashboard}>
          <span className={styles.ticketIcon}>🎫</span>
          <span className={styles.ticketCount} data-testid="refuge-ticket-count">
            {tickets}
          </span>
        </div>
      </header>

      {/* Main Refuge Dashboard */}
      <div className={styles.dashboardGrid}>
        
        {/* Left Side: Companions selection and interaction */}
        <section className={styles.companionZone}>
          
          {/* Companions Horizontal Selector */}
          <nav className={styles.selectorBar}>
            {(Object.keys(companionInfo) as Array<keyof typeof companionInfo>).map((key) => {
              const info = companionInfo[key];
              const unlocked = unlockedAccessories.includes(key);
              const isSelected = selectedCompanionId === key;
              const goldMedals = getGoldMedalsCount(info.categoryKey);
              
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCompanionId(key)}
                  className={[
                    styles.selectorCard,
                    isSelected ? styles.selectedCard : '',
                    !unlocked ? styles.lockedCard : ''
                  ].join(' ')}
                >
                  <span className={styles.selectorIcon}>{info.emoji}</span>
                  <div className={styles.selectorMeta}>
                    <span className={styles.selectorName}>{info.name}</span>
                    <span className={styles.selectorStatus}>
                      {unlocked ? (
                        <span className={styles.affectionBadge}>
                          💖 {companionStore.getCompanionState(key).affection}%
                        </span>
                      ) : (
                        <span className={styles.lockBadge}>
                          🔒 {goldMedals}/3 🎖️
                        </span>
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Core Interactive Sandbox */}
          <div className={styles.sandbox}>
            {!isCompanionUnlocked ? (
              /* Locked Screen Display */
              <div className={styles.lockedState}>
                <div className={styles.lockedIconWrapper}>
                  <span className={styles.giantLock}>🔒</span>
                  <span className={styles.giantEmoji}>{activeComp.emoji}</span>
                </div>
                <h2 className={styles.lockedTitle}>{labels.refuge.lockedTitle}</h2>
                <p className={styles.lockedDesc}>
                  {language === 'fr'
                    ? `Continue à apprendre et obtiens 3 médailles d'or dans la catégorie ${activeComp.categoryKey.toUpperCase()} pour adopter le ${activeComp.name} ! 🐶`
                    : `Keep learning and earn 3 gold medals in the ${activeComp.categoryKey.toUpperCase()} category to adopt the ${activeComp.name}! 🐶`}
                </p>
                
                {/* Medals progress graphics */}
                <div className={styles.medalsProgress}>
                  {Array.from({ length: 3 }).map((_, idx) => {
                    const count = getGoldMedalsCount(activeComp.categoryKey);
                    const reached = idx < count;
                    return (
                      <span
                        key={idx}
                        className={[
                          styles.medalSlot,
                          reached ? styles.medalFilled : styles.medalEmpty
                        ].join(' ')}
                      >
                        {reached ? '🥇' : '⚪'}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Unlocked Play Environment */
              <div className={styles.playZone}>
                <div className={styles.companionDisplay} onClick={handlePet}>
                  <TransformedEmoji
                    emoji={activeComp.emoji}
                    size={220}
                    className={animationClass}
                  />
                  <div className={styles.shadow}></div>
                </div>

                {/* Companions Stats */}
                <div className={styles.statsPanel}>
                  <div className={styles.statRow}>
                    <div className={styles.statHeader}>
                      <span className={styles.statLabel}>
                        💖 {labels.refuge.affectionLabel}
                      </span>
                      <span className={styles.statValue}>{compState.affection}/100</span>
                    </div>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFillAffection}
                        style={{ width: `${compState.affection}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.statRow}>
                    <div className={styles.statHeader}>
                      <span className={styles.statLabel}>
                        😊 {labels.refuge.happinessLabel}
                      </span>
                      <span className={styles.statValue}>{compState.happiness}/100</span>
                    </div>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFillHappiness}
                        style={{ width: `${compState.happiness}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Interaction Action Panel */}
                <div className={styles.actionPanel}>
                  <AppButton
                    onClick={handlePet}
                    variant="primary"
                    className={styles.actionBtn}
                  >
                    🥰 {labels.refuge.petButton}
                  </AppButton>
                  
                  <AppButton
                    onClick={handleFeed}
                    variant="primary"
                    className={styles.actionBtn}
                    disabled={(inventory[activeComp.treatType] || 0) <= 0}
                  >
                    😋 {labels.refuge.feedButton} ({activeComp.treatEmoji})
                  </AppButton>

                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Side: Treat Boutique */}
        <aside
          className={[
            styles.boutiqueCard,
            highlightBoutique ? styles.boutiqueHighlight : ''
          ].join(' ')}
        >
          <h2 className={styles.boutiqueTitle}>{labels.refuge.treatsTitle}</h2>
          
          <div className={styles.treatList}>
            {(Object.keys(companionInfo) as Array<keyof typeof companionInfo>).map((key) => {
              const info = companionInfo[key];
              const owned = inventory[info.treatType] || 0;
              const canBuy = tickets >= 1;
              
              return (
                <div key={key} className={styles.treatItem}>
                  <div className={styles.treatIconBox}>{info.treatEmoji}</div>
                  <div className={styles.treatDetails}>
                    <h3 className={styles.treatName}>{info.treatName}</h3>
                    <p className={styles.treatDesc}>{info.desc}</p>
                    <span className={styles.treatCountLabel}>
                      {language === 'fr' ? 'Dans le sac' : 'In bag'} :{' '}
                      <strong className={styles.treatCount} data-testid={`treat-count-${info.treatType}`}>
                        {owned}
                      </strong>
                    </span>
                  </div>
                  <button
                    onClick={() => handleBuyTreat(info.treatType)}
                    className={styles.buyBtn}
                    disabled={!canBuy}
                  >
                    1 🎫
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

      </div>
    </div>
  );
}

export default RefugePage;
