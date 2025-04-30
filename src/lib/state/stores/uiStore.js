// /src/lib/state/stores/uiStore.ts
import { create } from "zustand";

export const useUiStore = create((set) => ({
  sidebarOpen: true,
  currentModule: "dashboard",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentModule: (module) => set({ currentModule: module }),
}));
