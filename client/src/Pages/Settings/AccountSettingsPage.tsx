/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  colors,
  Input,
  Link,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { CloudinaryUploadModal } from '../../Components/CloudinaryUploadModal'
import { PageLayout } from '../../Components/Layouts/PageLayout'
import { Pages } from '../../Components/Navigation/LeftNav'
import { useUpdateUserMutation } from '../../generated/graphql'
import { useCloudinaryUrl } from '../../Hooks/useCloudinaryUrl'
import { useCurrentUser } from '../../Hooks/useCurrentUser'

export const AccountSettingsPage: FC = () => {
  const history = useHistory()
  const userData = useCurrentUser()
  const [username, setUsername] = useState<string | null>(null)
  const [successSnackbar, setSuccessSnackbar] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const [imageUploadModal, setImageUploadModal] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined | null>(
    undefined,
  )
  const [email, setEmail] = useState<string | undefined>(undefined)

  const [updateUser] = useUpdateUserMutation()
  const getCloudinaryUrl = useCloudinaryUrl()

  useEffect(() => {
    setUsername(userData.data?.me.username as string)
    setAvatarUrl(userData.data?.me.avatarUrl as string)
    setEmail(userData.data?.me.email)
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

              <Typography color="textPrimary">Account Settings</Typography>
            </Breadcrumbs>
          </div>
          <Card
            variant="outlined"
            css={css`
              margin-top: 50px;
              width: 900px;
            `}
          >
            <CardContent
              css={css`
                text-align: left;
              `}
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
                  margin-top: 10px;
                  display: flex;
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
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            css={css`
              margin-top: 25px;
              width: 900px;
            `}
          >
            <CardContent
              css={css`
                text-align: left;
              `}
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
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            css={css`
              margin-top: 25px;
              width: 900px;
            `}
          >
            <CardContent
              css={css`
                text-align: left;
              `}
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
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            css={css`
              margin-top: 25px;
              width: 900px;
            `}
          >
            <CardContent
              css={css`
                text-align: left;
              `}
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
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    label="New password"
                    type="password"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    label="Repeat new password"
                    type="password"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div
          css={css`
            margin-top: 25px;
          `}
        >
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={saveChangesClicked}
          >
            Save changes
          </Button>
        </div>
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
    </PageLayout>
  )
}
