/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Avatar, Button, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { toast } from 'react-hot-toast'

import { CloudinaryUploadModal } from '../../Components/CloudinaryUploadModal'
import { SettingsCard } from '../../Components/Features/Settings/SettingsCard'
import { SettingsPageLayout } from '../../Components/Layouts/SettingsPageLayout'
import {
  useChangePasswordMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserEmailMutation,
  useUpdateUserNameMutation,
} from '../../generated/graphql'
import { useCloudinaryUrl } from '../../Hooks/useCloudinaryUrl'
import { useCurrentUser } from '../../Hooks/useCurrentUser'

export const AccountSettingsPage: FC = () => {
  const userData = useCurrentUser()
  const [username, setUsername] = useState<string | undefined>(undefined)

  const [imageUploadModal, setImageUploadModal] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined | null>(
    undefined,
  )
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [currentPassword, setCurrentPassword] = useState<string | undefined>(
    undefined,
  )
  const [newPassword, setNewPassword] = useState<string | undefined>(undefined)
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<
    string | undefined
  >(undefined)

  const getCloudinaryUrl = useCloudinaryUrl()

  useEffect(() => {
    setUsername(userData.data?.me.username as string)
    setAvatarUrl(userData.data?.me.avatarUrl as string)
    setEmail(userData.data?.me.email)
  }, [userData.data])

  const imageUploadModalOnSubmit = (cloudinaryId: string) => {
    setAvatarUrl(cloudinaryId)
    setImageUploadModal(false)
  }

  const [updateAvatarUrlMutation] = useUpdateUserAvatarMutation({
    onCompleted: () => toast.success('Avatar saved!'),
    onError: () => toast.error('Some error occurred, avatar not saved.'),
  })
  const [updateUserNameMutation] = useUpdateUserNameMutation({
    onCompleted: () => toast.success('Username saved!'),
    onError: () => toast.error('Some error occurred, username not saved.'),
  })
  const [updateUserEmailMutation] = useUpdateUserEmailMutation({
    onCompleted: () => toast.success('Email saved!'),
    onError: () => toast.error('Some error occurred, email not saved.'),
  })
  const [changePasswordMutation] = useChangePasswordMutation({
    onCompleted: () => toast.success('Password saved!'),
    onError: () =>
      toast.error('Some error occurred, password not saved. Check your input'),
  })

  return (
    <SettingsPageLayout pageName="Account Settings">
      <div
        css={css`
          margin-top: 50px;
        `}
      >
        <SettingsCard
          actions={
            <>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  updateAvatarUrlMutation({
                    variables: {
                      input: {
                        avatarUrl: avatarUrl || '',
                      },
                    },
                  }).finally(() => userData.refetch())
                }}
              >
                Save
              </Button>
            </>
          }
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <Typography variant="h5">Avatar</Typography>
            <Avatar
              src={avatarUrl ? getCloudinaryUrl(avatarUrl) : ''}
              style={{ width: 70, height: 70 }}
            >
              {userData.data?.me.username.substring(0, 2)}
            </Avatar>
          </div>

          <div
            css={css`
              display: flex;
              margin-top: 10px;
            `}
          >
            <div>
              <Button
                variant={'outlined'}
                color={'primary'}
                onClick={() => setImageUploadModal(true)}
              >
                Upload
              </Button>
            </div>
            <div
              css={css`
                margin-left: 20px;
              `}
            >
              <Button variant={'outlined'} onClick={() => setAvatarUrl('')}>
                Remove
              </Button>
            </div>
          </div>
        </SettingsCard>
      </div>

      <div
        css={css`
          margin-top: 25px;
        `}
      >
        <SettingsCard
          actions={
            <>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  updateUserNameMutation({
                    variables: {
                      input: {
                        username: username as string | '',
                      },
                    },
                  }).finally(() => userData.refetch())
                }}
              >
                Save
              </Button>
            </>
          }
        >
          <Typography variant="h5">Display Name</Typography>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1" color={'textSecondary'}>
              Change your username
            </Typography>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </SettingsCard>
      </div>

      <div
        css={css`
          margin-top: 25px;
        `}
      >
        <SettingsCard
          actions={
            <>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  updateUserEmailMutation({
                    variables: {
                      input: {
                        email: email as string | '',
                      },
                    },
                  }).finally(() => userData.refetch())
                }}
              >
                Save
              </Button>
            </>
          }
        >
          <Typography variant="h5">Email</Typography>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1" color={'textSecondary'}>
              Change your email
            </Typography>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </SettingsCard>
      </div>

      <div
        css={css`
          margin-top: 25px;
        `}
      >
        <SettingsCard
          actions={
            <>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  if (newPassword !== undefined && newPassword.length < 6) {
                    toast.error('You need min 6 characters.')
                  } else if (newPasswordRepeat !== newPassword) {
                    toast.error("The password isn't matching")
                  } else {
                    changePasswordMutation({
                      variables: {
                        input: {
                          oldPassword: currentPassword || '',
                          newPassword: newPassword || '',
                        },
                      },
                    })
                  }
                }}
              >
                Save
              </Button>
            </>
          }
        >
          <Typography variant="h5">Password</Typography>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1" color={'textSecondary'}>
              Change your password
            </Typography>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 10px;
              `}
            >
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                label="Current password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                label="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                label="Repeat new password"
                type="password"
                value={newPasswordRepeat}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
              />
            </div>
          </div>
        </SettingsCard>
      </div>

      <CloudinaryUploadModal
        open={imageUploadModal}
        onSubmit={imageUploadModalOnSubmit}
        onClose={() => setImageUploadModal(false)}
      />
    </SettingsPageLayout>
  )
}
