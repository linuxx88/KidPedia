import { useEffect, useRef } from 'react';
import { useProgressionStore } from '../../store/useProgressionStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { encyclopedia } from '../../data/topics';
import { RANKS } from '../../data/rewards';

/**
 * ProgressionListener - Composant invisible qui écoute les changements de progression
 * et déclenche les notifications localisées (Toasts) pour les badges et les rangs.
 * 
 * Note : Les notifications d'accessoires sont gérées directement par les actions 
 * du store (après le set) pour plus de précision.
 */
export const ProgressionListener = () => {
  const { labels, gender, language } = useSettingsStore();
  const activeProfileId = useProgressionStore(state => state.activeProfileId);
  
  // On utilise des refs pour comparer l'état précédent
  const prevBadgesCountRef = useRef<number>(0);
  const prevRankIdRef = useRef<string>('');

  useEffect(() => {
    if (!activeProfileId) {
      prevBadgesCountRef.current = 0;
      prevRankIdRef.current = '';
      return;
    }

    const unsubscribe = useProgressionStore.subscribe((state) => {
      const currentProg = state.progressions[activeProfileId];
      if (!currentProg) return;

      const currentBadges = currentProg.badges;
      const currentRankId = currentProg.currentRankId;

      // 1. Détection de nouvelles médailles (basé sur le nombre pour simplifier)
      if (currentBadges.length > prevBadgesCountRef.current) {
        // On récupère le dernier badge ajouté
        const lastBadge = currentBadges[currentBadges.length - 1];
        const topic = encyclopedia.find(t => t.id === lastBadge.id);
        const medalIcons = { gold: '🥇', silver: '🥈', bronze: '🥉' };
        
        useNotificationStore.getState().addNotification({
          type: 'badge',
          title: language === 'fr' ? "Nouvelle Médaille ! 🎖️" : "New Medal! 🎖️",
          message: `${topic?.title[language] || lastBadge.id} : ${labels.quiz[lastBadge.medal + 'Medal' as keyof typeof labels.quiz]}`,
          icon: medalIcons[lastBadge.medal]
        });
      }
      prevBadgesCountRef.current = currentBadges.length;

      // 2. Détection de montée de rang
      if (prevRankIdRef.current && currentRankId !== prevRankIdRef.current) {
        const newRank = RANKS.find(r => r.id === currentRankId);
        if (newRank) {
          useNotificationStore.getState().addNotification({
            type: 'rank',
            title: language === 'fr' ? "Nouveau Rang ! 🌟" : "New Rank! 🌟",
            message: language === 'fr' 
              ? `Félicitations ! Tu es maintenant ${newRank.title[gender]} !`
              : `Congratulations! You are now ${newRank.title[gender]}!`,
            icon: newRank.icon,
            duration: 8000
          });
        }
      }
      prevRankIdRef.current = currentRankId;
    });

    return () => unsubscribe();
  }, [activeProfileId, labels, gender, language]);

  return null;
};
