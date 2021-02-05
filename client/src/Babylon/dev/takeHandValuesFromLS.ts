import { Scene, Vector3 } from '@babylonjs/core'

import { poseLeftHandChord } from '../Animation/AnimateLeftHand'

let lastValues: any

// Takes fingers + hand + carpals values from local storage
// and apply to the left hand
// to be used with debugRangeSelectForBones component
export const takeHandValuesFromLS = ({ scene }: { scene: Scene }) => {
  poseLeftHandChord({ scene, chord: { E: 0, A: 3, D: 0, G: 2, B: 1, e: 3 } })

  const lstorage = window.localStorage
  const values: any = JSON.parse(lstorage.getItem('debug_bone')!) as any
  if (JSON.stringify(lastValues) !== JSON.stringify(values)) {
    if (values.boneId) {
      const bone1 = scene.getBoneByID(values.boneId + '1')
      const bone2 = scene.getBoneByID(values.boneId + '2')
      const bone3 = scene.getBoneByID(values.boneId + '3')
      const carpal1 = scene.getBoneByID('lCarpal1')
      const carpal2 = scene.getBoneByID('lCarpal2')
      const carpal3 = scene.getBoneByID('lCarpal3')
      const carpal4 = scene.getBoneByID('lCarpal4')

      const handBone = scene.getBoneByID('lArmature')
      if (
        bone1 &&
        bone2 &&
        bone3 &&
        carpal1 &&
        carpal2 &&
        carpal3 &&
        carpal4 &&
        handBone
      ) {
        const transformNode1 = bone1.getTransformNode()
        const transformNode2 = bone2.getTransformNode()
        const transformNode3 = bone3.getTransformNode()

        const carpal1TransformNode = carpal1.getTransformNode()
        const carpal2TransformNode = carpal2.getTransformNode()
        const carpal3TransformNode = carpal3.getTransformNode()
        const carpal4TransformNode = carpal4.getTransformNode()

        const transformNodeHand = handBone.getTransformNode()
        if (
          transformNode1 &&
          transformNode2 &&
          transformNode3 &&
          carpal1TransformNode &&
          carpal2TransformNode &&
          carpal3TransformNode &&
          carpal4TransformNode &&
          transformNodeHand
        ) {
          transformNode1.rotation = new Vector3(
            values.x1 / 100,
            values.y1 / 100,
            values.z1 / 100,
          )
          transformNode2.rotation = new Vector3(
            values.x2 / 100,
            values.y2 / 100,
            values.z2 / 100,
          )
          transformNode3.rotation = new Vector3(
            values.x3 / 100,
            values.y3 / 100,
            values.z3 / 100,
          )

          carpal1TransformNode.rotation = new Vector3(
            values.carpal1X / 100,
            values.carpal1Y / 100,
            values.carpal1Z / 100,
          )
          carpal2TransformNode.rotation = new Vector3(
            values.carpal2X / 100,
            values.carpal2Y / 100,
            values.carpal2Z / 100,
          )
          carpal3TransformNode.rotation = new Vector3(
            values.carpal3X / 100,
            values.carpal3Y / 100,
            values.carpal3Z / 100,
          )
          carpal4TransformNode.rotation = new Vector3(
            values.carpal4X / 100,
            values.carpal4Y / 100,
            values.carpal4Z / 100,
          )
          transformNodeHand.position = new Vector3(
            values.handX / 100,
            values.handY / 100,
            values.handZ / 100,
          )
        }
      }
    }
    lastValues = values
  }
}
