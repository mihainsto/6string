import { Scene } from '@babylonjs/core'

import { NotesStore } from '../State/BabylonState'
import { Note } from '../Types/guitarProTabs.types'
import {
  animateGuitarString,
  animateGuitarStringReturnType,
} from './Animation/AnimateGuitarString'
import { animateRightHandFinger } from './Animation/AnimateRightHandFinger'
import { GuitarString } from './types'
import {
  StringControlPoints,
  StringDirectionVectors,
  StringPaths,
} from './Vertices'

let oldNotes: Note[] | null = null

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

const { getState: getNotes } = NotesStore

export const onRender = (scene: Scene) => {
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

  const currentNotes: Note[] | undefined = getNotes().currentNotes

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
