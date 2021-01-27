import { Vector3 } from '@babylonjs/core'
import { Mesh } from '@babylonjs/core/Meshes/mesh'

// The strings paths
// The strings are defined as:
// The first point - The oscillation point - The control point - The end point
// The control point coincides with the end point at init
// This is the case that we want the hole string to oscillate
export const StringPaths = {
  E: [
    new Vector3(-8.74, 1.757, -11.988),
    new Vector3(57.692, 0.498, -11.811),
    new Vector3(57.692, 0.498, -11.811),
    new Vector3(57.692, 0.498, -11.811),
  ],
  A: [
    new Vector3(-8.624, 0.592, -12.02),
    new Vector3(57.692, -0.21, -11.798),
    new Vector3(57.692, -0.21, -11.798),
    new Vector3(57.692, -0.21, -11.798),
  ],
  D: [
    new Vector3(-8.549, -0.532, -12.013),
    new Vector3(57.673, -0.902, -11.791),
    new Vector3(57.673, -0.902, -11.791),
    new Vector3(57.673, -0.902, -11.791),
  ],
  G: [
    new Vector3(-8.481, -1.845, -12.017),
    new Vector3(57.673, -1.612, -11.789),
    new Vector3(57.673, -1.612, -11.789),
    new Vector3(57.673, -1.612, -11.789),
  ],
  B: [
    new Vector3(-8.414, -2.981, -12.007),
    new Vector3(57.645, -2.292, -11.782),
    new Vector3(57.645, -2.292, -11.782),
    new Vector3(57.645, -2.292, -11.782),
  ],
  e: [
    new Vector3(-8.145, -4.242, -12.036),
    new Vector3(57.65, -3.003, -11.78),
    new Vector3(57.65, -3.003, -11.78),
    new Vector3(57.65, -3.003, -11.78),
  ],
}

// The points where the string is in front of a fret line
export const StringControlPoints = [
  1,
  0.942,
  0.888,
  0.84,
  0.79,
  0.745,
  0.705,
  0.665,
  0.63,
  0.593,
  0.56,
  0.53,
  0.5,
  0.47,
  0.445,
  0.418,
  0.395,
  0.375,
  0.354,
  0.335,
  0.315,
]

// TODO: Find this values
// The value that you need to add to z so that the string looks pressed and near the fretboard
export const StringZControlPointsAppend = [
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
  0.2,
]

// The direction vectors that are used for determining points on the strings
// ex: StringPaths.E + Value between (0, 1) + StringDirectionVectors.E determins
// a point on the string
export const StringDirectionVectors = {
  E: StringPaths.E[StringPaths.E.length - 1].subtract(StringPaths.E[0]),
  A: StringPaths.A[StringPaths.A.length - 1].subtract(StringPaths.A[0]),
  D: StringPaths.D[StringPaths.D.length - 1].subtract(StringPaths.D[0]),
  G: StringPaths.G[StringPaths.G.length - 1].subtract(StringPaths.G[0]),
  B: StringPaths.B[StringPaths.B.length - 1].subtract(StringPaths.B[0]),
  e: StringPaths.e[StringPaths.e.length - 1].subtract(StringPaths.e[0]),
}

export const strings: {
  E: Mesh | null
  A: Mesh | null
  D: Mesh | null
  G: Mesh | null
  B: Mesh | null
  e: Mesh | null
} = {
  E: null,
  A: null,
  D: null,
  G: null,
  B: null,
  e: null,
}

// The radius of the strings, the gauge used is for a 'Set of 10s'
export const StringRadius = {
  E: 0.0584,
  A: 0.0457,
  D: 0.03302,
  G: 0.02159,
  B: 0.01651,
  e: 0.0127,
}

// Left hand fingers values
// Case 1: each finger on a diff frets
// of type: F1 - 1 F2 - 2 F3 - 3 F4 - 4
export const FINGERS_DIFF_FRETS = {
  1: {
    handPosition: { x: null, y: null, z: null },
    carpal: { lCarpal1: null, lCarpal2: null, lCarpal3: null, lCarpal4: null },
    lIndex: { E: null, A: null, D: null, G: null, B: null, e: null },
    lMid: { E: null, A: null, D: null, G: null, B: null, e: null },
    lRing: { E: null, A: null, D: null, G: null, B: null, e: null },
    lPinky: { E: null, A: null, D: null, G: null, B: null, e: null },
  },
}

// Case 2: two fingers on the first fret
// of type: F1 - 1 F2 - 1 F3 - 2 F4 - 3
export const TWO_FINGERS_FIRST_FRET = {
  1: {
    handPosition: { x: null, y: null, z: null },
    carpal: { lCarpal1: null, lCarpal2: null, lCarpal3: null, lCarpal4: null },
    lIndex: { E: null, A: null, D: null, G: null, B: null, e: null },
    lMid: { E: null, A: null, D: null, G: null, B: null, e: null },
    lRing: { E: null, A: null, D: null, G: null, B: null, e: null },
    lPinky: { E: null, A: null, D: null, G: null, B: null, e: null },
  },
}

// Case 3: two fingers on the second fret
// of type: F1 - 1 F2 - 2 F3 - 2 F4 - 3
export const TWO_FINGERS_SECOND_FRET = {
  1: {
    handPosition: { x: null, y: null, z: null },
    carpal: { lCarpal1: null, lCarpal2: null, lCarpal3: null, lCarpal4: null },
    lIndex: { E: null, A: null, D: null, G: null, B: null, e: null },
    lMid: { E: null, A: null, D: null, G: null, B: null, e: null },
    lRing: { E: null, A: null, D: null, G: null, B: null, e: null },
    lPinky: { E: null, A: null, D: null, G: null, B: null, e: null },
  },
}

// Case 4: two fingers on the first two fingers second
// of type: F1 - 1 F2 - 1 F3 - 2 F4 - 2
export const TWO_FINGERS_FIRST_SECOND_FRET = {
  1: {
    handPosition: { x: null, y: null, z: null },
    carpal: { lCarpal1: null, lCarpal2: null, lCarpal3: null, lCarpal4: null },
    lIndex: { E: null, A: null, D: null, G: null, B: null, e: null },
    lMid: { E: null, A: null, D: null, G: null, B: null, e: null },
    lRing: { E: null, A: null, D: null, G: null, B: null, e: null },
    lPinky: { E: null, A: null, D: null, G: null, B: null, e: null },
  },
}

// Case 5: two fingers on the third fret
// of type: F1 - 1 F2 - 2 F3 - 3 F4 - 3
export const TWO_FINGERS_THIRD_FRET = {
  1: {
    handPosition: { x: null, y: null, z: null },
    carpal: { lCarpal1: null, lCarpal2: null, lCarpal3: null, lCarpal4: null },
    lIndex: { E: null, A: null, D: null, G: null, B: null, e: null },
    lMid: { E: null, A: null, D: null, G: null, B: null, e: null },
    lRing: { E: null, A: null, D: null, G: null, B: null, e: null },
    lPinky: { E: null, A: null, D: null, G: null, B: null, e: null },
  },
}
