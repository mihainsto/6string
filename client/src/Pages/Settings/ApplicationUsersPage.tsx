/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import ScheduleIcon from '@material-ui/icons/Schedule'
import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'

import { SettingsCard } from '../../Components/Features/Settings/SettingsCard'
import { SettingsPageLayout } from '../../Components/Layouts/SettingsPageLayout'
import {
  OrderDirection,
  SongOrderField,
  UserOrder,
  UserOrderField,
  useSongsQuery,
  useUsersQuery,
} from '../../generated/graphql'

export const ApplicationUsersPage: FC = () => {
  const first = 20
  const [orderBy, setOrderBy] = useState<UserOrder | null>(null)

  const { data, fetchMore, refetch } = useUsersQuery({
    variables: {
      first: first,
      orderBy: orderBy,
    },
  })

  useEffect(() => {
    refetch()
  }, [orderBy])

  return (
    <SettingsPageLayout pageName="Application Users">
      <div
        css={css`
          margin-top: 50px;
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
                <TableCell>
                  <TableSortLabel
                    active={
                      (orderBy && orderBy.field === UserOrderField.Email) ||
                      undefined
                    }
                    direction={
                      orderBy && orderBy.direction === OrderDirection.Asc
                        ? 'asc'
                        : 'desc'
                    }
                    onClick={() => {
                      orderBy?.field === UserOrderField.Email &&
                      orderBy?.direction === OrderDirection.Desc
                        ? setOrderBy({
                            direction: OrderDirection.Asc,
                            field: UserOrderField.Email,
                          })
                        : setOrderBy({
                            direction: OrderDirection.Desc,
                            field: UserOrderField.Email,
                          })
                    }}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={
                      (orderBy && orderBy.field === UserOrderField.Username) ||
                      undefined
                    }
                    direction={
                      orderBy && orderBy.direction === OrderDirection.Asc
                        ? 'asc'
                        : 'desc'
                    }
                    onClick={() => {
                      orderBy?.field === UserOrderField.Username &&
                      orderBy?.direction === OrderDirection.Desc
                        ? setOrderBy({
                            direction: OrderDirection.Asc,
                            field: UserOrderField.Username,
                          })
                        : setOrderBy({
                            direction: OrderDirection.Desc,
                            field: UserOrderField.Username,
                          })
                    }}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={
                      (orderBy && orderBy.field === UserOrderField.Role) ||
                      undefined
                    }
                    direction={
                      orderBy && orderBy.direction === OrderDirection.Asc
                        ? 'asc'
                        : 'desc'
                    }
                    onClick={() => {
                      orderBy?.field === UserOrderField.Role &&
                      orderBy?.direction === OrderDirection.Desc
                        ? setOrderBy({
                            direction: OrderDirection.Asc,
                            field: UserOrderField.Role,
                          })
                        : setOrderBy({
                            direction: OrderDirection.Desc,
                            field: UserOrderField.Role,
                          })
                    }}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  {' '}
                  <TableSortLabel
                    active={
                      (orderBy && orderBy.field === UserOrderField.CreatedAt) ||
                      undefined
                    }
                    direction={
                      orderBy && orderBy.direction === OrderDirection.Asc
                        ? 'asc'
                        : 'desc'
                    }
                    onClick={() => {
                      orderBy?.field === UserOrderField.CreatedAt &&
                      orderBy?.direction === OrderDirection.Desc
                        ? setOrderBy({
                            direction: OrderDirection.Asc,
                            field: UserOrderField.CreatedAt,
                          })
                        : setOrderBy({
                            direction: OrderDirection.Desc,
                            field: UserOrderField.CreatedAt,
                          })
                    }}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>

            {data?.users.edges && (
              <TableBody>
                {data.users?.edges.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.node.email}
                    </TableCell>
                    <TableCell align="right">{row.node.username}</TableCell>
                    <TableCell align="right">{row.node.role}</TableCell>
                    <TableCell align="right">
                      {format(new Date(row.node.createdAt), 'MM-dd-yyyy')}
                    </TableCell>
                    <TableCell align="right">
                      <Button>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </SettingsPageLayout>
  )
}
