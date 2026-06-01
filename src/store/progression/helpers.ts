import { RANKS } from '../../data/rewards';

/**
 * Formate une date en YYYY-MM-DD local
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getLocalDateString = (): string => formatDate(new Date());

export const getCutoffDateString = (): string => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return formatDate(cutoff);
};

/**
 * Calcule le rang correspondant au total d'XP actuel.
 */
export const calculateRankId = (xp: number): string => {
  const rank = [...RANKS].reverse().find(r => xp >= r.minXP);
  return rank ? rank.id : RANKS[0].id;
};
