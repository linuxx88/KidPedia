import { useMemo } from 'react';
import { useProfileStore } from './useProfileStore';
import { useProgressionStore } from './useProgressionStore';
import { type EarnedBadge } from '../types/domain';

/**
 * Structure de données pour l'UI du joueur
 */
export interface PlayerStateData {
  playerName: string;
  avatar: string;
  xp: number;
  badges: EarnedBadge[];
}

const EMPTY_BADGES: EarnedBadge[] = [];

/**
 * usePlayerStore - Sélecteur UI (Lecture Seule)
 * 
 * Ce hook agrège les données d'identité (depuis useProfileStore) 
 * et de progression (depuis useProgressionStore) pour le profil actif.
 * 
 * IL NE DOIT CONTENIR AUCUNE ACTION MUTABLE.
 * Pour modifier l'état, utiliser directement useProgressionStore ou useProfileStore.
 */
export const usePlayerStore = () => {
  const activeProfile = useProfileStore(state => state.activeProfile);
  const activeId = useProgressionStore(state => state.activeProfileId);
  
  // SÉLECTEURS RÉACTIFS : On écoute directement la donnée brute dans la map des progressions
  // pour forcer le re-render quand la valeur change (les getters retournent des fonctions stables).
  const xp = useProgressionStore(state => 
    activeId ? (state.progressions[activeId]?.totalXP || 0) : 0
  );
  
  const badges = useProgressionStore(state => 
    activeId ? (state.progressions[activeId]?.badges || EMPTY_BADGES) : EMPTY_BADGES
  );

  return useMemo(() => ({
    playerName: activeProfile?.name || "Explorateur",
    avatar: activeProfile?.avatar || "🦁",
    xp,
    badges,
  }), [activeProfile, xp, badges]);
};

/**
 * Version "Store" pour compatibilité ascendante avec les composants 
 * qui utilisent usePlayerStore(state => state.xxx).
 * 
 * @deprecated Préférer l'utilisation directe des stores sources ou du hook ci-dessus.
 */
export const usePlayerStoreCompat = <T>(selector: (state: PlayerStateData) => T): T => {
  const activeProfile = useProfileStore(state => state.activeProfile);
  const progressions = useProgressionStore(state => state.progressions);
  const activeId = useProgressionStore(state => state.activeProfileId);
  
  const prog = (activeId ? progressions[activeId] : null) || { badges: EMPTY_BADGES, totalXP: 0, currentRankId: 'apprentice' };

  const state: PlayerStateData = useMemo(() => ({
    playerName: activeProfile?.name || "Explorateur",
    avatar: activeProfile?.avatar || "🦁",
    xp: prog.totalXP,
    badges: prog.badges,
  }), [activeProfile, prog.totalXP, prog.badges]);

  return selector(state);
};
