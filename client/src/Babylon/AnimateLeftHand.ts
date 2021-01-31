import { Axis, Scene, Vector3 } from '@babylonjs/core'

import { compareGuitarString } from './GuitarHelpers'
import {
  Chord,
  GuitarString,
  LEFT_CARPALS,
  LEFT_FINGERS,
  LeftHandPoseType,
  PoseType,
} from './types'
import { FINGERS_DIFF_FRETS } from './Vertices'

// const applyRotationToFingerBone = ({
//   id,
//   scene,
//   axis,
//   amount,
// }: {
//   id: string
//   scene: Scene
//   axis: Axis
//   amount: Vector3
// }) => {
//   const bone1 = scene.getBoneByID(id + '1')
//   const bone2 = scene.getBoneByID(id + '2')
//   const bone3 = scene.getBoneByID(id + '3')
//   if (bone1 && bone2 && bone3) {
//     const transformNode1 = bone1.getTransformNode()
//     const transformNode2 = bone2.getTransformNode()
//     const transformNode3 = bone3.getTransformNode()
//     if (transformNode1 && transformNode2 && transformNode3) {
//       if (axis instanceof Vector3) {
//         transformNode1.rotate(axis, amount._x)
//         transformNode2.rotate(axis, amount._y)
//         transformNode3.rotate(axis, amount._z)
//       }
//     }
//   }
// }
// const animateLeftIndex = ({
//   position,
//   scene,
// }: {
//   position: GuitarString
//   scene: Scene
// }) => {
//   if (position === GuitarString.E) {
//     applyRotationToFingerBone({
//       id: 'lIndex',
//       scene: scene,
//       axis: Axis.Z,
//       amount: new Vector3(1.4, 0.2, 0.5),
//     })
//   } else if (position === GuitarString.e) {
//     applyRotationToFingerBone({
//       id: 'lIndex',
//       scene: scene,
//       axis: Axis.Z,
//       amount: new Vector3(0.9, 1.7, 0.7),
//     })
//   }
// }

// export const animateLeftHand = ({
//   chord,
//   scene,
// }: {
//   scene: Scene
//   chord: Chord
// }) => {
//   animateLeftIndex({ position: GuitarString.e, scene: scene })
//   const leftHand = scene.getTransformNodeByID('lArmature')
//   console.log({ leftHand })
//
//   if (leftHand) leftHand.translate(Axis.Z, -25)
//   // getting the first fret position and position the hand
// }

type PoseLeftHandValues = {
  handPosition: Vector3
  carpal: {
    lCarpal1: Vector3
    lCarpal2: Vector3
    lCarpal3: Vector3
    lCarpal4: Vector3
  }
  lIndex?: { '1': Vector3; '2': Vector3; '3': Vector3 }
  lMid?: { '1': Vector3; '2': Vector3; '3': Vector3 }
  lRing?: { '1': Vector3; '2': Vector3; '3': Vector3 }
  lPinky?: { '1': Vector3; '2': Vector3; '3': Vector3 }
}
// Posing the left hand by values
const poseLeftHand = ({
  scene,
  values,
}: {
  scene: Scene
  values: PoseLeftHandValues
}) => {
  // Applying the position change to the left hand
  const handBone = scene.getBoneByID('lArmature')
  if (handBone) {
    const transformNodeHand = handBone.getTransformNode()
    if (transformNodeHand) {
      transformNodeHand.position = values.handPosition
    }
  }
  //Applying the rotation to the carpals
  Object.keys(LEFT_CARPALS).map((carpal) => {
    const bone = scene.getBoneByID(carpal)
    if (bone) {
      const transformNode = bone.getTransformNode()
      if (transformNode) {
        transformNode.rotation = values.carpal[carpal as LEFT_CARPALS]
      }
    }
  })
  // Applying the rotation to the fingers
  for (const finger in LEFT_FINGERS) {
    if (values[finger as LEFT_FINGERS]) {
      const bone1 = scene.getBoneByID(finger + '1')
      const bone2 = scene.getBoneByID(finger + '2')
      const bone3 = scene.getBoneByID(finger + '3')

      if (bone1 && bone2 && bone3) {
        const transformNode1 = bone1.getTransformNode()
        const transformNode2 = bone2.getTransformNode()
        const transformNode3 = bone3.getTransformNode()

        if (transformNode1 && transformNode2 && transformNode3) {
          transformNode1.rotation = values[finger as LEFT_FINGERS]?.[
            '1'
          ] as Vector3
          transformNode2.rotation = values[finger as LEFT_FINGERS]?.[
            '2'
          ] as Vector3
          transformNode3.rotation = values[finger as LEFT_FINGERS]?.[
            '3'
          ] as Vector3
        }
      }
    }
  }
}

