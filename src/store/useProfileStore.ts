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
export const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useProfileStore = create<ProfileState>((set) => ({
  ...getInitialState(),

  addProfile: (name, avatar, gender, language = 'fr') => {
    const newProfile: Profile = {
      id: generateUUID(),
      name,
      avatar,
      gender,
      theme: 'light',
      language,
    };
    
    set((state) => {
      const newProfiles = [...state.profiles, newProfile];
      localStorage.setItem(STORAGE_KEY_INDEX, JSON.stringify(newProfiles));
      localStorage.setItem(STORAGE_KEY_ACTIVE, newProfile.id);
      
      // --- SYNCHRONISATION DÉCLARATIVE ---
      useSettingsStore.getState().syncWithProfile(newProfile);
      useProgressionStore.getState().syncWithProfile(newProfile.id);

      return {
        profiles: newProfiles,
        activeProfileId: newProfile.id,
        activeProfile: newProfile,
        isFirstVisit: false,
      };
    });
    return newProfile;
  },

  selectProfile: (id) => {
    set((state) => {
      const target = state.profiles.find(p => p.id === id);
      if (target) {
        localStorage.setItem(STORAGE_KEY_ACTIVE, id);
        
        // --- SYNCHRONISATION DÉCLARATIVE ---
        useSettingsStore.getState().syncWithProfile(target);
        useProgressionStore.getState().syncWithProfile(id);

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
      const newProfiles = state.profiles.map(p => p.id === id ? { ...p, ...updates } : p);
      localStorage.setItem(STORAGE_KEY_INDEX, JSON.stringify(newProfiles));
      const newActiveProfile = newProfiles.find(p => p.id === state.activeProfileId) || null;
      
      // --- SYNCHRONISATION DÉCLARATIVE ---
      if (id === state.activeProfileId && newActiveProfile) {
        useSettingsStore.getState().syncWithProfile(newActiveProfile);
      }

      return {
        profiles: newProfiles,
        activeProfile: newActiveProfile,
      };
    });
  },

  deleteProfile: (id) => {
    set((state) => {
      const newProfiles = state.profiles.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY_INDEX, JSON.stringify(newProfiles));
      localStorage.removeItem(`kp-badges-${id}`); // Nettoyage lié
      
      // --- SYNCHRONISATION DÉCLARATIVE ---
      useProgressionStore.getState().deleteProfileProgression(id);

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
