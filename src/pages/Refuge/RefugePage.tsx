import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useCompanionStore } from '../../store/useCompanionStore';
import { TransformedEmoji } from '../../components/UI/TransformedEmoji/TransformedEmoji';
import { AppButton } from '../../components/UI/AppButton';
import { encyclopedia } from '../../data/topics';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { DiscreteSpeaker } from '../../components/Learning/TopicDetail';
import styles from './RefugePage.module.css';
import emojiStyles from '../../components/UI/TransformedEmoji/TransformedEmoji.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
  dx: number;
}

const getPoopChance = (): number => {
  return Math.random();
};

export function RefugePage() {
  const navigate = useNavigate();
  const { labels, language, isMuted, isSfxMuted } = useSettingsStore();
  const { activeSpeechId, speak, stop: stopTTS } = useTextToSpeech({ language });

  // Stop speech synthesis on unmount
  React.useEffect(() => {
    return () => {
      stopTTS();
    };
  }, [stopTTS]);
  
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
  
  // Scroll indicators state for mobile companion selector
  const [showLeftScrollFade, setShowLeftScrollFade] = useState(false);
  const [showRightScrollFade, setShowRightScrollFade] = useState(true);
  const selectorBarRef = useRef<HTMLDivElement>(null);

  const handleSelectorScroll = () => {
    const el = selectorBarRef.current;
    if (!el) return;
    const isAtStart = el.scrollLeft <= 5;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setShowLeftScrollFade(!isAtStart);
    setShowRightScrollFade(!isAtEnd);
  };

  React.useEffect(() => {
    const el = selectorBarRef.current;
    if (!el) return;

    const checkScroll = () => {
      const isAtStart = el.scrollLeft <= 5;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
      setShowLeftScrollFade(!isAtStart);
      setShowRightScrollFade(!isAtEnd);
    };

    // Delay a bit to let DOM mount and layout completely
    const timeoutId = setTimeout(checkScroll, 100);

    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Animation states
  const [isPettingActive, setIsPettingActive] = useState(false);
  const [highlightBoutique, setHighlightBoutique] = useState(false);

  // Particles
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextParticleId = useRef(0);

  // Sound generator
  const playSound = (type: 'pet' | 'feed' | 'buy' | 'error' | 'pop' | 'success') => {
    if (isMuted || isSfxMuted) return;
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
      } else if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        const now = ctx.currentTime;
        const playNote = (freq: number, delay: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          gain.gain.setValueAtTime(0.08, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);
          
          osc.start(now + delay);
          osc.stop(now + delay + 0.2);
        };
        playNote(523.25, 0); // C5
        playNote(659.25, 0.06); // E5
        playNote(783.99, 0.12); // G5
        playNote(1046.50, 0.18); // C6
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

  // Auto Sleeping Energy Regenerator Interval
  React.useEffect(() => {
    if (!isCompanionUnlocked) return;
    if (compState.isSleeping && compState.energy < 100) {
      const interval = setInterval(() => {
        companionStore.incrementEnergy(selectedCompanionId, 10);
        triggerParticles('💤');
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [compState.isSleeping, compState.energy, selectedCompanionId, isCompanionUnlocked, companionStore]);

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
    if (!isCompanionUnlocked || compState.isSleeping || compState.isHiding) return;
    setIsPettingActive(true);
    playSound('pet');
    triggerParticles('❤️');
    companionStore.petCompanion(selectedCompanionId);
    setTimeout(() => setIsPettingActive(false), 800);
  };

  const handleFeed = () => {
    if (!isCompanionUnlocked || compState.isSleeping || compState.isHiding) return;
    const requiredTreat = activeComp.treatType;
    if ((inventory[requiredTreat] || 0) <= 0) {
      playSound('error');
      setHighlightBoutique(true);
      setTimeout(() => setHighlightBoutique(false), 1500);
      return;
    }
    
    if (!activeProfileId) return;
    playSound('feed');
    triggerParticles('✨');
    companionStore.feedCompanion(activeProfileId, selectedCompanionId, requiredTreat);

    // 30% chance to poop!
    if (getPoopChance() < 0.3) {
      setTimeout(() => {
        companionStore.spawnPoop(selectedCompanionId);
      }, 2500);
    }
  };

  const handleBuyTreat = (treatType: 'sugarBone' | 'goldenLeaf' | 'batteryCell') => {
    const success = companionStore.buyTreat(treatType, 1);
    if (success) {
      playSound('buy');
    } else {
      playSound('error');
    }
  };

  const handleToggleSleep = () => {
    if (!isCompanionUnlocked || compState.isHiding) return;
    playSound('pop');
    companionStore.setSleeping(selectedCompanionId, !compState.isSleeping);
  };

  const handleCleanPoop = (poopId: string) => {
    playSound('pop');
    triggerParticles('🧼');
    companionStore.cleanPoop(selectedCompanionId, poopId);
  };

  const handlePlayHideSeek = () => {
    if (!isCompanionUnlocked || compState.isSleeping || compState.energy < 15) {
      playSound('error');
      return;
    }
    playSound('pop');
    companionStore.startHideSeek(selectedCompanionId);
  };

  const handleBushClick = (spotIndex: number) => {
    if (!activeProfileId) return;
    const win = companionStore.guessHideSeek(activeProfileId, selectedCompanionId, spotIndex);
    if (win) {
      playSound('success');
      triggerParticles('✨');
    } else {
      playSound('error');
      triggerParticles('❓');
    }
  };

  // Determine dynamic classes for animation
  const animationClass = compState.isSleeping
    ? styles.isSleepingAnim
    : compState.isFeeding
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
          <div className={styles.selectorBarWrapper}>
            {showLeftScrollFade && <div className={styles.scrollFadeLeft} />}
            <nav
              ref={selectorBarRef}
              onScroll={handleSelectorScroll}
              className={styles.selectorBar}
            >
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
            {showRightScrollFade && <div className={styles.scrollFadeRight} />}
          </div>

          {/* Core Interactive Sandbox */}
          <div className={`${styles.sandbox} ${compState.isSleeping ? styles.nightMode : ''}`}>
            {!isCompanionUnlocked ? (
              /* Locked Screen Display */
              <div className={styles.lockedState}>
                <div className={styles.lockedIconWrapper}>
                  <span className={styles.giantLock}>🔒</span>
                  <span className={styles.giantEmoji}>{activeComp.emoji}</span>
                </div>
                <h2 className={styles.lockedTitle}>{labels.refuge.lockedTitle}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <p className={styles.lockedDesc}>
                    {language === 'fr'
                      ? `Continue à apprendre et obtiens 3 médailles d'or dans la catégorie ${activeComp.categoryKey.toUpperCase()} pour adopter le ${activeComp.name} ! 🐶`
                      : `Keep learning and earn 3 gold medals in the ${activeComp.categoryKey.toUpperCase()} category to adopt the ${activeComp.name}! 🐶`}
                  </p>
                  <DiscreteSpeaker
                    isSpeaking={activeSpeechId === 'locked-desc'}
                    onClick={(e) => {
                      e.stopPropagation();
                      const descText = language === 'fr'
                        ? `Continue à apprendre et obtiens 3 médailles d'or dans la catégorie ${activeComp.categoryKey.toUpperCase()} pour adopter le ${activeComp.name} !`
                        : `Keep learning and earn 3 gold medals in the ${activeComp.categoryKey.toUpperCase()} category to adopt the ${activeComp.name}!`;
                      speak(descText, 'locked-desc');
                    }}
                    label={language === 'fr' ? 'Écouter la description' : 'Listen to description'}
                  />
                </div>
                
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
            ) : compState.isHiding ? (
              /* Hide and Seek Game Board */
              <div className={styles.hideSeekBoard}>
                <h3 className={styles.hideSeekTitle}>
                  {compState.hideSeekState === 'hiding' && (language === 'fr' ? 'Où se cache le compagnon ? 🌳' : 'Where is the companion hiding? 🌳')}
                  {compState.hideSeekState === 'success' && (language === 'fr' ? 'Gagné ! 🎉 +2 🎫' : 'You Won! 🎉 +2 🎫')}
                  {compState.hideSeekState === 'fail' && (language === 'fr' ? 'Pas ici ! Essaye encore... 🧐' : 'Not here! Try again... 🧐')}
                </h3>
                <div className={styles.bushesGrid}>
                  {[0, 1, 2].map((idx) => {
                    const isWinningSpot = idx === compState.hidingSpot;
                    const showCompanion = compState.hideSeekState === 'success' && isWinningSpot;
                    
                    return (
                      <button
                        key={idx}
                        className={`${styles.bushCard} ${compState.hideSeekState === 'fail' ? styles.shakeBush : ''}`}
                        onClick={() => handleBushClick(idx)}
                        disabled={compState.hideSeekState === 'success'}
                      >
                        {showCompanion ? (
                          <div className={styles.companionReveal}>
                            <TransformedEmoji
                              emoji={activeComp.emoji}
                              size={100}
                              className={emojiStyles.isFeeding}
                            />
                          </div>
                        ) : (
                          <span className={styles.bushEmoji}>🌳</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {compState.hideSeekState === 'success' && (
                  <AppButton
                    onClick={() => companionStore.exitHideSeek(selectedCompanionId)}
                    variant="primary"
                    className={styles.exitHideSeekBtn}
                  >
                    {language === 'fr' ? 'Continuer' : 'Continue'}
                  </AppButton>
                )}
              </div>
            ) : (
              /* Unlocked Play Environment */
              <div className={styles.playZone}>
                {/* Poops interactive layer */}
                {compState.poops && compState.poops.map((poop) => (
                  <button
                    key={poop.id}
                    className={styles.poopElement}
                    style={{ left: `${poop.x}%`, top: `${poop.y}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCleanPoop(poop.id);
                    }}
                    aria-label={language === 'fr' ? 'Nettoyer le besoin' : 'Clean poop'}
                    title={language === 'fr' ? 'Nettoyer' : 'Clean'}
                  >
                    💩
                  </button>
                ))}

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

                  <div className={styles.statRow}>
                    <div className={styles.statHeader}>
                      <span className={styles.statLabel}>
                        ⚡ {language === 'fr' ? 'Énergie' : 'Energy'}
                      </span>
                      <span className={styles.statValue}>{compState.energy}/100</span>
                    </div>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFillEnergy}
                        style={{ width: `${compState.energy}%` }}
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
                    disabled={compState.isSleeping}
                  >
                    🥰 {labels.refuge.petButton}
                  </AppButton>
                  
                  <AppButton
                    onClick={handleFeed}
                    variant="primary"
                    className={styles.actionBtn}
                    disabled={compState.isSleeping || (inventory[activeComp.treatType] || 0) <= 0}
                  >
                    😋 {labels.refuge.feedButton} ({activeComp.treatEmoji})
                  </AppButton>

                  <AppButton
                    onClick={handlePlayHideSeek}
                    variant="primary"
                    className={styles.actionBtn}
                    disabled={compState.isSleeping || compState.energy < 15}
                  >
                    🎮 {language === 'fr' ? 'Jouer' : 'Play'}
                  </AppButton>

                  <AppButton
                    onClick={handleToggleSleep}
                    variant="secondary"
                    className={styles.actionBtn}
                  >
                    {compState.isSleeping ? '☀️ ' + (language === 'fr' ? 'Réveiller' : 'Wake up') : '💤 ' + (language === 'fr' ? 'Faire dodo' : 'Sleep')}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 className={styles.treatName}>{info.treatName}</h3>
                      <DiscreteSpeaker
                        isSpeaking={activeSpeechId === `treat-${key}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(`${info.treatName}. ${info.desc}`, `treat-${key}`);
                        }}
                        label={language === 'fr' ? 'Écouter' : 'Listen'}
                      />
                    </div>
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
