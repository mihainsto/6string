import { useEffect, useState } from 'react'

import { Role, useMeQuery } from '../generated/graphql'

export const useUserRole = () => {
  const { data } = useMeQuery()
  const [userRole, setUserRole] = useState<Role | undefined>(undefined)

  useEffect(() => {
    if (data?.me.role) {
      setUserRole(data.me.role)
    } else {
      setUserRole(undefined)
    }
  }, [data])

  return userRole
}

export const useIsAdmin = () => {
  const { data } = useMeQuery()
  const [userRole, setUserRole] = useState<Role | undefined>(undefined)

  useEffect(() => {
    if (data?.me.role) {
      setUserRole(data.me.role)
    } else {
      setUserRole(undefined)
    }
  }, [data])

  return userRole === Role.Admin
}
