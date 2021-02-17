/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Button, Typography } from '@material-ui/core'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { PageLayout } from '../../Components/Layouts/PageLayout'

export const NotLoggedInPage: FC = () => {
  const history = useHistory()
  return (
    <PageLayout>
      <div
        css={css`
          margin-top: 50px;
        `}
      >
        <Typography variant="h4">
          You need to log in to access this page
        </Typography>

        <div
          css={css`
            margin-top: 20px;
          `}
        >
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={() => history.push('/logIn')}
          >
            Log In
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
