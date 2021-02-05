/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react'
import { Button, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import { writeStorage } from '@rehooks/local-storage'
import React, { useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthLayout } from '../../Components/Layouts/AuthLayout'
import { useRegisterMutation } from '../../generated/graphql'

export const RegisterPage: FC = () => {
  const history = useHistory()
  const [register] = useRegisterMutation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registerErrorAlert, setRegisterErrorAlert] = useState('')
  const [registerSuccessAlert, setRegisterSuccessAlert] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const RegisterClicked = async () => {
    setUsernameErrorMessage('')
    setEmailErrorMessage('')
    setPasswordErrorMessage('')
    setRegisterErrorAlert('')
    if (username === '') {
      setUsernameErrorMessage('Username field cannot be left empty')
      return
    }
    if (email === '') {
      setEmailErrorMessage('Email field cannot be left empty')
      return
    }
    if (password === '') {
      setPasswordErrorMessage('Password field cannot be left empty')
      return
    }
    try {
      const result = await register({
        variables: { email, password, username },
      })
      writeStorage('accessToken', result.data!.signup.refreshToken)
      setRegisterSuccessAlert(true)
      setEmailErrorMessage('')
      setPasswordErrorMessage('')
      setTimeout(() => {
        history.push('/')
      }, 1000)
    } catch (e) {
      setRegisterSuccessAlert(false)
      setRegisterErrorAlert(e.message)
    }
  }

  return (
    <AuthLayout>
      <Typography variant={'h6'} color={'textSecondary'}>
        Register
      </Typography>

      {registerSuccessAlert && (
        <Alert
          css={css`
            margin-top: 30px;
          `}
          severity="success"
        >
          Register success! You will be redirected to the home page.
        </Alert>
      )}

      {registerErrorAlert !== '' && (
        <Alert
          css={css`
            margin-top: 30px;
          `}
          severity="error"
        >
          {registerErrorAlert}
        </Alert>
      )}
      <div
        css={css`
          display: grid;
          margin-top: 50px;
          gap: 40px;
        `}
      >
        <TextField
          css={css`
            width: 100%;
          `}
          error={usernameErrorMessage !== '' && true}
          id="outlined-basic"
          label="Username"
          helperText={usernameErrorMessage}
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          css={css`
            width: 100%;
          `}
          error={emailErrorMessage !== '' && true}
          id="outlined-basic"
          label="Email"
          helperText={emailErrorMessage}
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          css={css`
            width: 100%;
          `}
          error={passwordErrorMessage !== '' && true}
          helperText={passwordErrorMessage}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        css={css`
          margin-top: 20px;
        `}
      >
        <div
          css={css`
            margin-top: 40px;
          `}
        >
          <Button
            css={css`
              width: 100%;
            `}
            color={'primary'}
            variant={'contained'}
            onClick={RegisterClicked}
          >
            Register
          </Button>
        </div>

        <div
          css={css`
            margin-top: 20px;
            display: flex;
            align-items: center;
          `}
        >
          <Typography>Already have an account?</Typography>
          <Typography
            css={css`
              padding-left: 5px;
              cursor: pointer;
            `}
            variant={'subtitle2'}
            onClick={() => history.push('/login')}
          >
            Log in now
          </Typography>
        </div>
      </div>
    </AuthLayout>
  )
}