// Posing the left hand by a chord input
export const poseLeftHandChord = ({
  scene,
  chord,
}: {
  scene: Scene
  chord: Chord
}) => {
  const chordPairs = Object.entries(chord)
  const chordValues = Object.values(chord).filter((e) => e !== 0)

  // Determining the first fret and the used frets
  const nonZeroChordPairs = chordPairs.filter((e) => e[1] !== 0)
  nonZeroChordPairs.sort((a, b) => a[1]! - b[1]!)
  const firstFret = nonZeroChordPairs[0][1]

  let lIndexChordPair: [string, number] | undefined
  let lMidChordPair: [string, number] | undefined
  let lRingChordPair: [string, number] | undefined
  let lPinkyChordPair: [string, number] | undefined

  let values: PoseType | undefined
  // Finding the chord pairs for every case

  // Case 1: each finger on a diff frets
  // of type: F1 - 1 F2 - 2 F3 - 3 F4 - 4
  if (!(new Set(chordValues).size !== chordValues.length)) {
    // Sorting the [string, fret] pairs by the fret
    // This array will have only 4 elements
    values = FINGERS_DIFF_FRETS[firstFret.toString()]

    const lIndexFret = firstFret
    const lMidFret = firstFret + 1
    const lRingFret = firstFret + 2
    const lPinkyFret = firstFret + 3

    lIndexChordPair = chordPairs.find((e) => e[1] === lIndexFret)
    lMidChordPair = chordPairs.find((e) => e[1] === lMidFret)
    lRingChordPair = chordPairs.find((e) => e[1] === lRingFret)
    lPinkyChordPair = chordPairs.find((e) => e[1] === lPinkyFret)
  }
  // Case 2: two fingers on the first fret and/maybe two fingers on the second
  // fret
  // of type: F1 - 1 F2 - 1
  else if (nonZeroChordPairs[0][1] === nonZeroChordPairs[1][1]) {
    // Case 2a: two fingers on the first fret two fingers on second fret
    // of type F1 - 1 F2 - 1 F3 - 2 F4 - 2
    if (
      nonZeroChordPairs.length === 4 &&
      nonZeroChordPairs[2][1] === nonZeroChordPairs[3][1]
    ) {
      values = FINGERS_DIFF_FRETS[firstFret.toString()]
      // If the first is before the second we use the first for index
      if (
        compareGuitarString(
          nonZeroChordPairs[0][0] as GuitarString,
          nonZeroChordPairs[1][0] as GuitarString,
        )
      ) {
        lIndexChordPair = nonZeroChordPairs[0]
        lMidChordPair = nonZeroChordPairs[1]
      } else {
        lIndexChordPair = nonZeroChordPairs[1]
        lMidChordPair = nonZeroChordPairs[0]
      }

      // If the first is before the second we use the first for ring
      if (
        compareGuitarString(
          nonZeroChordPairs[2][0] as GuitarString,
          nonZeroChordPairs[3][0] as GuitarString,
        )
      ) {
        lRingChordPair = nonZeroChordPairs[2]
        lPinkyChordPair = nonZeroChordPairs[3]
      } else {
        lRingChordPair = nonZeroChordPairs[3]
        lPinkyChordPair = nonZeroChordPairs[2]
      }
    }
    // Case 2: two fingers on the first fret
    // of type: F1 - 1 F2 - 1 F3 - 2 F4 - 3
    else {
      values = FINGERS_DIFF_FRETS[firstFret.toString()]

      const lRingFret = firstFret + 1
      const lPinkyFret = firstFret + 2

      // If the first is before the scond we use the first for index
      if (
        compareGuitarString(
          nonZeroChordPairs[0][0] as GuitarString,
          nonZeroChordPairs[1][0] as GuitarString,
        )
      ) {
        lIndexChordPair = nonZeroChordPairs[0]
        lMidChordPair = nonZeroChordPairs[1]
      } else {
        lIndexChordPair = nonZeroChordPairs[1]
        lMidChordPair = nonZeroChordPairs[0]
      }

      lRingChordPair = chordPairs.find((e) => e[1] === lRingFret)
      lPinkyChordPair = chordPairs.find((e) => e[1] === lPinkyFret)
    }
  }
  // Case 3: Two fingers on the second fret one finger first fret
  // of type: F1 - 1 F2 - 2 F3 - 2 F4 - 3
  else if (
    nonZeroChordPairs.length >= 3 &&
    nonZeroChordPairs[1][1] === nonZeroChordPairs[2][1] &&
    nonZeroChordPairs[0][1] !== nonZeroChordPairs[1][1]
  ) {
    values = FINGERS_DIFF_FRETS[firstFret.toString()]

    const lPinkyFret = firstFret + 2
    lIndexChordPair = nonZeroChordPairs[0]
    if (
      compareGuitarString(
        nonZeroChordPairs[1][0] as GuitarString,
        nonZeroChordPairs[2][0] as GuitarString,
      )
    ) {
      lMidChordPair = nonZeroChordPairs[1]
      lRingChordPair = nonZeroChordPairs[2]
    } else {
      lMidChordPair = nonZeroChordPairs[2]
      lRingChordPair = nonZeroChordPairs[1]
    }
    lPinkyChordPair = chordPairs.find((e) => e[1] === lPinkyFret)
  }
  // Case 4: Two fingers on the third fret
  // of type: F1 - 1 F2 - 2 F3 - 3 F4 - 3
  else if (
    nonZeroChordPairs.length === 4 &&
    nonZeroChordPairs[2][1] === nonZeroChordPairs[3][1]
  ) {
    values = FINGERS_DIFF_FRETS[firstFret.toString()]
    lIndexChordPair = nonZeroChordPairs[0]
    lMidChordPair = nonZeroChordPairs[1]
    if (
      compareGuitarString(
        nonZeroChordPairs[2][0] as GuitarString,
        nonZeroChordPairs[3][0] as GuitarString,
      )
    ) {
      lRingChordPair = nonZeroChordPairs[2]
      lPinkyChordPair = nonZeroChordPairs[3]
    } else {
      lRingChordPair = nonZeroChordPairs[3]
      lPinkyChordPair = nonZeroChordPairs[2]
    }
  }

  // Finding the strings for the chord pairs and call the transformation function
  const lIndexString: GuitarString | undefined =
    lIndexChordPair && (lIndexChordPair[0] as GuitarString)
  const lMidString: GuitarString | undefined =
    lMidChordPair && (lMidChordPair[0] as GuitarString)
  const lRingString: GuitarString | undefined =
    lRingChordPair && (lRingChordPair[0] as GuitarString)
  const lPinkyString: GuitarString | undefined =
    lPinkyChordPair && (lPinkyChordPair[0] as GuitarString)

  values &&
    poseLeftHand({
      scene,
      values: {
        carpal: {
          lCarpal1: new Vector3(
            values.carpal['1'].x / 100,
            values.carpal['1'].y / 100,
            values.carpal['1'].z / 100,
          ),
          lCarpal2: new Vector3(
            values.carpal['2'].x / 100,
            values.carpal['2'].y / 100,
            values.carpal['2'].z / 100,
          ),
          lCarpal3: new Vector3(
            values.carpal['3'].x / 100,
            values.carpal['3'].y / 100,
            values.carpal['3'].z / 100,
          ),
          lCarpal4: new Vector3(
            values.carpal['4'].x / 100,
            values.carpal['4'].y / 100,
            values.carpal['4'].z / 100,
          ),
        },
        handPosition: new Vector3(
          values.handPosition.x / 100,
          values.handPosition.y / 100,
          values.handPosition.z / 100,
        ),
        ...(lIndexString && {
          lIndex: {
            '1': new Vector3(
              values.lIndex[lIndexString]['1'].x / 100,
              values.lIndex[lIndexString]['1'].y / 100,
              values.lIndex[lIndexString]['1'].z / 100,
            ),
            '2': new Vector3(
              values.lIndex[lIndexString]['2'].x / 100,
              values.lIndex[lIndexString]['2'].y / 100,
              values.lIndex[lIndexString]['2'].z / 100,
            ),
            '3': new Vector3(
              values.lIndex[lIndexString]['3'].x / 100,
              values.lIndex[lIndexString]['3'].y / 100,
              values.lIndex[lIndexString]['3'].z / 100,
            ),
          },
        }),
        ...(lMidString && {
          lMid: {
            '1': new Vector3(
              values.lMid[lMidString]['1'].x / 100,
              values.lMid[lMidString]['1'].y / 100,
              values.lMid[lMidString]['1'].z / 100,
            ),
            '2': new Vector3(
              values.lMid[lMidString]['2'].x / 100,
              values.lMid[lMidString]['2'].y / 100,
              values.lMid[lMidString]['2'].z / 100,
            ),
            '3': new Vector3(
              values.lMid[lMidString]['3'].x / 100,
              values.lMid[lMidString]['3'].y / 100,
              values.lMid[lMidString]['3'].z / 100,
            ),
          },
        }),
        ...(lRingString && {
          lRing: {
            '1': new Vector3(
              values.lRing[lRingString]['1'].x / 100,
              values.lRing[lRingString]['1'].y / 100,
              values.lRing[lRingString]['1'].z / 100,
            ),
            '2': new Vector3(
              values.lRing[lRingString]['2'].x / 100,
              values.lRing[lRingString]['2'].y / 100,
              values.lRing[lRingString]['2'].z / 100,
            ),
            '3': new Vector3(
              values.lRing[lRingString]['3'].x / 100,
              values.lRing[lRingString]['3'].y / 100,
              values.lRing[lRingString]['3'].z / 100,
            ),
          },
        }),
        ...(lPinkyString && {
          lPinky: {
            '1': new Vector3(
              values.lPinky[lPinkyString]['1'].x / 100,
              values.lPinky[lPinkyString]['1'].y / 100,
              values.lPinky[lPinkyString]['1'].z / 100,
            ),
            '2': new Vector3(
              values.lPinky[lPinkyString]['2'].x / 100,
              values.lPinky[lPinkyString]['2'].y / 100,
              values.lPinky[lPinkyString]['2'].z / 100,
            ),
            '3': new Vector3(
              values.lPinky[lPinkyString]['3'].x / 100,
              values.lPinky[lPinkyString]['3'].y / 100,
              values.lPinky[lPinkyString]['3'].z / 100,
            ),
          },
        }),
      },
    })

  return null
}
