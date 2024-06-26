import { create } from 'zustand';
import { type Playlist, type Song } from '../lib/data.ts';

export interface CurrentMusic {
  playlist: Playlist | null;
  song: Song | null;
  songs: Song[];
}

export interface PlayerStore {
  isPlaying: boolean;
  isOnRepeat: boolean;
  currentMusic: CurrentMusic;
  volume: number;

  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: CurrentMusic) => void;
  setIsOnRepeat: (isOnRepeat: boolean) => void;
}

export const usePlayerStore = create<PlayerStore>(set => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 0.1,
  isOnRepeat: false,
  setVolume: volume => set({ volume }),
  setIsPlaying: isPlaying => set({ isPlaying }),
  setCurrentMusic: currentMusic => set({ currentMusic }),
  setIsOnRepeat: isOnRepeat => set({ isOnRepeat })
}));
