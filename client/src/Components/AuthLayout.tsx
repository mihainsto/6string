/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import React from 'react'
import { FC } from 'react'

export const AuthLayout: FC = ({ children }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 500px 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        justify-items: stretch;
        align-items: stretch;
        width: 100%;
        grid-template-rows: 100vh;
      `}
    >
      <div
        css={css`
          margin: 200px 90px 90px 90px;
        `}
      >
        {children}
      </div>
      <div>
        <img
          css={css`
            object-fit: cover;
            width: 100%;
            height: 100%;
          `}
          alt={'a guitar'}
          src={`https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`}
        />
      </div>
    </div>
  )
}
