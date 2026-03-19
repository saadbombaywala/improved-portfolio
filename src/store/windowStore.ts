import { create } from 'zustand';

export interface OsWindow {
  id: string;
  title: string;
  component: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowState {
  windows: OsWindow[];
  activeId: string | null;
  openWindow: (id: string, title: string, component: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

let topZ = 10;

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  activeId: null,
  
  openWindow: (id, title, component) => set((state) => {
    const exists = state.windows.find(w => w.id === id);
    topZ += 1;
    if (exists) {
      return {
        windows: state.windows.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: topZ } : w),
        activeId: id
      };
    }
    return {
      windows: [...state.windows, { id, title, component, isOpen: true, isMinimized: false, isMaximized: false, zIndex: topZ }],
      activeId: id
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id),
    activeId: state.activeId === id ? null : state.activeId
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
    activeId: state.activeId === id ? null : state.activeId
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false } : w),
    activeId: id
  })),

  focusWindow: (id) => set((state) => {
    topZ += 1;
    return {
      windows: state.windows.map(w => w.id === id ? { ...w, zIndex: topZ, isMinimized: false } : w),
      activeId: id
    };
  })
}));
