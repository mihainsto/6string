// Zustrand stores to communicate with babylon
import create from 'zustand/vanilla'

import { Measure as MeasureType, Note } from '../Types/guitarProTabs.types'

type NotesStoreType = {
  currentNotes: Note[] | undefined
}
type MeasureStoreType = {
  currentMeasure: MeasureType | undefined
}

export const NotesStore = create<NotesStoreType>((set) => ({
  currentNotes: undefined,
}))

export const MeasureStore = create<MeasureStoreType>((set) => ({
  currentMeasure: undefined,
}))
