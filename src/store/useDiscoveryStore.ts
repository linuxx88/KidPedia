import { create } from 'zustand';
import { encyclopedia, type Topic } from '../data/topics';
import { useSettingsStore } from './useSettingsStore';
import { db } from '../utils/db';

interface DiscoveryState {
  // --- STATE ---
  search: string;
  topics: Topic[];
  groupedTopics: Record<string, { name: string; topics: Topic[] }>;
  activeCategory: string;
  expandedCategories: Record<string, boolean>;
  
  // --- ACTIONS ---
  setSearch: (query: string) => void;
  resetSearch: () => void;
  setActiveCategory: (category: string) => void;
  toggleCategoryExpand: (category: string) => void;
  setCategoryExpanded: (category: string, isExpanded: boolean) => void;
  reset: () => void;
  updateGroups: () => void;
  loadCustomTopics: () => Promise<void>;
  saveTopic: (topic: Topic) => Promise<void>;
  deleteTopic: (id: string) => Promise<void>;
}

export const useDiscoveryStore = create<DiscoveryState>((set, get) => {
  const calculateGroups = (topics: Topic[], search: string, language: string) => {
    const filtered = topics.filter(
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
    topics: encyclopedia,
    groupedTopics: {}, 
    activeCategory: '',
    expandedCategories: {},

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
      const { search, topics } = get();
      const { language } = useSettingsStore.getState();
      const groups = calculateGroups(topics, search, language);
      set({ groupedTopics: groups });
    },

    loadCustomTopics: async () => {
      try {
        const customList = await db.topics.toArray();
        const customMap = new Map<string, Topic>(customList.map((t) => [t.id, t]));
        const mergedTopics: Topic[] = [];

        for (const t of encyclopedia) {
          if (customMap.has(t.id)) {
            mergedTopics.push(customMap.get(t.id)!);
            customMap.delete(t.id);
          } else {
            mergedTopics.push(t);
          }
        }

        for (const t of customMap.values()) {
          mergedTopics.push(t);
        }

        set({ topics: mergedTopics });
        get().updateGroups();
      } catch (e) {
        console.error('Failed to load custom topics:', e);
        set({ topics: encyclopedia });
        get().updateGroups();
      }
    },

    saveTopic: async (topic: Topic) => {
      await db.topics.put(topic);
      await get().loadCustomTopics();
    },

    deleteTopic: async (id: string) => {
      await db.topics.delete(id);
      await get().loadCustomTopics();
    },

    reset: () => {
      set({ search: '', topics: encyclopedia, groupedTopics: {}, activeCategory: '', expandedCategories: {} });
    }
  };
});
