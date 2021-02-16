/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Typography, useTheme } from '@material-ui/core'
import { FC, useState } from 'react'
import Draggable from 'react-draggable'

import { useChordStore } from '../../../App'
import { CHORDS } from '../../../Babylon/Chords'

const CircleText: FC = ({ children }) => {
  return (
    <div
      css={css`
        position: absolute;
        left: -100%;
        width: 200%;
        height: 200%;
        text-align: center;
        transform: skewY(30deg) rotate(30deg);
        padding-top: 20px;
        user-select: none;
      `}
    >
      {children}
    </div>
  )
}
type SelectChordPopoverProps = {
  test?: number
}

export const SelectChordPopover: FC<SelectChordPopoverProps> = ({ test }) => {
  const theme = useTheme()

  return (
    <Draggable>
      <div
        css={css`
          border-radius: 50%;
          width: 250px;
          height: 250px;
          bottom: 10px;
          right: 400px;
          background-color: ${theme.palette.background.paper};
          position: absolute;
          list-style: none;
          overflow: hidden;
        `}
      >
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}

        <div
          css={css`
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
            transform-origin: 0% 100%;
            transform: rotate(-30deg) skewY(-30deg);
            user-select: none;
            background-color: ${theme.palette.background.paper};
            &:hover {
              background-color: ${theme.palette.action.hover};
            }
          `}
          onMouseEnter={() => {
            useChordStore.setState({ currentChord: CHORDS['C'] })
          }}
        >
          <CircleText>
            <Typography variant="h5">C</Typography>
          </CircleText>
        </div>

        <div
          css={css`
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
            transform-origin: 0% 100%;
            transform: rotate(30deg) skewY(-30deg);
            background-color: ${theme.palette.background.paper};
            &:hover {
              background-color: ${theme.palette.action.hover};
            }
          `}
          onMouseEnter={() => {
            useChordStore.setState({ currentChord: CHORDS['G'] })
          }}
        >
          <CircleText>
            <Typography variant="h5">G</Typography>
          </CircleText>
        </div>

        <div
          css={css`
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
            transform-origin: 0% 100%;
            transform: rotate(90deg) skewY(-30deg);
            background-color: ${theme.palette.background.paper};
            &:hover {
              background-color: ${theme.palette.action.hover};
            }
          `}
          onMouseEnter={() => {
            useChordStore.setState({ currentChord: CHORDS['Dm'] })
          }}
        >
          <CircleText>
            <Typography variant="h5">Dm</Typography>
          </CircleText>
        </div>

        <div
          css={css`
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
            transform-origin: 0% 100%;
            transform: rotate(150deg) skewY(-30deg);
            background-color: ${theme.palette.background.paper};
            &:hover {
              background-color: ${theme.palette.action.hover};
            }
          `}
          onMouseEnter={() => {
            useChordStore.setState({ currentChord: CHORDS['Am'] })
          }}
        >
          <CircleText>
            <Typography variant="h5">Am</Typography>
          </CircleText>
        </div>

        <div
          css={css`
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
            transform-origin: 0% 100%;
            transform: rotate(210deg) skewY(-30deg);
            background-color: ${theme.palette.background.paper};
            &:hover {
              background-color: ${theme.palette.action.hover};
            }
          `}
          onMouseEnter={() => {
            useChordStore.setState({ currentChord: CHORDS['Em'] })
          }}
        >
          <CircleText>
            <Typography variant="h5">Em</Typography>
          </CircleText>
        </div>

        <div
          css={css`
            overflow: hidden;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
            transform-origin: 0% 100%;
            transform: rotate(270deg) skewY(-30deg);
            background-color: ${theme.palette.background.paper};
            &:hover {
              background-color: ${theme.palette.action.hover};
            }
          `}
          onMouseEnter={() => {
            useChordStore.setState({ currentChord: CHORDS['F'] })
          }}
        >
          <CircleText>
            <Typography variant="h5">F</Typography>
          </CircleText>
        </div>

        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 250px;
            height: 250px;
          `}
        >
          <div
            css={css`
              width: 125px;
              height: 125px;
              border-radius: 50%;
              background-color: ${theme.palette.background.default};
              z-index: 4;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 13.5px;
                shape-outside: circle(50%);
                align-items: center;
                justify-content: center;
                margin-top: 15px;
              `}
            >
              <div
                css={css`
                  width: 80px;
                  height: 4px;
                  border-radius: 2px;
                  background: ${theme.palette.text.disabled};
                  opacity: 0.7;
                `}
              />
              <div
                css={css`
                  width: 110px;
                  height: 4px;
                  border-radius: 2px;
                  background: ${theme.palette.text.disabled};
                  opacity: 0.7;
                `}
              />
              <div
                css={css`
                  width: 120px;
                  height: 4px;
                  border-radius: 2px;
                  background: ${theme.palette.text.disabled};
                  opacity: 0.7;
                `}
              />
              <div
                css={css`
                  width: 120px;
                  height: 4px;
                  border-radius: 2px;
                  background: ${theme.palette.text.disabled};
                  opacity: 0.7;
                `}
              />
              <div
                css={css`
                  width: 110px;
                  height: 4px;
                  border-radius: 2px;
                  background: ${theme.palette.text.disabled};
                  opacity: 0.7;
                `}
              />
              <div
                css={css`
                  width: 90px;
                  height: 4px;
                  border-radius: 2px;
                  background: ${theme.palette.text.disabled};
                  opacity: 0.7;
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
