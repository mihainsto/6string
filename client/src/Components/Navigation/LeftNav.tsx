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

  return (
    <nav
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        padding: 30px 20px;
        background-color: ${colors.blue[900]};
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: auto;
          align-items: center;
          grid-column-gap: 10px;
          grid-row-gap: 50px;
          color: ${colors.grey[400]};
        `}
      >
        <button
          onClick={() => history.push('/')}
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${page === Pages.Home && colors.grey[100]};
            &:hover {
              color: ${colors.grey[100]};
            }
          `}
        >
          {page === Pages.Home ? <HomeIcon /> : <HomeOutlined />}
          <Typography
            variant="h6"
            css={css`
              color: ${page === Pages.Home && colors.grey[100]};
            `}
          >
            Home
          </Typography>
        </button>

        <button
          onClick={() => history.push('/playground')}
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${page === Pages.Playground && colors.grey[100]};
            &:hover {
              color: ${colors.grey[100]};
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
            color: ${page === Pages.Playground && colors.grey[100]};
            &:hover {
              color: ${colors.grey[100]};
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
            color: ${page === Pages.Settings && colors.grey[100]};
            &:hover {
              color: ${colors.grey[100]};
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
