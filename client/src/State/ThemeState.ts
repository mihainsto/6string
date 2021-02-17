import create from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeStoreType = {
  theme: 'LIGHT' | 'DARK'
  switchTheme: () => void
}

export const useThemeStore = create<ThemeStoreType>(
  persist(
    (set) => ({
      theme: 'DARK',
      switchTheme: () =>
        set((state) => ({
          theme: state.theme === 'DARK' ? 'LIGHT' : 'DARK',
        })),
    }),
    {
      name: 'zustand-theme-storage',
    },
  ),
)

export default {}
