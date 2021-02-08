import './App.css'

import { ThemeProvider } from '@emotion/react'
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { HomePage } from './Pages/HomePage/HomePage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { RegisterPage } from './Pages/RegisterPage/RegisterPage'
import { AccountSettingsPage } from './Pages/Settings/AccountSettingsPage'
import { Settings } from './Pages/Settings/Settings'
import { SongPlayPage } from './Pages/SongPlayPage/SongPlayPage'
import { useThemeStore } from './State/ThemeState'

function App() {
  const themeType = useThemeStore((state) => state.theme)
  const theme = createMuiTheme({
    palette: {
      type: themeType === 'DARK' ? 'dark' : 'light',
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
          <Route path="/settings/account">
            <AccountSettingsPage />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/playsong/:id">
            <SongPlayPage />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App
