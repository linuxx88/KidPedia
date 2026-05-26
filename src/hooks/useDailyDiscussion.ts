import { useMemo } from 'react';
import { useProgressionStore } from '../store/useProgressionStore';
import { DISCUSSION_STARTERS, FALLBACK_DISCUSSIONS, type DiscussionStarter } from '../data/discussionStarters';
import { type TopicId } from '../types/domain';

// Formateur de date local YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Fonction de hachage pure pour générer des tris déterministes et stables (sans Math.random)
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

export interface DiscussionItem {
  topicId: TopicId;
  question: {
    fr: string;
    en: string;
  };
}

export interface DailyDiscussionResult {
  hasDiscoveries: boolean;
  discussions: DiscussionItem[];
}

/**
 * Hook métier sélectionnant aléatoirement jusqu'à 3 sujets découverts aujourd'hui,
 * avec un état de repli (fallback) si aucune découverte n'est disponible.
 */
export const useDailyDiscussion = (): DailyDiscussionResult => {
  const activeProfileId = useProgressionStore((state) => state.activeProfileId);
  const progressions = useProgressionStore((state) => state.progressions);

  // 1. Lire les dailyDiscoveries du jour
  const todayDiscoveries = useMemo((): TopicId[] => {
    if (!activeProfileId) return [];
    const profile = progressions[activeProfileId];
    if (!profile || !profile.dailyDiscoveries) return [];

    const todayStr = formatDate(new Date());
    return profile.dailyDiscoveries[todayStr] || [];
  }, [activeProfileId, progressions]);

  // 2. Extraire et filtrer les sujets disposant d'un déclencheur de discussion
  return useMemo((): DailyDiscussionResult => {
    const validTopics = todayDiscoveries.filter((id) => id in DISCUSSION_STARTERS);

    if (validTopics.length === 0) {
      return {
        hasDiscoveries: false,
        discussions: FALLBACK_DISCUSSIONS
      };
    }

    // 3. Sélection aléatoire (mélange stable et pur basé sur un hash) de 3 sujets uniques au maximum
    const todayStr = formatDate(new Date());
    const shuffled = [...validTopics].sort((a, b) => {
      const hashA = hashString(`${a}-${todayStr}`);
      const hashB = hashString(`${b}-${todayStr}`);
      return hashA - hashB;
    });
    const selected = shuffled.slice(0, 3);

    const discussions = selected.map((topicId): DiscussionItem => {
      const starter = DISCUSSION_STARTERS[topicId] as DiscussionStarter;
      return {
        topicId,
        question: {
          fr: starter.question.fr,
          en: starter.question.en
        }
      };
    });

    return {
      hasDiscoveries: true,
      discussions
    };
  }, [todayDiscoveries]);
};
