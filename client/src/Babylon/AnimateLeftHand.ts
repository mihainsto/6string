import { Axis, Scene, Vector3 } from '@babylonjs/core'

import { Chord, GuitarString } from './types'

const applyRotationToFingerBone = ({
  id,
  scene,
  axis,
  amount,
}: {
  id: string
  scene: Scene
  axis: Axis
  amount: Vector3
}) => {
  const bone1 = scene.getBoneByID(id + '1')
  const bone2 = scene.getBoneByID(id + '2')
  const bone3 = scene.getBoneByID(id + '3')
  if (bone1 && bone2 && bone3) {
    const transformNode1 = bone1.getTransformNode()
    const transformNode2 = bone2.getTransformNode()
    const transformNode3 = bone3.getTransformNode()
    if (transformNode1 && transformNode2 && transformNode3) {
      if (axis instanceof Vector3) {
        transformNode1.rotate(axis, amount._x)
        transformNode2.rotate(axis, amount._y)
        transformNode3.rotate(axis, amount._z)
      }
    }
  }
}
const animateLeftIndex = ({
  position,
  scene,
}: {
  position: GuitarString
  scene: Scene
}) => {
  if (position === GuitarString.E) {
    applyRotationToFingerBone({
      id: 'lIndex',
      scene: scene,
      axis: Axis.Z,
      amount: new Vector3(1.4, 0.2, 0.5),
    })
  } else if (position === GuitarString.e) {
    applyRotationToFingerBone({
      id: 'lIndex',
      scene: scene,
      axis: Axis.Z,
      amount: new Vector3(0.9, 1.7, 0.7),
    })
  }
}

export const animateLeftHand = ({
  chord,
  scene,
}: {
  scene: Scene
  chord: Chord
}) => {
  animateLeftIndex({ position: GuitarString.e, scene: scene })
  const leftHand = scene.getTransformNodeByID('lArmature')
  console.log({ leftHand })

  if (leftHand) leftHand.translate(Axis.Z, -25)
  // getting the first fret position and position the hand
}
