/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Button, Switch, TextField, Typography } from '@material-ui/core'
import React, { FC } from 'react'

import { SettingsCard } from '../../Components/Features/Settings/SettingsCard'
import { SettingsPageLayout } from '../../Components/Layouts/SettingsPageLayout'

export const NotificationSettingsPage: FC = () => {
  return (
    <SettingsPageLayout pageName="Notifications">
      <div
        css={css`
          margin-top: 50px;
        `}
      >
        <SettingsCard>
          <Typography variant="h5">Notifications settings</Typography>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1" color={'textSecondary'}>
              Disable / enable notifications
            </Typography>
            <Switch />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1" color={'textSecondary'}>
              Recomanded notifications
            </Typography>
            <Switch />
          </div>
        </SettingsCard>
      </div>

      <div
        css={css`
          margin-top: 25px;
        `}
      >
        <SettingsCard>
          <Typography variant="h5">Admin notifications settings</Typography>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1" color={'textSecondary'}>
              Song review notifications
            </Typography>
            <Switch />
          </div>
        </SettingsCard>
      </div>
    </SettingsPageLayout>
  )
}
