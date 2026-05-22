import { create } from 'zustand';
import { encyclopedia, type Topic } from '../data/topics';
import { useSettingsStore } from './useSettingsStore';

interface DiscoveryState {
  // --- STATE ---
  search: string;
  groupedTopics: Record<string, { name: string; topics: Topic[] }>;
  activeCategory: string;
  
  // --- ACTIONS ---
  setSearch: (query: string) => void;
  resetSearch: () => void;
  setActiveCategory: (category: string) => void;
  expandedCategories: Record<string, boolean>;
  toggleCategoryExpand: (category: string) => void;
  setCategoryExpanded: (category: string, isExpanded: boolean) => void;
  reset: () => void;
  updateGroups: () => void;
}

export const useDiscoveryStore = create<DiscoveryState>((set, get) => {
  const calculateGroups = (search: string, language: string) => {
    const filtered = encyclopedia.filter(
      (t) =>
        t.title[language as keyof typeof t.title].toLowerCase().includes(search.toLowerCase()) ||
        t.category[language as keyof typeof t.category].toLowerCase().includes(search.toLowerCase()) ||
        t.categoryKey.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.reduce(
      (acc, topic) => {
        const key = topic.categoryKey;
        if (!acc[key]) {
          acc[key] = {
            name: topic.category[language as keyof typeof topic.category],
            topics: [],
          };
        }
        acc[key].topics.push(topic);
        return acc;
      },
      {} as Record<string, { name: string; topics: Topic[] }>
    );
  };

  return {
    // --- Initial State ---
    search: '',
    groupedTopics: {}, 
    activeCategory: '',

    // --- Actions ---
    setSearch: (query) => {
      set({ search: query });
      get().updateGroups();
    },
    
    resetSearch: () => {
      set({ search: '' });
      get().updateGroups();
    },

    setActiveCategory: (category) => set({ activeCategory: category }),

    expandedCategories: {},

    toggleCategoryExpand: (category) => {
      set((state) => ({
        expandedCategories: {
          ...state.expandedCategories,
          [category]: !state.expandedCategories[category]
        }
      }));
    },

    setCategoryExpanded: (category, isExpanded) => {
      set((state) => ({
        expandedCategories: {
          ...state.expandedCategories,
          [category]: isExpanded
        }
      }));
    },

    updateGroups: () => {
      const { search } = get();
      const { language } = useSettingsStore.getState();
      const groups = calculateGroups(search, language);
      set({ groupedTopics: groups });
    },

    reset: () => {
      set({ search: '', groupedTopics: {}, activeCategory: '', expandedCategories: {} });
    }
  };
});
