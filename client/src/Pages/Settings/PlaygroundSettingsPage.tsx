/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { MenuItem, Select, Typography } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { SettingsCard } from '../../Components/Features/Settings/SettingsCard'
import { SettingsPageLayout } from '../../Components/Layouts/SettingsPageLayout'
import {
  GuitarOrientation,
  useUpdatePlaygroundSettingsMutation,
} from '../../generated/graphql'
import { useCurrentUser } from '../../Hooks/useCurrentUser'

export const PlaygroundSettingsPage: FC = () => {
  const { data } = useCurrentUser()

  const [guitarOrientation, setGuitarOrientation] = useState<
    GuitarOrientation | undefined
  >(data?.me.playgroundSettings.guitarOrientation)

  const [
    updatePlaygroundSettingsMutation,
  ] = useUpdatePlaygroundSettingsMutation({
    onCompleted: () => {
      toast.success('Updated playground settings!')
    },
    onError: () => {
      toast.error('Unexpected error')
    },
  })

  useEffect(
    () => setGuitarOrientation(data?.me.playgroundSettings.guitarOrientation),
    [data],
  )
  return (
    <SettingsPageLayout pageName="Playground">
      <div
        css={css`
          margin-top: 50px;
        `}
      >
        <SettingsCard>
          <Typography variant="h5">Playground Settings</Typography>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1" color={'textSecondary'}>
              Select guitar orientation in playground
            </Typography>

            <Select
              value={guitarOrientation}
              onChange={(e) => {
                updatePlaygroundSettingsMutation({
                  variables: {
                    input: {
                      playgroundSettings: {
                        guitarOrientation: e.target.value as GuitarOrientation,
                      },
                    },
                  },
                })
              }}
            >
              <MenuItem value={GuitarOrientation.RightHanded}>
                Right Handed
              </MenuItem>
              <MenuItem value={GuitarOrientation.LeftHanded}>
                Left Handed
              </MenuItem>
            </Select>
          </div>
        </SettingsCard>
      </div>
    </SettingsPageLayout>
  )
}
