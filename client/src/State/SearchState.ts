import create from 'zustand'

type SearchStoreType = {
  searchString: undefined | string
}

export const useSearchStore = create<SearchStoreType>(() => ({
  searchString: '',
}))

export default {}
