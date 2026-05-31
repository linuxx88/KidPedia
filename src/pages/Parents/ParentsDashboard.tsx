import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { encyclopedia } from '../../data/topics';
import { PageHeader } from '../../components/Layout/PageHeader';
import { AppButton } from '../../components/UI/AppButton';
import { AvatarDisplay } from '../../components/UI/AvatarDisplay';
import { StatsTab } from './StatsTab';
import { ControlTab } from './ControlTab';
import { type ProfileProgression } from '../../store/progression/types';
import styles from './ParentsDashboard.module.css';

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

  // States
  const [activeTab, setActiveTab] = useState<'stats' | 'control' | 'tips' | 'tech'>('stats');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(() => {
    const currentProfiles = useProfileStore.getState().profiles;
    return currentProfiles.length > 0 ? currentProfiles[0].id : null;
  });

  // Sync profile values
  const activeProfile = useMemo(() => {
    return profiles.find(p => p.id === selectedProfileId) || profiles[0] || null;
  }, [profiles, selectedProfileId]);

  const currentProfileId = activeProfile ? activeProfile.id : null;

  // Progression stats
  const currentProg = useMemo((): ProfileProgression => {
    if (!currentProfileId) return { totalXP: 0, badges: [], tickets: 0, currentRankId: 'apprentice', unlockedAccessories: [], equippedAccessoryId: null, equippedCompanionId: null };
    return progressions[currentProfileId] || { totalXP: 0, badges: [], tickets: 0, currentRankId: 'apprentice', unlockedAccessories: [], equippedAccessoryId: null, equippedCompanionId: null };
  }, [progressions, currentProfileId]);

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
              onClick={() => setActiveTab(key as 'stats' | 'control' | 'tips' | 'tech')}
            >
              {value[language]}
            </button>
          ))}
        </div>

        {/* Tab 1: Stats & Progression */}
        {activeTab === 'stats' && activeProfile && (
          <StatsTab 
            currentProg={currentProg} 
            language={language} 
          />
        )}

        {/* Tab 2: Parental Control */}
        {activeTab === 'control' && activeProfile && (
          <ControlTab 
            activeProfile={activeProfile} 
            language={language} 
            onProfileDeleted={() => setSelectedProfileId(null)} 
          />
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
