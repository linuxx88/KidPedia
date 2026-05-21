import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useProfileStore } from '../../store/useProfileStore';
import { encyclopedia } from '../../data/topics';
import { PageHeader } from '../../components/Layout/PageHeader';
import { AppButton } from '../../components/UI/AppButton';
import { AvatarDisplay } from '../../components/UI/AvatarDisplay';
import styles from './ParentsDashboard.module.css';

/**
 * ParentsDashboard - Vue dédiée aux parents pour le suivi de la progression.
 */
export const ParentsDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const navigate = useNavigate();
  const profiles = useProfileStore(state => state.profiles);
  const progressions = useProgressionStore(state => state.progressions);

  const totalTopics = encyclopedia.length;

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Tableau de Bord Parents" 
        icon="📊" 
        onBack={onBack} 
      />

      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>👨‍👩‍👧‍👦 Vos Petits Explorateurs</h3>
          
          <div className={styles.profilesGrid}>
            {profiles.map(profile => {
              const prog = progressions[profile.id] || { totalXP: 0, badges: [] };
              const completion = Math.round((prog.badges.length / totalTopics) * 100);

              return (
                <div key={profile.id} className={styles.profileCard}>
                  <div className={styles.profileHeader}>
                    <AvatarDisplay avatar={profile.avatar} name={profile.name} size="medium" />
                    <div className={styles.profileInfo}>
                      <h4 className={styles.profileName}>{profile.name}</h4>
                      <p className={styles.profileStats}>{prog.totalXP} XP • {prog.badges.length} médailles</p>
                    </div>
                  </div>

                  <div className={styles.progressWrapper}>
                    <div className={styles.progressHeader}>
                      <span>Découverte de l'encyclopédie</span>
                      <span>{completion}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${completion}%` }} />
                    </div>
                  </div>

                  <div className={styles.profileActions}>
                    <AppButton 
                      variant="outline" 
                      className={styles.resetBtn}
                      onClick={() => {
                        // On simule une sélection de profil pour le clearBadges
                        useProgressionStore.getState().syncWithProfile(profile.id);
                        if (window.confirm(`Effacer toute la progression de ${profile.name} ? Cette action est irréversible.`)) {
                          useProgressionStore.getState().clearBadges();
                        }
                      }}
                    >
                      Réinitialiser
                    </AppButton>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.section} style={{ marginTop: '2rem' }}>
          <h3 className={styles.sectionTitle}>🛠️ Espace Développeur</h3>
          <p style={{ color: 'var(--color-app-text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
            Visualisez le flux d'architecture, la gestion d'état Zustand et le trajet des données au sein de KidPedia en temps réel.
          </p>
          <AppButton onClick={() => navigate('/parents/flow')}>
            🗺️ Ouvrir la Cartographie du Projet
          </AppButton>
        </section>

        <section className={styles.infoBox} style={{ marginTop: '2rem' }}>
          <h4>💡 Pourquoi KidPedia ?</h4>
          <p>
            KidPedia est conçu pour éveiller la curiosité naturelle des enfants. 
            Chaque médaille gagnée représente un concept compris et retenu grâce à nos quiz ludiques.
          </p>
        </section>
      </div>
    </div>
  );
};

