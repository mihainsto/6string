import { Measure as MeasureType, Track } from '../../Types/guitarProTabs.types'
import { Chord, GUITAR_STRINGS, GuitarString } from '../types'

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
      chord[noteString] = note.value
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

  let lastChord: Chord = {
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
      const currentChordCopy = { ...currentChord }
      currentChordCopy[noteString] = note.value

      if (
        (currentChord[noteString] === 0 ||
          currentChord[noteString] === note.value) &&
        frettable(currentChordCopy)
      ) {
        currentChord[noteString] = note.value
      }
      // else getting a conflict because the chord has a value there
      // that means we create a new chord
      else {
        // we complete the currentChord with the remained values from the last
        // because we want to persist as many notes as we can
        GUITAR_STRINGS.map((string) => {
          if (currentChord[string] === 0) {
            currentChord[string] = lastChord[string]
          }
        })
        for (let i = lastBeat; i < beatIndex; i++) {
          chords.push({ beatIndex: i, chord: currentChord })
        }
        lastBeat = beatIndex
        lastChord = currentChord
        currentChord = {
          E: 0,
          A: 0,
          D: 0,
          G: 0,
          B: 0,
          e: 0,
        }
        currentChord[noteString] = note.value
      }
    })
  })
  for (let i = lastBeat; i < beats.length; i++) {
    chords.push({ beatIndex: i, chord: currentChord })
  }
  return chords
}

type chordsFromTrack = {
  measureIndex: number
  beatIndex: number
  chord: Chord
}

export const getChordsFromTrack = (track: Track): chordsFromTrack[] => {
  const chords: chordsFromTrack[] = []
  let currentChord: Chord = {
    E: -1,
    A: -1,
    D: -1,
    G: -1,
    B: -1,
    e: -1,
  }

  let lastChord: Chord = {
    E: -1,
    A: -1,
    D: -1,
    G: -1,
    B: -1,
    e: -1,
  }

  track.measures.map((measure, measureIndex) => {
    // if (measureIndex === 1) {
    //   // eslint-disable-next-line no-debugger
    //   debugger
    // }
    let lastBeat = 0
    const beats = measure.voices[0].beats
    for (let beatIndex = 0; beatIndex < beats.length; beatIndex++) {
      const beat = beats[beatIndex]
      beat.notes.map((note) => {
        const noteString = transformStringNumberIntoEnum(note.string)
        const currentChordCopy = { ...currentChord }
        currentChordCopy[noteString] = note.value

        if (
          (currentChord[noteString] === -1 ||
            currentChord[noteString] === note.value) &&
          frettable(currentChordCopy)
        ) {
          currentChord[noteString] = note.value
        }
        // else getting a conflict because the chord has a value there
        // that means we create a new chord
        else {
          // we complete the currentChord with the remained values from the last
          // because we want to persist as many notes as we can
          GUITAR_STRINGS.map((string) => {
            if (currentChord[string] === -1) {
              currentChord[string] = lastChord[string]
            }
          })
          // Conflict generate -> dump the currentChord
          for (let i = lastBeat; i < beatIndex; i++) {
            const chordToPush = {
              E: currentChord.E === -1 ? 0 : currentChord.E,
              A: currentChord.A === -1 ? 0 : currentChord.A,
              D: currentChord.D === -1 ? 0 : currentChord.D,
              G: currentChord.G === -1 ? 0 : currentChord.G,
              B: currentChord.B === -1 ? 0 : currentChord.B,
              e: currentChord.e === -1 ? 0 : currentChord.e,
            }
            chords.push({
              measureIndex: measureIndex,
              beatIndex: i,
              chord: chordToPush,
            })
          }
          lastBeat = beatIndex
          lastChord = currentChord
          currentChord = {
            E: -1,
            A: -1,
            D: -1,
            G: -1,
            B: -1,
            e: -1,
          }
          currentChord[noteString] = note.value
          // console.log({ chords })
          //Because a conflict was generated
          //We need a new step to take in the current note
          beatIndex--
        }
      })
    }
    for (let i = lastBeat; i < beats.length; i++) {
      const chordToPush = {
        E: currentChord.E === -1 ? 0 : currentChord.E,
        A: currentChord.A === -1 ? 0 : currentChord.A,
        D: currentChord.D === -1 ? 0 : currentChord.D,
        G: currentChord.G === -1 ? 0 : currentChord.G,
        B: currentChord.B === -1 ? 0 : currentChord.B,
        e: currentChord.e === -1 ? 0 : currentChord.e,
      }
      chords.push({
        measureIndex: measureIndex,
        beatIndex: i,
        chord: chordToPush,
      })
    }
  })
  console.log(chords)
  return chords
}

// Simple function that determines if a chord is frettable
// It does not cover all the cases
export const frettable = (chord: Chord): boolean => {
  const frets = [
    chord.E === -1 ? 0 : chord.E,
    chord.A === -1 ? 0 : chord.A,
    chord.D === -1 ? 0 : chord.D,
    chord.G === -1 ? 0 : chord.G,
    chord.B === -1 ? 0 : chord.B,
    chord.e === -1 ? 0 : chord.e,
  ]

  frets.sort((a, b) => a - b)
  const fretsNonZero = frets.filter((e) => e !== 0)
  if (fretsNonZero[fretsNonZero.length - 1] - fretsNonZero[0] >= 4) return false

  const usedFingers = fretsNonZero.length

  return usedFingers <= 4
}
