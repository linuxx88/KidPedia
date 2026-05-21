import { create } from 'zustand';
import { safariMap } from '../data/gameData';
import { encyclopedia, type Topic } from '../data/topics';
import { DICE_COLORS, type DiceColor } from '../components/UI/DiceRoller.types';
import { SAFARI_GEOMETRY } from '../constants/geometry';

export type GameState = 'IDLE' | 'ROLLING' | 'MOVING' | 'EVENT' | 'VICTORY';

/**
 * Codes d'événements pour l'UI
 */
export type SafariEventCode = 
  | 'WELCOME'
  | 'DICE_ROLL'
  | 'ANIMAL_ENCOUNTER'
  | 'ALREADY_HAVE'
  | 'BOOST'
  | 'HAZARD'
  | 'QUIZ_SUCCESS'
  | 'QUIZ_FAILURE'
  | 'MISSING_ANIMALS'
  | 'VICTORY'
  | 'RESET'
  | 'CELL_LABEL';

/**
 * Données associées aux événements du Safari
 */
export interface SafariEventData {
  value?: number;
  label?: string;
  current?: number;
  goal?: number;
  topicId?: string;
  title?: Record<string, string>;
}

interface SafariState {
  // --- STATE ---
  playerPosition: number;
  lastRoll: number;
  status: GameState;
  inventory: string[];
  eventCode: SafariEventCode;
  eventData: SafariEventData | null; // Données associées à l'événement (ex: nom de l'animal, valeur du dé)
  activeQuiz: Topic | null;
  diceColor: DiceColor;
  currentRollId: number;

  // --- ACTIONS ---
  rollDice: () => Promise<void>;
  handleQuizAnswer: (isCorrect: boolean) => void;
  reset: () => void;
  setDiceColor: (color: DiceColor) => void;
}

export const QUEST_GOAL = 3;

export const useSafariStore = create<SafariState>((set, get) => ({
  // --- Initial State ---
  playerPosition: 0,
  lastRoll: 0,
  status: 'IDLE',
  inventory: [],
  eventCode: 'WELCOME',
  eventData: null,
  activeQuiz: null,
  diceColor: DICE_COLORS[0],
  currentRollId: 0,

  // --- Actions ---

  setDiceColor: (color) => set({ diceColor: color }),

  reset: () => {
    const nextRollId = get().currentRollId + 1;
    set({
      currentRollId: nextRollId,
      playerPosition: 0,
      inventory: [],
      status: 'IDLE',
      eventCode: 'RESET',
      eventData: null,
      lastRoll: 0,
      activeQuiz: null
    });
  },

  handleQuizAnswer: (isCorrect) => {
    const { activeQuiz } = get();
    if (!activeQuiz) return;

    if (isCorrect) {
      set(state => ({ 
        inventory: [...state.inventory, activeQuiz.id],
        eventCode: 'QUIZ_SUCCESS',
        eventData: { topicId: activeQuiz.id, title: activeQuiz.title }
      }));
    } else {
      set({ eventCode: 'QUIZ_FAILURE' });
    }

    set({ activeQuiz: null, status: 'IDLE' });
  },

  rollDice: async () => {
    const { status, playerPosition, currentRollId } = get();
    if (status !== 'IDLE') return;

    const nextRollId = currentRollId + 1;
    set({ currentRollId: nextRollId, status: 'ROLLING' });
    const roll = Math.floor(Math.random() * 6) + 1;
    set({ lastRoll: roll, eventCode: 'DICE_ROLL', eventData: { value: roll } });

    await new Promise(resolve => setTimeout(resolve, 1200));
    if (get().currentRollId !== nextRollId) return;
    
    // Start Moving
    set({ status: 'MOVING' });
    let current = playerPosition;
    const direction = 1; 

    for (let i = 0; i < roll; i++) {
      current += direction;
      if (current >= safariMap.length) {
        current = safariMap.length - 1;
        set({ playerPosition: current });
        break;
      }
      set({ playerPosition: current });
      await new Promise(resolve => setTimeout(resolve, SAFARI_GEOMETRY.STEP_DURATION));
      if (get().currentRollId !== nextRollId) return;
    }

    // Resolve Cell
    const resolveCell = async (pos: number, isExtraMove = false) => {
      const cell = safariMap[pos];
      set({ status: 'EVENT' });

      if (cell.type === 'end') {
        const { inventory } = get();
        if (inventory.length >= QUEST_GOAL) {
          set({ status: 'VICTORY', eventCode: 'VICTORY' });
        } else {
          set({ eventCode: 'MISSING_ANIMALS', eventData: { current: inventory.length, goal: QUEST_GOAL } });
          // Move back to start
          await new Promise(resolve => setTimeout(resolve, 2000));
          if (get().currentRollId !== nextRollId) return;
          
          set({ status: 'MOVING' });
          let backPos = pos;
          while (backPos > 0) {
            backPos--;
            set({ playerPosition: backPos });
            await new Promise(resolve => setTimeout(resolve, 300));
            if (get().currentRollId !== nextRollId) return;
          }
          set({ status: 'IDLE', eventCode: 'WELCOME' });
        }
        return;
      }

      if (cell.type === 'animal' && cell.subjectId) {
        const { inventory } = get();
        if (!inventory.includes(cell.subjectId)) {
          const topic = encyclopedia.find(t => t.id === cell.subjectId);
          if (topic) {
            set({ activeQuiz: topic, eventCode: 'ANIMAL_ENCOUNTER', eventData: { label: cell.label } });
            return; // Wait for answer
          }
        } else {
          set({ eventCode: 'ALREADY_HAVE', eventData: { label: cell.label } });
        }
      }

      if (cell.type === 'boost' || cell.type === 'hazard') {
        if (!isExtraMove) {
          set({ 
            eventCode: cell.type === 'boost' ? 'BOOST' : 'HAZARD', 
            eventData: { label: cell.label } 
          });
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (get().currentRollId !== nextRollId) return;
          
          // Move again
          set({ status: 'MOVING' });
          const steps = cell.effect || 0;
          const dir = steps > 0 ? 1 : -1;
          const absSteps = Math.abs(steps);
          let movePos = pos;
          for (let i = 0; i < absSteps; i++) {
            movePos += dir;
            if (movePos < 0) movePos = 0;
            if (movePos >= safariMap.length) movePos = safariMap.length - 1;
            set({ playerPosition: movePos });
            await new Promise(resolve => setTimeout(resolve, SAFARI_GEOMETRY.STEP_DURATION));
            if (get().currentRollId !== nextRollId) return;
            if (movePos === 0 || movePos === safariMap.length - 1) break;
          }
          await resolveCell(movePos, true);
          return;
        } else {
          set({ eventCode: 'CELL_LABEL', eventData: { label: cell.label } });
        }
      }

      set({ status: 'IDLE' });
    };

    await resolveCell(current);
  }
}));
