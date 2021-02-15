/** @jsxImportSource @emotion/react **/

import { Notification } from '@babylonjs/inspector/components/actionTabs/tabs/propertyGrids/animations/notification'
import { css } from '@emotion/react'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  Favorite,
  FavoriteBorder,
  Notifications,
  NotificationsActive,
  NotificationsNoneOutlined,
} from '@material-ui/icons'
import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import { format } from 'date-fns'
import React, { useRef, useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import {
  useMeQuery,
  useReadNotificationMutation,
} from '../../generated/graphql'
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
  const { data, loading } = useMeQuery({ pollInterval: 4000 })
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [
    notificationsAnchorEl,
    setNotificationsAnchorEl,
  ] = useState<null | HTMLElement>(null)

  const history = useHistory()
  const getCloudinaryUrl = useCloudinaryUrl()
  const textFieldRef = useRef<HTMLDivElement | null>(null)

  const [readNotificationMutation] = useReadNotificationMutation()

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
                <span
                  css={css`
                    margin-right: 20px;
                  `}
                >
                  <button
                    onClick={(e) => setNotificationsAnchorEl(e.currentTarget)}
                  >
                    {!data.me.notifications?.filter((e) => e.read === false)
                      .length ? (
                      <NotificationsNoneOutlined fontSize={'large'} />
                    ) : (
                      <NotificationsActive fontSize={'large'} />
                    )}
                  </button>
                  <Menu
                    css={css`
                      margin-top: 40px;
                    `}
                    anchorEl={notificationsAnchorEl}
                    keepMounted
                    open={Boolean(notificationsAnchorEl)}
                    onClose={() => setNotificationsAnchorEl(null)}
                  >
                    {data.me.notifications?.filter((e) => e.read === false)
                      .length ? (
                      <div>
                        {data.me.notifications?.map(
                          (notification) =>
                            !notification.read && (
                              <MenuItem
                                key={notification.id}
                                onClick={() =>
                                  readNotificationMutation({
                                    variables: {
                                      input: {
                                        notificationId: notification.id,
                                      },
                                    },
                                    optimisticResponse: {
                                      readNotification: {
                                        id: notification.id,
                                        read: true,
                                      },
                                    },
                                  })
                                }
                              >
                                <div
                                  css={css`
                                    max-width: 300px;
                                    white-space: normal;
                                  `}
                                >
                                  <Typography variant="body2">
                                    {notification.message}
                                  </Typography>
                                  <Typography variant="caption">
                                    {format(
                                      new Date(notification.createdAt),
                                      'MMM d, h:m aaa',
                                    )}
                                  </Typography>
                                </div>
                              </MenuItem>
                            ),
                        )}
                      </div>
                    ) : (
                      <div>
                        <MenuItem>
                          <Typography variant="body2">
                            No new notifications!
                          </Typography>
                        </MenuItem>
                      </div>
                    )}
                  </Menu>
                </span>
                <button
                  css={css`
                    background: transparent;
                    border: none !important;
                  `}
                  onClick={(e) => setMenuAnchorEl(e.currentTarget)}
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
                  onClose={() => setMenuAnchorEl(null)}
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
