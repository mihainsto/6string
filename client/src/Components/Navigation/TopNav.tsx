/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Avatar, Button, Menu, MenuItem, TextField } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import React, { useRef, useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { useMeQuery } from '../../generated/graphql'
import { useCloudinaryUrl } from '../../Hooks/useCloudinaryUrl'
import { useCurrentUser } from '../../Hooks/useCurrentUser'
import { useIsLoggedIn } from '../../Hooks/useIsLoggedIn'
import { useSearchStore } from '../../State/SearchState'
import { useThemeStore } from '../../State/ThemeState'

type TopNavProps = {
  homePage?: boolean
}
export const TopNav: FC<TopNavProps> = ({ homePage }) => {
  const isLoggedIn = useIsLoggedIn()
  const searchString = useSearchStore((state) => state.searchString)
  const favorites = useSearchStore((state) => state.favorites)
  const toggleFavorites = useSearchStore((state) => state.toggleFavorites)
  const switchTheme = useThemeStore((state) => state.switchTheme)
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
  const textFieldRef = useRef<HTMLDivElement | null>(null)
  return (
    <div
      css={css`
        padding: 20px 40px 0 200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 300px;
          `}
        >
          <TextField
            ref={textFieldRef}
            label="Search for a song"
            variant="outlined"
            size="small"
            autoFocus={history.location.pathname === '/' && searchString !== ''}
            value={searchString}
            onChange={(e) => {
              history.push('/')
              useSearchStore.setState({ searchString: e.target.value })
            }}
            fullWidth
          />
        </div>
        {homePage && (
          <button
            css={css`
              margin-left: 20px;
            `}
            onClick={() => toggleFavorites()}
          >
            {isLoggedIn && (
              <>
                {favorites ? (
                  <Favorite fontSize={'large'} />
                ) : (
                  <FavoriteBorder fontSize={'large'} />
                )}
              </>
            )}
          </button>
        )}
      </div>
      <div>
        {!isLoggedIn && (
          <Button
            css={css`
              padding: 10px 30px 10px 30px;
            `}
            variant={'contained'}
            color={'primary'}
            size={'large'}
            onClick={(e) => history.push('/login')}
          >
            Login
          </Button>
        )}
        {!loading && isLoggedIn && (
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
                      location.reload()
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
