import './App.css'

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import create from 'zustand'

import { Role, useMeQuery } from './generated/graphql'
import { useUserRole } from './Hooks/useUserRole'
import { NotAdminPage } from './Pages/Error/NotAdminPage'
import { NotLoggedInPage } from './Pages/Error/NotLoggedInPage'
import { HomePage } from './Pages/HomePage/HomePage'
import { LoadingPage } from './Pages/Loading/LoadingPage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { PlaygroundPage } from './Pages/Playground/PlaygroundPage'
import { RegisterPage } from './Pages/RegisterPage/RegisterPage'
import { AccountSettingsPage } from './Pages/Settings/AccountSettingsPage'
import { ApplicationUsersPage } from './Pages/Settings/ApplicationUsersPage'
import { NotificationSettingsPage } from './Pages/Settings/NotificationSettingsPage'
import { PlaygroundSettingsPage } from './Pages/Settings/PlaygroundSettingsPage'
import { ReviewNewSongsPage } from './Pages/Settings/ReviewNewSongsPage'
import { Settings } from './Pages/Settings/Settings'
import { SongPlayPage } from './Pages/SongPlayPage/SongPlayPage'
import { SubmitTabPage } from './Pages/SubmitTabPage/SubmitTabPage'
import { ChordStore, NotesStore } from './State/BabylonState'
import { useThemeStore } from './State/ThemeState'

export const useNotesStore = create(NotesStore)
export const useChordStore = create(ChordStore)

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
      <PlaygroundPage />
    </MuiThemeProvider>
  )
}

export default App
