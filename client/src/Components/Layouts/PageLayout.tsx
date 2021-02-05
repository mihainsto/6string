/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import React, { FC } from 'react'

import { LeftNav, Pages } from '../Navigation/LeftNav'
import { TopNav } from '../Navigation/TopNav'

type PageLayoutProps = {
  page?: Pages
}
export const PageLayout: FC<PageLayoutProps> = ({ children, page }) => {
  return (
    <div>
      <LeftNav page={page} />
      <TopNav />
      <div
        css={css`
          margin-left: 150px;
          margin-top: 50px;
          text-align: center;
        `}
      >
        {children}
      </div>
    </div>
  )
}
