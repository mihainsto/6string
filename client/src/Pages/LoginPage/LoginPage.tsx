/** @jsxImportSource @emotion/react **/

import { gql, useMutation } from '@apollo/client'
import { css } from '@emotion/react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import { writeStorage } from '@rehooks/local-storage'
import React, { useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthLayout } from '../../Components/Layouts/AuthLayout'
import { useLoginMutation } from '../../generated/graphql'

export const LoginPage: FC = () => {
  const history = useHistory()
  const [login] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [incorrectDataAlert, setIncorrectDataAlert] = useState(false)
  const [loginSuccessAlert, setLoginSuccessAlert] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const loginClicked = async () => {
    setEmailErrorMessage('')
    setPasswordErrorMessage('')
    if (email === '') {
      setEmailErrorMessage('Email field cannot be left empty')
      return
    }
    if (password === '') {
      setPasswordErrorMessage('Password field cannot be left empty')
      return
    }
    try {
      const result = await login({ variables: { email, password } })
      writeStorage('accessToken', result.data!.login.refreshToken)

      setIncorrectDataAlert(false)
      setLoginSuccessAlert(true)
      setEmailErrorMessage('')
      setPasswordErrorMessage('')
      setTimeout(() => {
        history.push('/')
      }, 1000)
    } catch (e) {
      setLoginSuccessAlert(false)
      setIncorrectDataAlert(true)
    }
  }

  return (
    <AuthLayout>
      <Typography variant={'h6'} color={'textSecondary'}>
        Log In
      </Typography>
      {incorrectDataAlert && (
        <Alert
          css={css`
            margin-top: 30px;
          `}
          severity="error"
        >
          Incorrect email or password.
        </Alert>
      )}

      {loginSuccessAlert && (
        <Alert
          css={css`
            margin-top: 30px;
          `}
          severity="success"
        >
          Login success! You will be redirected to the home page.
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
        <FormControlLabel
          control={
            <Checkbox
              name="checkedI"
              color={'primary'}
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember Me"
        />

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
            onClick={loginClicked}
          >
            Log In
          </Button>
        </div>

        <div
          css={css`
            margin-top: 20px;
            display: flex;
            align-items: center;
          `}
        >
          <Typography>Have no account?</Typography>
          <Typography
            css={css`
              padding-left: 5px;
              cursor: pointer;
            `}
            variant={'subtitle2'}
            onClick={() => history.push('/register')}
          >
            Sing up now
          </Typography>
        </div>
      </div>
    </AuthLayout>
  )
}
