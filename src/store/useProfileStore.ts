import { create } from 'zustand';
import { type SupportedLanguage } from '../locales';
import { useSettingsStore } from './useSettingsStore';
import { useProgressionStore } from './useProgressionStore';

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  gender: 'boy' | 'girl';
  theme: 'light' | 'dark';
  language: SupportedLanguage;
  updatedAt?: number;
}

export interface ProfileState {
  profiles: Profile[];
  activeProfileId: string | null;
  activeProfile: Profile | null;
  isFirstVisit: boolean;

  addProfile: (name: string, avatar: string, gender: Profile['gender'], language?: SupportedLanguage) => Profile;
  selectProfile: (id: string) => void;
  updateProfile: (id: string, updates: Partial<Omit<Profile, 'id'>>) => void;
  deleteProfile: (id: string) => void;
  sync: () => Promise<void>;
  reset: () => void;
}

const STORAGE_KEY_INDEX = 'kp-profiles-index';
const STORAGE_KEY_ACTIVE = 'kp-active-profile-id';

const getInitialState = () => {
  let initialProfiles: Profile[] = [];
  let initialActiveId: string | null = null;

  try {
    const savedProfiles = localStorage.getItem(STORAGE_KEY_INDEX);
    if (savedProfiles) {
      initialProfiles = JSON.parse(savedProfiles);
    }
    initialActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE);
  } catch (e) {
    console.error("Error loading profiles from localStorage", e);
  }

  return {
    profiles: initialProfiles,
    activeProfileId: initialActiveId,
    activeProfile: initialProfiles.find(p => p.id === initialActiveId) || null,
    isFirstVisit: initialProfiles.length === 0,
  };
};

/**
 * Génère un identifiant unique UUID de version 4 résilient.
 * Utilise l'API Web Crypto native si disponible (contextes HTTPS/localhost),
 * ou bascule vers un fallback mathématique standard RFC4122 v4 pour les contextes non sécurisés (HTTP).
 */
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  ...getInitialState(),

  addProfile: (name, avatar, gender, language = 'fr') => {
    const newProfile: Profile = {
      id: generateUUID(),
      name,
      avatar,
      gender,
      theme: 'light',
      language,
      updatedAt: Date.now(),
    };
    
    set((state) => {
      const newProfiles = [...state.profiles, newProfile];
      localStorage.setItem(STORAGE_KEY_INDEX, JSON.stringify(newProfiles));
      localStorage.setItem(STORAGE_KEY_ACTIVE, newProfile.id);
      
      return {
        profiles: newProfiles,
        activeProfileId: newProfile.id,
        activeProfile: newProfile,
        isFirstVisit: false,
      };
    });
    get().sync().catch(console.error);
    return newProfile;
  },

  selectProfile: (id) => {
    set((state) => {
      const target = state.profiles.find(p => p.id === id);
      if (target) {
        localStorage.setItem(STORAGE_KEY_ACTIVE, id);
        
        return {
          activeProfileId: id,
          activeProfile: target
        };
      }
      return state;
    });
  },

  updateProfile: (id, updates) => {
    set((state) => {
      const newProfiles = state.profiles.map(p => p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p);
      localStorage.setItem(STORAGE_KEY_INDEX, JSON.stringify(newProfiles));
      const newActiveProfile = newProfiles.find(p => p.id === state.activeProfileId) || null;
      
      return {
        profiles: newProfiles,
        activeProfile: newActiveProfile,
      };
    });
    get().sync().catch(console.error);
  },

  deleteProfile: (id) => {
    import('../utils/syncService').then(({ trackDeletedProfileId }) => {
      trackDeletedProfileId(id);
    }).catch(console.error);
    set((state) => {
      const newProfiles = state.profiles.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY_INDEX, JSON.stringify(newProfiles));
      localStorage.removeItem(`kp-badges-${id}`); // Nettoyage lié
      
      let newActiveId = state.activeProfileId;
      if (state.activeProfileId === id) {
        newActiveId = null;
        localStorage.removeItem(STORAGE_KEY_ACTIVE);
      }
      
      return {
        profiles: newProfiles,
        activeProfileId: newActiveId,
        activeProfile: newProfiles.find(p => p.id === newActiveId) || null,
        isFirstVisit: newProfiles.length === 0,
      };
    });
    get().sync().catch(console.error);
  },

  sync: async () => {
    const localProfiles = get().profiles;
    const { syncAll } = await import('../utils/syncService');
    await syncAll(localProfiles, (syncedProfiles) => {
      localStorage.setItem(STORAGE_KEY_INDEX, JSON.stringify(syncedProfiles));
      const activeId = get().activeProfileId;
      const active = syncedProfiles.find(p => p.id === activeId) || null;
      set({
        profiles: syncedProfiles,
        activeProfile: active,
        isFirstVisit: syncedProfiles.length === 0,
      });
    });
  },

  reset: () => {
    set({
      profiles: [],
      activeProfileId: null,
      activeProfile: null,
      isFirstVisit: true,
    });
    localStorage.removeItem(STORAGE_KEY_INDEX);
    localStorage.removeItem(STORAGE_KEY_ACTIVE);
  }
}));

// --- CROSS-STORE SUBSCRIPTIONS ---
if (typeof useProfileStore.subscribe === 'function') {
  useProfileStore.subscribe((state, prevState) => {
    // Synchronize Settings when activeProfile changes
    if (state.activeProfile !== prevState.activeProfile) {
      useSettingsStore.getState().syncWithProfile(state.activeProfile);
    }

    // Synchronize Progression when activeProfileId changes
    if (state.activeProfileId !== prevState.activeProfileId) {
      useProgressionStore.getState().syncWithProfile(state.activeProfileId);
    }

    // Detect and clean up progression when a profile is deleted
    if (state.profiles !== prevState.profiles) {
      const prevIds = prevState.profiles.map(p => p.id);
      const currIds = state.profiles.map(p => p.id);
      const deletedIds = prevIds.filter(id => !currIds.includes(id));
      deletedIds.forEach(id => {
        useProgressionStore.getState().deleteProfileProgression(id);
      });
    }
  });
}

// Synchronize Settings updates back to the active Profile in ProfileStore
if (typeof useSettingsStore.subscribe === 'function') {
  useSettingsStore.subscribe((state, prevState) => {
    const profileStore = useProfileStore.getState();
    const activeProfile = profileStore.activeProfile;
    if (activeProfile) {
      const hasThemeChanged = state.theme !== prevState.theme;
      const hasGenderChanged = state.gender !== prevState.gender;
      const hasLanguageChanged = state.language !== prevState.language;

      if (hasThemeChanged || hasGenderChanged || hasLanguageChanged) {
        const updates: Partial<Omit<Profile, 'id'>> = {};
        if (hasThemeChanged && activeProfile.theme !== state.theme) {
          updates.theme = state.theme;
        }
        if (hasGenderChanged && activeProfile.gender !== state.gender) {
          updates.gender = state.gender;
        }
        if (hasLanguageChanged && activeProfile.language !== state.language) {
          updates.language = state.language;
        }

        if (Object.keys(updates).length > 0) {
          profileStore.updateProfile(activeProfile.id, updates);
        }
      }
    }
  });
}

