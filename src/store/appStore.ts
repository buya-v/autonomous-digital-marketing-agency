import { create } from 'zustand';
import { ContextualError } from '../utils/errors';

interface AppState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  bootStage: 'init' | 'css' | 'auth' | 'layout' | 'data' | 'ready';
  bootError: ContextualError | null;
  setBootStage: (stage: AppState['bootStage']) => void;
  setAuthenticated: (status: boolean) => void;
  setBootError: (error: ContextualError) => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isInitialized: false,
  isAuthenticated: false,
  bootStage: 'init',
  bootError: null,
  setBootStage: (stage) => set({ bootStage: stage }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setBootError: (error) => set({ bootError: error }),
  resetApp: () => set({ bootStage: 'init', bootError: null, isInitialized: false })
}));