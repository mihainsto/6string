import { useEffect } from 'react'
import create from 'zustand'

import { useMeQuery } from '../generated/graphql'
import { GuitarOrientationStore } from '../State/BabylonState'

const useGuitarOrientationStore = create(GuitarOrientationStore)

export const useCurrentUser = () => {
  const data = useMeQuery({ pollInterval: 4000 })
  useEffect(() => {
    useGuitarOrientationStore.setState({
      guitarOrientation: data.data?.me.playgroundSettings.guitarOrientation,
    })
  }, [data])
  return data
}
