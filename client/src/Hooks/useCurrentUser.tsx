import { gql, useQuery } from '@apollo/client'

import { useMeQuery } from '../generated/graphql'

export const useCurrentUser = () => {
  return useMeQuery()
}
