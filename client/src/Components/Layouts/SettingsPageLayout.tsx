/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Pages } from '../Navigation/LeftNav'
import { PageLayout } from './PageLayout'

type SettingsPageProps = {
  pageName: string
}

export const SettingsPageLayout: FC<SettingsPageProps> = ({
  children,
  pageName,
}) => {
  const history = useHistory()
  return (
    <PageLayout page={Pages.Settings}>
      <div
        css={css`
          padding: 0 50px;
        `}
      >
        <div
          css={css`
            display: grid;
            justify-content: center;
          `}
        >
          <div
            css={css`
              text-align: left;
            `}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                color="inherit"
                css={css`
                  cursor: pointer;
                `}
                onClick={() => {
                  history.push('/settings')
                }}
              >
                Settings
              </Link>

              <Typography color="textPrimary">{pageName}</Typography>
            </Breadcrumbs>
          </div>

          {children}
        </div>
      </div>
    </PageLayout>
  )
}
