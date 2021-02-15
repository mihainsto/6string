import { useMeQuery } from '../generated/graphql'

export const useCurrentUser = () => {
  const data = useMeQuery({ pollInterval: 4000 })

  return data
}
