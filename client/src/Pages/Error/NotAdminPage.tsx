/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Typography } from '@material-ui/core'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { PageLayout } from '../../Components/Layouts/PageLayout'

export const NotAdminPage: FC = () => {
  const history = useHistory()
  return (
    <PageLayout>
      <div
        css={css`
          margin-top: 50px;
        `}
      >
        <Typography variant="h4">
          You need to be an Admin to access this page
        </Typography>
      </div>
    </PageLayout>
  )
}
