/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import React, { useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { useCloudinaryUrl } from '../../Hooks/useCloudinaryUrl'
import { useCurrentUser } from '../../Hooks/useCurrentUser'

export enum pages {
  'Home' = 0,
  'Songs' = 1,
  'Playground' = 2,
  'Submit_Tab' = 3,
  'About' = 4,
}
type navProps = {
  page?: pages
}
export const Nav: FC<navProps> = ({ page }) => {
  const [token] = useLocalStorage('accessToken')
  const { data, loading } = useCurrentUser()
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const getCloudinaryUrl = useCloudinaryUrl()
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }
  const history = useHistory()
  const handleTabChange = (tab: number) => {
    if (tab === pages.Home) {
      history.push('/')
    }
    if (tab === pages.Songs) {
      history.push('/songs')
    }
  }
  return (
    <div
      css={css`
        padding: 20px 40px 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Typography color={'primary'} variant={'subtitle2'}>
        Project-sixstring
      </Typography>
      <Tabs
        value={page}
        indicatorColor="primary"
        textColor="primary"
        centered
        onChange={(event, value) => handleTabChange(value)}
      >
        <Tab label={'Home'} />
        <Tab label={'Songs'} />
        <Tab label={'Playground'} />
        <Tab label={'Submit Tab'} />
        <Tab label={'About'} />
      </Tabs>
      <div>
        {!token && (
          <Button
            css={css`
              padding: 10px 30px 10px 30px;
            `}
            variant={'contained'}
            color={'primary'}
            size={'large'}
            onClick={() => history.push('/login')}
          >
            Login
          </Button>
        )}
        {!loading && token && (
          <div>
            {data && (
              <>
                <button
                  css={css`
                    background: transparent;
                    border: none !important;
                  `}
                  onClick={handleMenuClick}
                >
                  <Avatar
                    css={css`
                      cursor: pointer;
                    `}
                    alt={'Avatar'}
                    src={getCloudinaryUrl(data.me.avatarUrl!)}
                  >
                    {data.me.username.substring(0, 2)}
                  </Avatar>
                </button>
                <Menu
                  css={css`
                    margin-top: 40px;
                  `}
                  anchorEl={menuAnchorEl}
                  keepMounted
                  open={Boolean(menuAnchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => history.push('/settings')}>
                    Settings
                  </MenuItem>
                  <MenuItem>Favorites</MenuItem>
                  <MenuItem
                    onClick={() => {
                      writeStorage('accessToken', null)
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
