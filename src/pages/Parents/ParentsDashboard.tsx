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
import { TipsTab } from './TipsTab';
import { type ProfileProgression } from '../../store/progression/types';
import styles from './ParentsDashboard.module.css';


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
          <TipsTab 
            activeProfile={activeProfile} 
            currentProg={currentProg} 
            language={language} 
          />
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
