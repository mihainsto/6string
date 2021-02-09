/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { PageLayout } from '../../Components/Layouts/PageLayout'
import { Pages } from '../../Components/Navigation/LeftNav'
import { useIsAdmin } from '../../Hooks/useUserRole'

export const Settings: FC = () => {
  const history = useHistory()
  const isAdmin = useIsAdmin()

  return (
    <PageLayout page={Pages.Settings}>
      <div
        css={css`
          display: grid;
          justify-content: center;
          grid-template-columns: auto auto auto;
          grid-column-gap: 50px;
        `}
      >
        <Card
          variant="outlined"
          css={css`
            margin-top: 50px;
            width: 300px;
          `}
        >
          <CardContent
            css={css`
              text-align: left;
            `}
          >
            <Typography variant="h5">Basic Settings</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Your account basic settings
            </Typography>
            <div
              css={css`
                margin-top: 25px;
                display: flex;
                flex-direction: column;
                gap: 10px;
              `}
            >
              <Link
                css={css`
                  cursor: pointer;
                `}
                onClick={() => {
                  history.push('/settings/basic/account')
                }}
              >
                Account settings
              </Link>
              <Link
                css={css`
                  cursor: pointer;
                `}
                onClick={() => {
                  history.push('/settings/basic/notifications')
                }}
              >
                Notifications settings
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          css={css`
            margin-top: 50px;
            width: 300px;
          `}
        >
          <CardContent
            css={css`
              text-align: left;
            `}
          >
            <Typography variant="h5">Playground Settings</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              All of the settings for your guitar
            </Typography>
            <div
              css={css`
                margin-top: 25px;
                display: flex;
                flex-direction: column;
                gap: 10px;
              `}
            >
              <Link
                css={css`
                  cursor: pointer;
                `}
                onClick={() => {
                  history.push('/settings/playground')
                }}
              >
                Playground settings
              </Link>
            </div>
          </CardContent>
        </Card>

        {isAdmin && (
          <Card
            variant="outlined"
            css={css`
              margin-top: 50px;
              width: 300px;
            `}
          >
            <CardContent
              css={css`
                text-align: left;
              `}
            >
              <Typography variant="h5">Admin Settings</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Manage the platform
              </Typography>
              <div
                css={css`
                  margin-top: 25px;
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                `}
              >
                <Link
                  css={css`
                    cursor: pointer;
                  `}
                  onClick={() => {
                    history.push('/settings/admin/songreview')
                  }}
                >
                  Review new songs
                </Link>
                <Link
                  css={css`
                    cursor: pointer;
                  `}
                  onClick={() => {
                    history.push('/settings/admin/users')
                  }}
                >
                  Application users
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
