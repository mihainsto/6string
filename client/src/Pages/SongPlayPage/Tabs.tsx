/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Button, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { FC } from 'react'
import { standard } from 'react-guitar-tunings'
import { ResizableBox } from 'react-resizable'
import * as Tone from 'tone'

import { useChordStore, useNotesStore } from '../../App'
import { getChordsFromTrack } from '../../Babylon/utils/GuitarHelpers'
import { SpeedSelector } from '../../Components/Features/Playground/SpeedSelector'
import useWindowSize from '../../Hooks/useWindowSize'
import useSound from '../../Packages/react-guitar-sound'
import {
  GuitarProTab,
  Measure as MeasureType,
} from '../../Types/guitarProTabs.types'
import { Measure } from './Measure'
let PLAY_SPEED_FACTOR = 0.8
let previousTime = 0
let previousTimeStored = 0

type TabsProps = {
  tab: GuitarProTab
}

export const Tabs: FC<TabsProps> = ({ tab }) => {
  let toneStarted = false
  const theme = useTheme()
  const [playButtonState, setPlayButtonState] = useState<'PLAY' | 'PAUSE'>(
    'PLAY',
  )
  const [cursorPosition, setCursorPosition] = useState<{
    measure: number
    position: number
  }>({ measure: 0, position: 0 })

  const windowSize = useWindowSize()
  const { play } = useSound({ tuning: standard })
  const track = tab.tracks[0]

  const onPlayClicked = async () => {
    let currentMeasurePlayed = cursorPosition.measure
    let currentNotesPlayed = cursorPosition.position
    let startTime = 0

    const chords = getChordsFromTrack(track)

    useChordStore.setState({ currentChord: chords[0].chord })

    const playInterval = (time: number) => {
      if (track) {
        const tickTime =
          (time * 1000 - startTime) * PLAY_SPEED_FACTOR + previousTimeStored
        previousTime = tickTime
        const currentBeat =
          track.measures[currentMeasurePlayed].voices[0].beats[
            currentNotesPlayed
          ]
        if (Math.abs(currentBeat.start * 0.4 - tickTime) < 200) {
          setCursorPosition({
            measure: currentMeasurePlayed,
            position: currentNotesPlayed,
          })
          const strings = [0, 0, 0, 0, 0, 0]

          // Write the chord for this notes
          const currentChord = chords.find(
            (el) =>
              el.beatIndex === currentNotesPlayed &&
              el.measureIndex === currentMeasurePlayed,
          )

          currentChord &&
            useChordStore.setState({
              currentChord: currentChord.chord,
            })

          // Getting the frets if capo
          currentBeat.notes.forEach((note) => {
            strings[note.string - 1] = note.value + track.offset
          })

          // Playing the notes
          currentBeat.notes.forEach((note) => {
            play(note.string - 1, 0, strings)
          })
          // Write the notes inside local storage to get them on the 3D side
          useNotesStore.setState({
            currentNotes: currentBeat.notes,
            timestamp: new Date(),
          })

          // offset the currentNotesPlayed and currentMeasurePlayed if we reach the end of a measure
          if (
            currentNotesPlayed ==
            track.measures[currentMeasurePlayed].voices[0].beats.length - 1
          ) {
            currentNotesPlayed = 0
            currentMeasurePlayed += 1
          } else {
            currentNotesPlayed += 1
          }
          if (currentMeasurePlayed == track.measures.length) {
            Tone.Transport.stop()
            setCursorPosition({ measure: 0, position: 0 })
            currentMeasurePlayed = 0
            currentNotesPlayed = 0
            previousTimeStored = 0
            previousTime = 0
            setPlayButtonState('PLAY')
          }
        }
      }
    }
    if (!toneStarted) {
      await Tone.start()
      toneStarted = true
    }
    Tone.Transport.scheduleRepeat((time) => {
      if (startTime == 0) {
        startTime = time * 1000
      }
      playInterval(time)
    }, '0.1s')

    Tone.Transport.start()
  }

  const onPauseClicked = () => {
    Tone.Transport.stop()
    previousTimeStored = previousTime
  }

  return (
    <ResizableBox
      css={css`
        position: absolute;
        bottom: 0;
        background-color: ${theme.palette.background.default};
        box-shadow: 0 -5px 5px -5px #333;
      `}
      axis={'y'}
      width={windowSize.width as number}
      height={200}
      minConstraints={[100, 100]}
      resizeHandles={['n']}
    >
      <div
        css={css`
          display: flex;
          gap: 20px;
          align-items: center;
          position: relative;
          top: -50px;
          left: 20px;
        `}
      >
        <Button
          variant={'contained'}
          onClick={() => {
            if (playButtonState === 'PLAY') {
              setPlayButtonState('PAUSE')
              onPlayClicked()
            } else {
              setPlayButtonState('PLAY')
              onPauseClicked()
            }
          }}
        >
          {playButtonState}
        </Button>
        <SpeedSelector
          onDragStart={() => {
            onPauseClicked()
          }}
          onChange={(value) => {
            PLAY_SPEED_FACTOR = value / 10
            if (playButtonState === 'PAUSE') onPlayClicked()
          }}
        />
      </div>

      <div
        css={css`
          margin-top: -36px;
          margin-left: 20px;
          overflow: auto;
          height: 100%;
          position: relative;
        `}
      >
        <div
          css={css`
            margin-top: 20px;
            display: flex;
            flex-flow: wrap;
            row-gap: 40px;
          `}
        >
          <div />
          <Measure
            cursorPosition={
              cursorPosition.measure === 0 ? cursorPosition.position : undefined
            }
            key={0}
            measure={track.measures[0] as MeasureType}
            nextMeasureStart={
              track.measures[1].voices[0].beats[0].start as number
            }
            previousMeasureEnd={0}
          />

          {track.measures.map((measure, index) => {
            if (index != 0 && index != track.measures.length - 1) {
              return (
                <Measure
                  cursorPosition={
                    cursorPosition.measure === index
                      ? cursorPosition.position
                      : undefined
                  }
                  key={index}
                  measure={measure as MeasureType}
                  nextMeasureStart={
                    track.measures[index + 1].voices[0].beats[0].start as number
                  }
                  previousMeasureEnd={
                    track.measures[index - 1].voices[0].beats[
                      track.measures[index - 1].voices[0].beats.length - 1
                    ].start as number
                  }
                />
              )
            }
            if (index == track?.measures.length - 1) {
              return (
                <Measure
                  cursorPosition={
                    cursorPosition.measure === index
                      ? cursorPosition.position
                      : undefined
                  }
                  key={index}
                  measure={measure as MeasureType}
                  nextMeasureStart={
                    (track.measures[index].voices[0].beats[
                      track.measures[index].voices[0].beats.length - 1
                    ].start as number) + 1000
                  }
                  previousMeasureEnd={
                    track.measures[index - 1].voices[0].beats[
                      track.measures[index - 1].voices[0].beats.length - 1
                    ].start as number
                  }
                />
              )
            }
          })}
        </div>
      </div>
    </ResizableBox>
  )
}
