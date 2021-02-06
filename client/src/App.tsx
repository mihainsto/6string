import './App.css'

import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import logo from './logo.svg'
import { HomePage } from './Pages/HomePage/HomePage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { RegisterPage } from './Pages/RegisterPage/RegisterPage'
import { AccountSettingsPage } from './Pages/Settings/AccountSettingsPage'
import { Settings } from './Pages/Settings/Settings'
import { SongPlayPage } from './Pages/SongPlayPage/SongPlayPage'
import { Tabs } from './Pages/SongPlayPage/Tabs'

function App() {
  return (
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
  )
}

export default App
