/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from '@material-ui/core'
import { Favorite, FavoriteBorder, PlayCircleOutline } from '@material-ui/icons'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import ScheduleIcon from '@material-ui/icons/Schedule'
import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { PageLayout } from '../../Components/Layouts/PageLayout'
import { Pages } from '../../Components/Navigation/LeftNav'
import {
  OrderDirection,
  SongOrder,
  SongOrderField,
  useAddSongToFavoriteMutation,
  useRemoveSongFromFavoriteMutation,
  useSongsQuery,
} from '../../generated/graphql'
import { useIsLoggedIn } from '../../Hooks/useIsLoggedIn'
import { useSearchStore } from '../../State/SearchState'

export const HomePage: FC = () => {
  const first = 20
  const searchString = useSearchStore((state) => state.searchString)
  const favorites = useSearchStore((state) => state.favorites)
  const history = useHistory()
  const [orderBy, setOrderBy] = useState<SongOrder | null>(null)
  const theme = useTheme()
  const isLoggedIn = useIsLoggedIn()

  const { data, fetchMore, refetch } = useSongsQuery({
    variables: {
      first: first,
      query: searchString,
      orderBy: orderBy,
      favorite: favorites,
    },
  })
  const [addSongToFavoriteMutation] = useAddSongToFavoriteMutation()
  const [removeSongFromFavoriteMutation] = useRemoveSongFromFavoriteMutation()

  useEffect(() => {
    refetch()
  }, [orderBy, searchString, favorites])

  const edges = !favorites
    ? data?.songs.edges
    : data?.songs.edges?.filter((edge) => edge.node.favorite === true)

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
            width: 1000px;
          `}
        >
          <TableContainer
            css={css`
              margin-top: 20px;
            `}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell />

                  <TableCell>
                    <TableSortLabel
                      active={
                        (orderBy && orderBy.field === SongOrderField.Title) ||
                        undefined
                      }
                      direction={
                        orderBy && orderBy.direction === OrderDirection.Asc
                          ? 'asc'
                          : 'desc'
                      }
                      onClick={() => {
                        orderBy?.field === SongOrderField.Title &&
                        orderBy?.direction === OrderDirection.Desc
                          ? setOrderBy({
                              direction: OrderDirection.Asc,
                              field: SongOrderField.Title,
                            })
                          : setOrderBy({
                              direction: OrderDirection.Desc,
                              field: SongOrderField.Title,
                            })
                      }}
                    >
                      Title{' '}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={
                        (orderBy && orderBy.field === SongOrderField.Artist) ||
                        undefined
                      }
                      direction={
                        orderBy && orderBy.direction === OrderDirection.Asc
                          ? 'asc'
                          : 'desc'
                      }
                      onClick={() => {
                        orderBy?.field === SongOrderField.Artist &&
                        orderBy?.direction === OrderDirection.Desc
                          ? setOrderBy({
                              direction: OrderDirection.Asc,
                              field: SongOrderField.Artist,
                            })
                          : setOrderBy({
                              direction: OrderDirection.Desc,
                              field: SongOrderField.Artist,
                            })
                      }}
                    >
                      Artist
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={
                        (orderBy &&
                          orderBy.field === SongOrderField.Difficulty) ||
                        undefined
                      }
                      direction={
                        orderBy && orderBy.direction === OrderDirection.Asc
                          ? 'asc'
                          : 'desc'
                      }
                      onClick={() => {
                        orderBy?.field === SongOrderField.Difficulty &&
                        orderBy?.direction === OrderDirection.Desc
                          ? setOrderBy({
                              direction: OrderDirection.Asc,
                              field: SongOrderField.Difficulty,
                            })
                          : setOrderBy({
                              direction: OrderDirection.Desc,
                              field: SongOrderField.Difficulty,
                            })
                      }}
                    >
                      Difficulty
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={
                        (orderBy &&
                          orderBy.field === SongOrderField.CreatedAt) ||
                        undefined
                      }
                      direction={
                        orderBy && orderBy.direction === OrderDirection.Asc
                          ? 'asc'
                          : 'desc'
                      }
                      onClick={() => {
                        orderBy?.field === SongOrderField.CreatedAt &&
                        orderBy?.direction === OrderDirection.Desc
                          ? setOrderBy({
                              direction: OrderDirection.Asc,
                              field: SongOrderField.CreatedAt,
                            })
                          : setOrderBy({
                              direction: OrderDirection.Desc,
                              field: SongOrderField.CreatedAt,
                            })
                      }}
                    >
                      <CalendarTodayIcon />
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel>
                      <ScheduleIcon />
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              {edges && (
                <TableBody>
                  {edges?.map((row, index) => (
                    <TableRow
                      key={index}
                      css={css`
                        &:hover {
                          background-color: ${theme.palette.action.hover};
                          & div:first-child {
                            visibility: visible;
                          }
                        }
                      `}
                    >
                      <TableCell>
                        <div
                          css={css`
                            visibility: hidden;
                          `}
                        >
                          <button
                            onClick={() => {
                              history.push(`/playsong/${row.node.id}`)
                            }}
                          >
                            <PlayCircleOutline />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => {
                            !row.node.favorite
                              ? addSongToFavoriteMutation({
                                  variables: { input: { songId: row.node.id } },
                                  optimisticResponse: {
                                    addSongToFavorite: {
                                      __typename: 'Song',
                                      id: row.node.id,
                                      favorite: true,
                                    },
                                  },
                                })
                              : removeSongFromFavoriteMutation({
                                  variables: { input: { songId: row.node.id } },
                                  optimisticResponse: {
                                    removeSongFromFavorite: {
                                      __typename: 'Song',
                                      id: row.node.id,
                                      favorite: false,
                                    },
                                  },
                                })
                          }}
                        >
                          {isLoggedIn && (
                            <>
                              {!row.node.favorite ? (
                                <FavoriteBorder />
                              ) : (
                                <Favorite />
                              )}
                            </>
                          )}
                        </button>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.node.title}
                      </TableCell>
                      <TableCell align="right">{row.node.artist}</TableCell>
                      <TableCell align="right">
                        {row.node.difficulty[0] +
                          row.node.difficulty.substr(1).toLowerCase()}
                      </TableCell>
                      <TableCell align="right">
                        {format(new Date(row.node.createdAt), 'MM-dd-yyyy')}
                      </TableCell>
                      <TableCell align="right">2:31</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {data?.songs.pageInfo.hasNextPage && (
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
      </div>
    </PageLayout>
  )
}
