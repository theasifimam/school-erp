// /src/lib/state/stores/uiStore.ts
import { create } from 'zustand';

interface UiState {
    sidebarOpen: boolean;
    currentModule: string;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setCurrentModule: (module: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
    sidebarOpen: true,
    currentModule: 'dashboard',
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setCurrentModule: (module) => set({ currentModule: module }),
}));