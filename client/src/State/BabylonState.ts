// Zustrand stores to communicate with babylon
import create from 'zustand/vanilla'

import { Chord } from '../Babylon/types'
import { Measure as MeasureType, Note } from '../Types/guitarProTabs.types'

type NotesStoreType = {
  currentNotes: Note[] | undefined
}
type ChordStoreType = {
  currentChord: Chord | undefined
}

export const NotesStore = create<NotesStoreType>((set) => ({
  currentNotes: undefined,
}))

export const ChordStore = create<ChordStoreType>((set) => ({
  currentChord: undefined,
}))
