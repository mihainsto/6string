/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { useTheme } from '@material-ui/core'
import React from 'react'
import { FC } from 'react'

export const Cursor: FC = () => {
  const theme = useTheme()
  return (
    <div
      css={css`
        width: 17px;
        height: 115px;
        background-color: ${theme.palette.primary.main};
        opacity: 0.4;
        filter: blur(0.2px);
        border-radius: 5px;
      `}
    />
  )
}
