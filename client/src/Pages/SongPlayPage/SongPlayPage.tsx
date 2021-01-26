/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Button } from '@material-ui/core'
import { writeStorage } from '@rehooks/local-storage'
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { FC } from 'react'
import { standard } from 'react-guitar-tunings'
import { Resizable, ResizableBox } from 'react-resizable'
import { useParams } from 'react-router-dom'
import * as Tone from 'tone'

import { BabylonMainPage } from '../../Babylon/BabylonMainPage'
import { PlaygroundNav } from '../../Components/Navigation/PlaygroundNav'
import { useSongQuery } from '../../generated/graphql'
import { useRect } from '../../Hooks/useRect'
import useWindowSize from '../../Hooks/useWindowSize'
import useSound from '../../Packages/react-guitar-sound'
import {
  GuitarProTab,
  Measure as MeasureType,
} from '../../Types/guitarProTabs.types'
import { DebugBoneRangeSelect } from './debugRangeSelectForBones'
import { Measure } from './Measure'
import { Tabs } from './Tabs'

export const SongPlayPage: FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = useParams()
  const { data, loading } = useSongQuery({ variables: { id } })
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
      {/*<div*/}
      {/*  css={css`*/}
      {/*    position: absolute;*/}
      {/*    width: 100%;*/}
      {/*  `}*/}
      {/*>*/}
      {/*  <PlaygroundNav />*/}
      {/*</div>*/}

      <BabylonMainPage />
      <DebugBoneRangeSelect />
      {/*{tab && <Tabs tab={tab} />}*/}
    </div>
  )
}
