// Zustrand stores to communicate with babylon
import create from 'zustand/vanilla'

import { Chord } from '../Babylon/types'
import { GuitarOrientation } from '../generated/graphql'
import { Note } from '../Types/guitarProTabs.types'

type NotesStoreType = {
  currentNotes: Note[] | undefined
  timestamp: Date | undefined
}

type ChordStoreType = {
  currentChord: Chord | undefined
}

type GuitarOrientationStoreType = {
  guitarOrientation: GuitarOrientation | undefined
}

export const NotesStore = create<NotesStoreType>((set) => ({
  currentNotes: undefined,
  timestamp: undefined,
}))

export const ChordStore = create<ChordStoreType>((set) => ({
  currentChord: undefined,
}))

export const GuitarOrientationStore = create<GuitarOrientationStoreType>(
  (set) => ({
    guitarOrientation: GuitarOrientation.RightHanded,
  }),
)
