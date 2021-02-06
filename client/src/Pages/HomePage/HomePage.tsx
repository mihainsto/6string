/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'

import { PageLayout } from '../../Components/Layouts/PageLayout'
import { Pages } from '../../Components/Navigation/LeftNav'
import {
  Difficulty,
  GuitarStyle,
  OrderDirection,
  Song,
  SongFilter,
  SongOrder,
  SongOrderField,
  useSongsQuery,
} from '../../generated/graphql'
import { SongCard } from '../SongsPage/SongCard'

export const HomePage: FC = () => {
  const first = 10
  const [queryField, setQueryField] = useState('')
  const [searchQuery, setSearchQuery] = useState<string | null>('')
  const [songFilter, setSongFilter] = useState<SongFilter | null>(null)
  const [songOrder, setSongOrder] = useState<SongOrder | null>(null)

  const [styleSelect, setStyleSelect] = useState<GuitarStyle | 'ALL'>('ALL')
  const [tuningSelect, setTuningSelect] = useState<string>('ALL')
  const [difficultySelect, setDifficultySelect] = useState<Difficulty | 'ALL'>(
    'ALL',
  )
  const [sortBySelect, setSortBySelect] = useState<SongOrderField | 'None'>(
    'None',
  )
  const { data, fetchMore, refetch } = useSongsQuery({
    variables: {
      after: '',
      first: first,
      // query: searchQuery,
      filter: songFilter,
      orderBy: songOrder,
    },
  })

  useEffect(() => {
    refetch()
  }, [songFilter, songOrder])

  const setFilter = (filter: SongFilter) => {
    setSongFilter({
      ...songFilter,
      ...filter,
    })
  }

  const setSortBy = (order: SongOrderField | null) => {
    if (order)
      setSongOrder({
        direction: OrderDirection.Asc,
        field: order,
      })
    else {
      setSongOrder(null)
    }
  }

  return (
    <PageLayout page={Pages.Home}>
      <div
        css={css`
          margin-top: 40px;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 900px;
          `}
        >
          <div
            css={css`
              margin-top: 20px;
              display: flex;
              justify-content: space-between;
            `}
          >
            <FormControl
              css={css`
                width: 150px;
              `}
            >
              <InputLabel>Guitar style</InputLabel>
              <Select
                value={styleSelect}
                onChange={(e) => {
                  setStyleSelect(e.target.value as GuitarStyle)
                  if (e.target.value === 'ALL') {
                    setFilter({ style: null })
                  } else {
                    setFilter({ style: e.target.value as GuitarStyle })
                  }
                }}
              >
                <MenuItem value={'ALL'}> All</MenuItem>
                <MenuItem value={GuitarStyle.Fingerpick}>Fingerpick</MenuItem>
                <MenuItem value={GuitarStyle.Strum}>Strum</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              css={css`
                width: 150px;
              `}
            >
              <InputLabel>Guitar tuning</InputLabel>
              <Select
                value={tuningSelect}
                onChange={(e) => {
                  setTuningSelect(e.target.value as string)
                  if (e.target.value === 'ALL') {
                    setFilter({ tuning: null })
                  } else {
                    setFilter({ tuning: e.target.value as string })
                  }
                }}
              >
                <MenuItem value={'ALL'}>All</MenuItem>
                <MenuItem value={'standard'}>Standard</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              css={css`
                width: 150px;
              `}
            >
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficultySelect}
                onChange={(e) => {
                  setDifficultySelect(e.target.value as Difficulty)
                  if (e.target.value === 'ALL') {
                    setFilter({ difficulty: null })
                  } else {
                    setFilter({ difficulty: e.target.value as Difficulty })
                  }
                }}
              >
                <MenuItem value={'ALL'}>All</MenuItem>
                <MenuItem value={Difficulty.Easy}>Easy</MenuItem>
                <MenuItem value={Difficulty.Medium}>Medium</MenuItem>
                <MenuItem value={Difficulty.Hard}>Hard</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              css={css`
                width: 150px;
              `}
            >
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBySelect}
                onChange={(e) => {
                  setSortBySelect(e.target.value as SongOrderField)
                  if (e.target.value === 'None') setSortBy(null)
                  else setSortBy(e.target.value as SongOrderField)
                }}
              >
                <MenuItem value={'None'}> None</MenuItem>
                <MenuItem value={SongOrderField.CreatedAt}>Created At</MenuItem>
                <MenuItem value={SongOrderField.Style}>Style</MenuItem>
                <MenuItem value={SongOrderField.Difficulty}>
                  Difficulty
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          {data?.songs.edges && (
            <div
              css={css`
                margin-top: 40px;
              `}
            >
              {data.songs.edges.map((song, index) => {
                return <SongCard song={song.node as Song} key={index} />
              })}
              {data.songs.pageInfo.hasNextPage && (
                <div
                  css={css`
                    text-align: center;
                    margin-top: 20px;
                  `}
                >
                  <Button
                    size={'large'}
                    onClick={() => {
                      fetchMore({
                        variables: {
                          after: data?.songs.pageInfo.endCursor,
                        },
                      })
                    }}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
