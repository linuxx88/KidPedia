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
  
  toggleTheme: () => void;
  toggleMute: () => void;
  toggleMusicMute: () => void;
  toggleSfxMute: () => void;
  toggleGender: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
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
      isMusicMuted: state.isMusicMuted,
      isSfxMuted: state.isSfxMuted,
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
        if (state.isMuted !== undefined) {
          if (state.isMusicMuted === undefined) state.isMusicMuted = state.isMuted;
          if (state.isSfxMuted === undefined) state.isSfxMuted = state.isMuted;
        }
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

    toggleTheme: () => {
      const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
      const nextDark = nextTheme === 'dark';
      set({ theme: nextTheme, isDarkMode: nextDark });
      updateDOMTheme(nextDark);
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

    toggleGender: () => {
      const nextGender = get().gender === 'boy' ? 'girl' : 'boy';
      set({ gender: nextGender });
    },

    setLanguage: (lang) => {
      set({ language: lang, labels: locales[lang] });
    },

    syncWithProfile: (profile) => {
      if (!profile) {
        const current = get();
        if (
          current.theme === 'light' &&
          current.gender === 'boy' &&
          current.language === 'fr'
        ) {
          return;
        }
        set({
          theme: 'light',
          isDarkMode: false,
          gender: 'boy',
          language: 'fr',
          labels: locales['fr']
        });
        updateDOMTheme(false);
        return;
      }

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
    hasHydrated: () => boolean;
  };
};

