/** @jsxImportSource @emotion/react **/

import React, { FC } from 'react'

import { Nav, pages } from '../../Components/Navigation/Nav'

export const HomePage: FC = () => {
  return (
    <div>
      <Nav page={pages.Home} />
      <div>Home Page</div>
    </div>
  )
}
