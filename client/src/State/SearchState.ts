import create from 'zustand'

type SearchStoreType = {
  searchString: undefined | string
  favorites: boolean
  toggleFavorites: () => void
}

export const useSearchStore = create<SearchStoreType>((set) => ({
  searchString: '',
  favorites: false,
  toggleFavorites: () =>
    set((state) => ({
      favorites: !state.favorites,
    })),
}))

export default {}
