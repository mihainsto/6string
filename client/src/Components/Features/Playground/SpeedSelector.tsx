/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Button, Slider, Tooltip } from '@material-ui/core'
import React, { FC } from 'react'

export type SpeedSelectorProps = {
  onDragStart: () => void
  onChange: (value: number) => void
}
export const SpeedSelector: FC<SpeedSelectorProps> = ({
  onChange,
  onDragStart,
}) => {
  return (
    <Tooltip title={'Change Tempo'} placement="right" arrow>
      <Button
        variant="contained"
        css={css`
          width: 200px;
        `}
      >
        <Slider
          onChangeCommitted={(e, newValue) => {
            onChange((newValue as number) + 3)
          }}
          onMouseDown={() => {
            onDragStart()
          }}
          defaultValue={5}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={7}
        />
      </Button>
    </Tooltip>
  )
}
