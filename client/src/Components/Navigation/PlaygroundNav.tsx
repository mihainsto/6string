/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Avatar, Button, colors, Menu, MenuItem } from '@material-ui/core'
import { ArrowBack, Settings } from '@material-ui/icons'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import React, { useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { useCloudinaryUrl } from '../../Hooks/useCloudinaryUrl'
import { useCurrentUser } from '../../Hooks/useCurrentUser'
import { useThemeStore } from '../../State/ThemeState'
import { PlaygroundSettingsModal } from '../Features/Playground/PlaygroundSettingsModal'

export const PlaygroundNav: FC = () => {
  const [token] = useLocalStorage('accessToken')
  const { data, loading } = useCurrentUser()
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const switchTheme = useThemeStore((data) => data.switchTheme)
  const [settingsModal, setSettingsModal] = useState<boolean>(false)
  const getCloudinaryUrl = useCloudinaryUrl()

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }
  const history = useHistory()

  return (
    <>
      <div
        css={css`
          padding: 20px 40px 0 40px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 25px;
        `}
      >
        <div
          css={css`
            justify-self: flex-start;
            margin-right: auto;
          `}
        >
          <Button onClick={() => history.goBack()}>
            <ArrowBack
              css={css`
                color: ${colors.grey[600]};
              `}
              fontSize={'large'}
            />
          </Button>
        </div>

        {!loading && token && (
          <Button onClick={() => setSettingsModal(true)}>
            <Settings
              css={css`
                color: ${colors.grey[600]};
              `}
              fontSize={'large'}
            />
          </Button>
        )}
        <div
          css={css`
            justify-self: flex-end;
          `}
        >
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
                    <MenuItem onClick={() => switchTheme()}>
                      Switch theme
                    </MenuItem>
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
      <PlaygroundSettingsModal
        open={settingsModal}
        onClose={() => setSettingsModal(false)}
      />
    </>
  )
}
