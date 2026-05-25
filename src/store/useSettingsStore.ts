import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { locales } from '../locales';
import type { Labels, SupportedLanguage } from '../locales';
import { type Gender } from '../utils/helpers';
import type { Profile } from '../store/useProfileStore';

interface SettingsState {
  isDarkMode: boolean;
  isMuted: boolean;
  isMusicMuted: boolean;
  isSfxMuted: boolean;
  gender: Gender;
  language: SupportedLanguage;
  labels: Labels;
  
  toggleTheme: (updateProfileCb?: (theme: 'dark' | 'light') => void) => void;
  toggleMute: () => void;
  toggleMusicMute: () => void;
  toggleSfxMute: () => void;
  toggleGender: (updateProfileCb?: (gender: Gender) => void) => void;
  setLanguage: (lang: SupportedLanguage, updateProfileCb?: (lang: SupportedLanguage) => void) => void;
  syncWithProfile: (profile: Profile | null) => void;
  reset: () => void;
}

const updateDOMTheme = (isDark: boolean) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // --- Initial State ---
      isDarkMode: false,
      isMuted: false,
      isMusicMuted: false,
      isSfxMuted: false,
      gender: 'boy',
      language: 'fr',
      labels: locales['fr'],

      toggleTheme: (updateProfileCb) => {
        const nextDark = !get().isDarkMode;
        set({ isDarkMode: nextDark });
        updateDOMTheme(nextDark); // On le garde ici car toggleTheme est une action UI directe
        if (updateProfileCb) updateProfileCb(nextDark ? 'dark' : 'light');
      },

      toggleMute: () => {
        const nextMuted = !get().isMuted;
        set({
          isMuted: nextMuted,
          isMusicMuted: nextMuted,
          isSfxMuted: nextMuted
        });
      },

      toggleMusicMute: () => {
        const nextMusicMuted = !get().isMusicMuted;
        const sfxMuted = get().isSfxMuted;
        set({
          isMusicMuted: nextMusicMuted,
          isMuted: nextMusicMuted && sfxMuted
        });
      },

      toggleSfxMute: () => {
        const nextSfxMuted = !get().isSfxMuted;
        const musicMuted = get().isMusicMuted;
        set({
          isSfxMuted: nextSfxMuted,
          isMuted: musicMuted && nextSfxMuted
        });
      },

      toggleGender: (updateProfileCb) => {
        const nextGender = get().gender === 'boy' ? 'girl' : 'boy';
        set({ gender: nextGender });
        if (updateProfileCb) updateProfileCb(nextGender);
      },

      setLanguage: (lang, updateProfileCb) => {
        set({ language: lang, labels: locales[lang] });
        if (updateProfileCb) updateProfileCb(lang);
      },

      syncWithProfile: (profile) => {
        if (!profile) return;

        const isDark = profile.theme === 'dark';
        const lang = profile.language || 'fr';
        const current = get();

        if (
          current.isDarkMode === isDark &&
          current.gender === profile.gender &&
          current.language === lang
        ) {
          return;
        }

        set({
          isDarkMode: isDark,
          gender: profile.gender,
          language: lang,
          labels: locales[lang]
        });

        updateDOMTheme(isDark);
      },

      reset: () => {
        set({
          isDarkMode: false,
          isMuted: false,
          isMusicMuted: false,
          isSfxMuted: false,
          gender: 'boy',
          language: 'fr',
          labels: locales['fr'],
        });
        updateDOMTheme(false);
      }

    }),
    {
      name: 'kp-settings-storage',
      storage: createJSONStorage(() => localStorage),
      // ON NE PERSISTE PAS LES LABELS car ils contiennent des fonctions (incompatibles JSON)
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        isMuted: state.isMuted,
        isMusicMuted: state.isMusicMuted,
        isSfxMuted: state.isSfxMuted,
        gender: state.gender,
        language: state.language,
      }),
      // On restaure les labels manuellement après la rehydration
      onRehydrateStorage: () => (state) => {
        if (state) {
          updateDOMTheme(state.isDarkMode);
          // Restaurer les labels basés sur la langue rehydratée
          state.labels = locales[state.language || 'fr'];
        }
      }
    }
  )
);
