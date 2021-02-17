/** @jsxImportSource @emotion/react **/
/*eslint-disable */

import { css } from '@emotion/react'
import React, { FC, useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { BabylonMainPage } from '../../Babylon/BabylonMainPage'
import { CurrentChordWidget } from '../../Components/Features/Playground/CurrentChordWidget'
import { SelectChordPopover } from '../../Components/Features/Playground/SelectChordPopover'
import { PlaygroundNav } from '../../Components/Navigation/PlaygroundNav'
import { useCurrentUser } from '../../Hooks/useCurrentUser'
import { useIsLoggedIn } from '../../Hooks/useIsLoggedIn'
import { useChordStore, useNotesStore } from '../../App'
import useSound from '../../Packages/react-guitar-sound'
import { standard } from 'react-guitar-tunings'
import { Note } from '../../Types/guitarProTabs.types'

export const PlaygroundPage: FC = () => {
  const { data: userData } = useCurrentUser()
  const loggedIn = useIsLoggedIn()
  const { play } = useSound({ tuning: standard })
  const currentChord = useChordStore((state) => state.currentChord)

  useEffect(() => {
    useNotesStore.setState({
      currentNotes: undefined,
      timestamp: undefined,
    })
  }, [])

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        overflow: hidden;
      `}
      onKeyDown={(e) => {
        if (e.code === 'KeyQ') {
          const currentNotes: Note[] = [
            { string: 6, value: currentChord ? currentChord.E : 0 },
          ]
          useNotesStore.setState({
            currentNotes,
            timestamp: new Date(),
          })
          const stringsE = [0, 0, 0, 0, 0, currentChord ? currentChord.E : 0]
          play(5, 0, stringsE)
        }

        if (e.code === 'KeyW') {
          const currentNotes: Note[] = [
            { string: 5, value: currentChord ? currentChord.A : 0 },
          ]
          useNotesStore.setState({
            currentNotes,
            timestamp: new Date(),
          })
          const stringsA = [0, 0, 0, 0, currentChord ? currentChord.A : 0, 0]
          play(4, 0, stringsA)
        }
        if (e.code === 'KeyE') {
          const currentNotes: Note[] = [
            { string: 4, value: currentChord ? currentChord.D : 0 },
          ]
          useNotesStore.setState({
            currentNotes,
            timestamp: new Date(),
          })
          const stringsD = [0, 0, 0, currentChord ? currentChord.D : 0, 0, 0]
          play(3, 0, stringsD)
        }

        if (e.code === 'KeyA') {
          const currentNotes: Note[] = [
            { string: 3, value: currentChord ? currentChord.G : 0 },
          ]
          useNotesStore.setState({
            currentNotes,
            timestamp: new Date(),
          })
          const stringsG = [0, 0, currentChord ? currentChord.G : 0, 0, 0, 0]
          play(2, 0, stringsG)
        }
        if (e.code === 'KeyS') {
          const currentNotes: Note[] = [
            { string: 2, value: currentChord ? currentChord.B : 0 },
          ]
          useNotesStore.setState({
            currentNotes,
            timestamp: new Date(),
          })
          const stringsB = [0, currentChord ? currentChord.B : 0, 0, 0, 0, 0]
          play(1, 0, stringsB)
        }
        if (e.code === 'KeyD') {
          const currentNotes: Note[] = [
            { string: 1, value: currentChord ? currentChord.e : 0 },
          ]
          useNotesStore.setState({
            currentNotes,
            timestamp: new Date(),
          })
          const stringse = [currentChord ? currentChord.e : 0, 0, 0, 0, 0, 0]
          play(0, 0, stringse)
        }
      }}
    >
      <div
        css={css`
          position: absolute;
          width: 100%;
        `}
      >
        <PlaygroundNav page="PLAYGROUND" />
      </div>

      <BabylonMainPage />

      {userData?.me.playgroundSettings.chordWidget && (
        <CurrentChordWidget page="PLAYGROUND" />
      )}
      {!loggedIn && <CurrentChordWidget page="PLAYGROUND" />}
      <SelectChordPopover />
    </div>
  )
}
