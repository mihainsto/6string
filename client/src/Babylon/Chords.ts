import { Chord } from './types'

export const CHORDS: { [key: string]: Chord } = {
  C: {
    E: 0,
    A: 3,
    D: 2,
    G: 0,
    B: 1,
    e: 0,
  },
  F: {
    E: 0,
    A: 3,
    D: 3,
    G: 2,
    B: 1,
    e: 0,
  },
  G: {
    E: 3,
    A: 2,
    D: 0,
    G: 0,
    B: 0,
    e: 3,
  },
  Em: {
    E: 0,
    A: 2,
    D: 2,
    G: 0,
    B: 0,
    e: 0,
  },
  Am: {
    E: 0,
    A: 0,
    D: 2,
    G: 2,
    B: 1,
    e: 0,
  },
  Dm: {
    E: 0,
    A: 0,
    D: 0,
    G: 2,
    B: 3,
    e: 1,
  },
}
