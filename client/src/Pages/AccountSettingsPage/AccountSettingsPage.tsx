/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Avatar,
  Button,
  colors,
  Input,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

import { CloudinaryUploadModal } from '../../Components/CloudinaryUploadModal'
import { Nav } from '../../Components/Navigation/Nav'
import { useUpdateUserMutation } from '../../generated/graphql'
import { useCloudinaryUrl } from '../../Hooks/useCloudinaryUrl'
import { useCurrentUser } from '../../Hooks/useCurrentUser'

export const AccountSettingsPage: FC = () => {
  const userData = useCurrentUser()
  const [username, setUsername] = useState<string | null>(null)
  const [successSnackbar, setSuccessSnackbar] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const [imageUploadModal, setImageUploadModal] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined | null>(
    undefined,
  )
  const [updateUser] = useUpdateUserMutation()
  const getCloudinaryUrl = useCloudinaryUrl()

  useEffect(() => {
    setUsername(userData.data?.me.username as string)
    setAvatarUrl(userData.data?.me.avatarUrl as string)
  }, [userData.data])

  useEffect(() => {
    setTimeout(() => setSuccessSnackbar(false), 4000)
  }, [successSnackbar])

  useEffect(() => {
    setTimeout(() => setErrorSnackbar(false), 4000)
  }, [errorSnackbar])

  const imageUploadModalOnSubmit = (cloudinaryId: string) => {
    setAvatarUrl(cloudinaryId)
    setImageUploadModal(false)
  }
  const saveChangesClicked = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          ...(username && { username }),
          ...(avatarUrl !== undefined && avatarUrl !== null && { avatarUrl }),
        },
      })
      if (data?.updateUser.id) {
        setSuccessSnackbar(true)
      } else {
        setErrorSnackbar(true)
      }
    } catch (e) {
      setErrorSnackbar(true)
    } finally {
      await userData.refetch()
    }
  }

  return (
    <div>
      <Nav />
      <div
        css={css`
          margin-top: 150px;
          padding: 20px 40px 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        `}
      >
        <Tabs
          css={css`
            border-right: 1px solid ${colors.grey[500]};
            width: 200px;
          `}
          orientation={'vertical'}
          value={0}
        >
          <Tab label={'Account'} />
          <Tab label={'Notifications'} />
          <Tab label={'Password'} />
          <Tab label={'Playground'} />
        </Tabs>

        <div css={css``}>
          <Typography variant={'h5'} color={'textSecondary'}>
            Account Settings
          </Typography>

          <div
            css={css`
              margin-top: 50px;
            `}
          >
            <Typography variant={'subtitle1'}>Avatar</Typography>
            <div
              css={css`
                margin-top: 10px;
                display: inline-grid;
                grid-template-columns: 1fr 1fr 1fr;
                align-items: center;
              `}
            >
              <Avatar
                src={avatarUrl ? getCloudinaryUrl(avatarUrl) : ''}
                style={{ width: 70, height: 70 }}
              >
                {userData.data?.me.username.substring(0, 2)}
              </Avatar>
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

            <div
              css={css`
                margin-top: 25px;
                border-top: 1px solid ${colors.grey[500]};
                width: 700px;
              `}
            />
            <div
              css={css`
                margin-top: 50px;
              `}
            >
              <Typography variant={'subtitle1'}>Display Name</Typography>
              <div
                css={css`
                  margin-top: 10px;
                `}
              >
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant={'filled'}
                  size={'small'}
                  label={'Change the username'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div
              css={css`
                margin-top: 25px;
                border-top: 1px solid ${colors.grey[500]};
                width: 700px;
              `}
            />

            <div
              css={css`
                margin-top: 50px;
                text-align: right;
              `}
            >
              <Button
                color={'primary'}
                variant={'contained'}
                onClick={saveChangesClicked}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
        <div />
      </div>

      <Snackbar
        open={successSnackbar}
        message={'Settings saved successfully'}
      />
      <Snackbar
        open={errorSnackbar}
        message={'Some error occurred, settings not saved'}
      />
      <CloudinaryUploadModal
        open={imageUploadModal}
        onSubmit={imageUploadModalOnSubmit}
        onClose={() => setImageUploadModal(false)}
      />
    </div>
  )
}
