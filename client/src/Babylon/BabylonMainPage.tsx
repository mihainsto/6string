/** @jsxImportSource @emotion/react **/
import '@babylonjs/loaders'
import '@babylonjs/inspector'

import * as BABYLON from '@babylonjs/core'
import {
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  SceneLoader,
  Vector3,
} from '@babylonjs/core'
import { css } from '@emotion/react'
import React from 'react'

import SceneComponent from './BabylonjsHook/babylonjs-hook'
import { onRender } from './onRender'
import { StringPaths, StringRadius, strings } from './Vertices'

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
