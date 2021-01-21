import { Axis, Scene } from '@babylonjs/core'

import { GuitarString } from './types'

// TODO: Make the movement more fluent and refactor this
// Basic snap movement of the right hand fingers
export const animateRightHandFinger = ({
  string,
  scene,
}: {
  string: GuitarString
  scene: Scene
}) => {
  if (string === GuitarString.G) {
    const bone = scene.getBoneByID('rIndex1')
    if (bone) {
      const transformNode = bone.getTransformNode()
      if (transformNode) {
        transformNode.rotate(Axis.Z, 0.2)
        setTimeout(() => {
          transformNode.rotate(Axis.Z, -0.2)
        }, 300)
      }
    }
  } else if (string === GuitarString.B) {
    const bone = scene.getBoneByID('rMid1')
    if (bone) {
      const transformNode = bone.getTransformNode()
      if (transformNode) {
        transformNode.rotate(Axis.Z, 0.2)
        setTimeout(() => {
          transformNode.rotate(Axis.Z, -0.2)
        }, 300)
      }
    }
  } else if (string === GuitarString.e) {
    const bone = scene.getBoneByID('rRing1')
    if (bone) {
      const transformNode = bone.getTransformNode()
      if (transformNode) {
        transformNode.rotate(Axis.Z, 0.2)
        setTimeout(() => {
          transformNode.rotate(Axis.Z, -0.2)
        }, 300)
      }
    }
  } else if (string === GuitarString.E) {
    const bone = scene.getBoneByID('rThumb1')
    if (bone) {
      const transformNode = bone.getTransformNode()
      if (transformNode) {
        transformNode.rotate(Axis.X, 0.1)
        setTimeout(() => {
          transformNode.rotate(Axis.X, -0.1)
        }, 300)
      }
    }
  } else if (string === GuitarString.A) {
    const bone = scene.getBoneByID('rThumb1')
    if (bone) {
      const transformNode = bone.getTransformNode()
      if (transformNode) {
        transformNode.rotate(Axis.X, 0.3)
        setTimeout(() => {
          transformNode.rotate(Axis.X, -0.3)
        }, 300)
      }
    }
  } else if (string === GuitarString.D) {
    const bone = scene.getBoneByID('rThumb1')
    if (bone) {
      const transformNode = bone.getTransformNode()
      if (transformNode) {
        transformNode.rotate(Axis.X, 0.4)
        setTimeout(() => {
          transformNode.rotate(Axis.X, -0.4)
        }, 300)
      }
    }
  }
}
