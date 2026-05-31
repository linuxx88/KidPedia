import { create, type UseBoundStore, type StoreApi } from 'zustand';
import { indexedDBMiddleware } from './indexedDBMiddleware';
import { locales } from '../locales';
import type { Labels, SupportedLanguage } from '../locales';
import { type Gender } from '../utils/helpers';
import type { Profile } from '../store/useProfileStore';

interface SettingsState {
  theme: 'light' | 'dark';
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
  indexedDBMiddleware<SettingsState>({
    name: 'kp-settings-storage',
    partialize: (state) => ({
      isMuted: state.isMuted,
      theme: state.theme,
      language: state.language,
    }),
    onRehydrate: (state) => {
      if (state) {
        if (state.theme) {
          state.isDarkMode = state.theme === 'dark';
        } else if (state.isDarkMode !== undefined) {
          state.theme = state.isDarkMode ? 'dark' : 'light';
        } else {
          state.theme = 'light';
          state.isDarkMode = false;
        }
        updateDOMTheme(state.isDarkMode);
        state.labels = locales[state.language || 'fr'];
      }
    }
  })((set, get) => ({
    // --- Initial State ---
    theme: 'light',
    isDarkMode: false,
    isMuted: false,
    isMusicMuted: false,
    isSfxMuted: false,
    gender: 'boy',
    language: 'fr',
    labels: locales['fr'],

    toggleTheme: (updateProfileCb) => {
      const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
      const nextDark = nextTheme === 'dark';
      set({ theme: nextTheme, isDarkMode: nextDark });
      updateDOMTheme(nextDark);
      if (updateProfileCb) updateProfileCb(nextTheme);
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
        current.theme === profile.theme &&
        current.gender === profile.gender &&
        current.language === lang
      ) {
        return;
      }

      set({
        theme: profile.theme,
        isDarkMode: isDark,
        gender: profile.gender,
        language: lang,
        labels: locales[lang]
      });

      updateDOMTheme(isDark);
    },

    reset: () => {
      set({
        theme: 'light',
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
  }))
) as UseBoundStore<StoreApi<SettingsState>> & {
  persist: {
    rehydrate: () => Promise<void>;
    clearStorage: () => Promise<void>;
  };
};
