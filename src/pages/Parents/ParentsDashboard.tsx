import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { encyclopedia } from '../../data/topics';
import { PageHeader } from '../../components/Layout/PageHeader';
import { AppButton } from '../../components/UI/AppButton';
import { AvatarDisplay } from '../../components/UI/AvatarDisplay';
import styles from './ParentsDashboard.module.css';

const RANKS = [
  { id: 'apprentice', minXP: 0, icon: '🌱', title: { fr: 'Apprenti', en: 'Apprentice' } },
  { id: 'explorer', minXP: 1000, icon: '🧭', title: { fr: 'Explorateur', en: 'Explorer' } },
  { id: 'expert', minXP: 5000, icon: '🧠', title: { fr: 'Expert', en: 'Expert' } },
  { id: 'sage', minXP: 10000, icon: '🧙', title: { fr: 'Grand Sage', en: 'Grand Sage' } },
];

const CONVERSATION_STARTERS: Record<string, { fr: string; en: string }> = {
  espace: {
    fr: "Parlez des étoiles ! Demandez à votre enfant s'il se rappelle pourquoi le Soleil est chaud et s'il s'agit d'une étoile. ☀️",
    en: "Talk about the stars! Ask your child if they remember why the Sun is hot and if it is a star. ☀️"
  },
  dinosaures: {
    fr: "Rugissez comme un T-Rex ! Demandez-lui d'expliquer la différence entre un dinosaure herbivore et un carnivore. 🦖",
    en: "Roar like a T-Rex! Ask them to explain the difference between a herbivore and a carnivore dinosaur. 🦖"
  },
  animaux: {
    fr: "Parlez de la savane ! Demandez-lui quel est l'animal le plus rapide et comment les éléphants communiquent de loin. 🐘",
    en: "Talk about the savannah! Ask them which animal is the fastest and how elephants communicate from afar. 🐘"
  },
  'corps-humain': {
    fr: "Explorez les cinq sens ! Demandez-lui comment nos oreilles et nos yeux envoient des signaux magiques au cerveau. 🧠",
    en: "Explore the five senses! Ask them how our ears and eyes send magical signals to the brain. 🧠"
  },
  nature: {
    fr: "Observez la nature ! Parlez de la façon dont les volcans entrent en éruption et pourquoi les plantes ont besoin d'eau. 🌋",
    en: "Observe nature! Talk about how volcanoes erupt and why plants need water. 🌋"
  },
  histoire: {
    fr: "Remontez le temps ! Demandez-lui s'il se souvient de la vie des chevaliers dans les châteaux au Moyen-Âge. 🏰",
    en: "Go back in time! Ask them if they remember the lives of knights in medieval castles. 🏰"
  },
  geographie: {
    fr: "Voyagez en imagination ! Demandez-lui dans quel pays se trouve la Grande Muraille de Chine ou la Tour Eiffel. 🗺️",
    en: "Travel in your imagination! Ask them in which country the Great Wall of China or the Eiffel Tower is located. 🗺️"
  },
  inventions: {
    fr: "Parlez de la technologie ! Demandez-lui comment l'invention de la roue ou de l'ampoule a changé la vie de tous les jours. 💡",
    en: "Talk about technology! Ask them how the invention of the wheel or the light bulb changed daily life. 💡"
  },
  arts: {
    fr: "Exprimez votre créativité ! Proposez-lui de dessiner ou de peindre une œuvre d'art avec ses couleurs préférées. 🎨",
    en: "Express your creativity! Suggest that they draw or paint an artwork with their favorite colors. 🎨"
  },
  questions: {
    fr: "Encouragez sa curiosité ! Demandez-lui quelle est la plus grande question qu'il se pose aujourd'hui sur le monde. ❓",
    en: "Encourage their curiosity! Ask them what is the biggest question they have about the world today. ❓"
  }
};

