/** @jsxImportSource @emotion/react **/
import '@babylonjs/loaders'
import '@babylonjs/inspector'

import * as BABYLON from '@babylonjs/core'
import {
  Axis,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Quaternion,
  Scene,
  SceneLoader,
  Vector3,
} from '@babylonjs/core'
import { css } from '@emotion/react'
import React from 'react'

import { Note } from '../Types/guitarProTabs.types'
import {
  animateGuitarString,
  animateGuitarStringReturnType,
} from './AnimateGuitarString'
import { poseLeftHandChord } from './AnimateLeftHand'
import { animateRightHandFinger } from './AnimateRightHandFinger'
import SceneComponent from './BabylonjsHook/babylonjs-hook'
import { GuitarString } from './types'
import {
  StringControlPoints,
  StringDirectionVectors,
  StringPaths,
  StringRadius,
  strings,
} from './Vertices'

const onSceneReady = (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  // const camera = new FreeCamera('camera1', new Vector3(0, 0, -1.2), scene)
  const camera = new FreeCamera('camera1', new Vector3(0, 3, -80), scene)
  camera.inputs.addMouseWheel()
  //var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero())
  const canvas = scene.getEngine().getRenderingCanvas()
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true)
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight('light', new Vector3(1, 1, -10), scene)
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7

  // Adding the guitar and the strings
  SceneLoader.Append('/', 'guitarscene.glb', scene, (scene) => {
    const scalingFactor = new Vector3(-100, 100, 100)
    const position = new Vector3(0, -24.584, -0.002)
    scene.meshes.forEach((mesh) => {
      if (mesh.name === '__root__') {
        mesh.scaling = scalingFactor
        mesh.position = position
      }
    })

    // Creating the strings
    strings.E = MeshBuilder.CreateTube(
      'EString',
      {
        path: StringPaths.E,
        radius: StringRadius.E,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        updatable: true,
      },
      scene,
    )
    strings.A = MeshBuilder.CreateTube(
      'AString',
      {
        path: StringPaths.A,
        radius: StringRadius.A,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        updatable: true,
      },
      scene,
    )
    strings.D = MeshBuilder.CreateTube(
      'DString',
      {
        path: StringPaths.D,
        radius: StringRadius.D,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        updatable: true,
      },
      scene,
    )
    strings.G = MeshBuilder.CreateTube(
      'GString',
      {
        path: StringPaths.G,
        radius: StringRadius.G,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        updatable: true,
      },
      scene,
    )
    strings.B = MeshBuilder.CreateTube(
      'BString',
      {
        path: StringPaths.B,
        radius: StringRadius.B,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        updatable: true,
      },
      scene,
    )
    strings.e = MeshBuilder.CreateTube(
      'eString',
      {
        path: StringPaths.e,
        radius: StringRadius.e,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        updatable: true,
      },
      scene,
    )
    //animateLeftHand({ chord: {}, scene: scene })
  })
  //scene.debugLayer.show()
}

const parameter = StringControlPoints[12]
let oldNotes: Note[] | null = null
const started = 0
const animationsStatus = {
  E: false,
  A: false,
  D: false,
  G: false,
  B: false,
  e: false,
}

const animationValues: {
  E: animateGuitarStringReturnType | null
  A: animateGuitarStringReturnType | null
  D: animateGuitarStringReturnType | null
  G: animateGuitarStringReturnType | null
  B: animateGuitarStringReturnType | null
  e: animateGuitarStringReturnType | null
} = {
  E: null,
  A: null,
  D: null,
  G: null,
  B: null,
  e: null,
}
let lastValues: any
const onRender = (scene: Scene) => {
  // DEBUG
  poseLeftHandChord({ scene, chord: { A: 3, B: 1, D: 2, E: 0, G: 0, e: 4 } })
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
          console.log({
            v3: new Vector3(
              values.handX / 100,
              values.handY / 100,
              values.handZ / 100,
            ),
          })
        }
      }
    }
    lastValues = values
  }
  // END DEBUG
  for (const guitarString in GuitarString) {
    const theString: GuitarString =
      GuitarString[guitarString as keyof typeof GuitarString]

    // The animation step
    if (animationValues[theString] && !animationValues[theString]!.done) {
      animationValues[theString] = animateGuitarString({
        controlPointParameter: StringControlPoints[0],
        controlZFactor: 0,
        directionVector: StringDirectionVectors[theString],
        path: StringPaths[theString],
        stringName: GuitarString[theString],
        animationRatio: scene.getAnimationRatio(),
        min: -0.1,
        max: 0.1,
        ...animationValues[theString],
      })
    }
  }

  const storage = window.localStorage
  const currentNotes: Note[] | null = JSON.parse(
    storage.getItem('currentNotes')!,
  ) as Note[] | null

  if (currentNotes && Array.isArray(currentNotes)) {
    // If we have a new set of notes we start the animation
    if (
      !(
        oldNotes?.length === currentNotes.length &&
        currentNotes.every(
          (v, i) => oldNotes && v.string === oldNotes[i].string,
        )
      )
    ) {
      oldNotes = currentNotes
      currentNotes.forEach((note) => {
        let theString: GuitarString = GuitarString.e
        if (note.string === 2) theString = GuitarString.B
        else if (note.string === 3) theString = GuitarString.G
        else if (note.string === 4) theString = GuitarString.D
        else if (note.string === 5) theString = GuitarString.A
        else if (note.string === 6) theString = GuitarString.E

        // Animating the fingers from right hand
        animateRightHandFinger({ string: theString, scene })

        animationValues[theString] = animateGuitarString({
          controlPointParameter: StringControlPoints[0],
          controlZFactor: 0,
          directionVector: StringDirectionVectors[theString],
          path: StringPaths[theString],
          stringName: GuitarString[theString],
          animationRatio: scene.getAnimationRatio(),
          min: -0.1,
          max: 0.1,
          restart: true,
        })
      })
    }
  }
}

export const BabylonMainPage = () => (
  <SceneComponent
    css={css`
      width: 100%;
      height: 100%;
    `}
    antialias
    onSceneReady={onSceneReady}
    onRender={onRender}
    id="my-canvas"
  />
)
