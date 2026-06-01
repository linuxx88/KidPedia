import { useSettingsStore } from '../useSettingsStore';
import { useNotificationStore } from '../useNotificationStore';
import { launchCelebration } from '../../utils/celebrations';
import { playBehavioralBadgeSuccessSound } from './audio';
import { type EarnedBadge } from '../../types/domain';

export const checkBehavioralBadgeEffects = (oldBadges: EarnedBadge[], newBadges: EarnedBadge[]) => {
  const { language } = useSettingsStore.getState();
  const notify = (id: string, frTitle: string, enTitle: string, frMsg: string, enMsg: string, icon: string) => {
    const had = oldBadges.some(b => b.id === id);
    const has = newBadges.some(b => b.id === id);
    if (!had && has) {
      launchCelebration();
      playBehavioralBadgeSuccessSound();
      useNotificationStore.getState().addNotification({
        type: 'badge',
        title: language === 'fr' ? frTitle : enTitle,
        message: language === 'fr' ? frMsg : enMsg,
        icon
      });
    }
  };

  notify(
    'super-squirrel',
    'Exploit Débloqué ! 🏆',
    'Exploit Unlocked! 🏆',
    'Bravo ! Tu as débloqué le badge "Super Écureuil" 🐿️',
    'Well done! You unlocked the "Super Squirrel" badge 🐿️',
    '🐿️'
  );

  notify(
    'animal-friend',
    'Exploit Débloqué ! 🏆',
    'Exploit Unlocked! 🏆',
    'Bravo ! Tu as débloqué le badge "Ami des bêtes" 🦊',
    'Well done! You unlocked the "Animal Friend" badge 🦊',
    '🦊'
  );

  notify(
    'library-rat',
    'Exploit Débloqué ! 🏆',
    'Exploit Unlocked! 🏆',
    'Bravo ! Tu as débloqué le badge "Rat de bibliothèque" 📚',
    'Well done! You unlocked the "Bookworm" badge 📚',
    '📚'
  );

  notify(
    'perseverant',
    'Exploit Débloqué ! 🏆',
    'Exploit Unlocked! 🏆',
    'Bravo ! Tu as débloqué le badge "Persévérant" 🦾',
    'Well done! You unlocked the "Persistent" badge 🦾',
    '🦾'
  );
};
