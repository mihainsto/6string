/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Switch, Typography } from '@material-ui/core'
import React, { FC } from 'react'

import { SettingsCard } from '../../Components/Features/Settings/SettingsCard'
import { SettingsPageLayout } from '../../Components/Layouts/SettingsPageLayout'
import { useToggleNotificationSettingsMutation } from '../../generated/graphql'
import { useCurrentUser } from '../../Hooks/useCurrentUser'

export const NotificationSettingsPage: FC = () => {
  const { data, loading } = useCurrentUser()
  const [
    toggleNotificationSettingsMutation,
  ] = useToggleNotificationSettingsMutation()

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
            {!loading && (
              <Switch
                checked={data?.me.userSettings.notificationEnabled}
                onClick={() => {
                  toggleNotificationSettingsMutation({
                    variables: {
                      input: {
                        notificationEnabled: !data?.me.userSettings
                          .notificationEnabled,
                      },
                    },
                  })
                }}
              />
            )}
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
            {!loading && (
              <Switch
                checked={data?.me.userSettings.notificationRecommended}
                onClick={() => {
                  toggleNotificationSettingsMutation({
                    variables: {
                      input: {
                        notificationRecommended: !data?.me.userSettings
                          .notificationRecommended,
                      },
                    },
                  })
                }}
              />
            )}
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
            {!loading && (
              <Switch
                checked={data?.me.userSettings.notificationAdminReview}
                onClick={() => {
                  toggleNotificationSettingsMutation({
                    variables: {
                      input: {
                        notificationAdminReview: !data?.me.userSettings
                          .notificationAdminReview,
                      },
                    },
                  })
                }}
              />
            )}
          </div>
        </SettingsCard>
      </div>
    </SettingsPageLayout>
  )
}
