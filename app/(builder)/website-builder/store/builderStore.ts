import { create } from 'zustand';

interface BuilderState {
  save: () => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  save: () => set({}),
}));
