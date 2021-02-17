/** @jsxImportSource @emotion/react **/
/*eslint-disable*/
import { css } from '@emotion/react'
import { Typography, useTheme } from '@material-ui/core'
import { FC, useEffect, useState } from 'react'
import Draggable from 'react-draggable'

import { useChordStore } from '../../../App'
import { CHORDS } from '../../../Babylon/Chords'
import { useScroll } from '../../../Hooks/useScroll'

const chordSets = {
  '-2': ['A', 'E', 'Bm', 'F#m', 'C#m', 'D'],
  '-1': ['B', 'F#', 'C#m', 'G#m', 'D#m', 'E'],
  '0': ['C', 'G', 'Dm', 'Am', 'Em', 'F'],
  '1': ['Db', 'Ab', 'Ebm', 'Bbm', 'Fm', 'Gb'],
  '2': ['Eb', 'Bb', 'Fm', 'Cm', 'Gm', 'Ab'],
}
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
  const [currentChordSet, setCurrentChordSet] = useState<
    '-2' | '-1' | '0' | '1' | '2'
  >('0')

  return (
    <Draggable>
      <div
        onWheel={(e) => {
          //@ts-ignore
          if (e.nativeEvent.wheelDelta > 0) {
            let nextStep = parseInt(currentChordSet) + 1
            if (nextStep > 2) {
              nextStep = -2
            }
            // @ts-ignore
            setCurrentChordSet(nextStep.toString())
          } else {
            let nextStep = parseInt(currentChordSet) - 1
            if (nextStep < -2) {
              nextStep = 2
            }
            // @ts-ignore
            setCurrentChordSet(nextStep.toString())
          }
        }}
      >
        <div
          css={css`
            border-radius: 50%;
            width: 250px;
            height: 250px;
            bottom: 20px;
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
              useChordStore.setState({
                currentChord: CHORDS[chordSets[currentChordSet][0]],
              })
            }}
          >
            <CircleText>
              <Typography variant="h5">
                {chordSets[currentChordSet][0]}
              </Typography>
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
              useChordStore.setState({
                currentChord: CHORDS[chordSets[currentChordSet][1]],
              })
            }}
          >
            <CircleText>
              <Typography variant="h5">
                {chordSets[currentChordSet][1]}
              </Typography>
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
              useChordStore.setState({
                currentChord: CHORDS[chordSets[currentChordSet][2]],
              })
            }}
          >
            <CircleText>
              <Typography variant="h5">
                {chordSets[currentChordSet][2]}
              </Typography>
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
              useChordStore.setState({
                currentChord: CHORDS[chordSets[currentChordSet][3]],
              })
            }}
          >
            <CircleText>
              <Typography variant="h5">
                {chordSets[currentChordSet][3]}
              </Typography>
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
              useChordStore.setState({
                currentChord: CHORDS[chordSets[currentChordSet][4]],
              })
            }}
          >
            <CircleText>
              <Typography variant="h5">
                {chordSets[currentChordSet][4]}
              </Typography>
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
              useChordStore.setState({
                currentChord: CHORDS[chordSets[currentChordSet][5]],
              })
            }}
          >
            <CircleText>
              <Typography variant="h5">
                {chordSets[currentChordSet][5]}
              </Typography>
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
        <div
          onClick={() => setCurrentChordSet('-2')}
          css={css`
            border-radius: 50%;
            width: 10px;
            height: 10px;
            bottom: 100px;
            right: 380px;
            background-color: ${currentChordSet === '-2'
              ? theme.palette.text.primary
              : theme.palette.background.paper};
            position: absolute;
            list-style: none;
            overflow: hidden;
          `}
        />

        <div
          onClick={() => setCurrentChordSet('-1')}
          css={css`
            border-radius: 50%;
            width: 10px;
            height: 10px;
            bottom: 120px;
            right: 380px;
            background-color: ${currentChordSet === '-1'
              ? theme.palette.text.primary
              : theme.palette.background.paper};
            position: absolute;
            list-style: none;
            overflow: hidden;
          `}
        />

        <div
          onClick={() => setCurrentChordSet('0')}
          css={css`
            border-radius: 50%;
            width: 10px;
            height: 10px;
            bottom: 140px;
            right: 380px;
            background-color: ${currentChordSet === '0'
              ? theme.palette.text.primary
              : theme.palette.background.paper};
            position: absolute;
            list-style: none;
            overflow: hidden;
          `}
        />

        <div
          onClick={() => setCurrentChordSet('1')}
          css={css`
            border-radius: 50%;
            width: 10px;
            height: 10px;
            bottom: 160px;
            right: 380px;
            background-color: ${currentChordSet === '1'
              ? theme.palette.text.primary
              : theme.palette.background.paper};
            position: absolute;
            list-style: none;
            overflow: hidden;
          `}
        />

        <div
          onClick={() => setCurrentChordSet('2')}
          css={css`
            border-radius: 50%;
            width: 10px;
            height: 10px;
            bottom: 180px;
            right: 380px;
            background-color: ${currentChordSet === '2'
              ? theme.palette.text.primary
              : theme.palette.background.paper};
            position: absolute;
            list-style: none;
            overflow: hidden;
          `}
        />
      </div>
    </Draggable>
  )
}
