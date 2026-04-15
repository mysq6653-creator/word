// Zustand 스토어 + AsyncStorage persistence
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsState = {
  autoplayIntervalMs: number; // 자동재생 시 카드 간 대기 시간
  primaryLang: 'ko' | 'en'; // 첫 번째로 재생되는 언어
  setAutoplayInterval: (ms: number) => void;
  setPrimaryLang: (lang: 'ko' | 'en') => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      autoplayIntervalMs: 3500,
      primaryLang: 'ko',
      setAutoplayInterval: (ms) => set({ autoplayIntervalMs: ms }),
      setPrimaryLang: (lang) => set({ primaryLang: lang }),
    }),
    {
      name: 'baby-word-cards-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
