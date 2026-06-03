import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useDiscoveryStore } from '../../store/useDiscoveryStore';
import { AppButton } from '../../components/UI/AppButton';
import styles from './TechTab.module.css';

interface TechTabProps {
  language: 'fr' | 'en';
}

export const TechTab: React.FC<TechTabProps> = ({ language }) => {
  const navigate = useNavigate();
  const profilesCount = useProfileStore(state => state.profiles.length);
  const labels = useSettingsStore(state => state.labels);
  const t = labels.parents;

  const topics = useDiscoveryStore(state => state.topics);
  const topicsCount = topics.length;
  const quizzesCount = topics.filter(t => 'quiz' in t && t.quiz).length;

  return (
    <div className={styles.tabContent}>
      {/* Database Metrics Card */}
      <div className={styles.techMetricsCard}>
        <h3 className={styles.sectionTitle}>⚙️ {language === 'fr' ? 'Statistiques Générales du Projet' : 'General Project Statistics'}</h3>
        <div className={styles.techGrid}>
          <div className={styles.techItem}>
            <span className={styles.techLabel}>{language === 'fr' ? 'Sujets Encyclopédiques' : 'Encyclopedia Topics'}</span>
            <span className={styles.techVal}>{topicsCount}</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techLabel}>{language === 'fr' ? 'Quiz Total' : 'Total Quizzes'}</span>
            <span className={styles.techVal}>{quizzesCount}</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techLabel}>{language === 'fr' ? 'Profils Actifs' : 'Active Profiles'}</span>
            <span className={styles.techVal}>{profilesCount}</span>
          </div>
        </div>
      </div>

      {/* Developer Zone Map Card */}
      <div className={styles.developerCard}>
        <h3 className={styles.sectionTitle}>🛠️ {t.devSectionTitle}</h3>
        <p className={styles.devDesc}>{t.devSectionDesc}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <AppButton onClick={() => navigate('/parents/flow')}>
            🗺️ {t.devSectionBtn}
          </AppButton>
          <AppButton onClick={() => navigate('/parents/editor')} variant="secondary">
            📝 {language === 'fr' ? 'Éditeur de Contenu' : 'Content Editor'}
          </AppButton>
        </div>
      </div>

      {/* Why KidPedia Info Box */}
      <div className={styles.infoBox} style={{ marginTop: '2rem' }}>
        <h4>💡 {t.whyTitle}</h4>
        <p>{t.whyText}</p>
      </div>
    </div>
  );
};
