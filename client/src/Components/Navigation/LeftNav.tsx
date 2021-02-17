/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Avatar,
  Button,
  colors,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@material-ui/core'
import {
  Home,
  HomeOutlined,
  MusicNote,
  MusicNoteOutlined,
  PlayArrow,
  PlayArrowOutlined,
  Publish,
  PublishOutlined,
  Settings,
  SettingsOutlined,
} from '@material-ui/icons'
import HomeIcon from '@material-ui/icons/Home'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import React, { useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { useCloudinaryUrl } from '../../Hooks/useCloudinaryUrl'
import { useCurrentUser } from '../../Hooks/useCurrentUser'
import { useThemeStore } from '../../State/ThemeState'

export enum Pages {
  'Home' = 'HOME',
  'Playground' = 'PLAYGROUND',
  'Submit_Tab' = 'SUBMIT_TAB',
  'Settings' = 'SETTINGS',
}

type navProps = {
  page?: Pages
}
export const LeftNav: FC<navProps> = ({ page }) => {
  const history = useHistory()
  const theme = useTheme()
  const themeType = useThemeStore((state) => state.theme)
  const hoverColor = theme.palette.text.primary
  const textColor =
    themeType === 'LIGHT'
      ? theme.palette.text.secondary
      : theme.palette.text.hint

  return (
    <nav
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        padding: 30px 20px;
        background-color: ${themeType === 'DARK' &&
        theme.palette.background.paper};
        border-right: ${themeType === 'LIGHT' &&
        css`1px solid ${colors.grey['300']}`};
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin: -20px -40px 30px -40px;
        `}
      >
        <img
          src={
            themeType === 'DARK'
              ? '/IconWhite_NoBackground.png'
              : '/IconDark_NoBackground.png'
          }
          alt={'logo'}
          css={css`
            width: 200px;
          `}
        />
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: auto;
          align-items: center;
          grid-column-gap: 10px;
          grid-row-gap: 50px;
          color: ${textColor};
        `}
      >
        <button
          onClick={() => history.push('/')}
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${textColor};
            &:hover {
              color: ${hoverColor};
            }
            color: ${page === Pages.Home && hoverColor};
          `}
        >
          {page === Pages.Home ? <HomeIcon /> : <HomeOutlined />}
          <Typography variant="h6" css={css``}>
            Home
          </Typography>
        </button>

        <button
          onClick={() => history.push('/playground')}
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${page === Pages.Playground && hoverColor};
            &:hover {
              color: ${hoverColor};
            }
          `}
        >
          {page === Pages.Playground ? <PlayArrow /> : <PlayArrowOutlined />}
          <Typography variant="h6">Playground</Typography>
        </button>

        <button
          onClick={() => history.push('/submit/tab')}
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${page === Pages.Submit_Tab && hoverColor};
            &:hover {
              color: ${hoverColor};
            }
          `}
        >
          {page === Pages.Playground ? <Publish /> : <PublishOutlined />}
          <Typography variant="h6">Submit tab</Typography>
        </button>

        <button
          onClick={() => history.push('/settings')}
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${page === Pages.Settings && hoverColor};
            &:hover {
              color: ${hoverColor};
            }
          `}
        >
          {page === Pages.Settings ? <Settings /> : <SettingsOutlined />}
          <Typography variant="h6">Settings</Typography>
        </button>
      </div>
    </nav>
  )
}
