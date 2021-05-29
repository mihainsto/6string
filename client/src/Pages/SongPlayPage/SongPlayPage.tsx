/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useNotesStore } from '../../App'
import { BabylonMainPage } from '../../Babylon/BabylonMainPage'
import { CurrentChordWidget } from '../../Components/Features/Playground/CurrentChordWidget'
import { PlaygroundNav } from '../../Components/Navigation/PlaygroundNav'
import { useSongQuery } from '../../generated/graphql'
import { useCurrentUser } from '../../Hooks/useCurrentUser'
import { useIsLoggedIn } from '../../Hooks/useIsLoggedIn'
import { GuitarProTab } from '../../Types/guitarProTabs.types'
import { Tabs } from './Tabs'

export const SongPlayPage: FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = useParams()
  const { data, loading } = useSongQuery({ variables: { id } })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const tab: GuitarProTab | undefined = data?.song.tab
  const track = tab?.tracks[0]

  const { data: userData } = useCurrentUser()
  const loggedIn = useIsLoggedIn()

  useEffect(() => {
    useNotesStore.setState({
      currentNotes: undefined,
      timestamp: undefined,
    })
  }, [])

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
      className="songPlay"
    >
      <div
        css={css`
          position: absolute;
          width: 100%;
        `}
      >
        <PlaygroundNav />
      </div>

      <BabylonMainPage />
      {tab && <Tabs tab={tab} />}
      {userData?.me.playgroundSettings.chordWidget && <CurrentChordWidget />}
      {!loggedIn && <CurrentChordWidget />}
    </div>
  )
}
