import React, { useMemo } from 'react';
import { encyclopedia } from '../../data/topics';
import { type ProfileProgression } from '../../store/progression/types';
import styles from './StatsTab.module.css';

interface StatsTabProps {
  currentProg: ProfileProgression;
  language: 'fr' | 'en';
}

const RANKS = [
  { id: 'apprentice', minXP: 0, icon: '🌱', title: { fr: 'Apprenti', en: 'Apprentice' } },
  { id: 'explorer', minXP: 1000, icon: '🧭', title: { fr: 'Explorateur', en: 'Explorer' } },
  { id: 'expert', minXP: 5000, icon: '🧠', title: { fr: 'Expert', en: 'Expert' } },
  { id: 'sage', minXP: 10000, icon: '🧙', title: { fr: 'Grand Sage', en: 'Grand Sage' } },
];

export const StatsTab: React.FC<StatsTabProps> = ({ currentProg, language }) => {
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
  }, [currentProg.badges, categoriesMap]);

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

  return (
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
              ? 'Gagnés en répondant aux quiz. Permettent d\'acheter des accessoires et compagnons !' 
              : 'Earned by answering quizzes. Used to buy accessories and companions!'}
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
  );
};