const TAB_LABELS = {
  stats: { fr: '📈 Progression', en: '📈 Progression' },
  control: { fr: '🛡️ Contrôle Parental', en: '🛡️ Parental Control' },
  tips: { fr: '💡 Guide Éducatif', en: '💡 Educational Guide' },
  tech: { fr: '🔧 Espace Technique', en: '🔧 Technical Space' }
};

export const ParentsDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const navigate = useNavigate();
  const profiles = useProfileStore(state => state.profiles);
  const progressions = useProgressionStore(state => state.progressions);
  const labels = useSettingsStore(state => state.labels);
  const language = useSettingsStore(state => state.language);
  const t = labels.parents;

  const isMusicMuted = useSettingsStore(state => state.isMusicMuted);
  const isSfxMuted = useSettingsStore(state => state.isSfxMuted);
  const toggleMusicMute = useSettingsStore(state => state.toggleMusicMute);
  const toggleSfxMute = useSettingsStore(state => state.toggleSfxMute);

  // States
  const [activeTab, setActiveTab] = useState<'stats' | 'control' | 'tips' | 'tech'>('stats');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [screentimeLimit, setScreentimeLimit] = useState<number>(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');

  // Default selection
  useEffect(() => {
    if (profiles.length > 0 && !selectedProfileId) {
      setSelectedProfileId(profiles[0].id);
    }
  }, [profiles, selectedProfileId]);

  // Sync profile values
  const activeProfile = useMemo(() => {
    return profiles.find(p => p.id === selectedProfileId) || profiles[0] || null;
  }, [profiles, selectedProfileId]);

  const currentProfileId = activeProfile ? activeProfile.id : null;

  useEffect(() => {
    if (currentProfileId) {
      const saved = localStorage.getItem(`kp-screentime-limit-${currentProfileId}`);
      setScreentimeLimit(saved ? parseInt(saved, 10) : 0);
    }
  }, [currentProfileId]);

  const handleScreentimeChange = (val: number) => {
    if (!currentProfileId) return;
    setScreentimeLimit(val);
    localStorage.setItem(`kp-screentime-limit-${currentProfileId}`, val.toString());
  };

  const handleStartEditName = () => {
    if (activeProfile) {
      setEditNameValue(activeProfile.name);
      setIsEditingName(true);
    }
  };

  const handleSaveName = () => {
    if (activeProfile && editNameValue.trim()) {
      useProfileStore.getState().updateProfile(activeProfile.id, { name: editNameValue.trim() });
      setIsEditingName(false);
    }
  };

  // Progression stats
  const currentProg = useMemo(() => {
    if (!currentProfileId) return { totalXP: 0, badges: [], tickets: 0, currentRankId: 'apprentice' };
    return progressions[currentProfileId] || { totalXP: 0, badges: [], tickets: 0, currentRankId: 'apprentice' };
  }, [progressions, currentProfileId]);

  const stats = useMemo(() => {
    const badgesList = currentProg.badges || [];
    const gold = badgesList.filter(b => b.medal === 'gold').length;
    const silver = badgesList.filter(b => b.medal === 'silver').length;
    const bronze = badgesList.filter(b => b.medal === 'bronze').length;
    return {
      gold,
      silver,
      bronze,
      total: badgesList.length,
      tickets: currentProg.tickets || 0,
      xp: currentProg.totalXP || 0
    };
  }, [currentProg]);

  // Categories mapping
  const categoriesMap = useMemo(() => {
    const map: Record<string, { total: number; label: { fr: string; en: string }; icon: string }> = {};
    encyclopedia.forEach(topic => {
      const key = topic.categoryKey;
      if (!map[key]) {
        map[key] = {
          total: 0,
          label: {
            fr: topic.category.fr,
            en: topic.category.en
          },
          icon: topic.icon || '📚'
        };
      }
      map[key].total += 1;
    });
    return map;
  }, []);

  const categoryProgress = useMemo(() => {
    if (!currentProfileId) return [];
    const progress: Record<string, number> = {};
    const badgesList = currentProg.badges || [];
    badgesList.forEach(badge => {
      const topic = encyclopedia.find(t => t.id === badge.id);
      if (topic) {
        progress[topic.categoryKey] = (progress[topic.categoryKey] || 0) + 1;
      }
    });
    return Object.entries(categoriesMap).map(([key, data]) => {
      const completed = progress[key] || 0;
      const percentage = Math.round((completed / data.total) * 100);
      return {
        key,
        completed,
        total: data.total,
        percentage,
        label: data.label,
        icon: data.icon
      };
    });
  }, [currentProfileId, currentProg.badges, categoriesMap]);

  // Rank calculation
  const currentRank = useMemo(() => {
    return RANKS.find(r => r.id === currentProg.currentRankId) || RANKS[0];
  }, [currentProg.currentRankId]);

  const nextRank = useMemo(() => {
    const idx = RANKS.findIndex(r => r.id === currentRank.id) + 1;
    return idx < RANKS.length ? RANKS[idx] : null;
  }, [currentRank]);

  const xpProgressPercentage = useMemo(() => {
    if (!nextRank) return 100;
    const range = nextRank.minXP - currentRank.minXP;
    const currentDiff = stats.xp - currentRank.minXP;
    return Math.min(100, Math.max(0, Math.round((currentDiff / range) * 100)));
  }, [stats.xp, currentRank, nextRank]);

  // Conversation Starters
  const activeStarters = useMemo(() => {
    const completedKeys = categoryProgress.filter(c => c.completed > 0).map(c => c.key);
    if (completedKeys.length === 0) return [];
    return completedKeys.map(key => {
      const starter = CONVERSATION_STARTERS[key];
      const categoryData = categoriesMap[key];
      return {
        key,
        icon: categoryData?.icon || '💡',
        categoryTitle: categoryData?.label[language] || key,
        text: starter ? starter[language] : ''
      };
    }).filter(s => s.text);
  }, [categoryProgress, categoriesMap, language]);

  return (
    <div className={styles.container}>
      <PageHeader 
        title={t.dashboardTitle} 
        icon="📊" 
        onBack={onBack} 
      />

      <div className={styles.content}>
        {/* Dynamic Profile Selector */}
        {profiles.length > 0 && (
          <div className={styles.profileSelectorCard}>
            <span className={styles.selectorLabel}>{language === 'fr' ? 'Sélectionner un explorateur :' : 'Select an explorer:'}</span>
            <div className={styles.profileSelectorList}>
              {profiles.map(p => (
                <button
                  key={p.id}
                  className={`${styles.profileSelectorBtn} ${selectedProfileId === p.id ? styles.profileSelectorBtnActive : ''}`}
                  onClick={() => setSelectedProfileId(p.id)}
                >
                  <AvatarDisplay avatar={p.avatar} name={p.name} size="small" />
                  <span className={styles.selectorBtnName}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Premium Glassmorphic Tabs Navigation */}
        <div className={styles.tabNavbar}>
          {Object.entries(TAB_LABELS).map(([key, value]) => (
            <button
              key={key}
              className={`${styles.tabLink} ${activeTab === key ? styles.tabLinkActive : ''}`}
              onClick={() => setActiveTab(key as any)}
            >
              {value[language]}
            </button>
          ))}
        </div>

        {/* Tab 1: Stats & Progression */}
        {activeTab === 'stats' && activeProfile && (
          <div className={styles.tabContent}>
            {/* Quick Stats Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statsCard}>
                <div className={styles.statsHeader}>
                  <span className={styles.statsTitle}>🌟 {language === 'fr' ? 'Expérience' : 'Experience'}</span>
                  <span className={styles.statsValue}>{stats.xp} XP</span>
                </div>
                <div className={styles.rankBadge}>
                  <span className={styles.rankIcon}>{currentRank.icon}</span>
                  <span className={styles.rankTitle}>{currentRank.title[language]}</span>
                </div>
                {nextRank && (
                  <div className={styles.levelProgressWrapper}>
                    <div className={styles.levelProgressHeader}>
                      <span>{language === 'fr' ? 'Prochain rang' : 'Next rank'} : {nextRank.title[language]}</span>
                      <span>{stats.xp} / {nextRank.minXP} XP</span>
                    </div>
                    <div className={styles.levelProgressBar}>
                      <div className={styles.levelProgressFill} style={{ width: `${xpProgressPercentage}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.statsCard}>
                <div className={styles.statsHeader}>
                  <span className={styles.statsTitle}>🏆 {language === 'fr' ? 'Médailles' : 'Medals'}</span>
                  <span className={styles.statsValue}>{stats.total}</span>
                </div>
                <div className={styles.medalsList}>
                  <div className={styles.medalItem}>
                    <span className={styles.medalIcon}>🥇</span>
                    <span className={styles.medalCount}>{stats.gold} {language === 'fr' ? 'Or' : 'Gold'}</span>
                  </div>
                  <div className={styles.medalItem}>
                    <span className={styles.medalIcon}>🥈</span>
                    <span className={styles.medalCount}>{stats.silver} {language === 'fr' ? 'Argent' : 'Silver'}</span>
                  </div>
                  <div className={styles.medalItem}>
                    <span className={styles.medalIcon}>🥉</span>
                    <span className={styles.medalCount}>{stats.bronze} {language === 'fr' ? 'Bronze' : 'Bronze'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.statsCard}>
                <div className={styles.statsHeader}>
                  <span className={styles.statsTitle}>🎟️ {language === 'fr' ? 'Monnaie' : 'Currency'}</span>
                  <span className={styles.statsValue}>{stats.tickets} {language === 'fr' ? 'Tickets' : 'Tickets'}</span>
                </div>
                <p className={styles.statsCardDesc}>
                  {language === 'fr' 
                    ? 'Gagnés en répondant aux quiz. Permettent d\'acheter des friandises et accessoires dans le Refuge des Compagnons !' 
                    : 'Earned by answering quizzes. Used to buy treats and accessories in the Companions Sanctuary!'}
                </p>
              </div>
            </div>

            {/* Category Progress Grid */}
            <div className={styles.categorySection}>
              <h3 className={styles.sectionTitle}>📚 {language === 'fr' ? 'Progression de l\'Encyclopédie' : 'Encyclopedia Progression'}</h3>
              <div className={styles.categoryGrid}>
                {categoryProgress.map(cat => (
                  <div key={cat.key} className={styles.categoryCard}>
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryIcon}>{cat.icon}</span>
                      <span className={styles.categoryName}>{cat.label[language]}</span>
                      <span className={styles.categoryCount}>{cat.completed} / {cat.total}</span>
                    </div>
                    <div className={styles.categoryProgressWrapper}>
                      <div className={styles.categoryProgressBar}>
                        <div 
                          className={styles.categoryProgressFill} 
                          style={{ 
                            width: `${cat.percentage}%`,
                            background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`
                          }} 
                        />
                      </div>
                      <span className={styles.categoryPercent}>{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Parental Control */}
        {activeTab === 'control' && activeProfile && (
          <div className={styles.tabContent}>
            {/* Screen Time Limit Card */}
            <div className={styles.settingsCard}>
              <h3 className={styles.sectionTitle}>⏱️ {language === 'fr' ? 'Limite de Temps de Jeu' : 'Play Screen Time Limit'}</h3>
              <p className={styles.settingDesc}>
                {language === 'fr' 
                  ? 'Définissez une limite quotidienne pour encourager une saine utilisation des écrans. KidPedia se verrouillera automatiquement une fois le temps écoulé.' 
                  : 'Set a daily play time limit to encourage healthy screen usage. KidPedia will lock automatically once the time is up.'}
              </p>
              
              <div className={styles.screentimeOptions}>
                {[0, 15, 30, 45, 60].map(mins => (
                  <button
                    key={mins}
                    className={`${styles.screentimeBtn} ${screentimeLimit === mins ? styles.screentimeBtnActive : ''}`}
                    onClick={() => handleScreentimeChange(mins)}
                  >
                    {mins === 0 
                      ? (language === 'fr' ? 'Illimité ♾️' : 'Unlimited ♾️') 
                      : `${mins} ${language === 'fr' ? 'min' : 'min'}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Settings */}
            <div className={styles.settingsCard}>
              <h3 className={styles.sectionTitle}>🎛️ {t.audioSettingsTitle}</h3>
              <div className={styles.audioSettingsGrid}>
                <div className={styles.audioRow}>
                  <div className={styles.audioLabel}>
                    <span className={styles.audioTitle}>🎵 {language === 'fr' ? 'Musique d\'ambiance' : 'Background Music'}</span>
                    <span className={styles.audioDesc}>{t.musicMute}</span>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={isMusicMuted} 
                      onChange={toggleMusicMute}
                      aria-label={t.musicMute}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.audioRow}>
                  <div className={styles.audioLabel}>
                    <span className={styles.audioTitle}>🔊 {language === 'fr' ? 'Effets Sonores (SFX)' : 'Sound Effects (SFX)'}</span>
                    <span className={styles.audioDesc}>{t.sfxMute}</span>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox" 
                      checked={isSfxMuted} 
                      onChange={toggleSfxMute}
                      aria-label={t.sfxMute}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Manage Profile & Actions */}
            <div className={styles.settingsCard}>
              <h3 className={styles.sectionTitle}>👤 {language === 'fr' ? 'Gestion du Profil' : 'Profile Management'}</h3>
              
              <div className={styles.profileManageArea}>
                <div className={styles.profileIdentityRow}>
                  <AvatarDisplay avatar={activeProfile.avatar} name={activeProfile.name} size="medium" />
                  
                  {isEditingName ? (
                    <div className={styles.editNameInputWrapper}>
                      <input
                        type="text"
                        value={editNameValue}
                        onChange={(e) => setEditNameValue(e.target.value)}
                        className={styles.editNameInput}
                        maxLength={15}
                        placeholder={language === 'fr' ? 'Nouveau nom...' : 'New name...'}
                        autoFocus
                      />
                      <div className={styles.editNameActions}>
                        <AppButton onClick={handleSaveName} className={styles.saveNameBtn}>
                          {language === 'fr' ? 'Enregistrer' : 'Save'}
                        </AppButton>
                        <AppButton variant="outline" onClick={() => setIsEditingName(false)}>
                          {language === 'fr' ? 'Annuler' : 'Cancel'}
                        </AppButton>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.profileNameDisplayWrapper}>
                      <h4 className={styles.profileNameDisplay}>{activeProfile.name}</h4>
                      <AppButton variant="outline" onClick={handleStartEditName} className={styles.editNameBtn}>
                        ✏️ {language === 'fr' ? 'Renommer' : 'Rename'}
                      </AppButton>
                    </div>
                  )}
                </div>

                <div className={styles.dangerActionsRow}>
                  <AppButton 
                    variant="outline" 
                    className={styles.resetBtn}
                    onClick={() => {
                      if (window.confirm(t.confirmReset(activeProfile.name))) {
                        useProgressionStore.getState().clearBadges(activeProfile.id);
                      }
                    }}
                  >
                    🗑️ {language === 'fr' ? 'Réinitialiser la progression' : 'Reset progression'}
                  </AppButton>
                  
                  <AppButton 
                    variant="outline" 
                    className={styles.deleteBtn}
                    onClick={() => {
                      if (window.confirm(language === 'fr' ? `Voulez-vous vraiment supprimer le profil de ${activeProfile.name} ? Cette action effacera définitivement toutes ses données.` : `Do you really want to delete ${activeProfile.name}'s profile? This action will permanently erase all data.`)) {
                        useProfileStore.getState().deleteProfile(activeProfile.id);
                        setSelectedProfileId(null);
                      }
                    }}
                  >
                    🚨 {language === 'fr' ? 'Supprimer le profil' : 'Delete profile'}
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Educational Guide & Discussion */}
        {activeTab === 'tips' && activeProfile && (
          <div className={styles.tabContent}>
            {/* Conversation Starters Section */}
            <div className={styles.discussionCard}>
              <h3 className={styles.sectionTitle}>💬 {language === 'fr' ? 'Démarreurs de Discussion' : 'Conversation Starters'}</h3>
              <p className={styles.discussionDesc}>
                {language === 'fr'
                  ? "Prolongez l'expérience d'apprentissage hors-écran ! Voici des questions personnalisées et stimulantes à poser à votre enfant en fonction de ses découvertes récentes."
                  : "Extend the learning experience offscreen! Here are personalized and stimulating questions to ask your child based on their recent discoveries."}
              </p>

              {activeStarters.length > 0 ? (
                <div className={styles.startersList}>
                  {activeStarters.map(starter => (
                    <div key={starter.key} className={styles.starterItem}>
                      <div className={styles.starterMeta}>
                        <span className={styles.starterIcon}>{starter.icon}</span>
                        <span className={styles.starterCategory}>{starter.categoryTitle}</span>
                      </div>
                      <p className={styles.starterText}>« {starter.text} »</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyDiscussionBox}>
                  <span className={styles.emptyBoxIcon}>🌱</span>
                  <p className={styles.emptyBoxText}>
                    {language === 'fr'
                      ? `${activeProfile.name} n'a pas encore de médailles. Dès qu'il ou elle complétera des quiz, des idées de conversation intelligentes apparaîtront ici !`
                      : `${activeProfile.name} does not have any medals yet. As soon as they complete quizzes, smart conversation starters will appear here!`}
                  </p>
                </div>
              )}
            </div>

            {/* Offline Activities Box */}
            <div className={styles.infoBox}>
              <h4>💡 {language === 'fr' ? 'Conseil d\'apprentissage' : 'Learning Advice'}</h4>
              <p>
                {language === 'fr'
                  ? "Pour ancrer durablement les concepts scientifiques et historiques, n'hésitez pas à faire des ponts avec le quotidien : dessiner ensemble, regarder le ciel, jardiner, ou même cuisiner (qui est une excellente initiation aux mesures physiques et à la chimie des ingrédients) !"
                  : "To durably anchor scientific and historical concepts, feel free to build bridges with everyday life: drawing together, stargazing, gardening, or even cooking (which is an excellent introduction to physical measurements and ingredients chemistry)!"}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Technical & Developer Space */}
        {activeTab === 'tech' && (
          <div className={styles.tabContent}>
            {/* Database Metrics Card */}
            <div className={styles.techMetricsCard}>
              <h3 className={styles.sectionTitle}>⚙️ {language === 'fr' ? 'Statistiques Générales du Projet' : 'General Project Statistics'}</h3>
              <div className={styles.techGrid}>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>{language === 'fr' ? 'Sujets Encyclopédiques' : 'Encyclopedia Topics'}</span>
                  <span className={styles.techVal}>{encyclopedia.length}</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>{language === 'fr' ? 'Quiz Total' : 'Total Quizzes'}</span>
                  <span className={styles.techVal}>{encyclopedia.filter(t => 'quiz' in t && t.quiz).length}</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>{language === 'fr' ? 'Profils Actifs' : 'Active Profiles'}</span>
                  <span className={styles.techVal}>{profiles.length}</span>
                </div>
              </div>
            </div>

            {/* Developer Zone Map Card */}
            <div className={styles.developerCard}>
              <h3 className={styles.sectionTitle}>🛠️ {t.devSectionTitle}</h3>
              <p className={styles.devDesc}>{t.devSectionDesc}</p>
              <AppButton onClick={() => navigate('/parents/flow')}>
                🗺️ {t.devSectionBtn}
              </AppButton>
            </div>

            {/* Why KidPedia Info Box */}
            <div className={styles.infoBox} style={{ marginTop: '2rem' }}>
              <h4>💡 {t.whyTitle}</h4>
              <p>{t.whyText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
