/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { CircularProgress } from '@material-ui/core'
import { FC } from 'react'

export const LoadingPage: FC = () => {
  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
      `}
    >
      <CircularProgress size={100} />
    </div>
  )
}
