import { create } from 'zustand';

interface BuilderState {
  selectedDevice: 'desktop' | 'tablet' | 'mobile';
  viewMode: 'edit' | 'preview';
  zoom: number;
  lastSaved: Date | null;
  setDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  setViewMode: (mode: 'edit' | 'preview') => void;
  setZoom: (zoom: number) => void;
  save: () => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  selectedDevice: 'desktop',
  viewMode: 'edit',
  zoom: 100,
  lastSaved: null,
  setDevice: (device) => set({ selectedDevice: device }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setZoom: (zoom) => set({ zoom }),
  save: () => set({ lastSaved: new Date() }),
}));
