import { GuitarString } from './types'

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
