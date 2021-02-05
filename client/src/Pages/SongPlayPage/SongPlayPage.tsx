/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { writeStorage } from '@rehooks/local-storage'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { BabylonMainPage } from '../../Babylon/BabylonMainPage'
import { PlaygroundNav } from '../../Components/Navigation/PlaygroundNav'
import { useSongQuery } from '../../generated/graphql'
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

  useEffect(() => {
    writeStorage('currentNotes', null)
  }, [])
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
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
    </div>
  )
}
