import { Measure as MeasureType } from '../../Types/guitarProTabs.types'
import { Chord, GuitarString } from '../types'

// Returns true if the first is before the second else false
export const compareGuitarString = (x: GuitarString, y: GuitarString) => {
  if (x === GuitarString.A && y === GuitarString.E) return false

  if (x === GuitarString.D && (y === GuitarString.E || y === GuitarString.A))
    return false

  if (
    x === GuitarString.G &&
    (y === GuitarString.E || y === GuitarString.A || y === GuitarString.D)
  )
    return false

  if (
    x === GuitarString.B &&
    (y === GuitarString.E ||
      y === GuitarString.A ||
      y === GuitarString.D ||
      y === GuitarString.G)
  )
    return false

  if (x === GuitarString.e) return false

  return true
}

export const transformStringNumberIntoEnum = (
  number: 1 | 2 | 3 | 4 | 5 | 6,
): GuitarString => {
  if (number === 6) {
    return GuitarString.E
  }
  if (number === 5) {
    return GuitarString.A
  }
  if (number === 4) {
    return GuitarString.D
  }
  if (number === 3) {
    return GuitarString.G
  }
  if (number === 2) {
    return GuitarString.B
  }
  if (number === 1) {
    return GuitarString.e
  }
  return GuitarString.E
}

export const getSingleChordFromMeasure = (measure: MeasureType): Chord => {
  const beats = measure.voices[0].beats
  const chord: Chord = {
    E: 0,
    A: 0,
    D: 0,
    G: 0,
    B: 0,
    e: 0,
  }
  beats.map((beat) => {
    beat.notes.map((note) => {
      const noteString = transformStringNumberIntoEnum(note.string)
      // TODO: Remove the 3
      chord[noteString] = note.value - 3
    })
  })
  return chord
}

type chordsFromMeasure = {
  beatIndex: number
  chord: Chord
}
export const getChordsFromMeasure = (
  measure: MeasureType,
): chordsFromMeasure[] => {
  const beats = measure.voices[0].beats
  const chords: chordsFromMeasure[] = []
  let currentChord: Chord = {
    E: 0,
    A: 0,
    D: 0,
    G: 0,
    B: 0,
    e: 0,
  }
  let lastBeat = 0
  beats.map((beat, beatIndex) => {
    beat.notes.map((note) => {
      const noteString = transformStringNumberIntoEnum(note.string)

      if (
        currentChord[noteString] === 0 ||
        currentChord[noteString] === note.value - 3
      ) {
        // TODO: Remove the 3
        currentChord[noteString] = note.value - 3
      }
      // else getting a conflict because the chord has a value there
      // that means we create a new chord
      else {
        for (let i = lastBeat; i < beatIndex; i++) {
          chords.push({ beatIndex: i, chord: currentChord })
        }
        lastBeat = beatIndex
        currentChord = {
          E: 0,
          A: 0,
          D: 0,
          G: 0,
          B: 0,
          e: 0,
        }
        // TODO: Remove the 3
        currentChord[noteString] = note.value - 3
      }
    })
  })
  for (let i = lastBeat; i < beats.length; i++) {
    chords.push({ beatIndex: i, chord: currentChord })
  }
  return chords
}
