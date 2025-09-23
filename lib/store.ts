import { create } from "zustand";


interface UIState {
selectedEventId?: string;
setSelectedEvent: (id?: string) => void;
audioOn: boolean;
toggleAudio: () => void;
score: number;
setScore: (s: number) => void;
}


export const useUI = create<UIState>((set) => ({
selectedEventId: undefined,
setSelectedEvent: (id) => set({ selectedEventId: id }),
audioOn: false,
toggleAudio: () => set((s) => ({ audioOn: !s.audioOn })),
score: 0,
setScore: (score) => set({ score }),
}));