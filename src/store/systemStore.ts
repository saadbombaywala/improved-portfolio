import { create } from 'zustand';

type Phase = 'boot' | 'login' | 'desktop';

interface SystemState {
  phase: Phase;
  setPhase: (phase: Phase) => void;
  notifications: string[];
  addNotification: (msg: string) => void;
  removeNotification: (index: number) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  phase: typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hasBooted') ? 'login' : 'boot',
  setPhase: (phase) => {
    if (phase !== 'boot' && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('hasBooted', 'true');
    }
    set({ phase });
  },
  notifications: [],
  addNotification: (msg) => set((state) => ({ notifications: [...state.notifications, msg] })),
  removeNotification: (index) => set((state) => ({
    notifications: state.notifications.filter((_, i) => i !== index)
  })),
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled }))
}));
