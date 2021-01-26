/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { colors } from '@material-ui/core'
import { writeStorage } from '@rehooks/local-storage'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { ResizableBox } from 'react-resizable'

export const DebugBoneRangeSelect: FC = () => {
  const [boneId, setBoneId] = useState('lIndex')
  const [x1, setX1] = useState(0)
  const [x2, setX2] = useState(0)
  const [x3, setX3] = useState(0)
  const [y1, setY1] = useState(0)
  const [y2, setY2] = useState(0)
  const [y3, setY3] = useState(0)
  const [z1, setZ1] = useState(0)
  const [z2, setZ2] = useState(0)
  const [z3, setZ3] = useState(0)
  useEffect(() => {
    writeStorage('debug_bone', { boneId, x1, x2, x3, y1, y2, y3, z1, z2, z3 })
  }, [x1, x2, x3, y1, y2, y3, z1, z2, z3])

  return (
    <ResizableBox
      css={css`
        position: absolute;
        bottom: 0;
        background-color: white;
        box-shadow: 0 -5px 5px -5px #333;
      `}
      axis={'y'}
      width={1000}
      height={400}
      minConstraints={[100, 100]}
      resizeHandles={['n']}
    >
      <input
        type={'text'}
        value={boneId}
        onChange={(e) => setBoneId(e.target.value)}
      />
      <div
        css={css`
          display: grid;
          gap: 10px;
        `}
      >
        <div>
          Z
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={z1}
              onChange={(e) => setZ1(parseInt(e.target.value))}
            />
            <div>{z1 / 100}</div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={z2}
              onChange={(e) => setZ2(parseInt(e.target.value))}
            />
            <div>{z2 / 100}</div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={z3}
              onChange={(e) => setZ3(parseInt(e.target.value))}
            />
            <div>{z3 / 100}</div>
          </div>
        </div>

        <div>
          Y
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={y1}
              onChange={(e) => setY1(parseInt(e.target.value))}
            />
            <div>{y1 / 100}</div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={y2}
              onChange={(e) => setY2(parseInt(e.target.value))}
            />
            <div>{y2 / 100}</div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={y3}
              onChange={(e) => setY3(parseInt(e.target.value))}
            />
            <div>{y3 / 100}</div>
          </div>
        </div>

        <div>
          X
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={x1}
              onChange={(e) => setX1(parseInt(e.target.value))}
            />
            <div>{x1 / 100}</div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={x2}
              onChange={(e) => setX2(parseInt(e.target.value))}
            />
            <div>{x2 / 100}</div>
          </div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={x3}
              onChange={(e) => setX3(parseInt(e.target.value))}
            />
            <div>{x3 / 100}</div>
          </div>
        </div>
      </div>
    </ResizableBox>
  )
}
