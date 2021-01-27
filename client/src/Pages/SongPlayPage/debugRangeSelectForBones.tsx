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
  const [carpal1X, setCarpal1X] = useState(0)
  const [carpal2X, setCarpal2X] = useState(0)
  const [carpal3X, setCarpal3X] = useState(0)
  const [carpal4X, setCarpal4X] = useState(0)
  const [carpal1Y, setCarpal1Y] = useState(0)
  const [carpal2Y, setCarpal2Y] = useState(0)
  const [carpal3Y, setCarpal3Y] = useState(0)
  const [carpal4Y, setCarpal4Y] = useState(0)
  const [carpal1Z, setCarpal1Z] = useState(0)
  const [carpal2Z, setCarpal2Z] = useState(0)
  const [carpal3Z, setCarpal3Z] = useState(0)
  const [carpal4Z, setCarpal4Z] = useState(0)
  const [handX, setHandX] = useState(52)
  const [handY, setHandY] = useState(17)
  const [handZ, setHandZ] = useState(11)
  const [resetField, setResetField] = useState(0)

  useEffect(() => {
    writeStorage('debug_bone', {
      boneId,
      x1,
      x2,
      x3,
      y1,
      y2,
      y3,
      z1,
      z2,
      z3,
      carpal1X,
      carpal2X,
      carpal3X,
      carpal4X,
      carpal1Y,
      carpal2Y,
      carpal3Y,
      carpal4Y,
      carpal1Z,
      carpal2Z,
      carpal3Z,
      carpal4Z,
      handX,
      handY,
      handZ,
      resetField,
    })
  }, [
    x1,
    x2,
    x3,
    y1,
    y2,
    y3,
    z1,
    z2,
    z3,
    carpal1X,
    carpal2X,
    carpal3X,
    carpal4X,
    carpal1Y,
    carpal2Y,
    carpal3Y,
    carpal4Y,
    carpal1Z,
    carpal2Z,
    carpal3Z,
    carpal4Z,
    handX,
    handY,
    handZ,
    resetField,
  ])

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
      <div
        css={css`
          display: flex;
          gap: 15px;
        `}
      >
        <div>
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
        </div>

        <div>
          <div>Carpals</div>
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
                value={carpal1Z}
                onChange={(e) => setCarpal1Z(parseInt(e.target.value))}
              />
              <div>{carpal1Z / 100}</div>
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
                value={carpal2Z}
                onChange={(e) => setCarpal2Z(parseInt(e.target.value))}
              />
              <div>{carpal2Z / 100}</div>
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
                value={carpal3Z}
                onChange={(e) => setCarpal3Z(parseInt(e.target.value))}
              />
              <div>{carpal3Z / 100}</div>
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
                value={carpal4Z}
                onChange={(e) => setCarpal4Z(parseInt(e.target.value))}
              />
              <div>{carpal4Z / 100}</div>
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
                value={carpal1Y}
                onChange={(e) => setCarpal1Y(parseInt(e.target.value))}
              />
              <div>{carpal1Y / 100}</div>
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
                value={carpal2Y}
                onChange={(e) => setCarpal2Y(parseInt(e.target.value))}
              />
              <div>{carpal2Y / 100}</div>
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
                value={carpal3Y}
                onChange={(e) => setCarpal3Y(parseInt(e.target.value))}
              />
              <div>{carpal3Y / 100}</div>
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
                value={carpal4Y}
                onChange={(e) => setCarpal4Y(parseInt(e.target.value))}
              />
              <div>{carpal4Y / 100}</div>
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
                value={carpal1X}
                onChange={(e) => setCarpal1X(parseInt(e.target.value))}
              />
              <div>{carpal1X / 100}</div>
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
                value={carpal2X}
                onChange={(e) => setCarpal2X(parseInt(e.target.value))}
              />
              <div>{carpal2X / 100}</div>
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
                value={carpal3X}
                onChange={(e) => setCarpal3X(parseInt(e.target.value))}
              />
              <div>{carpal3X / 100}</div>
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
                value={carpal4X}
                onChange={(e) => setCarpal4X(parseInt(e.target.value))}
              />
              <div>{carpal4X / 100}</div>
            </div>
          </div>
        </div>
        <div>
          <div>Hand</div>
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
                step="0.1"
                max="52"
                value={handX}
                onChange={(e) => setHandX(parseInt(e.target.value))}
              />
              <div>{handX / 100}</div>
            </div>
            <div
              css={css`
                display: flex;
              `}
            >
              <input
                type="range"
                min="0"
                step="0.1"
                max="52"
                value={handY}
                onChange={(e) => setHandY(parseInt(e.target.value))}
              />
              <div>{handY / 100}</div>
            </div>
            <div
              css={css`
                display: flex;
              `}
            >
              <input
                type="range"
                min="0"
                step="0.1"
                max="52"
                value={handZ}
                onChange={(e) => setHandZ(parseInt(e.target.value))}
              />
              <div>{handZ / 100}</div>
            </div>
          </div>
        </div>
        <div>
          <div>Reset</div>
          <div
            css={css`
              display: flex;
            `}
          >
            <input
              type="range"
              min="0"
              max="300"
              value={resetField}
              onChange={(e) => setResetField(parseInt(e.target.value))}
            />
            <div>{resetField / 100}</div>
          </div>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        <button
          onClick={() =>
            console.log({
              1: { x: x1, y: y1, z: z1 },
              2: { x: x2, y: y2, z: z2 },
              3: { x: x3, y: y3, z: z3 },
            })
          }
        >
          Finger values
        </button>

        <button
          onClick={() => {
            console.log({
              1: { x: carpal1X, y: carpal1Y, z: carpal1Z },
              2: { x: carpal2X, y: carpal2Y, z: carpal2Z },
              3: { x: carpal3X, y: carpal3Y, z: carpal3Z },
              4: { x: carpal4X, y: carpal4Y, z: carpal4Z },
            })
          }}
        >
          Carpal values
        </button>

        <button onClick={() => console.log({ x: handX, y: handY, z: handZ })}>
          Hand values
        </button>
      </div>
    </ResizableBox>
  )
}
