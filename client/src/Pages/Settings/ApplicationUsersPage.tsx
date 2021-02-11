/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Button,
  MenuItem,
  Select,
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
import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { SettingsPageLayout } from '../../Components/Layouts/SettingsPageLayout'
import {
  OrderDirection,
  Role,
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  UserOrder,
  UserOrderField,
  UsersDocument,
  UsersQuery,
  useUsersQuery,
} from '../../generated/graphql'
import { useCurrentUser } from '../../Hooks/useCurrentUser'

type RoleSelectFieldProps = {
  currentRole: Role
  userId: string
}

const RoleSelectField: FC<RoleSelectFieldProps> = ({ currentRole, userId }) => {
  const [role, setRole] = useState<Role>(currentRole)
  const [changeUserRoleMutation] = useChangeUserRoleMutation({
    onCompleted: () => {
      toast('Changed user role!')
    },
  })

  useEffect(() => {
    if (role !== currentRole) {
      changeUserRoleMutation({
        variables: { input: { role: role, userId: userId } },
      })
    }
  }, [role])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <Select value={role} onChange={(e) => setRole(e.target.value)}>
      <MenuItem value="ADMIN">Admin</MenuItem>
      <MenuItem value="USER">User</MenuItem>
    </Select>
  )
}

export const ApplicationUsersPage: FC = () => {
  const first = 20
  const [orderBy, setOrderBy] = useState<UserOrder | null>(null)
  const currentUser = useCurrentUser()
  const [deleteUserMutation] = useDeleteUserMutation()
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
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
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
                    <CalendarTodayIcon />
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
                    <TableCell align="right">
                      {row.node.email !== currentUser.data?.me.email ? (
                        <RoleSelectField
                          currentRole={row.node.role}
                          userId={row.node.id}
                        />
                      ) : (
                        <Typography>Admin</Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {format(new Date(row.node.createdAt), 'MM-dd-yyyy')}
                    </TableCell>
                    <TableCell align="right">
                      {row.node.email !== currentUser.data?.me.email ? (
                        <Button
                          onClick={() => {
                            deleteUserMutation({
                              variables: {
                                input: {
                                  userId: row.node.id,
                                },
                              },
                              update(proxy) {
                                const query = UsersDocument
                                const data = proxy.readQuery<UsersQuery>({
                                  query,
                                })
                                proxy.writeQuery({
                                  query,
                                  data: {
                                    users: {
                                      edges: data?.users?.edges?.filter(
                                        (edge) => edge.node.id !== row.node.id,
                                      ),
                                    },
                                  },
                                })
                              },
                            })
                          }}
                        >
                          Delete
                        </Button>
                      ) : null}
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
