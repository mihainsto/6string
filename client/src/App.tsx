import './App.css'

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Role, useMeQuery } from './generated/graphql'
import { useUserRole } from './Hooks/useUserRole'
import { NotAdminPage } from './Pages/Error/NotAdminPage'
import { NotLoggedInPage } from './Pages/Error/NotLoggedInPage'
import { HomePage } from './Pages/HomePage/HomePage'
import { LoadingPage } from './Pages/Loading/LoadingPage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { RegisterPage } from './Pages/RegisterPage/RegisterPage'
import { AccountSettingsPage } from './Pages/Settings/AccountSettingsPage'
import { ApplicationUsersPage } from './Pages/Settings/ApplicationUsersPage'
import { NotificationSettingsPage } from './Pages/Settings/NotificationSettingsPage'
import { PlaygroundSettingsPage } from './Pages/Settings/PlaygroundSettingsPage'
import { ReviewNewSongsPage } from './Pages/Settings/ReviewNewSongsPage'
import { Settings } from './Pages/Settings/Settings'
import { SongPlayPage } from './Pages/SongPlayPage/SongPlayPage'
import { SubmitTabPage } from './Pages/SubmitTabPage/SubmitTabPage'
import { useThemeStore } from './State/ThemeState'

function App() {
  const themeType = useThemeStore((state) => state.theme)
  const theme = createMuiTheme({
    palette: {
      type: themeType === 'DARK' ? 'dark' : 'light',
    },
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const { data, loading } = useMeQuery()
  const userRole = useUserRole()

  useEffect(() => {
    if (data?.me) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [data])
  return (
    <MuiThemeProvider theme={theme}>
      <Toaster position="bottom-center" />
      <CssBaseline />
      <Router>
        {loading ? (
          <LoadingPage />
        ) : (
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/settings/basic/account">
              {loggedIn ? <AccountSettingsPage /> : <NotLoggedInPage />}
            </Route>
            <Route path="/settings/basic/notifications">
              {loggedIn ? <NotificationSettingsPage /> : <NotLoggedInPage />}
            </Route>
            <Route path="/settings/playground">
              {loggedIn ? <PlaygroundSettingsPage /> : <NotLoggedInPage />}
            </Route>
            <Route path="/submit/tab">
              {loggedIn ? <SubmitTabPage /> : <NotLoggedInPage />}
            </Route>
            <Route path="/settings/admin/songreview">
              {userRole === Role.Admin ? (
                <ReviewNewSongsPage />
              ) : (
                <NotAdminPage />
              )}
            </Route>
            <Route path="/settings/admin/users">
              {userRole === Role.Admin ? (
                <ApplicationUsersPage />
              ) : (
                <NotAdminPage />
              )}
            </Route>
            <Route path="/settings">
              {loggedIn ? <Settings /> : <NotLoggedInPage />}
            </Route>
            <Route path="/playsong/:id">
              <SongPlayPage />
            </Route>
          </Switch>
        )}
      </Router>
    </MuiThemeProvider>
  )
}

export default App
