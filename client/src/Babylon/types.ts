export enum GuitarString {
  E = 'E',
  A = 'A',
  D = 'D',
  G = 'G',
  B = 'B',
  e = 'e',
}

export const GUITAR_STRINGS: GuitarString[] = [
  GuitarString.E,
  GuitarString.A,
  GuitarString.D,
  GuitarString.G,
  GuitarString.B,
  GuitarString.e,
]

export type Chord = {
  E: number
  A: number
  D: number
  G: number
  B: number
  e: number
}

export enum LEFT_FINGERS {
  'lIndex' = 'lIndex',
  'lMid' = 'lMid',
  'lRing' = 'lRing',
  'lPinky' = 'lPinky',
}

export enum LEFT_CARPALS {
  'lCarpal1' = 'lCarpal1',
  'lCarpal2' = 'lCarpal2',
  'lCarpal3' = 'lCarpal3',
  'lCarpal4' = 'lCarpal4',
}

export interface LeftHandPoseType {
  [key: string]: PoseType
}

export interface PoseType {
  handPosition: LocalVector3
  carpal: { [key: string]: LocalVector3 }
  lIndex: FingerPoseValues
  lMid: FingerPoseValues
  lRing: FingerPoseValues
  lPinky: FingerPoseValues
}

export interface LocalVector3 {
  x: number
  y: number
  z: number
}

export interface FingerPoseValues {
  E: { [key: string]: LocalVector3 }
  A: { [key: string]: LocalVector3 }
  D: { [key: string]: LocalVector3 }
  G: { [key: string]: LocalVector3 }
  B: { [key: string]: LocalVector3 }
  e: { [key: string]: LocalVector3 }
}
