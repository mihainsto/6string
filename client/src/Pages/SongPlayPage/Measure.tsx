/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { FC } from 'react'

import { Measure as MeasureType } from '../../Types/guitarProTabs.types'

type MeasureProps = {
  measure: MeasureType
  nextMeasureStart: number
  previousMeasureEnd: number
  key: number
  cursorPosition?: number
}

const notePositioning = {
  1: -110,
  2: -95,
  3: -76,
  4: -60,
  5: -45,
  6: -30,
}
const NOTE_DISTANCE_CONSTANT = 6

export const Measure: FC<MeasureProps> = React.memo(
  ({ measure, nextMeasureStart, previousMeasureEnd, key, cursorPosition }) => {
    const theme = useTheme()
    const thisMeasureEnd =
      measure.voices[0].beats[measure.voices[0].beats.length - 1].start

    const thisMeasureActualStart =
      measure.start - (measure.start - previousMeasureEnd) / 2

    const thisMeasureActualEnd =
      nextMeasureStart - (nextMeasureStart - thisMeasureEnd) / 2

    const measureDuration = thisMeasureActualEnd - thisMeasureActualStart

    const measureWidth = measureDuration / NOTE_DISTANCE_CONSTANT

    let previousBeatPosition = 0
    console.log({ measureWidth })
    const firstBeatPosition =
      measure.voices[0].beats[0].start - thisMeasureActualStart
    const lastBeatPosition =
      measure.voices[0].beats[measure.voices[0].beats.length - 1].start -
      thisMeasureActualStart

    return (
      <div
        css={css`
          width: ${measureWidth}px;
          display: grid;
          gap: 15px;
          grid-template-rows: auto 25px;
        `}
        key={key}
      >
        <div
          css={css`
            display: grid;
            gap: 15px;
            border-right: 2px solid ${theme.palette.text.primary};
            border-left: 2px solid ${theme.palette.text.primary};
          `}
        >
          <div
            css={css`
              border-top: 2px solid ${theme.palette.text.hint};
            `}
          />
          <div
            css={css`
              border-top: 2px solid ${theme.palette.text.hint};
            `}
          />
          <div
            css={css`
              border-top: 2px solid ${theme.palette.text.hint};
            `}
          />
          <div
            css={css`
              border-top: 2px solid ${theme.palette.text.hint};
            `}
          />
          <div
            css={css`
              border-top: 2px solid ${theme.palette.text.hint};
            `}
          />
          <div
            css={css`
              border-top: 2px solid ${theme.palette.text.hint};
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            align-content: flex-start;
            padding-left: 5px;
          `}
        >
          {measure.voices[0].beats.map((beat, beatIndex) => {
            const beatPosition = beat.start - thisMeasureActualStart
            const normalizedBeatPosition =
              measureWidth *
              ((beatPosition - firstBeatPosition) /
                (lastBeatPosition - firstBeatPosition))
            const biggestString = Math.max.apply(
              Math,
              beat.notes.map((note) => {
                return note.string
              }),
            )
            const notes = beat.notes.map((note, index) => {
              return (
                <div
                  key={index}
                  css={css`
                    z-index: 2;
                    padding-left: 2px;
                    padding-right: 2px;
                    margin-top: ${notePositioning[note.string]}px;
                    margin-left: ${index === 0
                      ? beatIndex === 0
                        ? normalizedBeatPosition - previousBeatPosition
                        : normalizedBeatPosition - previousBeatPosition - 18
                      : -13}px;
                  `}
                >
                  <div
                    css={css`
                      background-color: ${theme.palette.background.default};
                    `}
                  >
                    <Typography>{note.value}</Typography>
                  </div>
                  {note.string === biggestString && (
                    <div
                      css={css`
                        position: relative;
                        background-color: ${theme.palette.primary.main};
                        height: 110px;
                        opacity: 0.4;
                        filter: blur(0.2px);
                        visibility: ${cursorPosition === beatIndex
                          ? 'visible'
                          : 'hidden'};
                        top: ${biggestString === 1
                          ? -25
                          : biggestString === 2
                          ? -40
                          : biggestString === 3
                          ? -60
                          : biggestString === 4
                          ? -75
                          : biggestString === 5
                          ? -90
                          : -100}px;
                      `}
                    />
                  )}
                </div>
              )
            })
            previousBeatPosition = normalizedBeatPosition
            return notes
          })}
        </div>
      </div>
    )
  },
)
