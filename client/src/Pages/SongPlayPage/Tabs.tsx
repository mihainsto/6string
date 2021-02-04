/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Button } from '@material-ui/core'
import { writeStorage } from '@rehooks/local-storage'
import React, { createRef, useEffect, useState } from 'react'
import { FC } from 'react'
import { standard } from 'react-guitar-tunings'
import { ResizableBox } from 'react-resizable'
import * as Tone from 'tone'
import create from 'zustand'

import useWindowSize from '../../Hooks/useWindowSize'
import useSound from '../../Packages/react-guitar-sound'
import { MeasureStore, NotesStore } from '../../State/BabylonState'
import {
  GuitarProTab,
  Measure as MeasureType,
} from '../../Types/guitarProTabs.types'
import { Note } from '../../Types/guitarProTabs.types'
import { Measure } from './Measure'
const PLAY_SPEED_FACTOR = 0.2

type TabsProps = {
  tab: GuitarProTab
}

const useNotesStore = create(NotesStore)
const useMeasureStore = create(MeasureStore)

export const Tabs: FC<TabsProps> = ({ tab }) => {
  let toneStarted = false
  const [firstMeasureTopDistance, setFirstMeasureTopDistance] = useState(0)
  const [playButtonState, setPlayButtonState] = useState<'PLAY' | 'PAUSE'>(
    'PLAY',
  )
  const [cursorPosition, setCursorPosition] = useState<{
    measure: number
    position: number
  }>({ measure: 0, position: 0 })

  const contentRef = createRef<HTMLDivElement>()
  const windowSize = useWindowSize()
  const { play } = useSound({ tuning: standard })
  const track = tab.tracks[0]

  useEffect(() => {
    if (contentRef.current) {
      setFirstMeasureTopDistance(contentRef.current.getBoundingClientRect().top)
    }
  }, [contentRef, windowSize])

  const onPlayClicked = async () => {
    let currentMeasurePlayed = cursorPosition.measure
    let currentNotesPlayed = cursorPosition.position
    let startTime = 0

    const playInterval = (time: number) => {
      if (track) {
        const tickTime = (time * 1000 - startTime) * PLAY_SPEED_FACTOR
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

          // Getting the frets if capo
          currentBeat.notes.forEach((note) => {
            strings[note.string] = note.value + track.offset
          })

          // Playing the notes
          currentBeat.notes.forEach((note) => {
            play(note.string, 0, strings)
          })
          // Write the notes inside local storage to get them on the 3D side
          useNotesStore.setState({ currentNotes: currentBeat.notes })

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
        console.log({ startTime })
      }
      playInterval(time)
    }, '0.1s')

    Tone.Transport.start()
  }

  const onPauseClicked = () => {
    Tone.Transport.pause()
  }

  return (
    <ResizableBox
      css={css`
        position: absolute;
        bottom: 0;
        background-color: white;
        box-shadow: 0 -5px 5px -5px #333;
      `}
      axis={'y'}
      width={windowSize.width as number}
      height={200}
      minConstraints={[100, 100]}
      resizeHandles={['n']}
    >
      <Button
        css={css`
          position: relative;
          top: -50px;
          left: 20px;
        `}
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
          <div ref={contentRef} />
          <Measure
            cursorPosition={
              cursorPosition.measure === 0 ? cursorPosition.position : undefined
            }
            parentTopRect={firstMeasureTopDistance}
            key={0}
            measure={track.measures[0] as MeasureType}
            nextMeasureStart={
              track.measures[1].voices[0].beats[0].start as number
            }
            previousMeasureEnd={0}
            windowSize={windowSize}
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
                  parentTopRect={firstMeasureTopDistance}
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
                  windowSize={windowSize}
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
                  parentTopRect={firstMeasureTopDistance}
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
                  windowSize={windowSize}
                />
              )
            }
          })}
        </div>
      </div>
    </ResizableBox>
  )
}
