import { MeshBuilder, Vector3 } from '@babylonjs/core'
import { Mesh } from '@babylonjs/core/Meshes/mesh'

import { GuitarString } from '../types'
import { strings } from '../Vertices'

export const updateString = (stringName: GuitarString, newPath: Vector3[]) => {
  if (strings[stringName])
    strings[stringName] = MeshBuilder.CreateTube(stringName + 'string', {
      path: newPath,
      instance: strings[stringName] as Mesh,
    })
}

type animateGuitarStringArgs = {
  stringName: GuitarString
  path: Vector3[]
  directionVector: Vector3
  controlPointParameter: number
  controlZFactor: number
  min: number
  max: number
  animationRatio: number
  stepOsc?: number
  stepMin?: number
  stepMax?: number
  restart?: boolean
  run?: boolean
}

export type animateGuitarStringReturnType = {
  done: boolean
  min: number
  max: number
  stepOsc: number
}
export const animateGuitarString = ({
  stringName,
  path,
  directionVector,
  controlPointParameter,
  animationRatio,
  controlZFactor,
  min,
  max,
  stepOsc,
  restart,
}: animateGuitarStringArgs): {
  done: boolean
  min: number
  max: number
  stepOsc: number
} => {
  const animationSpeed = animationRatio * 0.0003
  // The control point is where the finger is placed
  // So that the animation occurs only to the free string
  const controlPoint = path[0].add(
    directionVector.multiplyByFloats(
      controlPointParameter,
      controlPointParameter,
      controlPointParameter,
    ),
  )
  // Oscillation point, the point from the middle of the remaining string
  const oscPoint = path[0].add(
    directionVector.multiplyByFloats(
      controlPointParameter / 2,
      controlPointParameter / 2,
      controlPointParameter / 2,
    ),
  )

  if (restart) {
    return { done: false, min: min, max: max, stepOsc: 0 }
  } else {
    // If the oscillation step is less than 0 we want a positive move this time
    // And else a negative move
    let minLocal = min
    let maxLocal = max
    if (stepOsc! < 0) {
      maxLocal -= animationSpeed
      stepOsc = maxLocal
    } else {
      minLocal += animationSpeed
      stepOsc = minLocal
    }
    if (maxLocal < 0 || minLocal > 0) {
      return { done: true, min: 0, max: 0, stepOsc: 0 }
    }
    oscPoint.addInPlaceFromFloats(0, stepOsc, 0)
    const newPath = [path[0], oscPoint, controlPoint, path[path.length - 1]]
    updateString(stringName, newPath)
    return {
      done: false,
      min: minLocal,
      max: maxLocal,
      stepOsc: stepOsc,
    }
  }
}
