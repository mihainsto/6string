/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { colors } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

import { useRect } from '../../Hooks/useRect'
import useWindowSize from '../../Hooks/useWindowSize'
import { Measure as MeasureType } from '../../Types/guitarProTabs.types'
import { Cursor } from './Cursor'

type MeasureProps = {
  measure: MeasureType
  nextMeasureStart: number
  previousMeasureEnd: number
  key: number
  parentTopRect: number
  cursorPosition?: number
  windowSize: { width: number; height: number }
}

const notePositioning = {
  1: 12,
  2: 29,
  3: 46,
  4: 63,
  5: 80,
  6: 97,
}
const NOTE_DISTANCE_CONSTANT = 6

export const Measure: FC<MeasureProps> = React.memo(
  ({
    measure,
    nextMeasureStart,
    previousMeasureEnd,
    key,
    parentTopRect,
    cursorPosition,
    windowSize,
  }) => {
    const [rectLeft, setRectLeft] = useState(0)
    const [rectTop, setRectTop] = useState(0)
    const contentRef = React.createRef<HTMLDivElement>()
    const thisMeasureEnd =
      measure.voices[0].beats[measure.voices[0].beats.length - 1].start

    const thisMeasureActualStart =
      measure.start - (measure.start - previousMeasureEnd) / 2

    const thisMeasureActualEnd =
      nextMeasureStart - (nextMeasureStart - thisMeasureEnd) / 2

    const measureDuration = thisMeasureActualEnd - thisMeasureActualStart

    const measureWidth = measureDuration / NOTE_DISTANCE_CONSTANT

    useEffect(() => {
      const rect = contentRef.current?.getBoundingClientRect()
      if (rect) {
        setRectLeft(rect.x)
        setRectTop(rect.y)
      }
    }, [contentRef, windowSize])

    const topOffset = rectTop - parentTopRect
    return (
      <div
        css={css`
          width: ${measureWidth}px;
          display: grid;
          gap: 15px;
          grid-template-areas:
            '1'
            '2'
            '3'
            '4'
            '5'
            '6';
          border-right: 2px solid ${colors.grey[900]};
          border-left: 2px solid ${colors.grey[900]};
        `}
        key={key}
        ref={contentRef}
      >
        <div
          css={css`
            border-top: 2px solid ${colors.grey[600]};
            grid-area: 1;
          `}
        />
        <div
          css={css`
            border-top: 2px solid ${colors.grey[600]};
            grid-area: 2;
          `}
        />
        <div
          css={css`
            border-top: 2px solid ${colors.grey[600]};
            grid-area: 3;
          `}
        />
        <div
          css={css`
            border-top: 2px solid ${colors.grey[600]};
            grid-area: 4;
          `}
        />
        <div
          css={css`
            border-top: 2px solid ${colors.grey[600]};
            grid-area: 5;
          `}
        />
        <div
          css={css`
            border-top: 2px solid ${colors.grey[600]};
            grid-area: 6;
          `}
        />

        {measure.voices[0].beats.map((beat) => {
          const beatPosition =
            (beat.start - thisMeasureActualStart) / NOTE_DISTANCE_CONSTANT
          return beat.notes.map((note, index) => {
            return (
              <div
                key={index}
                css={css`
                  position: absolute;
                  z-index: 2;
                  background-color: white;
                  padding-left: 2px;
                  padding-right: 2px;
                  top: ${topOffset + notePositioning[note.string]}px;
                  left: ${rectLeft + beatPosition - 40}px;
                `}
              >
                {note.value}
              </div>
            )
          })
        })}

        {typeof cursorPosition !== 'undefined' && (
          <div
            css={css`
              margin-top: -15px;
              margin-left: -2px;
              position: absolute;
              z-index: 3;
              left: ${rectLeft +
              (measure.voices[0].beats[cursorPosition].start -
                thisMeasureActualStart) /
                NOTE_DISTANCE_CONSTANT -
              40}px;
            `}
          >
            <Cursor />
          </div>
        )}
      </div>
    )
  },
)
