/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { colors } from '@material-ui/core'
import React from 'react'
import { FC } from 'react'

export const Cursor: FC = () => {
  return (
    <div
      css={css`
        width: 17px;
        height: 115px;
        background-color: ${colors.blue[700]};
        opacity: 0.4;
        filter: blur(0.2px);
        border-radius: 5px;
      `}
    />
  )
}
