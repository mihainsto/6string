/** @jsxImportSource @emotion/react **/

import { Cloudinary } from 'cloudinary-core'

import { isValidURL } from '../Utils/ValidUrl'

export const useCloudinaryUrl: () => (
  id: string,
) => string | undefined = () => {
  const cloudinaryCore = new Cloudinary({ cloud_name: 'dizv2pxl0' })

  const getCloudinaryUrl = (id: string): string | undefined => {
    if (!id) return undefined
    if (!isValidURL(id)) return cloudinaryCore.url(id)
    else return id
  }
  return getCloudinaryUrl
}
