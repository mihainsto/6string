import { useEffect, useState } from 'react'

import { useMeQuery } from '../generated/graphql'

export const useIsLoggedIn = () => {
  const { data } = useMeQuery()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (data?.me) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [data])

  return isLoggedIn
}
