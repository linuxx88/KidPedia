import React, { useState, useMemo } from 'react';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { PageHeader } from '../../components/Layout/PageHeader';
import { ExplorerSelector } from './components/ExplorerSelector';
import { StatsTab } from './StatsTab';
import { ControlTab } from './ControlTab';
import { TipsTab } from './TipsTab';
import { TechTab } from './TechTab';
import { type ProfileProgression } from '../../store/progression/types';
import styles from './ParentsDashboard.module.css';


const TAB_LABELS = {
  stats: { fr: '📈 Progression', en: '📈 Progression' },
  control: { fr: '🛡️ Contrôle Parental', en: '🛡️ Parental Control' },
  tips: { fr: '💡 Guide Éducatif', en: '💡 Educational Guide' },
  tech: { fr: '🔧 Espace Technique', en: '🔧 Technical Space' }
};

export const ParentsDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
        <ExplorerSelector
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          setSelectedProfileId={setSelectedProfileId}
          language={language}
        />

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
          <TechTab language={language} />
        )}
      </div>
    </div>
  );
};
